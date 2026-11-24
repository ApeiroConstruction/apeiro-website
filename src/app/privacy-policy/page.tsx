import type { CSSProperties } from "react";
import { PageHero } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { BUSINESS, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy | Apeiro Construction",
  description:
    "How Apeiro Construction collects, uses, stores and protects personal information, and your rights under Canada’s PIPEDA. Contact our Privacy Officer.",
  path: ROUTES.privacy,
});

const h2Style = (first = false): CSSProperties => ({
  margin: first ? "0 0 12px" : "40px 0 12px",
  fontFamily: "var(--font-head)",
  fontWeight: 800,
  fontSize: 32,
  lineHeight: 1.05,
  textTransform: "uppercase",
  color: "var(--charcoal)",
});

const pStyle: CSSProperties = { margin: "0 0 14px" };
const ulStyle: CSSProperties = { margin: "0 0 14px", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 };
const thStyle: CSSProperties = { textAlign: "left", padding: "12px 14px", background: "#1C1E22", color: "#FFFFFF", fontWeight: 600 };
const tdStyle: CSSProperties = { padding: "12px 14px", borderBottom: "1px solid var(--border)", verticalAlign: "top" };
const linkStyle: CSSProperties = { color: "var(--red-text)", textDecoration: "underline" };

const COLLECT: [string, string, string][] = [
  [
    "You submit the Request a Quote form",
    "Full name, company, email, phone number, project type, budget range and target timeline",
    "To review your project and follow up with you",
  ],
  ["You call, text or email us", "Your name, contact details and anything you choose to share about your project", "To answer your questions and discuss your project"],
  ["You become a client", "Business contact details, contract information and project records", "To deliver the project and meet our legal and contractual obligations"],
  [
    "You visit our website",
    "IP address, browser and device type, pages viewed, time on site and the website that referred you",
    "To keep the site secure and understand how it is used",
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero pad="compact" crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Privacy Policy" }]} title="Privacy Policy">
        <p style={{ margin: 0, fontSize: 17, color: "var(--on-dark-strong)" }}>
          Last updated: November 24, 2026
        </p>
      </PageHero>

      <section id="policy" className="bg-white">
        <div className="container" style={{ maxWidth: 820, paddingTop: 64, paddingBottom: 88, color: "var(--body)", fontSize: 17, lineHeight: 1.65 }}>
          <h2 style={h2Style(true)}>About This Policy</h2>
          <p style={pStyle}>
            Apeiro Construction Inc. (“Apeiro,” “we” or “us”) is a construction company based at 3392 Wonderland Road South, Building 3, Unit 303, London, Ontario N6L 1J9.
          </p>
          <p style={pStyle}>
            This policy explains what personal information we collect, how we use and protect it, and your rights under Canada’s Personal Information
            Protection and Electronic Documents Act (PIPEDA).
          </p>

          <h2 style={h2Style()}>Information We Collect</h2>
          <p style={pStyle}>We collect only the information we need to respond to you and deliver our services.</p>
          <div role="region" aria-label="Information we collect" tabIndex={0} style={{ overflowX: "auto", margin: "0 0 14px" }}>
            <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr>
                  <th scope="col" style={thStyle}>
                    When
                  </th>
                  <th scope="col" style={thStyle}>
                    What we collect
                  </th>
                  <th scope="col" style={thStyle}>
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {COLLECT.map(([when, what, why]) => (
                  <tr key={when}>
                    <td style={tdStyle}>{when}</td>
                    <td style={tdStyle}>{what}</td>
                    <td style={tdStyle}>{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={h2Style()}>How We Use Your Information</h2>
          <p style={pStyle}>We use personal information only for the purposes it was collected for:</p>
          <ul style={ulStyle}>
            <li>Responding to quote requests, questions and invitations to bid</li>
            <li>Preparing proposals, bids, contracts and invoices</li>
            <li>Communicating with you about your project, schedule and site</li>
            <li>Meeting our legal, tax, safety and contractual obligations</li>
            <li>Keeping our website secure and understanding how it is used, so we can improve it</li>
            <li>Sending occasional updates about our services, only with your consent (see the next section)</li>
          </ul>
          <p style={pStyle}>We do not sell, rent or trade personal information.</p>

          <h2 style={h2Style()}>Consent and Marketing Messages</h2>
          <p style={pStyle}>
            By submitting our quote form or contacting us, you consent to us using your information to respond to you as described in this policy.
          </p>
          <p style={pStyle}>
            If we send you marketing emails, we will do so only with your consent, as required by Canada’s Anti-Spam Legislation (CASL), and you can
            unsubscribe at any time.
          </p>
          <p style={pStyle}>You can withdraw your consent at any time by contacting our Privacy Officer, subject to legal or contractual restrictions.</p>

          <h2 style={h2Style()}>Who We Share Information With</h2>
          <p style={pStyle}>We share personal information only when needed, and only the minimum required:</p>
          <ul style={ulStyle}>
            <li>
              <strong>Service providers</strong> that run our website, quote form, client database, email notifications, maps and analytics (listed below). They may use the information only
              to provide their service to us and must protect it.
            </li>
            <li>
              <strong>Project partners</strong> such as subcontractors, engineers and consultants, when they need contact details to work on your project.
            </li>
            <li>
              <strong>Legal and regulatory bodies</strong> when required by law, a court order or a safety regulator, or to protect our legal rights.
            </li>
          </ul>

          <h2 style={h2Style()}>Where Your Information Is Stored</h2>
          <p style={pStyle}>Our website and the information you send through it are handled by these third-party service providers:</p>
          <ul style={ulStyle}>
            <li>
              <strong>Netlify</strong> (website hosting), a U.S. company that delivers our website from servers around the world, including in the
              United States.
            </li>
            <li>
              <strong>Supabase</strong> (quote request database), which stores the quote requests submitted through our website on servers located in the
              United States (U.S. East, Virginia).
            </li>
            <li>
              <strong>Resend</strong> (email notifications), a U.S. company that sends our team an email containing the details of each new quote
              request.
            </li>
            <li>
              <strong>Google</strong> (Google Analytics and Google Maps), a U.S. company. See Cookies and Analytics below.
            </li>
          </ul>
          <p style={pStyle}>
            These providers are required to protect personal information under their terms of service. Information stored outside Canada may be
            subject to the laws of the country where it is stored, including lawful access by its courts and authorities.
          </p>

          <h2 style={h2Style()}>Cookies and Analytics</h2>
          <p style={pStyle}>
            Cookies are small files a website stores in your browser. Our website does not set any cookies of its own: the quote form keeps your answers on
            the page until you submit them. The following third-party services on our site may set cookies:
          </p>
          <ul style={ulStyle}>
            <li>
              <strong>Analytics cookies</strong> from Google Analytics, which tell us how many people visit, which pages they view and how they found us.
              This information is aggregated and does not identify you by name. You can opt out with Google’s Analytics Opt-out Browser Add-on.
            </li>
            <li>
              <strong>Google Maps</strong> on our Service Areas and Contact pages. When a map loads, Google may set cookies and receive information such as
              your IP address, under Google’s own privacy policy.
            </li>
          </ul>
          <p style={pStyle}>
            {/* If Apeiro starts running online ads or ad tracking (e.g. Google Ads, Meta Pixel), update this sentence first. */}
            We do not use advertising or retargeting cookies.
          </p>

          <h2 style={h2Style()}>How Long We Keep Information</h2>
          <p style={pStyle}>
            We keep personal information only as long as we need it for the purposes described in this policy, or as long as the law requires (for
            example, for tax, contract and safety records). When it is no longer needed, we delete it or make it anonymous.
          </p>

          <h2 style={h2Style()}>How We Protect Information</h2>
          <p style={pStyle}>
            We use reasonable safeguards to protect personal information, such as encrypted connections, restricted access and reputable service
            providers. If a breach creates a real risk of significant harm, we will notify you and the Office of the Privacy Commissioner of Canada as
            required by law.
          </p>

          <h2 style={h2Style()}>Your Rights and Choices</h2>
          <p style={pStyle}>
            You can ask to see the personal information we hold about you, correct it, or withdraw your consent. Contact our Privacy Officer and we will
            respond within 30 days, as required by law.
          </p>
          <p style={pStyle}>
            If you are not satisfied with our response, you can contact the Office of the Privacy Commissioner of Canada at{" "}
            <a href="https://www.priv.gc.ca" style={linkStyle}>
              www.priv.gc.ca
            </a>{" "}
            or 1-800-282-1376.
          </p>

          <h2 style={h2Style()}>Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.
          </p>

          <h2 style={h2Style()}>Contact Us</h2>
          <p style={pStyle}>Questions or requests about your personal information can be sent to our Privacy Officer:</p>
          <address style={{ fontStyle: "normal", margin: "0 0 14px" }}>
            <strong>Privacy Officer</strong>
            <br />
            Apeiro Construction Inc.
            <br />
            3392 Wonderland Road South, Building 3, Unit 303, London, Ontario N6L 1J9
            <br />
            <a href={`mailto:${BUSINESS.email}`} style={linkStyle}>
              {BUSINESS.email}
            </a>
            <br />
            <a href={BUSINESS.phoneHref} style={linkStyle}>
              {BUSINESS.phoneDisplay}
            </a>
          </address>
        </div>
      </section>
    </>
  );
}
