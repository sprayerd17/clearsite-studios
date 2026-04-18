const steps = [
  {
    number: "01",
    title: "Tell us about your business",
    description:
      "Send us an email with a bit about your business, your goals, and what you're looking for. No lengthy forms — just a conversation.",
  },
  {
    number: "02",
    title: "We design & build",
    description:
      "We get to work on a custom design tailored to your brand. You'll see progress along the way and have the chance to give feedback before anything is finalised.",
  },
  {
    number: "03",
    title: "Launch & grow",
    description:
      "Once you're happy, we launch your site. We make sure everything is tested, fast, and ready to make a great impression — from day one.",
  },
];

const stepAnimClass = ["anim-fade-left", "anim-fade-up", "anim-fade-right"] as const;

export default function Process() {
  return (
    <section id="process" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container-narrow">
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

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-slate-200" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative text-center flex flex-col items-center ${stepAnimClass[i]}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Step circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold mb-6 border-4 border-white shadow-lg z-10"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#ffffff" }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#111827" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
