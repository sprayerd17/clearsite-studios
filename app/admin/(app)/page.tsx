"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, X } from "@/components/icons";
import { ChevronRightIcon, PaperclipIcon } from "@/components/admin/icons";
import { relativeTime } from "@/components/admin/format";
import { NotificationPrompt } from "@/components/admin/Notifications";
import { Chip, EmptyState, ErrorText, PageLoader, StatusChip, labelClass } from "@/components/admin/ui";
import { friendlyError } from "@/components/admin/useAction";
import { subscribeLeads } from "@/lib/firebase/data";
import { budgetLabel, serviceLabel, sourceLabel } from "@/lib/quote/brief";
import { ACTIVE_STATUSES, monthlyAmount, totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { displayPhone } from "@/lib/quote/phone";
import type { Lead, LeadStatus } from "@/lib/quote/types";

type FilterKey = "active" | "new" | "quoted" | "progress" | "done" | "closed";

const FILTERS: { key: FilterKey; label: string; statuses: LeadStatus[]; empty: string }[] = [
  { key: "active", label: "Active", statuses: ACTIVE_STATUSES, empty: "Nothing on the go. New quote requests from the website land here." },
  { key: "new", label: "New", statuses: ["new"], empty: "No new requests waiting for a quote." },
  { key: "quoted", label: "Quoted", statuses: ["quoted"], empty: "No quotes waiting on a client." },
  { key: "progress", label: "In progress", statuses: ["accepted", "building", "launched"], empty: "No projects in progress." },
  { key: "done", label: "Done", statuses: ["complete"], empty: "No completed projects yet." },
  { key: "closed", label: "Closed", statuses: ["closed"], empty: "No closed leads." },
];

const isUnseen = (lead: Lead) => lead.status === "new" && !lead.seenAt;

/** Proof of payment is waiting for the payment that's due right now. */
function proofWaiting(lead: Lead): boolean {
  const { dueKind, dueNow } = totals(lead);
  return !!dueKind && dueNow > 0 && lead.proofOfPayment.some((p) => p.kind === dueKind);
}

function matches(lead: Lead, words: string[]): boolean {
  if (!words.length) return true;
  const phone = lead.contact.phone;
  const haystack = [
    String(lead.number),
    `#${lead.number}`,
    lead.contact.name,
    lead.contact.business,
    lead.contact.email,
    phone,
    displayPhone(phone).replace(/\s/g, ""),
  ]
    .join(" ")
    .toLowerCase();
  return words.every((w) => haystack.includes(w.replace(/\s/g, "")));
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterKey>("active");
  const [search, setSearch] = useState("");

  useEffect(
    () =>
      subscribeLeads(
        (l) => {
          setLeads(l);
          setError("");
        },
        (e) => {
          console.error(e);
          setError(friendlyError(e));
          setLeads((prev) => prev ?? []);
        },
      ),
    [],
  );

  const words = useMemo(() => search.trim().toLowerCase().split(/\s+/).filter(Boolean), [search]);
  const searched = useMemo(() => (leads ?? []).filter((l) => matches(l, words)), [leads, words]);

  const counts = useMemo(() => {
    const c = {} as Record<FilterKey, number>;
    for (const f of FILTERS) c[f.key] = searched.filter((l) => f.statuses.includes(l.status)).length;
    return c;
  }, [searched]);

  const current = FILTERS.find((f) => f.key === filter)!;
  const shown = searched.filter((l) => current.statuses.includes(l.status));
  const unseen = (leads ?? []).filter(isUnseen).length;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className={labelClass}>Quote requests</p>
          <h1 className="mt-1.5 text-[28px] tracking-[-0.04em] sm:text-[32px]">Leads</h1>
        </div>
        <div className="mb-1 flex items-center gap-2">
          {unseen > 0 && (
            <Chip tone="lime" className="hidden sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {unseen} new {unseen === 1 ? "request" : "requests"}
            </Chip>
          )}
          <Link href="/admin/leads/new" className="btn-lime btn-sm">
            <Plus size={16} /> New lead
          </Link>
        </div>
      </div>

      <NotificationPrompt />

      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-light" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, business, # or phone"
          aria-label="Search leads"
          className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-11 text-[16px] text-ink shadow-[0_1px_0_rgba(10,11,13,0.03)] placeholder:text-muted-light focus:border-ink/40 focus:outline-none focus:ring-4 focus:ring-lime/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTERS.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {label}
              <span
                className={`min-w-[1.25rem] rounded-full px-1.5 text-center font-mono text-[11px] tabular-nums ${
                  active ? "bg-lime text-ink" : "bg-paper text-muted"
                }`}
              >
                {leads ? counts[key] : "·"}
              </span>
            </button>
          );
        })}
      </div>

      <ErrorText>{error}</ErrorText>

      {leads === null ? (
        <PageLoader label="Loading leads" />
      ) : shown.length === 0 ? (
        words.length ? (
          <EmptyState title="No matches">
            Nothing in “{current.label}” matches “{search.trim()}”.
            {searched.length > 0 && " Try another tab — the counts show where the matches are."}
          </EmptyState>
        ) : (
          <EmptyState title={leads.length === 0 ? "No leads yet" : `Nothing in “${current.label}”`}>
            {leads.length === 0 ? "When someone fills in the quote form on the website, their request shows up here." : current.empty}
          </EmptyState>
        )
      ) : (
        <ul className="space-y-2.5">
          {shown.map((lead) => (
            <li key={lead.id}>
              <LeadRow lead={lead} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const unseen = isUnseen(lead);
  const { total } = totals(lead);
  const quoted = !!lead.quote.sentAt && total > 0;
  const proof = proofWaiting(lead);

  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className={`group block rounded-2xl border bg-white px-4 py-4 shadow-card transition-all duration-200 hover:-translate-y-px hover:border-line-strong hover:shadow-lift active:translate-y-0 sm:px-5 ${
        unseen ? "border-lime-deep/60 ring-1 ring-lime/50" : "border-line"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {unseen && (
              <span className="pulse-dot relative h-2 w-2 shrink-0 rounded-full bg-lime-deep text-lime-deep" aria-label="New, not opened yet" />
            )}
            <span className="font-mono text-xs tabular-nums text-muted">#{lead.number}</span>
            <span className="text-muted-light">·</span>
            <span className="text-xs text-muted" title={new Date(lead.createdAt).toLocaleString("en-ZA")}>
              {relativeTime(lead.createdAt)}
            </span>
          </div>
          <p className={`mt-1 truncate text-[16px] tracking-[-0.01em] text-ink ${unseen ? "font-semibold" : "font-medium"}`}>
            {lead.contact.name || "Unnamed"}
            {lead.contact.business && <span className="font-normal text-muted"> · {lead.contact.business}</span>}
          </p>
        </div>
        <StatusChip status={lead.status} className="mt-0.5 shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {lead.source && lead.source !== "website" && (
          <span className="inline-flex items-center rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white">
            via {sourceLabel(lead.source)}
          </span>
        )}
        {lead.brief.services.map((s) => (
          <span key={s} className="chip px-2.5 py-0.5">
            {serviceLabel(s)}
          </span>
        ))}
        {proof && (
          <Chip tone="amber">
            <PaperclipIcon size={12} /> Proof of payment
          </Chip>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/70 pt-3 text-sm">
        <span className="truncate text-muted">
          {lead.brief.budget ? (
            <>
              Budget <span className="text-ink">{budgetLabel(lead.brief.budget)}</span>
            </>
          ) : (
            "No budget given"
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          {quoted && (
            <span className="font-semibold tabular-nums text-ink">
              {formatRand(total)}
              {monthlyAmount(lead.quote) > 0 && (
                <span className="font-normal text-muted"> + {formatRand(monthlyAmount(lead.quote))}/mo</span>
              )}
            </span>
          )}
          <ChevronRightIcon size={16} className="text-muted-light transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
