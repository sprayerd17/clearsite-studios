import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollObserver from "@/components/ScrollObserver";
import ScrollToTop from "@/components/ScrollToTop";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  // Required so relative Open Graph image paths resolve to absolute URLs.
  metadataBase: new URL("https://www.clearsitestudios.co.za"),
  title: "ClearSite Studios — Websites & Business Workflows",
  description:
    "Fast, modern websites and custom business workflows for South African businesses. Built by one person, handed over in full.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
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
