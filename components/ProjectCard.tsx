import Image from "next/image";
import type { Project } from "@/lib/site";
import { ArrowUpRight } from "./icons";

function KindBadge({ kind }: { kind: Project["kind"] }) {
  return kind === "Personal project" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      Personal project
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
      Live client site
    </span>
  );
}

function Screenshot({ project, sizes, aspect = "aspect-[16/10]" }: { project: Project; sizes: string; aspect?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 truncate font-mono text-[10px] text-muted">{project.domain}</span>
      </div>
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

/** Standard card: screenshot on top, details below. The whole card links out. */
export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover anim-fade-up group flex flex-col p-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Screenshot project={project} sizes="(max-width: 1024px) 95vw, 580px" />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{project.industry}</span>
          <KindBadge kind={project.kind} />
        </div>
        <h3 className="mt-3 text-2xl tracking-tight text-ink">{project.name}</h3>
        <p className="prose-muted mt-2 flex-1 text-[15px]">{project.description}</p>
        <span className="link-arrow mt-5 text-ink">
          Visit the live site
          <ArrowUpRight size={15} />
        </span>
      </div>
    </a>
  );
}

/** Wide card: details left, screenshot right. Used for Mathly. */
export function FeatureProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover anim-fade-up group relative grid overflow-hidden p-3 lg:grid-cols-[0.85fr_1.15fr]"
    >
      <div aria-hidden="true" className="bg-dots-light pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,#000,transparent_45%)]" />
      <div className="relative flex flex-col justify-center px-4 pb-6 pt-5 sm:px-6 lg:py-8 lg:pl-8 lg:pr-10">
        <div className="flex flex-wrap items-center gap-3">
          <KindBadge kind={project.kind} />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{project.industry}</span>
        </div>
        <h3 className="mt-5 text-3xl tracking-tightest text-ink sm:text-4xl">
          {project.name}
          <span className="serif-accent text-muted">.</span>
        </h3>
        <p className="prose-muted mt-3 text-[15px]">{project.description}</p>
        <span className="link-arrow mt-6 text-ink">
          Visit {project.domain}
          <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="relative order-first lg:order-none">
        <Screenshot project={project} sizes="(max-width: 1024px) 95vw, 680px" />
      </div>
    </a>
  );
}
