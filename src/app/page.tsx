import Image from "next/image";
import Link from "next/link";
import { CtaBand, ProjectCard } from "@/components/Blocks";
import HeroVideo from "@/components/HeroVideo";
import { Icon } from "@/components/Icons";
import ServicesCarousel from "@/components/ServicesCarousel";
import { pageMeta } from "@/lib/seo";
import { BADGES, FEATURED_PROJECTS, MEDIA, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Commercial & Civil Construction in London, ON | Apeiro",
  description:
    "Commercial, institutional and civil construction in London, Ontario. $800K–$4M+ projects delivered with in-house civil crews and tight cost control.",
  path: "/",
});

const PILLARS = [
  {
    title: "Self-Performed Civil Works",
    text: "Concrete, asphalt, sewer and water main by our own crews.",
    icon: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
  },
  {
    title: "Built for $800K–$4M+",
    text: "Planned and staffed for mid-to-large institutional, municipal and commercial work.",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="8" rx="1" />
        <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
      </>
    ),
  },
  {
    title: "Procurement-Ready",
    text: "Prequalified with major institutional asset owners.",
    icon: (
      <>
        <path d="M12 3.5 19 6v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-4.5" />
      </>
    ),
  },
  {
    title: "One Point of Contact",
    text: "From pre-construction through completion.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section id="top" className="hero dark">
        <HeroVideo src={MEDIA.heroVideo} poster={MEDIA.heroPoster} />
        <div className="container hero-inner">
          <p className="eyebrow">$800K–$4M+ projects in London, Ontario</p>
          <h1>Commercial, Institutional &amp; Civil Construction in London, Ontario</h1>
          <p className="lead">
            Complex projects for institutional, municipal and commercial clients, delivered with in-house civil crews, tight cost control and minimal site
            disruption.
          </p>
          <div className="btn-row" style={{ paddingTop: 8 }}>
            <Link href={ROUTES.quote} className="btn btn-red">
              Request a Quote
            </Link>
            <Link href={ROUTES.projects} className="btn btn-outline-light">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Certifications and memberships" className="bg-red on-red">
        <ul className="container badges">
          {BADGES.map((b) => (
            <li key={b.title} className="badge">
              <div className="badge-logo">
                <Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="176px" style={{ maxHeight: 72, width: "auto" }} />
              </div>
              <span className="badge-title">{b.title}</span>
              <span className="badge-sub">{b.sub}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="precision" className="bg-dark dark">
        <div className="container section-lg stack" style={{ alignItems: "center", gap: 48 }}>
          <div className="stack" style={{ alignItems: "center", gap: 14, textAlign: "center", maxWidth: 680 }}>
            <h2 className="h2">Precision Over Excess</h2>
            <p className="sub" style={{ fontSize: 18 }}>
              We build strictly to scope, with no unnecessary costs and clear communication at every stage.
            </p>
            <div className="rule" style={{ marginTop: 4 }} />
          </div>
          <div className="card-grid" style={{ width: "100%", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
            {PILLARS.map((p) => (
              <div key={p.title} className="dark-card">
                <Icon>{p.icon}</Icon>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <Link href={ROUTES.about} className="btn btn-outline-light">
            About Apeiro
          </Link>
        </div>
      </section>

      <section id="services" className="bg-light">
        <div className="container section-lg stack" style={{ gap: 36 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <div className="stack" style={{ gap: 12, maxWidth: 640 }}>
              <h2 className="h2">Services We Provide</h2>
              <p className="sub">Construction services across every stage of your project, from feasibility to final walkthrough.</p>
            </div>
            <Link href={ROUTES.services} className="text-link">
              View All Services
            </Link>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      <section id="projects" className="bg-white border-top">
        <div className="container section-lg stack" style={{ gap: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div className="stack" style={{ gap: 12 }}>
              <h2 className="h2">Featured Projects</h2>
              <p className="sub">From ground conditions to completed infrastructure.</p>
            </div>
            <Link href={ROUTES.projects} className="btn btn-sm btn-outline-dark">
              View All Projects
            </Link>
          </div>
          <div className="card-grid">
            {FEATURED_PROJECTS.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        tall
        title="Planning Your 2026/2027 Pipeline?"
        text="We’re accepting invited bids and prequalification packages for projects between $800K and $4M+."
      />
    </>
  );
}
