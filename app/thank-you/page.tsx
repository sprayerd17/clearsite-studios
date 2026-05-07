import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Thank You | Clearsite Studios",
  description: "Thanks for reaching out to Clearsite Studios. We will be in touch within 1 business day.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 md:py-28" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow text-center max-w-xl mx-auto px-6">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
            style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
          >
            <svg className="w-9 h-9" style={{ color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight tracking-tight" style={{ color: "#111827" }}>
            Thank you!
          </h1>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#6b7280" }}>
            We&apos;ve received your message and will be in touch within 1 business day. In the meantime, feel free to have a look around.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home →
            </Link>
            <Link
              href="/blog"
              className="btn-outline"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
