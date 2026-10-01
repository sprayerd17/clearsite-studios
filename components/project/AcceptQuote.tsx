"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { acceptQuote } from "@/app/q/[token]/actions";
import { Check } from "@/components/icons";
import { Spinner } from "./icons";

/** The one-tap "Accept quote" button. The version guards against accepting an outdated quote. */
export default function AcceptQuote({ token, version }: { token: string; version: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function accept() {
    setError("");
    startTransition(async () => {
      try {
        const result = await acceptQuote(token, version);
        if (result.ok) router.refresh();
        else setError(result.error);
      } catch {
        setError("Something went wrong. Please check your connection and try again.");
      }
    });
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        type="button"
        onClick={accept}
        disabled={pending}
        className="btn-lime btn-lg w-full disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
      >
        {pending ? <Spinner size={18} /> : <Check size={18} strokeWidth={2.5} />}
        {pending ? "Accepting…" : "Accept quote"}
      </button>
      {error && (
        <div role="alert" className="mt-3 rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink">
          {error}{" "}
          <button type="button" onClick={() => router.refresh()} className="font-medium underline underline-offset-4">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
