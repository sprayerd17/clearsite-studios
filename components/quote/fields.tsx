"use client";

import type { ComponentType, ReactNode } from "react";
import type { Option } from "@/lib/quote/brief";
import { Check, Plus } from "@/components/icons";

/* Ids shared with QuoteBuilder so it can focus and scroll to a field with an error. */
export const fieldId = (key: string) => `qb-field-${key}`;
export const inputId = (key: string) => `qb-input-${key}`;
const errorId = (key: string) => `qb-error-${key}`;
const helpId = (key: string) => `qb-help-${key}`;

const describedBy = (key: string, help?: ReactNode, error?: string) =>
  [help ? helpId(key) : "", error ? errorId(key) : ""].filter(Boolean).join(" ") || undefined;

/** Focus ring for labels that wrap a visually hidden native input. */
const focusRing = "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lime/50";

export function inputClass(invalid: boolean) {
  return `block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition-all duration-150 placeholder:text-muted-light focus:border-ink focus:ring-4 focus:ring-lime/40 sm:text-[15px] ${
    invalid ? "border-red-500 hover:border-red-500" : "border-line hover:border-line-strong"
  }`;
}

function OptionalTag() {
  return (
    <span className="ml-2 align-middle font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-muted-light">
      Optional
    </span>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(id)} className="mt-2.5 flex items-start gap-1.5 text-[13.5px] font-medium leading-snug text-red-600">
      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
      {message}
    </p>
  );
}

/** A labelled group of radio tiles, checkbox chips or service cards. */
export function Group({
  id,
  legend,
  help,
  optional,
  error,
  children,
}: {
  id: string;
  legend: ReactNode;
  help?: ReactNode;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset id={fieldId(id)} aria-describedby={describedBy(id, help, error)} className="min-w-0 border-0 p-0">
      <legend className="p-0 text-[16px] font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">
        {legend}
        {optional && <OptionalTag />}
      </legend>
      {help && (
        <p id={helpId(id)} className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
          {help}
        </p>
      )}
      <div className="mt-4">{children}</div>
      <FieldError id={id} message={error} />
    </fieldset>
  );
}

const TILE_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2",
  5: "sm:grid-cols-3",
};

/** Single choice as large radio tiles (native radios, so arrow keys work). */
export function OptionTiles({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  const longLabels = options.some((o) => o.label.length > 18);
  return (
    <div
      className={`grid gap-2.5 ${longLabels ? "grid-cols-1" : "grid-cols-2"} ${TILE_COLS[options.length] ?? "sm:grid-cols-3"}`}
    >
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={`relative flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${focusRing} ${
              checked
                ? "border-ink bg-ink text-white shadow-lift"
                : "border-line bg-white text-ink hover:-translate-y-px hover:border-ink/30"
            }`}
          >
            <input
              type="radio"
              name={`qb-${name}`}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-colors ${
                checked ? "border-lime bg-lime" : "border-line-strong bg-white"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full bg-ink transition-transform ${checked ? "scale-100" : "scale-0"}`} />
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-medium leading-snug">{o.label}</span>
              {o.hint && (
                <span className={`mt-0.5 block text-[12.5px] leading-snug ${checked ? "text-white/60" : "text-muted"}`}>
                  {o.hint}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/** Multiple choice as checkbox chips. Keeps answers in option order. */
export function ChipGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  function toggle(v: string) {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange(options.map((o) => o.value).filter((x) => next.includes(x)));
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const checked = value.includes(o.value);
        return (
          <label
            key={o.value}
            className={`relative inline-flex min-h-[46px] cursor-pointer select-none items-center gap-2.5 rounded-full border py-2 pl-2.5 pr-4 text-[14px] font-medium transition-all duration-200 ${focusRing} ${
              checked ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            <input
              type="checkbox"
              name={`qb-${name}`}
              value={o.value}
              checked={checked}
              onChange={() => toggle(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors ${
                checked ? "bg-lime text-ink" : "border border-line bg-paper text-muted"
              }`}
            >
              {checked ? <Check size={13} strokeWidth={3} /> : <Plus size={13} strokeWidth={2.2} />}
            </span>
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

/** Radio pills with an icon — used for the preferred contact method. */
export function IconPills({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string; icon: ComponentType<{ size?: number; className?: string }> }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={`relative flex min-h-[54px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center text-[13.5px] font-medium transition-all duration-200 sm:flex-row sm:gap-2 sm:text-[14.5px] ${focusRing} ${
              checked ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            <input
              type="radio"
              name={`qb-${name}`}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <o.icon size={17} className={checked ? "text-lime" : "text-ink/70"} />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

/** Labelled text input or textarea. */
export function TextField({
  id,
  label,
  help,
  optional,
  required,
  error,
  value,
  onChange,
  placeholder,
  multiline,
  rows = 4,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
}: {
  id: string;
  label: ReactNode;
  help?: ReactNode;
  optional?: boolean;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "tel" | "email";
  inputMode?: "text" | "tel" | "email" | "url";
  autoComplete?: string;
  maxLength?: number;
}) {
  const shared = {
    id: inputId(id),
    name: id,
    value,
    placeholder,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-required": required ? true : undefined,
    "aria-describedby": describedBy(id, help, error),
    className: inputClass(Boolean(error)),
  } as const;

  return (
    <div id={fieldId(id)} className="min-w-0">
      <label htmlFor={inputId(id)} className="block text-[15px] font-semibold tracking-tight text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-muted-light">
            *
          </span>
        )}
        {optional && <OptionalTag />}
      </label>
      {help && (
        <p id={helpId(id)} className="mt-1 text-[13px] leading-relaxed text-muted">
          {help}
        </p>
      )}
      <div className="mt-2.5">
        {multiline ? (
          <textarea
            {...shared}
            rows={rows}
            onChange={(e) => onChange(e.target.value)}
            className={`${shared.className} min-h-[120px] resize-y`}
          />
        ) : (
          <input
            {...shared}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
      <FieldError id={id} message={error} />
    </div>
  );
}
