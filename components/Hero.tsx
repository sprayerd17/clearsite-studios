import Link from "next/link";

const PARTICLES: {
  left: string;
  bottom: string;
  size: number;
  delay: string;
  dur: string;
}[] = [
  { left: "8%",  bottom: "15%", size: 3, delay: "0s",   dur: "9s"  },
  { left: "18%", bottom: "45%", size: 4, delay: "2.5s", dur: "11s" },
  { left: "30%", bottom: "28%", size: 3, delay: "5s",   dur: "8s"  },
  { left: "45%", bottom: "55%", size: 5, delay: "1s",   dur: "10s" },
  { left: "58%", bottom: "35%", size: 3, delay: "3.5s", dur: "12s" },
  { left: "68%", bottom: "65%", size: 4, delay: "0.5s", dur: "9s"  },
  { left: "78%", bottom: "20%", size: 3, delay: "4s",   dur: "11s" },
  { left: "88%", bottom: "50%", size: 5, delay: "2s",   dur: "8s"  },
  { left: "38%", bottom: "75%", size: 3, delay: "6s",   dur: "10s" },
];

export default function Hero() {
  return (
    <>
      <style>{`
        /* ── Base background colour shift ─────────────────────────── */
        @keyframes hero-bg-shift {
          0%, 100% { background-color: #1e1b4b; }
          50%       { background-color: #2d1b69; }
        }
        .hero-animated-bg {
          animation: hero-bg-shift 6s ease-in-out infinite;
        }

        /* ── Wave scroll — RTL and LTR for opposing directions ────── */
        @keyframes wave-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes wave-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        /* Wave 1: front layer, 8 s, right-to-left */
        .hero-wave-1 { animation: wave-rtl 8s  linear infinite; }
        /* Wave 2: mid layer,   12 s, left-to-right (opposite) */
        .hero-wave-2 { animation: wave-ltr 12s linear infinite; }
        /* Wave 3: back layer,  6 s,  right-to-left */
        .hero-wave-3 { animation: wave-rtl 6s  linear infinite; }

        /* ── Particle drift upward with fade ──────────────────────── */
        @keyframes particle-float {
          0%   { opacity: 0;    transform: translateY(0); }
          15%  { opacity: 0.15; }
          85%  { opacity: 0.15; }
          100% { opacity: 0;    transform: translateY(-120px); }
        }
        .hero-particle {
          animation: particle-float var(--p-dur) ease-in-out var(--p-delay) infinite;
        }

        /* ── Respect reduced-motion — strip all decorative motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .hero-animated-bg              { animation: none !important; background-color: #1e1b4b; }
          .hero-wave-1,
          .hero-wave-2,
          .hero-wave-3                   { animation: none !important; }
          .hero-particle                 { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <section className="hero-animated-bg relative overflow-hidden text-white">
        {/* Glow blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Dot texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Floating particles — drift upward and fade */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full pointer-events-none"
            style={
              {
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                backgroundColor: "#7c3aed",
                "--p-dur": p.dur,
                "--p-delay": p.delay,
              } as React.CSSProperties
            }
          />
        ))}

        {/* SVG waves — bottom third of the hero */}
        {/*
          Each SVG is width="200%" so a single translateX(-50%) moves it
          exactly one viewport-width left, creating a seamless loop.
          Waves are ordered back-to-front in DOM so the front wave renders last.
        */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none overflow-hidden">
          {/* Wave 3 — back layer, fastest, darkest (#2d1b69 25%) */}
          <svg
            className="hero-wave-3 absolute bottom-0 left-0"
            width="200%"
            height="200"
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,80 C90,60 270,100 360,80 C450,60 630,100 720,80
                 C810,60 990,100 1080,80 C1170,60 1350,100 1440,80
                 C1530,60 1710,100 1800,80 C1890,60 2070,100 2160,80
                 C2250,60 2430,100 2520,80 C2610,60 2790,100 2880,80
                 L2880,200 L0,200 Z"
              fill="rgba(45,27,105,0.25)"
            />
          </svg>

          {/* Wave 2 — mid layer, slowest, medium purple (#4c1d95 15%) */}
          <svg
            className="hero-wave-2 absolute bottom-0 left-0"
            width="200%"
            height="200"
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,60 C90,35 270,85 360,60 C450,35 630,85 720,60
                 C810,35 990,85 1080,60 C1170,35 1350,85 1440,60
                 C1530,35 1710,85 1800,60 C1890,35 2070,85 2160,60
                 C2250,35 2430,85 2520,60 C2610,35 2790,85 2880,60
                 L2880,200 L0,200 Z"
              fill="rgba(76,29,149,0.15)"
            />
          </svg>

          {/* Wave 1 — front layer, 8 s, brightest (#7c3aed 20%) */}
          <svg
            className="hero-wave-1 absolute bottom-0 left-0"
            width="200%"
            height="200"
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,40 C90,10 270,70 360,40 C450,10 630,70 720,40
                 C810,10 990,70 1080,40 C1170,10 1350,70 1440,40
                 C1530,10 1710,70 1800,40 C1890,10 2070,70 2160,40
                 C2250,10 2430,70 2520,40 C2610,10 2790,70 2880,40
                 L2880,200 L0,200 Z"
              fill="rgba(124,58,237,0.20)"
            />
          </svg>
        </div>

        {/* Content — z-10 keeps it above all decorative layers */}
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
            We design a fully custom mockup for free — built to your exact
            vision. You decide if you want to go further. Zero pressure, zero
            obligation.
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
    </>
  );
}
