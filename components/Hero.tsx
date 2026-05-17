import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1e1b4b 100%)" }}
    >
      {/* Radial glow behind content */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "700px",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.11) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32 container-narrow text-center">
        <span className="hero-badge mb-8 anim-scale-in">
          ✦ Web Design &amp; Development Studio
        </span>

        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-tight mb-6 anim-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-white">See your brand new website </span>
          <span
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            before spending a single cent.
          </span>
        </h1>

        <p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-loose anim-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          We design a fully custom mockup for free — built to your exact vision.
          You decide if you want to go further. Zero pressure, zero obligation.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center anim-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/get-started" className="btn-primary hero-btn-primary text-base px-9 py-4">
            Get My Free Mockup →
          </Link>
          <Link
            href="/portfolio"
            className="hero-btn-secondary text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4"
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
