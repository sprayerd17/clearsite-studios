import Link from "next/link";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import {
  ArrowUpRight,
  Bag,
  Check,
  FileText,
  Globe,
  Key,
  Refresh,
  Table,
  Workflow,
} from "./icons";

const workflowRows = [
  { label: "Quote sent", meta: "WhatsApp link · 10:02", done: true },
  { label: "Client accepted", meta: "One tap · 10:03", done: true },
  { label: "Extra work approved", meta: "With photos · 10:05", done: true },
  { label: "Invoice issued", meta: "PDF #410 · 10:06", done: true },
];

const smallCards = [
  {
    icon: Refresh,
    eyebrow: "Redesign & enhance",
    title: "Transform what you have.",
    body: "Got a site that's outdated, slow, or just not converting? I'll turn it into something you're proud to share — sharper, faster, and built to perform.",
    points: ["Full visual overhaul", "Speed & performance optimisation", "Improved user experience", "Retain your existing content & SEO"],
    href: "/quote?service=redesign",
    cta: "Refresh my site",
  },
  {
    icon: Bag,
    eyebrow: "E-commerce store",
    title: "Sell more, stress less.",
    body: "Online stores that make buying effortless for your customers and managing orders simple for you — from single products to full catalogues.",
    points: ["Product listings & smart filters", "Secure checkout & payments", "Inventory & order management", "Promotions, discounts & upsells"],
    href: "/quote?service=store",
    cta: "Build my store",
  },
  {
    icon: Key,
    eyebrow: "Ownership",
    title: "Yours outright. No lock-in.",
    body: "Everything goes live under accounts in your name and the credentials are handed over on completion. Want me to keep looking after it? Add an optional monthly hosting & support plan.",
    points: ["Code and content are yours", "Hosting account in your name", "Logins handed over", "Optional hosting & support plan"],
    href: "/pricing#ownership",
    cta: "What the price includes",
  },
];

export default function Services() {
  return (
    <section id="services" className="section relative bg-paper">
      <div className="container-site">
        <SectionHeading
          eyebrow="What I build"
          title={
            <>
              Two things every growing business{" "}
              <span className="serif-accent">needs.</span>
            </>
          }
          intro="A website that brings customers in, and a system that looks after them once they're there. I build both — on their own, or as one joined-up setup."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:gap-5">
          {/* ── Websites ───────────────────────────────────────────── */}
          <article className="card card-hover anim-fade-up group relative flex flex-col overflow-hidden lg:col-span-3">
            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lime">
                  <Globe size={19} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Websites</span>
              </div>
              <h3 className="mt-6 text-2xl tracking-tight text-ink sm:text-[28px]">
                Websites that earn trust in seconds.
              </h3>
              <p className="prose-muted mt-3 max-w-md text-[15px]">
                Starting from scratch? I design and build a fully custom website that reflects your
                brand, speaks to your audience, and is ready to grow with your business from day one.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Custom design tailored to your brand", "Mobile-first & fully responsive", "Fast load times, built for SEO", "Ready to launch in days, not months"].map((p) => (
                  <li key={p} className="chip">
                    <Check size={12} strokeWidth={2.5} className="text-ink" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-1 flex-col px-7 sm:px-9">
              <div className="flex flex-1 translate-y-6 flex-col overflow-hidden rounded-t-2xl border border-b-0 border-line bg-white shadow-card transition-transform duration-500 group-hover:translate-y-3">
                <div className="flex items-center gap-1.5 border-b border-line bg-paper/70 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="ml-3 font-mono text-[10px] text-muted">hookedbybella.co.za</span>
                </div>
                <div className="relative min-h-[240px] w-full flex-1">
                  <Image
                    src="/work/hookedbybella.webp"
                    alt="Hooked by Bella website, built by ClearSite Studios"
                    fill
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* ── Business workflows ─────────────────────────────────── */}
          <article
            className="card-hover anim-fade-up group relative flex flex-col overflow-hidden rounded-3xl bg-ink text-white shadow-lift lg:col-span-3"
            style={{ animationDelay: "100ms" }}
          >
            <div aria-hidden="true" className="bg-grid-dark mask-radial-center pointer-events-none absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.22), transparent)" }}
            />
            <div className="relative p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink">
                  <Workflow size={19} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                  Business workflows
                </span>
              </div>
              <h3 className="mt-6 text-2xl tracking-tight text-white sm:text-[28px]">
                Systems that replace the spreadsheet.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
                Quotes, job tracking, client approvals, invoices and payments — built around the way
                you already work, and running from your phone.
              </p>
            </div>

            <div className="relative mt-auto grid gap-3 px-7 pb-7 sm:px-9 sm:pb-9">
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/40">
                <Table size={17} />
                <span className="line-through decoration-white/30">quotes_FINAL_v3.xlsx</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/30">retired</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur">
                {workflowRows.map((r, i) => (
                  <div
                    key={r.label}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i % 2 === 0 ? "bg-white/[0.03]" : ""}`}
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-lime/15 text-lime">
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                    <span className="text-sm text-white/85">{r.label}</span>
                    <span className="ml-auto font-mono text-[11px] text-white/35">{r.meta}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center gap-3 rounded-xl bg-lime px-3 py-2.5 text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-lime">
                    <FileText size={13} />
                  </span>
                  <span className="text-sm font-semibold">Paid · R600.00</span>
                  <span className="ml-auto font-mono text-[11px] text-ink/60">EFT · 10:06</span>
                </div>
              </div>
              <Link
                href="/#workflows"
                className="link-arrow mt-2 text-white/70 hover:text-lime"
              >
                See a real workflow I built
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>

          {/* ── Supporting services ────────────────────────────────── */}
          {smallCards.map((c, i) => (
            <article
              key={c.eyebrow}
              className="card card-hover anim-fade-up flex flex-col p-7 lg:col-span-2"
              style={{ animationDelay: `${(i + 2) * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-paper text-ink">
                  <c.icon size={19} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{c.eyebrow}</span>
              </div>
              <h3 className="mt-6 text-xl tracking-tight text-ink">{c.title}</h3>
              <p className="prose-muted mt-2.5 text-[14.5px]">{c.body}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check size={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-lime-deep" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={c.href} className="link-arrow mt-6 text-ink hover:text-muted">
                {c.cta}
                <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
