"use client";

import { useEffect, useState } from "react";
import { Check } from "@/components/icons";
import { Copy } from "./icons";

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / non-secure contexts.
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export default function CopyButton({
  value,
  label,
  className = "",
  tone = "light",
  text = "Copy",
}: {
  value: string;
  /** What's being copied, for screen readers: "account number". */
  label: string;
  className?: string;
  tone?: "light" | "dark";
  text?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    setState((await writeClipboard(value)) ? "copied" : "failed");
  }

  const base =
    tone === "dark"
      ? "border-white/15 bg-white/[0.04] text-white hover:border-white/30"
      : "border-line bg-white text-ink hover:border-ink/30";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={state === "copied" ? `${label} copied` : `Copy ${label}`}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors ${base} ${className}`}
    >
      {state === "copied" ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Press and hold to copy" : text}</span>
    </button>
  );
}
