import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArticlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24" style={{ backgroundColor: "#f8fafc" }}>
        <div className="px-6 mx-auto" style={{ maxWidth: "740px" }}>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:opacity-70"
            style={{ color: "#6b7280" }}
          >
            ← Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: "#7c3aed", backgroundColor: "#ede9fe" }}>
              Business Tips
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6" style={{ color: "#111827" }}>
            5 Reasons Your Small Business Needs a Website in 2026
          </h1>

          <p className="text-base leading-relaxed mb-10" style={{ color: "#6b7280" }}>
            Still relying on social media alone? Here&apos;s why a proper website is the smartest investment you can make this year.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 space-y-8 text-base leading-relaxed" style={{ color: "#374151" }}>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                1. You own it — social media can disappear overnight
              </h2>
              <p>
                Your Facebook or Instagram page can be suspended, hacked, or simply lose its reach due to an algorithm change. Your website belongs to you. No platform can take it away or hide it from your audience.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                2. Clients Google you before they call you
              </h2>
              <p>
                When someone hears about your business, the first thing they do is search for you online. If nothing comes up — or worse, a competitor appears instead — you&apos;ve already lost that client. A website makes you findable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                3. It works for you 24/7
              </h2>
              <p>
                Your website answers questions, showcases your services, and collects enquiries even while you sleep. It&apos;s your most hardworking employee and it never takes a day off.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                4. It builds trust instantly
              </h2>
              <p>
                A clean, professional website signals that you are serious about your business. Customers are far more likely to contact a business that looks established and credible online.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                5. It levels the playing field
              </h2>
              <p>
                A well-built website means a small local business can look just as professional as a large company. Your website is often the first impression — make it count.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="mb-5" style={{ color: "#6b7280" }}>
                Ready to get your business online? Get in touch with Clearsite Studios today for a free, no-obligation quote.
              </p>
              <Link href="/pricing" className="btn-primary inline-flex">
                Request a Quote →
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
