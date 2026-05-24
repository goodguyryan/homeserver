import { ProjectMeta } from "@/lib/content";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  const inner = (
    <>
      <h3 className="text-base font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            View Project
          </span>
        </div>
      )}
    </>
  );

  const className = "flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted";

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}
