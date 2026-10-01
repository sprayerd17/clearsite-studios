"use client";

/**
 * Admin-side reads and writes. Runs in the browser with the signed-in admin's
 * credentials; firestore.rules only allows accounts listed in `admins`.
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { withDefaults } from "@/lib/quote/defaults";
import { normalizeLead } from "@/lib/quote/leads";
import type { Lead, LeadData, PriceItem, Settings } from "@/lib/quote/types";
import { fb } from "./client";

type OnError = (e: Error) => void;

function toLead(snap: DocumentSnapshot): Lead {
  return { id: snap.id, ...normalizeLead(snap.data() as Partial<LeadData>) };
}

/** Every lead, newest first. Small studio volumes, so no paging needed. */
export function subscribeLeads(cb: (leads: Lead[]) => void, onError?: OnError): Unsubscribe {
  return onSnapshot(
    query(collection(fb().db, "leads"), orderBy("createdAt", "desc")),
    (snap) => cb(snap.docs.map(toLead)),
    onError,
  );
}

export function subscribeLead(id: string, cb: (lead: Lead | null) => void, onError?: OnError): Unsubscribe {
  return onSnapshot(
    doc(fb().db, "leads", id),
    (snap) => cb(snap.exists() ? toLead(snap) : null),
    onError,
  );
}

/**
 * Changes a lead inside a transaction, so a client's response (accepting the
 * quote, uploading proof) is never overwritten by a stale admin screen.
 * Return null from `change` to skip the write.
 */
export async function mutateLead(
  id: string,
  change: (lead: Lead) => Partial<LeadData> | null,
  event?: string,
): Promise<void> {
  const { db } = fb();
  await runTransaction(db, async (tx) => {
    const ref = doc(db, "leads", id);
    const snap = await tx.get(ref);
    if (!snap.exists()) throw new Error("Lead not found");
    const lead = toLead(snap);
    const update = change(structuredClone(lead));
    if (!update) return;
    const now = Date.now();
    tx.update(ref, {
      ...update,
      ...(event ? { events: [...lead.events, { at: now, by: "admin", text: event }] } : {}),
      updatedAt: now,
    });
  });
}

/** Marks a lead as opened so it stops showing as new in the list. */
export async function markSeen(id: string): Promise<void> {
  await updateDoc(doc(fb().db, "leads", id), { seenAt: Date.now() });
}

export async function deleteLead(id: string): Promise<void> {
  await deleteDoc(doc(fb().db, "leads", id));
}

/* ─── Price list ────────────────────────────────────────────────────────── */

export function subscribePrices(cb: (prices: PriceItem[]) => void, onError?: OnError): Unsubscribe {
  return onSnapshot(
    collection(fb().db, "prices"),
    (snap) =>
      cb(
        snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<PriceItem, "id">) }))
          .map((p) => ({ ...p, autoAddFor: p.autoAddFor ?? [], order: p.order ?? 0, active: p.active ?? true }))
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
      ),
    onError,
  );
}

export async function savePrice(item: Omit<PriceItem, "id"> & { id?: string }): Promise<void> {
  const { id, ...data } = item;
  if (id) await setDoc(doc(fb().db, "prices", id), data);
  else await addDoc(collection(fb().db, "prices"), data);
}

export async function deletePrice(id: string): Promise<void> {
  await deleteDoc(doc(fb().db, "prices", id));
}

/* ─── Settings ──────────────────────────────────────────────────────────── */

export function subscribeSettings(cb: (settings: Settings) => void, onError?: OnError): Unsubscribe {
  return onSnapshot(
    doc(fb().db, "settings", "business"),
    (snap) => cb(withDefaults(snap.data() as Partial<Settings> | undefined)),
    onError,
  );
}

export async function saveSettings(settings: Settings): Promise<void> {
  await setDoc(doc(fb().db, "settings", "business"), settings);
}
