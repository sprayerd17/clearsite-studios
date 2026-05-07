import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-Commerce Package Breakdown | Clearsite Studios",
  description: "Why the E-Commerce package turns your website into a 24/7 revenue machine with a full online store and PayFast integration for R6,499.",
};

const sections = [
  {
    number: "01",
    feature: "Your Website Becomes Your Best Salesperson",
    title: "Open 24/7, never calls in sick, never asks for commission",
    body: "A standard website tells people what you do. An e-commerce website sells it to them — at 2am on a Sunday, while you are asleep, while you are with another customer, while you are on holiday. Every hour your products are not available to buy online is an hour of potential revenue lost. The E-Commerce package turns your website from a digital brochure into a fully functioning store that works for you around the clock.",
  },
  {
    number: "02",
    feature: "Full Online Store",
    title: "Everything a customer needs to go from browsing to buying",
    body: "Your online store includes product pages, a shopping cart, checkout flow, and order confirmation — the complete buying journey. Customers can browse your products, add to cart, and pay securely without ever needing to contact you first. Fewer steps between interest and purchase means more sales. It is that simple.",
  },
  {
    number: "03",
    feature: "Product Catalogue",
    title: "Showcase every product professionally",
    body: "A well-structured product catalogue makes your business look established and trustworthy. Each product gets its own page with images, descriptions, pricing, and a buy button. Customers can browse, compare, and decide at their own pace — just like shopping at a major retailer. This level of presentation builds confidence and reduces the hesitation that stops people from buying.",
  },
  {
    number: "04",
    feature: "PayFast Integration",
    title: "South Africa's most trusted payment gateway — built in",
    body: "PayFast is used by over 60,000 South African businesses and processes billions of rands in transactions annually. Your customers can pay by credit card, debit card, instant EFT, or SnapScan — all securely through PayFast. Every transaction is encrypted and protected. You receive your money directly into your bank account. No complicated setup, no monthly gateway fees beyond PayFast's standard rates — just a reliable, trusted payment system your customers already know.",
  },
  {
    number: "05",
    feature: "Order Management",
    title: "Know exactly what has been ordered, paid for, and fulfilled",
    body: "Order management means you have a clear view of every transaction — what was ordered, when, by whom, and whether it has been fulfilled. No more lost WhatsApp messages, no more forgotten orders, no more manual tracking in a spreadsheet. Your store handles the record-keeping so you can focus on fulfilling orders and growing your business.",
  },
  {
    number: "06",
    feature: "Everything in Professional",
    title: "You are getting the most complete package we offer",
    body: "The E-Commerce package includes everything in the Professional package — 10 pages, blog, Google Analytics, speed optimisation, contact form, WhatsApp, Google Maps, social media links, SEO setup, and 3 rounds of revisions — plus the full online store on top. This is the complete package for a business that is serious about selling online.",
  },
  {
    number: "07",
    feature: "The Real Question",
    title: "Is R6,499 worth having a store that sells for you 24/7?",
    body: "Think about what one month of online sales would look like for your business. If your store processes even 5 additional orders per month that you would not have received otherwise, how quickly does R6,499 pay for itself? For most businesses the answer is within the first month or two. The E-Commerce package is not a cost — it is an investment with a measurable return. And compared to the SA market average of R27,980+ for an e-commerce build, you are getting the same result at less than a quarter of the price.",
  },
];

export default function EcommercePackagePage() {
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
              E-Commerce Package — R6,499
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Why the E-Commerce package is{" "}
            <span className="gradient-text">worth the upgrade</span>
          </h1>
          <p
            className="text-lg max-w-2xl anim-fade-up"
            style={{ color: "#94a3b8", animationDelay: "200ms" }}
          >
            You want to sell online — not just exist online. Here&apos;s why the E-Commerce package
            is the only option that turns your website into a revenue-generating machine.
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
                  Professional — R5,499
                </p>
                <ul className="space-y-3">
                  {["Informational website", "No selling capability", "Manual enquiries only"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#6b7280" }}>
                      <span
                        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "#f3f4f6", color: "#9ca3af" }}
                      >
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6" style={{ background: "rgba(124,58,237,0.04)" }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#7c3aed" }}>
                  E-Commerce — R6,499
                </p>
                <ul className="space-y-3">
                  {["Full online store", "Sell 24/7", "Automated payments and orders"].map((item) => (
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
              E-Commerce Package — R6,499 once-off
            </p>
            <p className="text-white text-lg font-semibold mb-6 max-w-xl mx-auto">
              Ready to start selling online? Let&apos;s build a store your customers will love to buy from.
            </p>
            <a href="/get-started?plan=E-Commerce" className="btn-primary text-sm px-8 py-3.5">
              Get My Online Store →
            </a>
            <p className="mt-4">
              <a
                href="/get-started?plan=Professional"
                className="text-sm transition-colors duration-150"
                style={{ color: "#94a3b8" }}
              >
                Start with Professional instead
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
