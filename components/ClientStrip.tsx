/** Text wordmarks for recent projects — each nods to the project's own type. */
const marks = [
  { name: "Hooked by Bella", className: "font-serif text-[26px] italic tracking-normal" },
  { name: "BEAVER", sub: "Tree Felling & Gardening", className: "text-[19px] font-bold tracking-[0.28em]" },
  { name: "RAD CRICKET", sub: "Refurbs & Repairs", className: "text-[19px] font-extrabold tracking-[0.04em]" },
  { name: "Mathly", className: "font-serif text-[27px] font-normal tracking-tight" },
];

export default function ClientStrip() {
  return (
    <section aria-label="Recent projects" className="bg-paper">
      <div className="container-site">
        <div className="flex flex-col items-center gap-8 border-b border-line pb-14 pt-6 lg:flex-row lg:justify-between lg:gap-12">
          <p className="max-w-[230px] text-center text-[13px] leading-snug text-muted lg:text-left">
            Built for South African businesses — and running right now.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:justify-end">
            {marks.map((m) => (
              <li key={m.name} className="flex flex-col items-center text-ink/45 transition-colors duration-300 hover:text-ink">
                <span className={`leading-none ${m.className}`}>{m.name}</span>
                {m.sub && (
                  <span className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] opacity-80">{m.sub}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
