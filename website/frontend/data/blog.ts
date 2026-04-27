export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Setting Up a Home Lab with Docker Compose",
    date: "Jan 2026",
    excerpt:
      "A walkthrough of how I set up my home server using Docker Compose, covering networking, volume management, and best practices for self-hosted services.",
    slug: "home-lab-docker-compose",
  },
  {
    title: "Infrastructure as Code: Getting Started with Terraform",
    date: "Dec 2025",
    excerpt:
      "Why I moved from manual cloud console clicks to Terraform, and how to structure your first project for reproducible infrastructure.",
    slug: "getting-started-terraform",
  },
  {
    title: "CI/CD Pipelines That Actually Work",
    date: "Nov 2025",
    excerpt:
      "Lessons learned from building CI/CD pipelines across multiple projects — what to automate, what to keep manual, and how to avoid common pitfalls.",
    slug: "cicd-pipelines-that-work",
  },
];
