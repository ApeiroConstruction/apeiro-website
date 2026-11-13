// Reusable page sections that repeat across the prototype pages.
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS, ROUTES, type ProjectSummary } from "@/lib/site";
import { Check, HardHat, PanelChevron } from "./Icons";

/* ---------------- Breadcrumb ---------------- */
export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        {items.map((c, i) => (
          <li key={i}>
            {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------- Inner page hero (dark grid background) ---------------- */
export function PageHero({
  crumbs,
  title,
  intro,
  children,
  id = "top",
  pad = "default",
  wide,
}: {
  crumbs?: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  /** Buttons or extra content under the intro. Defaults to a "Request a Quote" button. Pass null for none. */
  children?: ReactNode | null;
  id?: string;
  /** Vertical padding from the prototype: default 72/80, compact 64/72, tall 88/80. */
  pad?: "default" | "compact" | "tall";
  /** Heading may run to 960px wide instead of 900px. */
  wide?: boolean;
}) {
  return (
    <section id={id} className="grid-bg dark">
      <div className={`container page-hero-inner${pad === "default" ? "" : ` hero-${pad}`}`}>
        {crumbs && <Breadcrumb items={crumbs} />}
        <h1 className="h1" style={wide ? { maxWidth: 960 } : undefined}>
          {title}
        </h1>
        {intro && <p className="lead">{intro}</p>}
        {children === undefined ? (
          <div style={{ paddingTop: 8 }}>
            <QuoteButton />
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

/* ---------------- Buttons ---------------- */
export function QuoteButton({ variant = "red", label = "Request a Quote" }: { variant?: "red" | "white"; label?: string }) {
  return (
    <Link href={ROUTES.quote} className={`btn ${variant === "red" ? "btn-red" : "btn-white"}`}>
      {label}
    </Link>
  );
}

export function CallButton({ variant = "outline-white" }: { variant?: "outline-white" | "outline-light" | "outline-dark" }) {
  return (
    <a href={BUSINESS.phoneHref} className={`btn btn-${variant}`}>
      Call {BUSINESS.phoneDisplay}
    </a>
  );
}

/* ---------------- Red closing call-to-action band ---------------- */
export function CtaBand({ title, text, children, tall }: { title: ReactNode; text: ReactNode; children?: ReactNode; tall?: boolean }) {
  return (
    <section id="cta" className="bg-red on-red">
      <div className="container cta-inner" style={tall ? { paddingTop: 88, paddingBottom: 88 } : undefined}>
        <div className="cta-text">
          <h2 className="h2">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          {children ?? (
            <>
              <QuoteButton variant="white" />
              <CallButton />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Collapsible service panel ---------------- */
export function ServicePanel({
  id,
  title,
  text,
  benefits,
  open,
  listLabel = "Key benefits",
  children,
}: {
  id: string;
  title: ReactNode;
  text?: ReactNode;
  benefits?: ReactNode[];
  open?: boolean;
  listLabel?: string;
  /** Custom body; replaces text + benefits when given. */
  children?: ReactNode;
}) {
  return (
    <details id={id} className="panel" open={open}>
      <summary>
        <h3 className="h3">{title}</h3>
        <PanelChevron />
      </summary>
      <div className="panel-body">
        {children ?? (
          <>
            {text && <p>{text}</p>}
            {benefits && benefits.length > 0 && <CheckList items={benefits} label={listLabel} />}
          </>
        )}
      </div>
    </details>
  );
}

export function CheckList({ items, label, style }: { items: ReactNode[]; label?: string; style?: React.CSSProperties }) {
  return (
    <ul className="checks" aria-label={label} style={style}>
      {items.map((b, i) => (
        <li key={i}>
          <Check />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Numbered process steps (dark section) ---------------- */
export function ProcessSteps({ steps }: { steps: { title: ReactNode; text: ReactNode }[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={i}>
          <span aria-hidden="true" className="step-num">
            {i + 1}
          </span>
          <h3 className="h3-sm">{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Media ---------------- */
/** Photo in a rounded aspect-ratio box (fills and crops like the prototype). */
export function MediaImage({
  src,
  alt,
  ratio = "4/3",
  sizes = "(max-width: 900px) 100vw, 600px",
  priority,
  style,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: "4/3" | "16/10" | "16/9";
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const rc = ratio === "16/10" ? " media-16-10" : ratio === "16/9" ? " media-16-9" : "";
  return (
    <div className={`media${rc} ${className}`} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
    </div>
  );
}

/**
 * Project video: muted, looping, playsInline, native controls, with a compressed poster image.
 * `priority` preloads the poster (use it for the first video on a page).
 */
export function ProjectVideo({ src, poster, label, priority, style }: { src: string; poster: string; label: string; priority?: boolean; style?: React.CSSProperties }) {
  // width 540 → the 2x candidate (used as src) is a 1080px-wide compressed image.
  const { props } = getImageProps({ src: poster, alt: "", width: 540, height: 304, quality: 70 });
  return (
    <div className="media media-16-9" style={{ background: "var(--charcoal)", ...style }}>
      {/* Same poster as a normal image underneath, so it paints immediately. */}
      <Image src={poster} alt="" aria-hidden="true" fill priority={priority} sizes="(max-width: 1000px) 100vw, 600px" quality={70} />
      <video src={src} poster={props.src} muted loop playsInline controls preload="none" aria-label={label} />
    </div>
  );
}

/** "Photos Under Construction" panel for projects with no media yet. */
export function PhotosUnderConstruction({
  ratio = "4/3",
  style,
  large,
}: {
  ratio?: "4/3" | "16/10" | "16/9";
  style?: React.CSSProperties;
  /** Bigger icon and title, as on the Projects page. */
  large?: boolean;
}) {
  return (
    <div className={`uc-panel${large ? " uc-large" : ""}`} style={{ aspectRatio: ratio.replace("/", " / "), ...style }}>
      <HardHat size={large ? 44 : 34} />
      <span className="uc-title">Photos Under Construction</span>
      <span className="uc-sub">Project images coming soon</span>
    </div>
  );
}

/* ---------------- Project card (links to /projects) ---------------- */
export function ProjectCard({
  project,
  ratio = "4/3",
  href = ROUTES.projects,
  headingLevel = 3,
}: {
  project: ProjectSummary;
  ratio?: "4/3" | "16/10";
  href?: string;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={href} className="project-card">
      {project.img ? (
        <MediaImage src={project.img} alt={project.alt ?? ""} ratio={ratio} sizes="(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 400px" />
      ) : (
        <PhotosUnderConstruction ratio={ratio} />
      )}
      <div className="project-card-text">
        <span className="tag">{project.tag}</span>
        <H className="h3-sm">{project.name}</H>
        <span className="note">{project.note}</span>
      </div>
    </Link>
  );
}

/* ---------------- Section heading block ---------------- */
export function SectionHead({
  title,
  sub,
  center,
  rule,
  maxWidth = 680,
  as: As = "h2",
  id,
}: {
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  rule?: boolean;
  maxWidth?: number;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className="stack" style={{ gap: center ? 14 : 12, maxWidth, alignItems: center ? "center" : undefined, textAlign: center ? "center" : undefined, marginInline: center ? "auto" : undefined }}>
      <As className="h2" id={id}>
        {title}
      </As>
      {sub && <p className="sub" style={{ fontSize: center ? 18 : 17 }}>{sub}</p>}
      {rule && <div className="rule" style={{ marginTop: 4 }} />}
    </div>
  );
}
