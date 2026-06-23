"use client";

import Link from "next/link";
import { ProjectMeta } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import ScrollFadeIn from "./ScrollFadeIn";

export default function Projects({ projects }: { projects: ProjectMeta[] }) {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Projects</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
            A selection of things I&apos;ve built and worked on.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:box-glow-purple"
            >
              See More &rarr;
            </Link>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
