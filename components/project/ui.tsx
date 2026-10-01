import type { ComponentType, ReactNode, SVGProps } from "react";
import { Check } from "@/components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

/** Mono uppercase label used across the project page. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.16em] text-muted ${className}`}>{children}</span>
  );
}

/** A white card with an icon tile, a mono label, a headline and body. */
export function SectionCard({
  icon: Icon,
  label,
  title,
  aside,
  children,
  className = "",
}: {
  icon: IconType;
  label: ReactNode;
  title: ReactNode;
  /** Right-aligned next to the label, e.g. a "Valid until" chip. */
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-lime">
            <Icon size={19} />
          </span>
          <Label>{label}</Label>
        </div>
        {aside}
      </div>
      <h2 className="mt-6 text-[26px] leading-[1.08] tracking-tight text-ink sm:text-[30px]">{title}</h2>
      {children}
    </section>
  );
}

/** A checklist row: done (lime tile), current (ink tile) or upcoming (outlined). */
export function CheckRow({
  state,
  title,
  detail,
}: {
  state: "done" | "current" | "todo";
  title: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3.5 py-3.5">
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
          state === "done"
            ? "bg-lime text-ink"
            : state === "current"
              ? "bg-ink text-lime"
              : "border border-line bg-white text-muted-light"
        }`}
      >
        {state === "done" ? (
          <Check size={14} strokeWidth={2.75} />
        ) : state === "current" ? (
          <span className="pulse-dot h-2 w-2 rounded-full bg-lime text-lime" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </span>
      <div className="min-w-0">
        <p className={`text-[15px] font-medium tracking-tight ${state === "todo" ? "text-muted" : "text-ink"}`}>{title}</p>
        {detail && <p className="mt-0.5 text-sm leading-relaxed text-muted">{detail}</p>}
      </div>
    </li>
  );
}
