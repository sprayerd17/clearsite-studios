import type { Metadata } from "next";
import type { ReactNode } from "react";

// Private client pages: never indexed, and the token in the URL is never sent
// to other sites as a referrer.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  referrer: "same-origin",
};

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
