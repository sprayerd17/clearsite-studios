import { PHONE_DISPLAY, TEL_LINK, whatsappLink } from "@/lib/sale";

export default function Contact() {
  return (
    <section id="contact" className="section bg-[#1e1b4b] text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative container-narrow">
        <div className="max-w-xl mx-auto text-center">
          <span
            className="badge mb-4 anim-scale-in"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
          >
            Get in Touch
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 text-white anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Message me directly.
          </h2>
          <p
            className="text-slate-400 mb-8 leading-relaxed anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            No forms and no waiting on email. Send me a WhatsApp and you&apos;ll be talking to me,
            not an inbox.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center anim-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              WhatsApp me →
            </a>
            <a
              href={TEL_LINK}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "#e2e8f0" }}
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>

          <p
            className="mt-5 text-xs text-slate-500 anim-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            You&apos;re messaging Divan directly.
          </p>
        </div>
      </div>
    </section>
  );
}
