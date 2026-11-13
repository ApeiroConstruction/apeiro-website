"use client";

import { useEffect, useRef, useState } from "react";

/** Muted, looping background video with a visible pause/play button (hidden from screen readers except the button). */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Respect reduced-motion: start paused.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
      setPaused(true);
    }
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (paused) {
      void v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="hero-video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div aria-hidden="true" className="hero-shade" />
      <button type="button" className="hero-pause" onClick={toggle}>
        {paused ? "Play background video" : "Pause background video"}
      </button>
    </>
  );
}
