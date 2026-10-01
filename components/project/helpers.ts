/**
 * Pure helpers for the client project page (/q/[token]) and its documents.
 * No server-only imports here: client components import the view types too.
 */
import { formatDateTime, invoiceNumber } from "@/lib/quote/leads";
import type { LeadData, OnboardingItem, PaymentKind, ProofFile, Settings } from "@/lib/quote/types";

export type DocKind = "quote" | "deposit" | "balance";

export function parseDocKind(value: string | string[] | undefined): DocKind | null {
  return value === "quote" || value === "deposit" || value === "balance" ? value : null;
}

type DocLead = Pick<LeadData, "status" | "quote" | "launchedAt">;

/** Which documents exist yet: the quote once sent, the deposit invoice once accepted, the final invoice once live. */
export function availableDocs(lead: DocLead): Record<DocKind, boolean> {
  const { status, quote } = lead;
  const quote_ = Boolean(quote.sentAt) && quote.items.length > 0 && status !== "new";
  const deposit =
    quote_ && Boolean(quote.acceptedAt) && ["accepted", "building", "launched", "complete", "closed"].includes(status);
  const balance =
    deposit && (status === "launched" || status === "complete" || (status === "closed" && Boolean(lead.launchedAt)));
  return { quote: quote_, deposit, balance };
}

export function docHref(token: string, kind: DocKind): string {
  return `/q/${token}/document?type=${kind}`;
}

/** Heading, number and the file name the browser suggests when saving as PDF. */
export function docInfo(
  lead: Pick<LeadData, "number" | "contact">,
  kind: DocKind,
): { heading: string; number: string; fileName: string; linkLabel: string } {
  const who = lead.contact.business.trim() || lead.contact.name.trim();
  if (kind === "quote") {
    const number = String(lead.number);
    return { heading: "Quote", number, fileName: `Quote ${number} - ${who}`, linkLabel: `Quote #${number}` };
  }
  const number = invoiceNumber(lead, kind);
  const heading = kind === "deposit" ? "Deposit invoice" : "Invoice";
  return { heading, number, fileName: `${heading} ${number} - ${who}`, linkLabel: `${heading} ${number}` };
}

/** The date printed on each document. */
export function docDate(lead: Pick<LeadData, "quote" | "createdAt" | "launchedAt">, kind: DocKind): number {
  if (kind === "quote") return lead.quote.sentAt ?? lead.createdAt;
  if (kind === "deposit") return lead.quote.acceptedAt ?? Date.now();
  return lead.launchedAt ?? Date.now();
}

export interface BankRow {
  label: string;
  value: string;
  /** What the copy button copies, when it differs from the shown value. */
  copy?: string;
}

/** EFT details from settings, or an empty list when they haven't been filled in. */
export function bankRows(settings: Settings): BankRow[] {
  const b = settings.bank;
  if (!b.accountNumber.trim()) return [];
  const rows: BankRow[] = [
    { label: "Bank", value: b.bankName.trim() },
    { label: "Account holder", value: b.accountHolder.trim() },
    { label: "Account number", value: b.accountNumber.trim(), copy: b.accountNumber.replace(/\s/g, "") },
    { label: "Branch code", value: b.branchCode.trim(), copy: b.branchCode.replace(/\s/g, "") },
    { label: "Account type", value: b.accountType.trim() },
  ];
  return rows.filter((r) => r.value);
}

/* ─── Views passed to client components (no storage paths) ──────────────── */

export interface FileView {
  id: string;
  name: string;
  url: string;
  size: number;
  contentType: string;
}

export interface OnboardingItemView {
  id: string;
  label: string;
  hint: string;
  done: boolean;
  response: string;
  files: FileView[];
}

export interface ProofView {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export function onboardingViews(items: OnboardingItem[]): OnboardingItemView[] {
  return items.map((i) => ({
    id: i.id,
    label: i.label,
    hint: i.hint,
    done: i.done,
    response: i.response,
    files: i.files.map((f) => ({ id: f.id, name: f.name, url: f.url, size: f.size, contentType: f.contentType })),
  }));
}

export function proofViews(proofs: ProofFile[], kind: PaymentKind): ProofView[] {
  return proofs
    .filter((p) => p.kind === kind)
    .sort((a, b) => a.uploadedAt - b.uploadedAt)
    .map((p) => ({ id: p.id, name: p.name, url: p.url, uploadedAt: formatDateTime(p.uploadedAt) }));
}

/** An item counts as ready once it's checked off, or the client has typed or uploaded something. */
export function isItemReady(item: Pick<OnboardingItem, "done" | "response"> & { files: unknown[] }): boolean {
  return item.done || item.response.trim().length > 0 || item.files.length > 0;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Cents as a plain number for banking apps: 175000 -> "1750.00". */
export function plainAmount(cents: number): string {
  return (cents / 100).toFixed(2);
}
