"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export default function BackgroundLayer() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-2]"
      style={{
        background: isDark
          ? [
              "radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.25), transparent)",
              "radial-gradient(1px 1px at 25% 8%, rgba(255,255,255,0.2), transparent)",
              "radial-gradient(1px 1px at 40% 20%, rgba(255,255,255,0.15), transparent)",
              "radial-gradient(1px 1px at 55% 12%, rgba(255,255,255,0.2), transparent)",
              "radial-gradient(1px 1px at 70% 18%, rgba(255,255,255,0.15), transparent)",
              "radial-gradient(1px 1px at 85% 10%, rgba(255,255,255,0.25), transparent)",
              "radial-gradient(1px 1px at 15% 5%, rgba(255,255,255,0.18), transparent)",
              "radial-gradient(1px 1px at 60% 5%, rgba(255,255,255,0.1), transparent)",
              "radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.12), transparent)",
              "linear-gradient(to top, rgba(0, 255, 255, 0.04) 0%, transparent 40%)",
              "linear-gradient(180deg, transparent 60%, transparent 65%, rgba(180, 77, 255, 0.02) 80%, rgba(0, 255, 255, 0.06) 90%, rgba(180, 77, 255, 0.08) 100%)",
              "var(--color-background)",
            ].join(", ")
          : [
              "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px), var(--color-background)",
            ].join(", "),
        backgroundSize: isDark ? undefined : "24px 24px",
      }}
    />
  );
}
