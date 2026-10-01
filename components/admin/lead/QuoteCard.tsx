"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Plus, Refresh, Search, WhatsApp, X } from "@/components/icons";
import { lineTotal, formatDate, formatDateTime, quoteExpiresAt } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { newId } from "@/lib/quote/ids";
import type { Lead, PriceItem, QuoteItem } from "@/lib/quote/types";
import { useAdmin } from "../AdminProvider";
import { AlertIcon, PencilIcon, TagIcon } from "../icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  ErrorText,
  Field,
  Input,
  MoneyInput,
  Notice,
  NumberInput,
  Sheet,
  Textarea,
  labelClass,
} from "../ui";
import type { QuoteDraftApi } from "./useQuoteDraft";

export function QuoteCard({
  lead,
  quote,
  editing,
  onStartEdit,
  onStopEdit,
}: {
  lead: Lead;
  quote: QuoteDraftApi;
  /** Whether the quote is open for editing right now. */
  editing: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
}) {
  const sent = lead.quote.sentAt;
  const expires = quoteExpiresAt(lead.quote);

  let subtitle: string;
  if (lead.status === "new") subtitle = "Drafted from your price list. Shown to the client only once you send it.";
  else if (editing) subtitle = "Changes go to the client when you send the updated quote.";
  else if (lead.quote.acceptedAt) subtitle = `Accepted ${formatDateTime(lead.quote.acceptedAt)}. Locked now that it's accepted.`;
  else if (sent) subtitle = `Sent ${formatDateTime(sent)}${expires ? ` · valid until ${formatDate(expires)}` : ""}`;
  else subtitle = "Not sent.";

  return (
    <Card id="quote">
      <CardHeader
        eyebrow={
          <>
            Quote{lead.quote.version > 0 && <span className="text-muted-light"> · v{lead.quote.version}</span>}
          </>
        }
        title={lead.status === "new" ? "Draft quote" : editing ? "Edit quote" : "Quote"}
        subtitle={subtitle}
        action={
          editing ? (
            quote.dirty ? (
              <Chip tone="amber">Unsaved</Chip>
            ) : null
          ) : lead.status === "quoted" ? (
            <Button size="sm" variant="ghost" onClick={onStartEdit}>
              <PencilIcon size={15} /> Edit
            </Button>
          ) : null
        }
      />
      <CardBody>{editing ? <Editor lead={lead} quote={quote} onStopEdit={onStopEdit} /> : <ReadOnly lead={lead} />}</CardBody>
    </Card>
  );
}

/* ─── Read-only ─────────────────────────────────────────────────────────── */

function ReadOnly({ lead }: { lead: Lead }) {
  const total = lead.quote.items.reduce((s, i) => s + lineTotal(i), 0);
  const deposit = Math.round((total * lead.quote.depositPercent) / 100);
  return (
    <div className="space-y-4">
      {lead.quote.items.length === 0 ? (
        <p className="text-sm text-muted">No items on this quote.</p>
      ) : (
        <ul className="divide-y divide-line">
          {lead.quote.items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4 py-3 first:pt-0">
              <div className="min-w-0">
                <p className="font-medium text-ink">{item.name}</p>
                {item.description && <p className="mt-0.5 whitespace-pre-line text-sm text-muted">{item.description}</p>}
                {item.qty !== 1 && (
                  <p className="mt-1 font-mono text-xs tabular-nums text-muted">
                    {item.qty} × {formatRand(item.unit)}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-medium tabular-nums">{formatRand(lineTotal(item))}</p>
            </li>
          ))}
        </ul>
      )}
      {lead.quote.notes && (
        <div className="rounded-xl bg-paper px-4 py-3">
          <p className={labelClass}>Notes for the client</p>
          <p className="mt-1.5 whitespace-pre-line text-sm text-ink">{lead.quote.notes}</p>
        </div>
      )}
      <Totals total={total} deposit={deposit} depositPercent={lead.quote.depositPercent} validDays={lead.quote.validDays} />
    </div>
  );
}

/* ─── Editor ────────────────────────────────────────────────────────────── */

function Editor({ lead, quote, onStopEdit }: { lead: Lead; quote: QuoteDraftApi; onStopEdit: () => void }) {
  const { prices, pricesLoaded } = useAdmin();
  const [picker, setPicker] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const { draft } = quote;
  const isNew = lead.status === "new";
  const error = quote.errorFor("save") || quote.errorFor("send-editor");

  function addCustom() {
    const id = newId();
    quote.addItem({ id, name: "", description: "", qty: 1, unit: 0 });
    setFocusId(id);
  }

  function addPrice(p: PriceItem) {
    quote.addItem({ id: newId(), priceId: p.id, name: p.name, description: p.description, qty: 1, unit: p.price });
    setPicker(false);
  }

  function rebuild() {
    const count = draft.items.length;
    if (count && !confirm(`Replace the ${count} item${count === 1 ? "" : "s"} on this quote with a fresh draft from the brief?`)) return;
    quote.rebuild();
  }

  async function send() {
    if (await quote.send("send-editor")) onStopEdit();
  }

  function cancel() {
    if (quote.dirty && !confirm("Discard your changes to this quote?")) return;
    quote.reset();
    quote.clearError();
    onStopEdit();
  }

  return (
    <div className="space-y-5">
      {draft.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong px-4 py-8 text-center">
          <p className="font-medium">No items yet</p>
          <p className="mt-1 text-sm text-muted">Add from your price list, add a custom item, or rebuild the draft from the brief.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {draft.items.map((item, idx) => (
            <ItemRow
              key={item.id}
              item={item}
              index={idx}
              autoFocus={focusId === item.id}
              onChange={(patch) => quote.updateItem(item.id, patch)}
              onRemove={() => quote.removeItem(item.id)}
            />
          ))}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" onClick={() => setPicker(true)} disabled={!pricesLoaded}>
          <TagIcon size={15} /> From price list
        </Button>
        <Button size="sm" onClick={addCustom}>
          <Plus size={16} /> Custom item
        </Button>
      </div>

      {quote.zeroPriced > 0 && (
        <Notice tone="amber" icon={<AlertIcon size={16} />}>
          {quote.zeroPriced === 1 ? "One item is" : `${quote.zeroPriced} items are`} at R0.00 — set a price before sending.
        </Notice>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Deposit">
          <NumberInput value={draft.depositPercent} onChange={(n) => quote.update({ depositPercent: n })} min={0} max={100} suffix="%" />
        </Field>
        <Field label="Valid for">
          <NumberInput value={draft.validDays} onChange={(n) => quote.update({ validDays: n })} min={1} max={365} suffix="days" />
        </Field>
      </div>

      <Field label="Notes for the client" hint="Shown under the items. Your standard quote terms from Settings are added below them.">
        <Textarea
          value={draft.notes}
          onChange={(e) => quote.update({ notes: e.target.value })}
          placeholder="Scope, what's included, timelines…"
          className="min-h-28"
        />
      </Field>

      <Totals total={quote.total} deposit={quote.deposit} depositPercent={draft.depositPercent} />

      <button
        type="button"
        onClick={rebuild}
        disabled={!pricesLoaded}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline disabled:opacity-50"
      >
        <Refresh size={15} /> Rebuild draft from brief
      </button>

      <ErrorText>{error}</ErrorText>

      <div className="flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:justify-end">
        {isNew ? (
          <Button onClick={() => quote.save("save")} pending={quote.pending("save")} disabled={quote.busy || !quote.dirty}>
            {quote.dirty ? "Save draft" : (
              <>
                <Check size={16} /> Draft saved
              </>
            )}
          </Button>
        ) : (
          <Button variant="quiet" onClick={cancel} disabled={quote.busy}>
            <X size={16} /> Cancel
          </Button>
        )}
        <Button variant="lime" onClick={send} pending={quote.pending("send-editor")} disabled={quote.busy}>
          {!quote.pending("send-editor") && <WhatsApp size={17} />}
          {isNew ? "Send quote" : "Send updated quote"}
        </Button>
      </div>

      <PricePicker
        open={picker}
        onClose={() => setPicker(false)}
        prices={prices.filter((p) => p.active)}
        addedIds={new Set(draft.items.map((i) => i.priceId).filter(Boolean) as string[])}
        onPick={addPrice}
      />
    </div>
  );
}

function ItemRow({
  item,
  index,
  autoFocus,
  onChange,
  onRemove,
}: {
  item: QuoteItem;
  index: number;
  autoFocus: boolean;
  onChange: (patch: Partial<QuoteItem>) => void;
  onRemove: () => void;
}) {
  const zero = item.unit === 0 || item.qty === 0;
  return (
    <li className={`rounded-2xl border p-3.5 sm:p-4 ${zero ? "border-amber-200 bg-amber-50/40" : "border-line bg-paper/50"}`}>
      <div className="flex items-start gap-2">
        <Input
          value={item.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Item name"
          aria-label={`Item ${index + 1} name`}
          autoFocus={autoFocus}
          invalid={!item.name.trim() && !autoFocus}
          className="font-medium"
        />
        <button
          type="button"
          onClick={onRemove}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-red-50 hover:text-red-700"
          aria-label={`Remove ${item.name || "item"}`}
          title="Remove item"
        >
          <X size={18} />
        </button>
      </div>
      <Textarea
        value={item.description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="Description (shown to the client)"
        aria-label={`Item ${index + 1} description`}
        rows={2}
        className="mt-2 min-h-[64px] py-2.5 text-[15px]"
      />
      <div className="mt-2 grid grid-cols-[76px_minmax(0,1fr)] items-end gap-2 sm:grid-cols-[88px_minmax(0,1fr)_auto]">
        <Field label="Qty">
          <NumberInput value={item.qty} onChange={(qty) => onChange({ qty })} decimals aria-label="Quantity" />
        </Field>
        <Field label="Unit price">
          <MoneyInput value={item.unit} onChange={(unit) => onChange({ unit })} aria-label="Unit price" />
        </Field>
        <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:block sm:min-w-[110px] sm:text-right">
          <p className={`${labelClass} sm:mb-2`}>Line total</p>
          <p className="font-semibold tabular-nums sm:flex sm:h-12 sm:items-center sm:justify-end">{formatRand(lineTotal(item))}</p>
        </div>
      </div>
      {zero && <p className="mt-2 text-xs font-medium text-amber-800">Set a price before sending.</p>}
    </li>
  );
}

function Totals({
  total,
  deposit,
  depositPercent,
  validDays,
}: {
  total: number;
  deposit: number;
  depositPercent: number;
  validDays?: number;
}) {
  return (
    <div className="rounded-2xl bg-ink px-5 py-4 text-white">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Total</p>
        <p className="text-2xl font-semibold tabular-nums tracking-[-0.02em]">{formatRand(total)}</p>
      </div>
      <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-white/60">Deposit ({depositPercent}%)</span>
          <span className="tabular-nums text-lime">{formatRand(deposit)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-white/60">Balance on launch</span>
          <span className="tabular-nums">{formatRand(Math.max(0, total - deposit))}</span>
        </div>
        {validDays !== undefined && (
          <div className="flex justify-between gap-3">
            <span className="text-white/60">Valid for</span>
            <span>{validDays} days</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PricePicker({
  open,
  onClose,
  prices,
  addedIds,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  prices: PriceItem[];
  addedIds: Set<string>;
  onPick: (p: PriceItem) => void;
}) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return prices.filter((p) =>
      words.every((w) => `${p.name} ${p.description} ${p.category ?? ""} ${p.sku ?? ""}`.toLowerCase().includes(w)),
    );
  }, [prices, q]);
  /** Price-list order is kept; items are grouped under their category headings. */
  const groups = useMemo(() => {
    const map = new Map<string, PriceItem[]>();
    for (const p of shown) {
      const key = p.category || "Other";
      map.set(key, [...(map.get(key) ?? []), p]);
    }
    return [...map.entries()];
  }, [shown]);

  return (
    <Sheet open={open} onClose={onClose} title="Add from price list">
      {prices.length === 0 ? (
        <div className="py-6 text-center">
          <p className="font-medium">Your price list is empty</p>
          <p className="mt-1 text-sm text-muted">Add the things you charge for under Prices.</p>
          <Link href="/admin/prices" className="btn-ink btn-sm mt-5">
            Open price list
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-light" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prices" className="pl-10" type="search" />
          </div>
          {shown.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">Nothing matches “{q}”.</p>
          ) : (
            <div className="-mx-2 space-y-4">
              {groups.map(([category, items]) => (
                <section key={category}>
                  <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-light">{category}</p>
                  <ul>
                    {items.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => onPick(p)}
                          className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-paper active:bg-paper-dim"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2 font-medium">
                              {p.name}
                              {addedIds.has(p.id) && (
                                <Chip tone="lime" className="py-0.5">
                                  <Check size={12} /> Added
                                </Chip>
                              )}
                            </p>
                            {p.description && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{p.description}</p>}
                          </div>
                          <span className="shrink-0 pt-0.5 text-right">
                            <span className="block font-medium tabular-nums">{formatRand(p.price)}</span>
                            {p.unit && p.unit !== "once-off" && (
                              <span className="block text-[11px] text-muted">{p.unit}</span>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      )}
    </Sheet>
  );
}
