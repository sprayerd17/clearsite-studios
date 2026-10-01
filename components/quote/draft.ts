/**
 * State, validation and storage helpers for the quote builder.
 * Validation mirrors app/quote/actions.ts so people see friendly errors before
 * they submit — the server still re-checks everything.
 */
import {
  BUDGETS,
  PREFERRED_CONTACT,
  QUESTIONS,
  SERVICES,
  TIMELINES,
  budgetLabel,
  serviceLabel,
  timelineLabel,
  type Question,
} from "@/lib/quote/brief";
import { isValidPhone, normalizePhone } from "@/lib/quote/phone";
import type { Brief, PreferredContact, ServiceKey } from "@/lib/quote/types";

export type StepId = "services" | "details" | "timing" | "contact";

export const ALL_STEPS: StepId[] = ["services", "details", "timing", "contact"];

export const STEP_META: Record<StepId, { short: string; title: string; intro: string }> = {
  services: {
    short: "Services",
    title: "What do you need?",
    intro: "Pick everything that applies — you can choose more than one.",
  },
  details: {
    short: "Details",
    title: "A few details",
    intro: "Mostly tapping. This helps me price it properly.",
  },
  timing: {
    short: "Timing",
    title: "Timing & budget",
    intro: "Rough answers are fine — nothing here is set in stone.",
  },
  contact: {
    short: "You",
    title: "Your details",
    intro: "Where should I send your quote?",
  },
};

export interface Draft {
  step: StepId;
  services: ServiceKey[];
  answers: Record<string, string | string[]>;
  timeline: string;
  budget: string;
  notes: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  preferred: PreferredContact;
  consent: boolean;
}

export type Errors = Record<string, string>;

export const EMPTY_DRAFT: Draft = {
  step: "services",
  services: [],
  answers: {},
  timeline: "",
  budget: "",
  notes: "",
  name: "",
  business: "",
  phone: "",
  email: "",
  preferred: "whatsapp",
  consent: false,
};

const SERVICE_KEYS = SERVICES.map((s) => s.value);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isServiceKey(value: unknown): value is ServiceKey {
  return typeof value === "string" && SERVICE_KEYS.includes(value as ServiceKey);
}

/** The steps to walk through — "details" drops out when no questions apply. */
export function stepsFor(hasQuestions: boolean): StepId[] {
  return hasQuestions ? ALL_STEPS : ALL_STEPS.filter((s) => s !== "details");
}

function isAnswered(q: Question, value: string | string[] | undefined): boolean {
  if (q.type === "text") return typeof value === "string" && value.trim() !== "";
  if (q.type === "single") return typeof value === "string" && (q.options ?? []).some((o) => o.value === value);
  return Array.isArray(value) && value.length > 0;
}

/** Errors for one step, keyed by field, in the order the fields appear. */
export function validateStep(step: StepId, d: Draft, questions: Question[]): Errors {
  const e: Errors = {};
  switch (step) {
    case "services":
      if (d.services.length === 0) e.services = "Pick at least one option to continue.";
      break;
    case "details":
      for (const q of questions) {
        if (q.optional || isAnswered(q, d.answers[q.id])) continue;
        e[q.id] =
          q.type === "text"
            ? "Please fill this in — a sentence or two is plenty."
            : q.type === "single"
              ? "Please choose one."
              : "Pick at least one.";
      }
      break;
    case "timing":
      if (!TIMELINES.some((t) => t.value === d.timeline)) e.timeline = "Please choose a timeline.";
      if (!BUDGETS.some((b) => b.value === d.budget)) e.budget = "Please choose a rough budget — “Not sure yet” is fine.";
      break;
    case "contact": {
      if (!d.name.trim()) e.name = "Please enter your name.";
      const phone = d.phone.trim();
      if (!phone) e.phone = "Please add your WhatsApp number so I can send your quote.";
      else if (!isValidPhone(normalizePhone(phone)))
        e.phone = "That number doesn't look right — try something like 082 123 4567.";
      const email = d.email.trim();
      if (email && !EMAIL_PATTERN.test(email)) e.email = "That email address doesn't look right.";
      else if (!email && d.preferred === "email") e.email = "Add your email address so I can reply there.";
      if (!d.consent) e.consent = "Please tick the box so I can contact you about your request.";
      break;
    }
  }
  return e;
}

/** Which step a server-side error field belongs to. */
export function stepForField(field: string): StepId | null {
  if (field === "services") return "services";
  if (QUESTIONS.some((q) => q.id === field)) return "details";
  if (field === "timeline" || field === "budget" || field === "notes") return "timing";
  if (["name", "business", "phone", "email", "preferred", "consent"].includes(field)) return "contact";
  return null;
}

/** The brief as the server will store it: only visible questions, trimmed text. */
export function toBrief(d: Draft, questions: Question[]): Brief {
  const answers: Record<string, string | string[]> = {};
  for (const q of questions) {
    const v = d.answers[q.id];
    if (q.type === "text") {
      const t = typeof v === "string" ? v.trim() : "";
      if (t) answers[q.id] = t;
    } else if (q.type === "single") {
      if (typeof v === "string" && v) answers[q.id] = v;
    } else if (Array.isArray(v) && v.length) {
      answers[q.id] = v;
    }
  }
  return {
    services: d.services,
    answers,
    timeline: d.timeline,
    budget: d.budget,
    notes: d.notes.trim(),
  };
}

/** Short pre-filled WhatsApp message for the fallback success screen. */
export function whatsappSummary(d: Draft): string {
  const name = d.name.trim();
  const business = d.business.trim();
  const lines = ["Hi Divan, I've just sent you a quote request on your website."];
  if (name) lines.push(business ? `I'm ${name} from ${business}.` : `I'm ${name}.`);
  if (d.services.length) lines.push(`Looking for: ${d.services.map(serviceLabel).join(", ")}`);
  if (d.timeline) lines.push(`Timeline: ${timelineLabel(d.timeline)}`);
  if (d.budget) lines.push(`Budget: ${budgetLabel(d.budget)}`);
  return lines.join("\n");
}

/* ─── sessionStorage ───────────────────────────────────────────────────── */

const STORAGE_KEY = "clearsite.quote-draft.v1";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

/** Reads a saved draft. Returns null when there is none or storage is unavailable. */
export function loadDraft(): Draft | null {
  let raw: string | null = null;
  try {
    raw = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const d = JSON.parse(raw) as Record<string, unknown> | null;
    if (!d || typeof d !== "object") return null;

    const answers: Record<string, string | string[]> = {};
    if (d.answers && typeof d.answers === "object") {
      for (const [k, v] of Object.entries(d.answers as Record<string, unknown>)) {
        if (typeof v === "string") answers[k] = v.slice(0, 2000);
        else if (Array.isArray(v)) answers[k] = v.filter((x): x is string => typeof x === "string");
      }
    }

    return {
      step: ALL_STEPS.includes(d.step as StepId) ? (d.step as StepId) : "services",
      services: Array.isArray(d.services) ? [...new Set(d.services.filter(isServiceKey))] : [],
      answers,
      timeline: str(d.timeline, 40),
      budget: str(d.budget, 40),
      notes: str(d.notes, 2000),
      name: str(d.name, 80),
      business: str(d.business, 100),
      phone: str(d.phone, 30),
      email: str(d.email, 120),
      preferred: PREFERRED_CONTACT.some((p) => p.value === d.preferred)
        ? (d.preferred as PreferredContact)
        : "whatsapp",
      consent: d.consent === true,
    };
  } catch {
    return null;
  }
}

export function saveDraft(d: Draft): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    // Storage full or blocked (private mode) — the form still works, it just won't survive a refresh.
  }
}

export function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore — nothing to clear.
  }
}
