"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { X } from "@/components/icons";
import { STATUS } from "@/lib/quote/leads";
import { centsToInput, parseRand } from "@/lib/quote/money";
import type { Cents, LeadStatus } from "@/lib/quote/types";
import { AlertIcon } from "./icons";

/* ─── Surfaces ──────────────────────────────────────────────────────────── */

export function Card({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`card scroll-mt-24 rounded-2xl sm:rounded-3xl ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  eyebrow,
  subtitle,
  action,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pb-1 pt-5 sm:px-6">
      <div className="min-w-0">
        {eyebrow && <p className={`${labelClass} mb-1.5`}>{eyebrow}</p>}
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 pb-5 pt-3 sm:px-6 sm:pb-6 ${className}`}>{children}</div>;
}

/* ─── Type ──────────────────────────────────────────────────────────────── */

export const labelClass = "font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted";

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className={`${labelClass} mb-2 block`}>
      {children}
    </label>
  );
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
  className = "",
}: {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

/* ─── Inputs ────────────────────────────────────────────────────────────── */

export const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 text-[16px] text-ink shadow-[inset_0_1px_0_rgba(10,11,13,0.02)] transition-colors placeholder:text-muted-light focus:border-ink/40 focus:outline-none focus:ring-4 focus:ring-lime/40 disabled:bg-paper disabled:text-muted";

export function Input({ className = "", invalid, ...props }: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      className={`${inputClass} h-12 ${invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return <textarea className={`${inputClass} min-h-24 py-3 leading-relaxed ${className}`} {...props} />;
}

/**
 * Rand amount box. Keeps the typed text while editing and reports cents
 * whenever it parses; shows the tidy "350.00" form again on blur.
 */
export function MoneyInput({
  value,
  onChange,
  className = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: Cents;
  onChange: (cents: Cents) => void;
}) {
  const [text, setText] = useState(() => centsToInput(value));
  const [committed, setCommitted] = useState(value);
  // Follow changes made elsewhere (rebuilt quote, synced from another device).
  if (value !== committed) {
    setCommitted(value);
    setText(centsToInput(value));
  }
  const parsed = parseRand(text);
  const invalid = text.trim() !== "" && parsed === null;

  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-muted">R</span>
      <Input
        {...props}
        value={text}
        inputMode="decimal"
        invalid={invalid}
        className="pl-8 tabular-nums"
        onChange={(e) => {
          setText(e.target.value);
          const cents = e.target.value.trim() === "" ? 0 : parseRand(e.target.value);
          if (cents !== null) {
            setCommitted(cents);
            onChange(cents);
          }
        }}
        onBlur={(e) => {
          setText(centsToInput(committed));
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

/** Whole-number (or decimal) box that never hands back NaN. */
export function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  decimals = false,
  suffix,
  className = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "min" | "max"> & {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  decimals?: boolean;
  suffix?: string;
}) {
  const [text, setText] = useState(String(value));
  const [committed, setCommitted] = useState(value);
  if (value !== committed) {
    setCommitted(value);
    setText(String(value));
  }
  const parse = (s: string): number | null => {
    const n = Number(s.replace(",", "."));
    if (s.trim() === "" || !Number.isFinite(n)) return null;
    if (!decimals && !Number.isInteger(n)) return null;
    if (n < min || (max !== undefined && n > max)) return null;
    return n;
  };
  const invalid = parse(text) === null;

  return (
    <div className={`relative ${className}`}>
      <Input
        {...props}
        value={text}
        inputMode={decimals ? "decimal" : "numeric"}
        invalid={invalid}
        className={`tabular-nums ${suffix ? "pr-9" : ""}`}
        onChange={(e) => {
          setText(e.target.value);
          const n = parse(e.target.value);
          if (n !== null) {
            setCommitted(n);
            onChange(n);
          }
        }}
        onBlur={(e) => {
          setText(String(committed));
          props.onBlur?.(e);
        }}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[15px] text-muted">{suffix}</span>
      )}
    </div>
  );
}

/** Big, thumb-friendly on/off switch. */
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  size = "md",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const track = size === "sm" ? "h-6 w-10" : "h-7 w-12";
  const knob = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const shift = size === "sm" ? "translate-x-4" : "translate-x-5";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 disabled:opacity-50 ${track} ${
        checked ? "bg-ink" : "bg-line-strong"
      }`}
    >
      <span
        className={`${knob} rounded-full shadow-sm transition-transform duration-200 ${
          checked ? `${shift} bg-lime` : "translate-x-0 bg-white"
        }`}
      />
    </button>
  );
}

/* ─── Buttons ───────────────────────────────────────────────────────────── */

type Variant = "lime" | "ink" | "ghost" | "danger" | "quiet" | "ghostDark" | "quietDark";

const VARIANTS: Record<Variant, string> = {
  lime: "btn-lime",
  ink: "btn-ink",
  ghost: "btn-ghost",
  danger: "btn border border-red-200 bg-white text-red-700 hover:border-red-300 hover:bg-red-50",
  quiet: "btn bg-transparent text-muted hover:bg-ink/[0.04] hover:text-ink",
  /* For use on ink backgrounds. */
  ghostDark: "btn-ghost-dark",
  quietDark: "btn bg-transparent text-white/55 hover:bg-white/[0.06] hover:text-white",
};

export function buttonClass(variant: Variant = "ghost", size: "sm" | "md" | "lg" = "md", className = "") {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  return `${VARIANTS[variant]} ${sizeClass} disabled:pointer-events-none disabled:opacity-50 ${className}`;
}

export function Button({
  variant = "ghost",
  size = "md",
  pending = false,
  className = "",
  type = "button",
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "sm" | "md" | "lg"; pending?: boolean }) {
  return (
    <button
      type={type}
      className={buttonClass(variant, size, className)}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      {...props}
    >
      {pending && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
}

/**
 * Two-tap confirm for destructive actions: the first tap arms it, the second
 * runs it. Disarms itself after a few seconds.
 */
export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel = "Tap again to confirm",
  variant = "danger",
  size = "sm",
  className = "",
  pending,
  disabled,
}: {
  onConfirm: () => void;
  children: ReactNode;
  confirmLabel?: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  pending?: boolean;
  disabled?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <Button
      variant={armed ? "danger" : variant}
      size={size}
      pending={pending}
      disabled={disabled}
      className={`${armed ? "!border-red-500 !bg-red-600 !text-white" : ""} ${className}`}
      onClick={() => {
        if (!armed) return setArmed(true);
        setArmed(false);
        onConfirm();
      }}
    >
      {armed ? confirmLabel : children}
    </Button>
  );
}

/* ─── Status & chips ────────────────────────────────────────────────────── */

export type Tone = "lime" | "ink" | "amber" | "sky" | "muted" | "green" | "red";

const TONES: Record<Tone, string> = {
  lime: "bg-lime text-ink border-transparent",
  sky: "bg-sky-100 text-sky-800 border-transparent",
  amber: "bg-amber-100 text-amber-800 border-transparent",
  ink: "bg-ink text-white border-transparent",
  green: "bg-emerald-100 text-emerald-800 border-transparent",
  muted: "bg-paper text-muted border-line",
  red: "bg-red-50 text-red-700 border-transparent",
};

export function Chip({ tone = "muted", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusChip({ status, className = "" }: { status: LeadStatus; className?: string }) {
  const { label, tone } = STATUS[status];
  return (
    <Chip tone={tone} className={className}>
      {label}
    </Chip>
  );
}

/* ─── Feedback ──────────────────────────────────────────────────────────── */

export function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-light">
      <Spinner className="h-7 w-7" />
      <span className={labelClass}>{label}</span>
    </div>
  );
}

export function ErrorText({ children, className = "" }: { children: ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className={`flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700 ${className}`}>
      <AlertIcon size={16} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function Notice({
  children,
  tone = "muted",
  className = "",
  icon,
}: {
  children: ReactNode;
  tone?: "muted" | "amber" | "lime";
  className?: string;
  icon?: ReactNode;
}) {
  const tones = {
    muted: "bg-paper text-muted border-line",
    amber: "bg-amber-50 text-amber-900 border-amber-200",
    lime: "bg-lime-soft/60 text-ink border-lime/60",
  };
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-relaxed ${tones[tone]} ${className}`}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-white/60 px-6 py-12 text-center sm:rounded-3xl">
      <p className="font-semibold text-ink">{title}</p>
      {children && <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ─── Sheet ─────────────────────────────────────────────────────────────── */

let openSheets = 0;

/** Bottom sheet on phones, centred dialog on bigger screens. */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    openSheets += 1;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      openSheets -= 1;
      if (openSheets === 0) document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white shadow-lift sm:max-w-lg sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div>}
      </div>
    </div>
  );
}
