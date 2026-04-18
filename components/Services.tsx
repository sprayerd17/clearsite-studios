const services = [
  {
    icon: "🚀",
    title: "New Website",
    subtitle: "Launch with confidence.",
    description:
      "Starting from scratch? We'll design and build a fully custom website that reflects your brand, speaks to your audience, and is ready to grow with your business from day one.",
    points: ["Custom design tailored to your brand", "Mobile-first & fully responsive", "Fast load times, built for SEO", "Ready to launch in days, not months"],
    cta: "Start a project",
    href: "/pricing",
    highlight: false,
  },
  {
    icon: "✨",
    title: "Redesign & Enhance",
    subtitle: "Transform what you have.",
    description:
      "Got a site that's outdated, slow, or just not converting? We'll take what you have and turn it into something you're proud to share — sharper, faster, and built to perform.",
    points: ["Full visual overhaul", "Speed & performance optimisation", "Improved user experience", "Retain your existing content & SEO"],
    cta: "Refresh my site",
    href: "/pricing",
    highlight: true,
  },
  {
    icon: "🛒",
    title: "E-Commerce Store",
    subtitle: "Sell more, stress less.",
    description:
      "We build online stores that make buying effortless for your customers and managing orders simple for you — from single products to full catalogues.",
    points: ["Product listings & smart filters", "Secure checkout & payments", "Inventory & order management", "Promotions, discounts & upsells"],
    cta: "Build my store",
    href: "/pricing",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-[var(--color-bg)]">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="badge mb-4 anim-fade-up">What We Do</span>
          <h2
            className="text-4xl font-extrabold mb-4 anim-fade-up"
            style={{ color: "#111827", animationDelay: "100ms" }}
          >
            The right solution for your business.
          </h2>
          <p
            className="max-w-xl mx-auto anim-fade-up"
            style={{ color: "#6b7280", animationDelay: "180ms" }}
          >
            Whether you&apos;re starting fresh, levelling up, or ready to sell online —
            we have a service built for exactly where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl anim-fade-up ${
                s.highlight
                  ? "bg-[#1e1b4b] text-white border-transparent"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {s.highlight && (
                <span className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
                  Most Popular
                </span>
              )}
              <div className="text-3xl mb-5">{s.icon}</div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: s.highlight ? "#818cf8" : "#6366f1" }}
              >
                {s.subtitle}
              </div>
              <h3
                className="text-xl font-extrabold mb-3"
                style={{ color: s.highlight ? "#ffffff" : "#111827" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: s.highlight ? "#94a3b8" : "#6b7280" }}
              >
                {s.description}
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm" style={{ color: s.highlight ? "#cbd5e1" : "#374151" }}>
                    <span className="mt-0.5 text-indigo-400 flex-shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={s.href}
                className={`inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  s.highlight
                    ? "btn-primary"
                    : "border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
                }`}
              >
                {s.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
