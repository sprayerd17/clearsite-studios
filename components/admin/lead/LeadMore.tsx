"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Check, Clock } from "@/components/icons";
import { deleteLead, mutateLead } from "@/lib/firebase/data";
import { briefSummary, budgetLabel, timelineLabel } from "@/lib/quote/brief";
import { formatDateTime } from "@/lib/quote/leads";
import type { Lead, LeadEvent } from "@/lib/quote/types";
import { BanknoteIcon, TrashIcon } from "../icons";
import { Button, Card, CardBody, CardHeader, Chip, ConfirmButton, ErrorText, Textarea } from "../ui";
import { useAction, useFlash } from "../useAction";

/* ─── Brief ─────────────────────────────────────────────────────────────── */

export function BriefCard({ lead }: { lead: Lead }) {
  const { brief } = lead;
  const lines = briefSummary(brief).filter((l) => l.label !== "Timeline" && l.label !== "Budget");

  return (
    <Card>
      <CardHeader eyebrow="Brief" title="What they asked for" />
      <CardBody>
        {(brief.timeline || brief.budget) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {brief.timeline && (
              <Chip tone="muted" className="py-1.5">
                <Clock size={14} /> {timelineLabel(brief.timeline)}
              </Chip>
            )}
            {brief.budget && (
              <Chip tone="muted" className="py-1.5">
                <BanknoteIcon size={14} /> {budgetLabel(brief.budget)}
              </Chip>
            )}
          </div>
        )}
        <dl className="divide-y divide-line">
          {lines.map((line) => (
            <div key={line.label} className="py-3 first:pt-0 last:pb-0">
              <dt className="text-xs font-medium text-muted">{line.label}</dt>
              <dd className="mt-1 whitespace-pre-line text-[15px] leading-relaxed text-ink">{line.value || "—"}</dd>
            </div>
          ))}
        </dl>
      </CardBody>
    </Card>
  );
}

/* ─── Private notes ─────────────────────────────────────────────────────── */

export function NotesCard({ lead }: { lead: Lead }) {
  const [text, setText] = useState(lead.notes);
  const [synced, setSynced] = useState(lead.notes);
  // Follow notes saved elsewhere while there are no local edits.
  if (lead.notes !== synced) {
    setSynced(lead.notes);
    if (text === synced) setText(lead.notes);
  }
  const dirty = text !== lead.notes;
  const { run, pending, error } = useAction();
  const [saved, flashSaved] = useFlash();

  async function save() {
    if (await run(() => mutateLead(lead.id, () => ({ notes: text })))) flashSaved();
  }

  return (
    <Card>
      <CardHeader eyebrow="Private notes" title="Notes" subtitle="Only you can see these — they never show on the client's page." />
      <CardBody className="space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Calls, decisions, logins to set up, anything to remember…"
          className="min-h-32"
          aria-label="Private notes"
        />
        <ErrorText>{error}</ErrorText>
        <div className="flex items-center justify-end gap-3">
          {saved && !dirty && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lime-ink">
              <Check size={15} /> Saved
            </span>
          )}
          <Button variant="ink" size="sm" onClick={save} pending={pending()} disabled={!dirty}>
            Save notes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

/* ─── History ───────────────────────────────────────────────────────────── */

const BY: Record<LeadEvent["by"], { label: string; dot: string }> = {
  client: { label: "Client", dot: "bg-lime-deep" },
  admin: { label: "You", dot: "bg-ink" },
  system: { label: "System", dot: "bg-line-strong" },
};

export function HistoryCard({ lead }: { lead: Lead }) {
  const [all, setAll] = useState(false);
  const events = [...lead.events].sort((a, b) => b.at - a.at);
  const shown = all ? events : events.slice(0, 6);

  return (
    <Card>
      <CardHeader eyebrow="History" title="Activity" />
      <CardBody>
        {events.length === 0 ? (
          <p className="text-sm text-muted">Nothing yet.</p>
        ) : (
          <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-line">
            {shown.map((e, i) => (
              <li key={`${e.at}-${i}`} className="relative flex gap-3.5">
                <span className={`relative z-[1] mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full ring-4 ring-white ${BY[e.by]?.dot ?? "bg-line-strong"}`} />
                <div className="min-w-0">
                  <p className="text-[15px] leading-snug text-ink">{e.text}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <Calendar size={12} />
                    {formatDateTime(e.at)} · {BY[e.by]?.label ?? e.by}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
        {events.length > shown.length && (
          <button
            type="button"
            onClick={() => setAll(true)}
            className="mt-4 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Show all {events.length} events
          </button>
        )}
      </CardBody>
    </Card>
  );
}

/* ─── Danger zone ───────────────────────────────────────────────────────── */

/** `onDeleting` lets the page show a loader instead of "not found" while it navigates away. */
export function DangerZone({ lead, onDeleting }: { lead: Lead; onDeleting: (deleting: boolean) => void }) {
  const router = useRouter();
  const { run, pending, error } = useAction();

  async function remove() {
    const who = lead.contact.name || "this client";
    if (!confirm(`Permanently delete #${lead.number} for ${who}? Their client link stops working and this can't be undone.`)) return;
    onDeleting(true);
    const ok = await run(() => deleteLead(lead.id));
    if (ok) router.push("/admin");
    else onDeleting(false);
  }

  return (
    <Card className="border-red-200/70">
      <CardHeader eyebrow="Danger zone" title="Delete lead" subtitle="Removes the lead, its quote, payments and history for good." />
      <CardBody className="space-y-3">
        <ErrorText>{error}</ErrorText>
        <ConfirmButton onConfirm={remove} pending={pending()} confirmLabel="Tap again to delete">
          <TrashIcon size={16} /> Delete #{lead.number}
        </ConfirmButton>
      </CardBody>
    </Card>
  );
}
