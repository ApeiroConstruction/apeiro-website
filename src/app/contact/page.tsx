import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { BUSINESS, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Apeiro Construction | London, ON",
  description:
    "Talk to our team about your next commercial, institutional or civil project. Call (647) 783-7532, email us or visit our London, Ontario office.",
  path: ROUTES.contact,
});

const MAP_QUERY = encodeURIComponent(`${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postal}`);

const headStyle = {
  margin: 0,
  fontFamily: "var(--font-head)",
  fontSize: 22,
  fontWeight: 800,
  textTransform: "uppercase",
} as const;

const tapLink = { display: "inline-flex", alignItems: "center", minHeight: 44, fontWeight: 600 } as const;

function Item({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
      <Icon size={26} stroke="#C20000" strokeWidth={1.9} style={{ flex: "0 0 auto", marginTop: 2 }}>
        {icon}
      </Icon>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <h2 style={headStyle}>{title}</h2>
        {children}
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Contact" }]}
        title="Contact Us"
        intro="Talk to our team about your next commercial, institutional or civil project."
        children={null}
      />

      <section id="details" className="bg-white">
        <div className="container" style={{ paddingTop: 72, paddingBottom: 88, display: "flex", flexWrap: "wrap", gap: "48px 64px" }}>
          <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
              <Item
                title="Phone"
                icon={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />}
              >
                <a href={BUSINESS.phoneHref} style={{ ...tapLink, fontSize: 20 }}>
                  {BUSINESS.phoneDisplay}
                </a>
              </Item>
              <Item
                title="Email"
                icon={
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </>
                }
              >
                <a href={`mailto:${BUSINESS.email}`} style={{ ...tapLink, fontSize: 18, overflowWrap: "anywhere" }}>
                  {BUSINESS.email}
                </a>
              </Item>
              <Item
                title="London Office"
                icon={
                  <>
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </>
                }
              >
                <span style={{ fontSize: 17 }}>
                  3392 Wonderland Road South
                  <br />
                  London, Ontario N6L 1J9
                </span>
              </Item>
              <Item
                title="Business Hours"
                icon={
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </>
                }
              >
                <span style={{ fontSize: 17 }}>
                  Monday to Saturday, 9:00 am – 5:00 pm
                  <br />
                  Sunday, closed
                </span>
              </Item>
              <Item
                title="Service Area"
                icon={
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </>
                }
              >
                <span style={{ fontSize: 17 }}>
                  Southwestern Ontario and beyond.{" "}
                  <Link href={ROUTES.serviceAreas} style={{ color: "var(--red-text)", fontWeight: 600, textDecoration: "underline" }}>
                    See all service areas
                  </Link>
                </span>
              </Item>
            </ul>
            <div className="btn-row">
              <Link href={ROUTES.quote} className="btn btn-red">
                Request a Quote
              </Link>
              <a href={BUSINESS.phoneHref} className="btn btn-outline-dark">
                Call Now
              </a>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 460px",
              minWidth: 0,
              minHeight: 420,
              borderRadius: 8,
              overflow: "hidden",
              background: "repeating-linear-gradient(135deg, #E9E7E1 0px, #E9E7E1 8px, #F2F0EB 8px, #F2F0EB 16px)",
              display: "flex",
            }}
          >
            <iframe
              title="Map: Apeiro Construction office, 3392 Wonderland Road South, London, Ontario"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, width: "100%", minHeight: 420, flex: "1 1 auto", display: "block" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
