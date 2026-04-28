import { getAllProjects } from "@/lib/content";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <main className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-3xl font-bold">Projects</h1>
          <p className="mt-4 text-center text-muted">A selection of things I&apos;ve built and worked on.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
