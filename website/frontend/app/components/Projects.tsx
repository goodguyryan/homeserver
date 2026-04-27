"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ScrollFadeIn from "./ScrollFadeIn";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Projects</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
            A selection of things I&apos;ve built and worked on.
          </p>
        </ScrollFadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollFadeIn key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
