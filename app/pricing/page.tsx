import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span className="badge mb-6" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Get a Quote
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white">
            Let&apos;s build something<br />
            <span className="gradient-text">great together.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Pricing depends on the scope of your project — the best way to get an accurate quote
            is to tell me a little about what you need. No obligation, no pressure.
          </p>
        </div>
      </section>

      {/* Form + reassurance */}
      <main className="flex-1 section" style={{ backgroundColor: "#f4f4f5" }}>
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            {/* Promise block */}
            <div className="rounded-2xl p-7 mb-8 text-center" style={{ backgroundColor: "#ede9fe", border: "1px solid #ddd6fe" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#7c3aed" }}>Our Promise to You</p>
              <p className="text-base leading-relaxed font-medium" style={{ color: "#3b0764" }}>
                We start by creating a free visual mockup of your website so you can see the look and feel before making any decisions. If you love what you see and want to move forward, we&apos;ll discuss a payment plan that works for you — a deposit to begin the build, and the remainder once your site is live and hosting begins. No mockup cost, no surprises.
              </p>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border bg-white p-8 md:p-10 shadow-sm mb-10" style={{ borderColor: "#e4e4e7" }}>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#111827" }}>
                Request a free quote
              </h2>
              <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
                Fill in the form below and I&apos;ll get back to you with a tailored quote.
              </p>
              <QuoteForm />
            </div>

            {/* Reassurance strip */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "✋", heading: "No obligation quote", body: "Getting a quote costs nothing. Take your time deciding." },
                { icon: "📬", heading: "Response within 1 business day", body: "You won't be left waiting — I reply promptly, every time." },
                { icon: "💬", heading: "No tech jargon", body: "Just a plain, honest conversation about what you need." },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="rounded-2xl p-5 border text-center"
                  style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa" }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{item.heading}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
