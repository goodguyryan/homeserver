"use client";

import ScrollFadeIn from "./ScrollFadeIn";

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">About Me</h2>
        </ScrollFadeIn>

        <div className="mt-12 flex flex-col items-center gap-12 md:flex-row md:items-start">
          <ScrollFadeIn delay={0.1}>
            <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-surface border border-border text-5xl text-muted">
              R
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.2}>
            <div className="flex flex-col gap-6 text-center md:text-left">
              <p className="text-base leading-relaxed text-muted">
                Hi, I&apos;m Ryan — a DevOps and Cloud Engineer with a passion
                for building reliable, automated infrastructure. I enjoy working
                across the stack, from container orchestration to CI/CD pipelines,
                and everything in between.
              </p>
              <p className="text-base leading-relaxed text-muted">
                When I&apos;m not engineering cloud solutions, you&apos;ll find me
                tinkering with home lab setups, contributing to open-source
                projects, or exploring new tools to streamline development
                workflows.
              </p>

              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li className="flex items-start gap-2 md:items-center">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0" />
                  Specializing in cloud infrastructure and containerization
                </li>
                <li className="flex items-start gap-2 md:items-center">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0" />
                  Passionate about automation and Infrastructure as Code
                </li>
                <li className="flex items-start gap-2 md:items-center">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0" />
                  Always learning, always building
                </li>
              </ul>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
