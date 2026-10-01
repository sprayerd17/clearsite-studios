import Link from "next/link";
import type { ReactNode } from "react";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { ArrowRight, Check, MapPin, Smartphone, WhatsApp } from "./icons";

function Toast({
  icon,
  iconClass,
  title,
  meta,
  className,
  floatClass,
  delay,
}: {
  icon: ReactNode;
  iconClass: string;
  title: string;
  meta: string;
  className: string;
  floatClass: string;
  delay: string;
}) {
  return (
    <div className={`absolute z-20 rise ${className}`} style={{ animationDelay: delay }}>
      <div
        className={`flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl ${floatClass}`}
      >
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconClass}`}>{icon}</span>
        <span className="text-left">
          <span className="block text-[13px] font-semibold leading-tight tracking-tight text-ink">{title}</span>
          <span className="block text-[11.5px] leading-tight text-muted">{meta}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      {/* Background: grid + light */}
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[720px] w-[1200px] -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, rgba(198,242,78,0.16), rgba(198,242,78,0.05) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 155deg, rgba(255,255,255,0.07) 180deg, transparent 205deg)",
        }}
      />

      <div className="container-site relative z-10 pt-32 text-center sm:pt-40 lg:pt-44">
        <Link
          href="/#workflows"
          className="rise group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3.5 text-[13px] text-white/70 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
        >
          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-ink">New</span>
          Custom business workflows
          <ArrowRight size={14} className="text-white/40 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1
          className="rise mx-auto mt-7 max-w-[15ch] text-[42px] font-semibold leading-[1.02] tracking-tightest text-white sm:max-w-none sm:text-6xl lg:text-[82px]"
          style={{ animationDelay: "80ms" }}
        >
          Websites that win customers.
          <br className="hidden sm:block" />{" "}
          <span className="serif-accent pr-1 text-lime">Workflows</span>{" "}
          <span className="text-white/90">that run the rest.</span>
        </h1>

        <p
          className="rise mx-auto mt-7 max-w-[620px] text-base leading-relaxed text-white/60 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          ClearSite Studios designs fast, modern websites for South African businesses — and builds
          the custom tools behind them, so quotes, approvals, invoices and payments stop living in
          spreadsheets and WhatsApp threads.
        </p>

        <div
          className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link href="/quote" className="btn-lime btn-lg w-full sm:w-auto">
            Get a quote
            <ArrowRight size={17} className="btn-arrow" />
          </Link>
          <Link href="/portfolio" className="btn-ghost-dark btn-lg w-full sm:w-auto">
            See the work
          </Link>
        </div>

        <ul
          className="rise mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/45"
          style={{ animationDelay: "320ms" }}
        >
          {["Websites from R800", "No monthly fee", "Yours outright"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Check size={14} strokeWidth={2.25} className="text-lime" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Product composition — half on ink, half on paper */}
      <div className="relative z-10 mt-16 sm:mt-20">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[34%] bg-paper" />
        <div aria-hidden="true" className="hairline absolute inset-x-0 bottom-[34%]" />

        <div className="relative mx-auto max-w-[1120px] px-5 pb-10 sm:px-8 sm:pb-16">
          <div className="rise relative" style={{ animationDelay: "380ms" }}>
            <div
              aria-hidden="true"
              className="absolute -inset-x-16 -top-10 bottom-1/3 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.18), transparent)" }}
            />
            <div className="relative mr-[16%] sm:mr-[20%]">
              <BrowserFrame
                src="/work/beaver.webp"
                alt="Beaver Tree Felling & Gardening Services website, built by ClearSite Studios"
                domain="beavertreefellinggardeningservices.co.za"
                priority
                sizes="(max-width: 768px) 85vw, 880px"
              />
            </div>

            <div className="absolute -bottom-[6%] right-0 w-[36%] max-w-[290px] sm:w-[27%]">
              <PhoneFrame
                src="/work/beaver-mobile.webp"
                alt="Beaver Tree Felling & Gardening Services website on a phone, built by ClearSite Studios"
                priority
                sizes="(max-width: 768px) 36vw, 290px"
              />
            </div>
          </div>

          <Toast
            className="left-1 top-[22%] hidden sm:block lg:-left-6"
            floatClass="float-a"
            delay="900ms"
            iconClass="bg-[#25d366] text-white"
            icon={<WhatsApp size={18} />}
            title="WhatsApp contact button"
            meta="Customers message in one tap"
          />
          <Toast
            className="-top-[5%] right-[22%] sm:-top-[4%] sm:right-[25%]"
            floatClass="float-b"
            delay="1150ms"
            iconClass="bg-lime text-ink"
            icon={<Smartphone size={18} />}
            title="Mobile-first layout"
            meta="Designed for phones first"
          />
          <Toast
            className="bottom-[11%] right-[30%] hidden md:block"
            floatClass="float-c"
            delay="1400ms"
            iconClass="bg-ink text-lime"
            icon={<MapPin size={18} />}
            title="Live client site"
            meta="Beaver Tree Felling · Cape Town"
          />
        </div>
      </div>
    </section>
  );
}
