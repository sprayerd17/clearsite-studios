import { briefSummary, PREFERRED_CONTACT } from "@/lib/quote/brief";
import { displayPhone } from "@/lib/quote/phone";
import type { Brief, Contact } from "@/lib/quote/types";

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map((row, i) => (
        <div key={`${row.label}-${i}`} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-6">
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="whitespace-pre-line break-words text-[15px] leading-relaxed text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The client's answers from the quote form, as a definition list. */
export function BriefList({ brief }: { brief: Brief }) {
  const rows = briefSummary(brief).filter((r) => r.value.trim());
  if (!rows.length) return <p className="text-sm text-muted">No details were added to the brief.</p>;
  return <Rows rows={rows} />;
}

/** The contact details the client gave, so they can spot a typo. */
export function ContactList({ contact }: { contact: Contact }) {
  const preferred = PREFERRED_CONTACT.find((p) => p.value === contact.preferred)?.label ?? "";
  const rows = [
    { label: "Name", value: contact.name },
    { label: "Business", value: contact.business },
    { label: "Phone / WhatsApp", value: displayPhone(contact.phone) },
    { label: "Email", value: contact.email },
    { label: "Best way to reach you", value: preferred },
  ].filter((r) => r.value.trim());
  return <Rows rows={rows} />;
}
