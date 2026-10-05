/**
 * Pure helpers for leads and quotes, shared by the server, the client page and
 * the admin app.
 */
import { autoAddKeys } from "./brief";
import { newId } from "./ids";
import type {
  Brief,
  Cents,
  LeadData,
  LeadStatus,
  PaymentKind,
  PriceItem,
  Quote,
  QuoteItem,
} from "./types";

export const STATUS: Record<LeadStatus, { label: string; tone: "lime" | "ink" | "amber" | "sky" | "muted" | "green" }> = {
  new: { label: "New request", tone: "lime" },
  quoted: { label: "Quote sent", tone: "sky" },
  accepted: { label: "Deposit due", tone: "amber" },
  building: { label: "In build", tone: "ink" },
  launched: { label: "Live · balance due", tone: "amber" },
  complete: { label: "Complete", tone: "green" },
  closed: { label: "Closed", tone: "muted" },
};

/** Lead numbers start here (shared by website requests and leads added by hand). */
export const FIRST_LEAD_NUMBER = 1001;

/** Statuses that still need something from someone. */
export const ACTIVE_STATUSES: LeadStatus[] = ["new", "quoted", "accepted", "building", "launched"];

/** The steps the client sees at the top of their page. */
export const CLIENT_STEPS = ["Request", "Quote", "Deposit", "Build", "Launch"] as const;

/** Index into CLIENT_STEPS of the step the client is currently on. */
export function clientStep(status: LeadStatus): number {
  switch (status) {
    case "new":
      return 0;
    case "quoted":
      return 1;
    case "accepted":
      return 2;
    case "building":
      return 3;
    case "launched":
    case "complete":
      return 4;
    default:
      return 0;
  }
}

export function lineTotal(item: QuoteItem): Cents {
  return Math.round(item.qty * item.unit);
}

export interface Totals {
  total: Cents;
  deposit: Cents;
  paidDeposit: Cents;
  paidBalance: Cents;
  paid: Cents;
  /** What the client still owes overall. */
  outstanding: Cents;
  /** What is due right now, given the status (deposit or balance). */
  dueNow: Cents;
  dueKind: PaymentKind | null;
}

export function totals(lead: Pick<LeadData, "quote" | "payments" | "status">): Totals {
  const total = lead.quote.items.reduce((sum, i) => sum + lineTotal(i), 0);
  const deposit = Math.round((total * lead.quote.depositPercent) / 100);
  const sum = (kind: PaymentKind) => lead.payments.filter((p) => p.kind === kind).reduce((s, p) => s + p.amount, 0);
  const paidDeposit = sum("deposit");
  const paidBalance = sum("balance");
  const paid = paidDeposit + paidBalance;
  const outstanding = Math.max(0, total - paid);

  let dueNow = 0;
  let dueKind: PaymentKind | null = null;
  if (lead.status === "accepted") {
    dueNow = Math.max(0, deposit - paidDeposit);
    dueKind = "deposit";
  } else if (lead.status === "launched") {
    dueNow = outstanding;
    dueKind = "balance";
  }
  return { total, deposit, paidDeposit, paidBalance, paid, outstanding, dueNow, dueKind };
}

/** "1042" → used in links and messages as "#1042". */
export function leadRef(lead: Pick<LeadData, "number">): string {
  return String(lead.number);
}

export function invoiceNumber(lead: Pick<LeadData, "number">, kind: PaymentKind): string {
  return `${lead.number}-${kind === "deposit" ? "D" : "B"}`;
}

/** When the quote expires, or null if it hasn't been sent. */
export function quoteExpiresAt(quote: Quote): number | null {
  if (!quote.sentAt) return null;
  return quote.sentAt + quote.validDays * 24 * 60 * 60 * 1000;
}

/** "pages:2-5=4" → "pages:2-5" */
export function ruleKey(rule: string): string {
  const i = rule.indexOf("=");
  return (i === -1 ? rule : rule.slice(0, i)).trim();
}

/** "pages:2-5=4" → 4; plain rules → 1. */
export function ruleQty(rule: string): number {
  const i = rule.indexOf("=");
  const n = i === -1 ? 1 : Number(rule.slice(i + 1));
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/**
 * Builds the draft quote for a new brief from the price list: every active item
 * whose autoAddFor matches the brief is added once, in price-list order, with
 * the largest quantity among its matching rules. The admin always reviews and
 * edits this before sending.
 */
export function draftItems(brief: Brief, prices: PriceItem[]): QuoteItem[] {
  const keys = new Set(autoAddKeys(brief));
  return prices
    .filter((p) => p.active && p.autoAddFor.some((r) => keys.has(ruleKey(r))))
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      id: newId(),
      priceId: p.id,
      name: p.name,
      description: p.description,
      qty: Math.max(...p.autoAddFor.filter((r) => keys.has(ruleKey(r))).map(ruleQty)),
      unit: p.price,
    }));
}

/** Fills missing fields on documents saved by older versions. */
export function normalizeLead(data: Partial<LeadData>): LeadData {
  return {
    number: data.number ?? 0,
    token: data.token ?? "",
    createdAt: data.createdAt ?? 0,
    updatedAt: data.updatedAt ?? data.createdAt ?? 0,
    status: data.status ?? "new",
    contact: {
      name: "",
      business: "",
      phone: "",
      email: "",
      preferred: "whatsapp",
      ...data.contact,
    },
    brief: {
      services: [],
      answers: {},
      timeline: "",
      budget: "",
      notes: "",
      ...data.brief,
    },
    quote: {
      items: [],
      notes: "",
      depositPercent: 50,
      validDays: 14,
      version: 0,
      ...data.quote,
    },
    payments: data.payments ?? [],
    proofOfPayment: data.proofOfPayment ?? [],
    onboarding: data.onboarding ?? [],
    notes: data.notes ?? "",
    events: data.events ?? [],
    launchedAt: data.launchedAt,
    closedAt: data.closedAt,
    lastClientActionAt: data.lastClientActionAt,
    seenAt: data.seenAt,
    source: data.source ?? "website",
  };
}

export function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(ms: number): string {
  return new Date(ms).toLocaleString("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
