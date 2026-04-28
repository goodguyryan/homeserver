import Link from "next/link";
import { BlogMeta } from "@/lib/content";

interface BlogCardProps {
  post: BlogMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted">
      <div className="flex h-8 items-center rounded-md bg-background text-xs text-accent font-medium">
        {post.date}
      </div>

      <h3 className="mt-4 text-base font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>

      <div className="mt-auto pt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
        >
          Read more
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
        </Link>
      </div>
    </div>
  );
}
