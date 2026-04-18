const features = [
  {
    icon: "◈",
    title: "Minimal by Default",
    description:
      "Every pixel earns its place. We strip out the noise so your content speaks first.",
  },
  {
    icon: "⚡",
    title: "Performance First",
    description:
      "Built on Next.js with static generation and edge delivery. Fast everywhere, always.",
  },
  {
    icon: "🔒",
    title: "Type-Safe Stack",
    description:
      "TypeScript end to end. Catch bugs at build time, ship with confidence.",
  },
  {
    icon: "♿",
    title: "Accessible Design",
    description:
      "WCAG-compliant components out of the box. Inclusive experiences, not afterthoughts.",
  },
  {
    icon: "🎨",
    title: "Tailored to Your Brand",
    description:
      "A tight design-token system keeps your brand consistent across every breakpoint.",
  },
  {
    icon: "🔓",
    title: "Zero Lock-in",
    description:
      "Clean separation of concerns. Your content, your data, your infrastructure.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section bg-white">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="badge mb-4 anim-fade-up">Why ClearSite Studios</span>
          <h2
            className="text-4xl font-extrabold text-[var(--color-text)] mb-4 anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Built different, on purpose.
          </h2>
          <p
            className="text-[var(--color-muted)] max-w-xl mx-auto anim-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            A foundation that gets out of the way so you can focus on what matters — running your business.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="card group anim-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-base font-bold text-[var(--color-text)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
