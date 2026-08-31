import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { packages, whatsappLink } from "@/lib/sale";

export const metadata: Metadata = {
  title: "Closing Down Prices | ClearSite Studios",
  description:
    "The remaining ClearSite Studios website packages at a reduced once-off price, from R399. You own the site outright, hosted free, no monthly fee.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/pricing",
  },
};

// Market and agency figures carried over from the previous pricing page.
const marketRates: Record<string, { label: string; market: string; agency: string }> = {
  STARTER: { label: "Starter (1 page)", market: "R3,765", agency: "R5,000+" },
  BUSINESS: { label: "Business (5 pages)", market: "R6,254", agency: "R15,000+" },
  PROFESSIONAL: { label: "Professional (10 pages)", market: "R14,780", agency: "R40,000+" },
  "E-COMMERCE": { label: "E-Commerce", market: "R27,980+", agency: "R40,000+" },
};

const ownership = [
  {
    icon: "🔑",
    heading: "The site is yours outright",
    body: "Design, code and content. Once it's paid for, you own it — no licence, no subscription, no lock-in.",
  },
  {
    icon: "💸",
    heading: "Hosted free, R0 per month",
    body: "Deployed on a free hosting tier. There is no hosting fee and no maintenance fee, because there is no studio left to bill you.",
  },
  {
    icon: "📨",
    heading: "Credentials handed over",
    body: "The hosting account is in your name and you get the logins on completion. Nothing sits behind my account.",
  },
  {
    icon: "🚪",
    heading: "No ongoing dependency on me",
    body: "Your site keeps running after I close. If you ever want changes, any developer can pick it up from what you already hold.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Closing sale banner */}
      <div
        className="w-full py-3 px-4 text-center text-white text-sm font-bold"
        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
      >
        Closing down — remaining packages reduced to a once-off price.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-16 md:py-24">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span
            className="badge mb-6 anim-scale-in"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
          >
            Closing Down Prices
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            The remaining packages,
            <br />
            <span className="gradient-text">at a once-off reduced price.</span>
          </h1>
          <p
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Same build I&apos;ve been charging full price for. The price is lower because I&apos;m
            closing the studio, not because the work is different.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 anim-fade-up"
              style={{ color: "#111827" }}
            >
              Choose Your Package
            </h2>
            <p
              className="text-base anim-fade-up"
              style={{ color: "#6b7280", animationDelay: "100ms" }}
            >
              Once-off payment. No monthly fee, now or ever.
            </p>
          </div>

          {/* Estimate disclaimer — sits above the cards so it is read first */}
          <div
            className="max-w-3xl mx-auto mb-10 rounded-2xl px-6 py-5 text-center anim-fade-up"
            style={{ backgroundColor: "#ede9fe", border: "1px solid #ddd6fe", animationDelay: "150ms" }}
          >
            <p className="text-sm leading-relaxed font-medium" style={{ color: "#5b21b6" }}>
              These prices are estimates for a typical build. Your final price is confirmed in a
              written quote once I know exactly what you need — message me and I&apos;ll put one
              together. No cost and no obligation for the quote.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 anim-fade-up shadow-lg"
                style={{ animationDelay: `${i * 80}ms`, border: "2px solid #7c3aed" }}
              >
                <div
                  className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                >
                  {pkg.salePrice ? "Closing down — 80% off" : "Closing down sale"}
                </div>

                <div className="mb-5">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: "#7c3aed" }}
                  >
                    {pkg.name}
                  </p>
                  <div className="flex flex-wrap items-end gap-2 mb-1">
                    {pkg.salePrice ? (
                      <>
                        <span className="text-lg line-through" style={{ color: "#9ca3af" }}>
                          {pkg.originalPrice}
                        </span>
                        <span className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>
                          {pkg.salePrice}
                        </span>
                        <span className="text-sm mb-1.5" style={{ color: "#6b7280" }}>
                          once-off
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold" style={{ color: "#7c3aed" }}>
                        Quoted on request
                      </span>
                    )}
                  </div>
                  {!pkg.salePrice && (
                    <p className="text-sm mb-1" style={{ color: "#6b7280" }}>
                      Stores vary too much to price up front — tell me what you need to sell and
                      I&apos;ll quote you.
                    </p>
                  )}
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    Delivered in{" "}
                    <span className="font-semibold" style={{ color: "#374151" }}>
                      {pkg.delivery}
                    </span>
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-5">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "#374151" }}
                    >
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
                  <li className="flex items-start gap-2.5 text-sm font-semibold" style={{ color: "#374151" }}>
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
                    Yours outright — no monthly fee
                  </li>
                </ul>

                <a
                  href={pkg.learnMoreLink}
                  className="text-sm text-gray-400 hover:text-purple-600 transition-colors mt-2 block text-center mb-4"
                >
                  Why this package? →
                </a>
                <a
                  href={whatsappLink(
                    pkg.salePrice
                      ? `Hi Divan, I saw the ClearSite closing-down sale and I'm interested in the ${pkg.planParam} package.`
                      : `Hi Divan, I saw the ClearSite closing-down sale and I'd like a quote for the ${pkg.planParam} package.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  {pkg.salePrice
                    ? `WhatsApp me about ${pkg.planParam} →`
                    : `Get an ${pkg.planParam} quote →`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unsure CTA */}
      <section className="py-8" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow text-center">
          <a
            href={whatsappLink(
              "Hi Divan, I saw the ClearSite closing-down sale. I'm not sure which package fits — can you help?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 anim-fade-up"
          >
            Not sure which package fits? Message me →
          </a>
        </div>
      </section>

      {/* What you actually get — replaces the old monthly services section */}
      <section className="section" style={{ backgroundColor: "#1e1b4b" }}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: "#a78bfa" }}
            >
              No Monthly Fees
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              What the price actually includes
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
              There is no hosting fee and no retainer. A studio that is closing has no business
              selling you a monthly commitment, so I&apos;ve removed both.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {ownership.map((item, i) => (
              <div
                key={item.heading}
                className="rounded-2xl p-7 flex flex-col anim-fade-up"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-base font-extrabold text-white mb-2">{item.heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-center mt-8" style={{ color: "#94a3b8" }}>
            A custom domain is the only separate cost, paid directly to the registrar. I don&apos;t
            mark it up and I don&apos;t hold it for you.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 anim-fade-up"
              style={{ color: "#111827" }}
            >
              How These Prices Compare
            </h2>
            <p
              className="text-base anim-fade-up"
              style={{ color: "#6b7280", animationDelay: "100ms" }}
            >
              What the same build typically costs elsewhere in South Africa.
            </p>
          </div>

          <div className="overflow-x-auto anim-fade-up" style={{ animationDelay: "200ms" }}>
            <table
              className="w-full min-w-[560px] rounded-2xl overflow-hidden border-separate border-spacing-0"
              style={{ border: "1px solid #e4e4e7" }}
            >
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <th
                    className="text-left px-5 py-4 text-sm font-bold text-white"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Package
                  </th>
                  <th
                    className="px-5 py-4 text-sm font-bold text-white text-center"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Closing Price
                  </th>
                  <th
                    className="px-5 py-4 text-sm font-bold text-center"
                    style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    SA Market Average
                  </th>
                  <th
                    className="px-5 py-4 text-sm font-bold text-center"
                    style={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Agency Pricing
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, i) => {
                  const rates = marketRates[pkg.name];
                  const last = i === packages.length - 1;
                  const cellBorder = last ? undefined : "1px solid #e4e4e7";
                  return (
                    <tr key={pkg.name} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                      <td
                        className="px-5 py-4 text-sm font-semibold"
                        style={{ color: "#374151", borderBottom: cellBorder }}
                      >
                        {rates.label}
                      </td>
                      <td
                        className="px-5 py-4 text-sm font-bold text-center"
                        style={{ color: "#7c3aed", borderBottom: cellBorder }}
                      >
                        {pkg.salePrice ?? "On request"}
                      </td>
                      <td
                        className="px-5 py-4 text-sm text-center"
                        style={{ color: "#6b7280", borderBottom: cellBorder }}
                      >
                        {rates.market}
                      </td>
                      <td
                        className="px-5 py-4 text-sm text-center"
                        style={{ color: "#6b7280", borderBottom: cellBorder }}
                      >
                        {rates.agency}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p
            className="text-sm text-center mt-5 anim-fade-up"
            style={{ color: "#9ca3af", animationDelay: "300ms" }}
          >
            Estimates only — your final price is confirmed by quote. All prices exclude domain
            registration if required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
