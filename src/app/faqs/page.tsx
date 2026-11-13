import { CtaBand, PageHero } from "@/components/Blocks";
import { PanelChevron } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "FAQs | Apeiro Construction",
  description:
    "Answers to common questions about working with Apeiro Construction: services, project size, timelines, service areas, self-performed work and safety.",
  path: ROUTES.faqs,
});

/** Questions and answers, in prototype order. Used for both the page and the FAQPage JSON-LD. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What types of construction services do you offer?",
    a: "Apeiro Construction provides comprehensive civil and ICI construction services for institutional, municipal, commercial and industrial clients across Ontario. Our expertise includes site development, civil infrastructure, concrete and asphalt work, sewer and water main installation, structural upgrades, and large-scale project management for procurement-driven environments. From pre-construction planning and cost estimating to coordinated project execution, we combine technical expertise, in-house civil capabilities and precision-focused project management to help clients complete complex projects on time, on budget and to exact specifications.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary with the scope, complexity, permitting requirements and site conditions involved. Civil infrastructure and ICI projects can range from several weeks for targeted upgrades to multiple months for large-scale developments and phased infrastructure work. We use detailed scheduling, proactive coordination and structured project management to keep projects moving, working closely with clients, consultants, subcontractors and municipal stakeholders to minimize delays and disruption.",
  },
  {
    q: "What size projects do you take on?",
    a: "We specialize in institutional, municipal, commercial and industrial projects between $800,000 and $4M+. Our team, processes and self-performed crews are structured for projects at that scale.",
  },
  {
    q: "Which areas do you serve?",
    a: "We’re based in London, Ontario, and work across Southwestern Ontario and beyond, including Waterloo Region, Windsor-Essex, Sarnia-Lambton, Georgian Bay, the Lake Huron coast and Niagara. See our Service Areas page for the full list of communities.",
  },
  {
    q: "What work do you self-perform?",
    a: "Our own crews self-perform concrete, asphalt, and sewer and water main installation. Keeping these critical scopes in-house gives us greater control over quality, cost and schedule.",
  },
  {
    q: "Do you assist with design and permit applications?",
    a: "Yes. Our pre-construction support includes design coordination, permit assistance and project planning. We collaborate with engineers, consultants and municipal departments to streamline approvals and make sure all documentation meets regulatory requirements, including zoning reviews, compliance requirements and permit submissions. This early involvement reduces delays and creates a smoother transition from planning to construction.",
  },
  {
    q: "Can you manage large commercial construction projects?",
    a: "Yes. Apeiro Construction specializes in managing complex commercial, institutional and civil infrastructure projects across Ontario. We oversee every phase, from pre-construction planning and site coordination to execution and final delivery. With experience in procurement-driven environments, we maintain strict oversight of scheduling, quality control, safety compliance and subcontractor coordination.",
  },
  {
    q: "How do you ensure project timelines are met?",
    a: "Through detailed planning, proactive coordination and disciplined project management. We use structured scheduling systems and ongoing progress tracking to monitor milestones and address challenges before they affect delivery, with clear communication between clients, consultants, subcontractors and field teams throughout.",
  },
  {
    q: "What is your approach to sustainable building practices?",
    a: "We prioritize efficient material use, responsible site management and long-term infrastructure performance. Wherever possible, we support environmentally conscious solutions that align with project goals, engineering standards and operational efficiency requirements, including reducing material waste and integrating durable, energy-conscious systems with your project team.",
  },
  {
    q: "Are you safety certified and procurement-ready?",
    a: "Apeiro follows IHSA safety standards, is an LDCA member, partners with LiUNA Local 1059 and is a Tarion Registered Builder. We are prequalified with major institutional asset owners, active on leading procurement platforms, and welcome invited bids and prequalification packages.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <PageHero pad="compact"
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "FAQs" }]}
        title="Frequently Asked Questions"
        intro="Answers to common questions about working with Apeiro Construction. Can’t find what you need? Call us or request a quote."
        children={null}
      />

      <section id="faqs" className="bg-light">
        <div className="container stack" style={{ maxWidth: 1040, paddingTop: 72, paddingBottom: 88, gap: 12 }}>
          {FAQS.map((f, i) => (
            <details key={f.q} className="panel" open={i === 0}>
              <summary>
                <h2 className="h3-sm" style={{ lineHeight: 1.1 }}>
                  {f.q}
                </h2>
                <PanelChevron />
              </summary>
              <div className="panel-body">
                <p style={{ maxWidth: 900 }}>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <CtaBand title="Still Have Questions?" text="Our team is happy to talk through your project. Call us or request a quote." />
    </>
  );
}
