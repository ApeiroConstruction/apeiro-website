import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/Blocks";
import PostBody, { formatDate } from "@/components/PostBody";
import { POSTS, getPost } from "@/content/posts";
import { pageMeta } from "@/lib/seo";
import { BUSINESS, MEDIA, ROUTES, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const title = `${post.title} | Apeiro`;
  return pageMeta({ title, description: post.description, path: `${ROUTES.blog}/${post.slug}` });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const url = `${SITE_URL}${ROUTES.blog}/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: { "@type": "Organization", name: BUSINESS.name, logo: { "@type": "ImageObject", url: SITE_URL + MEDIA.logo } },
  };

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        pad="compact"
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Blog", href: ROUTES.blog }, { label: post.title }]}
        title={<span style={{ fontSize: "clamp(40px, 5.5vw, 68px)", display: "block" }}>{post.title}</span>}
      >
        <p style={{ margin: 0, color: "var(--on-dark)", fontSize: 15 }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </PageHero>

      <article className="bg-white">
        <div className="container section">
          <PostBody blocks={post.blocks} />
        </div>
      </article>

      <section aria-labelledby="more-posts" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <h2 className="h2" id="more-posts">
              More Articles
            </h2>
            <Link href={ROUTES.blog} className="btn btn-sm btn-outline-dark">
              View All Articles
            </Link>
          </div>
          <ul className="post-grid">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`${ROUTES.blog}/${p.slug}`} className="post-card card">
                  <time dateTime={p.date} className="tag">
                    {formatDate(p.date)}
                  </time>
                  <h3 className="h3-sm">{p.title}</h3>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
