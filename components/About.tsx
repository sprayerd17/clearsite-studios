import Link from "next/link";
import { ArrowRight, Key, Smartphone, User, Workflow } from "./icons";
import { LogoMark } from "./Logo";
import { MATHLY_URL } from "@/lib/site";

const stats = [
  { value: "3–21", unit: "days", label: "Typical website build time" },
  { value: "1", unit: "link", label: "Your quote, invoices and uploads in one place" },
  { value: "100%", unit: "", label: "Of the code and accounts handed over" },
  { value: "1", unit: "person", label: "You deal with me, start to finish" },
];

const values = [
  { icon: User, heading: "You deal with me", body: "No account manager, no queue. One person, start to finish." },
  { icon: Key, heading: "Handed over in full", body: "Code, hosting account and credentials. Yours outright on completion." },
  { icon: Smartphone, heading: "Mobile first", body: "Most of your visitors are on a phone. That's where I start." },
  { icon: Workflow, heading: "Built around you", body: "Systems shaped to how your business already runs — not the other way round." },
];

export default function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="anim-fade-left">
            <span className="eyebrow">The founder</span>
            <h2 className="mt-5 text-[34px] leading-[1.04] tracking-tightest text-ink sm:text-5xl lg:text-[56px]">
              One person behind this.{" "}
              <span className="serif-accent text-muted">That person is me.</span>
            </h2>
            <div className="mt-8 space-y-5 text-[16.5px] leading-relaxed text-muted">
              <p>
                I&apos;m <span className="font-medium text-ink">Divan Bosman</span>. I started
                ClearSite Studios to build clean, fast websites for South African small businesses
                without the agency price tag — and it has grown into building the systems those
                businesses run on, too. I design, code, deploy and hand over every project myself.
              </p>
              <p>
                Outside of client work I&apos;m building{" "}
                <a
                  href={MATHLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
                >
                  Mathly
                </a>
                , a maths education platform for South African learners — a personal project, and
                the clearest example I can offer of what I&apos;m able to build.
              </p>
              <p>
                Every site and system is handed over complete, in your name, with nothing left
                depending on me.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/quote" className="btn-ink">
                Get a quote
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
              <Link href="/about" className="btn-ghost">
                More about the studio
              </Link>
            </div>
          </div>

          <div className="anim-fade-right">
            <div className="grain relative overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-lift sm:p-9">
              <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_70%)]" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime font-serif text-2xl italic text-ink">
                    DB
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight">Divan Bosman</p>
                    <p className="text-sm text-white/50">Founder · Designer · Developer</p>
                  </div>
                </div>
                <LogoMark tone="light" size={30} />
              </div>

              <dl className="relative z-10 mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.08]">
                {stats.map((s) => (
                  <div key={s.label} className="bg-ink-800 p-5">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="text-3xl font-semibold tracking-tightest text-white sm:text-4xl">{s.value}</span>
                      {s.unit && <span className="ml-1 text-sm text-white/45">{s.unit}</span>}
                      <p className="mt-1.5 text-[13px] leading-snug text-white/50">{s.label}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={v.heading}
                  className="anim-fade-up rounded-2xl border border-line bg-paper/60 p-5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <v.icon size={18} className="text-ink" />
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{v.heading}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
