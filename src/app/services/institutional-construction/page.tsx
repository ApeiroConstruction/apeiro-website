import Link from "next/link";
import { CtaBand, MediaImage, PageHero, ProcessSteps, ProjectCard, SectionHead, ServicePanel } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { MEDIA, ROUTES, type ProjectSummary } from "@/lib/site";

export const metadata = pageMeta({
  title: "Institutional Construction in London, ON | Apeiro Construction",
  description:
    "Schools, healthcare facilities, community and religious centres, and government and emergency services buildings for public-sector clients across Ontario.",
  path: ROUTES.institutional,
});

const PANELS = [
  {
    id: "school-university",
    title: "School & University Construction",
    text: "Classrooms, labs and campus facilities designed for flexible learning, accessibility and student safety. We build security measures and safety protocols into the plan from the start, creating spaces that adapt to future educational needs.",
    benefits: ["Safe, accessible learning spaces", "Flexible layouts for evolving needs", "Energy-efficient, sustainable building practices"],
  },
  {
    id: "hospital-healthcare",
    title: "Hospital & Healthcare Facility Construction",
    text: "Healthcare facilities built around patient care and efficient workflows, from initial planning to final inspection. We work closely with healthcare professionals and use durable, infection-resistant materials that meet strict hygiene and regulatory standards.",
    benefits: ["Better patient and staff workflows", "Infection-resistant materials", "Compliance with healthcare regulations"],
  },
  {
    id: "religious-community",
    title: "Religious & Community Centre Construction",
    text: "Places of worship, halls and community centres planned through close consultation with your community. We balance modern design with traditional values to create versatile, accessible spaces for worship, events and gatherings.",
    benefits: ["Accessible, inclusive spaces", "Flexible halls for many uses", "Cost-effective, sustainable construction"],
  },
  {
    id: "government-emergency",
    title: "Government & Emergency Services Buildings",
    text: "Public service and emergency facilities built for safety, durability and accessibility. We use robust materials such as fire-resistant components and reinforced concrete, and meet accessibility requirements under the AODA and the Ontario Building Code.",
    benefits: ["Safety and security built in", "Durable, resilient structures", "Efficient procurement and coordination"],
  },
];

const STEPS = [
  { title: "Planning & Stakeholder Consultation", text: "Goals, budget and requirements defined with your stakeholders before construction begins." },
  { title: "Design & Compliance", text: "Coordinated with your design team to meet code, accessibility and sector-specific standards." },
  { title: "Construction", text: "Skilled crews and dedicated project management keep work safe, on schedule and on budget." },
  { title: "Inspection & Handover", text: "Thorough inspections and quality checks before we hand over the finished facility." },
];

const PROJECTS: ProjectSummary[] = [
  {
    name: "Veteran’s Drive, Stratford",
    tag: "Institutional · Stratford",
    note: "Bandshell rehabilitation and public space enhancement",
  },
  {
    name: "Terrace Lodge",
    img: MEDIA.terracePoster,
    alt: "Terrace Lodge during exterior renewal",
    tag: "Institutional",
    note: "Siding and soffit replacement",
  },
];

export default function InstitutionalPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services", href: ROUTES.services }, { label: "Institutional Construction" }]}
        title="Institutional Construction in London, Ontario"
        intro="Schools, healthcare facilities, community and religious centres, and government and emergency services buildings for public-sector clients across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Built for Public Accountability</h2>
            <p className="p">
              Institutional projects carry higher stakes: occupied buildings, strict regulations, public budgets, and communities that depend on the result. We
              plan around your stakeholders and compliance requirements, build to code with durable materials, and keep your project on scope, schedule and budget
              from planning to handover.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/service-institutional-intro.jpg" alt="Apeiro crew working beside a building" />
          </div>
        </div>
      </section>

      <section id="services" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <SectionHead title="Our Institutional Services" sub="Select a service to see what’s included." />
          <div className="panels">
            {PANELS.map((p, i) => (
              <ServicePanel key={p.id} id={p.id} title={p.title} text={p.text} benefits={p.benefits} open={i === 0} />
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

      <CtaBand
        title="Planning an Institutional Project?"
        text="Tell us about your school, healthcare, community or government project and we’ll follow up with next steps."
      />
    </>
  );
}
