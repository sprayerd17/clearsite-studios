"use client";

import { useEffect, useState } from "react";
import { mutateLead } from "@/lib/firebase/data";
import { draftItems, lineTotal } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import type { Cents, Lead, PriceItem, QuoteItem, Settings } from "@/lib/quote/types";
import { openAfterSave, templateLink } from "../format";
import { useAction } from "../useAction";

/** The parts of a quote the admin edits. */
export interface QuoteDraft {
  items: QuoteItem[];
  notes: string;
  depositPercent: number;
  validDays: number;
  /** 0 = no monthly fee. */
  monthlyAmount: Cents;
  monthlyDescription: string;
}

function fromLead(lead: Lead): QuoteDraft {
  const { items, notes, depositPercent, validDays, monthly } = lead.quote;
  return {
    items,
    notes,
    depositPercent,
    validDays,
    monthlyAmount: monthly?.amount ?? 0,
    monthlyDescription: monthly?.description ?? "",
  };
}

/** The draft as it's stored on the lead's quote. */
function toQuoteFields(d: QuoteDraft) {
  const { monthlyAmount, monthlyDescription, ...rest } = d;
  return {
    ...rest,
    monthly: monthlyAmount > 0 ? { amount: monthlyAmount, description: monthlyDescription.trim() } : null,
  };
}

/** "R4,560.00" or "R4,560.00 + R350.00/month" for the draft being edited. */
function totalText(total: Cents, d: QuoteDraft): string {
  return d.monthlyAmount > 0 ? `${formatRand(total)} + ${formatRand(d.monthlyAmount)}/month` : formatRand(total);
}

/** Stable string for comparing drafts (Firestore doesn't keep key order). */
function keyOf(d: QuoteDraft): string {
  return JSON.stringify([
    d.items.map((i) => [i.id, i.priceId ?? null, i.name, i.description, i.qty, i.unit]),
    d.notes,
    d.depositPercent,
    d.validDays,
    d.monthlyAmount,
    d.monthlyAmount > 0 ? d.monthlyDescription : "",
  ]);
}

function clean(d: QuoteDraft): QuoteDraft {
  return {
    ...d,
    notes: d.notes.trim(),
    monthlyDescription: d.monthlyDescription.trim(),
    items: d.items.map((i) => ({ ...i, name: i.name.trim(), description: i.description.trim() })),
  };
}

/**
 * Local, editable copy of a lead's quote, shared by the quote editor and the
 * "Next step" card so either can send it. Follows the saved quote while there
 * are no local edits.
 */
export function useQuoteDraft(lead: Lead, settings: Settings, prices: PriceItem[], editable: boolean) {
  const saved = fromLead(lead);
  const savedKey = keyOf(saved);
  const [draft, setDraft] = useState<QuoteDraft>(saved);
  const [syncedKey, setSyncedKey] = useState(savedKey);
  if (savedKey !== syncedKey) {
    setSyncedKey(savedKey);
    if (keyOf(draft) === syncedKey) setDraft(saved);
  }
  // Leaving edit mode (cancel, send, or the client accepting meanwhile) drops local edits.
  const [wasEditable, setWasEditable] = useState(editable);
  if (wasEditable !== editable) {
    setWasEditable(editable);
    if (!editable) setDraft(saved);
  }

  const dirty = keyOf(draft) !== savedKey;
  const total = draft.items.reduce((sum, i) => sum + lineTotal(i), 0);
  const deposit = Math.round((total * draft.depositPercent) / 100);
  const zeroPriced = draft.items.filter((i) => i.unit === 0 || i.qty === 0).length;
  const action = useAction();

  // Warn before closing the tab with unsaved quote edits.
  const warn = editable && dirty;
  useEffect(() => {
    if (!warn) return;
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [warn]);

  function problem(): string | null {
    if (draft.items.length === 0) return "Add at least one item before sending.";
    if (draft.items.some((i) => !i.name.trim())) return "Every item needs a name.";
    if (total <= 0) return "The total is R0.00 — set a price before sending.";
    return null;
  }

  const update = (patch: Partial<QuoteDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const updateItem = (id: string, patch: Partial<QuoteItem>) =>
    setDraft((d) => ({ ...d, items: d.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const removeItem = (id: string) => setDraft((d) => ({ ...d, items: d.items.filter((i) => i.id !== id) }));
  const addItem = (item: QuoteItem) => setDraft((d) => ({ ...d, items: [...d.items, item] }));
  const rebuild = () => update({ items: draftItems(lead.brief, prices) });
  const reset = () => setDraft(saved);

  /** Saves the draft without sending (only while the quote hasn't gone out). */
  async function save(key = "save"): Promise<boolean> {
    const next = clean(draft);
    const ok = await action.run(
      () =>
        mutateLead(
          lead.id,
          (l) => {
            if (l.status !== "new") throw new Error("This quote has already gone out — use “Send updated quote” instead.");
            return { quote: { ...l.quote, ...toQuoteFields(next) } };
          },
          "Saved quote draft",
        ),
      key,
    );
    if (ok) setDraft(next);
    return ok;
  }

  /**
   * Marks the quote as sent (bumping its version so the client always accepts
   * the latest) and opens WhatsApp with the "quote ready" message.
   */
  async function send(key = "send"): Promise<boolean> {
    const issue = problem();
    if (issue) {
      action.fail(issue, key);
      return false;
    }
    if (
      zeroPriced > 0 &&
      !confirm(`${zeroPriced === 1 ? "One item is" : `${zeroPriced} items are`} at R0.00. Send the quote anyway?`)
    ) {
      return false;
    }
    const next = clean(draft);
    const resend = !!lead.quote.sentAt;
    const version = (lead.quote.version || 0) + 1;
    // Open the WhatsApp tab inside the tap so popup blockers allow it.
    const tab = lead.contact.phone ? openAfterSave() : null;
    const ok = await action.run(
      () =>
        mutateLead(
          lead.id,
          (l) => {
            if (l.status !== "new" && l.status !== "quoted") {
              throw new Error("The client has already accepted this quote, so it can't be changed now.");
            }
            return {
              status: "quoted",
              quote: {
                ...l.quote,
                ...toQuoteFields(next),
                sentAt: Date.now(),
                version: (l.quote.version || 0) + 1,
                acceptedAt: undefined,
              },
            };
          },
          resend ? `Sent updated quote v${version} (${totalText(total, next)})` : `Sent the quote (${totalText(total, next)})`,
        ),
      key,
    );
    if (!ok) {
      tab?.cancel();
      return false;
    }
    setDraft(next);
    tab?.go(templateLink(lead, settings.templates.quoteReady, { total: totalText(total, next) }));
    return true;
  }

  return {
    draft,
    dirty,
    total,
    deposit,
    zeroPriced,
    update,
    updateItem,
    removeItem,
    addItem,
    rebuild,
    reset,
    save,
    send,
    pending: action.pending,
    busy: action.busy,
    errorFor: action.errorFor,
    clearError: action.clearError,
  };
}

export type QuoteDraftApi = ReturnType<typeof useQuoteDraft>;
