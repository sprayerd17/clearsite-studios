import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
  {
    name: "Hooked by Bella",
    description: "A warm and inviting online store for a South African handmade crochet business, designed to showcase products and connect with customers.",
    industry: "Crafts & Handmade Goods",
    accentColor: "#e879a0",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800",
    imageAlt: "Colourful handmade crochet products laid out on a surface",
    concept: false,
    url: "https://hookedbybella.co.za",
  },
  {
    name: "FixIt Plumbing",
    description: "A clean service site for a plumbing company in Johannesburg.",
    industry: "Trades & Services",
    accentColor: "#3b82f6",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    imageAlt: "Plumber working on pipes with professional tools",
    concept: true,
    url: null,
  },
  {
    name: "Langa Legal",
    description: "A professional law firm website built for trust and clarity.",
    industry: "Professional Services",
    accentColor: "#7c3aed",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    imageAlt: "Professional legal office with books and a desk",
    concept: true,
    url: null,
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
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            <span className="text-white">Our</span>{" "}
            <span className="gradient-text">Work</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real websites built for real South African businesses, alongside concept projects showing the range of what we can create.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <main className="flex-1 py-20 md:py-28" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* Project image */}
                <div className="relative w-full aspect-video">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

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

          {/* Bottom note */}
          <div className="mt-16 text-center">
            <p className="text-base" style={{ color: "#6b7280" }}>
              Want to see your business here?{" "}
              <Link
                href="/pricing"
                className="font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                style={{ color: "#7c3aed" }}
              >
                Request a free quote.
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
