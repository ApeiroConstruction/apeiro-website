import { CtaBand, MediaImage, PageHero, ProcessSteps, SectionHead, ServicePanel } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Pre-Construction Services in London, ON | Apeiro Construction",
  description:
    "Feasibility, cost estimating, design consultation, permits and value engineering that set your project up for success before ground is broken in London, ON.",
  path: ROUTES.preConstruction,
});

const SERVICES = [
  {
    id: "site-feasibility-cost-estimating",
    title: "Site Feasibility & Cost Estimating",
    text: "An early evaluation of your project’s viability and cost. We review zoning regulations, environmental factors and site conditions, then provide clear budget estimates covering materials, labour and other essentials, so you can make informed decisions before committing.",
    benefits: ["Accurate cost predictions", "Confidence in project feasibility", "Better use of your budget"],
  },
  {
    id: "design-consultation-planning",
    title: "Design Consultation & Planning",
    text: "Tailored design consultation and planning to bring your vision to life. Working with a diverse team of specialists, including your architect and design partners, we combine leading-edge technology with traditional craft and keep you actively involved from concept to completion. Adaptive planning and detailed consultation address both creativity and the practical needs of each project.",
    benefits: ["Well-planned spaces", "Customized project planning", "Expert guidance at every phase"],
  },
  {
    id: "permit-zoning-assistance",
    title: "Permit & Zoning Assistance",
    text: "Help navigating zoning and permit requirements before construction begins. From site plans to architectural drawings, we coordinate document preparation, craft applications that meet rigorous standards, and communicate with local authorities on your behalf.",
    benefits: ["Fewer costly delays", "Compliance with local zoning laws", "Less regulatory hassle"],
  },
  {
    id: "value-engineering-procurement",
    title: "Value Engineering & Procurement Planning",
    text: "Function analysis and life-cycle cost assessments identify where to save without compromising quality. We plan procurement early, using supplier negotiations and benchmarking to secure the best terms and reduce the risk of delays and price swings.",
    benefits: ["Lower project costs", "Smarter material choices", "Protection against price volatility"],
  },
  {
    id: "permit-inspection-coordination",
    title: "Permit & Inspection Coordination",
    text: "Once work is underway, we manage permit submissions and schedule inspections with local officials so each stage moves forward without holdups. Regular updates keep every stakeholder informed.",
    benefits: ["Faster approvals", "Fewer delays", "Simpler compliance management"],
  },
];

const STEPS = [
  { title: "Initial Assessment", text: "Your goals, site and requirements." },
  { title: "Analysis & Estimating", text: "Zoning, environmental factors, costs and procurement options reviewed." },
  { title: "Planning & Approvals", text: "Design input, permit applications and procurement strategy finalized with your team." },
  { title: "Report & Recommendations", text: "Clear findings and next steps so you can move forward with confidence." },
];

export default function PreConstructionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services", href: ROUTES.services }, { label: "Pre-Construction" }]}
        title="Pre-Construction Services in London, Ontario"
        intro="Feasibility, cost estimating, design consultation, permits and value engineering that set your project up for success before ground is broken, across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">Decisions Made Early Save the Most</h2>
            <p className="p">
              The earliest decisions on a project have the biggest impact on cost and schedule. Our pre-construction team helps you confirm feasibility, set a
              realistic budget, secure approvals and plan procurement, so construction starts with fewer surprises.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/service-pre-construction-intro.jpg" alt="Apeiro hard hat on construction plans" />
          </div>
        </div>
      </section>

      <section id="services" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <SectionHead title="Our Pre-Construction Services" sub="Select a service to see what’s included." />
          <div className="panels">
            {SERVICES.map((s, i) => (
              <ServicePanel key={s.id} id={s.id} title={s.title} text={s.text} benefits={s.benefits} open={i === 0} />
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

      <CtaBand title="Starting a New Project?" text="Bring us in early. Tell us about your project and we’ll follow up with next steps." />
    </>
  );
}
