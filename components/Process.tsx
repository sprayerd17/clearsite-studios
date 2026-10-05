import SectionHeading from "./SectionHeading";
import { Code, Handshake, Key, WhatsApp } from "./icons";

const steps = [
  {
    icon: WhatsApp,
    title: "Request a quote",
    description:
      "Tap through a two-minute brief, or just WhatsApp me — a website, a workflow, or both. You're talking to me, not a sales team.",
  },
  {
    icon: Handshake,
    title: "We agree the scope and price",
    description:
      "Your written quote lands on your own project page. Accept it in one tap and I invoice the 50% deposit that secures your spot. The balance is invoiced on completion.",
  },
  {
    icon: Code,
    title: "I build it",
    description:
      "Upload your content straight to your project page. Websites take 3 to 21 days depending on size, counted from when your content is in; workflows get their own timeline in the quote. You see it and get your revisions before it goes live.",
  },
  {
    icon: Key,
    title: "Launch and handover",
    description:
      "Everything goes live under accounts in your name, and I hand you the credentials. It's yours outright with no lock-in — and if you'd like me to look after hosting, updates and support, that's an optional monthly plan on your quote.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section relative overflow-hidden bg-paper">
      <div aria-hidden="true" className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000,transparent)]" />
      <div className="container-site relative">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              From first message to <span className="serif-accent">handover.</span>
            </>
          }
          intro="Four steps, no drawn-out process. Here's exactly what happens."
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[50px] hidden h-px lg:block"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(10,11,13,0.18) 50%, transparent 50%)", backgroundSize: "8px 1px" }}
          />
          <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="anim-fade-up relative"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <div className="card card-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 grid h-11 w-11 place-items-center rounded-2xl bg-ink text-lime">
                      <s.icon size={19} />
                    </span>
                    <span className="font-mono text-xs text-muted-light">0{i + 1} / 04</span>
                  </div>
                  <h3 className="mt-7 text-lg tracking-tight text-ink">{s.title}</h3>
                  <p className="prose-muted mt-2.5 text-[14.5px]">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
