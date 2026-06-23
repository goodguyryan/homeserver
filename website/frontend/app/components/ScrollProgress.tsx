"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-[calc(4.2rem-6px)] left-0 z-[60] h-[2px] bg-gradient-to-r from-accent via-cyan to-pink md:top-[4.2rem]"
      style={{
        width: `${progress}%`,
        transition: "width 0.15s ease-out",
        backgroundSize: "200% 100%",
        animation: "gradient-shift 3s linear infinite",
      }}
    />
  );
}
