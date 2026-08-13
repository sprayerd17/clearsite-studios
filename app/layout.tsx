import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollObserver from "@/components/ScrollObserver";
import ScrollToTop from "@/components/ScrollToTop";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
const AnnouncementBar = dynamic(() => import("@/components/AnnouncementBar"));

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  // Required so relative Open Graph image paths resolve to absolute URLs.
  metadataBase: new URL("https://www.clearsitestudios.co.za"),
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
        <AnnouncementBar />
        <CookieBanner />
        <GoogleAnalytics />
        <WhatsAppButton />
        <ScrollToTop />
        <ScrollObserver />
      </body>
    </html>
  );
}
