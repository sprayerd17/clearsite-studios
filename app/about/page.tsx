import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import { LogoMark } from "@/components/Logo";
import {
  ArrowRight,
  Chat,
  CreditCard,
  Handshake,
  MapPin,
  Sparkle,
  User,
  Zap,
} from "@/components/icons";
import { MATHLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Clearsite Studios | South African Web Design & Workflow Studio",
  description:
    "Clearsite Studios is a solo studio based in Cape Town, South Africa. We build clean, affordable, professional websites and custom business workflows for small businesses.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/about",
  },
};

const values = [
  { icon: MapPin, heading: "South Africa based", body: "Serving local businesses who deserve a world-class online presence." },
  { icon: User, heading: "One client at a time", body: "You get my full attention — not a ticket number in a queue." },
  { icon: Chat, heading: "Plain language", body: "No tech jargon. Just clear, honest communication throughout." },
  { icon: CreditCard, heading: "Fair pricing", body: "Professional results without the big agency price tag." },
  { icon: Zap, heading: "Fast turnaround", body: "Get online quickly without cutting corners on quality." },
  { icon: Handshake, heading: "Personal service", body: "You deal directly with me, start to finish, every time." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        eyebrow="About"
        title={
          <>
            The studio behind <span className="serif-accent text-lime">the work.</span>
          </>
        }
        intro="A little about who I am, how I work, and what I believe."
      />

      <main className="flex-1">
        <section className="section bg-white">
          <div className="container-site">
            <div className="grid items-start gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              {/* Story */}
              <div className="anim-fade-left">
                <span className="eyebrow">Our story</span>
                <h2 className="mt-5 text-[34px] leading-[1.04] tracking-tightest text-ink sm:text-5xl">
                  One studio. One focus.{" "}
                  <span className="serif-accent text-muted">Your business, online and organised.</span>
                </h2>

                <div className="mt-8 space-y-5 text-[16.5px] leading-relaxed text-muted">
                  <p>
                    Clearsite Studios is a solo web design and development studio based in South
                    Africa, built on one simple belief — every small business deserves a
                    professional online presence without the big agency price tag.
                  </p>
                  <p>
                    I work directly with small business owners, one client at a time, to build
                    clean and effective websites that make a real impression — and, increasingly,
                    the custom tools behind them: quotes, job tracking, client approvals, invoices
                    and payments, in one place instead of spread across spreadsheets and WhatsApp.
                  </p>
                  <p>
                    Whether you&apos;re getting online for the first time, refreshing an outdated
                    site, or tired of running your business from an Excel template, I&apos;m here
                    to make the process simple and stress-free — no tech jargon, no confusing
                    back-and-forth, just clear communication and results you&apos;re proud of.
                  </p>
                  <p>
                    Based in South Africa and proudly serving local businesses, I understand what
                    it takes to stand out in your market. Fast turnaround, fair pricing, and
                    personal service — that&apos;s the Clearsite Studios promise.
                  </p>
                </div>

                {/* Promise callout */}
                <div className="mt-10 flex gap-4 rounded-3xl border border-lime-deep/30 bg-lime-soft/60 p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <Sparkle size={18} />
                  </span>
                  <div>
                    <p className="font-semibold tracking-tight text-ink">Our promise to you</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/70">
                      Before any money changes hands, we show you exactly what your website will
                      look like. Free mockup, zero commitment.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-ink">
                    Work with me
                    <ArrowRight size={16} className="btn-arrow" />
                  </Link>
                  <Link href="/portfolio" className="btn-ghost">
                    See the work
                  </Link>
                </div>
              </div>

              {/* Founder + values */}
              <div className="anim-fade-right lg:sticky lg:top-28">
                <div className="grain relative overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-lift sm:p-8">
                  <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_80%)]" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime font-serif text-2xl italic text-ink">
                        DB
                      </span>
                      <LogoMark tone="light" size={28} />
                    </div>
                    <p className="mt-6 text-xl font-semibold tracking-tight">Divan Bosman</p>
                    <p className="text-sm text-white/50">Founder · Designer · Developer</p>
                    <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                      I design, code, deploy and hand over every project myself. Outside of client
                      work I&apos;m building{" "}
                      <a
                        href={MATHLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline decoration-lime decoration-2 underline-offset-4"
                      >
                        Mathly
                      </a>
                      , a maths education platform for South African learners — a personal project.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {values.map((item, i) => (
                    <div
                      key={item.heading}
                      className="anim-fade-up rounded-2xl border border-line bg-paper/60 p-5"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <item.icon size={18} className="text-ink" />
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{item.heading}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
