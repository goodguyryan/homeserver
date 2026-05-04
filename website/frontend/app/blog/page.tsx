import { getAllBlogPosts } from "@/lib/content";
import Link from "next/link";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-bold">Blog</h1>
        <p className="mt-4 text-center text-muted">All posts</p>
        <div className="mt-12 flex flex-col gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
