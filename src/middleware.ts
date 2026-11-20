import { NextResponse, type NextRequest } from "next/server";

/**
 * Pre-launch password screen for reviewers (the browser's built-in sign-in box).
 * Active only when the site is built in "prelaunch" mode AND a PREVIEW_PASSWORD is set
 * in Netlify (see next.config.ts). On launch day the site is built as "production",
 * the hash below is empty, and this does nothing, so it can never block Google.
 * Any username works; only the password is checked.
 */
const HASH = process.env.PREVIEW_PASSWORD_SHA256 || "";

async function sha256Hex(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(req: NextRequest) {
  if (!HASH) return NextResponse.next();

  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const password = decoded.slice(decoded.indexOf(":") + 1).trim();
      if (password && (await sha256Hex(password)) === HASH) return NextResponse.next();
    } catch {
      /* malformed header: fall through to the prompt */
    }
  }

  return new NextResponse("This preview is password protected.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Apeiro website preview", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  // Skip build files and fonts (they hold nothing private and are only requested by unlocked pages).
  // /api/health stays reachable so the daily keep-awake check works during the password period.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/health).*)"],
};
