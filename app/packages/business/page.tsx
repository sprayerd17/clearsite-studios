import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    number: "01",
    feature: "Up to 5 Pages",
    title: "A complete online presence, not just a placeholder",
    body: "Five pages means your customers can learn everything they need to know before picking up the phone — Home, About, Services, Gallery, and Contact. Each page serves a purpose and moves your visitor closer to becoming a paying customer. More pages means more opportunities for Google to find and rank your business.",
  },
  {
    number: "02",
    feature: "Contact Form + WhatsApp",
    title: "Two ways to reach you — because customers have preferences",
    body: "Some customers prefer filling in a form. Others want to WhatsApp immediately. By offering both you remove every barrier between a visitor and a conversation. A contact form also captures enquiries while you sleep — you wake up to leads in your inbox without lifting a finger.",
  },
  {
    number: "03",
    feature: "Google Maps Integration",
    title: "Show customers exactly where you are",
    body: "An embedded Google Map on your website does two things — it tells customers where to find you, and it signals to Google that you are a legitimate local business. This directly improves your visibility in local search results when people search for services near them. For any business with a physical location or service area this is not optional — it is essential.",
  },
  {
    number: "04",
    feature: "Basic SEO Setup",
    title: "Get found before your competitors",
    body: "SEO is what determines whether your business shows up on page one or page five of Google. We set up your metadata, page titles, descriptions, and technical foundations correctly from the start. Most small business websites in South Africa have no SEO setup at all — this alone puts you ahead of the majority of your local competition.",
  },
  {
    number: "05",
    feature: "Social Media Links",
    title: "Connect your online presence",
    body: "Your website and social media accounts should work together. By linking your Instagram, Facebook, and WhatsApp from your website, visitors can follow you, see your latest work, and stay connected with your brand long after they leave your site. It also builds credibility — a business with an active social presence looks established and trustworthy.",
  },
  {
    number: "06",
    feature: "2 Rounds of Revisions",
    title: "We get it right — together",
    body: "Two rounds of revisions means you have two opportunities to review the design and request changes before anything goes live. We work collaboratively to make sure the final result truly represents your business. No rushing, no shortcuts.",
  },
  {
    number: "07",
    feature: "The Value Comparison",
    title: "What does R2,449 actually mean?",
    body: "The South African market average for a 5 page website is R6,254 — and agency pricing starts at R15,000+. At R2,449 you are getting a fully custom, professionally built, SEO-optimised, mobile-ready 5 page website at less than half the market rate. This launch special price is only available for our first 5 clients — once those spots are filled, the price returns to R3,499.",
  },
];

export default function BusinessPackagePage() {
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
              Business Package — R2,449
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            What you get with the Business package —{" "}
            <span className="gradient-text">and why it&apos;s worth every cent</span>
          </h1>
          <p
            className="text-lg max-w-2xl anim-fade-up"
            style={{ color: "#94a3b8", animationDelay: "200ms" }}
          >
            At R2,449 once-off, the Business package gives growing businesses everything they need
            to compete online professionally.
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
              animationDelay: "600ms",
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              Launch Special — First 5 Clients Only
            </p>
            <p className="text-white text-lg font-semibold mb-6 max-w-xl mx-auto">
              Ready to grow your business online? Claim this package before the launch price is gone.
            </p>
            <a href="/get-started?plan=Business" className="btn-primary text-sm px-8 py-3.5">
              Claim This Package →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
