import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { formatDate } from "@/components/PostBody";
import { POSTS } from "@/content/posts";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Blog | Commercial, Institutional & Civil Construction | Apeiro",
  description:
    "Articles from Apeiro Construction on ICI construction in Ontario: pre-construction planning, safety and quality, permits, warehouses, roads and LEED.",
  path: ROUTES.blog,
});

export default function BlogPage() {
  return (
    <>
      <PageHero pad="compact" crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Blog" }]} title="Blog">
        {null}
      </PageHero>

      <section id="posts" className="bg-light">
        <div className="container section">
          <ul className="post-grid">
            {POSTS.map((p) => (
              <li key={p.slug}>
                <Link href={`${ROUTES.blog}/${p.slug}`} className="post-card card">
                  <time dateTime={p.date} className="tag">
                    {formatDate(p.date)}
                  </time>
                  <h2 className="h3-sm">{p.title}</h2>
                  <p className="text">{p.description}</p>
                  <span className="learn" aria-hidden="true">
                    Read article
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Planning Your 2026/2027 Pipeline?"
        text="We’re accepting invited bids and prequalification packages for projects between $800K and $4M+."
      />
    </>
  );
}
