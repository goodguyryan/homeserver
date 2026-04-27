import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-4 text-muted">Still in development.</p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
