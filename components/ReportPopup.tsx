"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "report_popup_shown";
const DELAY_MS = 15000;

export default function ReportPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/business-report") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname]);

  function close() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Free business report offer"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "1.25rem",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          maxWidth: "480px",
          width: "100%",
          padding: "2.25rem 2rem 2rem",
          position: "relative",
          animation: "popup-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#71717a",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "0.25rem",
            borderRadius: "0.375rem",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#27272a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#71717a")}
        >
          ✕
        </button>

        {/* FREE OFFER label */}
        <span
          className="badge"
          style={{ marginBottom: "1rem", display: "inline-flex" }}
        >
          FREE OFFER
        </span>

        {/* Heading */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1e1b4b",
            marginBottom: "0.75rem",
            lineHeight: 1.25,
          }}
        >
          Get Your Free Business Report
        </h2>

        {/* Description */}
        <p
          style={{
            color: "#52525b",
            fontSize: "0.9375rem",
            lineHeight: 1.65,
            marginBottom: "1.75rem",
          }}
        >
          Find out exactly how your business performs online. Answer a few quick
          questions and we&apos;ll send you a personalised report with your{" "}
          <strong style={{ color: "#1e1b4b" }}>Business Health Score</strong>,
          diagnosed weaknesses, and a clear action plan — completely free, no
          strings attached.
        </p>

        {/* CTA button */}
        <Link
          href="/business-report"
          className="btn-primary"
          onClick={close}
          style={{ width: "100%", fontSize: "1rem", padding: "0.875rem 1.5rem" }}
        >
          Get My Free Report →
        </Link>

        {/* Sub-text */}
        <p
          style={{
            textAlign: "center",
            color: "#71717a",
            fontSize: "0.8125rem",
            marginTop: "0.75rem",
          }}
        >
          Takes less than 2 minutes to complete
        </p>

        {/* Skip link */}
        <div style={{ textAlign: "center", marginTop: "0.875rem" }}>
          <button
            onClick={close}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a1a1aa",
              fontSize: "0.8125rem",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              padding: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#71717a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#a1a1aa")}
          >
            No thanks, I&apos;ll skip this
          </button>
        </div>

        <style>{`
          @keyframes popup-in {
            from { opacity: 0; transform: scale(0.92) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
