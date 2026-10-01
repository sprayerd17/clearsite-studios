"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, X } from "@/components/icons";
import CopyButton from "./CopyButton";

/**
 * Shown once, right after the quote form sends the client here with ?new=1.
 * The flag is dropped from the address straight away, so a bookmark of this
 * page doesn't bring the banner back every time.
 */
export default function NewRequestBanner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}${pathname}`);
    const params = new URLSearchParams(window.location.search);
    if (params.has("new")) {
      params.delete("new");
      const rest = params.toString();
      window.history.replaceState(window.history.state, "", rest ? `${pathname}?${rest}` : pathname);
    }
  }, [pathname]);

  if (!open) return null;

  return (
    <div
      role="status"
      className="rise relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-lime-deep/40 bg-lime-soft p-5 pr-12 sm:flex-row sm:items-center sm:p-6 sm:pr-14"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-lime">
        <Check size={19} strokeWidth={2.5} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold tracking-tight text-ink">
          Your request is in — keep this link. It always shows the latest on your project.
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">
          Bookmark this page or save the link somewhere safe. It&apos;s private to you, so there&apos;s no
          password to remember.
        </p>
      </div>
      {url && <CopyButton value={url} label="project link" text="Copy link" className="self-start sm:self-center" />}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/[0.06] hover:text-ink"
      >
        <X size={16} />
      </button>
    </div>
  );
}
