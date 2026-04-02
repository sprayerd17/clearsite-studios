export default function About() {
  return (
    <section id="about" className="section bg-[var(--color-bg)]">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <span className="badge mb-5">About Us</span>
            <h2 className="text-4xl font-extrabold mb-6" style={{ color: "#111827" }}>
              We make websites that work for <span style={{ color: "#6366f1" }}>your business.</span>
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              At ClearSite Studios, we build and elevate websites for businesses of every size — from
              solo founders launching their first venture to established companies ready for a digital
              refresh.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "#6b7280" }}>
              A strong online presence isn&apos;t a luxury anymore — it&apos;s often the first (and only)
              impression a potential customer gets. We make sure that impression counts: clean design
              that builds trust, performance that keeps visitors from bouncing, and messaging that
              turns browsers into buyers.
            </p>
            <a href="/pricing" className="btn-primary">Work with us →</a>
          </div>

          {/* Visual cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎯", heading: "Conversion focused", body: "Every element is designed with one goal — turning visitors into customers." },
              { icon: "⚡", heading: "Built for speed", body: "Fast sites rank better, retain more visitors, and earn more trust." },
              { icon: "📱", heading: "Mobile first", body: "Over half your visitors are on mobile. We design for them first." },
              { icon: "🤝", heading: "Always responsive", body: "Questions? Changes? We respond fast and keep you in the loop." },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-2xl p-5 border bg-[var(--color-surface)] hover:shadow-md transition-shadow duration-200" style={{ borderColor: "var(--color-border)" }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{item.heading}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
