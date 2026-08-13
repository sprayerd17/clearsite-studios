import Link from "next/link";
import Image from "next/image";
import { featuredWork } from "@/lib/sale";

export default function PortfolioPreview() {
  return (
    <section id="work" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="badge mb-4 anim-scale-in">Real Work</span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 anim-fade-up"
            style={{ color: "#111827", animationDelay: "100ms" }}
          >
            Sites I&apos;ve built and delivered.
          </h2>
          <p
            className="max-w-xl mx-auto anim-fade-up"
            style={{ color: "#6b7280", animationDelay: "180ms" }}
          >
            Live sites, running right now for real South African businesses. Open them and see for
            yourself.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {featuredWork.map((project, i) => (
            <div
              key={project.name}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden glass-card-hover flex flex-col anim-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="w-full aspect-video overflow-hidden">
                <Image
                  src={project.screenshot}
                  alt={project.screenshotAlt}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: project.accentColor }}
                >
                  {project.industry}
                </span>
                <h3 className="text-lg font-extrabold mb-2" style={{ color: "#111827" }}>
                  {project.name}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7280" }}>
                  {project.description}
                </p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: project.accentColor }}
                >
                  Visit the live site →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 anim-fade-up" style={{ animationDelay: "240ms" }}>
          <Link
            href="/portfolio"
            className="text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "#7c3aed" }}
          >
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
