import { MATHLY_URL } from "@/lib/sale";

export default function About() {
  return (
    <section id="about" className="section bg-[var(--color-bg)]">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="anim-fade-left">
            <span className="badge mb-5">The Founder</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{ color: "#111827" }}>
              One person behind this. <span style={{ color: "#6366f1" }}>That person is me.</span>
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              I&apos;m Divan Bosman. I started ClearSite Studios to build clean, fast websites for
              South African small businesses without the agency price tag, and I have built every
              site here myself — design, code, deployment and handover.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              I&apos;m now closing the studio to focus on{" "}
              {MATHLY_URL ? (
                <a
                  href={MATHLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                  style={{ color: "#7c3aed" }}
                >
                  Mathly
                </a>
              ) : (
                <span className="font-semibold" style={{ color: "#7c3aed" }}>
                  Mathly
                </span>
              )}
              , a maths education platform I&apos;m building as my next venture. It&apos;s not a
              ClearSite product or service — it&apos;s simply where my time is going next. It is
              also the most direct evidence I can offer of what I&apos;m able to build.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "#6b7280" }}>
              Until the sale closes, I&apos;m still taking on builds and finishing them properly.
              Every site is handed over complete, in your name, with nothing left depending on me.
            </p>

            <div>
              <a href="/pricing" className="btn-primary">
                See the closing prices →
              </a>
            </div>
          </div>

          {/* Visual cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "🙋",
                heading: "You deal with me",
                body: "No account manager, no queue. One person, start to finish.",
              },
              {
                icon: "🔑",
                heading: "Handed over in full",
                body: "Code, hosting account and credentials. Yours outright on completion.",
              },
              {
                icon: "📱",
                heading: "Mobile first",
                body: "Most of your visitors are on a phone. That's where I start.",
              },
              {
                icon: "🧮",
                heading: "Building Mathly next",
                body: "My next venture as founder — proof of what I can put together.",
              },
            ].map((item, i) => (
              <div
                key={item.heading}
                className="rounded-2xl p-6 glass-card-light glass-card-hover anim-fade-right"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold mb-1" style={{ color: "#111827" }}>
                  {item.heading}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
