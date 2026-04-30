"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ── Palette as RGB tuples ────────────────────────────────────────────────────
const P = {
  navy:    [30,  27,  75 ] as const,
  deep:    [45,  27,  105] as const,
  rich:    [76,  29,  149] as const,
  accent:  [124, 58,  237] as const,
  darkest: [26,  5,   51 ] as const,
};

// ── Mesh nodes ───────────────────────────────────────────────────────────────
// bx/by  – normalised base position (0–1)
// r      – gradient radius as a fraction of max(W,H)
// c      – colour RGB
// f1/f2  – two oscillation frequencies (rad/ms) per axis for Lissajous motion
// p1/p2  – phase offsets so nodes start at different positions
// a      – peak alpha; kept low so the dark base always shows through
const NODES = [
  { bx:0.15, by:0.30, r:0.80, c:P.navy,    f1:0.00031, f2:0.00019, p1:0.00, p2:1.30, a:0.32 },
  { bx:0.82, by:0.18, r:0.70, c:P.deep,    f1:0.00023, f2:0.00041, p1:1.10, p2:2.50, a:0.26 },
  { bx:0.50, by:0.62, r:0.90, c:P.rich,    f1:0.00037, f2:0.00017, p1:2.20, p2:0.80, a:0.28 },
  { bx:0.22, by:0.78, r:0.65, c:P.accent,  f1:0.00019, f2:0.00033, p1:3.30, p2:4.10, a:0.18 },
  { bx:0.88, by:0.72, r:0.75, c:P.darkest, f1:0.00029, f2:0.00043, p1:4.40, p2:3.70, a:0.30 },
  { bx:0.42, by:0.22, r:0.72, c:P.deep,    f1:0.00043, f2:0.00027, p1:0.70, p2:5.50, a:0.24 },
  { bx:0.68, by:0.48, r:0.82, c:P.rich,    f1:0.00017, f2:0.00039, p1:5.60, p2:2.00, a:0.26 },
  { bx:0.10, by:0.65, r:0.67, c:P.navy,    f1:0.00033, f2:0.00021, p1:2.90, p2:0.40, a:0.24 },
  { bx:0.60, by:0.35, r:0.78, c:P.darkest, f1:0.00025, f2:0.00047, p1:1.80, p2:4.90, a:0.28 },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Honour reduced-motion preference — fall back to static background
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const t0 = performance.now();

    // Render at half CSS resolution — gradients are inherently soft so
    // the 2× CSS upscale is invisible while halving pixel-fill work.
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
      const D = Math.max(W, H);

      // Paint darkest colour as the base so text contrast is always guaranteed
      ctx.fillStyle = "#1a0533";
      ctx.fillRect(0, 0, W, H);

      for (const n of NODES) {
        // Each axis is the sum of two sine waves at incommensurable frequencies
        // → Lissajous-style path that never exactly repeats
        const nx = n.bx + 0.30 * Math.sin(n.f1 * t + n.p1) + 0.12 * Math.sin(n.f2 * t + n.p2);
        const ny = n.by + 0.30 * Math.cos(n.f1 * t + n.p1) + 0.12 * Math.cos(n.f2 * t + n.p2);

        const cx = nx * W;
        const cy = ny * H;

        const [r, g, b] = n.c;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r * D);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${n.a})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${+(n.a * 0.35).toFixed(3)})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
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
    // Static background-color is the reduced-motion fallback and paint-before-JS colour
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#1e1b4b" }}
    >
      {/* Fluid mesh canvas — GPU compositing layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />

      {/* Content sits above canvas via z-10 */}
      <div className="relative z-10 section container-narrow text-center">
        {/* Pill badge */}
        <span className="badge mb-8 px-4 py-1.5 text-xs anim-scale-in">
          ✦ Web Design &amp; Development Studio
        </span>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 anim-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-white">See your brand new website </span>
          <span style={{ color: "#a78bfa" }}>
            before spending a single cent.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed anim-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          We design a fully custom mockup for free — built to your exact vision.
          You decide if you want to go further. Zero pressure, zero obligation.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center anim-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/get-started" className="btn-primary text-base px-9 py-4">
            Get My Free Mockup →
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors underline underline-offset-4"
          >
            View Our Work →
          </Link>
        </div>

        {/* Trust badge */}
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
