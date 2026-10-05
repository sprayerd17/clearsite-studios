"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check } from "@/components/icons";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Button, Card, CardBody, CardHeader, ErrorText, Field, Input, Textarea, Toggle, labelClass } from "@/components/admin/ui";
import { useAction } from "@/components/admin/useAction";
import { createLead } from "@/lib/firebase/data";
import { BUDGETS, LEAD_SOURCES, PREFERRED_CONTACT, SERVICES, TIMELINES } from "@/lib/quote/brief";
import { isValidPhone, normalizePhone } from "@/lib/quote/phone";
import type { LeadSource, PreferredContact, ServiceKey } from "@/lib/quote/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tappable pills. `multi` lets several be on; single ones can be tapped off again. */
function Pills<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly { value: T; label: string }[];
  value: T[];
  onChange: (next: T[]) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value])}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-[15px] font-medium transition-colors ${
              on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/75 hover:border-line-strong hover:text-ink"
            }`}
          >
            {on && <Check size={14} strokeWidth={2.5} className="text-lime" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Single choice built on Pills: picking one replaces the other, tapping it again clears it. */
function Choice<T extends string>({
  options,
  value,
  onChange,
  label,
  required = false,
}: {
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (next: T | "") => void;
  label: string;
  required?: boolean;
}) {
  return (
    <Pills
      options={options}
      label={label}
      value={value ? [value] : []}
      onChange={(next) => {
        const picked = next.find((v) => v !== value);
        if (picked) onChange(picked);
        else if (!required) onChange("");
      }}
    />
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardBody className="space-y-5">{children}</CardBody>
    </Card>
  );
}

export default function NewLeadPage() {
  const router = useRouter();
  const { settings, prices } = useAdmin();
  const { run, pending, error, fail } = useAction();

  const [source, setSource] = useState<LeadSource | "">("whatsapp");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferred, setPreferred] = useState<PreferredContact | "">("whatsapp");
  const [services, setServices] = useState<ServiceKey[]>([]);
  const [notes, setNotes] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [prefill, setPrefill] = useState(true);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const normalized = phone.trim() ? normalizePhone(phone) : "";
    if (!name.trim()) return fail("Add their name.");
    if (!normalized && !email.trim()) return fail("Add a WhatsApp number or an email address so you can send them the quote.");
    if (normalized && !isValidPhone(normalized)) return fail("That phone number doesn't look right — e.g. 082 123 4567.");
    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) return fail("That email address doesn't look right.");

    let id = "";
    const ok = await run(async () => {
      id = await createLead(
        {
          source: source || "other",
          prefill,
          contact: {
            name: name.trim(),
            business: business.trim(),
            phone: normalized,
            email: email.trim(),
            preferred: preferred || (normalized ? "whatsapp" : "email"),
          },
          brief: { services, answers: {}, timeline, budget, notes: notes.trim() },
        },
        settings,
        prices,
      );
    });
    if (ok && id) router.push(`/admin/leads/${id}`);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
        <ArrowLeft size={15} /> All leads
      </Link>
      <div>
        <p className={labelClass}>Add by hand</p>
        <h1 className="mt-1.5 text-[28px] tracking-[-0.04em] sm:text-[32px]">New lead</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
          For enquiries that came in on WhatsApp, a call or in person. They get the same private project
          link as a website request — build the quote on the next screen and send it as usual.
        </p>
      </div>

      <Section title="How did they reach you?">
        <Choice options={LEAD_SOURCES} value={source} onChange={setSource} label="Source" required />
      </Section>

      <Section title="Who is it?">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="nl-name">
            <Input id="nl-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jaco van Wyk" autoFocus />
          </Field>
          <Field label="Business (optional)" htmlFor="nl-business">
            <Input id="nl-business" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="e.g. Jaco's Plumbing" />
          </Field>
          <Field label="WhatsApp number" htmlFor="nl-phone" hint="Where the quote link goes.">
            <Input
              id="nl-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="082 123 4567"
            />
          </Field>
          <Field label="Email (optional)" htmlFor="nl-email">
            <Input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          </Field>
        </div>
        <div>
          <p className={`${labelClass} mb-2`}>Prefers</p>
          <Choice options={PREFERRED_CONTACT} value={preferred} onChange={setPreferred} label="Preferred contact" required />
        </div>
      </Section>

      <Section
        title="What do they need?"
        subtitle="Paste their message or sum it up. This shows on their project page as their brief."
      >
        <div>
          <p className={`${labelClass} mb-2`}>Services</p>
          <Pills options={SERVICES} value={services} onChange={setServices} label="Services" />
        </div>
        <Field label="Description" htmlFor="nl-notes">
          <Textarea
            id="nl-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-36"
            placeholder="e.g. Needs a 5-page site for his plumbing business with a gallery of past jobs and a quote request form…"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className={`${labelClass} mb-2`}>Timeline (optional)</p>
            <Choice options={TIMELINES} value={timeline} onChange={setTimeline} label="Timeline" />
          </div>
          <div>
            <p className={`${labelClass} mb-2`}>Budget (optional)</p>
            <Choice options={BUDGETS} value={budget} onChange={setBudget} label="Budget" />
          </div>
        </div>
      </Section>

      <Card>
        <CardBody className="flex items-center justify-between gap-4 pt-5">
          <div>
            <p className="font-medium text-ink">Start the quote from my price list</p>
            <p className="mt-0.5 text-sm text-muted">
              Adds the items that match the services you picked. You can change everything on the next screen.
            </p>
          </div>
          <Toggle checked={prefill} onChange={setPrefill} label="Start the quote from my price list" />
        </CardBody>
      </Card>

      <ErrorText>{error}</ErrorText>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/admin" className="btn-ghost">
          Cancel
        </Link>
        <Button type="submit" variant="lime" size="lg" pending={pending()}>
          Create lead
        </Button>
      </div>
    </form>
  );
}
