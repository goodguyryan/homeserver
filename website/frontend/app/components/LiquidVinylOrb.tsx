"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  t: number;
  maxRadius: number;
}

interface VinylState {
  rotation: number;
  rotationSpeed: number;
  hoverX: number;
  hoverY: number;
  isHovering: boolean;
  isDragging: boolean;
  dragAngle: number;
  dragOffset: number;
  lastPointerAngle: number;
  ripples: Ripple[];
  time: number;
  targetSpeed: number;
}

const IDLE_SPEED = 0.5;
const HOVER_SPEED = 0.7;
const DRAG_RETURN_LERP = 0.04;
const SPEED_LERP = 0.03;
const MAX_RIPPLES = 6;

export default function LiquidVinylOrb({ size = 192 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<VinylState>({
    rotation: 0,
    rotationSpeed: IDLE_SPEED,
    hoverX: 0,
    hoverY: 0,
    isHovering: false,
    isDragging: false,
    dragAngle: 0,
    dragOffset: 0,
    lastPointerAngle: 0,
    ripples: [],
    time: 0,
    targetSpeed: IDLE_SPEED,
  });
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  const getPointerAngle = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return Math.atan2(clientY - cy, clientX - cx);
    },
    []
  );

  const getLocalCoords = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      const scale = rect.width;
      return {
        x: ((clientX - rect.left) / scale) * 2 - 1,
        y: ((clientY - rect.top) / scale) * 2 - 1,
      };
    },
    []
  );

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasSize = size * dpr;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const outerR = size / 2 - 1;

    let lastTime = performance.now();

    const draw = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      const s = stateRef.current;
      s.time += dt;

      s.rotationSpeed += (s.targetSpeed - s.rotationSpeed) * SPEED_LERP;

      if (!prefersReducedMotion.current) {
        s.rotation += s.rotationSpeed * dt;
      }

      s.dragOffset *= 1 - DRAG_RETURN_LERP;

      if (Math.abs(s.dragOffset) < 0.0005) {
        s.dragOffset = 0;
      }

      s.ripples = s.ripples.filter((r) => {
        r.t += dt;
        return r.t < 1.2;
      });

      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.clip();

      const bgGrad = ctx.createRadialGradient(
        cx - outerR * 0.15,
        cy - outerR * 0.15,
        outerR * 0.05,
        cx,
        cy,
        outerR
      );
      bgGrad.addColorStop(0, "#f5f5f5");
      bgGrad.addColorStop(0.4, "#e8e8e8");
      bgGrad.addColorStop(1, "#d4d4d4");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, size, size);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s.rotation + s.dragOffset);

      const grooveCount = 22;
      const labelR = outerR * 0.3;
      const spindleR = outerR * 0.04;

      for (let i = 0; i < grooveCount; i++) {
        const t = (i + 1) / (grooveCount + 1);
        const baseR = labelR + (outerR - labelR - 2) * t;

        const pulsePhase = s.time * 1.5 + i * 0.4;
        const pulse = Math.sin(pulsePhase) * 0.015;
        let r = baseR * (1 + pulse);

        if (s.isDragging && Math.abs(s.dragOffset) > 0.005) {
          const warpStrength = Math.abs(s.dragOffset) * 80;
          r += Math.sin(i * 0.7 + s.time * 3) * warpStrength * t;
        }

        r = Math.max(1, r);

        const alphaBase = 0.03 + 0.04 * Math.sin(s.time * 0.8 + i * 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${alphaBase})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s.rotation + s.dragOffset);

      const labelGrad = ctx.createRadialGradient(
        -labelR * 0.2,
        -labelR * 0.2,
        labelR * 0.05,
        0,
        0,
        labelR
      );
      labelGrad.addColorStop(0, "#c084fc");
      labelGrad.addColorStop(0.5, "#a855f7");
      labelGrad.addColorStop(1, "#7e22ce");
      ctx.beginPath();
      ctx.arc(0, 0, labelR, 0, Math.PI * 2);
      ctx.fillStyle = labelGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, labelR, 0, Math.PI * 2);
      ctx.strokeStyle = "#b8860b";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      const innerRing = labelR * 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, innerRing, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const outerRing = labelR * 0.85;
      ctx.beginPath();
      ctx.arc(0, 0, outerRing, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.fillStyle = "#e8e8e8";
      ctx.font = `bold ${Math.round(labelR * 0.65)}px ${getComputedStyle(document.documentElement).getPropertyValue("--font-sans") || "ui-sans-serif, system-ui, sans-serif"}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("R", 0, 1);

      const dotAngle = (2 * Math.PI) / 3;
      ctx.beginPath();
      ctx.arc(
        Math.cos(dotAngle) * labelR * 0.73,
        Math.sin(dotAngle) * labelR * 0.73,
        labelR * 0.06,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fill();

      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s.rotation + s.dragOffset);

      const sheenAngle = s.time * 0.15;
      const sheenX = Math.cos(sheenAngle) * outerR * 0.3;
      const sheenY = Math.sin(sheenAngle) * outerR * 0.3;

      const sheenGrad = ctx.createRadialGradient(
        sheenX,
        sheenY,
        0,
        sheenX,
        sheenY,
        outerR * 0.7
      );
      sheenGrad.addColorStop(0, "rgba(0, 0, 0, 0.04)");
      sheenGrad.addColorStop(0.4, "rgba(0, 0, 0, 0.01)");
      sheenGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(-outerR, -outerR, outerR * 2, outerR * 2);

      const streakAngle = s.time * 0.08 + 0.5;
      ctx.save();
      ctx.rotate(streakAngle);
      const streakGrad = ctx.createLinearGradient(
        -outerR,
        0,
        outerR,
        0
      );
      streakGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      streakGrad.addColorStop(0.35, "rgba(0, 0, 0, 0)");
      streakGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.03)");
      streakGrad.addColorStop(0.65, "rgba(0, 0, 0, 0)");
      streakGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = streakGrad;
      ctx.fillRect(-outerR, -outerR * 0.15, outerR * 2, outerR * 0.3);
      ctx.restore();

      ctx.restore();

      if (s.isHovering && !s.isDragging) {
        const hlX = cx + s.hoverX * outerR * 0.8;
        const hlY = cy + s.hoverY * outerR * 0.8;
        const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, outerR * 0.5);
        hlGrad.addColorStop(0, "rgba(0, 0, 0, 0.05)");
        hlGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.015)");
        hlGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = hlGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.fill();
      }

      if (s.isDragging && Math.abs(s.dragOffset) > 0.005) {
        const dragIntensity = Math.min(Math.abs(s.dragOffset) * 15, 0.15);
        const dragGrad = ctx.createRadialGradient(cx, cy, labelR, cx, cy, outerR);
        dragGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
        dragGrad.addColorStop(0.5, `rgba(168, 85, 247, ${dragIntensity * 0.3})`);
        dragGrad.addColorStop(1, `rgba(168, 85, 247, ${dragIntensity})`);
        ctx.fillStyle = dragGrad;
        ctx.fillRect(0, 0, size, size);
      }

      for (const ripple of s.ripples) {
        const progress = ripple.t / 1.2;
        const r = ripple.maxRadius * progress;
        const alpha = 0.2 * (1 - progress) * (1 - progress);

        ctx.save();
        ctx.translate(cx, cy);

        for (let i = 0; i < 3; i++) {
          const ringR = r * (0.8 + i * 0.1);
          const ringAlpha = alpha * (1 - i * 0.3);
          if (ringAlpha <= 0 || ringR <= 0) continue;

          ctx.beginPath();
          ctx.arc(
            ripple.x * outerR,
            ripple.y * outerR,
            Math.max(1, ringR),
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, ringAlpha)})`;
          ctx.lineWidth = 1.5 - progress;
          ctx.stroke();
        }

        if (progress < 0.5) {
          const distortAlpha = 0.08 * (1 - progress * 2);
          const distortGrad = ctx.createRadialGradient(
            ripple.x * outerR,
            ripple.y * outerR,
            0,
            ripple.x * outerR,
            ripple.y * outerR,
            r
          );
          distortGrad.addColorStop(0, `rgba(0, 0, 0, ${distortAlpha})`);
          distortGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = distortGrad;
          ctx.beginPath();
          ctx.arc(
            ripple.x * outerR,
            ripple.y * outerR,
            Math.max(1, r),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      }

      const rimGrad = ctx.createRadialGradient(cx, cy, outerR - 2, cx, cy, outerR);
      rimGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      rimGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.03)");
      rimGrad.addColorStop(1, "rgba(0, 0, 0, 0.06)");
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = "#b8860b";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  const handlePointerEnter = useCallback(() => {
    const s = stateRef.current;
    s.isHovering = true;
    s.targetSpeed = HOVER_SPEED;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const s = stateRef.current;
    s.isHovering = false;
    s.isDragging = false;
    s.targetSpeed = IDLE_SPEED;
    s.hoverX = 0;
    s.hoverY = 0;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const s = stateRef.current;
      const rect = e.currentTarget.getBoundingClientRect();
      const coords = getLocalCoords(e.clientX, e.clientY, rect);
      s.hoverX = coords.x;
      s.hoverY = coords.y;

      if (s.isDragging) {
        const angle = getPointerAngle(e.clientX, e.clientY, rect);
        let delta = angle - s.lastPointerAngle;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        s.dragOffset += delta;
        s.lastPointerAngle = angle;
      }
    },
    [getLocalCoords, getPointerAngle]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const s = stateRef.current;
      const rect = e.currentTarget.getBoundingClientRect();
      const coords = getLocalCoords(e.clientX, e.clientY, rect);

      const dist = Math.sqrt(coords.x * coords.x + coords.y * coords.y);
      if (dist > 1.1) return;

      if (s.ripples.length >= MAX_RIPPLES) {
        s.ripples.shift();
      }
      s.ripples.push({
        x: coords.x,
        y: coords.y,
        t: 0,
        maxRadius: size * 0.3,
      });

      s.isDragging = true;
      s.lastPointerAngle = getPointerAngle(e.clientX, e.clientY, rect);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [getPointerAngle, size]
  );

  const handlePointerUp = useCallback(() => {
    const s = stateRef.current;
    s.isDragging = false;
    s.targetSpeed = s.isHovering ? HOVER_SPEED : IDLE_SPEED;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative shrink-0 cursor-pointer select-none"
      style={{ width: size, height: size }}
    >
      <div
        className="overflow-hidden rounded-full border border-border"
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: size, height: size }}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 0 30px rgba(168, 85, 247, 0.05), 0 0 60px rgba(168, 85, 247, 0.03), inset 0 0 20px rgba(255, 255, 255, 0.15)",
        }}
      />
    </motion.div>
  );
}
