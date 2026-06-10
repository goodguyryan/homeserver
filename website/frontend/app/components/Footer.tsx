"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative pt-px">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-cyan to-pink" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} Ryan. Built with Next.js and
          Tailwind CSS.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/" className="transition-colors hover:text-cyan">
            Home
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-cyan"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="transition-colors hover:text-cyan"
          >
            Blog
          </Link>
          <a
            href="https://github.com/goodguyryan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-pink"
          >
            GitHub
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-all hover:text-accent hover:text-glow-purple"
          >
            Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
