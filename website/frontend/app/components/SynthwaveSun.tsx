"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

const STARS: [number, number, number, number][] = [
  [120, 40, 1.2, 0.35],
  [280, 80, 0.8, 0.2],
  [520, 30, 1.5, 0.4],
  [680, 70, 0.9, 0.25],
  [80, 130, 1.0, 0.3],
  [340, 60, 1.3, 0.45],
  [600, 100, 0.7, 0.15],
  [740, 140, 1.4, 0.35],
  [200, 150, 0.6, 0.2],
  [450, 50, 1.1, 0.3],
  [420, 120, 0.8, 0.25],
  [160, 90, 1.0, 0.4],
  [720, 50, 1.2, 0.3],
  [550, 140, 0.7, 0.2],
  [50, 170, 0.9, 0.25],
  [300, 140, 1.0, 0.15],
  [620, 180, 0.8, 0.3],
  [100, 200, 0.6, 0.2],
  [700, 30, 1.3, 0.35],
  [380, 90, 0.7, 0.25],
];

const SUN_STRIPES = [155, 175, 195, 215, 235, 255, 275, 295];
const GRID_H_LINES = [300, 325, 355, 390, 430, 475];
const GRID_V_COUNT = 21;
const HORIZON = 280;
const SUN_CX = 400;
const SUN_CY = 225;
const SUN_R = 92;
const VIEW_W = 800;
const VIEW_H = 500;

function makeMountainPath(points: [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

interface Colors {
  skyTop: string;
  skyHorizon: string;
  sunOrange: string;
  sunPink: string;
  mountainFar: string;
  mountainNear: string;
  mountainClose: string;
  grid: string;
  stripe: string;
}

function getColors(isDark: boolean): Colors {
  return isDark
    ? {
        skyTop: "#0d0221",
        skyHorizon: "#1a0a3e",
        sunOrange: "#ff8c42",
        sunPink: "#ff71ce",
        mountainFar: "#00cccc",
        mountainNear: "#00ffff",
        mountainClose: "#44ddff",
        grid: "#b44dff",
        stripe: "#0d0221",
      }
    : {
        skyTop: "#c4b5e3",
        skyHorizon: "#d8c4f0",
        sunOrange: "#f59e0b",
        sunPink: "#db2777",
        mountainFar: "#0891b2",
        mountainNear: "#06b6d4",
        mountainClose: "#22d3ee",
        grid: "#a855f7",
        stripe: "#2d1b69",
      };
}

export default function SynthwaveSun({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const c = getColors(isDark);

  return (
    <div className={`pointer-events-none w-full max-w-[800px] ${className ?? ""}`}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.skyTop} />
            <stop offset="100%" stopColor={c.skyHorizon} />
          </linearGradient>

          <linearGradient id="ss-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.sunOrange} />
            <stop offset="50%" stopColor={c.sunPink} />
            <stop offset="100%" stopColor={c.sunOrange} />
          </linearGradient>

          <clipPath id="ss-clip">
            <circle cx={SUN_CX} cy={SUN_CY} r={SUN_R} />
          </clipPath>

          <linearGradient id="ss-grid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={c.grid} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c.grid} stopOpacity="0" />
          </linearGradient>

          <filter id="ss-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="ss-mask-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="ss-mask">
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#ss-mask-grad)" />
          </mask>
        </defs>

        <g mask="url(#ss-mask)">
          <rect x="0" y="0" width={VIEW_W} height={HORIZON} fill="url(#ss-sky)" />

        {STARS.map(([cx, cy, r, op], i) => (
          <circle key={`s-${i}`} cx={cx} cy={cy} r={r} fill="white" opacity={op} />
        ))}

        {/* Sun glow */}
        <circle cx={SUN_CX} cy={SUN_CY} r={135} fill={c.sunOrange} opacity="0.06" />
        <circle cx={SUN_CX} cy={SUN_CY} r={108} fill={c.sunPink} opacity="0.08" />

        {/* Striped sun */}
        <g clipPath="url(#ss-clip)">
          <rect x="0" y={SUN_CY - SUN_R} width={VIEW_W} height={SUN_R * 2} fill="url(#ss-sun)" />
          {SUN_STRIPES.map((y) => (
            <rect
              key={`st-${y}`}
              x="0"
              y={y}
              width={VIEW_W}
              height="8"
              fill={c.stripe}
              opacity="0.55"
            />
          ))}
        </g>

        {/* Far mountains */}
        <polyline
          points={makeMountainPath([
            [0, HORIZON],
            [60, 245], [120, 260], [180, 210], [240, 245], [300, 200], [360, 235],
          ])}
          fill="none"
          stroke={c.mountainFar}
          strokeWidth="1.5"
          opacity="0.3"
        />
        <polyline
          points={makeMountainPath([
            [VIEW_W, HORIZON],
            [740, 245], [680, 260], [620, 210], [560, 245], [500, 200], [440, 235],
          ])}
          fill="none"
          stroke={c.mountainFar}
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Near mountains */}
        <polyline
          points={makeMountainPath([
            [0, VIEW_H],
            [50, 340], [100, 375], [160, 300], [220, 340], [280, 285], [340, 330], [380, 290],
          ])}
          fill="none"
          stroke={c.mountainNear}
          strokeWidth="2"
          opacity="0.45"
          filter="url(#ss-glow)"
        />
        <polyline
          points={makeMountainPath([
            [VIEW_W, VIEW_H],
            [750, 340], [700, 375], [640, 300], [580, 340], [520, 285], [460, 330], [420, 290],
          ])}
          fill="none"
          stroke={c.mountainNear}
          strokeWidth="2"
          opacity="0.45"
          filter="url(#ss-glow)"
        />

        {/* Closest mountains */}
        <polyline
          points={makeMountainPath([
            [0, VIEW_H],
            [40, 410], [90, 445], [160, 370], [220, 410], [280, 350], [330, 395], [390, 340],
          ])}
          fill="none"
          stroke={c.mountainClose}
          strokeWidth="1.5"
          opacity="0.55"
        />
        <polyline
          points={makeMountainPath([
            [VIEW_W, VIEW_H],
            [760, 410], [710, 445], [640, 370], [580, 410], [520, 350], [470, 395], [410, 340],
          ])}
          fill="none"
          stroke={c.mountainClose}
          strokeWidth="1.5"
          opacity="0.55"
        />

        {/* Grid floor */}
        <polygon points={`0,${VIEW_H} ${SUN_CX},${HORIZON} ${VIEW_W},${VIEW_H}`} fill="url(#ss-grid)" />

        {/* Grid horizontal lines */}
        {GRID_H_LINES.map((y) => {
          const t = (y - HORIZON) / (VIEW_H - HORIZON);
          const halfW = 400 * t;
          return (
            <line
              key={`gh-${y}`}
              x1={SUN_CX - halfW}
              y1={y}
              x2={SUN_CX + halfW}
              y2={y}
              stroke={c.grid}
              strokeWidth="1"
              opacity={0.1 + t * 0.28}
            />
          );
        })}

        {/* Grid vertical radiating lines */}
        {Array.from({ length: GRID_V_COUNT }, (_, i) => {
          const t = (i - (GRID_V_COUNT - 1) / 2) / ((GRID_V_COUNT - 1) / 2);
          return (
            <line
              key={`gv-${i}`}
              x1={SUN_CX}
              y1={HORIZON}
              x2={SUN_CX + t * 520}
              y2={VIEW_H}
              stroke={c.grid}
              strokeWidth="1"
              opacity="0.1"
            />
          );
        })}
        </g>
      </svg>
    </div>
  );
}
