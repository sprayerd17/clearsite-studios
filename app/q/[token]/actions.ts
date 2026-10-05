"use server";

import { revalidatePath } from "next/cache";
import { adminDb, deleteFromStorage, uploadToStorage } from "@/lib/firebase/admin";
import { defaultOnboarding } from "@/lib/quote/defaults";
import { TOKEN_PATTERN, newId } from "@/lib/quote/ids";
import { invoiceNumber, normalizeLead, quoteTotalText, totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import type { LeadData, LeadEvent, ProofFile, UploadedFile } from "@/lib/quote/types";
import { alertStudio } from "@/lib/server/notify";

// Anyone with the link can call these, so every input is checked and only the
// specific change the client is allowed to make is written.

export type ActionResult = { ok: true } | { ok: false; error: string };

class ClientError extends Error {}

interface Change {
  update: Partial<LeadData>;
  event?: string;
  notify?: { subject: string; detail: string };
}

const MAX_PROOF_FILES = 6;
const MAX_PROOF_BYTES = 4 * 1024 * 1024;
const PROOF_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
};

const MAX_CONTENT_BYTES = 10 * 1024 * 1024;
const MAX_FILES_PER_ITEM = 15;
const CONTENT_TYPES: Record<string, string> = {
  ...PROOF_TYPES,
  "image/svg+xml": "svg",
  "image/gif": "gif",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "text/plain": "txt",
};

const ONBOARDING_OPEN = ["accepted", "building"] as const;

function validToken(token: unknown): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

async function findLead(token: string) {
  const snap = await adminDb().collection("leads").where("token", "==", token).limit(1).get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, lead: normalizeLead(snap.docs[0].data() as Partial<LeadData>) };
}

async function updateLeadByToken(
  token: unknown,
  change: (lead: LeadData, now: number) => Change | null,
): Promise<ActionResult> {
  if (!validToken(token)) return { ok: false, error: "This link isn't valid." };
  const db = adminDb();
  const out: { notify?: Change["notify"]; id?: string; lead?: LeadData } = {};
  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(db.collection("leads").where("token", "==", token).limit(1));
      if (snap.empty) throw new ClientError("This link isn't valid anymore.");
      const doc = snap.docs[0];
      const lead = normalizeLead(doc.data() as Partial<LeadData>);
      const now = Date.now();
      const result = change(lead, now);
      out.notify = undefined;
      if (!result) return;
      const events: LeadEvent[] = result.event ? [...lead.events, { at: now, by: "client", text: result.event }] : lead.events;
      tx.update(doc.ref, { ...result.update, events, lastClientActionAt: now, updatedAt: now });
      out.notify = result.notify;
      out.id = doc.id;
      out.lead = lead;
    });
  } catch (e) {
    if (e instanceof ClientError) return { ok: false, error: e.message };
    console.error(e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  if (out.notify && out.lead && out.id) {
    const client = `${out.lead.contact.name}${out.lead.contact.business ? ` — ${out.lead.contact.business}` : ""}`;
    await alertStudio({
      title: out.notify.subject,
      body: `${out.lead.contact.name}: ${out.notify.detail}`,
      lines: [
        { label: "Client", value: client },
        { label: "Update", value: out.notify.detail },
      ],
      path: `/admin/leads/${out.id}`,
      tag: out.notify.subject,
    });
  }
  revalidatePath(`/q/${token}`);
  return { ok: true };
}

export async function acceptQuote(token: string, version: number): Promise<ActionResult> {
  return updateLeadByToken(token, (lead, now) => {
    if (lead.quote.acceptedAt) return null;
    if (lead.status !== "quoted" || !lead.quote.sentAt) throw new ClientError("This quote can't be accepted right now.");
    if (version !== lead.quote.version) {
      throw new ClientError("This quote was just updated. Please refresh the page to see the latest version.");
    }
    const t = totals({ ...lead, status: "accepted" });
    return {
      update: {
        status: "accepted",
        quote: { ...lead.quote, acceptedAt: now },
        onboarding: lead.onboarding.length ? lead.onboarding : defaultOnboarding(),
      },
      event: `Accepted the quote (${quoteTotalText(lead.quote)})`,
      notify: {
        subject: `#${lead.number}: quote accepted`,
        detail: `Accepted the quote for ${quoteTotalText(lead.quote)}. Deposit due: ${formatRand(t.deposit)}.`,
      },
    };
  });
}

/** Proof of payment arrives as a form upload: fields `token` and `file`. */
export async function uploadProofOfPayment(formData: FormData): Promise<ActionResult> {
  const token = formData.get("token");
  const file = formData.get("file");
  if (!validToken(token)) return { ok: false, error: "This link isn't valid." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Please choose a file." };
  if (file.size > MAX_PROOF_BYTES) return { ok: false, error: "That file is too big. Please use a screenshot or a smaller PDF (max 4 MB)." };
  const ext = PROOF_TYPES[file.type];
  if (!ext) return { ok: false, error: "Please upload a photo, screenshot or PDF." };

  let leadId: string;
  try {
    const found = await findLead(token);
    if (!found) return { ok: false, error: "This link isn't valid anymore." };
    if (!totals(found.lead).dueKind) return { ok: false, error: "There's nothing to pay right now." };
    if (found.lead.proofOfPayment.length >= MAX_PROOF_FILES) {
      return { ok: false, error: "You've already uploaded proof of payment. Please send anything else on WhatsApp." };
    }
    leadId = found.id;
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const id = newId();
  const path = `leads/${leadId}/proof/${id}.${ext}`;
  let url: string;
  try {
    url = await uploadToStorage(path, Buffer.from(await file.arrayBuffer()), file.type);
  } catch (e) {
    console.error(e);
    return { ok: false, error: "The upload failed. Please try again." };
  }

  return updateLeadByToken(token, (lead, now) => {
    const t = totals(lead);
    if (!t.dueKind) throw new ClientError("There's nothing to pay right now.");
    const proof: ProofFile = {
      id,
      url,
      path,
      name: file.name.slice(0, 80) || `proof.${ext}`,
      contentType: file.type,
      size: file.size,
      uploadedAt: now,
      kind: t.dueKind,
    };
    const label = t.dueKind === "deposit" ? "deposit" : "balance";
    return {
      update: { proofOfPayment: [...lead.proofOfPayment, proof] },
      event: `Uploaded proof of payment for the ${label}`,
      notify: {
        subject: `#${lead.number}: proof of payment (${label})`,
        detail: `Uploaded proof of payment for ${formatRand(t.dueNow)} (invoice ${invoiceNumber(lead, t.dueKind)}). Check it and confirm.`,
      },
    };
  });
}

export async function saveOnboardingResponse(token: string, itemId: string, response: string): Promise<ActionResult> {
  if (typeof itemId !== "string" || typeof response !== "string") return { ok: false, error: "Invalid response." };
  const text = response.trim().slice(0, 3000);
  return updateLeadByToken(token, (lead) => {
    if (!ONBOARDING_OPEN.includes(lead.status as (typeof ONBOARDING_OPEN)[number])) {
      throw new ClientError("Content can't be changed on this project anymore.");
    }
    const item = lead.onboarding.find((i) => i.id === itemId);
    if (!item) throw new ClientError("This item no longer exists.");
    if (item.response === text) return null;
    return {
      update: { onboarding: lead.onboarding.map((i) => (i.id === itemId ? { ...i, response: text } : i)) },
      event: `Updated "${item.label}"`,
    };
  });
}

/** Content uploads arrive as a form: fields `token`, `itemId` and `file`. */
export async function uploadOnboardingFile(formData: FormData): Promise<ActionResult> {
  const token = formData.get("token");
  const itemId = formData.get("itemId");
  const file = formData.get("file");
  if (!validToken(token)) return { ok: false, error: "This link isn't valid." };
  if (typeof itemId !== "string") return { ok: false, error: "Invalid item." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Please choose a file." };
  if (file.size > MAX_CONTENT_BYTES) return { ok: false, error: `"${file.name}" is too big (max 10 MB per file).` };
  const ext = CONTENT_TYPES[file.type];
  if (!ext) return { ok: false, error: `"${file.name}" isn't a supported file. Use images, PDF, Word or text files.` };

  let leadId: string;
  try {
    const found = await findLead(token);
    if (!found) return { ok: false, error: "This link isn't valid anymore." };
    if (!ONBOARDING_OPEN.includes(found.lead.status as (typeof ONBOARDING_OPEN)[number])) {
      return { ok: false, error: "Content can't be changed on this project anymore." };
    }
    const item = found.lead.onboarding.find((i) => i.id === itemId);
    if (!item) return { ok: false, error: "This item no longer exists." };
    if (item.files.length >= MAX_FILES_PER_ITEM) {
      return { ok: false, error: "That's the maximum for this item. Send anything else on WhatsApp." };
    }
    leadId = found.id;
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const id = newId();
  const path = `leads/${leadId}/content/${id}.${ext}`;
  let url: string;
  try {
    url = await uploadToStorage(path, Buffer.from(await file.arrayBuffer()), file.type);
  } catch (e) {
    console.error(e);
    return { ok: false, error: "The upload failed. Please try again." };
  }

  return updateLeadByToken(token, (lead, now) => {
    const item = lead.onboarding.find((i) => i.id === itemId);
    if (!item) throw new ClientError("This item no longer exists.");
    const uploaded: UploadedFile = {
      id,
      url,
      path,
      name: file.name.slice(0, 120) || `file.${ext}`,
      contentType: file.type,
      size: file.size,
      uploadedAt: now,
    };
    return {
      update: {
        onboarding: lead.onboarding.map((i) => (i.id === itemId ? { ...i, files: [...i.files, uploaded] } : i)),
      },
      event: `Uploaded ${uploaded.name} to "${item.label}"`,
    };
  });
}

export async function removeOnboardingFile(token: string, itemId: string, fileId: string): Promise<ActionResult> {
  let path: string | undefined;
  const result = await updateLeadByToken(token, (lead) => {
    if (!ONBOARDING_OPEN.includes(lead.status as (typeof ONBOARDING_OPEN)[number])) {
      throw new ClientError("Content can't be changed on this project anymore.");
    }
    const item = lead.onboarding.find((i) => i.id === itemId);
    const file = item?.files.find((f) => f.id === fileId);
    if (!item || !file) return null;
    if (item.done) throw new ClientError("This item has already been checked off — WhatsApp me if something needs changing.");
    path = file.path;
    return {
      update: {
        onboarding: lead.onboarding.map((i) =>
          i.id === itemId ? { ...i, files: i.files.filter((f) => f.id !== fileId) } : i,
        ),
      },
      event: `Removed ${file.name} from "${item.label}"`,
    };
  });
  if (result.ok && path) await deleteFromStorage(path).catch((e) => console.error(e));
  return result;
}

/** Called by the client page when they're done adding content, so the studio gets one email. */
export async function notifyContentReady(token: string): Promise<ActionResult> {
  return updateLeadByToken(token, (lead) => {
    if (!ONBOARDING_OPEN.includes(lead.status as (typeof ONBOARDING_OPEN)[number])) return null;
    const files = lead.onboarding.reduce((n, i) => n + i.files.length, 0);
    return {
      update: {},
      event: "Said their content is ready",
      notify: {
        subject: `#${lead.number}: content ready`,
        detail: `Finished adding content (${files} file${files === 1 ? "" : "s"}). Check it in the admin.`,
      },
    };
  });
}
