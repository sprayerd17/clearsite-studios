"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "announcement_bar_dismissed";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const suppress = pathname === "/business-report";

  useEffect(() => {
    if (suppress) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, [suppress]);

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
      href="/business-report"
      className="announcement-bar"
      aria-label="Get your free Business Health Report"
    >
      {/* Desktop text */}
      <span className="announcement-bar__text--desktop">
        🎁 Free offer — Get your personalised Business Health Report and discover how to grow online →
      </span>

      {/* Mobile text */}
      <span className="announcement-bar__text--mobile">
        🎁 Get your free Business Health Report →
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
