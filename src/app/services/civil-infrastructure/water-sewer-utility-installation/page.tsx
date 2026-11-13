import Link from "next/link";
import type { ReactNode } from "react";
import { CtaBand, MediaImage, PageHero, ProcessSteps } from "@/components/Blocks";
import { Check, Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Water, Sewer & Utility Installation in London, ON | Apeiro",
  description:
    "Water main, sewer and utility systems installed by our own crews for municipal, institutional and commercial projects across London and surrounding Ontario regions.",
  path: ROUTES.waterSewer,
});

const DELIVER = [
  "Water main installation",
  "Sewer installation",
  "Utility connections and servicing",
  "Stormwater and drainage pipe systems",
  "Retention pond construction",
  "Maintenance to prevent leaks",
];

const BENEFITS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Reliable Infrastructure",
    text: "Resilient materials such as ductile iron for long service life.",
    icon: (
      <>
        <path d="M12 3.5 19 6v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-4.5" />
      </>
    ),
  },
  {
    title: "Cost-Efficient Solutions",
    text: "Smart planning, including retention ponds and flood prevention.",
    icon: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  {
    title: "Quality & Compliance",
    text: "Every installation meets regulatory standards.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5" />
      </>
    ),
  },
];

const STEPS = [
  { title: "Site Assessment", text: "A review of site conditions and regulatory requirements." },
  { title: "Planning & Scheduling", text: "Detailed layouts and timelines that keep your project on track." },
  { title: "Material Selection", text: "PVC and ductile iron matched to your project’s requirements." },
  { title: "Installation", text: "Precise alignment and connections, with full regulatory compliance." },
];

export default function WaterSewerPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "Services", href: ROUTES.services },
          { label: "Civil & Infrastructure", href: ROUTES.civil },
          { label: "Water, Sewer & Utility Installation" },
        ]}
        title="Water, Sewer & Utility Installation in London, Ontario"
        intro="Water main, sewer and utility systems installed by our own crews for municipal, institutional and commercial projects across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Underground Work Done Right</h2>
            <p className="p">
              Underground servicing is hard to fix once it’s buried, so we get it right the first time. We install water, sewer and utility systems using PVC
              and ductile iron pipe, with precise layouts, solid connections and full compliance with local regulations.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/specialty-water-sewer-intro.jpg" alt="Crew connecting a water main pipe in a trench box" />
          </div>
        </div>
      </section>

      <section id="deliver" className="bg-light border-top">
        <div className="container stack" style={{ paddingTop: 88, paddingBottom: 72, gap: 64 }}>
          <div className="split">
            <div className="split-media">
              <MediaImage src="/images/specialty-water-sewer-deliver.jpg" alt="Pipe laid in an excavated trench" />
            </div>
            <div className="split-text" style={{ gap: 28 }}>
              <h2 className="h2">What We Deliver</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {DELIVER.map((d) => (
                  <li key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 17, fontWeight: 500 }}>
                    <Check size={22} style={{ flex: "0 0 auto", marginTop: 2 }} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            role="group"
            aria-label="Key benefits"
            style={{ display: "flex", flexWrap: "wrap", gap: "32px 48px", borderTop: "1px solid #D6D3CC", paddingTop: 40 }}
          >
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ flex: "1 1 260px", minWidth: 0, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Icon size={36} stroke="#C20000" strokeWidth={1.8} style={{ flex: "0 0 auto" }}>
                  {b.icon}
                </Icon>
                <div className="stack" style={{ gap: 4 }}>
                  <h3 className="h3" style={{ fontSize: 24 }}>
                    {b.title}
                  </h3>
                  <p style={{ margin: 0, color: "#3E4247", fontSize: 15 }}>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-dark dark">
        <div className="container section stack" style={{ gap: 44 }}>
          <h2 className="h2">Our Process</h2>
          <ProcessSteps steps={STEPS} />
        </div>
      </section>

      <section id="related" className="bg-white">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 36px" }}>
          <span style={{ fontWeight: 600, color: "#3E4247" }}>Other self-performed specialties:</span>
          <Link href={ROUTES.concrete} className="text-link">
            Structural Concrete &amp; Foundations
          </Link>
          <Link href={ROUTES.asphalt} className="text-link">
            Asphalt Paving
          </Link>
          <Link href={ROUTES.civil} className="text-link" style={{ color: "#1C1E22", borderBottomColor: "#1C1E22" }}>
            All civil services
          </Link>
        </div>
      </section>

      <CtaBand title="Need Water, Sewer or Utility Work?" text="Tell us about your project and we’ll follow up with next steps." />
    </>
  );
}
