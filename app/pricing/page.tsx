import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Contact from "@/components/Contact";
import {
  ArrowRight,
  Bag,
  Check,
  FileText,
  Globe,
  Handshake,
  Key,
  Layers,
  WhatsApp,
  Workflow,
  Zap,
} from "@/components/icons";
import { FROM_PRICE, quoteHref, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing | ClearSite Studios",
  description: `Websites from ${FROM_PRICE} once-off, and custom business workflows quoted per project. Every project gets a written quote — you own everything outright, no monthly fee.`,
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/pricing",
  },
};

const factors = [
  {
    icon: Layers,
    title: "Size & features",
    body: "How many pages, and what they need to do — galleries, bookings, a blog, maps, analytics. A focused one-page site sits at the bottom of the range.",
  },
  {
    icon: FileText,
    title: "Your content",
    body: "If your logo, photos and text are ready, it's quicker. If you'd like help putting them together, I'll include that in the quote.",
  },
  {
    icon: Bag,
    title: "Selling online",
    body: "Stores depend on how many products you sell, how customers pay, and whether you deliver or offer collection.",
  },
  {
    icon: Workflow,
    title: "Custom workflows",
    body: "Systems are scoped around your process — what it needs to handle, who uses it, and what it replaces.",
  },
];

const steps = [
  { title: "Tell me what you need", body: "A two-minute brief — mostly tapping. Or just WhatsApp me." },
  { title: "Get a written quote", body: "It lands on your own private project page, usually within 1 business day." },
  { title: "Accept in one tap", body: "Pay the 50% deposit, upload your content, and the build starts." },
];

const ownership = [
  {
    icon: Key,
    heading: "The site is yours outright",
    body: "Design, code and content. Once it's paid for, you own it — no licence, no subscription, no lock-in.",
  },
  {
    icon: Zap,
    heading: "Hosted free, R0 per month",
    body: "Websites are deployed on a free hosting tier. There is no hosting fee and no maintenance fee from me.",
  },
  {
    icon: Globe,
    heading: "Credentials handed over",
    body: "The hosting account is in your name and you get the logins on completion. Nothing sits behind my account.",
  },
  {
    icon: Handshake,
    heading: "No ongoing dependency on me",
    body: "If you ever want changes, I'm a message away — but any developer can pick it up from what you already hold.",
  },
];

const market = [
  { label: "Single-page website", market: "R3,765", agency: "R5,000+" },
  { label: "5-page website", market: "R6,254", agency: "R15,000+" },
  { label: "10-page website", market: "R14,780", agency: "R40,000+" },
  { label: "Online store", market: "R27,980+", agency: "R40,000+" },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Websites from {FROM_PRICE}. <span className="serif-accent text-lime">Quoted to fit.</span>
          </>
        }
        intro="Every business needs something a little different, so every project gets a written quote before anything starts — no guesswork, no surprises, and no monthly fee."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={quoteHref()} className="btn-lime btn-lg w-full sm:w-auto">
            Get a quote
            <ArrowRight size={17} className="btn-arrow" />
          </Link>
          <a
            href={whatsappLink("Hi Divan, I'd like to ask about pricing for a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-dark btn-lg w-full sm:w-auto"
          >
            <WhatsApp size={17} />
            Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      <main className="flex-1">
        {/* ── What shapes the price ─────────────────────────────────────── */}
        <section className="section bg-paper">
          <div className="container-site">
            <SectionHeading
              eyebrow="How it's priced"
              title={
                <>
                  What shapes your <span className="serif-accent">quote.</span>
                </>
              }
              intro="Prices start low for simple sites and scale with what you actually need — you only pay for what your business will use."
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:gap-5">
              {/* Anchor */}
              <div className="grain anim-fade-up relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-lift sm:p-9">
                <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.22), transparent)" }}
                />
                <div className="relative z-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">Starting point</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-sm text-white/50">from</span>
                    <span className="text-6xl font-semibold tracking-tightest sm:text-7xl">{FROM_PRICE}</span>
                  </p>
                  <p className="mt-2 text-sm text-white/50">once-off · no monthly fee</p>
                  <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
                    A simple one-page site: your services or catalogue, contact details and a WhatsApp
                    button. Ideal for tradespeople and small service businesses that need to look
                    professional online.
                  </p>
                </div>
                <ul className="relative z-10 mt-8 space-y-2.5">
                  {["Mobile-first design", "WhatsApp contact button", "Handed over in your name"].map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-white/80">
                      <Check size={15} strokeWidth={2.4} className="text-lime" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Factors */}
              <div className="grid gap-4 sm:grid-cols-2">
                {factors.map((f, i) => (
                  <div
                    key={f.title}
                    className="card anim-fade-up p-6 sm:p-7"
                    style={{ animationDelay: `${(i + 1) * 80}ms` }}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-paper text-ink">
                      <f.icon size={18} />
                    </span>
                    <h3 className="mt-6 text-lg tracking-tight text-ink">{f.title}</h3>
                    <p className="prose-muted mt-2 text-[14.5px]">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How quoting works ─────────────────────────────────────────── */}
        <section className="bg-paper pb-24 md:pb-32">
          <div className="container-site">
            <div className="card anim-fade-up overflow-hidden p-7 sm:p-10">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                  <span className="eyebrow">How quoting works</span>
                  <h2 className="mt-5 text-3xl tracking-tightest text-ink sm:text-4xl">
                    Two minutes to ask. <span className="serif-accent">No obligation.</span>
                  </h2>
                  <Link href={quoteHref()} className="btn-ink mt-8">
                    Start your quote
                    <ArrowRight size={16} className="btn-arrow" />
                  </Link>
                </div>
                <ol className="grid flex-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
                  {steps.map((s, i) => (
                    <li key={s.title} className="rounded-2xl border border-line bg-paper/60 p-5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-xs text-lime">
                        0{i + 1}
                      </span>
                      <p className="mt-4 font-medium tracking-tight text-ink">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── What the price includes ─────────────────────────────────── */}
        <section id="ownership" className="section bg-white">
          <div className="container-site">
            <SectionHeading
              eyebrow="No monthly fees"
              title={
                <>
                  What the price <span className="serif-accent">actually</span> includes.
                </>
              }
              intro="There is no hosting fee and no retainer. You pay once for the build, and it's yours."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ownership.map((item, i) => (
                <div
                  key={item.heading}
                  className="anim-fade-up rounded-3xl border border-line bg-paper/60 p-6 sm:p-7"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lime">
                    <item.icon size={18} />
                  </span>
                  <h3 className="mt-6 text-lg tracking-tight text-ink">{item.heading}</h3>
                  <p className="prose-muted mt-2 text-sm">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="anim-fade-up mt-8 text-sm text-muted">
              A custom domain is the only separate cost, paid directly to the registrar. I don&apos;t
              mark it up and I don&apos;t hold it for you.
            </p>
          </div>
        </section>

        {/* ── Market comparison ───────────────────────────────────────── */}
        <section className="section bg-paper">
          <div className="container-site">
            <SectionHeading
              eyebrow="Compare"
              title={
                <>
                  What it typically costs <span className="serif-accent">elsewhere.</span>
                </>
              }
              intro={`The same builds from other South African designers and agencies. ClearSite quotes start from ${FROM_PRICE}.`}
            />

            <div className="anim-fade-up mt-12 overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      Project
                    </th>
                    <th className="px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      SA market average
                    </th>
                    <th className="px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      Agency pricing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {market.map((row, i) => (
                    <tr key={row.label} className={i === market.length - 1 ? "" : "border-b border-line"}>
                      <td className="px-6 py-5 text-[15px] font-medium text-ink">{row.label}</td>
                      <td className="px-6 py-5 text-[15px] text-muted">{row.market}</td>
                      <td className="px-6 py-5 text-[15px] text-muted">{row.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="anim-fade-up mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-lime-soft/70 px-6 py-5 sm:flex-row sm:items-center">
              <p className="text-[15px] text-ink">
                <span className="font-semibold">Find out what yours would cost.</span>{" "}
                <span className="text-ink/70">Written quote, no obligation, usually within 1 business day.</span>
              </p>
              <Link href={quoteHref()} className="btn-ink btn-sm shrink-0">
                Get a quote
                <ArrowRight size={15} className="btn-arrow" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-light">All prices exclude domain registration if required.</p>
          </div>
        </section>

        <Contact
          title={
            <>
              Get a written quote. <span className="serif-accent text-lime">No obligation.</span>
            </>
          }
          intro="Tell me what you need and I'll confirm the scope and the price before anything starts."
        />
      </main>

      <Footer />
    </div>
  );
}
