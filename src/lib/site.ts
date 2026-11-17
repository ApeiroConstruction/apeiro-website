// Shared business details and data lists taken from the prototype.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.apeiroconstruction.com").replace(/\/$/, "");

export const BUSINESS = {
  name: "Apeiro Construction Inc.",
  shortName: "Apeiro Construction",
  street: "3392 Wonderland Road South, Building 3, Unit 3",
  city: "London",
  region: "ON",
  regionLong: "Ontario",
  postal: "N6L 1J9",
  country: "CA",
  phoneDisplay: "(647) 783-7532",
  phoneHref: "tel:+16477837532",
  phoneE164: "+16477837532",
  email: "info@apeiroconstruction.com",
  hoursDisplay: "Mon–Sat, 9:00 am – 5:00 pm",
  /** Google Maps search that finds our Google Business listing (labelled pin). */
  mapsQuery: "Apeiro Construction Inc, 3392 Wonderland Rd S, Bldg 3 Unit 3, London, ON N6L 1J9",
};

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  commercial: "/services/commercial-construction",
  institutional: "/services/institutional-construction",
  civil: "/services/civil-infrastructure",
  concrete: "/services/civil-infrastructure/structural-concrete-foundations",
  asphalt: "/services/civil-infrastructure/asphalt-paving",
  waterSewer: "/services/civil-infrastructure/water-sewer-utility-installation",
  constructionManagement: "/services/construction-management",
  preConstruction: "/services/pre-construction",
  projects: "/projects",
  serviceAreas: "/service-areas",
  faqs: "/faqs",
  quote: "/request-a-quote",
  contact: "/contact",
  privacy: "/privacy-policy",
  blog: "/blog",
} as const;

/** Every page included in sitemap.xml. */
export const SITEMAP_PATHS: string[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.services,
  ROUTES.commercial,
  ROUTES.institutional,
  ROUTES.civil,
  ROUTES.concrete,
  ROUTES.asphalt,
  ROUTES.waterSewer,
  ROUTES.constructionManagement,
  ROUTES.preConstruction,
  ROUTES.projects,
  ROUTES.serviceAreas,
  ROUTES.faqs,
  ROUTES.quote,
  ROUTES.contact,
  ROUTES.privacy,
];

export type NavLink = { label: string; href: string; sub?: boolean };

export const NAV_BY_SECTOR: NavLink[] = [
  { label: "Commercial Construction", href: ROUTES.commercial },
  { label: "Institutional Construction", href: ROUTES.institutional },
  { label: "Civil & Infrastructure", href: ROUTES.civil },
  { label: "Structural Concrete & Foundations", href: ROUTES.concrete, sub: true },
  { label: "Asphalt Paving", href: ROUTES.asphalt, sub: true },
  { label: "Water, Sewer & Utility", href: ROUTES.waterSewer, sub: true },
];

export const NAV_SUPPORT: NavLink[] = [
  { label: "Pre-Construction", href: ROUTES.preConstruction },
  { label: "Construction Management", href: ROUTES.constructionManagement },
];

export const NAV_MAIN: NavLink[] = [
  { label: "Projects", href: ROUTES.projects },
  { label: "About", href: ROUTES.about },
  { label: "Service Areas", href: ROUTES.serviceAreas },
  { label: "Contact", href: ROUTES.contact },
];

/** Media files (prototype /_blob/<id> → public path). */
export const MEDIA = {
  logo: "/logos/apeiro-logo.png",
  ihsa: "/logos/IHSA.svg",
  ldca: "/logos/LDCA.png",
  liuna: "/logos/LiUNA.png",
  tarion: "/logos/Tarion_Registered_Builder.png",
  heroVideo: "/video/home-hero.mp4",
  heroPoster: "/video/home-hero-poster.jpg",
  ridoutVideo: "/video/project-89-ridout.mp4",
  ridoutPoster: "/video/project-89-ridout-poster.jpg",
  hsrVideo: "/video/project-hard-surface-restoration.mp4",
  hsrPoster: "/video/project-hard-surface-restoration-poster.jpg",
  terraceVideo: "/video/project-terrace-lodge.mp4",
  terracePoster: "/video/project-terrace-lodge-poster.jpg",
};

export const BADGES = [
  { src: MEDIA.ihsa, w: 317, h: 110, alt: "IHSA Work Safe for Life logo", title: "IHSA Work Safe for Life", sub: "Safety standards on every site" },
  { src: MEDIA.ldca, w: 800, h: 800, alt: "LDCA logo", title: "LDCA Member", sub: "London & District Construction Association" },
  { src: MEDIA.liuna, w: 400, h: 400, alt: "LiUNA Local 1059 logo", title: "LiUNA Local 1059", sub: "Union partner" },
  { src: MEDIA.tarion, w: 418, h: 393, alt: "Tarion Registered Builder seal", title: "Tarion Registered Builder", sub: "Registered with Tarion" },
];

export const SERVICE_CARDS = [
  { title: "Commercial Construction", img: "/images/service-commercial-card.jpg", alt: "Apeiro truck and safety cones at a work site", href: ROUTES.commercial, text: "Office, retail, warehouse, medical and restaurant builds, plus renovations and tenant improvements." },
  { title: "Institutional Construction", img: "/images/service-institutional-card.jpg", alt: "Building under renovation with scaffolding", href: ROUTES.institutional, text: "Schools, healthcare facilities, community centres and government buildings." },
  { title: "Civil & Infrastructure", img: "/images/service-civil-card.jpg", alt: "Crew installing large pipe in an open trench", href: ROUTES.civil, text: "Roads, sewer and water mains, stormwater, earthworks, paving and structural concrete." },
  { title: "Construction Management", img: "/images/service-construction-management-card.jpg", alt: "Apeiro supervisors reviewing plans on site", href: ROUTES.constructionManagement, text: "On-site supervision, cost control, scheduling, and quality and safety compliance." },
  { title: "Pre-Construction", img: "/images/service-pre-construction-card.jpg", alt: "Apeiro hard hat on construction plans", href: ROUTES.preConstruction, text: "Feasibility and cost estimating, design consultation, value engineering, and permit and zoning support." },
];

export type ProjectSummary = {
  name: string;
  img?: string;
  alt?: string;
  tag: string;
  note: string;
};

/** Featured projects as shown on the home page. Cards with no img show the "Photos Under Construction" panel. */
export const FEATURED_PROJECTS: ProjectSummary[] = [
  { name: "Hard Surface Restoration Program", img: MEDIA.hsrPoster, alt: "Aerial view of crew restoring concrete sidewalk panels", tag: "Civil & Infrastructure · Southwestern Ontario", note: "Ongoing concrete restoration subcontract for Ledcor" },
  { name: "89 Ridout", img: MEDIA.ridoutPoster, alt: "89 Ridout building exterior", tag: "Commercial · London", note: "Structural restoration and exterior envelope upgrades" },
  { name: "Veteran’s Drive, Stratford", tag: "Institutional · Stratford", note: "Bandshell rehabilitation and public space enhancement" },
  { name: "Terrace Lodge", img: MEDIA.terracePoster, alt: "Terrace Lodge during exterior renewal", tag: "Institutional", note: "Siding and soffit replacement" },
];
