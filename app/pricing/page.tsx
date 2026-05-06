import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Package = {
  name: string;
  planParam: string;
  originalPrice: string;
  salePrice: string;
  note: string;
  delivery: string;
  popular: boolean;
  learnMoreLink?: string;
  features: string[];
};

const packages: Package[] = [
  {
    name: "STARTER",
    planParam: "Starter",
    originalPrice: "R1,999",
    salePrice: "R1,399",
    note: "once-off",
    delivery: "3 days",
    popular: false,
    learnMoreLink: "/packages/starter",
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
    planParam: "Business",
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
    planParam: "Professional",
    originalPrice: "R5,499",
    salePrice: "R3,849",
    note: "once-off",
    delivery: "14 days",
    popular: false,
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
    planParam: "E-Commerce",
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
              All packages are once-off payments. Hosting from R200/month.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">

            {/* Starter card — hardcoded so the learn-more link is always present */}
            <div
              className="relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up shadow-lg"
              style={{ animationDelay: "0ms", border: "2px solid #7c3aed" }}
            >
              <div
                className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                🎉 Launch Special — 30% OFF
              </div>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7c3aed" }}>
                  STARTER
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-lg line-through" style={{ color: "#9ca3af" }}>R1,999</span>
                  <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>R1,399</span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>once-off</span>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#7c3aed" }}>
                  Only available for the first 5 clients
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Delivered in <span className="font-semibold" style={{ color: "#374151" }}>3 days</span>
                </p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Single page website", "Mobile responsive", "WhatsApp contact button", "Basic SEO setup", "1 round of revisions"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                    <svg className="mt-0.5 shrink-0 w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/packages/starter"
                className="text-sm text-gray-400 hover:text-purple-600 transition-colors mt-2 block text-center mb-4"
              >
                Why this package? →
              </a>
              <a href="/get-started?plan=Starter" className="btn-primary text-center">
                Get started →
              </a>
            </div>

            {/* Business card — hardcoded so the learn-more link is always present */}
            <div
              className="relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up shadow-lg"
              style={{ animationDelay: "80ms", border: "2px solid #7c3aed" }}
            >
              <div
                className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                🎉 Launch Special — 30% OFF
              </div>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7c3aed" }}>
                  BUSINESS
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-lg line-through" style={{ color: "#9ca3af" }}>R3,499</span>
                  <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>R2,449</span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>once-off</span>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#7c3aed" }}>
                  Only available for the first 5 clients
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Delivered in <span className="font-semibold" style={{ color: "#374151" }}>7 days</span>
                </p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Up to 5 pages", "Contact form + WhatsApp", "Google Maps integration", "Basic SEO setup", "Social media links", "2 rounds of revisions"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                    <svg className="mt-0.5 shrink-0 w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/packages/business"
                className="text-sm text-gray-400 hover:text-purple-600 transition-colors mt-2 block text-center mb-4"
              >
                Why this package? →
              </a>
              <a href="/get-started?plan=Business" className="btn-primary text-center">
                Get started →
              </a>
            </div>

            {/* Professional card — hardcoded so the learn-more link is always present */}
            <div
              className="relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up shadow-lg"
              style={{ animationDelay: "160ms", border: "2px solid #7c3aed" }}
            >
              <div
                className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                🎉 Launch Special — 30% OFF
              </div>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7c3aed" }}>
                  PROFESSIONAL
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-lg line-through" style={{ color: "#9ca3af" }}>R5,499</span>
                  <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>R3,849</span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>once-off</span>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#7c3aed" }}>
                  Only available for the first 5 clients
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Delivered in <span className="font-semibold" style={{ color: "#374151" }}>14 days</span>
                </p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Up to 10 pages", "Everything in Business", "Blog or news section", "Google Analytics setup", "Speed optimised", "3 rounds of revisions"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                    <svg className="mt-0.5 shrink-0 w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/packages/professional"
                className="text-sm text-gray-400 hover:text-purple-600 transition-colors mt-2 block text-center mb-4"
              >
                Why this package? →
              </a>
              <a href="/get-started?plan=Professional" className="btn-primary text-center">
                Get started →
              </a>
            </div>

            {/* E-Commerce card — hardcoded so the learn-more link is always present */}
            <div
              className="relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up shadow-lg"
              style={{ animationDelay: "240ms", border: "2px solid #7c3aed" }}
            >
              <div
                className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                🎉 Launch Special — 30% OFF
              </div>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#7c3aed" }}>
                  E-COMMERCE
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-lg line-through" style={{ color: "#9ca3af" }}>R6,499</span>
                  <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>R4,549</span>
                  <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>once-off</span>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#7c3aed" }}>
                  Only available for the first 5 clients
                </p>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  Delivered in <span className="font-semibold" style={{ color: "#374151" }}>21 days</span>
                </p>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Full online store", "Product catalogue", "PayFast integration", "Order management", "Everything in Professional"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                    <svg className="mt-0.5 shrink-0 w-4 h-4" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="/packages/ecommerce"
                className="text-sm text-gray-400 hover:text-purple-600 transition-colors mt-2 block text-center mb-4"
              >
                Why this package? →
              </a>
              <a href="/get-started?plan=E-Commerce" className="btn-primary text-center">
                Get started →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Unsure CTA */}
      <section className="py-8" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow text-center">
          <a
            href="/get-started?plan=Unsure"
            className="btn-outline inline-flex items-center gap-2 anim-fade-up"
          >
            Not sure which package is right for you? Let us help →
          </a>
        </div>
      </section>

      {/* Monthly Services */}
      <section className="section" style={{ backgroundColor: "#1e1b4b" }}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a78bfa" }}>
              Ongoing Support
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Monthly Services
            </h2>
            <p className="text-base" style={{ color: "#94a3b8" }}>
              Keep your website running, maintained, and up to date every month.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Hosting & Maintenance */}
            <div
              className="rounded-2xl p-7 flex flex-col anim-fade-up"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#94a3b8" }}>
                  Hosting &amp; Maintenance
                </p>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "rgba(148,163,184,0.15)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.3)" }}
                >
                  Required
                </span>
              </div>
              <div className="mb-1">
                <span className="text-4xl font-extrabold text-white">R200</span>
                <span className="text-sm ml-1" style={{ color: "#94a3b8" }}>/month</span>
              </div>
              <p className="text-xs font-semibold mb-4" style={{ color: "#94a3b8" }}>
                Mandatory for all clients
              </p>
              <p className="text-sm flex-1" style={{ color: "#cbd5e1" }}>
                Covers website hosting, uptime monitoring, and basic security updates. Required for all active websites.
              </p>
            </div>

            {/* Ongoing Retainer */}
            <div
              className="rounded-2xl p-7 flex flex-col anim-fade-up"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(167,139,250,0.35)",
                animationDelay: "80ms",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#a78bfa" }}>
                  Ongoing Retainer
                </p>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "rgba(124,58,237,0.25)", color: "#c4b5fd", border: "1px solid rgba(167,139,250,0.4)" }}
                >
                  Optional
                </span>
              </div>
              <div className="mb-1">
                <span className="text-4xl font-extrabold text-white">R300</span>
                <span className="text-sm ml-1" style={{ color: "#94a3b8" }}>/month</span>
              </div>
              <p className="text-xs font-semibold mb-4" style={{ color: "#a78bfa" }}>
                Optional add-on
              </p>
              <p className="text-sm flex-1 mb-6" style={{ color: "#cbd5e1" }}>
                Covers content updates, design changes, and priority support. Cancel anytime with 30 days notice.
              </p>
              <a href="/get-started?retainer=yes" className="btn-primary text-center text-sm py-3">
                Add to my package →
              </a>
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

      <Footer />
    </div>
  );
}
