"use client";

import { useEffect } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { logos } from "./logos";

const LOGO_WIDTH = 25;
const GAP_WIDTH = 24;
const TOTAL_PER_LOGO = LOGO_WIDTH + GAP_WIDTH;
const SCROLL_DISTANCE = (logos.length * TOTAL_PER_LOGO);
const CYCLE_DURATION = logos.length * 2;

export default function LogoCarousel() {
  const scrollX = useMotionValue(-SCROLL_DISTANCE);

  useEffect(() => {
    const controls = animate(scrollX, 0, {
      duration: CYCLE_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [scrollX]);

  const displayLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden w-[123px] mx-auto">
      <motion.div style={{ x: scrollX }} className="flex gap-6">
        {displayLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="w-[25px] h-[25px] flex items-center justify-center text-muted"
          >
            {logo.svg}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
