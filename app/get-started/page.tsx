import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { whatsappLink } from "@/lib/sale";

const GetStartedForm = dynamic(() => import("@/components/GetStartedForm"));

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Clearsite Studios",
  description: "Send me your details about a closing-down-sale website package. WhatsApp is faster, but this form reaches me too.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/get-started",
  },
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span
            className="badge mb-6 anim-scale-in"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
          >
            Closing Down Sale
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Let&apos;s Get Started
          </h1>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            WhatsApp is the fastest way to reach me — but if you&apos;d rather send your details in
            writing, this form gets to me too.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4 anim-fade-up"
            style={{ animationDelay: "280ms" }}
          >
            WhatsApp me instead →
          </a>
        </div>
      </section>

      <main className="flex-1 section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">

            {/* Promise block */}
            <div
              className="rounded-2xl p-7 mb-8 text-center anim-fade-up"
              style={{ backgroundColor: "#ede9fe", border: "1px solid #ddd6fe" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#7c3aed" }}>
                What Happens Next
              </p>
              <p className="text-base leading-relaxed font-medium" style={{ color: "#3b0764" }}>
                I&apos;ll confirm the scope and the price before anything starts, then send you an
                invoice for the 50% deposit that secures your spot. The balance is invoiced once the
                site is live and handed over to you — hosting account, credentials and all. No
                monthly fee after that.
              </p>
            </div>

            {/* Form card */}
            <div
              className="rounded-2xl border bg-white p-8 md:p-10 shadow-sm mb-10 anim-fade-up"
              style={{ borderColor: "#e4e4e7", animationDelay: "100ms" }}
            >
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#111827" }}>
                Tell Us What You Need
              </h2>
              <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
                Not sure which package suits you? Select &ldquo;Unsure&rdquo; and we&apos;ll recommend the best fit.
              </p>
              <Suspense fallback={<div className="h-96 animate-pulse rounded-xl" style={{ backgroundColor: "#f4f4f5" }} />}>
                <GetStartedForm />
              </Suspense>
            </div>

            {/* Reassurance strip */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "✋", heading: "No obligation", body: "Asking costs nothing. Take your time deciding." },
                { icon: "🙋", heading: "You reach me directly", body: "One person reads this. No queue, no account manager." },
                { icon: "💬", heading: "No tech jargon", body: "Just a plain, honest conversation about what you need." },
              ].map((item, i) => (
                <div
                  key={item.heading}
                  className="rounded-2xl p-5 border text-center anim-fade-up"
                  style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa", animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{item.heading}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
