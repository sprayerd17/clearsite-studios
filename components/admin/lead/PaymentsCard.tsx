"use client";

import { useState } from "react";
import { Plus } from "@/components/icons";
import { mutateLead } from "@/lib/firebase/data";
import { formatDate, invoiceNumber, totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { newId } from "@/lib/quote/ids";
import type { Lead, PaymentKind } from "@/lib/quote/types";
import { TrashIcon } from "../icons";
import { Button, Card, CardBody, CardHeader, ConfirmButton, ErrorText, Field, Input, MoneyInput, labelClass } from "../ui";
import { useAction } from "../useAction";
import { FileList } from "./Files";

const KIND_LABEL: Record<PaymentKind, string> = { deposit: "Deposit", balance: "Balance" };

const todayIso = () => new Date().toLocaleDateString("en-CA");

/** "2026-10-01" → epoch ms; today's date keeps the current time. */
function dateToMs(iso: string): number {
  if (!iso || iso === todayIso()) return Date.now();
  const ms = new Date(`${iso}T12:00:00`).getTime();
  return Number.isFinite(ms) ? ms : Date.now();
}

export function PaymentsCard({ lead }: { lead: Lead }) {
  const t = totals(lead);
  const { run, pending, error, busy } = useAction();
  const [adding, setAdding] = useState(false);
  const payments = [...lead.payments].sort((a, b) => a.at - b.at);

  const remove = (id: string) => {
    const p = lead.payments.find((x) => x.id === id);
    if (!p) return;
    run(
      () =>
        mutateLead(
          lead.id,
          (l) => ({ payments: l.payments.filter((x) => x.id !== id) }),
          `Removed ${p.kind} payment of ${formatRand(p.amount)}`,
        ),
      `remove-${id}`,
    );
  };

  return (
    <Card>
      <CardHeader
        eyebrow="Money"
        title="Payments"
        action={
          !adding && (
            <Button size="sm" onClick={() => setAdding(true)}>
              <Plus size={16} /> Add
            </Button>
          )
        }
      />
      <CardBody className="space-y-5">
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Total" value={formatRand(t.total)} />
          <Stat label="Paid" value={formatRand(t.paid)} />
          <Stat label="Outstanding" value={formatRand(t.outstanding)} highlight={t.outstanding > 0 && lead.status !== "new" && lead.status !== "quoted"} />
        </div>

        {adding && <AddPayment lead={lead} onDone={() => setAdding(false)} />}

        {payments.length === 0 ? (
          !adding && <p className="text-sm text-muted">No payments recorded yet.</p>
        ) : (
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {payments.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {KIND_LABEL[p.kind]}{" "}
                    <span className="font-mono text-xs font-normal text-muted">#{invoiceNumber(lead, p.kind)}</span>
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(p.at)}
                    {p.note && ` · ${p.note}`}
                  </p>
                </div>
                <span className="shrink-0 font-semibold tabular-nums">{formatRand(p.amount)}</span>
                <ConfirmButton
                  variant="quiet"
                  size="sm"
                  className="!h-10 !px-3"
                  onConfirm={() => remove(p.id)}
                  pending={pending(`remove-${p.id}`)}
                  disabled={busy}
                  confirmLabel="Remove?"
                >
                  <TrashIcon size={16} />
                  <span className="sr-only">Remove payment</span>
                </ConfirmButton>
              </li>
            ))}
          </ul>
        )}

        <ErrorText>{error}</ErrorText>

        {lead.proofOfPayment.length > 0 && (
          <div className="space-y-4 border-t border-line pt-5">
            {(["deposit", "balance"] as const).map((kind) => {
              const files = lead.proofOfPayment.filter((f) => f.kind === kind);
              if (!files.length) return null;
              return (
                <div key={kind}>
                  <p className={`${labelClass} mb-2.5`}>Proof of payment · {KIND_LABEL[kind].toLowerCase()}</p>
                  <FileList files={files} />
                </div>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl px-3 py-3 ${highlight ? "bg-lime-soft" : "bg-paper"}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 truncate text-[15px] font-semibold tabular-nums tracking-[-0.01em] sm:text-base">{value}</p>
    </div>
  );
}

function AddPayment({ lead, onDone }: { lead: Lead; onDone: () => void }) {
  const t = totals(lead);
  const [kind, setKind] = useState<PaymentKind>(t.dueKind ?? (t.paidDeposit > 0 ? "balance" : "deposit"));
  const [amount, setAmount] = useState(t.dueNow);
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState("");
  const { run, pending, error, fail } = useAction();

  async function save() {
    if (amount <= 0) return fail("Enter the amount received.");
    const ok = await run(() =>
      mutateLead(
        lead.id,
        (l) => ({
          payments: [...l.payments, { id: newId(), kind, amount, at: dateToMs(date), ...(note.trim() ? { note: note.trim() } : {}) }],
        }),
        `Recorded ${kind} payment of ${formatRand(amount)}`,
      ),
    );
    if (ok) onDone();
  }

  return (
    <div className="space-y-4 rounded-2xl border border-line bg-paper/60 p-4">
      <div className="grid grid-cols-2 gap-1 rounded-full border border-line bg-white p-1">
        {(["deposit", "balance"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={`h-10 rounded-full text-sm font-medium transition-colors ${kind === k ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount">
          <MoneyInput value={amount} onChange={setAmount} autoFocus />
        </Field>
        <Field label="Date">
          <Input type="date" value={date} max={todayIso()} onChange={(e) => setDate(e.target.value)} />
        </Field>
      </div>
      <Field label="Note (optional)">
        <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. EFT, reference" />
      </Field>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2">
        <Button variant="quiet" size="sm" onClick={onDone}>
          Cancel
        </Button>
        <Button variant="ink" size="sm" onClick={save} pending={pending()}>
          Record payment
        </Button>
      </div>
    </div>
  );
}
