"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Home hero background: a compressed poster image loads first (fast first paint),
 * then the muted, looping video starts once the page has finished loading.
 * A visible button pauses/plays it. The video is hidden from screen readers.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPaused(true);
    const start = () => setVideoSrc(src);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  // Autoplay once the source is attached, unless paused (or reduced motion).
  useEffect(() => {
    const v = ref.current;
    if (!v || !videoSrc) return;
    if (paused) v.pause();
    else void v.play().catch(() => {});
  }, [videoSrc, paused]);

  return (
    <>
      <Image src={poster} alt="" fill priority sizes="100vw" quality={70} className="hero-poster" aria-hidden="true" />
      <video ref={ref} className="hero-video" src={videoSrc} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
      <div aria-hidden="true" className="hero-shade" />
      <button type="button" className="hero-pause" onClick={() => setPaused((p) => !p)}>
        {paused ? "Play background video" : "Pause background video"}
      </button>
    </>
  );
}
