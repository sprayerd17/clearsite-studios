"use client";

import Link from "next/link";
import { use, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowLeft } from "@/components/icons";
import { useAdmin } from "@/components/admin/AdminProvider";
import { LeadHeader } from "@/components/admin/lead/LeadHeader";
import { BriefCard, DangerZone, HistoryCard, NotesCard } from "@/components/admin/lead/LeadMore";
import { NextStep } from "@/components/admin/lead/NextStep";
import { OnboardingCard } from "@/components/admin/lead/OnboardingCard";
import { PaymentsCard } from "@/components/admin/lead/PaymentsCard";
import { QuoteCard } from "@/components/admin/lead/QuoteCard";
import { useQuoteDraft } from "@/components/admin/lead/useQuoteDraft";
import { EmptyState, ErrorText, PageLoader, buttonClass } from "@/components/admin/ui";
import { friendlyError } from "@/components/admin/useAction";
import { markSeen, subscribeLead } from "@/lib/firebase/data";
import type { Lead } from "@/lib/quote/types";

export default function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lead, setLead] = useState<Lead | null | undefined>(undefined);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(
    () =>
      subscribeLead(
        id,
        (l) => {
          setLead(l);
          setError("");
        },
        (e) => {
          console.error(e);
          setError(friendlyError(e));
        },
      ),
    [id],
  );

  // Opening a lead stops it showing as new in the list.
  const seenRequested = useRef(false);
  useEffect(() => {
    if (lead && !lead.seenAt && !seenRequested.current) {
      seenRequested.current = true;
      markSeen(lead.id).catch((e) => console.error(e));
    }
  }, [lead]);

  if (lead === undefined) {
    return error ? (
      <div className="mx-auto max-w-3xl space-y-4">
        <BackLink />
        <ErrorText>{error}</ErrorText>
      </div>
    ) : (
      <PageLoader label="Loading lead" />
    );
  }

  if (lead === null) {
    if (deleting) return <PageLoader label="Deleting" />;
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <BackLink />
        <EmptyState
          title="Lead not found"
          action={
            <Link href="/admin" className={buttonClass("ink", "sm")}>
              Back to leads
            </Link>
          }
        >
          This lead doesn&apos;t exist — it may have been deleted.
        </EmptyState>
      </div>
    );
  }

  return <LeadView lead={lead} error={error} onDeleting={setDeleting} />;
}

function LeadView({ lead, error, onDeleting }: { lead: Lead; error: string; onDeleting: (deleting: boolean) => void }) {
  const { settings, prices } = useAdmin();
  const [editingQuoted, setEditingQuoted] = useState(false);
  const [status, setStatus] = useState(lead.status);
  // Leave quote editing if the lead moves on (e.g. the client accepts meanwhile).
  if (status !== lead.status) {
    setStatus(lead.status);
    setEditingQuoted(false);
  }

  const editing = lead.status === "new" || (lead.status === "quoted" && editingQuoted);
  const quote = useQuoteDraft(lead, settings, prices, editing);

  const startEditing = () => {
    setEditingQuoted(true);
    requestAnimationFrame(() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const confirmLeave = (e: MouseEvent) => {
    if (editing && quote.dirty && !confirm("You have unsaved quote changes. Leave without saving?")) e.preventDefault();
  };

  const showPayments =
    ["accepted", "building", "launched", "complete"].includes(lead.status) ||
    lead.payments.length > 0 ||
    lead.proofOfPayment.length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <BackLink onClick={confirmLeave} />
      {error && <ErrorText>{error}</ErrorText>}

      <LeadHeader lead={lead} settings={settings} />
      <NextStep lead={lead} settings={settings} quote={quote} onEditQuote={startEditing} />
      <QuoteCard lead={lead} quote={quote} editing={editing} onStartEdit={startEditing} onStopEdit={() => setEditingQuoted(false)} />
      <BriefCard lead={lead} />
      {showPayments && <PaymentsCard lead={lead} />}
      <OnboardingCard lead={lead} />
      <NotesCard lead={lead} />
      <HistoryCard lead={lead} />
      <DangerZone lead={lead} onDeleting={onDeleting} />
    </div>
  );
}

function BackLink({ onClick }: { onClick?: (e: MouseEvent) => void }) {
  return (
    <Link
      href="/admin"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-1.5 rounded-full pr-3 text-sm font-medium text-muted transition-colors hover:text-ink"
    >
      <ArrowLeft size={17} /> All leads
    </Link>
  );
}
