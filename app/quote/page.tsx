import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "@/components/icons";
import QuoteBuilder from "@/components/quote/QuoteBuilder";
import QuoteBuilderSkeleton from "@/components/quote/QuoteBuilderSkeleton";
import QuoteSidebar from "@/components/quote/QuoteSidebar";
import { FROM_PRICE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a quote | ClearSite Studios",
  description:
    "Answer a few quick questions about the website or business workflow you need, and get a written quote in about 2 minutes. No obligation.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/quote",
  },
};

export default function QuotePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Compact hero — same treatment as PageHero, shorter so the form starts sooner. */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(198,242,78,0.13),transparent_75%)]"
        />
        <div className="container-site relative z-10 pb-14 pt-36 sm:pb-16 sm:pt-44">
          <span className="rise eyebrow eyebrow-dark">Get a quote</span>
          <h1
            className="rise mt-6 max-w-3xl text-[38px] font-semibold leading-[1.04] tracking-tightest text-white sm:text-5xl lg:text-[60px]"
            style={{ animationDelay: "80ms" }}
          >
            Tell me what you need. <span className="serif-accent text-lime">I&apos;ll quote it.</span>
          </h1>
          <p
            className="rise mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Answer a few quick questions — about two minutes, mostly tapping. I&apos;ll send a written quote
            to your own project page, usually within 1 business day.
          </p>
          <ul
            className="rise mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60"
            style={{ animationDelay: "240ms" }}
          >
            {[`Websites from ${FROM_PRICE}`, "Yours outright", "No obligation"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check size={15} strokeWidth={2.4} className="text-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className="flex-1 bg-paper">
        <section className="py-10 sm:py-14 lg:py-16">
          <div className="container-site">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_350px] xl:gap-10">
              <div className="rise min-w-0" style={{ animationDelay: "120ms" }}>
                <Suspense fallback={<QuoteBuilderSkeleton />}>
                  <QuoteBuilder />
                </Suspense>
              </div>
              <QuoteSidebar />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
