"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white shadow-lg">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <p className="text-sm text-center sm:text-left" style={{ color: "#6b7280" }}>
          We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/privacy"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-slate-50"
            style={{ color: "#9ca3af" }}
          >
            Learn More
          </Link>
          <button
            onClick={decline}
            className="text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-colors hover:bg-slate-50"
            style={{ borderColor: "#7c3aed", color: "#7c3aed" }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#7c3aed" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
