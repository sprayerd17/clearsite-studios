const steps = [
  {
    number: "01",
    title: "WhatsApp me",
    description:
      "Message me directly and tell me about your business, what you need, and which package looks right. You're talking to me, not a sales team.",
  },
  {
    number: "02",
    title: "We agree the scope and price",
    description:
      "I confirm what's included and what it costs before anything starts, then invoice you for the 50% deposit that secures your spot. The balance is invoiced on completion.",
  },
  {
    number: "03",
    title: "I build it",
    description:
      "Between 3 and 21 days depending on the package, counted from when you've sent me your content. You see it and get your revisions before it goes live.",
  },
  {
    number: "04",
    title: "Launch and handover",
    description:
      "Your site goes live on a free hosting tier under an account in your name, and I hand you the credentials. It's yours outright — no monthly fee and nothing left depending on me.",
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
            className="text-3xl sm:text-4xl font-extrabold mb-4 anim-fade-up"
            style={{ color: "#111827", animationDelay: "100ms" }}
          >
            From message to handover.
          </h2>
          <p
            className="max-w-xl mx-auto anim-fade-up"
            style={{ color: "#6b7280", animationDelay: "180ms" }}
          >
            Four steps, no forms, no drawn-out process. Here&apos;s exactly what happens.
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
                <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-10"}`}>
                  <div className="glass-card-light glass-card-hover rounded-2xl px-5 pb-5 pt-[18px]">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
