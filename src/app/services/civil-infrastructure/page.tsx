import Link from "next/link";
import { CtaBand, MediaImage, PageHero, ProcessSteps, ProjectCard, SectionHead, ServicePanel } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { MEDIA, ROUTES, type ProjectSummary } from "@/lib/site";

export const metadata = pageMeta({
  title: "Civil & Infrastructure Construction in London, ON | Apeiro",
  description:
    "Roads, drainage, earthworks, municipal infrastructure, demolition and structural work for municipal, institutional and commercial clients across Ontario.",
  path: ROUTES.civil,
});

const SPECIALTIES = [
  {
    title: "Structural Concrete & Foundations",
    text: "Foundations and structural concrete built for long-term stability.",
    img: "/images/specialty-concrete-intro.jpg",
    alt: "Crew placing a new concrete walkway",
    href: ROUTES.concrete,
  },
  {
    title: "Asphalt Paving",
    text: "Durable paving for commercial and municipal projects.",
    img: "/images/specialty-asphalt-intro.jpg",
    alt: "Crew raking fresh asphalt",
    href: ROUTES.asphalt,
  },
  {
    title: "Water, Sewer & Utility Installation",
    text: "PVC and ductile iron water, sewer and utility systems.",
    img: "/images/specialty-water-sewer-intro.jpg",
    alt: "Crew connecting a water main pipe in a trench box",
    href: ROUTES.waterSewer,
  },
];

const PANELS = [
  {
    id: "road-highway",
    title: "Road & Highway Construction",
    text: "Complete road construction from site preparation and grading to paving, lane markings and signage. We build in effective drainage from the start to extend road life and reduce long-term maintenance.",
    benefits: ["Smoother traffic flow", "Safer roads", "Longer-lasting, low-maintenance surfaces"],
  },
  {
    id: "drainage-stormwater",
    title: "Drainage & Stormwater Systems",
    text: "Drainage and stormwater systems designed to manage runoff, reduce flood risk and protect local waterways. We install with durable materials, inspect after installation, and offer ongoing maintenance to keep systems working year-round.",
    benefits: ["Lower flood risk", "Better water management", "Environmentally responsible solutions"],
  },
  {
    id: "site-grading-earthworks",
    title: "Site Grading & Earthworks",
    text: "Excavation, grading and land preparation using laser levels and GPS systems for precise results. We clear and prepare the site, then put erosion controls such as silt fences and sediment basins in place to protect the surrounding environment.",
    benefits: ["Stable, level foundations", "Proper drainage and runoff control", "Fewer delays for the work that follows"],
  },
  {
    id: "municipal-infrastructure",
    title: "Municipal Infrastructure Construction",
    text: "Roads, sewage systems and public spaces built for safety, accessibility and long-term reliability. We work within local zoning and environmental requirements and keep disruption to residents and daily life to a minimum.",
    benefits: ["Stronger community infrastructure", "Public safety", "Sustainable stormwater and erosion control"],
  },
  {
    id: "demolition-site-clearing",
    title: "Demolition & Site Clearing",
    text: "Safe, compliant removal of existing structures to prepare sites for new development. We handle permits, follow strict safety guidelines, coordinate the safe removal of hazardous materials such as asbestos by licensed specialists, and recycle materials wherever possible.",
    benefits: ["Sites ready faster", "Cost-effective preparation", "Environmental compliance"],
  },
  {
    id: "structural-reinforcement",
    title: "Structural Reinforcement",
    text: "Upgrades that strengthen existing buildings to meet changing regulations, support increased loads or address structural weaknesses. We use steel beams, carbon fibre wraps and reinforced concrete, including load-bearing and seismic upgrades, with minimal disruption to daily operations.",
    benefits: ["Stronger structural integrity", "Longer building life", "Improved safety"],
  },
  {
    id: "structural-forming",
    title: "Structural Forming",
    text: "Temporary and permanent formwork for concrete structures, planned and assembled for precision and safety. Efficient forming systems speed up construction and reduce material waste and cost.",
    benefits: ["Structural strength", "Faster schedules", "Less waste and lower cost"],
  },
];

const PROJECTS: ProjectSummary[] = [
  {
    name: "Hard Surface Restoration Program",
    img: MEDIA.hsrPoster,
    alt: "Aerial view of crew restoring concrete sidewalk panels",
    tag: "Civil & Infrastructure · Southwestern Ontario",
    note: "Ongoing concrete restoration subcontract for Ledcor",
  },
  {
    name: "Site Works, 1015 Eagle Drive",
    tag: "Civil & Infrastructure · London",
    note: "Retaining wall, asphalt parking lot and foundation repairs",
  },
];

const STEPS = [
  { title: "Site Assessment & Planning", text: "A thorough evaluation of site conditions, requirements and local regulations." },
  { title: "Permits & Coordination", text: "Permits, engineering and schedules coordinated before work begins." },
  { title: "Execution", text: "Our own crews self-perform critical scopes with precision and constant communication." },
  { title: "Inspection & Handover", text: "Thorough inspections to make sure everything meets specifications and safety standards." },
];

export default function CivilPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services", href: ROUTES.services }, { label: "Civil & Infrastructure" }]}
        title="Civil & Infrastructure Construction in London, Ontario"
        intro="Roads, drainage, earthworks, municipal infrastructure, demolition and structural work for municipal, institutional and commercial clients across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Self-Performed Where It Matters</h2>
            <p className="p">
              Civil work is where schedules and budgets are most often won or lost. Our own crews self-perform concrete, asphalt, sewer and water main work, so we
              control quality and timing on the most critical scopes, from site preparation and underground servicing to final paving.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/service-civil-intro.jpg" alt="Excavator breaking up old pavement on a work site" />
          </div>
        </div>
      </section>

      <section id="specialties" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <h2 className="h2">Our Self-Performed Specialties</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
            {SPECIALTIES.map((s) => (
              <Link key={s.href} href={s.href} className="card svc-card">
                <MediaImage src={s.img} alt={s.alt} ratio="16/10" sizes="(max-width: 900px) 100vw, 400px" />
                <div className="svc-card-body">
                  <h3 className="h3">{s.title}</h3>
                  <p className="text" style={{ margin: 0 }}>
                    {s.text}
                  </p>
                  <span className="learn">Learn more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <SectionHead title="Our Civil Services" sub="Select a service to see what’s included." />
          <div className="panels">
            {PANELS.map((p, i) => (
              <ServicePanel key={p.id} id={p.id} title={p.title} text={p.text} benefits={p.benefits} open={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white border-top">
        <div className="container section stack" style={{ gap: 36 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <h2 className="h2">Related Projects</h2>
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

      <section id="process" className="bg-dark dark">
        <div className="container section stack" style={{ gap: 44 }}>
          <h2 className="h2">Our Process</h2>
          <ProcessSteps steps={STEPS} />
        </div>
      </section>

      <CtaBand
        title="Planning a Civil or Infrastructure Project?"
        text="Tell us about your road, drainage, site works or structural project and we’ll follow up with next steps."
      />
    </>
  );
}
