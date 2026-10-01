import "server-only";
import { connection } from "next/server";
import { cache } from "react";
import { adminDb } from "@/lib/firebase/admin";
import { withDefaults } from "@/lib/quote/defaults";
import { TOKEN_PATTERN } from "@/lib/quote/ids";
import { normalizeLead } from "@/lib/quote/leads";
import type { Lead, LeadData, Settings } from "@/lib/quote/types";

/** Looks up a lead by the secret token in the client's link. Always fetched fresh. */
export const getLeadByToken = cache(async (token: string): Promise<Lead | null> => {
  await connection();
  if (!TOKEN_PATTERN.test(token)) return null;
  const snap = await adminDb().collection("leads").where("token", "==", token).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...normalizeLead(doc.data() as Partial<LeadData>) };
});

export const getSettings = cache(async (): Promise<Settings> => {
  await connection();
  const snap = await adminDb().doc("settings/business").get();
  return withDefaults(snap.data() as Partial<Settings> | undefined);
});

/**
 * What the client page is allowed to see. Private admin notes and the event
 * history never leave the server.
 */
export type PublicLead = Omit<Lead, "notes" | "events" | "seenAt" | "id">;

export function toPublicLead(lead: Lead): PublicLead {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { notes, events, seenAt, id, ...rest } = lead;
  return rest;
}
