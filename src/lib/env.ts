// Is this the live production site? Only production may be indexed by search engines,
// and only production refuses quote submissions when the database isn't configured.
//
// NEXT_PUBLIC_SITE_ENV is set per deploy type in netlify.toml (production / preview) and
// baked in at build time. CONTEXT is Netlify's own build variable; VERCEL_ENV kept as a fallback.
// "prelaunch" (Netlify main site before the domain is connected) is deliberately NOT production.
const SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV;
export const IS_PRODUCTION = SITE_ENV
  ? SITE_ENV === "production"
  : process.env.CONTEXT === "production" || process.env.VERCEL_ENV === "production";
