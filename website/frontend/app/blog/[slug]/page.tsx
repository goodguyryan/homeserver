import { getAllBlogPosts, getAllBlogSlugs } from "@/lib/content";
import Link from "next/link";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  const posts = getAllBlogPosts();
  const meta = posts.find((p) => p.slug === slug);

  if (!meta) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Not Found</h1>
          <p className="mt-4 text-muted">Blog post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="prose prose-invert prose-zinc mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="mt-4 mb-4 inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground no-underline transition-colors hover:border-muted hover:bg-surface hover:!text-foreground"
      >
        &larr; Back to Blog
      </Link>
      <h1 className="mt-6 mb-2">{meta.title}</h1>
      <p className="text-sm text-muted not-prose mb-2">{meta.date}</p>
      <p className="lead">{meta.excerpt}</p>
      <hr />
      <Post />
    </article>
  );
}
