"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[var(--color-border)] bg-[#fafafa]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container-narrow flex items-center justify-between h-16">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-muted)]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--color-text)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/pricing" className="btn-primary text-sm hidden md:inline-flex">
            Get Started
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-[#1a1a1a] rounded-full" />
            <span className="w-5 h-0.5 bg-[#1a1a1a] rounded-full" />
            <span className="w-5 h-0.5 bg-[#1a1a1a] rounded-full" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col bg-[#1e1b4b] text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Logo className="brightness-0 invert" />
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white text-xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              {l.label}
            </Link>
          ))}
        </nav>

      </div>
    </>
  );
}
