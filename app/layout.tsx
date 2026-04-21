import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollObserver from "@/components/ScrollObserver";
import ScrollToTop from "@/components/ScrollToTop";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

export const metadata: Metadata = {
  title: "ClearSite Studios",
  description: "Modern, high-performance websites for businesses of every size.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
        <WhatsAppButton />
        <ScrollToTop />
        <ScrollObserver />
      </body>
    </html>
  );
}
