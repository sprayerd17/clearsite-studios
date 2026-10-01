import type { Metadata } from "next";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Admin · ClearSite Studios",
  robots: { index: false, follow: false },
};

/**
 * Wraps /admin and /admin/login so neither is indexed by search engines.
 * Until Firebase is configured (see QUOTES.md) it shows a setup note instead
 * of letting the Firebase client fail with an invalid API key.
 */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-white">
        <div className="max-w-md text-center">
          <div className="flex justify-center">
            <Logo tone="light" />
          </div>
          <h1 className="mt-8 text-3xl tracking-tight">Admin isn&apos;t set up yet</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/55">
            Add the Firebase environment variables to this deployment to switch on quotes and the
            admin. Until then, quote requests from the site are emailed to you through Formspree.
            Setup steps are in <span className="font-mono text-white/80">QUOTES.md</span>.
          </p>
        </div>
      </main>
    );
  }
  return children;
}
