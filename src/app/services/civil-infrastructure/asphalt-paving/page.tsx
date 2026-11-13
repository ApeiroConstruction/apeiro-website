import Link from "next/link";
import type { ReactNode } from "react";
import { CtaBand, MediaImage, PageHero, ProcessSteps, ProjectCard } from "@/components/Blocks";
import { Check, Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { ROUTES, type ProjectSummary } from "@/lib/site";

export const metadata = pageMeta({
  title: "Asphalt Paving in London, ON | Apeiro Construction",
  description:
    "Durable asphalt paving for commercial and municipal projects, self-performed by our own crews across London, Barrie, Cambridge and surrounding Ontario regions.",
  path: ROUTES.asphalt,
});

const DELIVER = [
  "New asphalt installation for roads and commercial sites",
  "Hot mix asphalt applications",
  "Resurfacing and repairs",
  "Sealcoating",
  "Drainage management for paved surfaces",
];

const BENEFITS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Durable Surfaces",
    text: "Built to withstand frequent heavy and industrial use.",
    icon: (
      <>
        <path d="M12 3.5 19 6v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-4.5" />
      </>
    ),
  },
  {
    title: "Cost-Effective Maintenance",
    text: "Timely resurfacing and repair reduce long-term costs.",
    icon: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  {
    title: "Safer Traffic",
    text: "Quality installation and repair improve road safety.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5" />
      </>
    ),
  },
];

const STEPS = [
  { title: "Site Preparation", text: "Site evaluation for proper drainage and a stable base." },
  { title: "Material Selection", text: "High-quality asphalt matched to project specifications and safety and environmental standards." },
  { title: "Installation", text: "Laid with precision for a smooth, durable surface." },
  { title: "Final Inspection", text: "Quality verified before handover." },
];

const PROJECT: ProjectSummary = {
  name: "Site Works, 1015 Eagle Drive",
  tag: "Civil & Infrastructure · London",
  note: "Retaining wall, asphalt parking lot and foundation repairs",
};

export default function AsphaltPavingPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "Services", href: ROUTES.services },
          { label: "Civil & Infrastructure", href: ROUTES.civil },
          { label: "Asphalt Paving" },
        ]}
        title="Asphalt Paving in London, Ontario"
        intro="Durable asphalt paving for commercial and municipal projects, self-performed by our own crews across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Smooth Surfaces That Last</h2>
            <p className="p">
              From new installations to resurfacing and maintenance, our crews deliver asphalt surfaces built for heavy use. Proper site preparation and
              drainage come first to prevent water damage and extend surface life, followed by high-quality hot mix applications for a smooth, durable finish.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/specialty-asphalt-intro.jpg" alt="Crew raking fresh asphalt" />
          </div>
        </div>
      </section>

      <section id="deliver" className="bg-light border-top">
        <div className="container stack" style={{ paddingTop: 88, paddingBottom: 72, gap: 64 }}>
          <div className="split">
            <div className="split-media">
              <MediaImage src="/images/specialty-asphalt-deliver.jpg" alt="Roller compacting fresh asphalt" />
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

      <section id="projects" className="bg-white border-top">
        <div className="container section stack" style={{ gap: 36 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <h2 className="h2">Project Example</h2>
            <Link href={ROUTES.projects} className="btn btn-sm btn-outline-dark">
              View All Projects
            </Link>
          </div>
          <div className="card-grid-340">
            <ProjectCard project={PROJECT} ratio="16/10" />
          </div>
        </div>
      </section>

      <section id="related" className="bg-white">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 36px" }}>
          <span style={{ fontWeight: 600, color: "#3E4247" }}>Other self-performed specialties:</span>
          <Link href={ROUTES.concrete} className="text-link">
            Structural Concrete &amp; Foundations
          </Link>
          <Link href={ROUTES.waterSewer} className="text-link">
            Water, Sewer &amp; Utility Installation
          </Link>
          <Link href={ROUTES.civil} className="text-link" style={{ color: "#1C1E22", borderBottomColor: "#1C1E22" }}>
            All civil services
          </Link>
        </div>
      </section>

      <CtaBand title="Planning an Asphalt Paving Project?" text="Tell us about your project and we’ll follow up with next steps." />
    </>
  );
}
