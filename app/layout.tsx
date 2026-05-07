import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollObserver from "@/components/ScrollObserver";
import ScrollToTop from "@/components/ScrollToTop";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

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
    <html lang="en" className={plusJakartaSans.variable}>
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
