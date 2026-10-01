"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { PhoneFrame } from "./Frames";
import {
  ArrowRight,
  BarChart,
  Bell,
  Box,
  Calendar,
  Camera,
  Chat,
  Check,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileText,
  Layers,
  MessageCircle,
  Search,
  Smartphone,
  Sparkle,
  Table,
  Users,
  WhatsApp,
  X,
} from "./icons";
import { WORKFLOW_MESSAGE, radSteps, whatsappLink } from "@/lib/site";

const STEP_MS = 6500;

const before = [
  "Quotes typed into an Excel template, one by one",
  "Photos and approvals scattered across WhatsApp chats",
  "“Did they say yes to that?” — no record of decisions",
  "Invoices rebuilt by hand, payments tracked from memory",
];

const after = [
  "Each job gets a private link the client keeps — no app, no login",
  "Extra work approved per item, with photos, on record",
  "Quote and invoice PDFs generated from the job automatically",
  "Push notification the moment a client accepts, approves or sends proof of payment",
];

const capabilityGroups = [
  {
    label: "Run the day-to-day",
    items: [
      { icon: FileText, label: "Quotes & invoices" },
      { icon: Layers, label: "Job & order tracking" },
      { icon: Check, label: "Client approvals" },
      { icon: CreditCard, label: "Payments & proof of payment" },
      { icon: Calendar, label: "Bookings & enquiries" },
      { icon: Users, label: "Staff schedules & job cards" },
      { icon: Box, label: "Stock & inventory" },
      { icon: ClipboardCheck, label: "Digital forms & checklists" },
      { icon: Search, label: "Price lists & services" },
      { icon: Camera, label: "Photo records" },
      { icon: BarChart, label: "Dashboards & reports" },
    ],
  },
  {
    label: "Automation & AI",
    items: [
      { icon: Bell, label: "Push notifications" },
      { icon: MessageCircle, label: "WhatsApp-ready messages" },
      { icon: Clock, label: "Automatic reminders & follow-ups" },
      { icon: Sparkle, label: "AI-drafted quotes & replies" },
      { icon: Table, label: "Read invoices & receipts automatically" },
      { icon: Chat, label: "Website assistant that answers FAQs" },
      { icon: Smartphone, label: "Runs on your phone like an app" },
    ],
  },
];

export default function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % radSteps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, running]);

  const isOwnerView = active === radSteps.length - 1;
  const isDocument = active === 3;

  return (
    <section id="workflows" className="grain section relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[30%] h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.12), transparent)" }}
      />

      <div className="container-site relative z-10">
        <SectionHeading
          tone="dark"
          eyebrow="Business workflows"
          title={
            <>
              From spreadsheets and voice notes to{" "}
              <span className="serif-accent text-lime">one link per job.</span>
            </>
          }
          intro="Most small businesses run on Excel templates, paper and a WhatsApp thread per customer. I build custom tools around the way you already work — so quotes, approvals, invoices and payments happen in one place, and your customers never have to download a thing."
        />

        {/* ── Case study ─────────────────────────────────────────────── */}
        <div
          ref={rootRef}
          className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="anim-fade-up">
            <div className="flex items-center gap-4">
              <Image
                src="/work/rad-logo.webp"
                alt="RAD Cricket logo"
                width={52}
                height={52}
                className="rounded-full ring-1 ring-white/15"
              />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Case study</p>
                <p className="mt-0.5 text-lg font-semibold tracking-tight text-white">
                  RAD Cricket <span className="font-normal text-white/45">· Bat refurbs & repairs</span>
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/55">
              A job, quote and invoice system that replaced an Excel routine. The owner runs it from
              their phone; every client gets a live page for their bat — from quote to collection.
            </p>

            <ol className="mt-8 space-y-2" aria-label="How the RAD Cricket workflow runs">
              {radSteps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "step" : undefined}
                      className={`relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        on
                          ? "border-white/15 bg-white/[0.06]"
                          : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[11px] transition-colors ${
                            on ? "bg-lime text-ink" : "bg-white/[0.06] text-white/50"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`text-[15px] font-medium tracking-tight transition-colors sm:text-base ${on ? "text-white" : "text-white/55"}`}>
                          {s.title}
                        </span>
                      </div>
                      <div
                        className={`grid transition-all duration-500 ${on ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <p className="overflow-hidden pl-11 text-sm leading-relaxed text-white/55">{s.body}</p>
                      </div>
                      {on && (
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]">
                          <span
                            key={`${active}-${running}`}
                            className="block h-full origin-left bg-lime"
                            style={{
                              animation: running ? `_progress ${STEP_MS}ms linear forwards` : "none",
                              transform: running ? undefined : "scaleX(0)",
                            }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Phone */}
          <div className="anim-fade-up relative mx-auto w-full max-w-[340px] lg:max-w-[360px]" style={{ animationDelay: "120ms" }}>
            <div
              aria-hidden="true"
              className="absolute -inset-16 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.16), transparent)" }}
            />
            <PhoneFrame className="relative">
              {radSteps.map((s, i) => (
                <Image
                  key={s.screen}
                  src={s.screen}
                  alt={s.screenAlt}
                  fill
                  sizes="360px"
                  className={`object-cover object-top transition-all duration-700 ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                  }`}
                />
              ))}
            </PhoneFrame>

            <div className="absolute -left-4 top-[14%] rounded-full border border-white/10 bg-ink-800/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 shadow-xl backdrop-blur sm:-left-14">
              <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${isOwnerView ? "bg-sky-400" : "bg-lime"}`} />
              {isOwnerView ? "Owner's view" : isDocument ? "Generated PDF" : "Client's view"}
            </div>

            <div className="absolute -right-3 bottom-[16%] hidden items-center gap-2.5 rounded-2xl border border-black/[0.06] bg-white py-2.5 pl-2.5 pr-4 text-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] sm:-right-12 sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#25d366] text-white">
                <WhatsApp size={16} />
              </span>
              <span>
                <span className="block text-[12.5px] font-semibold leading-tight">Sent on WhatsApp</span>
                <span className="block text-[11px] leading-tight text-muted">Message already typed</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Before / after ─────────────────────────────────────────── */}
        <div className="mt-24 grid gap-4 md:grid-cols-2 lg:mt-28">
          <div className="card-dark anim-fade-up p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06] text-white/50">
                <Table size={17} />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Before</p>
            </div>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-snug text-white/50">
                  <X size={16} className="mt-0.5 shrink-0 text-white/25" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="anim-fade-up relative overflow-hidden rounded-3xl border border-lime/25 bg-lime/[0.06] p-7 sm:p-9"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-ink">
                <Check size={17} strokeWidth={2.4} />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">After</p>
            </div>
            <ul className="mt-6 space-y-4">
              {after.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] leading-snug text-white/85">
                  <Check size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-lime" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── What else ──────────────────────────────────────────────── */}
        <div className="mt-20 flex flex-col items-start justify-between gap-10 border-t border-white/[0.08] pt-12 lg:flex-row lg:items-center">
          <div className="anim-fade-up max-w-md">
            <h3 className="text-2xl tracking-tight text-white sm:text-3xl">Every business runs differently.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55">
              Tell me how yours works today — the spreadsheets, the paper, the back-and-forth — and
              I&apos;ll show you what it could look like as one system.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quote?service=workflow" className="btn-lime">
                Get a workflow quote
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
              <a
                href={whatsappLink(WORKFLOW_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark"
              >
                <WhatsApp size={16} />
                Talk it through
              </a>
            </div>
          </div>
          <div className="anim-fade-up max-w-2xl space-y-6" style={{ animationDelay: "120ms" }}>
            {capabilityGroups.map((g) => (
              <div key={g.label}>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((c) => (
                    <li key={c.label} className="chip-dark py-1.5 text-[13px]">
                      <c.icon size={14} className="text-lime" />
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes _progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
}
