"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Counts taps/clicks on phone and email links anywhere on the site, as GA4 events:
 * "click_to_call" and "click_to_email" (with the page they were on). No personal data.
 */
export default function ContactClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      trackEvent(href.startsWith("tel:") ? "click_to_call" : "click_to_email", { page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
