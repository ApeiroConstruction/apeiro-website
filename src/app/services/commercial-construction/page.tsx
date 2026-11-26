import Link from "next/link";
import { CtaBand, MediaImage, PageHero, ProcessSteps, ProjectCard, SectionHead, ServicePanel } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { MEDIA, ROUTES, type ProjectSummary } from "@/lib/site";

export const metadata = pageMeta({
  title: "Commercial Construction in London, ON | Apeiro Construction",
  description:
    "Office, retail, warehouse, medical and restaurant builds, renovations and tenant improvements across London, Cambridge, Barrie and beyond.",
  path: ROUTES.commercial,
});

const PANELS = [
  {
    id: "office-retail",
    title: "Office & Retail Construction",
    text: "Office and retail spaces planned for efficient layouts, durable finishes and a strong customer experience. We build around your day-to-day requirements so the space works from opening day.",
    benefits: ["Efficient use of space", "Functional, modern design", "A better experience for customers and staff"],
  },
  {
    id: "warehouse-distribution",
    title: "Warehouse & Distribution Facilities",
    text: "Warehouses and distribution centres built around your logistics, from site selection and zoning review to high-efficiency layouts and structures designed for future growth, including facilities ready for automated storage and retrieval systems. Every facility meets safety regulations and industry standards.",
    benefits: ["Efficient use of space", "Smoother inventory flow", "Room to scale"],
  },
  {
    id: "medical-dental",
    title: "Medical & Dental Office Builds",
    text: "Healthcare spaces designed for regulatory compliance, accessibility and smooth patient flow. We use materials suited to clinical settings, such as antimicrobial surfaces and soundproofing for private consultation rooms.",
    benefits: ["Streamlined clinic operations", "Patient privacy and comfort", "Compliance with healthcare standards"],
  },
  {
    id: "renovations-tenant-improvements",
    title: "Commercial Renovations & Tenant Improvements",
    text: "Upgrades that modernize commercial spaces for current and future tenants, from consultation and design through construction and handover. We plan the work to minimize disruption in occupied buildings.",
    benefits: ["More efficient workspaces", "Stronger appeal to tenants and clients", "Cost-effective upgrades"],
  },
  {
    id: "restaurant-hospitality",
    title: "Restaurant & Hospitality Construction",
    text: "Restaurants and hospitality spaces built for guest experience and kitchen efficiency, using durable materials like wood and steel and eco-friendly practices. We coordinate every trade to keep you on schedule for opening day.",
    benefits: ["A better guest experience", "Efficient layouts and workflow", "Sustainable design"],
  },
];

const STEPS = [
  { title: "Consultation & Planning", text: "Site analysis, needs assessment and budgeting before construction begins." },
  { title: "Design & Permits", text: "Layouts tailored to your operations, coordinated with your design team and compliant with code." },
  { title: "Construction", text: "Skilled crews and dedicated project management keep work on schedule and on budget." },
  { title: "Inspection & Handover", text: "A detailed walkthrough to make sure every detail meets standards before we hand over the space." },
];

const PROJECTS: ProjectSummary[] = [
  {
    name: "89 Ridout",
    img: MEDIA.ridoutPoster,
    alt: "89 Ridout building exterior",
    tag: "Commercial · London",
    note: "Structural restoration and exterior envelope upgrades",
  },
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services", href: ROUTES.services }, { label: "Commercial Construction" }]}
        title="Commercial Construction in London, Ontario"
        intro="Office, retail, warehouse, medical and restaurant builds, plus renovations and tenant improvements, for businesses across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Built Around Your Business</h2>
            <p className="p">
              We plan and build commercial spaces around how your business operates, with durable materials, efficient layouts and minimal disruption to your
              operations. Every project is managed to scope, schedule and budget, with one point of contact from planning to handover.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/service-commercial-intro.jpg" alt="Apeiro crew and trucks at a commercial site" />
          </div>
        </div>
      </section>

      <section id="services" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <SectionHead title="Our Commercial Services" sub="Select a service to see what’s included." />
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
        title="Planning a Commercial Project?"
        text="Tell us about your office, retail, warehouse, medical or restaurant project and we’ll follow up with next steps."
      />
    </>
  );
}
