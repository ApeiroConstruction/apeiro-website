import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Loads every row of redirects.csv as a permanent (301) redirect.
 * Rows where the old and new path are the same, and rows still marked TBD
 * (blog posts), are skipped.
 */
function loadRedirects() {
  const csv = readFileSync(join(process.cwd(), "redirects.csv"), "utf8");
  const rows = csv.trim().split(/\r?\n/).slice(1);
  const out: { source: string; destination: string; statusCode: 301 }[] = [];
  for (const row of rows) {
    const [oldPath, newPath] = row.split(",");
    if (!oldPath || !newPath || newPath === "TBD" || oldPath.includes("<")) continue;
    if (oldPath === newPath) continue;
    out.push({ source: oldPath, destination: newPath, statusCode: 301 });
  }
  return out;
}

// Same rule as src/lib/env.ts (NEXT_PUBLIC_SITE_ENV is set per deploy type in netlify.toml).
const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
const isProduction = siteEnv
  ? siteEnv === "production"
  : process.env.CONTEXT === "production" || process.env.VERCEL_ENV === "production";

// Pre-launch review password (see src/middleware.ts). Only active in "prelaunch" mode and
// only if PREVIEW_PASSWORD is set in Netlify. Only a SHA-256 hash is built into the site,
// never the password itself. Launching (SITE_ENV = "production") switches it off.
const previewPassword = siteEnv === "prelaunch" ? (process.env.PREVIEW_PASSWORD || "").trim() : "";
const previewPasswordHash = previewPassword ? createHash("sha256").update(previewPassword).digest("hex") : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { PREVIEW_PASSWORD_SHA256: previewPasswordHash },
  // Inline the (small) stylesheet into each page so it doesn't block the first paint.
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return loadRedirects();
  },
  async headers() {
    // Security headers on every page (HTTPS/HSTS and nosniff are already added by Netlify).
    const security = [
      // Stop other sites from showing ours inside a frame (clickjacking).
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests",
      },
      // Only share our domain (not full page addresses) when visitors follow a link elsewhere.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // The site never needs camera, microphone, location or payment access.
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    ];
    // Preview and development deployments must never be indexed.
    const noindex = isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers: [...security, ...noindex] }];
  },
};

export default nextConfig;
