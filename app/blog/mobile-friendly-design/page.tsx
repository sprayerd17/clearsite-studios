import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Why Mobile-Friendly Design Is No Longer Optional | Clearsite Studios",
  description: "Over 60% of web traffic comes from phones. Here is what a poor mobile experience is costing your South African business right now.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/blog/mobile-friendly-design",
  },
};

const sections = [
  {
    title: "What does mobile-friendly actually mean?",
    body: "A mobile-friendly website automatically adjusts its layout to fit smaller screens. Text is readable without zooming in, buttons are easy to tap, and the page loads quickly on a mobile data connection.",
  },
  {
    title: "Why it matters for your business",
    body: "Google ranks mobile-friendly websites higher in search results. If your site isn't optimised for mobile, you're not just losing visitors — you're being pushed down the list before they even find you.",
  },
  {
    title: "The numbers don't lie",
    body: "Over 60% of all web traffic globally now comes from mobile devices. In South Africa, that number is even higher due to the widespread use of smartphones as the primary way people access the internet.",
  },
  {
    title: "What a bad mobile experience looks like",
    body: "Text that's too small to read, buttons that are too close together to tap, images that stretch or break the layout, and pages that take forever to load. Any one of these sends potential clients straight to a competitor.",
  },
  {
    title: "What we do at Clearsite Studios",
    body: "Every website we build is designed mobile-first — meaning we start with the phone experience and build up from there. Your clients get a smooth, fast, professional experience no matter what device they're using.",
  },
];

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        align="left"
        back={{ href: "/blog", label: "Back to blog" }}
        eyebrow="Web Design · 3 min read"
        title="Why Mobile-Friendly Design Is No Longer Optional"
        intro="More than half of all web traffic comes from phones. Here's what that means for your business."
      />

      <main className="flex-1 bg-paper">
        <section className="py-20 md:py-28">
          <div className="container-site">
            <article className="mx-auto max-w-[720px]">
              {sections.map((s) => (
                <div key={s.title} className="mt-12 first:mt-0">
                  <h2 className="text-2xl leading-tight tracking-tight text-ink">{s.title}</h2>
                  <p className="mt-4 text-[17px] leading-[1.75] text-ink/75">{s.body}</p>
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
                    Want a website that works perfectly on{" "}
                    <span className="serif-accent text-lime">every device?</span>
                  </h2>
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
