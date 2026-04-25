import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GetStartedForm = dynamic(() => import("@/components/GetStartedForm"));

export const metadata = {
  title: "Get Started | ClearSite Studios",
  description: "Tell us about your project and we'll be in touch within 1 business day.",
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
            Free Mockup Included
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Let&apos;s Get Started
          </h1>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Fill in your details below and we&apos;ll be in touch within 1 business day.
          </p>
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
                Our Promise to You
              </p>
              <p className="text-base leading-relaxed font-medium" style={{ color: "#3b0764" }}>
                We start with a free visual mockup so you can see your website before committing. If you love it, we&apos;ll agree a payment plan — deposit to start the build, remainder when you go live. No mockup cost, no surprises.
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
                { icon: "✋", heading: "No obligation", body: "Getting a quote costs nothing. Take your time deciding." },
                { icon: "📬", heading: "Reply within 1 business day", body: "You won't be left waiting — we reply promptly, every time." },
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
