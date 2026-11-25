// Small helper for Google Analytics 4 events. Does nothing if GA isn't loaded
// (no NEXT_PUBLIC_GA_ID, or blocked by the visitor's browser).
type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
