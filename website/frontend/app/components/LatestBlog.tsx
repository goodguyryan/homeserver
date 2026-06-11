"use client";

import Link from "next/link";
import { BlogMeta } from "@/lib/content";
import BlogCard from "./BlogCard";
import ScrollFadeIn from "./ScrollFadeIn";

export default function LatestBlog({ posts }: { posts: BlogMeta[] }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollFadeIn>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Latest Blog
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
            Recent thoughts and write-ups.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="mt-12 flex flex-col gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
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
