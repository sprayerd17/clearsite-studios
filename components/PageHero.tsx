import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "./icons";

/** Dark hero used at the top of every inner page. Sits under the fixed navbar. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  back,
  align = "center",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  back?: { href: string; label: string };
  align?: "center" | "left";
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-300px] h-[600px] w-[1000px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.13), transparent 75%)" }}
      />
      <div
        className={`container-site relative z-10 pb-20 pt-36 sm:pb-24 sm:pt-44 ${centered ? "text-center" : ""}`}
      >
        {back && (
          <Link
            href={back.href}
            className="rise mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            {back.label}
          </Link>
        )}
        <div>
          <span className="rise eyebrow eyebrow-dark">{eyebrow}</span>
        </div>
        <h1
          className={`rise mt-6 text-[40px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-[72px] ${
            centered ? "mx-auto max-w-4xl" : "max-w-4xl"
          }`}
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={`rise mt-6 text-base leading-relaxed text-white/55 sm:text-lg ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
            style={{ animationDelay: "160ms" }}
          >
            {intro}
          </p>
        )}
        {children && (
          <div className="rise mt-9" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
