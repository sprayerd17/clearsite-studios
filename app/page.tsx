import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

const title = "Closing Down Sale — Websites from R399 | ClearSite Studios";
const description =
  "I'm closing ClearSite Studios to build Mathly, my maths education platform, so the remaining website packages are going at a reduced once-off price. You own the site outright, hosted free, no monthly fee.";
const ogDescription =
  "Built by one person, handed over in full, no monthly fee. Remaining packages from R399.";

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
    title: "Closing down — remaining website packages reduced",
    description: ogDescription,
    // og:image comes from app/opengraph-image.tsx by file convention.
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Closing down — remaining website packages reduced",
    description: ogDescription,
  },
};

import Hero from "@/components/Hero";
import PortfolioPreview from "@/components/PortfolioPreview";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="section-divider" />
        <PortfolioPreview />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <FAQ />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
