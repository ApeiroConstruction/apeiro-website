import { PageHero } from "@/components/Blocks";
import QuoteForm from "@/components/QuoteForm";
import { pageMeta } from "@/lib/seo";
import { BUSINESS, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Request a Quote | Apeiro Construction",
  description:
    "Request a quote from Apeiro Construction in four quick steps. Tell us about your commercial, institutional or civil project and our team will follow up.",
  path: ROUTES.quote,
});

const NEXT_STEPS = [
  "Our team reviews your project details.",
  "We contact you to discuss scope, schedule and next steps.",
  "You receive a clear, detailed proposal.",
];

export default function QuotePage() {
  return (
    <>
      <PageHero pad="compact" crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Request a Quote" }]} title="Request a Quote" intro="Four quick steps. Tell us about your project and our team will follow up.">
        {null}
      </PageHero>

      <section id="quote" className="bg-light">
        <div className="container" style={{ paddingTop: 64, paddingBottom: 88, display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px 56px" }}>
          <div className="card" style={{ flex: "2 1 560px", minWidth: 0, padding: "clamp(24px, 4vw, 44px)", overflow: "visible" }}>
            <QuoteForm />
          </div>
          <div className="stack" style={{ flex: "1 1 300px", minWidth: 0, gap: 20 }}>
            <h2 className="h3" style={{ fontSize: 30 }}>
              What Happens Next
            </h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {NEXT_STEPS.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 14 }}>
                  <span aria-hidden="true" style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 800, color: "var(--red-text)", lineHeight: 1 }}>
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <div className="stack" style={{ borderTop: "1px solid var(--border)", paddingTop: 20, gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Prefer to talk?</span>
              <a href={BUSINESS.phoneHref} style={{ fontSize: 20, fontWeight: 600, color: "var(--red-text)", minHeight: 44, display: "inline-flex", alignItems: "center" }}>
                {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} style={{ minHeight: 44, display: "inline-flex", alignItems: "center", overflowWrap: "anywhere" }}>
                {BUSINESS.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
