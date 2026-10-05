import { ArrowUpRight, FileText, Mail, WhatsApp } from "@/components/icons";
import type { Totals } from "@/lib/quote/leads";
import { STATUS } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import type { LeadStatus } from "@/lib/quote/types";
import { Label } from "./ui";

export interface AsideDoc {
  href: string;
  label: string;
  detail: string;
}

/** Project summary, documents and a direct line to the studio. */
export default function ProjectAside({
  number,
  status,
  startedOn,
  totals,
  monthly = 0,
  showMoney,
  docs,
  contactFirst,
  email,
  whatsappHref,
}: {
  number: number;
  status: LeadStatus;
  startedOn: string;
  totals: Totals;
  /** Monthly fee on the quote, 0 if none. */
  monthly?: number;
  /** Once a quote has been sent. */
  showMoney: boolean;
  docs: AsideDoc[];
  contactFirst: string;
  email: string;
  whatsappHref: string;
}) {
  const accepted = ["accepted", "building", "launched", "complete"].includes(status);

  return (
    <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
      <section className="card p-6">
        <Label>Project summary</Label>
        <dl className="mt-4 divide-y divide-line text-sm">
          <Item label="Project" value={`#${number}`} />
          <Item label="Status" value={STATUS[status].label} />
          <Item label="Requested" value={startedOn} />
          {showMoney && <Item label="Total" value={formatRand(totals.total)} strong />}
          {showMoney && monthly > 0 && <Item label="Monthly" value={`${formatRand(monthly)}/month`} />}
          {showMoney && accepted && <Item label="Paid" value={formatRand(totals.paid)} />}
          {showMoney && accepted && (
            <Item label="Outstanding" value={formatRand(totals.outstanding)} strong={totals.outstanding > 0} />
          )}
        </dl>

        {docs.length > 0 && (
          <div className="mt-6">
            <Label>Documents</Label>
            <ul className="mt-3 space-y-2">
              {docs.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2.5 transition-colors hover:border-ink/25"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper text-ink">
                      <FileText size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{d.label}</span>
                      <span className="block text-xs text-muted">{d.detail}</span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="grain relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lift">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.2), transparent)" }}
        />
        <div className="relative z-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Questions?</span>
          <p className="mt-3 text-lg font-medium leading-snug tracking-tight text-white">
            Message {contactFirst}
            {" directly — you'll get a real person, not a ticket."}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime btn-sm mt-5 w-full"
          >
            <WhatsApp size={16} />
            WhatsApp {contactFirst}
          </a>
          {email && (
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(`Project #${number}`)}`}
              className="mt-3 flex items-center justify-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <Mail size={15} />
              {email}
            </a>
          )}
        </div>
      </section>
    </aside>
  );
}

function Item({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right tabular-nums text-ink ${strong ? "font-semibold" : "font-medium"}`}>{value}</dd>
    </div>
  );
}
