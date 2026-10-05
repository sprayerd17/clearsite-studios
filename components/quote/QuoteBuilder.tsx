"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { submitBrief, type BriefInput, type SubmitResult } from "@/app/quote/actions";
import { BUDGETS, PREFERRED_CONTACT, SERVICES, TIMELINES, briefSummary, visibleQuestions, type Question } from "@/lib/quote/brief";
import type { PreferredContact, ServiceKey } from "@/lib/quote/types";
import { whatsappLink } from "@/lib/site";
import {
  ArrowLeft,
  ArrowRight,
  Bag,
  Check,
  Clock,
  Globe,
  Mail,
  Phone,
  Refresh,
  Sparkle,
  WhatsApp,
  Workflow,
} from "@/components/icons";
import {
  EMPTY_DRAFT,
  STEP_META,
  clearDraft,
  isServiceKey,
  loadDraft,
  saveDraft,
  stepForField,
  stepsFor,
  toBrief,
  validateStep,
  whatsappSummary,
  type Draft,
  type Errors,
  type StepId,
} from "./draft";
import { ChipGroup, FieldError, Group, IconPills, OptionTiles, TextField, fieldId } from "./fields";
import styles from "./quote.module.css";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SERVICE_ICONS: Record<ServiceKey, typeof Globe> = {
  website: Globe,
  redesign: Refresh,
  store: Bag,
  workflow: Workflow,
  unsure: Sparkle,
};

const CONTACT_ICONS: Record<PreferredContact, typeof Globe> = {
  whatsapp: WhatsApp,
  call: Phone,
  email: Mail,
};

const CONTACT_OPTIONS = PREFERRED_CONTACT.map((p) => ({ ...p, icon: CONTACT_ICONS[p.value] }));

type Status = "idle" | "sending" | "redirecting";

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Scrolls a field into view and focuses its first (or checked) input. */
function focusField(key: string) {
  const root = document.getElementById(fieldId(key));
  if (!root) return;
  const target =
    root.querySelector<HTMLElement>("input:checked") ??
    root.querySelector<HTMLElement>("input:not([type=hidden]), textarea");
  root.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  target?.focus({ preventScroll: true });
}

export default function QuoteBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const paramService = params.get("service");

  const [draft, setDraft] = useState<Draft>(() => ({
    ...EMPTY_DRAFT,
    services: isServiceKey(paramService) ? [paramService] : [],
  }));
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  // A field to focus after the next render (so its error is in the DOM and gets announced).
  const [focusTarget, setFocusTarget] = useState<{ key: string } | null>(null);

  const startedAt = useRef(0);
  const inFlight = useRef(false);
  const submitted = useRef(false);
  const moved = useRef(false);
  const focusPending = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Restore any in-progress answers before first paint. The ?service= param only
  // pre-selects when nothing was saved, so a refresh never re-adds a deselected service.
  useIsoLayoutEffect(() => {
    startedAt.current = Date.now();
    const saved = loadDraft();
    if (saved) {
      setDraft((current) => ({
        ...saved,
        services: saved.services.length ? saved.services : current.services,
      }));
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !submitted.current) saveDraft(draft);
  }, [draft, ready]);

  const questions = useMemo(() => visibleQuestions(draft.services), [draft.services]);
  const steps = useMemo(() => stepsFor(questions.length > 0), [questions.length]);
  const step: StepId = steps.includes(draft.step) ? draft.step : draft.step === "details" ? "timing" : "services";
  const index = steps.indexOf(step);
  const isLast = index === steps.length - 1;
  const busy = status !== "idle";

  // After moving between steps: bring the card back into view and move focus to
  // the new heading — unless a field that needs attention is about to take focus.
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    if (focusPending.current) return;
    const card = cardRef.current;
    if (card && card.getBoundingClientRect().top < 88) {
      card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (!focusTarget) return;
    focusPending.current = false;
    focusField(focusTarget.key);
  }, [focusTarget]);

  function requestFocus(key: string) {
    focusPending.current = true;
    setFocusTarget({ key });
  }

  /* ─── State helpers ──────────────────────────────────────────────────── */

  const clearError = useCallback((...keys: string[]) => {
    setErrors((e) => {
      if (!keys.some((k) => k in e)) return e;
      const next = { ...e };
      for (const k of keys) delete next[k];
      return next;
    });
  }, []);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    clearError(key);
  }

  function setAnswer(id: string, value: string | string[]) {
    setDraft((d) => ({ ...d, answers: { ...d.answers, [id]: value } }));
    clearError(id);
  }

  function toggleService(key: ServiceKey) {
    setDraft((d) => {
      const has = d.services.includes(key);
      return {
        ...d,
        services: SERVICES.map((s) => s.value).filter((v) => (v === key ? !has : d.services.includes(v))),
      };
    });
    clearError("services");
  }

  function goTo(target: StepId, opts: { errors?: Errors; focus?: string } = {}) {
    const from = steps.indexOf(step);
    const to = steps.indexOf(target);
    setDirection(to >= from ? 1 : -1);
    setErrors(opts.errors ?? {});
    setFormError("");
    setDraft((d) => ({ ...d, step: target }));
    if (target !== step) moved.current = true;
    if (opts.focus) requestFocus(opts.focus);
  }

  /* ─── Navigation & submit ────────────────────────────────────────────── */

  function next() {
    const errs = validateStep(step, draft, questions);
    const first = Object.keys(errs)[0];
    if (first) {
      setErrors(errs);
      requestFocus(first);
      return;
    }
    goTo(steps[index + 1]);
  }

  function back() {
    if (index > 0) goTo(steps[index - 1]);
  }

  async function submit() {
    if (inFlight.current) return;

    // Check every step, in case something earlier was left incomplete (e.g. a restored draft).
    for (const s of steps) {
      const errs = validateStep(s, draft, questions);
      const first = Object.keys(errs)[0];
      if (first) {
        goTo(s, { errors: errs, focus: first });
        return;
      }
    }

    const brief = toBrief(draft, questions);
    const input: BriefInput = {
      ...brief,
      contact: {
        name: draft.name.trim(),
        business: draft.business.trim(),
        phone: draft.phone.trim(),
        email: draft.email.trim(),
        preferred: draft.preferred,
      },
      consent: draft.consent,
      website: honeypot,
      startedAt: startedAt.current,
    };

    inFlight.current = true;
    setStatus("sending");
    setFormError("");

    let result: SubmitResult;
    try {
      result = await submitBrief(input);
    } catch {
      inFlight.current = false;
      setStatus("idle");
      setFormError("I couldn't reach the server. Check your connection and try again, or WhatsApp me instead.");
      return;
    }

    if (!result.ok) {
      inFlight.current = false;
      setStatus("idle");
      const target = result.field ? stepForField(result.field) : null;
      if (result.field && target) {
        goTo(target, { errors: { [result.field]: result.error }, focus: result.field });
      } else {
        setFormError(result.error);
      }
      return;
    }

    submitted.current = true;
    clearDraft();

    setStatus("redirecting");
    router.push(`/q/${result.token}?new=1`);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (isLast) void submit();
    else next();
  }

  /* ─── Builder ────────────────────────────────────────────────────────── */

  const meta = STEP_META[step];
  const progress = ((index + 1) / steps.length) * 100;

  return (
    <div ref={cardRef} className="card overflow-hidden">
      {/* Progress */}
      <div className="grain relative overflow-hidden bg-ink px-5 py-5 text-white sm:px-8 sm:py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(198,242,78,0.16),transparent)]"
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50" aria-live="polite">
              Step <span className="text-white">{index + 1}</span> of {steps.length}
              <span className="sr-only">: {meta.title}</span>
            </p>
            <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              <Clock size={13} />
              About 2 min
            </p>
          </div>
          <div
            role="progressbar"
            aria-label="Quote request progress"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={index + 1}
            aria-valuetext={`Step ${index + 1} of ${steps.length}`}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-lime transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="mt-4 hidden gap-2 sm:flex" aria-label="Steps">
            {steps.map((s, i) => {
              const state = i < index ? "done" : i === index ? "current" : "todo";
              const inner = (
                <>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] transition-colors ${
                      state === "done"
                        ? "bg-lime text-ink"
                        : state === "current"
                          ? "bg-white text-ink"
                          : "border border-white/15 text-white/40"
                    }`}
                  >
                    {state === "done" ? <Check size={13} strokeWidth={2.8} /> : i + 1}
                  </span>
                  <span className={state === "todo" ? "text-white/40" : "text-white/85"}>{STEP_META[s].short}</span>
                </>
              );
              return (
                <li key={s} className="flex-1">
                  {state === "done" && !busy ? (
                    <button
                      type="button"
                      onClick={() => goTo(s)}
                      className="inline-flex items-center gap-2 rounded-full py-1 pr-2 text-[13px] transition-colors hover:text-white"
                    >
                      {inner}
                      <span className="sr-only">(edit)</span>
                    </button>
                  ) : (
                    <span
                      aria-current={state === "current" ? "step" : undefined}
                      className="inline-flex items-center gap-2 py-1 text-[13px]"
                    >
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="relative" aria-busy={busy}>
        {/* Honeypot — hidden from people and screen readers; bots fill it in. */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-0 h-px w-px overflow-hidden opacity-0">
          <label htmlFor="qb-website">Website</label>
          <input
            id="qb-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div key={step} className={direction === 1 ? styles.enterForward : styles.enterBack}>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-[26px] tracking-tight text-ink focus-visible:outline-none sm:text-[30px]"
            >
              {meta.title}
            </h2>
            <p className="prose-muted mt-2 text-[15px]">{meta.intro}</p>

            <div className="mt-8">
              {step === "services" && (
                <ServicesStep selected={draft.services} error={errors.services} onToggle={toggleService} />
              )}
              {step === "details" && (
                <DetailsStep questions={questions} answers={draft.answers} errors={errors} onAnswer={setAnswer} />
              )}
              {step === "timing" && (
                <div className="space-y-9">
                  <Group id="timeline" legend="When would you like to get going?" error={errors.timeline}>
                    <OptionTiles name="timeline" options={TIMELINES} value={draft.timeline} onChange={(v) => set("timeline", v)} />
                  </Group>
                  <Group
                    id="budget"
                    legend="Rough budget"
                    help="This just helps me suggest the right option — it's not a commitment."
                    error={errors.budget}
                  >
                    <OptionTiles name="budget" options={BUDGETS} value={draft.budget} onChange={(v) => set("budget", v)} />
                  </Group>
                  <TextField
                    id="notes"
                    label="Anything else I should know?"
                    optional
                    multiline
                    rows={4}
                    maxLength={2000}
                    placeholder="Deadlines, sites you like the look of, what isn't working right now…"
                    value={draft.notes}
                    onChange={(v) => set("notes", v)}
                  />
                </div>
              )}
              {step === "contact" && (
                <ContactStep
                  draft={draft}
                  questions={questions}
                  errors={errors}
                  set={set}
                  onPreferred={(v) => {
                    set("preferred", v);
                    clearError("email");
                  }}
                  onEdit={(s) => goTo(s)}
                  disabled={busy}
                />
              )}
            </div>
          </div>
        </div>

        {formError && (
          <div className="px-5 pb-5 sm:px-8 lg:px-10">
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-[14px] leading-relaxed text-red-700">
              <p>{formError}</p>
              <a
                href={whatsappLink(whatsappSummary(draft))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-red-800 underline underline-offset-4"
              >
                <WhatsApp size={14} />
                Or send your request on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 border-t border-line bg-paper/60 px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
          {index > 0 ? (
            <button type="button" onClick={back} disabled={busy} className="btn-ghost btn-lg px-5 disabled:opacity-50 sm:px-6">
              <ArrowLeft size={17} />
              <span className="sr-only sm:not-sr-only">Back</span>
            </button>
          ) : (
            <p className="hidden text-[13px] text-muted sm:block">No obligation · About 2 minutes</p>
          )}
          {isLast ? (
            <button
              type="submit"
              disabled={busy}
              className="btn-lime btn-lg ml-auto flex-1 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:flex-none sm:min-w-[220px]"
            >
              {busy ? (
                <>
                  <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink" />
                  {status === "redirecting" ? "Opening your project…" : "Sending…"}
                </>
              ) : (
                <>
                  Send my request
                  <ArrowRight size={17} className="btn-arrow" />
                </>
              )}
            </button>
          ) : (
            <button type="submit" className="btn-ink btn-lg ml-auto flex-1 sm:flex-none sm:min-w-[180px]">
              Continue
              <ArrowRight size={17} className="btn-arrow" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ─── Steps ──────────────────────────────────────────────────────────────── */

function ServicesStep({
  selected,
  error,
  onToggle,
}: {
  selected: ServiceKey[];
  error?: string;
  onToggle: (key: ServiceKey) => void;
}) {
  return (
    <fieldset id={fieldId("services")} className="min-w-0 border-0 p-0" aria-describedby={error ? "qb-error-services" : undefined}>
      <legend className="sr-only">What do you need? Choose one or more.</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const checked = selected.includes(s.value);
          const Icon = SERVICE_ICONS[s.value];
          const unsure = s.value === "unsure";
          return (
            <label
              key={s.value}
              className={`group relative flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-4 transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime/50 sm:p-5 ${
                unsure ? "sm:col-span-2" : ""
              } ${
                checked
                  ? "border-ink shadow-lift ring-1 ring-ink"
                  : `${unsure ? "border-dashed border-line-strong" : "border-line"} hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-card`
              }`}
            >
              <input
                type="checkbox"
                name="qb-services"
                value={s.value}
                checked={checked}
                onChange={() => onToggle(s.value)}
                className="sr-only"
              />
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-200 ${
                  checked ? "bg-ink text-lime" : "border border-line bg-paper text-ink"
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1 pr-8">
                <span className="block text-[16px] font-semibold tracking-tight text-ink">{s.label}</span>
                <span className="mt-1 block text-[13.5px] leading-snug text-muted">{s.description}</span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border transition-all duration-200 sm:right-5 sm:top-5 ${
                  checked ? "scale-100 border-lime bg-lime text-ink" : "border-line-strong bg-white text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={2.8} />
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id="services" message={error} />
    </fieldset>
  );
}

function DetailsStep({
  questions,
  answers,
  errors,
  onAnswer,
}: {
  questions: Question[];
  answers: Record<string, string | string[]>;
  errors: Errors;
  onAnswer: (id: string, value: string | string[]) => void;
}) {
  return (
    <div className="space-y-9">
      {questions.map((q) => {
        const value = answers[q.id];
        if (q.type === "text") {
          return (
            <TextField
              key={q.id}
              id={q.id}
              label={q.label}
              help={q.help}
              optional={q.optional}
              error={errors[q.id]}
              placeholder={q.placeholder}
              multiline={(q.placeholder?.length ?? 0) > 40}
              maxLength={1500}
              inputMode={q.id === "currentUrl" ? "url" : undefined}
              value={typeof value === "string" ? value : ""}
              onChange={(v) => onAnswer(q.id, v)}
            />
          );
        }
        return (
          <Group key={q.id} id={q.id} legend={q.label} help={q.help} optional={q.optional} error={errors[q.id]}>
            {q.type === "single" ? (
              <OptionTiles
                name={q.id}
                options={q.options ?? []}
                value={typeof value === "string" ? value : ""}
                onChange={(v) => onAnswer(q.id, v)}
              />
            ) : (
              <ChipGroup
                name={q.id}
                options={q.options ?? []}
                value={Array.isArray(value) ? value : []}
                onChange={(v) => onAnswer(q.id, v)}
              />
            )}
          </Group>
        );
      })}
    </div>
  );
}

const TIMING_LABELS = new Set(["Timeline", "Budget", "Notes"]);

function ContactStep({
  draft,
  questions,
  errors,
  set,
  onPreferred,
  onEdit,
  disabled,
}: {
  draft: Draft;
  questions: Question[];
  errors: Errors;
  set: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
  onPreferred: (value: PreferredContact) => void;
  onEdit: (step: StepId) => void;
  disabled: boolean;
}) {
  // Group the summary lines by the step they came from, so "Edit" jumps to the right place.
  const lines = briefSummary(toBrief(draft, questions));
  const allGroups: { step: StepId; title: string; lines: typeof lines }[] = [
    { step: "services", title: "What you need", lines: lines.slice(0, 1) },
    { step: "details", title: "Details", lines: lines.slice(1).filter((l) => !TIMING_LABELS.has(l.label)) },
    { step: "timing", title: "Timing & budget", lines: lines.slice(1).filter((l) => TIMING_LABELS.has(l.label)) },
  ];
  const groups = allGroups.filter((g) => g.lines.length > 0);

  const emailRequired = draft.preferred === "email";

  return (
    <div className="space-y-8">
      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          maxLength={80}
          error={errors.name}
          value={draft.name}
          onChange={(v) => set("name", v)}
        />
        <TextField
          id="business"
          label="Business name"
          optional
          autoComplete="organization"
          placeholder="Jane's Bakery"
          maxLength={100}
          error={errors.business}
          value={draft.business}
          onChange={(v) => set("business", v)}
        />
        <TextField
          id="phone"
          label="WhatsApp number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="082 123 4567"
          maxLength={30}
          help="I'll send your quote link here."
          error={errors.phone}
          value={draft.phone}
          onChange={(v) => set("phone", v)}
        />
        <TextField
          id="email"
          label="Email"
          required={emailRequired}
          optional={!emailRequired}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jane@example.com"
          maxLength={120}
          help={emailRequired ? "Needed so I can reply by email." : "Handy for a copy of your quote."}
          error={errors.email}
          value={draft.email}
          onChange={(v) => set("email", v)}
        />
      </div>

      <Group id="preferred" legend="How should I get in touch?">
        <IconPills
          name="preferred"
          options={CONTACT_OPTIONS}
          value={draft.preferred}
          onChange={(v) => onPreferred(v as PreferredContact)}
        />
      </Group>

      {/* Summary */}
      <section aria-labelledby="qb-summary-title" className="rounded-2xl border border-line bg-paper/70 p-4 sm:p-5">
        <h3 id="qb-summary-title" className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Check your answers
        </h3>
        <div className="mt-2 divide-y divide-line">
          {groups.map((g) => (
            <div key={g.step} className="flex items-start gap-4 py-3.5 last:pb-0.5">
              <dl className="min-w-0 flex-1 space-y-2.5">
                {g.lines.map((l) => (
                  <div key={l.label}>
                    <dt className="text-[12.5px] leading-snug text-muted">{l.label}</dt>
                    <dd className="mt-0.5 line-clamp-3 break-words text-[14px] font-medium leading-snug text-ink">
                      {l.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => onEdit(g.step)}
                disabled={disabled}
                className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-ink/30 disabled:opacity-50"
              >
                Edit<span className="sr-only"> {g.title.toLowerCase()}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Consent */}
      <div id={fieldId("consent")}>
        <label
          className={`relative flex cursor-pointer items-start gap-3.5 rounded-2xl border bg-white p-4 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime/50 ${
            errors.consent ? "border-red-500" : draft.consent ? "border-ink/40" : "border-line hover:border-ink/30"
          }`}
        >
          <input
            type="checkbox"
            name="consent"
            checked={draft.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-describedby={errors.consent ? "qb-error-consent" : undefined}
            aria-invalid={errors.consent ? true : undefined}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
              draft.consent ? "border-ink bg-ink text-lime" : "border-line-strong bg-white text-transparent"
            }`}
          >
            <Check size={13} strokeWidth={3} />
          </span>
          <span className="text-[14px] leading-relaxed text-ink/80">
            I agree to be contacted about this request. My details are only used for this — see the{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              privacy policy
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent" message={errors.consent} />
      </div>
    </div>
  );
}
