import type { ReactNode } from "react";

/** Eyebrow + headline + intro, used at the top of every section. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className = "",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** "light" = section on paper/white, "dark" = section on ink. */
  tone?: "light" | "dark";
  className?: string;
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"} ${className}`}
    >
      <div className={centered ? "" : "max-w-2xl"}>
        <span className={`eyebrow anim-fade-up ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</span>
        <h2
          className={`anim-fade-up mt-5 text-[34px] leading-[1.04] tracking-tightest sm:text-5xl lg:text-[56px] ${
            dark ? "text-white" : "text-ink"
          }`}
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`anim-fade-up mt-5 text-base leading-relaxed sm:text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-xl"} ${
              dark ? "text-white/55" : "text-muted"
            }`}
            style={{ animationDelay: "160ms" }}
          >
            {intro}
          </p>
        )}
      </div>
      {action && (
        <div className="anim-fade-up shrink-0" style={{ animationDelay: "200ms" }}>
          {action}
        </div>
      )}
    </div>
  );
}
