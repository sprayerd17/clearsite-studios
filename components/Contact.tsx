export default function Contact() {
  return (
    <section id="contact" className="section bg-[#1e1b4b] text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative container-narrow">
        <div className="max-w-xl mx-auto text-center">
          <span className="badge mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Get in Touch
          </span>
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Let&apos;s build something great.
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Ready to get your business online or take your existing site to the next level?
            Drop us an email and we&apos;ll get back to you promptly.
          </p>
          <a
            href="mailto:clearsitestudios@outlook.com"
            className="btn-primary text-base inline-block px-8 py-4"
          >
            clearsitestudios@outlook.com
          </a>
          <p className="mt-5 text-xs text-slate-500">
            We typically respond within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
