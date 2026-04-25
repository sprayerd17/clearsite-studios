import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const QuoteForm = dynamic(() => import("@/components/QuoteForm"));

const packages = [
  {
    name: "STARTER",
    originalPrice: "R1,999",
    salePrice: "R1,399",
    note: "once-off",
    delivery: "3 days",
    popular: false,
    features: [
      "Single page website",
      "Mobile responsive",
      "WhatsApp contact button",
      "Basic SEO setup",
      "1 round of revisions",
    ],
  },
  {
    name: "BUSINESS",
    originalPrice: "R3,499",
    salePrice: "R2,449",
    note: "once-off",
    delivery: "7 days",
    popular: false,
    features: [
      "Up to 5 pages",
      "Contact form + WhatsApp",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media links",
      "2 rounds of revisions",
    ],
  },
  {
    name: "PROFESSIONAL",
    originalPrice: "R5,499",
    salePrice: "R3,849",
    note: "once-off",
    delivery: "14 days",
    popular: true,
    features: [
      "Up to 10 pages",
      "Everything in Business",
      "Blog or news section",
      "Google Analytics setup",
      "Speed optimised",
      "3 rounds of revisions",
    ],
  },
  {
    name: "E-COMMERCE",
    originalPrice: "R6,499",
    salePrice: "R4,549",
    note: "once-off",
    delivery: "21 days",
    popular: false,
    features: [
      "Full online store",
      "Product catalogue",
      "PayFast integration",
      "Order management",
      "Everything in Professional",
    ],
  },
];

const compareRows = [
  { pkg: "Starter (1 page)", clearsite: "R1,399", market: "R3,765", agency: "R5,000+" },
  { pkg: "Business (5 pages)", clearsite: "R2,449", market: "R6,254", agency: "R15,000+" },
  { pkg: "Professional (10 pages)", clearsite: "R3,849", market: "R14,780", agency: "R40,000+" },
  { pkg: "E-Commerce", clearsite: "R4,549", market: "R27,980+", agency: "R40,000+" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Launch Sale Banner */}
      <div className="w-full py-3 px-4 text-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
        🚀 Launch Sale — 30% off for our first 5 clients. Lock in your rate before it&apos;s gone.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span className="badge mb-6 anim-scale-in" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Transparent Pricing
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Simple, honest pricing.<br />
            <span className="gradient-text">No surprises.</span>
          </h1>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Choose the package that fits your business. Every build starts with a free mockup
            — no commitment required until you love what you see.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 anim-fade-up" style={{ color: "#111827" }}>
              Choose Your Package
            </h2>
            <p className="text-base anim-fade-up" style={{ color: "#6b7280", animationDelay: "100ms" }}>
              All packages are once-off payments. Hosting available from R500/month.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up ${
                  pkg.popular ? "shadow-lg" : "shadow-sm border"
                }`}
                style={{
                  animationDelay: `${i * 80}ms`,
                  borderColor: pkg.popular ? undefined : "#e4e4e7",
                  border: pkg.popular ? "2px solid #7c3aed" : undefined,
                }}
              >
                {/* Sale badge */}
                <div
                  className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                >
                  🎉 Launch Special — 30% OFF
                </div>

                {pkg.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-widest text-white whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-5">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: pkg.popular ? "#7c3aed" : "#9ca3af" }}
                  >
                    {pkg.name}
                  </p>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-lg line-through" style={{ color: "#9ca3af" }}>
                      {pkg.originalPrice}
                    </span>
                    <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>
                      {pkg.salePrice}
                    </span>
                    <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>{pkg.note}</span>
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "#7c3aed" }}>
                    Only available for the first 5 clients
                  </p>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    Delivered in <span className="font-semibold" style={{ color: "#374151" }}>{pkg.delivery}</span>
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                      <svg
                        className="mt-0.5 shrink-0 w-4 h-4"
                        style={{ color: "#7c3aed" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote-form"
                  className={pkg.popular ? "btn-primary text-center" : "btn-outline text-center"}
                >
                  Get started →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Retainer */}
      <section className="section" style={{ backgroundColor: "#1e1b4b" }}>
        <div className="container-narrow">
          <div
            className="rounded-2xl p-8 md:p-10 anim-fade-up"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a78bfa" }}>
                  Ongoing Support
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Monthly Retainer — from R500/month
                </h2>
                <p className="text-base mb-6" style={{ color: "#94a3b8" }}>
                  Keep your website maintained, updated, and running smoothly every month.
                </p>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    "Hosting management",
                    "Content updates (up to 2/month)",
                    "Security monitoring",
                    "Priority support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#cbd5e1" }}>
                      <svg
                        className="shrink-0 w-4 h-4"
                        style={{ color: "#a78bfa" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <a href="#quote-form" className="btn-primary px-8 py-4 text-base">
                  Add to my package →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 anim-fade-up" style={{ color: "#111827" }}>
              How We Compare
            </h2>
            <p className="text-base anim-fade-up" style={{ color: "#6b7280", animationDelay: "100ms" }}>
              Professional-quality websites at a fraction of the typical cost.
            </p>
          </div>

          <div className="overflow-x-auto anim-fade-up" style={{ animationDelay: "200ms" }}>
            <table className="w-full min-w-[560px] rounded-2xl overflow-hidden border-separate border-spacing-0" style={{ border: "1px solid #e4e4e7" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <th className="text-left px-5 py-4 text-sm font-bold text-white" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    Package
                  </th>
                  <th className="px-5 py-4 text-sm font-bold text-white text-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    ClearSite Studios
                  </th>
                  <th className="px-5 py-4 text-sm font-bold text-center" style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    SA Market Average
                  </th>
                  <th className="px-5 py-4 text-sm font-bold text-center" style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    Agency Pricing
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.pkg}
                    style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}
                  >
                    <td className="px-5 py-4 text-sm font-semibold" style={{ color: "#374151", borderBottom: i < compareRows.length - 1 ? "1px solid #e4e4e7" : undefined }}>
                      {row.pkg}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-center" style={{ color: "#7c3aed", borderBottom: i < compareRows.length - 1 ? "1px solid #e4e4e7" : undefined }}>
                      {row.clearsite}
                    </td>
                    <td className="px-5 py-4 text-sm text-center" style={{ color: "#6b7280", borderBottom: i < compareRows.length - 1 ? "1px solid #e4e4e7" : undefined }}>
                      {row.market}
                    </td>
                    <td className="px-5 py-4 text-sm text-center" style={{ color: "#6b7280", borderBottom: i < compareRows.length - 1 ? "1px solid #e4e4e7" : undefined }}>
                      {row.agency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-center mt-5 anim-fade-up" style={{ color: "#9ca3af", animationDelay: "300ms" }}>
            All prices exclude domain registration if required. Free mockup available before any commitment.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 anim-fade-up" style={{ color: "#111827" }}>
                Not sure which package suits you?
              </h2>
              <p className="text-base anim-fade-up" style={{ color: "#6b7280", animationDelay: "100ms" }}>
                Fill in the form and we&apos;ll recommend the best fit.
              </p>
            </div>

            {/* Promise block */}
            <div
              className="rounded-2xl p-7 mb-8 text-center anim-fade-up"
              style={{ backgroundColor: "#ede9fe", border: "1px solid #ddd6fe", animationDelay: "150ms" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#7c3aed" }}>Our Promise to You</p>
              <p className="text-base leading-relaxed font-medium" style={{ color: "#3b0764" }}>
                We start by creating a free visual mockup of your website so you can see the look and feel before making any decisions. If you love what you see and want to move forward, we&apos;ll discuss a payment plan that works for you — a deposit to begin the build, and the remainder once your site is live and hosting begins. No mockup cost, no surprises.
              </p>
            </div>

            {/* Form card */}
            <div
              className="rounded-2xl border bg-white p-8 md:p-10 shadow-sm mb-10 anim-fade-up"
              style={{ borderColor: "#e4e4e7", animationDelay: "200ms" }}
            >
              <h3 className="text-2xl font-extrabold mb-1" style={{ color: "#111827" }}>
                Tell Us What You Need
              </h3>
              <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
                Not sure which package suits you? Fill in the form and we&apos;ll help you find the best fit — no obligation.
              </p>
              <QuoteForm />
            </div>

            {/* Reassurance strip */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "✋", heading: "No obligation quote", body: "Getting a quote costs nothing. Take your time deciding." },
                { icon: "📬", heading: "Response within 1 business day", body: "You won't be left waiting — I reply promptly, every time." },
                { icon: "💬", heading: "No tech jargon", body: "Just a plain, honest conversation about what you need." },
              ].map((item, i) => (
                <div
                  key={item.heading}
                  className="rounded-2xl p-5 border text-center anim-fade-up"
                  style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa", animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{item.heading}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
