"use client";

import { useRef, useState } from "react";
import { Check } from "@/components/icons";
import { useAdmin } from "@/components/admin/AdminProvider";
import { Button, Card, CardBody, CardHeader, ErrorText, Field, Input, NumberInput, PageLoader, Textarea, labelClass } from "@/components/admin/ui";
import { useAction, useFlash } from "@/components/admin/useAction";
import { saveSettings } from "@/lib/firebase/data";
import { displayPhone, isValidPhone, normalizePhone } from "@/lib/quote/phone";
import type { BankDetails, MessageTemplates, Settings } from "@/lib/quote/types";

const TEMPLATES: { key: keyof MessageTemplates; label: string; when: string; placeholders: string[] }[] = [
  {
    key: "quoteReady",
    label: "Quote ready",
    when: "Typed into WhatsApp when you send a quote.",
    placeholders: ["firstName", "number", "link", "total"],
  },
  {
    key: "depositReceived",
    label: "Deposit received",
    when: "Offered after you record the deposit.",
    placeholders: ["firstName", "number", "link"],
  },
  {
    key: "launched",
    label: "Project live",
    when: "Offered after you mark a project as live.",
    placeholders: ["firstName", "number", "link", "balance"],
  },
  {
    key: "general",
    label: "General message",
    when: "Used by the WhatsApp button at the top of a lead.",
    placeholders: ["firstName", "number", "link"],
  },
];

const BANK_FIELDS: { key: keyof BankDetails; label: string; placeholder?: string; mono?: boolean }[] = [
  { key: "bankName", label: "Bank", placeholder: "e.g. FNB" },
  { key: "accountHolder", label: "Account holder" },
  { key: "accountNumber", label: "Account number", mono: true },
  { key: "branchCode", label: "Branch code", mono: true },
  { key: "accountType", label: "Account type", placeholder: "e.g. Cheque" },
];

const toForm = (s: Settings): Settings => ({ ...s, phone: displayPhone(s.phone) });

export default function SettingsPage() {
  const { settings, settingsLoaded } = useAdmin();
  if (!settingsLoaded) return <PageLoader label="Loading settings" />;
  return <SettingsForm saved={settings} />;
}

function SettingsForm({ saved }: { saved: Settings }) {
  const savedForm = toForm(saved);
  const savedKey = JSON.stringify(savedForm);
  const [form, setForm] = useState<Settings>(savedForm);
  const [synced, setSynced] = useState(savedKey);
  // Follow saves from another device while there are no local edits.
  if (savedKey !== synced) {
    setSynced(savedKey);
    if (JSON.stringify(form) === synced) setForm(savedForm);
  }
  const dirty = JSON.stringify(form) !== savedKey;

  const { run, pending, error, fail } = useAction();
  const [justSaved, flashSaved] = useFlash();

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => setForm((f) => ({ ...f, [key]: value }));
  const setBank = (key: keyof BankDetails, value: string) => setForm((f) => ({ ...f, bank: { ...f.bank, [key]: value } }));
  const setTemplate = (key: keyof MessageTemplates, value: string) =>
    setForm((f) => ({ ...f, templates: { ...f.templates, [key]: value } }));

  const phone = normalizePhone(form.phone);
  const phoneInvalid = form.phone.trim() !== "" && !isValidPhone(phone);

  async function save() {
    if (!form.businessName.trim()) return fail("Enter the business name.");
    if (phoneInvalid) return fail("That WhatsApp number doesn't look right — use something like 082 123 4567.");
    const next: Settings = { ...form, phone };
    if (await run(() => saveSettings(next))) {
      setForm(toForm(next));
      flashSaved();
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="pb-1">
        <p className={labelClass}>Studio</p>
        <h1 className="mt-1.5 text-[28px] tracking-[-0.04em] sm:text-[32px]">Settings</h1>
      </div>

      <Card>
        <CardHeader eyebrow="Business" title="Your details" subtitle="Shown on quotes and the client's project page." />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name">
            <Input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
          </Field>
          <Field label="Contact name">
            <Input value={form.contactName} onChange={(e) => set("contactName", e.target.value)} autoComplete="name" />
          </Field>
          <Field
            label="WhatsApp number"
            hint={phoneInvalid ? undefined : phone ? `Clients message wa.me/${phone}` : "Clients tap to message this number."}
          >
            <Input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              onBlur={() => !phoneInvalid && phone && set("phone", displayPhone(phone))}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="082 123 4567"
              invalid={phoneInvalid}
            />
          </Field>
          <Field label="Email">
            <Input value={form.email} onChange={(e) => set("email", e.target.value)} type="email" autoComplete="email" />
          </Field>
          <Field label="Website" className="sm:col-span-2">
            <Input value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="clearsitestudios.co.za" />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader eyebrow="Notifications" title="Where new requests go" />
        <CardBody>
          <Field label="Notify email" hint="New quote requests and client updates (accepted, proof of payment, content) are emailed here.">
            <Input value={form.notifyEmail} onChange={(e) => set("notifyEmail", e.target.value)} type="email" />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader eyebrow="Quotes" title="Quote defaults" subtitle="Used for new quote requests. You can change them on each quote." />
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Deposit">
              <NumberInput value={form.depositPercent} onChange={(n) => set("depositPercent", n)} min={0} max={100} suffix="%" />
            </Field>
            <Field label="Quote valid for">
              <NumberInput value={form.quoteValidDays} onChange={(n) => set("quoteValidDays", n)} min={1} max={365} suffix="days" />
            </Field>
          </div>
          <Field label="Quote terms" hint="Shown on every quote, under your notes.">
            <Textarea value={form.quoteTerms} onChange={(e) => set("quoteTerms", e.target.value)} className="min-h-32" />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader eyebrow="Payments" title="Bank details" subtitle="Shown to clients when a deposit or balance is due." />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          {BANK_FIELDS.map(({ key, label, placeholder, mono }) => (
            <Field key={key} label={label}>
              <Input
                value={form.bank[key]}
                onChange={(e) => setBank(key, e.target.value)}
                placeholder={placeholder}
                inputMode={mono ? "numeric" : undefined}
                className={mono ? "font-mono tabular-nums" : ""}
              />
            </Field>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader eyebrow="WhatsApp" title="Message templates" subtitle="Tap a placeholder to insert it. They're filled in for each client." />
        <CardBody className="space-y-6">
          {TEMPLATES.map((t) => (
            <TemplateField
              key={t.key}
              label={t.label}
              when={t.when}
              placeholders={t.placeholders}
              value={form.templates[t.key]}
              onChange={(v) => setTemplate(t.key, v)}
            />
          ))}
        </CardBody>
      </Card>

      {/* Save bar: stays in reach above the tab bar on phones. */}
      <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-20 sm:bottom-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:rounded-full sm:pl-6">
          <p className="min-w-0 text-sm">
            {justSaved && !dirty ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-lime-ink">
                <Check size={16} /> Saved
              </span>
            ) : dirty ? (
              <span className="font-medium text-ink">Unsaved changes</span>
            ) : (
              <span className="text-muted">All changes saved</span>
            )}
          </p>
          <Button variant={dirty ? "lime" : "ghost"} size="sm" onClick={save} pending={pending()} disabled={!dirty}>
            Save settings
          </Button>
        </div>
        {error && <ErrorText className="mt-2 shadow-card">{error}</ErrorText>}
      </div>
    </div>
  );
}

function TemplateField({
  label,
  when,
  placeholders,
  value,
  onChange,
}: {
  label: string;
  when: string;
  placeholders: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const unknown = [...new Set([...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))].filter((p) => !placeholders.includes(p));

  function insert(name: string) {
    const el = ref.current;
    const token = `{${name}}`;
    if (!el) return onChange(value + token);
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + token + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  }

  return (
    <div>
      <div className="mb-2">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted">{when}</p>
      </div>
      <Textarea ref={ref} value={value} onChange={(e) => onChange(e.target.value)} className="min-h-28 text-[15px]" aria-label={`${label} template`} />
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {placeholders.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => insert(p)}
            className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-ink/30 hover:text-ink"
          >
            {`{${p}}`}
          </button>
        ))}
      </div>
      {unknown.length > 0 && (
        <p className="mt-2 text-xs text-amber-800">
          {unknown.map((u) => `{${u}}`).join(", ")} won&apos;t be filled in — use one of the placeholders above.
        </p>
      )}
    </div>
  );
}
