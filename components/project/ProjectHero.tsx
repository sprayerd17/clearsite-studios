import Link from "next/link";
import { WhatsApp } from "@/components/icons";
import Logo from "@/components/Logo";
import { STATUS } from "@/lib/quote/leads";
import type { LeadStatus } from "@/lib/quote/types";
import Stepper from "./Stepper";

const COPY: Record<LeadStatus, { headline: string; next: string }> = {
  new: {
    headline: "your quote is on its way.",
    next: "I'm going through your brief. Your quote will appear right here — usually within 1 business day.",
  },
  quoted: {
    headline: "your quote is ready.",
    next: "Have a look below, and accept it when you're happy. Questions first? Just message me.",
  },
  accepted: {
    headline: "let's get you started.",
    next: "Pay the deposit to lock in your spot, and start sending me your logo, photos and text.",
  },
  building: {
    headline: "your project is in build.",
    next: "I'm on it. Keep adding content below — I'll send you a preview for feedback before launch.",
  },
  launched: {
    headline: "you're live.",
    next: "Your project is live and handed over. The final invoice is below.",
  },
  complete: {
    headline: "it's all yours.",
    next: "Paid in full and handed over. Thank you for working with me.",
  },
  closed: {
    headline: "thanks for getting in touch.",
    next: "This project is closed. If you'd like to pick it up again, just send me a message.",
  },
};

/** Statuses where the client has something to do. */
const YOUR_MOVE: LeadStatus[] = ["quoted", "accepted", "launched"];

/** Dark header bar, greeting and progress at the top of the project page. */
export default function ProjectHero({
  status,
  greetingName,
  number,
  business,
  startedOn,
  whatsappHref,
}: {
  status: LeadStatus;
  greetingName: string;
  number: number;
  business: string;
  startedOn: string;
  whatsappHref: string;
}) {
  const copy = COPY[status];
  const yourMove = YOUR_MOVE.includes(status);

  return (
    <div className="grain relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[620px] w-[1000px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.12), transparent 75%)" }}
      />

      <header className="relative z-10 border-b border-white/[0.08]">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="ClearSite Studios home" className="shrink-0">
            <Logo tone="light" />
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark btn-sm shrink-0">
            <WhatsApp size={15} className="text-[#25d366]" />
            <span className="hidden min-[420px]:inline">Questions?</span> WhatsApp
          </a>
        </div>
      </header>

      <div className="container-site relative z-10 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="rise flex flex-wrap items-center gap-2">
          <span className="chip-dark font-mono uppercase tracking-[0.12em]">Project #{number}</span>
          {business && <span className="chip-dark">{business}</span>}
          <span className="chip-dark">
            <span className={`h-1.5 w-1.5 rounded-full ${yourMove ? "bg-lime" : "bg-white/40"}`} />
            {STATUS[status].label}
          </span>
        </div>

        <h1
          className="rise mt-6 max-w-3xl text-[38px] font-semibold leading-[1.04] tracking-tightest text-white sm:text-5xl lg:text-[60px]"
          style={{ animationDelay: "60ms" }}
        >
          Hi {greetingName},
          <br />
          <span className="serif-accent text-lime">{copy.headline}</span>
        </h1>

        <p
          className="rise mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base"
          style={{ animationDelay: "120ms" }}
        >
          {copy.next}
        </p>

        {status !== "closed" && (
          <div className="rise mt-10 max-w-3xl sm:mt-12" style={{ animationDelay: "180ms" }}>
            <Stepper status={status} />
          </div>
        )}

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">Requested {startedOn}</p>
      </div>
    </div>
  );
}
