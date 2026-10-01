interface LogoProps {
  /** "light" = for dark backgrounds (white wordmark). */
  tone?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
}

/** The two overlapping panes — a layered window, kept from the original mark. */
export function LogoMark({ size = 26, tone = "dark" }: { size?: number; tone?: "light" | "dark" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="16"
        height="16"
        rx="4.5"
        fill="none"
        stroke={tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(10,11,13,0.45)"}
        strokeWidth="1.6"
      />
      <rect x="9.5" y="9.5" width="17" height="17" rx="4.5" fill="#c6f24e" />
      <rect
        x="9.5"
        y="9.5"
        width="17"
        height="17"
        rx="4.5"
        fill="none"
        stroke="rgba(10,11,13,0.18)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Logo({ tone = "dark", className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Clearsite Studios">
      <LogoMark tone={tone} />
      {showWordmark && (
        <span
          className={`text-[17px] font-semibold tracking-[-0.03em] ${
            tone === "light" ? "text-white" : "text-ink"
          }`}
        >
          Clearsite
          <span className={tone === "light" ? "font-normal text-white/55" : "font-normal text-muted"}>
            {" "}
            Studios
          </span>
        </span>
      )}
    </span>
  );
}
