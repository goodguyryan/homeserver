import Link from "next/link";
import SynthwaveSun from "./components/SynthwaveSun";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SynthwaveSun className="opacity-[0.06] dark:opacity-[0.10]" />
      </div>
      <div className="relative text-center">
        <h1 className="bg-gradient-to-r from-accent via-cyan to-pink bg-clip-text text-7xl font-bold text-transparent bg-[length:200%_100%] animate-[gradient-shift_3s_linear_infinite]">
          404
        </h1>
        <p className="mt-4 text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:box-glow-purple"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
