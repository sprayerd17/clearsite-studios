import Link from "next/link";

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes hero-bg-shift {
          0%, 100% { background-color: #1e1b4b; }
          50%       { background-color: #2d1b69; }
        }
        .hero-animated-bg {
          animation: hero-bg-shift 6s ease-in-out infinite;
        }
      `}</style>

      <section className="hero-animated-bg relative overflow-hidden text-white">
        {/* Glow blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Dot texture overlay — 7% opacity for subtle depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative section container-narrow text-center">
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
