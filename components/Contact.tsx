import Link from "next/link";
import { ArrowRight, Phone, WhatsApp } from "./icons";
import { PHONE_DISPLAY, TEL_LINK, whatsappLink } from "@/lib/site";

export default function Contact({
  title,
  intro,
}: {
  title?: React.ReactNode;
  intro?: string;
}) {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink py-28 text-white md:py-36">
      <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-340px] left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.22), rgba(198,242,78,0.06) 50%, transparent)" }}
      />
      <div className="container-site relative z-10 text-center">
        <span className="eyebrow eyebrow-dark anim-fade-up">Get in touch</span>
        <h2
          className="anim-fade-up mx-auto mt-6 max-w-4xl text-[40px] leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-[76px]"
          style={{ animationDelay: "80ms" }}
        >
          {title ?? (
            <>
              Let&apos;s build the thing your business{" "}
              <span className="serif-accent text-lime">runs on.</span>
            </>
          )}
        </h2>
        <p
          className="anim-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {intro ??
            "Request a written quote in about two minutes, or send me a WhatsApp — either way you're talking to me, not an inbox."}
        </p>

        <div
          className="anim-fade-up mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "240ms" }}
        >
          <Link href="/quote" className="btn-lime btn-lg">
            Get a quote
            <ArrowRight size={17} className="btn-arrow" />
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark btn-lg">
            <WhatsApp size={18} />
            WhatsApp me
          </a>
          <a href={TEL_LINK} className="btn-ghost-dark btn-lg">
            <Phone size={17} />
            Call {PHONE_DISPLAY}
          </a>
        </div>

        <p className="anim-fade-up mt-6 inline-flex items-center gap-2 text-[13px] text-white/40" style={{ animationDelay: "300ms" }}>
          <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-lime text-lime" />
          You&apos;re messaging Divan directly.
        </p>
      </div>
    </section>
  );
}
