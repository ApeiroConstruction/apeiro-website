"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SERVICE_CARDS } from "@/lib/site";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function ServicesCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [idx, setIdx] = useState(0);
  const count = SERVICE_CARDS.length;
  const behavior = (): ScrollBehavior =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const scrollBy = (dir: number) => track.current?.scrollBy({ left: dir * 364, behavior: behavior() });

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const i = max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0;
    if (i !== idx) setIdx(i);
  };

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max * i) / (count - 1), behavior: behavior() });
  };

  return (
    <div className="stack" style={{ gap: 28 }}>
      <div className="carousel-row">
        <button type="button" className="carousel-btn" aria-label="Previous services" onClick={() => scrollBy(-1)}>
          <ChevronLeft />
        </button>
        <ul className="track" ref={track} onScroll={onScroll} aria-label="Services">
          {SERVICE_CARDS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="svc-card card">
                <div className="media">
                  <Image src={s.img} alt={s.alt} fill sizes="340px" style={{ objectFit: "cover" }} />
                </div>
                <div className="svc-card-body">
                  <h3 className="h3">{s.title}</h3>
                  <span className="text">{s.text}</span>
                  <span className="learn">Learn more</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" className="carousel-btn solid" aria-label="Next services" onClick={() => scrollBy(1)}>
          <ChevronRight />
        </button>
      </div>
      <div className="dots">
        {SERVICE_CARDS.map((_, i) => (
          <button key={i} type="button" className="dot-btn" aria-label={`Go to service ${i + 1} of ${count}`} aria-current={i === idx ? "true" : undefined} onClick={() => go(i)}>
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
