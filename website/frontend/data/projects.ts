export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["Docker", "Kubernetes", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Project Two",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["Python", "Terraform", "CI/CD"],
    githubUrl: "https://github.com",
  },
  {
    title: "Project Three",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["Go", "Linux", "Nginx"],
    liveUrl: "https://example.com",
  },
  {
    title: "Project Four",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
    githubUrl: "https://github.com",
  },
  {
    title: "Project Five",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["Bash", "Ansible", "Git"],
    githubUrl: "https://github.com",
  },
  {
    title: "Project Six",
    description:
      "A brief description of the project, what it does, and the problem it solves.",
    tags: ["Python", "Flask", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
