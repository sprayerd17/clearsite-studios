const steps = [
  {
    number: "01",
    title: "Tell us about your business",
    description:
      "Fill in a quick form telling us about your business, your goals, and the look you're going for. No lengthy back-and-forth — just the basics.",
  },
  {
    number: "02",
    title: "We design your free mockup",
    description:
      "We get to work on a fully custom mockup tailored to your brand — completely free. You'll see exactly what your website will look like before committing to anything.",
  },
  {
    number: "03",
    title: "Love it? We build it",
    description:
      "If you're happy with the mockup and want to go live, we start the build. A 50% deposit secures your spot, with the balance due on completion.",
  },
  {
    number: "04",
    title: "Launch & grow",
    description:
      "Once everything is tested, approved, and ready, your site goes live. Fast, professional, and built to make a great first impression from day one.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-4 anim-fade-up">How It Works</span>
          <h2
            className="text-4xl font-extrabold mb-4 anim-fade-up"
            style={{ color: "#111827", animationDelay: "100ms" }}
          >
            Simple, straightforward, stress-free.
          </h2>
          <p
            className="max-w-xl mx-auto anim-fade-up"
            style={{ color: "#6b7280", animationDelay: "180ms" }}
          >
            Getting a great website doesn&apos;t have to be complicated. Here&apos;s how we make it easy.
          </p>
        </div>

        {/* Timeline — max 700 px, centered */}
        <div className="mx-auto max-w-[700px]">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div
                key={step.number}
                className="flex gap-6 sm:gap-8 anim-fade-up"
                style={{ animationDelay: `${260 + i * 130}ms` }}
              >
                {/* ── Left column: numbered circle + vertical connector ── */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold border-4 border-white shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      color: "#ffffff",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Connector — flex-1 stretches to fill the right column height */}
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 mt-1"
                      style={{
                        background:
                          "linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.15))",
                      }}
                    />
                  )}
                </div>

                {/* ── Right column: title + description ───────────────── */}
                {/* pb-10 on non-last steps creates the gap the connector fills */}
                <div className={isLast ? "pt-[18px]" : "pt-[18px] pb-10"}>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "#111827" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
