"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode, SVGProps } from "react";
import Logo from "@/components/Logo";
import { AdminProvider, signOutAdmin } from "@/components/admin/AdminProvider";
import { InboxIcon, LogOutIcon, SlidersIcon, TagIcon } from "@/components/admin/icons";

type NavIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const NAV: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/admin", label: "Leads", icon: InboxIcon },
  { href: "/admin/prices", label: "Prices", icon: TagIcon },
  { href: "/admin/settings", label: "Settings", icon: SlidersIcon },
];

export default function AdminAppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/leads") : pathname.startsWith(href);

  return (
    <div className="min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink text-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-2 px-4 sm:h-16 sm:px-6">
          <Link href="/admin" className="mr-auto flex items-center gap-3" aria-label="Leads">
            <Logo tone="light" />
            <span className="hidden rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 min-[380px]:inline-block">
              Admin
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                  isActive(href) ? "bg-white/[0.08] text-white" : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={17} className={isActive(href) ? "text-lime" : ""} />
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => signOutAdmin()}
            className="grid h-10 w-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white sm:ml-2"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOutIcon size={19} />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-5 sm:px-6 sm:pb-16 sm:pt-8">
        <AdminProvider>{children}</AdminProvider>
      </main>

      {/* Tab bar on phones */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-ink pb-[env(safe-area-inset-bottom)] sm:hidden"
        aria-label="Admin"
      >
        <div className="mx-auto flex max-w-md">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-16 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  active ? "text-white" : "text-white/50"
                }`}
              >
                {active && <span className="absolute top-0 h-0.5 w-10 rounded-full bg-lime" />}
                <Icon size={22} className={active ? "text-lime" : ""} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
