// Options and validation shared by the quote form (browser) and the API route (server).

export const PROJECT_TYPES = ["Commercial", "Institutional", "Civil / Infrastructure"] as const;
export const BUDGETS = ["$800K – $1.5M", "$1.5M – $3M", "$3M – $4M+"] as const;
export const TIMELINES = ["0–3 months", "3–6 months", "6–12 months", "12+ months"] as const;

export type QuoteInput = {
  project_type: string;
  budget: string;
  timeline: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  page_url?: string;
};

export type ContactErrors = Partial<Record<"name" | "company" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: Pick<QuoteInput, "name" | "company" | "email" | "phone">): ContactErrors {
  const e: ContactErrors = {};
  if (!v.name.trim()) e.name = "Enter your full name.";
  else if (v.name.length > 120) e.name = "Name is too long.";
  if (!v.company.trim()) e.company = "Enter your company name.";
  else if (v.company.length > 160) e.company = "Company name is too long.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 254) e.email = "Enter a valid email address, like name@company.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Enter your phone number.";
  else if (digits.length < 10 || digits.length > 15) e.phone = "Enter a valid phone number, including area code.";
  return e;
}

export function validateQuote(v: QuoteInput): string[] {
  const problems: string[] = [];
  if (!(PROJECT_TYPES as readonly string[]).includes(v.project_type)) problems.push("project_type");
  if (!(BUDGETS as readonly string[]).includes(v.budget)) problems.push("budget");
  if (!(TIMELINES as readonly string[]).includes(v.timeline)) problems.push("timeline");
  problems.push(...Object.keys(validateContact(v)));
  return problems;
}
