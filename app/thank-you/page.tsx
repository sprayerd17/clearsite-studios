import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Check } from "@/components/icons";

export const metadata: Metadata = {
  title: "Thank You | Clearsite Studios",
  description: "Thanks for reaching out to Clearsite Studios. We will be in touch within 1 business day.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/thank-you",
  },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="grain relative flex flex-1 items-center overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid-dark mask-radial-center pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.14), transparent 75%)" }}
        />

        <div className="container-site relative z-10 flex min-h-[80vh] flex-col items-center justify-center pb-24 pt-36 text-center sm:pt-40">
          <span className="rise grid h-16 w-16 place-items-center rounded-2xl bg-lime text-ink shadow-glow">
            <Check size={28} strokeWidth={2.5} />
          </span>

          <h1
            className="rise mt-10 text-[44px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-[72px]"
            style={{ animationDelay: "80ms" }}
          >
            Thank <span className="serif-accent text-lime">you!</span>
          </h1>

          <p
            className="rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            We&apos;ve received your message and will be in touch within 1 business day. In the meantime, feel free to have a look around.
          </p>

          <div
            className="rise mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/" className="btn-lime btn-lg">
              Back to home
              <ArrowRight size={17} className="btn-arrow" />
            </Link>
            <Link href="/blog" className="btn-ghost-dark btn-lg">
              Read the blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
