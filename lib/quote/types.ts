/**
 * Data model for quote requests ("leads") and the projects they become.
 *
 * A lead is one Firestore document in `leads`: the client's brief, their contact
 * details, the quote, payments, onboarding checklist and an event history.
 * Money is stored in cents; timestamps are epoch ms.
 */

export type Cents = number;

export type ServiceKey = "website" | "redesign" | "store" | "workflow" | "unsure";

/**
 * new       — brief received, quote not sent yet
 * quoted    — quote sent, waiting for the client to accept
 * accepted  — accepted, deposit due (onboarding opens)
 * building  — deposit paid, build in progress
 * launched  — live and handed over, balance due
 * complete  — paid in full
 * closed    — didn't go ahead (admin only)
 */
export type LeadStatus = "new" | "quoted" | "accepted" | "building" | "launched" | "complete" | "closed";

export type PreferredContact = "whatsapp" | "call" | "email";

export interface Brief {
  services: ServiceKey[];
  /** Answers keyed by question id (see lib/quote/brief.ts). */
  answers: Record<string, string | string[]>;
  timeline: string;
  budget: string;
  notes: string;
}

export interface Contact {
  name: string;
  business: string;
  /** WhatsApp format: digits with country code, e.g. 27821234567. */
  phone: string;
  email: string;
  preferred: PreferredContact;
}

export interface QuoteItem {
  id: string;
  /** The price list item it came from, if any. */
  priceId?: string;
  name: string;
  description: string;
  qty: number;
  unit: Cents;
}

export interface Quote {
  items: QuoteItem[];
  /** Scope notes and terms shown to the client under the items. */
  notes: string;
  depositPercent: number;
  validDays: number;
  /** Bumped every time the quote is sent, so the client always sees the latest. */
  version: number;
  sentAt?: number;
  acceptedAt?: number;
}

export type PaymentKind = "deposit" | "balance";

export interface Payment {
  id: string;
  kind: PaymentKind;
  amount: Cents;
  at: number;
  note?: string;
}

export interface UploadedFile {
  id: string;
  url: string;
  path: string;
  name: string;
  contentType: string;
  size: number;
  uploadedAt: number;
}

export interface ProofFile extends UploadedFile {
  kind: PaymentKind;
}

export interface OnboardingItem {
  id: string;
  label: string;
  hint: string;
  done: boolean;
  /** What the client typed for this item (domain name, links, notes...). */
  response: string;
  files: UploadedFile[];
}

export interface LeadEvent {
  at: number;
  by: "client" | "admin" | "system";
  text: string;
}

export interface LeadData {
  number: number;
  token: string;
  createdAt: number;
  updatedAt: number;
  status: LeadStatus;
  contact: Contact;
  brief: Brief;
  quote: Quote;
  payments: Payment[];
  proofOfPayment: ProofFile[];
  onboarding: OnboardingItem[];
  /** Private admin notes — never sent to the client page. */
  notes: string;
  events: LeadEvent[];
  launchedAt?: number;
  closedAt?: number;
  lastClientActionAt?: number;
  /** Set when the admin has opened the lead, so new ones can be highlighted. */
  seenAt?: number;
}

export interface Lead extends LeadData {
  id: string;
}

/** An entry in the private price list (a module from pricing/ClearSite-Price-List.xlsx). */
export interface PriceItem {
  id: string;
  name: string;
  description: string;
  price: Cents;
  /**
   * Brief answers that add this item to the draft quote automatically,
   * e.g. "service:store", "pages:2-5", "features:blog" (see autoAddKeys()).
   * A rule can set the quantity too: "pages:2-5=4" adds it with qty 4.
   */
  autoAddFor: string[];
  order: number;
  active: boolean;
  /** Module ID from the price list sheet, e.g. "WEB-02". */
  sku?: string;
  /** Grouping in the admin, e.g. "Business workflows". */
  category?: string;
  /** How it's counted, e.g. "per page", "once-off". */
  unit?: string;
}

export interface BankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
}

export interface MessageTemplates {
  /** Sent with the quote link. Placeholders: {firstName} {number} {link} {total} */
  quoteReady: string;
  /** After the deposit is confirmed. Placeholders: {firstName} {number} {link} */
  depositReceived: string;
  /** When the site/system goes live. Placeholders: {firstName} {number} {link} {balance} */
  launched: string;
  /** General follow-up. Placeholders: {firstName} {number} {link} */
  general: string;
}

export interface Settings {
  businessName: string;
  contactName: string;
  /** WhatsApp format digits. */
  phone: string;
  email: string;
  website: string;
  bank: BankDetails;
  depositPercent: number;
  quoteValidDays: number;
  /** Shown on every quote under the notes. */
  quoteTerms: string;
  /** Where new-lead emails go. */
  notifyEmail: string;
  templates: MessageTemplates;
}
