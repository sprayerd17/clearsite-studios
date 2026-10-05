import { lineTotal } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import type { Cents, MonthlyFee, QuoteItem } from "@/lib/quote/types";

/** Quote items with their line totals, then the total and the deposit split. */
export default function QuoteLines({
  items,
  total,
  deposit,
  depositPercent,
  monthly,
}: {
  items: QuoteItem[];
  total: Cents;
  deposit: Cents;
  depositPercent: number;
  monthly?: MonthlyFee | null;
}) {
  const perMonth = monthly && monthly.amount > 0 ? monthly : null;
  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">What&apos;s included</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Amount</span>
      </div>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-[15.5px] font-medium tracking-tight text-ink">{item.name}</p>
              {item.description && (
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted">{item.description}</p>
              )}
              {item.qty !== 1 && (
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {item.qty} × {formatRand(item.unit)}
                </p>
              )}
            </div>
            <span className="shrink-0 pt-px text-[15.5px] font-medium tabular-nums text-ink">
              {formatRand(lineTotal(item))}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 rounded-2xl border border-line bg-paper/70 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-medium text-ink">Total</span>
          <span className="text-[28px] font-semibold leading-none tracking-tight tabular-nums text-ink">
            {formatRand(total)}
          </span>
        </div>
        {depositPercent > 0 && depositPercent < 100 && (
          <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{depositPercent}% deposit to start</dt>
              <dd className="font-medium tabular-nums text-ink">{formatRand(deposit)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Balance once it&apos;s live</dt>
              <dd className="font-medium tabular-nums text-ink">{formatRand(Math.max(0, total - deposit))}</dd>
            </div>
          </dl>
        )}
      </div>

      {perMonth && (
        <div className="mt-3 flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5">
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-ink">Monthly</p>
            {perMonth.description && <p className="mt-1 text-sm leading-relaxed text-muted">{perMonth.description}</p>}
          </div>
          <p className="shrink-0 text-right">
            <span className="text-[22px] font-semibold leading-none tracking-tight tabular-nums text-ink">
              {formatRand(perMonth.amount)}
            </span>
            <span className="block pt-1 text-xs text-muted">per month</span>
          </p>
        </div>
      )}
    </div>
  );
}
