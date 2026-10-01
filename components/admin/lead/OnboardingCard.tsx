"use client";

import { useState } from "react";
import { Check, ClipboardCheck, Plus } from "@/components/icons";
import { mutateLead } from "@/lib/firebase/data";
import { defaultOnboarding } from "@/lib/quote/defaults";
import { newId } from "@/lib/quote/ids";
import type { Lead, OnboardingItem } from "@/lib/quote/types";
import { Button, Card, CardBody, CardHeader, ErrorText, Field, Input, Spinner } from "../ui";
import { useAction } from "../useAction";
import { FileList } from "./Files";

/** The content the client sends after accepting: their answers and uploads per item. */
export function OnboardingCard({ lead }: { lead: Lead }) {
  const items = lead.onboarding;
  const { run, pending, error, busy } = useAction();
  const [adding, setAdding] = useState(false);
  const canCreate = lead.status === "accepted" || lead.status === "building";

  if (items.length === 0) {
    if (!canCreate) return null;
    return (
      <Card>
        <CardHeader eyebrow="Content" title="Content checklist" subtitle="Logo, photos, text and details the client uploads on their page." />
        <CardBody className="space-y-3">
          <ErrorText>{error}</ErrorText>
          <Button
            variant="ink"
            onClick={() =>
              run(
                () =>
                  mutateLead(lead.id, (l) => (l.onboarding.length ? null : { onboarding: defaultOnboarding() }), "Created the content checklist"),
                "create",
              )
            }
            pending={pending("create")}
          >
            {!pending("create") && <ClipboardCheck size={17} />} Create content checklist
          </Button>
        </CardBody>
      </Card>
    );
  }

  const done = items.filter((i) => i.done).length;

  const toggle = (item: OnboardingItem) =>
    run(
      () =>
        mutateLead(
          lead.id,
          (l) => ({ onboarding: l.onboarding.map((i) => (i.id === item.id ? { ...i, done: !item.done } : i)) }),
          `${item.done ? "Reopened" : "Ticked off"} “${item.label}”`,
        ),
      `toggle-${item.id}`,
    );

  return (
    <Card>
      <CardHeader
        eyebrow="Content"
        title="Content checklist"
        subtitle={`${done} of ${items.length} ready`}
        action={
          !adding && (
            <Button size="sm" onClick={() => setAdding(true)}>
              <Plus size={16} /> Add item
            </Button>
          )
        }
      />
      <CardBody className="space-y-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-paper">
          <div className="h-full rounded-full bg-lime-deep transition-all duration-500" style={{ width: `${(done / items.length) * 100}%` }} />
        </div>

        <ErrorText>{error}</ErrorText>

        <ul className="space-y-2.5">
          {items.map((item) => {
            const isPending = pending(`toggle-${item.id}`);
            return (
              <li key={item.id} className={`rounded-2xl border p-4 transition-colors ${item.done ? "border-line bg-paper/60" : "border-line bg-white"}`}>
                <div className="flex gap-3.5">
                  <button
                    type="button"
                    onClick={() => toggle(item)}
                    disabled={busy}
                    role="checkbox"
                    aria-checked={item.done}
                    aria-label={`${item.label}: mark ${item.done ? "not done" : "done"}`}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border-2 transition-colors disabled:opacity-60 ${
                      item.done ? "border-lime-deep bg-lime text-ink" : "border-line-strong bg-white text-transparent hover:border-ink/40"
                    }`}
                  >
                    {isPending ? <Spinner className="h-4 w-4 text-muted" /> : <Check size={17} strokeWidth={2.5} />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className={`font-medium ${item.done ? "text-muted" : "text-ink"}`}>{item.label}</p>
                      {item.done && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lime-ink">Done</span>}
                    </div>
                    {item.hint && <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.hint}</p>}
                    {item.response.trim() ? (
                      <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-paper px-3.5 py-2.5 text-sm leading-relaxed text-ink">
                        {item.response}
                      </p>
                    ) : (
                      item.files.length === 0 && <p className="mt-2 text-sm text-muted-light">Nothing from the client yet.</p>
                    )}
                    {item.files.length > 0 && (
                      <div className="mt-3">
                        <FileList files={item.files} />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {adding && <AddItem lead={lead} onDone={() => setAdding(false)} />}
      </CardBody>
    </Card>
  );
}

function AddItem({ lead, onDone }: { lead: Lead; onDone: () => void }) {
  const [label, setLabel] = useState("");
  const [hint, setHint] = useState("");
  const { run, pending, error, fail } = useAction();

  async function add() {
    const name = label.trim();
    if (!name) return fail("Give the item a name.");
    const item: OnboardingItem = { id: newId(), label: name, hint: hint.trim(), done: false, response: "", files: [] };
    const ok = await run(() =>
      mutateLead(lead.id, (l) => ({ onboarding: [...l.onboarding, item] }), `Added “${name}” to the content checklist`),
    );
    if (ok) onDone();
  }

  return (
    <div className="space-y-3 rounded-2xl border border-line bg-paper/60 p-4">
      <Field label="Item">
        <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Menu PDF" autoFocus />
      </Field>
      <Field label="Hint for the client (optional)">
        <Input value={hint} onChange={(e) => setHint(e.target.value)} placeholder="What you need and in what format" />
      </Field>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2">
        <Button variant="quiet" size="sm" onClick={onDone}>
          Cancel
        </Button>
        <Button variant="ink" size="sm" onClick={add} pending={pending()}>
          Add item
        </Button>
      </div>
    </div>
  );
}
