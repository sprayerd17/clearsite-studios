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
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: "#3b82f6", backgroundColor: "#dbeafe" }}>
              Web Design
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6" style={{ color: "#111827" }}>
            Why Mobile-Friendly Design Is No Longer Optional
          </h1>

          <p className="text-base leading-relaxed mb-10" style={{ color: "#6b7280" }}>
            More than half of all web traffic comes from phones. Here&apos;s what that means for your business.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 space-y-8 text-base leading-relaxed" style={{ color: "#374151" }}>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                What does mobile-friendly actually mean?
              </h2>
              <p>
                A mobile-friendly website automatically adjusts its layout to fit smaller screens. Text is readable without zooming in, buttons are easy to tap, and the page loads quickly on a mobile data connection.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Why it matters for your business
              </h2>
              <p>
                Google ranks mobile-friendly websites higher in search results. If your site isn&apos;t optimised for mobile, you&apos;re not just losing visitors — you&apos;re being pushed down the list before they even find you.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                The numbers don&apos;t lie
              </h2>
              <p>
                Over 60% of all web traffic globally now comes from mobile devices. In South Africa, that number is even higher due to the widespread use of smartphones as the primary way people access the internet.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                What a bad mobile experience looks like
              </h2>
              <p>
                Text that&apos;s too small to read, buttons that are too close together to tap, images that stretch or break the layout, and pages that take forever to load. Any one of these sends potential clients straight to a competitor.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                What we do at Clearsite Studios
              </h2>
              <p>
                Every website we build is designed mobile-first — meaning we start with the phone experience and build up from there. Your clients get a smooth, fast, professional experience no matter what device they&apos;re using.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="mb-5" style={{ color: "#6b7280" }}>
                Want a website that works perfectly on every device?
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
