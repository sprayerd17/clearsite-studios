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
    <div id="cookie-banner" className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/95 px-5 py-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row">
        <p className="text-center text-[13px] leading-relaxed text-white/60 sm:text-left">
          We use cookies to improve your experience on our site. By continuing to browse, you agree
          to our use of cookies.{" "}
          <Link href="/privacy" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Learn more
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={decline} className="btn-ghost-dark btn-sm">
            Decline
          </button>
          <button onClick={accept} className="btn-lime btn-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
