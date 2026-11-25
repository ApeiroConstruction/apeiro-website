"use client";

import { useEffect } from "react";

/**
 * Loads the Google Analytics library (~180 KB) only when the visitor first interacts
 * (scroll, tap, click, mouse move, key press) or after 4 seconds, whichever comes first.
 * The small inline setup in the layout runs immediately and queues the page view and any
 * events, which are sent as soon as the library arrives. Keeps the first view fast.
 */
export default function GaLoader({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    const events = ["scroll", "pointerdown", "pointermove", "keydown", "touchstart"] as const;
    const load = () => {
      if (loaded) return;
      loaded = true;
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
      const s = document.createElement("script");
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      s.async = true;
      document.head.appendChild(s);
    };
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const timer = window.setTimeout(load, 4000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
  }, [id]);
  return null;
}
