import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1e1b4b 100%)" }}
    >
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
