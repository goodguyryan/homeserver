"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });
  const cursorTransform = useMotionTemplate`translate(${springX}px, ${springY}px)`;
  const [cursorActive, setCursorActive] = useState(false);
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!cursorActive) setCursorActive(true);
    };

    const handleMouseLeave = () => {
      setCursorActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorActive, reducedMotion]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[-1]"
        style={{
          transform: cursorTransform,
          width: 600,
          height: 600,
          left: -300,
          top: -300,
          background: isDark
            ? "radial-gradient(circle, rgba(180, 77, 255, 0.10), transparent 60%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 65%)",
          opacity: cursorActive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[-1]"
        style={{
          transform: cursorTransform,
          width: 120,
          height: 120,
          left: -60,
          top: -60,
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.12), transparent 60%)",
          opacity: cursorActive && isDark ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
