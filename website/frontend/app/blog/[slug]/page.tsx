import { getAllBlogPosts, getAllBlogSlugs } from "@/lib/content";
import Navbar from "../../components/Navbar";

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
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Not Found</h1>
            <p className="mt-4 text-muted">Blog post not found.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        <span className="mt-2 block text-sm text-accent">{meta.date}</span>
        <div className="mt-8">
          <Post />
        </div>
      </article>
    </>
  );
}
