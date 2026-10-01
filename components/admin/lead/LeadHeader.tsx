"use client";

import type { ReactNode } from "react";
import { Check, Mail, Phone, WhatsApp } from "@/components/icons";
import { PREFERRED_CONTACT } from "@/lib/quote/brief";
import { formatDateTime } from "@/lib/quote/leads";
import { displayPhone } from "@/lib/quote/phone";
import type { Lead, Settings } from "@/lib/quote/types";
import { clientLink, relativeTime, templateLink } from "../format";
import { CopyIcon, ExternalLinkIcon } from "../icons";
import { Card, StatusChip } from "../ui";
import { useFlash } from "../useAction";

export function LeadHeader({ lead, settings }: { lead: Lead; settings: Settings }) {
  const [copied, flashCopied] = useFlash();
  const { contact } = lead;
  const preferred = PREFERRED_CONTACT.find((p) => p.value === contact.preferred)?.label;

  async function copyLink() {
    const link = clientLink(lead);
    try {
      await navigator.clipboard.writeText(link);
      flashCopied();
    } catch {
      window.prompt("Copy the client link:", link);
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-2 font-mono text-xs tabular-nums text-muted">
            <span className="font-medium text-ink">#{lead.number}</span>
            <span className="text-muted-light">·</span>
            <span className="truncate" title={formatDateTime(lead.createdAt)}>
              Received {relativeTime(lead.createdAt)}
            </span>
          </p>
          <StatusChip status={lead.status} className="shrink-0" />
        </div>
        <h1 className="mt-3 text-[26px] tracking-[-0.04em] sm:text-[30px]">{contact.name || "Unnamed"}</h1>
        {contact.business && <p className="mt-1 text-[15px] text-muted">{contact.business}</p>}
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {contact.phone && <span className="tabular-nums text-ink">{displayPhone(contact.phone)}</span>}
          {contact.email && <span className="break-all">{contact.email}</span>}
          {preferred && <span className="chip px-2.5 py-0.5">Prefers {preferred}</span>}
        </p>
      </div>

      <div className="grid grid-cols-5 border-t border-line bg-paper/60">
        <Action
          href={contact.phone ? templateLink(lead, settings.templates.general) : undefined}
          external
          icon={<WhatsApp size={20} />}
          label="WhatsApp"
          accent
        />
        <Action href={contact.phone ? `tel:+${contact.phone}` : undefined} icon={<Phone size={19} />} label="Call" />
        <Action href={contact.email ? `mailto:${contact.email}` : undefined} icon={<Mail size={19} />} label="Email" />
        <Action
          onClick={copyLink}
          icon={copied ? <Check size={19} className="text-lime-ink" /> : <CopyIcon size={19} />}
          label={copied ? "Copied" : "Copy link"}
        />
        <Action href={lead.token ? clientLink(lead) : undefined} external icon={<ExternalLinkIcon size={19} />} label="Client page" />
      </div>
    </Card>
  );
}

function Action({
  href,
  onClick,
  icon,
  label,
  external,
  accent,
}: {
  href?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  external?: boolean;
  accent?: boolean;
}) {
  const className = `flex h-[72px] flex-col items-center justify-center gap-1.5 border-r border-line text-[11px] font-medium transition-colors last:border-r-0 ${
    accent ? "text-ink" : "text-muted"
  } hover:bg-white hover:text-ink active:bg-white`;
  const iconWrap = (
    <span className={`grid h-8 w-8 place-items-center rounded-full ${accent ? "bg-[#25d366] text-white" : ""}`}>{icon}</span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {iconWrap}
        {label}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {iconWrap}
        {label}
      </button>
    );
  }
  return (
    <span className={`${className} pointer-events-none opacity-40`} aria-disabled="true">
      {iconWrap}
      {label}
    </span>
  );
}
