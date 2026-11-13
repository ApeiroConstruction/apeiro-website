import Link from "next/link";
import { CtaBand, MediaImage, PageHero } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Construction Services in London, ON | Apeiro Construction",
  description:
    "Commercial, institutional and civil construction from pre-construction through completion, for $800K–$4M+ projects across London, Barrie, Cambridge and Ontario.",
  path: ROUTES.services,
});

type ServiceCardData = {
  title: string;
  text: string;
  href: string;
  img?: string;
  alt?: string;
  items?: string[];
};

const SECTORS: ServiceCardData[] = [
  {
    title: "Commercial Construction",
    text: "Builds and upgrades for businesses.",
    href: ROUTES.commercial,
    img: "/images/service-commercial-card.jpg",
    alt: "Apeiro truck and safety cones at a work site",
    items: ["Office and retail", "Warehouse and distribution", "Medical and dental", "Renovations and tenant improvements", "Restaurant and hospitality"],
  },
  {
    title: "Institutional Construction",
    text: "Facilities for public-sector clients.",
    href: ROUTES.institutional,
    img: "/images/service-institutional-card.jpg",
    alt: "Building under renovation with scaffolding",
    items: ["Schools and universities", "Hospitals and healthcare", "Religious and community centres", "Government and emergency services"],
  },
  {
    title: "Civil & Infrastructure",
    text: "Site works and public infrastructure.",
    href: ROUTES.civil,
    img: "/images/service-civil-card.jpg",
    alt: "Crew installing large pipe in an open trench",
    items: [
      "Roads and highways",
      "Drainage and stormwater",
      "Site grading and earthworks",
      "Municipal infrastructure",
      "Demolition and site clearing",
      "Structural reinforcement and forming",
    ],
  },
];

const SPECIALTIES: ServiceCardData[] = [
  { title: "Structural Concrete & Foundations", text: "Foundations and structural concrete built for long-term stability.", href: ROUTES.concrete },
  { title: "Asphalt Paving", text: "Durable paving for commercial and municipal projects.", href: ROUTES.asphalt },
  { title: "Water, Sewer & Utility Installation", text: "PVC and ductile iron water, sewer and utility systems.", href: ROUTES.waterSewer },
];

const SUPPORT: ServiceCardData[] = [
  { title: "Pre-Construction", text: "Feasibility, estimating, design consultation, permits and value engineering.", href: ROUTES.preConstruction },
  {
    title: "Construction Management",
    text: "Supervision, cost control, quality and safety compliance, and subcontractor coordination.",
    href: ROUTES.constructionManagement,
  },
];

function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <Link href={card.href} className="card" style={{ display: "flex", flexDirection: "column" }}>
      {card.img && (
        <MediaImage
          src={card.img}
          alt={card.alt ?? ""}
          ratio="16/10"
          sizes="(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 400px"
          style={{ borderRadius: 0 }}
        />
      )}
      <div className="stack" style={{ padding: 28, gap: 12, flexGrow: 1 }}>
        <h3 className="h3" style={{ fontSize: 30 }}>
          {card.title}
        </h3>
        <p style={{ margin: 0, color: "var(--body)" }}>{card.text}</p>
        {card.items && (
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--body)", fontSize: 15, display: "flex", flexDirection: "column", gap: 4 }}>
            {card.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
        <span className="learn" style={{ marginTop: "auto", paddingTop: 6 }}>
          Learn more
        </span>
      </div>
    </Link>
  );
}

function grid(min: number) {
  return { display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`, gap: 24 } as const;
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Services" }]}
        title="Our Construction Services"
        intro="From pre-construction through completion, Apeiro delivers commercial, institutional and civil projects between $800K and $4M+ across London, Barrie, Cambridge and surrounding Ontario regions."
      />

      <section id="sectors" className="bg-white border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <h2 className="h2">Construction by Sector</h2>
          <div style={grid(300)}>
            {SECTORS.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
        </div>
      </section>

      <section id="specialties" className="bg-light border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="h2">Self-Performed Specialties</h2>
            <p className="sub" style={{ maxWidth: 680 }}>
              Our own crews perform these critical scopes, so we control quality and timing.
            </p>
          </div>
          <div style={grid(280)}>
            {SPECIALTIES.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="bg-white border-top">
        <div className="container section stack" style={{ gap: 32 }}>
          <h2 className="h2">Project Support</h2>
          <div style={grid(320)}>
            {SUPPORT.map((c) => (
              <ServiceCard key={c.title} card={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Not Sure Which Service You Need?" text="Tell us about your project and we’ll recommend the right approach." />
    </>
  );
}
