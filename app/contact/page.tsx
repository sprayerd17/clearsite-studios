import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  ArrowRight,
  ArrowUpRight,
  Chat,
  Instagram,
  Mail,
  MapPin,
  Phone,
  User,
  WhatsApp,
} from "@/components/icons";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAIL_LINK,
  PHONE_DISPLAY,
  TEL_LINK,
  whatsappLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Clearsite Studios | Get In Touch",
  description:
    "WhatsApp or call Divan directly about a website or a custom business workflow. Based in South Africa.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Get in <span className="serif-accent text-lime">touch.</span>
          </>
        }
        intro="WhatsApp is the fastest way to reach me — you'll be messaging me directly, not an inbox."
      />

      <main className="flex-1 bg-paper">
        <section className="section">
          <div className="container-site">
            <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
              {/* WhatsApp — primary */}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="grain card-hover anim-fade-left group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-lift sm:p-10"
              >
                <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.25), transparent)" }}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#25d366] text-white">
                    <WhatsApp size={26} />
                  </span>
                  <span className="chip-dark">
                    <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-lime text-lime" />
                    Fastest reply
                  </span>
                </div>
                <div className="relative z-10 mt-16">
                  <h2 className="text-4xl tracking-tightest text-white sm:text-5xl">WhatsApp me</h2>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/55">
                    Fastest way to reach me — goes straight to my phone.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-lg text-white/80">{PHONE_DISPLAY}</span>
                    <span className="btn-lime">
                      Open WhatsApp
                      <ArrowRight size={16} className="btn-arrow" />
                    </span>
                  </div>
                </div>
              </a>

              <div className="grid gap-5">
                {/* Call */}
                <a href={TEL_LINK} className="card card-hover anim-fade-right group flex flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-lime">
                      <Phone size={19} />
                    </span>
                    <ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h2 className="mt-8 text-2xl tracking-tight text-ink">Call me</h2>
                  <p className="prose-muted mt-1 text-sm">If you&apos;d rather talk than type</p>
                  <p className="mt-4 font-mono text-[15px] text-ink">{PHONE_DISPLAY}</p>
                </a>

                {/* Email + Instagram */}
                <div className="card anim-fade-right grid divide-y divide-line" style={{ animationDelay: "100ms" }}>
                  <a href={MAIL_LINK} className="group flex items-center gap-4 p-6 transition-colors hover:bg-paper/50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-paper text-ink">
                      <Mail size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink">Email</span>
                      <span className="block truncate text-sm text-muted">{EMAIL}</span>
                    </span>
                    <ArrowUpRight size={16} className="ml-auto shrink-0 text-muted" />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-6 transition-colors hover:bg-paper/50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-paper text-ink">
                      <Instagram size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">Instagram</span>
                      <span className="block text-sm text-muted">{INSTAGRAM_HANDLE}</span>
                    </span>
                    <ArrowUpRight size={16} className="ml-auto shrink-0 text-muted" />
                  </a>
                </div>
              </div>
            </div>

            {/* Reassurance strip */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { icon: User, text: "You're messaging Divan directly" },
                { icon: Chat, text: "No obligation, no sales script" },
                { icon: MapPin, text: "Based in South Africa" },
              ].map((item, i) => (
                <div
                  key={item.text}
                  className="anim-fade-up flex items-center gap-3 rounded-2xl border border-line bg-white/60 px-5 py-4"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <item.icon size={17} className="shrink-0 text-ink" />
                  <p className="text-sm font-medium text-ink/80">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="anim-fade-up mt-10 text-center text-sm text-muted">
              Prefer email?{" "}
              <a href={MAIL_LINK} className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4">
                {EMAIL}
              </a>{" "}
              — but WhatsApp will always be faster. Rather send your details in writing?{" "}
              <Link href="/quote" className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4">
                Request a quote
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
