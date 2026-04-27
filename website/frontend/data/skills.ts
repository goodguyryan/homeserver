export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "Linux", "Nginx", "Terraform"],
  },
  {
    category: "CI/CD & DevOps",
    items: ["GitHub Actions", "Jenkins", "Ansible", "Git", "Helm"],
  },
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Go", "Bash", "SQL"],
  },
];
