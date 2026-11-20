// Keep-awake / health check. Called once a day by GitHub Actions (.github/workflows/keep-awake.yml).
// Supabase's free plan pauses a project after 7 days with no activity; this sends one tiny
// request to the database each day so the quote form never finds it asleep.
// The website's key may only INSERT quote requests, so this read is refused by the database
// on purpose. That still counts as activity, and no quote data is ever read or returned.
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, database: "not configured" }, { status: 503 });

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/quote_requests?select=id&limit=1`, {
      headers: { apikey: key, ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}) },
      cache: "no-store",
    });
    // 200 = readable, 401/403 = reached the database and was refused (expected). Both mean "awake".
    const reached = res.status === 200 || res.status === 401 || res.status === 403;
    await res.body?.cancel();
    return NextResponse.json(
      { ok: reached, database: reached ? "awake" : `unexpected status ${res.status}` },
      { status: reached ? 200 : 502, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ ok: false, database: "unreachable" }, { status: 502 });
  }
}
