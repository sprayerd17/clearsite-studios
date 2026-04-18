import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <span className="badge mb-6" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white">
            The studio behind<br />
            <span className="gradient-text">the website.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            A little about who we are, how we work, and what we believe.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 section" style={{ backgroundColor: "#fafafa" }}>
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Text */}
            <div>
              <span className="badge mb-5">Our Story</span>
              <h2 className="text-3xl font-extrabold mb-8" style={{ color: "#111827" }}>
                One studio. One focus.<br />
                <span style={{ color: "#7c3aed" }}>Your business online.</span>
              </h2>

              <div className="space-y-5 text-base leading-relaxed" style={{ color: "#4b5563" }}>
                <p>
                  Clearsite Studio is a solo web design studio based in South Africa, built on one
                  simple belief — every small business deserves a professional online presence
                  without the big agency price tag.
                </p>
                <p>
                  I work directly with small business owners, one client at a time, to build clean
                  and effective websites that make a real impression. Whether you&apos;re getting
                  online for the first time, refreshing an outdated site, or looking to attract more
                  customers, I&apos;m here to make the process simple and stress-free — no tech
                  jargon, no confusing back-and-forth, just clear communication and results
                  you&apos;re proud of.
                </p>
                <p>
                  Based in South Africa and proudly serving local businesses, I understand what it
                  takes to stand out in your market. Fast turnaround, fair pricing, and personal
                  service — that&apos;s the Clearsite Studio promise.
                </p>
              </div>

              {/* Promise callout */}
              <div className="mt-10 rounded-2xl p-6" style={{ backgroundColor: "#ede9fe", border: "1px solid #ddd6fe" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "#5b21b6" }}>Our promise to you</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6d28d9" }}>
                  Before any money changes hands, we show you exactly what your website will look like. Free mockup, zero commitment.
                </p>
              </div>

              <div className="mt-6">
                <a href="/pricing" className="btn-primary">Work with me →</a>
              </div>
            </div>

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-4 md:mt-2">
              {[
                { icon: "🇿🇦", heading: "South Africa based", body: "Serving local businesses who deserve a world-class online presence." },
                { icon: "🎯", heading: "One client at a time", body: "You get my full attention — not a ticket number in a queue." },
                { icon: "💬", heading: "Plain language", body: "No tech jargon. Just clear, honest communication throughout." },
                { icon: "💸", heading: "Fair pricing", body: "Professional results without the big agency price tag." },
                { icon: "⚡", heading: "Fast turnaround", body: "Get online quickly without cutting corners on quality." },
                { icon: "🤝", heading: "Personal service", body: "You deal directly with me, start to finish, every time." },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="rounded-2xl p-5 border bg-[var(--color-surface)] hover:shadow-md transition-shadow duration-200"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
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
