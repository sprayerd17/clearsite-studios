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
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: "#0d9488", backgroundColor: "#f0fdfa" }}>
              Getting Started
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6" style={{ color: "#111827" }}>
            What to Prepare Before Building Your Website
          </h1>

          <p className="text-base leading-relaxed mb-10" style={{ color: "#6b7280" }}>
            Building a website goes much faster — and costs less — when you arrive prepared. Here&apos;s exactly what to have ready before your first meeting.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 space-y-8 text-base leading-relaxed" style={{ color: "#374151" }}>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Your business basics
              </h2>
              <p>
                Have your business name, tagline, and a short description of what you do ready. Think about what makes you different from competitors and write it down in plain language.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Your contact details
              </h2>
              <p>
                Email address, phone number, physical address or service area, and links to any existing social media profiles you want included.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                A list of your services
              </h2>
              <p>
                Write out each service you offer with a short description. Don&apos;t worry about making it perfect — your web designer can help polish the wording.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Your logo (if you have one)
              </h2>
              <p>
                If you have a logo, have it saved as a PNG or SVG file. If you don&apos;t have one yet, mention it upfront so it can be factored into the project.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Examples of websites you like
              </h2>
              <p>
                Find 2 or 3 websites that you think look good. This gives your designer a clear sense of your taste and saves a lot of back and forth.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
                Your budget and timeline
              </h2>
              <p>
                Having a rough idea of what you want to spend and when you need the site live helps your designer recommend the right solution for you.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="mb-5" style={{ color: "#6b7280" }}>
                At Clearsite Studios we guide you through every step — but coming in with the basics ready makes a real difference.
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
