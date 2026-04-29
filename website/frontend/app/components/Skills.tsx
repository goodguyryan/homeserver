"use client";

import { skills } from "@/data/skills";
import ScrollFadeIn from "./ScrollFadeIn";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Skills</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
            Technologies and tools I work with day-to-day.
          </p>
        </ScrollFadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {skills.map((group, i) => (
            <ScrollFadeIn key={group.category} delay={i * 0.1}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold tracking-wide text-accent">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-xs text-muted"
                    >
                      <img
                        src={item.icon}
                        alt=""
                        className="h-4 w-4"
                      />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
