import Link from "next/link";
import type { CSSProperties } from "react";
import { CallButton, MediaImage, PageHero, QuoteButton } from "@/components/Blocks";
import { Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Apeiro Construction | London, ON Contractor",
  description:
    "Apeiro Construction is a London, Ontario contractor delivering civil and ICI infrastructure for institutional, municipal, commercial and industrial clients.",
  path: ROUTES.about,
});

const bodyText: CSSProperties = { margin: 0, color: "var(--body)", fontSize: 17 };

const VALUES = [
  {
    title: "Quality & Safety",
    text: "Every build meets or exceeds the Ontario Building Code and municipal standards, and every site follows IHSA safety standards.",
    icon: (
      <>
        <path d="M12 3.5 19 6v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-4.5" />
      </>
    ),
  },
  {
    title: "Client Focus",
    text: "Each project is planned around your operational, regulatory and scheduling needs, with one point of contact throughout.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </>
    ),
  },
  {
    title: "Innovative Solutions",
    text: "3D modelling and digital project tools help us plan accurately and deliver efficiently.",
    icon: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="M3 7.5v9L12 21l9-4.5v-9" />
        <path d="M12 12v9" />
      </>
    ),
  },
  {
    title: "Sustainable Practices",
    text: "We minimize environmental impact and site disruption without compromising quality.",
    icon: (
      <>
        <path d="M5 19c8 0 14-6 14-14-8 0-14 5-14 13" />
        <path d="M5 19l7-7" />
      </>
    ),
  },
];

const SECTORS = [
  {
    title: "Public Sector",
    text: "Municipal infrastructure, government buildings, institutional and healthcare facilities, and community and religious centres.",
    link: "Institutional services",
    href: ROUTES.institutional,
  },
  {
    title: "Commercial",
    text: "Commercial developments, retail and office construction, and hospitality and restaurant builds.",
    link: "Commercial services",
    href: ROUTES.commercial,
  },
  {
    title: "Industrial",
    text: "Industrial facilities, warehouses and distribution centres, including site works and structural concrete.",
    link: "Civil & infrastructure services",
    href: ROUTES.civil,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Apeiro Construction"
        intro="A London, Ontario contractor delivering civil and ICI infrastructure for institutional, municipal, commercial and industrial clients."
      >
        {null}
      </PageHero>

      <section id="who" className="bg-white">
        <div className="container section-lg split" style={{ gap: "48px 64px" }}>
          <div className="split-text">
            <h2 className="h2">Built for Complex Projects</h2>
            <p style={bodyText}>
              Apeiro Construction works exclusively with business and public-sector clients, delivering civil infrastructure and ICI projects across London,
              Barrie, Cambridge and surrounding Ontario regions.
            </p>
            <p style={bodyText}>
              Led by Owner and Managing Director Andres Betancourt, our team brings a builder’s mindset and a deeply connected industry network to every job,
              from ground-up construction to large-scale civil works. Our promise is <strong>Precision Over Excess</strong>: we build strictly to scope,
              minimize cost overruns and site disruption, and keep communication clear at every stage.
            </p>
            <div className="stack" style={{ gap: 2, paddingTop: 8, borderTop: "1px solid var(--border)", marginTop: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 20,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  paddingTop: 14,
                }}
              >
                London Office
              </span>
              <span style={{ color: "var(--body)" }}>3392 Wonderland Road South, London, Ontario N6L 1J9</span>
            </div>
          </div>
          <div className="split-media">
            <MediaImage src="/images/about-team.jpg" alt="Apeiro Construction team on site" />
          </div>
        </div>
      </section>

      <section id="mission" className="bg-light border-top">
        <div className="container section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 24 }}>
          {[
            {
              title: "Our Mission",
              text: "To deliver civil infrastructure and ICI projects that combine smart design, modern technology and uncompromising quality, built faster, smarter and stronger, with the highest standards of precision, safety and client satisfaction.",
            },
            {
              title: "Our Vision",
              text: "To become one of North America’s most trusted names in civil and ICI construction, known for honouring deadlines, raising industry standards, and building infrastructure that serves communities for generations.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="stack"
              style={{ background: "#fff", borderRadius: 8, borderTop: "4px solid var(--red)", padding: 36, gap: 14 }}
            >
              <h2 className="h2" style={{ fontSize: 40 }}>
                {c.title}
              </h2>
              <p style={bodyText}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="values" className="bg-dark dark">
        <div className="container section-lg stack" style={{ alignItems: "center", gap: 48 }}>
          <div className="stack" style={{ alignItems: "center", gap: 14, textAlign: "center" }}>
            <h2 className="h2">Our Core Values</h2>
            <div className="rule" />
          </div>
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 20 }}>
            {VALUES.map((v) => (
              <div key={v.title} className="dark-card">
                <Icon>{v.icon}</Icon>
                <h3 className="h3">{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-white">
        <div className="container section-lg stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 700 }}>
            <h2 className="h2">Who We Work With</h2>
            <p className="sub">
              Procurement-ready construction tailored to the operational, regulatory and scheduling demands of complex projects across Ontario.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
            {SECTORS.map((s) => (
              <div
                key={s.title}
                className="stack"
                style={{ background: "var(--light)", borderRadius: 8, borderTop: "4px solid var(--red)", padding: 32, gap: 14 }}
              >
                <h3 className="h3" style={{ fontSize: 32, lineHeight: 1 }}>
                  {s.title}
                </h3>
                <p style={{ margin: 0, color: "var(--body)", flexGrow: 1 }}>{s.text}</p>
                <Link href={s.href} className="text-link" style={{ alignSelf: "flex-start", fontSize: 19 }}>
                  {s.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="bg-red on-red">
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px 56px" }}>
          <div className="stack" style={{ flex: "1 1 480px", minWidth: 0, gap: 14 }}>
            <h2 className="h2" style={{ fontSize: "clamp(38px, 4.6vw, 56px)" }}>
              Let’s Build Your Next Project
            </h2>
            <p style={{ margin: 0, fontSize: 18, color: "#fff", maxWidth: 520 }}>Tell us about your project and we’ll follow up with next steps.</p>
            <div className="btn-row" style={{ paddingTop: 8 }}>
              <QuoteButton variant="white" />
              <CallButton />
            </div>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <MediaImage src="/images/about-trucks.jpg" alt="Apeiro Construction branded van" ratio="16/9" style={{ background: "#2A2D31" }} />
          </div>
        </div>
      </section>
    </>
  );
}
