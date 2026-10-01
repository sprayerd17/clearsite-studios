import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Contact from "@/components/Contact";
import { PhoneFrame } from "@/components/Frames";
import { FeatureProjectCard, ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Check } from "@/components/icons";
import { clientWork, mathly, radSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work | Clearsite Studios Portfolio",
  description:
    "Live websites built for South African businesses, a custom job and invoicing workflow for RAD Cricket, and Mathly — a personal project by founder Divan Bosman.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/portfolio",
  },
};

const radScreens = [radSteps[0], radSteps[1], radSteps[4]];

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        eyebrow="Work"
        title={
          <>
            Real work, <span className="serif-accent text-lime">running right now.</span>
          </>
        }
        intro="Live websites built for real South African businesses — open them and see for yourself. Alongside them: a custom workflow system, and Mathly, a personal project of mine."
      />

      <main className="flex-1">
        {/* ── Client websites ─────────────────────────────────────────── */}
        <section className="section bg-paper">
          <div className="container-site">
            <SectionHeading
              eyebrow="Client websites"
              title={
                <>
                  Sites that bring the <span className="serif-accent">customer in.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {clientWork.map((p, i) => (
                <ProjectCard key={p.name} project={p} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Workflow system ─────────────────────────────────────────── */}
        <section className="grain relative overflow-hidden bg-ink py-24 text-white md:py-32">
          <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
          <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div className="anim-fade-left">
              <span className="eyebrow eyebrow-dark">Business workflow</span>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src="/work/rad-logo.webp"
                  alt="RAD Cricket logo"
                  width={56}
                  height={56}
                  className="rounded-full ring-1 ring-white/15"
                />
                <div>
                  <h2 className="text-3xl tracking-tightest text-white sm:text-4xl">RAD Cricket</h2>
                  <p className="text-sm text-white/45">Bat refurbs & repairs</p>
                </div>
              </div>
              <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-white/55">
                A job, quote and invoice system that replaced an Excel routine. Quotes go out on
                WhatsApp as private links, clients accept and approve extra work in one tap, and
                invoices, payments and proof of payment all live on the job — run entirely from the
                owner&apos;s phone.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Private client page per job — no app or login",
                  "Extra work approved with photos, on record",
                  "Quote and invoice PDFs generated automatically",
                  "Push notifications when a client responds",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-lime" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/#workflows" className="btn-lime mt-9">
                Walk through the workflow
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
            </div>

            <div className="anim-fade-right relative mx-auto flex w-full max-w-[560px] items-end justify-center gap-3 sm:gap-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.16), transparent)" }}
              />
              {radScreens.map((s, i) => (
                <PhoneFrame
                  key={s.screen}
                  src={s.screen}
                  alt={s.screenAlt}
                  sizes="200px"
                  className={`relative w-1/3 ${i === 1 ? "-translate-y-8 sm:-translate-y-12" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Personal project ────────────────────────────────────────── */}
        <section className="section bg-white">
          <div className="container-site">
            <SectionHeading
              eyebrow="Personal project"
              title={
                <>
                  Built for myself, <span className="serif-accent">to the same standard.</span>
                </>
              }
              intro="Mathly is my own platform — designed, built and run by me. It's the clearest evidence I can offer of what I'm able to build, so take a look and judge for yourself."
            />
            <div className="mt-12">
              <FeatureProjectCard project={mathly} />
            </div>
          </div>
        </section>

        <Contact
          title={
            <>
              Your business could be <span className="serif-accent text-lime">next.</span>
            </>
          }
        />
      </main>

      <Footer />
    </div>
  );
}
