import Image from "next/image";
import Link from "next/link";
import { BUSINESS, MEDIA, ROUTES, SOCIAL } from "@/lib/site";
import BackToTop from "./BackToTop";

/** Social logos (LinkedIn/Facebook paths: Simple Icons, CC0). Decorative: each link has its own accessible name. */
function SocialIcon({ name }: { name: string }) {
  const common = { "aria-hidden": true, focusable: false, width: 22, height: 22, viewBox: "0 0 24 24" } as const;
  if (name === "LinkedIn")
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (name === "Facebook")
    return (
      <svg {...common} fill="currentColor">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    );
  // Instagram (outline camera glyph)
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer dark">
      <div className="container ftr-inner">
        <div className="ftr-cols">
          <div className="ftr-col" style={{ flex: "1 1 260px", gap: 14 }}>
            <Image src={MEDIA.logo} alt="Apeiro Construction" width={448} height={161} sizes="112px" style={{ height: 40, width: "auto", alignSelf: "flex-start" }} />
            <span>Commercial, institutional and civil construction across Southwestern Ontario.</span>
            <ul className="ftr-social" aria-label="Social media">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Apeiro Construction on ${s.name} (opens in a new tab)`} title={s.name}>
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ftr-col" style={{ flex: "1 1 220px" }}>
            <h2 className="ftr-head">London Office</h2>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 6 }}>
              <span>
                {BUSINESS.street}
                <br />
                {BUSINESS.city}, {BUSINESS.regionLong} {BUSINESS.postal}
              </span>
              <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              <span>{BUSINESS.hoursDisplay}</span>
            </address>
          </div>
          <nav className="ftr-col" aria-labelledby="ftr-company">
            <h2 className="ftr-head" id="ftr-company">Company</h2>
            <ul>
              <li><Link href={ROUTES.about}>About</Link></li>
              <li><Link href={ROUTES.projects}>Projects</Link></li>
              <li><Link href={ROUTES.serviceAreas}>Service Areas</Link></li>
              <li><Link href={ROUTES.quote}>Request a Quote</Link></li>
            </ul>
          </nav>
          <nav className="ftr-col" aria-labelledby="ftr-resources">
            <h2 className="ftr-head" id="ftr-resources">Resources</h2>
            <ul>
              <li><Link href={ROUTES.faqs}>FAQs</Link></li>
              <li><Link href={ROUTES.blog}>Blog</Link></li>
              <li><Link href={ROUTES.privacy}>Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="ftr-copy">© {new Date().getFullYear()} Apeiro Construction Inc.</div>
      </div>
      <BackToTop />
    </footer>
  );
}
