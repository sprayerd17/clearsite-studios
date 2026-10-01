"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { ArrowRight, Instagram, Menu, WhatsApp, X } from "./icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappLink } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/portfolio", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-14 max-w-site items-center justify-between rounded-2xl border pl-4 pr-2 transition-all duration-300 sm:pl-5 ${
            scrolled
              ? "border-white/10 bg-ink/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-white/[0.06] bg-ink/40 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80" aria-label="Clearsite Studios home">
            <Logo tone="light" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active ? "bg-white/[0.08] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white xl:inline-flex"
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            >
              <Instagram size={18} />
            </a>
            <Link href="/quote" className="btn-lime btn-sm hidden sm:inline-flex">
              Get a quote
              <ArrowRight size={15} className="btn-arrow" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08] lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-x-3 top-3 z-[70] origin-top rounded-3xl border border-white/10 bg-ink p-5 shadow-2xl transition-all duration-300 lg:hidden ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-[0.97] opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between">
          <Logo tone="light" />
          <button
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col" aria-label="Mobile">
          {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }, { href: "/quote", label: "Get a quote" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-lg font-medium tracking-tight text-white/85 transition-colors hover:text-white"
            >
              {l.label}
              <ArrowRight size={16} className="text-white/30" />
            </Link>
          ))}
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-lime">
            <WhatsApp size={16} />
            WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
            <Instagram size={16} />
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
