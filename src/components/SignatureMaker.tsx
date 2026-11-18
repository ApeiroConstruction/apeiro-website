"use client";

import { useRef, useState } from "react";
import { BUSINESS, MEDIA, SITE_URL } from "@/lib/site";

const RED = "#C20000";
const DARK = "#1C1E22";
const GREY = "#54585C";
const FONT = "Arial, Helvetica, sans-serif";

const DISCLAIMER =
  "This email and any attachments are intended only for the named recipient and may contain confidential information. If you received it in error, please let the sender know and delete it. Thank you.";

type Fields = { name: string; title: string; phone: string; email: string };

const telHref = (p: string) => "tel:+" + (p.replace(/\D/g, "").length === 10 ? "1" : "") + p.replace(/\D/g, "");

/**
 * Email signature maker for office staff. Nothing is stored or sent anywhere:
 * the details stay in this browser tab. The copied signature uses email-safe
 * HTML (tables, inline styles, Arial) and an absolute logo URL on the live site.
 */
export default function SignatureMaker() {
  const [f, setF] = useState<Fields>({ name: "", title: "", phone: BUSINESS.phoneDisplay, email: "" });
  const [status, setStatus] = useState("");
  const sigRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  const name = f.name.trim() || "Your Name";
  const title = f.title.trim() || "Your Title";
  const phone = f.phone.trim();
  const email = f.email.trim();
  const site = SITE_URL.replace(/^https?:\/\//, "");

  const copy = async () => {
    const el = sigRef.current;
    if (!el) return;
    if (!f.name.trim() || !f.title.trim() || !email) {
      setStatus("Please fill in your name, title and email first.");
      return;
    }
    // Logo must load from the public website when the email is opened elsewhere.
    const html = el.innerHTML.replaceAll(`src="${MEDIA.logo}"`, `src="${SITE_URL}${MEDIA.logo}"`);
    const text = el.innerText;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) }),
      ]);
      setStatus("Signature copied. Now paste it into Outlook (steps below).");
    } catch {
      // Fallback for browsers without rich clipboard support: select the preview so it can be copied with Ctrl+C.
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setStatus("Press Ctrl+C (or Cmd+C on a Mac) to copy the selected signature.");
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 56px", alignItems: "flex-start" }}>
      <form className="card" style={{ flex: "1 1 320px", minWidth: 0, padding: "clamp(24px, 4vw, 36px)", display: "flex", flexDirection: "column", gap: 16 }} onSubmit={(e) => { e.preventDefault(); void copy(); }}>
        <h2 className="h3" style={{ fontSize: 30 }}>
          Your Details
        </h2>
        <div className="field">
          <label htmlFor="sig-name">Full name</label>
          <input id="sig-name" autoComplete="name" value={f.name} onChange={set("name")} />
        </div>
        <div className="field">
          <label htmlFor="sig-title">Job title</label>
          <input id="sig-title" autoComplete="organization-title" value={f.title} onChange={set("title")} />
        </div>
        <div className="field">
          <label htmlFor="sig-phone">Phone</label>
          <input id="sig-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} />
        </div>
        <div className="field">
          <label htmlFor="sig-email">Email</label>
          <input id="sig-email" type="email" autoComplete="email" placeholder="name@apeiroconstruction.com" value={f.email} onChange={set("email")} />
        </div>
        <button type="submit" className="btn btn-red" style={{ border: "none", alignSelf: "flex-start" }}>
          Copy Signature
        </button>
        <p role="status" aria-live="polite" style={{ margin: 0, minHeight: 24, fontWeight: 600, color: status.startsWith("Please") ? "var(--red-text)" : "var(--charcoal)" }}>
          {status}
        </p>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>Nothing you type here is saved or sent anywhere.</p>
      </form>

      <div style={{ flex: "2 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 className="h3" style={{ fontSize: 30 }}>
          Preview
        </h2>
        <div className="card" style={{ padding: "clamp(16px, 3vw, 28px)", overflowX: "auto" }}>
          {/* Email-safe markup: tables + inline styles only. */}
          <div ref={sigRef}>
            <table cellPadding={0} cellSpacing={0} role="presentation" style={{ borderCollapse: "collapse", fontFamily: FONT, color: DARK }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: 16 }}>
                    <a href={SITE_URL} style={{ textDecoration: "none" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={MEDIA.logo} alt="Apeiro Construction" width={140} height={50} style={{ display: "block", border: 0, width: 140, height: "auto" }} />
                    </a>
                  </td>
                  <td style={{ verticalAlign: "top", borderLeft: "3px solid #E00000", paddingLeft: 16, fontSize: 13, lineHeight: "20px" }}>
                    <div style={{ fontSize: 16, fontWeight: "bold", color: DARK }}>{name}</div>
                    <div style={{ color: RED, fontWeight: "bold" }}>{title}</div>
                    <div style={{ color: DARK }}>Apeiro Construction Inc.</div>
                    {phone && (
                      <div>
                        <a href={telHref(phone)} style={{ color: DARK, textDecoration: "none" }}>
                          {phone}
                        </a>
                      </div>
                    )}
                    {email && (
                      <div>
                        <a href={`mailto:${email}`} style={{ color: DARK, textDecoration: "none" }}>
                          {email}
                        </a>
                      </div>
                    )}
                    <div>
                      <a href={SITE_URL} style={{ color: RED, fontWeight: "bold", textDecoration: "none" }}>
                        {site}
                      </a>
                    </div>
                    <div style={{ color: GREY, fontSize: 12 }}>
                      {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postal}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingTop: 12, fontSize: 10, lineHeight: "14px", color: GREY, maxWidth: 520 }}>
                    {DISCLAIMER}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="h3" style={{ fontSize: 30, marginTop: 16 }}>
          Add It to Outlook
        </h2>
        <div className="stack" style={{ gap: 18 }}>
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>New Outlook or Outlook on the web</h3>
            <ol style={{ margin: 0, paddingLeft: "1.3em", color: "var(--body)" }}>
              <li>Click the gear icon (Settings) at the top right.</li>
              <li>Go to Account, then Signatures, and click New signature.</li>
              <li>Name it “Apeiro”, click in the box and paste (Ctrl+V).</li>
              <li>Under Select default signatures, choose it for new messages and replies, then click Save.</li>
            </ol>
          </div>
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>Classic Outlook for Windows</h3>
            <ol style={{ margin: 0, paddingLeft: "1.3em", color: "var(--body)" }}>
              <li>Click File, then Options, then Mail, then Signatures.</li>
              <li>Click New, name it “Apeiro”, then paste into the edit box (Ctrl+V).</li>
              <li>Choose it under New messages and Replies/forwards, then click OK.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
