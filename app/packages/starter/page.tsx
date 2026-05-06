import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    number: "01",
    feature: "Single Page Website",
    title: "Everything your customer needs, on one page",
    body: "A single page website is not a limitation — it is a focused, conversion-optimised experience. Your business name, what you do, how to contact you, and why to choose you — all in one clean scroll. Studies show that visitors make a decision within 7 seconds of landing on a page. One well-designed page does that job better than five cluttered ones.",
  },
  {
    number: "02",
    feature: "Mobile Responsive",
    title: "Over 70% of your customers will find you on a phone",
    body: "In South Africa, most people browse the internet on their smartphones — not a laptop. A mobile responsive website means your site looks perfect and works flawlessly on any screen size. Without this, your site breaks on mobile and customers leave immediately. Every Clearsite Studios website is built mobile-first, every time.",
  },
  {
    number: "03",
    feature: "WhatsApp Contact Button",
    title: "The most popular way South Africans make contact",
    body: "A WhatsApp button on your website means a customer can reach you in one tap — no forms to fill in, no email to compose. WhatsApp is the preferred communication channel for the majority of South African consumers. This single feature can be the difference between a visitor and a paying customer.",
  },
  {
    number: "04",
    feature: "Basic SEO Setup",
    title: "Help Google find your business",
    body: "SEO stands for Search Engine Optimisation — it is what helps your website show up when someone Googles services like yours. Without it, your website is essentially invisible. We set up your page titles, descriptions, and technical foundations so Google can read and rank your site correctly from day one.",
  },
  {
    number: "05",
    feature: "1 Round of Revisions",
    title: "Your website, your way",
    body: "Once we show you the mockup, you have one round of revisions to request changes — colours, wording, layout adjustments. We make sure you are happy with the result before anything goes live. No guesswork, no surprises.",
  },
  {
    number: "06",
    feature: "The Value Comparison",
    title: "What does R1,399 actually mean?",
    body: "The average South African web design agency charges R5,000+ for a single page website — and that is before revisions or mobile optimisation. At R1,399 you are getting a fully custom, professionally built, mobile-ready website at less than a third of the market rate. And because this is a launch special for our first 5 clients, this price will not be available again once those spots are filled.",
  },
];

export default function StarterPackagePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow">
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors duration-150 text-slate-400 hover:text-white"
          >
            ← Back to Pricing
          </a>
          <div>
            <span
              className="badge mb-6 anim-scale-in"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            >
              Starter Package — R1,399
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            What you get with the Starter package —{" "}
            <span className="gradient-text">and why it&apos;s worth every cent</span>
          </h1>
          <p
            className="text-lg max-w-2xl anim-fade-up"
            style={{ color: "#94a3b8", animationDelay: "200ms" }}
          >
            At R1,399 once-off, the Starter package is the fastest way to get your business online
            professionally. Here&apos;s exactly what that means for you.
          </p>
        </div>
      </section>

      {/* Sections */}
      <main className="flex-1 section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="grid gap-5">
            {sections.map((section, i) => (
              <div
                key={section.number}
                className="rounded-2xl bg-white p-7 anim-fade-up"
                style={{
                  border: "1px solid #e4e4e7",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#7c3aed" }}
                  >
                    {section.number}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                      color: "#6d28d9",
                    }}
                  >
                    {section.feature}
                  </span>
                </div>
                <h2
                  className="text-xl sm:text-2xl font-extrabold mb-3"
                  style={{ color: "#111827" }}
                >
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#4b5563" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-12 rounded-2xl p-8 text-center anim-fade-up"
            style={{
              background: "linear-gradient(135deg, #1e1b4b, #2e1065)",
              animationDelay: "520ms",
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              Launch Special — First 5 Clients Only
            </p>
            <p className="text-white text-lg font-semibold mb-6 max-w-xl mx-auto">
              Ready to get your business online? Claim this package before the launch price is gone.
            </p>
            <a href="/get-started?plan=Starter" className="btn-primary text-sm px-8 py-3.5">
              Claim This Package →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
