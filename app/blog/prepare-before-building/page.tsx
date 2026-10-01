import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowRight, Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "What to Prepare Before Building Your Website | Clearsite Studios",
  description: "A simple checklist of what to have ready before your first conversation with a web designer. Save time and money with these preparation tips.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/blog/prepare-before-building",
  },
};

const checklist = [
  {
    title: "Your business basics",
    body: "Have your business name, tagline, and a short description of what you do ready. Think about what makes you different from competitors and write it down in plain language.",
  },
  {
    title: "Your contact details",
    body: "Email address, phone number, physical address or service area, and links to any existing social media profiles you want included.",
  },
  {
    title: "A list of your services",
    body: "Write out each service you offer with a short description. Don't worry about making it perfect — your web designer can help polish the wording.",
  },
  {
    title: "Your logo (if you have one)",
    body: "If you have a logo, have it saved as a PNG or SVG file. If you don't have one yet, mention it upfront so it can be factored into the project.",
  },
  {
    title: "Examples of websites you like",
    body: "Find 2 or 3 websites that you think look good. This gives your designer a clear sense of your taste and saves a lot of back and forth.",
  },
  {
    title: "Your budget and timeline",
    body: "Having a rough idea of what you want to spend and when you need the site live helps your designer recommend the right solution for you.",
  },
];

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        align="left"
        back={{ href: "/blog", label: "Back to blog" }}
        eyebrow="Getting Started · 4 min read"
        title="What to Prepare Before Building Your Website"
        intro="Building a website goes much faster — and costs less — when you arrive prepared. Here's exactly what to have ready before your first meeting."
      />

      <main className="flex-1 bg-paper">
        <section className="py-20 md:py-28">
          <div className="container-site">
            <article className="mx-auto max-w-[720px]">
              {checklist.map((item) => (
                <div
                  key={item.title}
                  className="mt-12 grid grid-cols-[auto_1fr] gap-x-5 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0"
                >
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-lime text-ink">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h2 className="text-2xl leading-tight tracking-tight text-ink">{item.title}</h2>
                    <p className="mt-4 text-[17px] leading-[1.75] text-ink/75">{item.body}</p>
                  </div>
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
                    Got the basics <span className="serif-accent text-lime">ready?</span>
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-white/55">
                    At Clearsite Studios we guide you through every step — but coming in with the basics ready makes a real difference.
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
