import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    number: "01",
    feature: "More Pages = More Google Real Estate",
    title: "Every page is another chance to be found on Google",
    body: "Google doesn't just rank websites — it ranks individual pages. A single page website gives Google one page to index. A 5 page website gives Google five. That means five times the opportunities to show up when potential customers search for what you offer. A dedicated Services page can rank for 'plumber in Cape Town'. An About page can rank for 'trusted electrician Durbanville'. Each page works independently to pull in traffic you would otherwise miss entirely with a single page site.",
  },
  {
    number: "02",
    feature: "Credibility That Converts",
    title: "Customers trust businesses that look established",
    body: "A single page site gets you online. A multi-page site makes you look like a real, established business. When a potential customer lands on your site and sees dedicated pages for your services, your story, and your contact details — they stay longer, trust you more, and are far more likely to pick up the phone. First impressions are everything, and five pages gives you five chances to make one.",
  },
  {
    number: "03",
    feature: "Contact Form + WhatsApp",
    title: "Capture leads even while you sleep",
    body: "The Starter package has a WhatsApp button — which is great for immediate contact. The Business package adds a contact form too. This means customers who aren't ready to chat right now can leave their details and you follow up at your convenience. You wake up to leads in your inbox without lifting a finger. Two contact options means no customer slips through the cracks.",
  },
  {
    number: "04",
    feature: "Google Maps Integration",
    title: "Local searches are where small businesses win",
    body: "When someone searches 'hair salon near me' or 'electrician Cape Town', Google prioritises businesses with a strong local presence. An embedded Google Map on your website signals to Google that you are a real, located business — which directly boosts your visibility in those high-intent local searches. These are the searches where customers are ready to buy. Being found here is worth more than any social media post.",
  },
  {
    number: "05",
    feature: "Social Media Links",
    title: "Turn website visitors into long-term followers",
    body: "Most visitors won't contact you on their first visit. But if they follow your Instagram or Facebook, they stay in your world — seeing your work, your updates, and your personality over time. By the time they need your service, you're the first name they think of. Social media links turn a one-time visit into an ongoing relationship.",
  },
  {
    number: "06",
    feature: "2 Rounds of Revisions",
    title: "More pages means more to perfect — and we give you the time to do it",
    body: "With 5 pages there is naturally more to review and refine. Two rounds of revisions means you can go through the full site twice, requesting tweaks and adjustments until every page feels exactly right. We don't rush you — we get it right.",
  },
  {
    number: "07",
    feature: "The Real Question",
    title: "Is R1,050 worth 5x the Google visibility?",
    body: "The difference between the Starter and Business package is R1,050. For that R1,050 you get four additional pages, a contact form, Google Maps, social media integration, and five times the SEO surface area. If your website brings in even one additional customer because of those extra pages, it has already paid for the upgrade — and then some. For any business that relies on local customers finding them online, the Business package is not an upgrade. It is the smarter starting point.",
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
            Why the Business package is{" "}
            <span className="gradient-text">worth the upgrade</span>
          </h1>
          <p
            className="text-lg max-w-2xl anim-fade-up"
            style={{ color: "#94a3b8", animationDelay: "200ms" }}
          >
            You have a single page site — or you&apos;re considering one. Here&apos;s why upgrading
            to 5 pages could be the single best decision you make for your business online.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">

          {/* Comparison callout */}
          <div
            className="rounded-2xl overflow-hidden mb-8 anim-fade-up"
            style={{ border: "2px solid #7c3aed", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          >
            <div
              className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white" }}
            >
              Side by Side
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#e4e4e7] bg-white">
              <div className="p-6">
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#9ca3af" }}>
                  Starter — R1,399
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "1 page" },
                    { label: "1 Google entry point" },
                    { label: "WhatsApp only" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-2.5 text-sm" style={{ color: "#6b7280" }}>
                      <span
                        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "#f3f4f6", color: "#9ca3af" }}
                      >
                        ·
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6" style={{ background: "rgba(124,58,237,0.04)" }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#7c3aed" }}>
                  Business — R2,449
                </p>
                <ul className="space-y-3">
                  {[
                    "5 pages",
                    "5 Google entry points",
                    "Form + WhatsApp + Maps",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: "#111827" }}>
                      <svg className="shrink-0 w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section cards */}
          <div className="grid gap-5">
            {sections.map((section, i) => (
              <div
                key={section.number}
                className="rounded-2xl bg-white p-7 anim-fade-up"
                style={{
                  border: "1px solid #e4e4e7",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  animationDelay: `${(i + 1) * 80}ms`,
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

          {/* CTA block */}
          <div
            className="mt-12 rounded-2xl p-8 text-center anim-fade-up"
            style={{
              background: "linear-gradient(135deg, #1e1b4b, #2e1065)",
              animationDelay: "720ms",
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>
              Launch Special — First 5 Clients Only
            </p>
            <p className="text-white text-lg font-semibold mb-6 max-w-xl mx-auto">
              Ready to give your business the online presence it deserves? Lock in the launch price before it&apos;s gone.
            </p>
            <a href="/get-started?plan=Business" className="btn-primary text-sm px-8 py-3.5">
              Upgrade to Business →
            </a>
            <p className="mt-4">
              <a
                href="/get-started?plan=Starter"
                className="text-sm transition-colors duration-150"
                style={{ color: "#94a3b8" }}
              >
                Start with Starter instead
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
