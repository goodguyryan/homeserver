"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export default function SynthwaveSun({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className={`pointer-events-none ${className ?? ""}`}>
      <div
        className="rounded-full overflow-hidden"
        style={{
          width: 300,
          height: 300,
          background: isDark
            ? "linear-gradient(to bottom, #b44dff 0%, #b44dff 20%, #00ffff 20%, #00ffff 40%, #ff71ce 40%, #ff71ce 60%, #00ffff 60%, #00ffff 80%, #b44dff 80%, #b44dff 100%)"
            : "linear-gradient(to bottom, #a855f7 0%, #a855f7 25%, #0891b2 25%, #0891b2 50%, #db2777 50%, #db2777 75%, #0891b2 75%, #0891b2 100%)",
        }}
      />
    </div>
  );
}
