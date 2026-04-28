import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-semibold">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-accent underline hover:text-accent-hover">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-accent">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded bg-surface p-4 text-sm">
        {children}
      </pre>
    ),
    ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 list-decimal pl-6">{children}</ol>,
    li: ({ children }) => <li className="mb-1 text-muted">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-accent pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  };
}
