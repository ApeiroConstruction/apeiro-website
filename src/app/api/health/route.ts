// Keep-awake / health check. Called once a day by GitHub Actions (.github/workflows/keep-awake.yml).
// Supabase's free plan pauses a project after 7 days with no activity. This calls a tiny
// database function, public.keepalive() (see supabase/quote_requests.sql), which only returns
// the current time: a real, successful database action that reads no quote data.
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, database: "not configured" }, { status: 503 });

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/keepalive`, {
      method: "POST",
      headers: {
        apikey: key,
        ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
      },
      body: "{}",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    await res.text(); // tiny reply (a timestamp); read it so the connection closes cleanly
    const ok = res.ok;
    return NextResponse.json(
      { ok, database: ok ? "awake" : `keepalive failed (status ${res.status})` },
      { status: ok ? 200 : 502, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ ok: false, database: "unreachable" }, { status: 502 });
  }
}
