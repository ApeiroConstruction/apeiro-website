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

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page.
    const skip = document.querySelector<HTMLElement>(".skip");
    skip?.focus({ preventScroll: true });
  };

  return (
    <button type="button" className={`to-top${show ? " show" : ""}`} aria-label="Back to top" title="Back to top" onClick={goTop}>
      <ArrowUp />
    </button>
  );
}
