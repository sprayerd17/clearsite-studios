"use client";

import { useState, type ReactNode } from "react";
import { Check, WhatsApp, X } from "@/components/icons";
import { mutateLead } from "@/lib/firebase/data";
import { defaultOnboarding } from "@/lib/quote/defaults";
import { formatDate, formatDateTime, quoteExpiresAt, quoteTotalText, STATUS, totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { newId } from "@/lib/quote/ids";
import { firstName } from "@/lib/quote/phone";
import type { Lead, LeadStatus, PaymentKind, Settings } from "@/lib/quote/types";
import { templateLink } from "../format";
import { AlertIcon, PencilIcon, RocketIcon, RotateIcon } from "../icons";
import { Button, ConfirmButton, ErrorText, MoneyInput, buttonClass } from "../ui";
import { useAction } from "../useAction";
import { FileList } from "./Files";
import type { QuoteDraftApi } from "./useQuoteDraft";

/** Where a reopened lead picks up again, based on how far it got. */
function reopenStatus(lead: Lead): LeadStatus {
  if (lead.launchedAt) return "launched";
  if (lead.payments.some((p) => p.kind === "deposit")) return "building";
  if (lead.quote.acceptedAt) return "accepted";
  if (lead.quote.sentAt) return "quoted";
  return "new";
}

const ACTIVE: LeadStatus[] = ["new", "quoted", "accepted", "building", "launched"];

interface FollowUp {
  text: string;
  label: string;
  href: string;
  event: string;
}

/** What to do now for this lead, with the main action for its status. */
export function NextStep({
  lead,
  settings,
  quote,
  onEditQuote,
}: {
  lead: Lead;
  settings: Settings;
  quote: QuoteDraftApi;
  onEditQuote: () => void;
}) {
  const { run, pending, busy, errorFor } = useAction();
  const [followUp, setFollowUp] = useState<FollowUp | null>(null);
  const t = totals(lead);
  const name = firstName(lead.contact.name) || "the client";

  // Amount box for "received" actions; follows what's due until edited.
  const dueKey = `${lead.status}:${t.dueNow}`;
  const [amount, setAmount] = useState(t.dueNow);
  const [amountKey, setAmountKey] = useState(dueKey);
  if (amountKey !== dueKey) {
    setAmountKey(dueKey);
    setAmount(t.dueNow);
  }

  const logWhatsApp = (event: string) => () => {
    mutateLead(lead.id, () => ({}), event).catch((e) => console.error(e));
  };

  async function recordPayment(kind: PaymentKind) {
    if (amount <= 0 && !confirm(`No amount entered. ${kind === "deposit" ? "Start the build" : "Mark as paid"} without recording a payment?`)) return;
    const key = `paid-${kind}`;
    const ok = await run(
      () =>
        mutateLead(
          lead.id,
          (l) => {
            if (l.status !== lead.status) throw new Error("This lead changed on another screen. Check the latest status and try again.");
            const payments =
              amount > 0 ? [...l.payments, { id: newId(), kind, amount, at: Date.now() }] : l.payments;
            if (kind === "deposit") return { payments, status: "building" };
            const paid = payments.reduce((s, p) => s + p.amount, 0);
            const total = totals(l).total;
            return paid >= total ? { payments, status: "complete" } : { payments };
          },
          amount > 0
            ? `Recorded ${kind} payment of ${formatRand(amount)}`
            : kind === "deposit"
              ? "Started the build without a recorded deposit"
              : "Marked as paid",
        ),
      key,
    );
    if (ok && kind === "deposit") {
      setFollowUp({
        text: `Deposit recorded and the build has started. Let ${name} know — their page now asks for their content.`,
        label: "Send deposit confirmation",
        href: templateLink(lead, settings.templates.depositReceived),
        event: "Sent deposit confirmation on WhatsApp",
      });
    }
  }

  async function markLive() {
    if (!confirm(`Mark #${lead.number} as live? The balance of ${formatRand(t.outstanding)} becomes due on ${name}'s page.`)) return;
    const ok = await run(
      () =>
        mutateLead(
          lead.id,
          (l) => (l.status === "building" ? { status: "launched", launchedAt: Date.now() } : null),
          "Marked as live — balance due",
        ),
      "live",
    );
    if (ok) {
      setFollowUp({
        text: `#${lead.number} is live. Let ${name} know and send the final invoice.`,
        label: "Send launch message",
        href: templateLink(lead, settings.templates.launched, { balance: formatRand(t.outstanding) }),
        event: "Sent launch message on WhatsApp",
      });
    }
  }

  const markAccepted = () =>
    run(
      () =>
        mutateLead(
          lead.id,
          (l) =>
            l.status !== "quoted"
              ? null
              : {
                  status: "accepted",
                  quote: { ...l.quote, acceptedAt: Date.now() },
                  onboarding: l.onboarding.length ? l.onboarding : defaultOnboarding(),
                },
          "Marked the quote as accepted",
        ),
      "accept",
    );

  const closeLead = () => {
    setFollowUp(null);
    return run(
      () => mutateLead(lead.id, () => ({ status: "closed", closedAt: Date.now() }), "Closed the lead"),
      "close",
    );
  };

  const reopen = () => {
    const status = reopenStatus(lead);
    return run(
      () => mutateLead(lead.id, () => ({ status }), `Reopened the lead (${STATUS[status].label})`),
      "reopen",
    );
  };

  const proofs = (kind: PaymentKind) => {
    const files = lead.proofOfPayment.filter((p) => p.kind === kind);
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
          Proof of payment {files.length > 0 && <span className="text-lime">· {files.length}</span>}
        </p>
        {files.length ? (
          <FileList files={files} />
        ) : (
          <p className="text-sm text-white/55">Nothing uploaded yet. It shows here when {name} uploads it on their page.</p>
        )}
      </div>
    );
  };

  const amountBox = (label: string) => (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">{label}</label>
      <MoneyInput value={amount} onChange={setAmount} aria-label={label} />
    </div>
  );

  let step: ReactNode;
  switch (lead.status) {
    case "new":
      step = (
        <Step title="Review and send the quote" text="Review the draft quote below and send it. WhatsApp opens with the message typed in — just press send.">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <span className="text-white/60">
              {quote.draft.items.length} item{quote.draft.items.length === 1 ? "" : "s"}
              {quote.dirty && <span className="text-amber-300"> · unsaved edits included</span>}
            </span>
            <span className="font-semibold tabular-nums">
              {formatRand(quote.total)}
              {quote.draft.monthlyAmount > 0 && (
                <span className="font-normal text-white/60"> + {formatRand(quote.draft.monthlyAmount)}/mo</span>
              )}
            </span>
          </div>
          <Button variant="lime" size="lg" className="w-full" onClick={() => quote.send("send-next")} pending={quote.pending("send-next")} disabled={quote.busy}>
            {!quote.pending("send-next") && <WhatsApp size={18} />} Send quote
          </Button>
          <ErrorText>{quote.errorFor("send-next")}</ErrorText>
        </Step>
      );
      break;

    case "quoted": {
      const sentAt = lead.quote.sentAt;
      const expires = quoteExpiresAt(lead.quote);
      const expired = expires !== null && expires < Date.now();
      step = (
        <Step
          title={`Waiting for ${name} to accept`}
          text={sentAt ? `Quote v${lead.quote.version} (${quoteTotalText(lead.quote)}) sent ${formatDateTime(sentAt)}.` : undefined}
        >
          {expired && expires && (
            <p className="flex items-start gap-2 rounded-xl bg-amber-300/10 px-3.5 py-2.5 text-sm text-amber-200">
              <AlertIcon size={16} className="mt-0.5 shrink-0" /> This quote expired on {formatDate(expires)}. Edit and resend it to refresh the date.
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={templateLink(lead, settings.templates.quoteReady, { total: quoteTotalText(lead.quote) })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={logWhatsApp("Resent the quote on WhatsApp")}
              className={buttonClass("lime", "md", "w-full")}
            >
              <WhatsApp size={17} /> Resend on WhatsApp
            </a>
            <Button variant="ghostDark" className="w-full" onClick={onEditQuote}>
              <PencilIcon size={16} /> Edit quote
            </Button>
          </div>
          <ConfirmButton
            variant="quietDark"
            className="w-full sm:w-auto"
            onConfirm={markAccepted}
            pending={pending("accept")}
            disabled={busy}
            confirmLabel="Tap again to mark accepted"
          >
            <Check size={16} /> They accepted on WhatsApp
          </ConfirmButton>
        </Step>
      );
      break;
    }

    case "accepted":
      step = (
        <Step
          title={t.dueNow > 0 ? `Deposit of ${formatRand(t.dueNow)} due` : "Deposit due"}
          text={`${lead.quote.acceptedAt ? `Accepted ${formatDateTime(lead.quote.acceptedAt)}. ` : ""}When the money is in, record it to start the build.`}
        >
          {proofs("deposit")}
          {amountBox("Amount received")}
          <Button variant="lime" size="lg" className="w-full" onClick={() => recordPayment("deposit")} pending={pending("paid-deposit")} disabled={busy}>
            {!pending("paid-deposit") && <Check size={18} />} Deposit received
          </Button>
        </Step>
      );
      break;

    case "building": {
      const done = lead.onboarding.filter((i) => i.done).length;
      step = (
        <Step
          title="Build in progress"
          text={
            lead.onboarding.length
              ? `Content: ${done} of ${lead.onboarding.length} ready.`
              : "No content checklist yet — create one below if you need content from the client."
          }
        >
          {lead.onboarding.length > 0 && (
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${(done / lead.onboarding.length) * 100}%` }} />
            </div>
          )}
          <Button variant="lime" size="lg" className="w-full" onClick={markLive} pending={pending("live")} disabled={busy}>
            {!pending("live") && <RocketIcon size={18} />} Mark as live
          </Button>
        </Step>
      );
      break;
    }

    case "launched":
      step = (
        <Step
          title={`Balance of ${formatRand(t.dueNow)} due`}
          text={`${lead.launchedAt ? `Live since ${formatDate(lead.launchedAt)}. ` : ""}Record the final payment when it arrives.`}
        >
          {proofs("balance")}
          {amountBox("Amount received")}
          <Button variant="lime" size="lg" className="w-full" onClick={() => recordPayment("balance")} pending={pending("paid-balance")} disabled={busy}>
            {!pending("paid-balance") && <Check size={18} />} Balance received
          </Button>
        </Step>
      );
      break;

    case "complete":
      step = (
        <Step
          title="Paid in full"
          text={`${formatRand(t.paid)} received${lead.launchedAt ? ` · live since ${formatDate(lead.launchedAt)}` : ""}. Nothing left to do.`}
        >
          <a
            href={templateLink(lead, settings.templates.general)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={logWhatsApp("Messaged the client on WhatsApp")}
            className={buttonClass("ghostDark", "md", "w-full sm:w-auto")}
          >
            <WhatsApp size={17} /> Message {name}
          </a>
        </Step>
      );
      break;

    case "closed":
      step = (
        <Step
          title="Lead closed"
          text={`${lead.closedAt ? `Closed ${formatDateTime(lead.closedAt)}. ` : ""}Reopening puts it back to “${STATUS[reopenStatus(lead)].label}”.`}
        >
          <Button variant="lime" onClick={reopen} pending={pending("reopen")} disabled={busy} className="w-full sm:w-auto">
            {!pending("reopen") && <RotateIcon size={17} />} Reopen
          </Button>
        </Step>
      );
      break;
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-ink text-white shadow-frame sm:rounded-3xl">
      <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative space-y-4 p-5 sm:p-6">
        {followUp && (
          <div className="rounded-2xl bg-lime p-4 text-ink">
            <div className="flex items-start gap-3">
              <p className="flex-1 text-sm font-medium leading-relaxed">{followUp.text}</p>
              <button
                type="button"
                onClick={() => setFollowUp(null)}
                className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-ink/10"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
            <a
              href={followUp.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                logWhatsApp(followUp.event)();
                setFollowUp(null);
              }}
              className={buttonClass("ink", "md", "mt-3 w-full")}
            >
              <WhatsApp size={17} /> {followUp.label}
            </a>
          </div>
        )}

        {step}

        <ErrorText>{errorFor("paid-deposit") || errorFor("paid-balance") || errorFor("live") || errorFor("accept") || errorFor("close") || errorFor("reopen")}</ErrorText>

        {ACTIVE.includes(lead.status) && (
          <div className="flex justify-end border-t border-white/10 pt-3">
            <ConfirmButton
              variant="quietDark"
              size="sm"
              onConfirm={closeLead}
              pending={pending("close")}
              disabled={busy}
              confirmLabel="Tap again to close"
            >
              <X size={15} /> Close lead
            </ConfirmButton>
          </div>
        )}
      </div>
    </section>
  );
}

function Step({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-lime">
          <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_0_3px_rgba(198,242,78,0.22)]" />
          Next step
        </p>
        <h2 className="mt-2 text-[22px] tracking-[-0.03em] text-white">{title}</h2>
        {text && <p className="mt-1.5 text-sm leading-relaxed text-white/60">{text}</p>}
      </div>
      {children}
    </div>
  );
}
