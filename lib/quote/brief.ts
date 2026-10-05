/**
 * The questions in the "Get a quote" builder, and helpers to turn answers into
 * readable summaries and draft-quote keys. Shared by the form, the client page,
 * the admin app and the notification email, so wording only lives here.
 */
import type { Brief, ServiceKey } from "./types";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: string;
  label: string;
  help?: string;
  type: "single" | "multi" | "text";
  options?: Option[];
  /** Shown when any of these services is picked. */
  showIf: ServiceKey[];
  placeholder?: string;
  optional?: boolean;
}

export const SERVICES: { value: ServiceKey; label: string; description: string }[] = [
  { value: "website", label: "New website", description: "A site for your business, from one page to a full multi-page site." },
  { value: "redesign", label: "Redesign my site", description: "Make an outdated or slow site faster, sharper and easier to use." },
  { value: "store", label: "Online store", description: "Sell products online with PayFast checkout and order management." },
  { value: "workflow", label: "Business workflow", description: "Quotes, bookings, job tracking, invoices — out of spreadsheets." },
  { value: "unsure", label: "Not sure yet", description: "Tell me about your business and I'll recommend what fits." },
];

const SITE: ServiceKey[] = ["website", "redesign"];

export const QUESTIONS: Question[] = [
  {
    id: "currentUrl",
    label: "What's the address of your current site?",
    type: "text",
    showIf: ["redesign"],
    placeholder: "e.g. mybusiness.co.za",
    optional: true,
  },
  {
    id: "pages",
    label: "Roughly how big should the site be?",
    help: "A page is a section with its own link — Home, Services, About, Contact…",
    type: "single",
    showIf: SITE,
    options: [
      { value: "1", label: "One page", hint: "Everything on a single scroll" },
      { value: "2-5", label: "2–5 pages" },
      { value: "6-10", label: "6–10 pages" },
      { value: "10+", label: "More than 10" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "features",
    label: "What should it include?",
    help: "Pick as many as you like.",
    type: "multi",
    showIf: SITE,
    optional: true,
    options: [
      { value: "whatsapp", label: "WhatsApp button" },
      { value: "catalogue", label: "Services or product catalogue" },
      { value: "gallery", label: "Photo gallery" },
      { value: "maps", label: "Google Maps & directions" },
      { value: "contact-form", label: "Contact form" },
      { value: "bookings", label: "Bookings or enquiry form" },
      { value: "reviews", label: "Reviews & testimonials" },
      { value: "blog", label: "Blog or news" },
      { value: "analytics", label: "Visitor analytics" },
    ],
  },
  {
    id: "content",
    label: "Do you have your logo, photos and text ready?",
    type: "single",
    showIf: [...SITE, "store"],
    options: [
      { value: "ready", label: "Yes, it's all ready" },
      { value: "some", label: "Some of it" },
      { value: "help", label: "I'll need help with it" },
    ],
  },
  {
    id: "products",
    label: "Roughly how many products will you sell?",
    type: "single",
    showIf: ["store"],
    options: [
      { value: "under-20", label: "Under 20" },
      { value: "20-100", label: "20–100" },
      { value: "100+", label: "More than 100" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "storeFeatures",
    label: "How should customers pay and get their orders?",
    type: "multi",
    showIf: ["store"],
    optional: true,
    options: [
      { value: "payfast", label: "Card payments (PayFast)" },
      { value: "eft", label: "EFT" },
      { value: "delivery", label: "Delivery / courier" },
      { value: "collection", label: "Collection" },
      { value: "discounts", label: "Discount codes" },
    ],
  },
  {
    id: "processes",
    label: "What would you like to sort out?",
    help: "Pick everything that's eating your time.",
    type: "multi",
    showIf: ["workflow"],
    options: [
      { value: "quotes", label: "Quotes & invoices" },
      { value: "bookings", label: "Bookings & scheduling" },
      { value: "jobs", label: "Job or order tracking" },
      { value: "approvals", label: "Client approvals" },
      { value: "payments", label: "Tracking payments" },
      { value: "stock", label: "Stock & inventory" },
      { value: "staff", label: "Staff & job cards" },
      { value: "reports", label: "Reports & dashboards" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "currentTools",
    label: "What do you use for it today?",
    type: "multi",
    showIf: ["workflow"],
    optional: true,
    options: [
      { value: "excel", label: "Excel / Google Sheets" },
      { value: "paper", label: "Paper & notebooks" },
      { value: "whatsapp", label: "WhatsApp" },
      { value: "email", label: "Email" },
      { value: "software", label: "Other software" },
    ],
  },
  {
    id: "users",
    label: "Who would use it?",
    type: "single",
    showIf: ["workflow"],
    options: [
      { value: "me", label: "Just me" },
      { value: "2-5", label: "2–5 people" },
      { value: "6+", label: "6 or more" },
    ],
  },
  {
    id: "about",
    label: "Tell me a little about your business",
    type: "text",
    showIf: ["unsure"],
    placeholder: "What you do, who your customers are, and what isn't working right now.",
  },
];

export const TIMELINES: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "month", label: "Within a month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "exploring", label: "Just exploring" },
];

export const BUDGETS: Option[] = [
  { value: "under-2k", label: "Under R2,000" },
  { value: "2k-5k", label: "R2,000 – R5,000" },
  { value: "5k-10k", label: "R5,000 – R10,000" },
  { value: "10k+", label: "R10,000+" },
  { value: "unsure", label: "Not sure yet" },
];

/** How a lead reached you — for leads added by hand in the admin. */
export const LEAD_SOURCES = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
  { value: "email", label: "Email" },
  { value: "in-person", label: "In person" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
] as const;

export function sourceLabel(source: string | undefined): string {
  if (!source || source === "website") return "Website";
  return LEAD_SOURCES.find((s) => s.value === source)?.label ?? source;
}

export const PREFERRED_CONTACT = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
  { value: "email", label: "Email" },
] as const;

/** The questions to show for the chosen services, in order. */
export function visibleQuestions(services: ServiceKey[]): Question[] {
  return QUESTIONS.filter((q) => q.showIf.some((s) => services.includes(s)));
}

function labelFor(options: Option[] | undefined, value: string): string {
  return options?.find((o) => o.value === value)?.label ?? value;
}

export function serviceLabel(key: ServiceKey): string {
  return SERVICES.find((s) => s.value === key)?.label ?? key;
}

export function timelineLabel(value: string): string {
  return labelFor(TIMELINES, value);
}

export function budgetLabel(value: string): string {
  return labelFor(BUDGETS, value);
}

/** Human-readable lines for the brief, used on the client page, admin and email. */
export function briefSummary(brief: Brief): { label: string; value: string }[] {
  const lines: { label: string; value: string }[] = brief.services.length
    ? [{ label: "Looking for", value: brief.services.map(serviceLabel).join(", ") }]
    : [];
  for (const q of visibleQuestions(brief.services)) {
    const answer = brief.answers[q.id];
    if (answer === undefined || answer === "" || (Array.isArray(answer) && answer.length === 0)) continue;
    const value = Array.isArray(answer)
      ? answer.map((a) => labelFor(q.options, a)).join(", ")
      : q.type === "text"
        ? answer
        : labelFor(q.options, answer);
    lines.push({ label: q.label, value });
  }
  if (brief.timeline) lines.push({ label: "Timeline", value: timelineLabel(brief.timeline) });
  if (brief.budget) lines.push({ label: "Budget", value: budgetLabel(brief.budget) });
  if (brief.notes.trim()) lines.push({ label: "Notes", value: brief.notes.trim() });
  return lines;
}

/**
 * Keys describing the brief, matched against PriceItem.autoAddFor to build the
 * draft quote: "service:<key>", plus "<questionId>:<answer>" for every
 * single/multi answer (e.g. "pages:2-5", "features:blog", "content:help").
 */
export function autoAddKeys(brief: Brief): string[] {
  const keys = new Set<string>(brief.services.map((s) => `service:${s}`));
  for (const q of visibleQuestions(brief.services)) {
    if (q.type === "text") continue;
    const answer = brief.answers[q.id];
    for (const a of Array.isArray(answer) ? answer : answer ? [answer] : []) keys.add(`${q.id}:${a}`);
  }
  return [...keys];
}

/** Every key the price list can match on, with a label — for the admin price editor. */
export function autoAddChoices(): { key: string; label: string }[] {
  const choices = SERVICES.map((s) => ({ key: `service:${s.value}`, label: `Service: ${s.label}` }));
  for (const q of QUESTIONS) {
    if (q.type === "text") continue;
    for (const o of q.options ?? []) choices.push({ key: `${q.id}:${o.value}`, label: `${q.label} → ${o.label}` });
  }
  return choices;
}
