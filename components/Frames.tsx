import Image from "next/image";
import type { ReactNode } from "react";

/** Minimal browser chrome around a screenshot. */
export function BrowserFrame({
  src,
  alt,
  domain,
  tone = "dark",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 60vw",
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  domain: string;
  tone?: "dark" | "light";
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`overflow-hidden rounded-xl sm:rounded-2xl ${
        dark ? "bg-ink-700 shadow-frame" : "border border-line bg-white shadow-card"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 ${
          dark ? "border-b border-white/[0.06]" : "border-b border-line bg-paper/60"
        }`}
      >
        <div className="flex gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-white/15" : "bg-ink/15"}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-white/15" : "bg-ink/15"}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-white/15" : "bg-ink/15"}`} />
        </div>
        <div
          className={`mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md px-3 py-1 font-mono text-[10px] sm:text-[11px] ${
            dark ? "bg-white/[0.05] text-white/45" : "bg-white text-muted ring-1 ring-line"
          }`}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z" />
          </svg>
          <span className="truncate">{domain}</span>
        </div>
        <div className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover object-top ${imageClassName}`}
        />
      </div>
    </div>
  );
}

/** A phone body around a 390×844 screen. Pass an image or custom children. */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
  children,
  sizes = "280px",
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
  sizes?: string;
}) {
  return (
    <div
      className={`relative rounded-[2.4rem] bg-[#1b1d21] p-[7px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_50px_100px_-30px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[2rem] bg-black">
        {/* Screen content starts below the status bar so the island never covers it */}
        <div className="absolute inset-x-0 bottom-0 top-[5%] bg-white">
          {src ? (
            <Image src={src} alt={alt ?? ""} fill priority={priority} sizes={sizes} className="object-cover object-top" />
          ) : (
            children
          )}
        </div>
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[1.3%] h-[2.8%] w-[30%] -translate-x-1/2 rounded-full bg-[#1b1d21]" />
      </div>
    </div>
  );
}
