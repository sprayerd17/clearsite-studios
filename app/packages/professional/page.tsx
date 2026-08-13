import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PackageSaleBanner from "@/components/PackageSaleBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Professional Package Breakdown | Clearsite Studios",
  description: "Why the Professional package doubles your Google visibility with 10 pages, a blog, and Google Analytics for R5,499.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/packages/professional",
  },
};

const sections = [
  {
    number: "01",
    feature: "Double the Pages, Double the Google Presence",
    title: "10 pages means 10 independent chances to rank on Google",
    body: "The Business package gives you 5 pages and 5 Google entry points. The Professional package doubles that to 10. Each additional page can rank independently for different search terms — your services page ranks for 'web designer Cape Town', your blog ranks for 'how much does a website cost in South Africa', your about page ranks for 'trusted local web studio'. More pages means more doors into your business from Google. For any business serious about being found online, 10 pages is not excessive — it is strategic.",
  },
  {
    number: "02",
    feature: "The Blog Changes Everything",
    title: "A blog is the most powerful free marketing tool available",
    body: "Every blog post you publish is a new page Google can index and rank. A business with 10 blog posts has 10 additional entry points from search. A business with 50 blog posts has 50. Unlike paid advertising which stops the moment you stop paying, a well-written blog post can bring in customers for years. Topics like 'how to choose a plumber in Cape Town' or '5 signs your electrical system needs upgrading' attract exactly the customers who are already looking for your service — and they find you before they find your competitors.",
  },
  {
    number: "03",
    feature: "Everything in Business, Plus More",
    title: "You are not starting over — you are building on a proven foundation",
    body: "The Professional package includes everything in the Business package — contact form, WhatsApp, Google Maps, social media links, SEO setup — plus the blog, Google Analytics, and speed optimisation on top. You are not paying for the same things twice. You are paying for a more powerful, more visible, and more future-proof version of the same great foundation.",
  },
  {
    number: "04",
    feature: "Google Analytics Setup",
    title: "Know exactly what is working — and what is not",
    body: "Google Analytics shows you how many people visit your site, which pages they spend the most time on, where they come from, and what they do before leaving. This data is invaluable. It tells you whether your Services page is converting visitors into enquiries, whether people are reading your blog, and which Google searches are bringing people to your site. Without this data you are guessing. With it you are making informed decisions that grow your business.",
  },
  {
    number: "05",
    feature: "Speed Optimised",
    title: "Fast websites rank higher and convert better",
    body: "Google uses page speed as a ranking factor — slow websites get pushed down in search results regardless of how good their content is. Beyond SEO, speed affects conversions. Research shows that a 1 second delay in page load time reduces conversions by 7%. Our speed optimisation ensures your site loads fast on mobile data, on slow connections, and on every device — keeping both Google and your customers happy.",
  },
  {
    number: "06",
    feature: "3 Rounds of Revisions",
    title: "A bigger site deserves more time to get right",
    body: "With 10 pages there is significantly more to review, refine and perfect. Three rounds of revisions gives you the time and space to go through every page carefully, request adjustments, and make sure the final result is exactly what you envisioned. We do not rush the process — we get it right.",
  },
  {
    number: "07",
    feature: "The Real Question",
    title: "Is R2,000 worth doubling your Google visibility and adding a blog?",
    body: "The difference between the Business and Professional package is R2,000. For that R2,000 you get 5 additional pages, a fully set up blog, Google Analytics, and speed optimisation. A single blog post that ranks on Google and brings in one new customer has already paid for the upgrade. For any business that wants to grow its online presence over time rather than just exist online, the Professional package is not a luxury — it is the smarter long-term investment.",
  },
];

export default function ProfessionalPackagePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PackageSaleBanner planParam="Professional" />

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
              Professional Package — R5,499
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Why the Professional package is{" "}
            <span className="gradient-text">worth the upgrade</span>
          </h1>
          <p
            className="text-lg max-w-2xl anim-fade-up"
            style={{ color: "#94a3b8", animationDelay: "200ms" }}
          >
            You&apos;re considering the Business package — or you already have one. Here&apos;s why
            stepping up to 10 pages with a blog could be the best investment your business makes
            online.
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
                  Business — R3,499
                </p>
                <ul className="space-y-3">
                  {["5 pages", "No blog", "Basic tracking"].map((item) => (
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
                  Professional — R5,499
                </p>
                <ul className="space-y-3">
                  {["10 pages", "Blog included", "Google Analytics + Speed optimised"].map((item) => (
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
              Professional Package — R5,499 once-off
            </p>
            <p className="text-white text-lg font-semibold mb-6 max-w-xl mx-auto">
              Ready to build a website that grows with your business? Let&apos;s make it happen.
            </p>
            <a href="/get-started?plan=Professional" className="btn-primary text-sm px-8 py-3.5">
              Upgrade to Professional →
            </a>
            <p className="mt-4">
              <a
                href="/get-started?plan=Business"
                className="text-sm transition-colors duration-150"
                style={{ color: "#94a3b8" }}
              >
                Start with Business instead
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
