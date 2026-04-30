"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type RGB = readonly [number, number, number];

// ── Orb definitions ──────────────────────────────────────────────────────────
// r    – radius as a fraction of canvas width  (orbs cover ~40-60% CSS width
//         after the 2× CSS upscale + 70 px CSS blur spread)
// f1/f2 – two incommensurable oscillation frequencies (rad/ms) — Lissajous
//          paths so the motion never repeats exactly
// a    – peak alpha at orb centre
const ORBS: {
  bx: number; by: number; r: number;
  c: RGB;
  f1: number; f2: number; p1: number; p2: number;
  a: number;
}[] = [
  // ── Primary orbs — large, vivid, immediately visible ─────────────────────
  { bx:0.30, by:0.50, r:0.52, c:[124, 58, 237], f1:0.00093, f2:0.00057, p1:0.00, p2:1.30, a:0.85 }, // #7c3aed 85 %
  { bx:0.70, by:0.38, r:0.47, c:[ 76, 29, 149], f1:0.00069, f2:0.00123, p1:1.10, p2:2.50, a:0.78 }, // #4c1d95 78 %
  { bx:0.52, by:0.68, r:0.45, c:[168, 85, 247], f1:0.00111, f2:0.00051, p1:2.20, p2:0.80, a:0.68 }, // #a855f7 68 %
  // ── Supporting depth orbs — darker purples anchor the composition ─────────
  { bx:0.12, by:0.28, r:0.42, c:[ 45, 27, 105], f1:0.00087, f2:0.00099, p1:3.30, p2:4.10, a:0.60 },
  { bx:0.88, by:0.72, r:0.44, c:[ 26,  5,  51], f1:0.00063, f2:0.00129, p1:4.40, p2:3.70, a:0.65 },
  { bx:0.55, by:0.18, r:0.43, c:[ 76, 29, 149], f1:0.00117, f2:0.00081, p1:0.70, p2:5.50, a:0.55 },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const t0 = performance.now();

    // Half-resolution render — gradients are soft so 2× CSS upscale is invisible.
    // Halves pixel-fill cost; pairs naturally with the 70 px CSS blur.
    function resize() {
      if (!canvas) return;
      canvas.width  = Math.ceil(canvas.offsetWidth  * 0.5);
      canvas.height = Math.ceil(canvas.offsetHeight * 0.5);
    }
    resize();
    window.addEventListener("resize", resize);

    function frame(now: number) {
      if (!canvas || !ctx) return;
      const t = now - t0;
      const W = canvas.width;
      const H = canvas.height;

      // Dark navy base — guarantees nothing bleeds to transparent
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(0, 0, W, H);

      for (const orb of ORBS) {
        // Lissajous path: two sine waves per axis at incommensurable frequencies
        // → the orb centre wanders continuously without ever repeating its exact route
        const nx = orb.bx + 0.33 * Math.sin(orb.f1 * t + orb.p1)
                          + 0.14 * Math.sin(orb.f2 * t + orb.p2);
        const ny = orb.by + 0.33 * Math.cos(orb.f1 * t + orb.p1)
                          + 0.14 * Math.cos(orb.f2 * t + orb.p2);

        const cx     = nx * W;
        const cy     = ny * H;
        const radius = orb.r * W;          // proportional to width, not diagonal

        const [r, g, b] = orb.c;
        const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g2.addColorStop(0,    `rgba(${r},${g},${b},${orb.a})`);
        g2.addColorStop(0.45, `rgba(${r},${g},${b},${+(orb.a * 0.45).toFixed(3)})`);
        g2.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#1e1b4b" }}
    >
      {/* ── Fluid mesh canvas ─────────────────────────────────────────────
          CSS blur(70px) is applied by the GPU compositor — zero JS cost.
          It softens orb edges and blends overlapping colours into each other.
          The `filter` property automatically promotes this to its own GPU layer.
      ──────────────────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: "blur(70px)" }}
        aria-hidden="true"
      />

      {/* 20 % dark scrim — ensures white and light-purple text stays readable
          over even the brightest orb positions                               */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(10,6,30,0.20)" }}
      />

      {/* ── Content — z-10 keeps it above canvas + scrim ───────────────── */}
      <div className="relative z-10 section container-narrow text-center">
        <span className="badge mb-8 px-4 py-1.5 text-xs anim-scale-in">
          ✦ Web Design &amp; Development Studio
        </span>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 anim-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-white">See your brand new website </span>
          <span style={{ color: "#c4b5fd" }}>
            before spending a single cent.
          </span>
        </h1>

        <p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed anim-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          We design a fully custom mockup for free — built to your exact vision.
          You decide if you want to go further. Zero pressure, zero obligation.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center anim-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/get-started" className="btn-primary text-base px-9 py-4">
            Get My Free Mockup →
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors underline underline-offset-4"
          >
            View Our Work →
          </Link>
        </div>

        <div
          className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium anim-fade-up"
          style={{
            backgroundColor: "rgba(124,58,237,0.15)",
            color: "#c4b5fd",
            border: "1px solid rgba(124,58,237,0.3)",
            animationDelay: "400ms",
          }}
        >
          <span>✦</span>
          <span>100% custom design — no templates, no shortcuts</span>
        </div>
      </div>
    </section>
  );
}
