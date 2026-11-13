import type { NextConfig } from "next";
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

const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return loadRedirects();
  },
  async headers() {
    // Preview and development deployments must never be indexed.
    if (isProduction) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
