import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1e1b4b] text-white">
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative section container-narrow text-center">
        {/* Eyebrow */}
        <span className="badge mb-8 px-4 py-1.5 text-xs">
          ✦ Web Design &amp; Development Studio
        </span>

        {/* Brand name — the centrepiece */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none mb-6">
          <span className="text-white">ClearSite</span>
          <br />
          <span className="gradient-text">Studios</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          We build websites that work as hard as you do.
        </p>
        <p className="text-base text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
          From brand-new launches to full redesigns — clean, modern, high-performance websites
          for businesses of every size, built to impress and designed to convert.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/pricing" className="btn-primary text-base px-9 py-4">
            Start a Project
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors underline underline-offset-4"
          >
            View Our Work →
          </Link>
        </div>

        {/* Promise badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium" style={{ backgroundColor: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}>
          <span>✦</span>
          <span>We build first — you only pay if you love it. No upfront costs, no risk.</span>
        </div>

        {/* Quick trust strip */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "100%", label: "Custom designs" },
            { stat: "Fast", label: "Turnaround time" },
            { stat: "All sizes", label: "Businesses served" },
            { stat: "1 day", label: "Response time" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-extrabold text-white mb-1">{item.stat}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
