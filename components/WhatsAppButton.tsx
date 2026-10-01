"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsApp } from "./icons";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  const [bottom, setBottom] = useState(24);
  const pathname = usePathname();

  useEffect(() => {
    function measureBanner() {
      const banner = document.getElementById("cookie-banner");
      setBottom(banner ? banner.offsetHeight + 16 : 24);
    }

    measureBanner();

    const observer = new MutationObserver(measureBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // The admin app is Divan's own tool — a "chat with Divan" button makes no sense there.
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Divan on WhatsApp"
      className="group fixed right-5 z-[45] flex items-center gap-0 rounded-full bg-ink p-1.5 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] transition-[bottom,gap,padding] duration-300 hover:gap-2.5 hover:pr-4 sm:right-6"
      style={{ bottom: `${bottom}px` }}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#25d366] text-white">
        <WhatsApp size={22} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[160px]">
        Chat with Divan
      </span>
    </a>
  );
}
