"use client";

import { experiences } from "@/data/experience";
import ScrollFadeIn from "./ScrollFadeIn";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Experience
          </h2>
        </ScrollFadeIn>

        <div className="relative mt-12">
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <ScrollFadeIn key={`${exp.company}-${exp.startDate}`} delay={i * 0.15}>
              <div
                className={`relative mb-10 last:mb-0 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-10"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`absolute top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background ${
                    i % 2 === 0
                      ? "-left-[5px] md:-right-[5px]"
                      : "-left-[5px]"
                  }`}
                />

                <div className="ml-6 rounded-lg border border-border bg-surface p-5 md:ml-0">
                  <span className="text-xs text-accent">
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
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
