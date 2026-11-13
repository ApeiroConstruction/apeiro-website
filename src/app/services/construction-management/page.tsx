import { CtaBand, MediaImage, PageHero, ProcessSteps, SectionHead, ServicePanel } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Construction Management in London, ON | Apeiro Construction",
  description:
    "On-site supervision, cost control, quality and safety compliance, and subcontractor coordination that keep your project on schedule and on budget.",
  path: ROUTES.constructionManagement,
});

const SERVICES = [
  {
    id: "on-site-supervision-project-management",
    title: "On-Site Supervision & Project Management",
    text: "Hands-on supervision and project management that keep your project moving. Our team uses advanced management tools for clear task tracking and real-time updates, identifies bottlenecks early, and adapts plans as needed so timelines are met without compromising quality or safety.",
    benefits: ["Timely project delivery", "Cost efficiency", "Quality assurance at every step"],
  },
  {
    id: "cost-control-budgeting",
    title: "Cost Control & Budgeting",
    text: "Meticulous budget planning and real-time expense tracking keep spending aligned with your financial goals. We set clear cost targets, monitor expenses throughout the project, and use scenario planning to improve forecast accuracy and prevent overspending.",
    benefits: ["Tighter budget control", "Predictable financial planning", "Confidence for stakeholders"],
  },
  {
    id: "quality-safety-compliance",
    title: "Quality & Safety Compliance",
    text: "Our expert team helps your project meet the strictest quality and safety standards, aligned with ISO standards, IHSA standards and Ontario’s Occupational Health and Safety Act. Through comprehensive audits, tailored consultations and quality assurance checks, we identify risks early, build safety measures into every phase, and equip teams with the tools and training to maintain a strong safety culture.",
    benefits: ["Enhanced safety assurance", "Reduced compliance risk", "Streamlined regulatory processes"],
  },
  {
    id: "scheduling-subcontractor-coordination",
    title: "Scheduling & Subcontractor Coordination",
    text: "Organized timelines and precise coordination of multiple subcontractors. Project management software gives stakeholders real-time updates, so issues are addressed immediately and every trade’s work meets project standards.",
    benefits: ["Streamlined project management", "Better collaboration", "Efficient resource allocation"],
  },
];

const STEPS = [
  { title: "Initial Assessment", text: "Requirements, constraints and execution strategy." },
  { title: "Planning & Resource Allocation", text: "Schedules, budgets, crews and subcontractors aligned." },
  { title: "On-Site Management", text: "Supervisors keep work on schedule and to standard, resolving issues promptly." },
  { title: "Completion & Walkthrough", text: "Final inspection and walkthrough to confirm every detail meets your goals." },
];

export default function ConstructionManagementPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services", href: ROUTES.services }, { label: "Construction Management" }]}
        title="Construction Management in London, Ontario"
        intro="On-site supervision, cost control, quality and safety compliance, and subcontractor coordination that keep your project on schedule and on budget across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="intro" className="bg-white">
        <div className="container section split">
          <div className="split-text">
            <h2 className="h2">In Control From Start to Finish</h2>
            <p className="p">
              Strong management is what turns a plan into a project delivered on time and on budget. Our team supervises every phase on site, tracks costs in
              real time, coordinates every trade, and enforces quality and safety standards, so you always know where your project stands.
            </p>
          </div>
          <div className="split-media">
            <MediaImage src="/images/service-construction-management-intro.jpg" alt="Apeiro supervisors reviewing plans on site" />
          </div>
        </div>
      </section>

      <section id="services" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <SectionHead title="Our Construction Management Services" sub="Select a service to see what’s included." />
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

      <CtaBand title="Need Experienced Project Management?" text="Tell us about your project and we’ll follow up with next steps." />
    </>
  );
}
