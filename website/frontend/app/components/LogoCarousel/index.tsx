"use client";

import { useMemo } from "react";
import Image from "next/image";
import { logos } from "./logos";

const LOGO_WIDTH = 25;
const GAP_WIDTH = 24;
const SCROLL_DISTANCE = logos.length * (LOGO_WIDTH + GAP_WIDTH);
const CYCLE_DURATION = logos.length * 2;

export default function LogoCarousel() {
  const displayLogos = useMemo(() => [...logos, ...logos], []);

  return (
    <div className="overflow-hidden w-[123px] mx-auto">
      <div
        className="flex gap-6"
        style={{
          "--scroll-distance": `-${SCROLL_DISTANCE}px`,
          animation: `carousel-scroll ${CYCLE_DURATION}s linear infinite reverse`,
        } as React.CSSProperties}
      >
        {displayLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="w-[25px] h-[25px] flex items-center justify-center shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.ariaLabel}
              width={25}
              height={25}
              className="h-[25px] w-[25px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
