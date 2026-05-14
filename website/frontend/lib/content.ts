import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BlogMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featured: boolean;
}

export interface ProjectMeta {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  slug: string;
  order: number;
}

export function getAllBlogPosts(): BlogMeta[] {
  const blogDir = path.join(CONTENT_DIR, "blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      slug: data.slug,
      featured: data.featured ?? false,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllProjects(): ProjectMeta[] {
  const projectsDir = path.join(CONTENT_DIR, "projects");

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".mdx"));

  const projects = files.map((file) => {
    const filePath = path.join(projectsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      tags: data.tags,
      link: data.link,
      slug: data.slug,
      order: data.order,
    };
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getAllBlogSlugs(): string[] {
  const blogDir = path.join(CONTENT_DIR, "blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return data.slug;
  });
}
