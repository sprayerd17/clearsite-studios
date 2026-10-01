import { Check } from "@/components/icons";
import { CLIENT_STEPS, clientStep } from "@/lib/quote/leads";
import type { LeadStatus } from "@/lib/quote/types";

/** Request → Quote → Deposit → Build → Launch, drawn for the dark page header. */
export default function Stepper({ status }: { status: LeadStatus }) {
  const count = CLIENT_STEPS.length;
  // Once complete, every step (including Launch) is done.
  const current = status === "complete" ? count : clientStep(status);

  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        <span>Progress</span>
        <span>{current >= count ? "All steps done" : `Step ${current + 1} of ${count}`}</span>
      </div>
      <ol className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2.5">
        {CLIENT_STEPS.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} aria-current={active ? "step" : undefined} className="min-w-0">
              <span
                aria-hidden="true"
                className={`block h-1 rounded-full ${
                  done ? "bg-lime" : active ? "bg-gradient-to-r from-lime to-white/10" : "bg-white/10"
                }`}
              />
              <span className="mt-3 flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                    done
                      ? "bg-lime text-ink"
                      : active
                        ? "bg-white text-ink ring-4 ring-lime/25"
                        : "border border-white/15 text-white/40"
                  }`}
                >
                  {done ? <Check size={13} strokeWidth={2.75} /> : i + 1}
                </span>
                <span
                  className={`max-w-full truncate text-xs sm:text-[13px] ${
                    done ? "text-white/70" : active ? "font-medium text-white" : "text-white/35"
                  }`}
                >
                  {step}
                  <span className="sr-only">{done ? " (done)" : active ? " (current step)" : ""}</span>
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
