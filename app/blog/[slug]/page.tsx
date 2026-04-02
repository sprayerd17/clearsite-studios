import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-28" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <div className="text-5xl mb-6">✍️</div>
          <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#111827" }}>
            Full article coming soon.
          </h1>
          <p className="text-base mb-8" style={{ color: "#6b7280" }}>
            We&apos;re working on this one. Check back shortly.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "#7c3aed" }}
          >
            ← Back to blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
