"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BUDGETS, PROJECT_TYPES, TIMELINES, validateContact, type ContactErrors } from "@/lib/quote";
import { BUSINESS, ROUTES } from "@/lib/site";

type ChoiceKey = "project_type" | "budget" | "timeline";

const STEPS: { key: ChoiceKey; legend: string; options: readonly string[] }[] = [
  { key: "project_type", legend: "What type of project is it?", options: PROJECT_TYPES },
  { key: "budget", legend: "Estimated budget range?", options: BUDGETS },
  { key: "timeline", legend: "Target timeline?", options: TIMELINES },
];

const CONTACT_FIELDS = [
  // placeholder = light grey example shown in the empty box; it disappears as soon as someone types.
  { id: "name", label: "Full name", type: "text", autoComplete: "name", placeholder: "e.g. Jane Smith" },
  { id: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "e.g. Smith Developments Inc." },
  { id: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "name@company.com" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "e.g. (519) 555-0123" },
] as const;

type ContactKey = (typeof CONTACT_FIELDS)[number]["id"];

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<Record<ChoiceKey, string>>({ project_type: "", budget: "", timeline: "" });
  const [contact, setContact] = useState<Record<ContactKey, string>>({ name: "", company: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [choiceError, setChoiceError] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const legendRef = useRef<HTMLLegendElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const startedAt = useRef(Date.now());
  const stepShownAt = useRef(0);

  // Move focus to the new question when the step changes (not on first load).
  useEffect(() => {
    stepShownAt.current = Date.now();
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    legendRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "done") thanksRef.current?.focus();
  }, [status]);

  const current = STEPS[step - 1];

  const next = () => {
    if (current && !choices[current.key]) {
      setChoiceError("Choose one option to continue.");
      document.getElementById(`opt-${current.key}-0`)?.focus();
      return;
    }
    setChoiceError("");
    setStep((s) => Math.min(4, s + 1));
  };

  const back = () => {
    setChoiceError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      next();
      return;
    }
    // A double-click on "Next" (step 3) lands its second click on "Submit Request", which
    // sits in the same spot. Ignore a submit that arrives right after step 4 appears.
    if (Date.now() - stepShownAt.current < 700) return;
    const errs = validateContact(contact);
    setErrors(errs);
    const firstBad = CONTACT_FIELDS.find((f) => errs[f.id]);
    if (firstBad) {
      document.getElementById(`q-${firstBad.id}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...choices,
          ...contact,
          message: message.trim(),
          website: hp,
          elapsed_ms: Date.now() - startedAt.current,
          page_url: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "done") {
    const summary = [choices.project_type, choices.budget, choices.timeline].filter(Boolean).join(", ") || "new";
    return (
      <div role="status" className="stack" style={{ gap: 14, padding: "24px 0" }}>
        <h2 ref={thanksRef} tabIndex={-1} className="h2" style={{ fontSize: 40 }}>
          Thank You
        </h2>
        <p className="p">We’ve received your request for a {summary} project. Our team will follow up shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="stack" style={{ gap: 28 }} aria-label="Request a quote">
      <div className="stack" style={{ gap: 10 }}>
        <div aria-hidden="true" style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ flex: "1 1 0", height: 6, borderRadius: 3, background: i <= step ? "var(--red)" : "var(--border)" }} />
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--muted)" }} aria-live="polite">
          Step {step} of 4
        </p>
      </div>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>

      {current ? (
        <fieldset className="q-fieldset" aria-describedby={choiceError ? "q-choice-error" : undefined}>
          <legend ref={legendRef} tabIndex={-1} className="q-legend">
            {current.legend}
          </legend>
          <div className="stack" style={{ gap: 12 }}>
            {current.options.map((o, i) => (
              <label key={o} className="q-option" data-checked={choices[current.key] === o}>
                <input
                  id={`opt-${current.key}-${i}`}
                  type="radio"
                  name={current.key}
                  value={o}
                  checked={choices[current.key] === o}
                  onChange={() => {
                    setChoices((c) => ({ ...c, [current.key]: o }));
                    setChoiceError("");
                  }}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
          {choiceError && (
            <p id="q-choice-error" className="field-error" role="alert" style={{ margin: "12px 0 0" }}>
              {choiceError}
            </p>
          )}
        </fieldset>
      ) : (
        <fieldset className="q-fieldset">
          <legend ref={legendRef} tabIndex={-1} className="q-legend">
            Your contact info
          </legend>
          <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--muted)" }}>All fields are required unless marked optional.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 16 }}>
            {CONTACT_FIELDS.map((f) => {
              const err = errors[f.id];
              return (
                <div key={f.id} className="field">
                  <label htmlFor={`q-${f.id}`}>{f.label}</label>
                  <input
                    id={`q-${f.id}`}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    required
                    aria-required="true"
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? `q-${f.id}-err` : undefined}
                    value={contact[f.id]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContact((c) => ({ ...c, [f.id]: value }));
                      // Clear this field's red message as soon as the person starts fixing it.
                      if (errors[f.id]) setErrors((prev) => ({ ...prev, [f.id]: undefined }));
                    }}
                  />
                  {err && (
                    <span id={`q-${f.id}-err`} className="field-error">
                      {err}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="q-message">Project details (optional)</label>
            <span id="q-message-hint" style={{ fontSize: 14, color: "var(--muted)" }}>
              Location, scope, start date or anything else we should know.
            </span>
            <textarea
              id="q-message"
              name="message"
              rows={4}
              maxLength={2000}
              aria-describedby="q-message-hint"
              placeholder="e.g. New 2-storey addition in London, starting spring 2027"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 14, color: "var(--muted)" }}>
            By submitting, you agree to our{" "}
            <Link href={ROUTES.privacy} style={{ color: "var(--charcoal)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>
            .
          </p>
        </fieldset>
      )}

      {status === "failed" && (
        <p role="alert" className="field-error" style={{ margin: 0, fontSize: 16 }}>
          Sorry, we couldn’t send your request. Please try again, or call us at <a href={BUSINESS.phoneHref} style={{ color: "var(--red-text)", textDecoration: "underline" }}>{BUSINESS.phoneDisplay}</a>.
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 24 }}>
        {step > 1 ? (
          <button type="button" className="btn btn-sm btn-outline-dark" style={{ background: "none" }} onClick={back}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button type="button" className="btn btn-sm btn-red" style={{ border: "none", padding: "12px 32px" }} onClick={next}>
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-sm btn-red" style={{ border: "none", padding: "12px 32px" }} disabled={status === "sending"} aria-disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit Request"}
          </button>
        )}
      </div>
    </form>
  );
}
