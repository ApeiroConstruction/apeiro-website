// Receives Request a Quote submissions, saves them to Supabase and emails a notification.
// Runs on the server only; keys come from environment variables (see .env.example).
import { NextResponse } from "next/server";
import { IS_PRODUCTION } from "@/lib/env";
import { validateQuote, type QuoteInput } from "@/lib/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- Simple rate limit: 5 requests per IP per 10 minutes (per server instance). ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled, or submitted impossibly fast → pretend success, store nothing.
  const elapsed = typeof body.elapsed_ms === "number" ? body.elapsed_ms : Infinity;
  if (str(body.website) || elapsed < 2500) {
    return NextResponse.json({ ok: true });
  }

  const input: QuoteInput = {
    project_type: str(body.project_type, 60),
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    name: str(body.name, 120),
    company: str(body.company, 160),
    email: str(body.email, 254),
    phone: str(body.phone, 40),
    message: str(body.message, 2000),
    page_url: str(body.page_url, 500),
  };
  const problems = validateQuote(input);
  if (problems.length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields: problems }, { status: 422 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (IS_PRODUCTION) {
      console.error("[quote] Supabase is not configured.");
      return NextResponse.json({ ok: false, error: "Service unavailable." }, { status: 503 });
    }
    // Local / preview without keys: accept so the form can be tested, but nothing is stored.
    console.warn("[quote] Supabase not configured; submission not stored (non-production).", { ...input, email: "[redacted]", phone: "[redacted]" });
    return NextResponse.json({ ok: true, stored: false });
  }

  // 1. Save to Supabase (service role key bypasses row-level security; the public cannot read the table).
  const save = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/quote_requests`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      // Legacy service_role keys are JWTs ("eyJ…") and go in Authorization too.
      // New-style secret keys ("sb_secret_…") must be sent in the apikey header only.
      ...(supabaseKey.startsWith("eyJ") ? { Authorization: `Bearer ${supabaseKey}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(input),
  });
  if (!save.ok) {
    // Key type only (never the key itself), to diagnose a wrong key without exposing it.
    const keyType = supabaseKey.startsWith("sb_secret_")
      ? "secret (new)"
      : supabaseKey.startsWith("sb_publishable_")
        ? "PUBLISHABLE — wrong key, use the secret one"
        : supabaseKey.startsWith("eyJ")
          ? "legacy JWT (anon or service_role)"
          : "unrecognised";
    console.error("[quote] Supabase insert failed", save.status, `key type: ${keyType}`, await save.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "Could not save request." }, { status: 502 });
  }

  // 2. Email notification (a failure here doesn't lose the request: it is already saved).
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const rows: [string, string][] = [
      ["Project type", input.project_type],
      ["Budget", input.budget],
      ["Timeline", input.timeline],
      ["Name", input.name],
      ["Company", input.company],
      ["Email", input.email],
      ["Phone", input.phone],
      ["Project details", input.message || "(none)"],
      ["Submitted from", input.page_url ?? ""],
    ];
    const html = `<h2>New quote request</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td>${escapeHtml(v).replace(/\r?\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    try {
      const mail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.QUOTE_NOTIFY_FROM || "Apeiro Website <onboarding@resend.dev>",
          to: [process.env.QUOTE_NOTIFY_TO || "info@apeiroconstruction.com"],
          reply_to: input.email,
          subject: `New quote request: ${input.project_type}, ${input.budget} (${input.company})`,
          html,
          text,
        }),
      });
      if (!mail.ok) console.error("[quote] Resend email failed", mail.status, await mail.text().catch(() => ""));
    } catch (err) {
      console.error("[quote] Resend email error", err);
    }
  } else {
    console.warn("[quote] RESEND_API_KEY not set; no notification email sent.");
  }

  return NextResponse.json({ ok: true });
}
