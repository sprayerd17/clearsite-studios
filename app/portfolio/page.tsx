import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MATHLY_SCREENSHOT, MATHLY_URL } from "@/lib/sale";

export const metadata: Metadata = {
  title: "Our Work | Clearsite Studios Portfolio",
  description: "Live websites built for South African small businesses by Clearsite Studios, plus Mathly — the venture I'm closing the studio to build.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/portfolio",
  },
};

const projects = [
  {
    name: "Hooked by Bella",
    description: "A warm and inviting online store for a South African handmade crochet business, designed to showcase products and connect with customers.",
    industry: "Crafts & Handmade Goods",
    accentColor: "#e879a0",
    screenshot: "/portfolio/hookedbybella.png",
    screenshotAlt: "Hooked by Bella website screenshot",
    image: "/portfolio/hooked-by-bella.webp",
    imageAlt: "Hooked by Bella logo — handmade crochet business",
    imageBg: "#0d3b2e",
    imageContain: true,
    concept: false,
    url:"https://hookedbybella.co.za",
  },
  {
    name: "Beaver Tree Felling & Gardening Services",
    description: "A professional service website for a Cape Town tree felling and gardening company, built to attract local customers and generate leads.",
    industry: "Trades & Services",
    accentColor: "#16a34a",
    screenshot: undefined,
    screenshotAlt: undefined,
    image: "/portfolio/beavertreefelling.png",
    imageAlt: "Beaver Tree Felling & Gardening Services website screenshot",
    imageBg: undefined,
    imageContain: false,
    concept: false,
    url:"https://beavertreefellinggardeningservices.co.za",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#1e1b4b] text-white py-20 md:py-28">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container-narrow text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors anim-fade-up"
          >
            ← Back to home
          </Link>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight anim-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <span className="text-white">Our</span>{" "}
            <span className="gradient-text">Work</span>
          </h1>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Live websites built for real South African businesses — open them and see for yourself. Alongside them, Mathly: the venture I&apos;m closing the studio to build.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <main className="flex-1 py-20 md:py-28" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col anim-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Screenshot preview — shown when available */}
                {project.screenshot ? (
                  <div className="w-full aspect-video overflow-hidden">
                    <Image
                      src={project.screenshot}
                      alt={project.screenshotAlt ?? ""}
                      width={800}
                      height={450}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  /* Fallback: original cover/contain image for cards without a screenshot */
                  <div
                    className="relative w-full aspect-video"
                    style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className={project.imageContain ? "object-contain p-6" : "object-cover"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Card content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: project.accentColor }}
                    >
                      {project.industry}
                    </span>
                    {project.concept && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#f1f5f9", color: "#94a3b8" }}>
                        Concept Project
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold mt-1 mb-2" style={{ color: "#111827" }}>
                    {project.name}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7280" }}>
                    {project.description}
                  </p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-opacity hover:opacity-70"
                      style={{ color: project.accentColor }}
                    >
                      Visit Site →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* What I'm building next — deliberately outside the client grid.
              Mathly is the founder's own venture, not ClearSite work. */}
          <div
            className="mt-16 rounded-2xl overflow-hidden anim-fade-up"
            style={{ border: "2px dashed #99f6e4", backgroundColor: "#f0fdfa" }}
          >
            {MATHLY_SCREENSHOT && (
              <div className="w-full aspect-[21/9] overflow-hidden">
                <Image
                  src={MATHLY_SCREENSHOT}
                  alt="Mathly maths education platform screenshot"
                  width={1400}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#0d9488" }}
                >
                  What I&apos;m Building Next
                </span>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
                >
                  Not a ClearSite project
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: "#111827" }}>
                Mathly
              </h2>

              <div className="max-w-2xl space-y-4">
                <p className="text-base leading-relaxed" style={{ color: "#4b5563" }}>
                  Mathly is the maths education platform I&apos;m leaving ClearSite Studios to build
                  full-time. It is the reason the studio is closing and the reason the remaining
                  packages are going at a reduced price — I&apos;d rather finish a few more sites
                  properly than leave them unsold.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#4b5563" }}>
                  It&apos;s my own venture, not a ClearSite product, service or client project. I
                  include it here for one reason: it&apos;s the clearest evidence of what I can
                  build, so you can look at it and judge for yourself before hiring me.
                </p>
              </div>

              {MATHLY_URL && (
                <a
                  href={MATHLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#0d9488" }}
                >
                  Take a look at Mathly →
                </a>
              )}
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-16 text-center anim-fade-up" style={{ animationDelay: "100ms" }}>
            <p className="text-base" style={{ color: "#6b7280" }}>
              I&apos;m closing the studio and clearing the remaining packages.{" "}
              <Link
                href="/pricing"
                className="font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                style={{ color: "#7c3aed" }}
              >
                See the reduced prices.
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
