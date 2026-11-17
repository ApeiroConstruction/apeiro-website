import Image from "next/image";
import Link from "next/link";
import { BUSINESS, MEDIA, ROUTES } from "@/lib/site";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="site-footer dark">
      <div className="container ftr-inner">
        <div className="ftr-cols">
          <div className="ftr-col" style={{ flex: "1 1 260px", gap: 14 }}>
            <Image src={MEDIA.logo} alt="Apeiro Construction" width={448} height={161} sizes="112px" style={{ height: 40, width: "auto", alignSelf: "flex-start" }} />
            <span>Commercial, institutional and civil construction across Southwestern Ontario.</span>
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
