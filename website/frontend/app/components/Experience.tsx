"use client";

import { useRef, useEffect, useState } from "react";
import { experiences } from "@/data/experience";
import ScrollFadeIn from "./ScrollFadeIn";

export default function Experience() {
  const [lineProgress, setLineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startPoint = windowHeight * 0.3;
        const endPoint = rect.height + rect.top - windowHeight * 0.1;
        const scrollPosition = startPoint - rect.top;
        const totalScroll = endPoint - startPoint;
        const progress = Math.max(0, Math.min(1, scrollPosition / totalScroll));
        if (Math.abs(progress - lastProgressRef.current) < 0.005) return;
        lastProgressRef.current = progress;
        setLineProgress(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Experience
          </h2>
        </ScrollFadeIn>

        <div className="relative mt-12" ref={timelineRef}>
          <div
            className="absolute left-0 top-0 h-full w-px md:left-1/2 md:-translate-x-px"
            style={{
              background: "var(--color-border)",
            }}
          />
          <div
            className="absolute left-0 top-0 w-px md:left-1/2 md:-translate-x-px"
            style={{
              height: `${lineProgress * 100}%`,
              background: "var(--color-accent)",
            }}
          />

          <ScrollFadeIn>
            {experiences.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.startDate}`}
                className={`relative mb-10 last:mb-0 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-10"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`absolute top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-background animate-[neon-pulse_2s_ease-in-out_infinite] ${
                    i % 2 === 0
                      ? "-left-[5px] md:-right-[5px]"
                      : "-left-[5px]"
                  }`}
                  style={{ boxShadow: "0 0 8px var(--cyan)" }}
                />

                <div className="ml-6 rounded-lg border border-border bg-surface/60 backdrop-blur-sm p-5 transition-all hover:border-accent/30 md:ml-0">
                  <span className="text-xs text-cyan">
                    {exp.startDate} — {exp.endDate}
                  </span>
                  <h3 className="mt-1 text-base font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted">{exp.company}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {exp.description.map((line) => (
                      <li key={line} className="text-sm leading-relaxed text-muted">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
