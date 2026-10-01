import type { ReactNode } from "react";
import { Check } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { formatDate, lineTotal, quoteExpiresAt, totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { displayPhone } from "@/lib/quote/phone";
import type { Settings } from "@/lib/quote/types";
import type { PublicLead } from "@/lib/server/public";
import { bankRows, docDate, docInfo, type DocKind } from "./helpers";

interface SumRow {
  label: string;
  value: string;
}

/**
 * The quote / deposit invoice / final invoice as a clean A4 page. White paper,
 * ink text, and the lime only on the logo and the amount-due bar.
 */
export default function ProjectDocument({
  lead,
  settings,
  kind,
}: {
  lead: PublicLead;
  settings: Settings;
  kind: DocKind;
}) {
  const info = docInfo(lead, kind);
  const t = totals(lead);
  const date = formatDate(docDate(lead, kind));
  const expires = quoteExpiresAt(lead.quote);
  const pct = lead.quote.depositPercent;
  const bank = bankRows(settings);
  const reference = `#${lead.number}`;
  const payments = [...lead.payments].sort((a, b) => a.at - b.at);
  const isQuote = kind === "quote";

  // Rows under the items: lines before the highlighted amount, and after it.
  let before: SumRow[] = [];
  let after: SumRow[] = [];
  let highlight: SumRow;
  let paid = false;

  if (kind === "quote") {
    highlight = { label: "Total", value: formatRand(t.total) };
    if (pct > 0 && pct < 100) {
      after = [
        { label: `Deposit to start (${pct}%)`, value: formatRand(t.deposit) },
        { label: "Balance once live", value: formatRand(Math.max(0, t.total - t.deposit)) },
      ];
    }
  } else if (kind === "deposit") {
    const deposits = payments.filter((p) => p.kind === "deposit");
    const due = Math.max(0, t.deposit - t.paidDeposit);
    before = [
      { label: "Project total", value: formatRand(t.total) },
      { label: `Deposit (${pct}%)`, value: formatRand(t.deposit) },
      ...deposits.map((p) => ({ label: `Less paid ${formatDate(p.at)}`, value: `−${formatRand(p.amount)}` })),
    ];
    highlight = { label: due > 0 ? "Amount due" : "Paid in full", value: formatRand(due) };
    paid = due === 0;
  } else {
    before = [
      { label: "Project total", value: formatRand(t.total) },
      ...payments.map((p) => ({
        label: `Less ${p.kind === "deposit" ? "deposit" : "payment"} received ${formatDate(p.at)}`,
        value: `−${formatRand(p.amount)}`,
      })),
    ];
    highlight = { label: t.outstanding > 0 ? "Balance due" : "Paid in full", value: formatRand(t.outstanding) };
    paid = t.outstanding === 0;
  }

  const meta: SumRow[] = [
    { label: isQuote ? "Quote no." : "Invoice no.", value: info.number },
    { label: "Date", value: date },
    ...(isQuote
      ? expires !== null
        ? [{ label: "Valid until", value: formatDate(expires) }]
        : []
      : [
          { label: "Quote", value: reference },
          { label: "Due", value: paid ? "Paid" : "On receipt" },
        ]),
    { label: "Reference", value: reference },
  ];

  const billTo = [
    lead.contact.business,
    lead.contact.phone ? displayPhone(lead.contact.phone) : "",
    lead.contact.email,
  ].filter((s) => s.trim());

  const from = [
    settings.contactName,
    settings.phone ? displayPhone(settings.phone) : "",
    settings.email,
    settings.website,
  ].filter((s) => s.trim());

  return (
    <article className="doc-sheet mx-auto flex w-full max-w-[210mm] flex-col bg-white px-6 py-8 text-[12.5px] leading-relaxed text-ink shadow-lift sm:min-h-[297mm] sm:px-[16mm] sm:py-[15mm] sm:text-[13px] print:min-h-0 print:max-w-none print:p-0 print:shadow-none">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="text-[19px] font-semibold tracking-[-0.03em]">{settings.businessName}</span>
          </div>
          <div className="mt-3 space-y-0.5 text-muted">
            {from.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <div className="sm:text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {isQuote ? "Quotation" : kind === "deposit" ? `${pct}% deposit` : "Final balance"}
          </div>
          <h1 className="mt-1.5 text-[32px] font-semibold leading-none tracking-[-0.035em]">{info.heading}</h1>
          <div className="mt-2 font-mono text-[13px] tracking-tight">{isQuote ? `#${info.number}` : info.number}</div>
        </div>
      </header>

      <div className="mt-8 h-px bg-ink/10" />

      {/* ── Parties & details ──────────────────────────────────── */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2">
        <div>
          <DocLabel>{isQuote ? "Prepared for" : "Bill to"}</DocLabel>
          <div className="mt-2 text-[14px] font-semibold">{lead.contact.name}</div>
          <div className="mt-0.5 space-y-0.5 text-muted">
            {billTo.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 self-start sm:justify-self-end print:justify-self-end">
          {meta.map((m) => (
            <div key={m.label} className="contents">
              <dt className="text-muted">{m.label}</dt>
              <dd className="text-right font-medium tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Items ──────────────────────────────────────────────── */}
      <table className="mt-10 w-full border-collapse text-left">
        <thead>
          <tr className="border-b-[1.5px] border-ink">
            <th className="pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Description
            </th>
            <th className="w-12 pb-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Qty
            </th>
            <th className="hidden w-28 pb-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:table-cell print:table-cell">
              Unit price
            </th>
            <th className="w-28 pb-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {lead.quote.items.map((item) => (
            <tr key={item.id} className="break-inside-avoid border-b border-line align-top">
              <td className="py-3 pr-3">
                <div className="font-medium">{item.name}</div>
                {item.description && (
                  <div className="mt-0.5 whitespace-pre-line text-[0.92em] leading-relaxed text-muted">
                    {item.description}
                  </div>
                )}
              </td>
              <td className="py-3 text-right tabular-nums">{item.qty}</td>
              <td className="hidden py-3 text-right tabular-nums sm:table-cell print:table-cell">
                {formatRand(item.unit)}
              </td>
              <td className="py-3 text-right font-medium tabular-nums">{formatRand(lineTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Totals ─────────────────────────────────────────────── */}
      <div className="mt-5 flex justify-end">
        <div className="w-full max-w-[320px] break-inside-avoid">
          {before.length > 0 && (
            <dl className="mb-2 space-y-1">
              {before.map((r, i) => (
                <div key={`${r.label}-${i}`} className="flex justify-between gap-4 px-3">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="doc-due flex items-baseline justify-between gap-4 rounded-lg bg-lime px-3 py-2.5">
            <span className="font-semibold">{highlight.label}</span>
            <span className="text-[17px] font-semibold tabular-nums">{highlight.value}</span>
          </div>
          {after.length > 0 && (
            <dl className="mt-2 space-y-1">
              {after.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 px-3">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {paid && (
            <p className="mt-3 flex items-center justify-end gap-1.5 px-3 text-[12px] font-medium">
              <Check size={14} strokeWidth={2.5} />
              Received with thanks
            </p>
          )}
        </div>
      </div>

      {/* ── Notes, terms, banking ──────────────────────────────── */}
      <div className="mt-10 space-y-6">
        {lead.quote.notes.trim() && (
          <Block title="Notes">
            <p className="whitespace-pre-line">{lead.quote.notes.trim()}</p>
          </Block>
        )}
        {settings.quoteTerms.trim() && (
          <Block title="Terms">
            <p className="whitespace-pre-line text-muted">{settings.quoteTerms.trim()}</p>
          </Block>
        )}
        {bank.length > 0 && (
          <Block title={isQuote ? "Banking details (for the deposit once accepted)" : "Banking details (EFT)"}>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              {[...bank, { label: "Reference", value: reference }].map((r) => (
                <div key={r.label} className="contents">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="font-medium tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}
      </div>

      {/* ── Sign-off ───────────────────────────────────────────── */}
      <div className="mt-10 break-inside-avoid">
        <p className="text-[15px] font-medium tracking-tight">
          {isQuote ? "Thank you for the opportunity to quote." : "Thank you for your business."}
        </p>
        {settings.contactName && <p className="mt-0.5 text-muted">{settings.contactName}</p>}
      </div>

      <div className="mt-auto pt-10">
        <footer className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line pt-4 text-[11px] text-muted">
          <span>{settings.businessName}</span>
          <span>{[settings.website, settings.email].filter(Boolean).join(" · ")}</span>
        </footer>
      </div>
    </article>
  );
}

function DocLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{children}</div>;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <DocLabel>{title}</DocLabel>
      <div className="mt-2">{children}</div>
    </section>
  );
}
