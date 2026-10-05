import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientStrip from "@/components/ClientStrip";
import Services from "@/components/Services";
import WorkflowShowcase from "@/components/WorkflowShowcase";
import PortfolioPreview from "@/components/PortfolioPreview";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const title = "ClearSite Studios — Websites & Business Workflows | South Africa";
const description =
  "Fast, modern websites and custom business workflows — quotes, approvals, invoices and payments in one place. Built by one person, handed over in full, yours outright.";
const ogTitle = "Websites that win customers. Workflows that run the rest.";
const ogDescription =
  "Websites and custom business workflows for South African businesses. Yours outright, no lock-in.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/",
  },
  openGraph: {
    type: "website",
    url: "https://www.clearsitestudios.co.za/",
    siteName: "ClearSite Studios",
    title: ogTitle,
    description: ogDescription,
    // og:image comes from app/opengraph-image.tsx by file convention.
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientStrip />
        <Services />
        <WorkflowShowcase />
        <PortfolioPreview />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
