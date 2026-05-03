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
                Hi I&apos;m Ryan, a software engineer aspiring toward DevOps and Platform Engineering.
                I enjoy building automation, infrastructure tooling, CI/CD workflows, and
                backend systems that make software easier to deploy, operate, and scale.
              </p>
              <p className="text-base leading-relaxed text-muted">
                My experience includes automating server administration with
                Ansible, building VM-based CI/CD workflows and deploying Dockerized
                services on homelab infrastructure. Across these projects, I&apos;m
                most interested in making systems easier to operate, safer to
                deploy, and more reliable for the teams that depend on them.
              </p>
              <p className="text-base leading-relaxed text-muted">
                As a Computer Engineer, I also enjoy exploring low-level systems from time to time,
                which gives me a deeper appreciation for how systems and infrastructure work beneath
                the abstractions we use every day.
              </p>

              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li className="flex items-start gap-2 md:items-center">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0" />
                  Specializing in DevOps, Platform Engineering, and Reliability
                </li>
                <li className="flex items-start gap-2 md:items-center">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0" />
                  Passionate about Automation and Infrastructure as Code
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
