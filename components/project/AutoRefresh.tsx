"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Re-fetches the page whenever the client comes back to the tab, so anything
 * changed in the admin (quote sent, deposit confirmed, launched...) shows up
 * without them having to reload. Typed text and pending uploads are kept.
 */
export default function AutoRefresh({ minGapSeconds = 5 }: { minGapSeconds?: number }) {
  const router = useRouter();
  const last = useRef(0);

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      // Focus and visibilitychange usually fire together — only refresh once.
      if (now - last.current < minGapSeconds * 1000) return;
      last.current = now;
      router.refresh();
    };
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [router, minGapSeconds]);

  return null;
}
