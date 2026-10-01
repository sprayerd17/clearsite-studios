import { Clock, Phone, Shield, User, WhatsApp } from "@/components/icons";
import { PHONE_DISPLAY, TEL_LINK, whatsappLink } from "@/lib/site";

const NEXT_STEPS = [
  {
    title: "I review your brief",
    body: "I read every request myself and work out exactly what you need.",
  },
  {
    title: "You get a written quote",
    body: "Itemised, on your own private project page — usually within 1 business day.",
  },
  {
    title: "Accept in one tap",
    body: "Happy with it? Accept in one tap, pay the 50% deposit, and we start.",
  },
];

const ASSURANCES = [
  { icon: Shield, title: "No obligation", body: "A quote costs nothing, and you're free to say no." },
  { icon: User, title: "You deal with Divan directly", body: "The person who quotes your project is the one who builds it." },
  { icon: Clock, title: "Quick reply", body: "Usually within 1 business day, often sooner." },
];

/** "What happens next" panel beside the quote builder. Sticky on large screens. */
export default function QuoteSidebar() {
  return (
    <aside className="rise space-y-4 lg:sticky lg:top-28" style={{ animationDelay: "200ms" }} aria-label="About your quote">
      <div className="card p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">What happens next</p>
        <ol className="mt-6">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
              {i < NEXT_STEPS.length - 1 && (
                <span aria-hidden="true" className="absolute bottom-0 left-4 top-9 w-px bg-line" />
              )}
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-lime">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grain relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(198,242,78,0.18),transparent)]"
        />
        <div className="relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">Prefer to chat?</p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            Rather explain it in your own words? Send me a WhatsApp and I&apos;ll take it from there.
          </p>
          <a
            href={whatsappLink("Hi Divan, I'd like a quote for a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime mt-5 w-full"
          >
            <WhatsApp size={17} />
            Chat on WhatsApp
          </a>
          <a
            href={TEL_LINK}
            className="mt-3 flex items-center justify-center gap-2 py-1.5 text-sm text-white/50 hover:text-white"
          >
            <Phone size={14} />
            or call {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <ul className="space-y-4 rounded-3xl border border-line bg-white/60 p-6">
        {ASSURANCES.map((a) => (
          <li key={a.title} className="flex gap-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink">
              <a.icon size={16} />
            </span>
            <div>
              <p className="text-[14.5px] font-semibold tracking-tight text-ink">{a.title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{a.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
