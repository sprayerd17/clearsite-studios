"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Key is versioned so visitors who dismissed the previous bar still see this one.
const STORAGE_KEY = "closing_sale_bar_dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.classList.add("has-bar");
    } else {
      document.documentElement.classList.remove("has-bar");
    }
    return () => {
      document.documentElement.classList.remove("has-bar");
    };
  }, [visible]);

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <Link
      href="/pricing"
      className="announcement-bar"
      aria-label="Closing down sale — see the reduced packages"
    >
      {/* Desktop text */}
      <span className="announcement-bar__text--desktop">
        Closing down — remaining packages reduced to a once-off price. →
      </span>

      {/* Mobile text */}
      <span className="announcement-bar__text--mobile">
        Closing down — packages reduced →
      </span>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="announcement-bar__close"
      >
        ✕
      </button>
    </Link>
  );
}
