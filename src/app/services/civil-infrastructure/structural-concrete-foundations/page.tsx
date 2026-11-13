import Link from "next/link";
import { CtaBand, MediaImage, PageHero, ProcessSteps, ProjectCard } from "@/components/Blocks";
import { Check, Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { MEDIA, ROUTES, type ProjectSummary } from "@/lib/site";

export const metadata = pageMeta({
  title: "Structural Concrete & Foundations in London, ON | Apeiro",
  description:
    "Foundations and structural concrete built for long-term stability, self-performed by our own crews across London, Barrie, Cambridge and surrounding Ontario regions.",
  path: ROUTES.concrete,
});

const DELIVER = [
  "New foundations",
  "Structural concrete elements",
  "Custom concrete mixes for project-specific demands",
  "Foundation repair and underpinning",
  "Solutions for settlement and water intrusion",
];

const BENEFITS = [
  {
    title: "Long-Term Stability",
    text: "Lower risk of settlement over the life of the building.",
    icon: (
      <>
        <path d="M12 3.5 19 6v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-4.5" />
      </>
    ),
  },
  {
    title: "Durability",
    text: "Built for high-traffic institutional and industrial settings.",
    icon: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  {
    title: "Cost Efficiency",
    text: "Fewer delays and long-term savings.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5" />
      </>
    ),
  },
];

const STEPS = [
  { title: "Site Assessment & Planning", text: "Soil and site evaluation, and a review of local regulations." },
  { title: "Engineering Coordination", text: "Work planned with your structural engineer to suit site and environmental conditions." },
  { title: "Pouring & Curing", text: "Concrete placed and cured with care for optimal strength and consistency." },
  { title: "Inspection & Approval", text: "Comprehensive inspections and your sign-off before the next phase begins." },
];

const PROJECTS: ProjectSummary[] = [
  {
    name: "Hard Surface Restoration Program",
    img: MEDIA.hsrPoster,
    alt: "Aerial view of crew restoring concrete sidewalk panels",
    tag: "Civil & Infrastructure · Southwestern Ontario",
    note: "Ongoing concrete restoration subcontract for Ledcor",
  },
];

export default function ConcretePage() {
  return (
    <>
      <PageHero wide
        crumbs={[
          { label: "Home", href: ROUTES.home },
          { label: "Services", href: ROUTES.services },
          { label: "Civil & Infrastructure", href: ROUTES.civil },
          { label: "Structural Concrete & Foundations" },
        ]}
        title="Structural Concrete & Foundations in London, Ontario"
        intro="Foundations and structural concrete built for long-term stability, self-performed by our own crews across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">A Solid Base for Every Project</h2>
            <p className="p">
              Every structure depends on what’s beneath it. We start with a careful soil assessment, then install foundations and structural concrete that address
              settlement, water intrusion and increased loads. Because our own crews do this work, we control mix quality, placement and curing from start to
              finish.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/specialty-concrete-intro.jpg" alt="Crew placing a new concrete walkway" />
          </div>
        </div>
      </section>

      <section id="deliver" className="bg-light border-top">
        <div className="container stack" style={{ paddingTop: 88, paddingBottom: 72, gap: 64 }}>
          <div className="split">
            <div className="split-media">
              <MediaImage src="/images/specialty-concrete-deliver.jpg" alt="Crew finishing a new concrete sidewalk" />
            </div>
            <div className="split-text" style={{ gap: 28 }}>
              <h2 className="h2">What We Deliver</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {DELIVER.map((d) => (
                  <li key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 17, fontWeight: 500 }}>
                    <Check size={22} style={{ flex: "0 0 auto" }} />
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
                  <p style={{ margin: 0, color: "var(--body)", fontSize: 15 }}>{b.text}</p>
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
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} project={p} ratio="16/10" />
            ))}
          </div>
        </div>
      </section>

      <section id="related" className="bg-white">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 36px" }}>
          <span style={{ fontWeight: 600, color: "var(--body)" }}>Other self-performed specialties:</span>
          <Link href={ROUTES.asphalt} className="text-link">
            Asphalt Paving
          </Link>
          <Link href={ROUTES.waterSewer} className="text-link">
            Water, Sewer &amp; Utility Installation
          </Link>
          <Link href={ROUTES.civil} className="text-link" style={{ color: "var(--charcoal)", borderBottomColor: "var(--charcoal)" }}>
            All civil services
          </Link>
        </div>
      </section>

      <CtaBand title="Need a Foundation You Can Build On?" text="Tell us about your project and we’ll follow up with next steps." />
    </>
  );
}
