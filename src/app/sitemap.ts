import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";
import { ROUTES, SITE_URL, SITEMAP_PATHS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [...SITEMAP_PATHS, ROUTES.blog].map((path) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}${ROUTES.blog}/${p.slug}`,
    lastModified: new Date(p.date + "T12:00:00Z"),
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...posts];
}
