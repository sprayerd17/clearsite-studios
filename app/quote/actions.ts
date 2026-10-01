"use server";

import { adminDb, isFirebaseConfigured } from "@/lib/firebase/admin";
import { BUDGETS, PREFERRED_CONTACT, SERVICES, TIMELINES, visibleQuestions } from "@/lib/quote/brief";
import { withDefaults } from "@/lib/quote/defaults";
import { newToken } from "@/lib/quote/ids";
import { draftItems } from "@/lib/quote/leads";
import { isValidPhone, normalizePhone } from "@/lib/quote/phone";
import type { Brief, Contact, LeadData, PriceItem, ServiceKey, Settings } from "@/lib/quote/types";
import { notifyNewLead, sendToFormspree } from "@/lib/server/notify";

/** What the quote builder sends. Everything is re-checked here — never trust the browser. */
export interface BriefInput {
  services: string[];
  answers: Record<string, string | string[]>;
  timeline: string;
  budget: string;
  notes: string;
  contact: {
    name: string;
    business: string;
    phone: string;
    email: string;
    preferred: string;
  };
  consent: boolean;
  /** Honeypot — real people never see or fill this field. */
  website?: string;
  /** When the form was opened (ms). Submissions faster than a few seconds are bots. */
  startedAt: number;
}

export type SubmitResult =
  | { ok: true; token: string | null }
  | { ok: false; error: string; field?: string };

const FIRST_LEAD_NUMBER = 1001;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class InputError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
  }
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function validate(input: BriefInput): { brief: Brief; contact: Contact } {
  const serviceKeys = SERVICES.map((s) => s.value);
  const services = [...new Set(Array.isArray(input.services) ? input.services : [])].filter((s): s is ServiceKey =>
    serviceKeys.includes(s as ServiceKey),
  );
  if (services.length === 0) throw new InputError("Pick at least one thing you need.", "services");

  const answers: Record<string, string | string[]> = {};
  for (const q of visibleQuestions(services)) {
    const raw = input.answers?.[q.id];
    const allowed = (q.options ?? []).map((o) => o.value);
    if (q.type === "text") {
      const v = clean(raw, 1500);
      if (!v && !q.optional) throw new InputError(`Please answer: ${q.label}`, q.id);
      if (v) answers[q.id] = v;
    } else if (q.type === "single") {
      const v = typeof raw === "string" && allowed.includes(raw) ? raw : "";
      if (!v && !q.optional) throw new InputError(`Please answer: ${q.label}`, q.id);
      if (v) answers[q.id] = v;
    } else {
      const v = (Array.isArray(raw) ? raw : []).filter((x) => typeof x === "string" && allowed.includes(x));
      if (v.length === 0 && !q.optional) throw new InputError(`Please answer: ${q.label}`, q.id);
      if (v.length) answers[q.id] = [...new Set(v)];
    }
  }

  const timeline = TIMELINES.some((t) => t.value === input.timeline) ? input.timeline : "";
  if (!timeline) throw new InputError("Please choose a timeline.", "timeline");
  const budget = BUDGETS.some((b) => b.value === input.budget) ? input.budget : "";
  if (!budget) throw new InputError("Please choose a budget range.", "budget");

  const name = clean(input.contact?.name, 80);
  if (!name) throw new InputError("Please enter your name.", "name");
  const phone = normalizePhone(clean(input.contact?.phone, 30));
  if (!isValidPhone(phone)) throw new InputError("Please enter a valid WhatsApp number.", "phone");
  const email = clean(input.contact?.email, 120);
  if (email && !EMAIL_PATTERN.test(email)) throw new InputError("That email address doesn't look right.", "email");
  const preferred = PREFERRED_CONTACT.some((p) => p.value === input.contact?.preferred)
    ? (input.contact.preferred as Contact["preferred"])
    : "whatsapp";
  if (preferred === "email" && !email) throw new InputError("Add your email address so I can reply there.", "email");

  return {
    brief: { services, answers, timeline, budget, notes: clean(input.notes, 2000) },
    contact: { name, business: clean(input.contact?.business, 100), phone, email, preferred },
  };
}

export async function submitBrief(input: BriefInput): Promise<SubmitResult> {
  if (input.website) return { ok: false, error: "Something went wrong. Please try again." };
  if (!input.startedAt || Date.now() - input.startedAt < 4000) {
    return { ok: false, error: "That was quick! Please check your answers and try again." };
  }
  if (!input.consent) return { ok: false, error: "Please tick the box so I can contact you about your request.", field: "consent" };

  let brief: Brief;
  let contact: Contact;
  try {
    ({ brief, contact } = validate(input));
  } catch (e) {
    if (e instanceof InputError) return { ok: false, error: e.message, field: e.field };
    throw e;
  }

  // Before Firebase is set up, requests still reach the inbox via Formspree.
  if (!isFirebaseConfigured()) {
    const sent = await sendToFormspree(contact, brief);
    return sent
      ? { ok: true, token: null }
      : { ok: false, error: "Your request couldn't be sent. Please WhatsApp me instead." };
  }

  const db = adminDb();
  const token = newToken();
  let leadId = "";
  let number = 0;
  try {
    const [pricesSnap, settingsSnap] = await Promise.all([
      db.collection("prices").get(),
      db.doc("settings/business").get(),
    ]);
    const prices = pricesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PriceItem, "id">) }))
      .map((p) => ({ ...p, autoAddFor: p.autoAddFor ?? [], order: p.order ?? 0, active: p.active ?? true }));
    const settings: Settings = withDefaults(settingsSnap.data() as Partial<Settings> | undefined);

    await db.runTransaction(async (tx) => {
      const counterRef = db.doc("counters/leads");
      const counter = await tx.get(counterRef);
      number = ((counter.data()?.value as number | undefined) ?? FIRST_LEAD_NUMBER - 1) + 1;
      const now = Date.now();
      const ref = db.collection("leads").doc();
      leadId = ref.id;
      const lead: LeadData = {
        number,
        token,
        createdAt: now,
        updatedAt: now,
        status: "new",
        contact,
        brief,
        quote: {
          items: draftItems(brief, prices),
          notes: "",
          depositPercent: settings.depositPercent,
          validDays: settings.quoteValidDays,
          version: 0,
        },
        payments: [],
        proofOfPayment: [],
        onboarding: [],
        notes: "",
        events: [{ at: now, by: "client", text: "Sent a quote request" }],
        lastClientActionAt: now,
      };
      tx.set(counterRef, { value: number });
      tx.set(ref, lead);
    });
  } catch (e) {
    console.error("[quote] saving failed", e);
    return { ok: false, error: "Your request couldn't be saved. Please try again, or WhatsApp me instead." };
  }

  await notifyNewLead(number, leadId, contact, brief);
  return { ok: true, token };
}
