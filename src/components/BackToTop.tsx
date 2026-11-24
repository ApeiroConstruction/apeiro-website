"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "./Icons";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow((window.scrollY || document.documentElement.scrollTop || 0) > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const goTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Keyboard users (Enter/Space give detail === 0): move focus back to the start of the page.
    // Taps and mouse clicks: just blur the button, so nothing pops up over the logo.
    if (e.detail === 0) {
      document.querySelector<HTMLElement>(".skip")?.focus({ preventScroll: true });
    } else {
      e.currentTarget.blur();
    }
  };

  return (
    <button type="button" className={`to-top${show ? " show" : ""}`} aria-label="Back to top" title="Back to top" onClick={goTop}>
      <ArrowUp />
    </button>
  );
}
