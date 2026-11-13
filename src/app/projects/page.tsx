import { CtaBand, PageHero, PhotosUnderConstruction, ProjectVideo } from "@/components/Blocks";
import { Check } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { MEDIA, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Projects | Commercial, Institutional & Civil Construction | Apeiro",
  description:
    "From ground conditions to completed infrastructure: recent commercial, institutional and civil projects by Apeiro Construction across Southwestern Ontario.",
  path: ROUTES.projects,
});

type Project = {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  text: string;
  scope: string[];
  video?: { src: string; poster: string; label: string };
};

const PROJECTS: Project[] = [
  {
    id: "hard-surface-restoration",
    tag: "Civil & Infrastructure · Southwestern Ontario",
    name: "Hard Surface Restoration Program",
    subtitle: "Ongoing Utility Infrastructure Subcontract for Ledcor",
    text: "An ongoing subcontract for Ledcor, restoring concrete sidewalks and driveway panels as part of a utility infrastructure program. Apeiro supplies dedicated crews and equipment for slab removal, forming, pouring and finishing across multiple sites.",
    scope: ["Slab removal", "Forming", "Concrete pouring", "Finishing", "Dedicated multi-site crews and equipment"],
    video: { src: MEDIA.hsrVideo, poster: MEDIA.hsrPoster, label: "Video of the Hard Surface Restoration Program project" },
  },
  {
    id: "veterans-drive",
    tag: "Institutional · Stratford",
    name: "Veteran’s Drive, Stratford",
    subtitle: "Community Infrastructure Rehabilitation & Public Space Enhancement",
    text: "Rehabilitation of the Stratford Bandshell, a public outdoor performance venue along the Avon River in Upper Queen’s Park. Structural upgrades and surface restoration support ongoing community events, concerts and festivals. We managed multiple work zones at once, including carpentry, finishing and site coordination, delivering a revitalized community space built for long-term public use.",
    scope: ["Structural upgrades", "Surface restoration", "Carpentry and finishing", "Multi-zone site coordination"],
  },
  {
    id: "terrace-lodge",
    tag: "Institutional",
    name: "Terrace Lodge",
    subtitle: "Siding & Soffit Replacement",
    text: "Exterior envelope renewal including full replacement of siding and soffit. As work progressed, the scope expanded to include drywall installation, removal of deteriorated insulation, rust treatment and painting of structural steel beams, and concrete parging.",
    scope: [
      "Siding replacement",
      "Soffit replacement",
      "Drywall installation",
      "Insulation removal",
      "Steel beam rust treatment and painting",
      "Concrete parging",
    ],
    video: { src: MEDIA.terraceVideo, poster: MEDIA.terracePoster, label: "Video of the Terrace Lodge project" },
  },
  {
    id: "eagle-drive",
    tag: "Civil & Infrastructure · London",
    name: "Site Works, 1015 Eagle Drive",
    subtitle: "Retaining Wall, Parking Lot & Foundation Repairs",
    text: "Exterior site improvements including construction of a retaining wall, a new asphalt parking lot, and porch support repairs with re-parging of the foundation.",
    scope: ["Retaining wall construction", "New asphalt parking lot", "Porch support repairs", "Foundation re-parging"],
  },
  {
    id: "89-ridout",
    tag: "Commercial · London",
    name: "89 Ridout",
    subtitle: "Structural Restoration & Exterior Envelope Upgrades",
    text: "Structural and exterior restoration focused on reinforcing building integrity while maintaining architectural continuity. Our team delivered precision installation, façade improvements and coordinated on-site execution in an active urban environment, with minimal disruption and durable, code-compliant results to institutional-grade standards.",
    scope: ["Structural restoration", "Façade improvements", "Exterior envelope upgrades", "On-site coordination"],
    video: { src: MEDIA.ridoutVideo, poster: MEDIA.ridoutPoster, label: "Video of the 89 Ridout project" },
  },
];

function ProjectSection({ p, index }: { p: Project; index: number }) {
  const media = { flex: "1 1 460px", minWidth: 0 } as const;
  return (
    <section id={p.id} className={`${index % 2 === 0 ? "bg-white" : "bg-light"} border-top`}>
      <div className="container section" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px 64px" }}>
        {p.video ? (
          <ProjectVideo src={p.video.src} poster={p.video.poster} label={p.video.label} priority={index === 0} style={media} />
        ) : (
          <PhotosUnderConstruction large ratio="16/9" style={{ ...media, order: 2 }} />
        )}
        <div className="stack" style={{ flex: "1 1 440px", minWidth: 0, gap: 16 }}>
          <span className="tag" style={{ fontSize: 14 }}>
            {p.tag}
          </span>
          <h2 className="h2" style={{ fontSize: "clamp(36px, 4.4vw, 52px)" }}>
            {p.name}
          </h2>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>{p.subtitle}</p>
          <p style={{ margin: 0, color: "var(--body)", fontSize: 17 }}>{p.text}</p>
          <h3 className="h3" style={{ fontSize: 22, marginTop: 8 }}>
            Scope
          </h3>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: "10px 24px",
            }}
          >
            {p.scope.map((s) => (
              <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 500 }}>
                <Check style={{ flex: "0 0 auto", marginTop: 2 }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Projects" }]}
        title="Our Projects"
        intro="From ground conditions to completed infrastructure: a selection of recent work by Apeiro Construction."
      >
        {null}
      </PageHero>

      {PROJECTS.map((p, i) => (
        <ProjectSection key={p.id} p={p} index={i} />
      ))}

      <CtaBand title="Have a Project in Mind?" text="Tell us about it and we’ll follow up with next steps." />
    </>
  );
}
