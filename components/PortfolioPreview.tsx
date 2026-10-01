import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { FeatureProjectCard, ProjectCard } from "./ProjectCard";
import { ArrowRight } from "./icons";
import { clientWork, mathly } from "@/lib/site";

export default function PortfolioPreview() {
  return (
    <section id="work" className="section bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Live, and running <span className="serif-accent">right now.</span>
            </>
          }
          intro="Real sites for real South African businesses — open them and see for yourself."
          action={
            <Link href="/portfolio" className="btn-ghost">
              See all work
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {clientWork.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 100} />
          ))}
        </div>
        <div className="mt-5">
          <FeatureProjectCard project={mathly} />
        </div>
      </div>
    </section>
  );
}
