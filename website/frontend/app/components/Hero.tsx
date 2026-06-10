"use client";

import LogoCarousel from "./LogoCarousel";
import SynthwaveSun from "./SynthwaveSun";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180, 77, 255, 0.08), transparent)",
            "radial-gradient(ellipse 60% 40% at 30% 25%, rgba(0, 255, 255, 0.05), transparent)",
            "radial-gradient(ellipse 50% 50% at 75% 55%, rgba(255, 113, 206, 0.04), transparent)",
          ].join(", "),
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SynthwaveSun className="opacity-[0.06] dark:opacity-[0.10]" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1
          className="text-5xl font-bold tracking-tight sm:text-7xl"
          style={{ animation: "fadeInUp 0.5s ease-out both" }}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-accent via-cyan to-pink bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient-shift_3s_linear_infinite]">
            Ryan
          </span>
          <span>.</span>
        </h1>

        <p
          className="mt-4 text-lg text-cyan sm:text-xl"
          style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.15s" }}
        >
          Software Engineer aspiring towards DevOps and Platform Engineering
        </p>

        <p
          className="mx-auto mt-6 max-w-[650px] text-base leading-relaxed text-muted"
          style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.3s" }}
        >
          I build backend systems, infrastructure automation, CI/CD workflows,
          and internal tools that help software ship safely, run reliably, and
          scale with confidence.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.45s" }}
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:box-glow-purple"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-accent/40 bg-background/60 backdrop-blur-sm px-6 text-sm font-medium text-foreground transition-all hover:border-cyan hover:box-glow-cyan"
          >
            Get in Touch
          </a>
        </div>

        <div
          className="mt-12"
          style={{ animation: "fadeIn 0.5s ease-out both", animationDelay: "0.6s" }}
        >
          <div className="inline-block rounded-lg border border-accent/20 bg-surface/50 p-3">
            <LogoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
