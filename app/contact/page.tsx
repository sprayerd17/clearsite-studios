import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contact | ClearSite Studios",
  description: "Get in touch with ClearSite Studios for project enquiries, quotes, or a quick chat.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span className="badge mb-6" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Have a question or ready to start your project? Reach out and I&apos;ll get back to you within 1 business day.
          </p>
        </div>
      </section>

      <main className="flex-1 section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">

            {/* Email card */}
            <div className="rounded-2xl border bg-white p-8 shadow-sm flex flex-col gap-5" style={{ borderColor: "#e4e4e7" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ede9fe" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-extrabold mb-1" style={{ color: "#111827" }}>Email Us</h2>
                <p className="text-sm mb-4" style={{ color: "#6b7280" }}>For project enquiries and quotes</p>
                <p className="text-sm font-semibold mb-5" style={{ color: "#111827" }}>clearsitestudios@outlook.com</p>
                <a
                  href="mailto:clearsitestudios@outlook.com"
                  className="btn-primary inline-flex text-sm"
                >
                  Send Email →
                </a>
              </div>
            </div>

            {/* WhatsApp / Phone card */}
            <div className="rounded-2xl border bg-white p-8 shadow-sm flex flex-col gap-5" style={{ borderColor: "#e4e4e7" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ede9fe" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#7c3aed" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.25a.75.75 0 0 0 .918.919l5.444-1.468A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.98-1.371l-.356-.214-3.697.997.992-3.67-.233-.376A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-extrabold mb-1" style={{ color: "#111827" }}>WhatsApp / Call Us</h2>
                <p className="text-sm mb-4" style={{ color: "#6b7280" }}>For quick questions and conversations</p>
                <p className="text-sm font-semibold mb-5" style={{ color: "#111827" }}>060 397 9279</p>
                <a
                  href="https://wa.me/27603979279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex text-sm"
                >
                  Open WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {/* Reassurance strip */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: "📬", text: "Response within 1 business day" },
              { icon: "✋", text: "No obligation consultations" },
              { icon: "🇿🇦", text: "Based in South Africa" },
            ].map((item) => (
              <div
                key={item.text}
                className="rounded-2xl p-5 border text-center flex items-center justify-center gap-3"
                style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa" }}
              >
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm font-semibold" style={{ color: "#374151" }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Quote form */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border bg-white p-8 md:p-10 shadow-sm" style={{ borderColor: "#e4e4e7" }}>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#111827" }}>
                Send a full enquiry
              </h2>
              <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
                Fill in the form below and I&apos;ll get back to you with a tailored quote.
              </p>
              <QuoteForm />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
