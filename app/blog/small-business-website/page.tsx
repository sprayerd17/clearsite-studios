import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "5 Reasons Your Small Business Needs a Website in 2026 | Clearsite Studios",
  description: "Still relying on social media alone? Here is why a professional website is the smartest investment your South African business can make this year.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/blog/small-business-website",
  },
};

const reasons = [
  {
    title: "You own it — social media can disappear overnight",
    body: "Your Facebook or Instagram page can be suspended, hacked, or simply lose its reach due to an algorithm change. Your website belongs to you. No platform can take it away or hide it from your audience.",
  },
  {
    title: "Clients Google you before they call you",
    body: "When someone hears about your business, the first thing they do is search for you online. If nothing comes up — or worse, a competitor appears instead — you've already lost that client. A website makes you findable.",
  },
  {
    title: "It works for you 24/7",
    body: "Your website answers questions, showcases your services, and collects enquiries even while you sleep. It's your most hardworking employee and it never takes a day off.",
  },
  {
    title: "It builds trust instantly",
    body: "A clean, professional website signals that you are serious about your business. Customers are far more likely to contact a business that looks established and credible online.",
  },
  {
    title: "It levels the playing field",
    body: "A well-built website means a small local business can look just as professional as a large company. Your website is often the first impression — make it count.",
  },
];

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        align="left"
        back={{ href: "/blog", label: "Back to blog" }}
        eyebrow="Business Tips · 3 min read"
        title="5 Reasons Your Small Business Needs a Website in 2026"
        intro="Still relying on social media alone? Here's why a proper website is the smartest investment you can make this year."
      />

      <main className="flex-1 bg-paper">
        <section className="py-20 md:py-28">
          <div className="container-site">
            <article className="mx-auto max-w-[720px]">
              {reasons.map((r, i) => (
                <div key={r.title} className="mt-12 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-2xl leading-tight tracking-tight text-ink">{r.title}</h2>
                  <p className="mt-4 text-[17px] leading-[1.75] text-ink/75">{r.body}</p>
                </div>
              ))}
            </article>

            {/* ── CTA ─────────────────────────────────────────────────── */}
            <div className="anim-fade-up mx-auto mt-20 max-w-[880px]">
              <div className="grain relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-white shadow-lift sm:px-12 sm:py-14">
                <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-[520px] rounded-full"
                  style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.2), transparent)" }}
                />
                <div className="relative z-10 max-w-xl">
                  <span className="eyebrow eyebrow-dark">Next step</span>
                  <h2 className="mt-5 text-3xl leading-[1.08] tracking-tightest text-white sm:text-[40px]">
                    Ready to get your business <span className="serif-accent text-lime">online?</span>
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-white/55">
                    Get in touch with Clearsite Studios today for a free, no-obligation quote.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/quote" className="btn-lime">
                      Request a quote
                      <ArrowRight size={16} className="btn-arrow" />
                    </Link>
                    <Link href="/pricing" className="btn-ghost-dark">
                      See pricing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
