import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { FileText } from "@/components/icons";

export default function BlogPostPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col bg-ink">
        <PageHero
          eyebrow="Blog"
          back={{ href: "/blog", label: "Back to blog" }}
          title={
            <>
              Full article <span className="serif-accent text-lime">coming soon.</span>
            </>
          }
          intro="We're working on this one. Check back shortly."
        >
          <div
            aria-hidden="true"
            className="mx-auto flex max-w-sm items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime text-ink">
              <FileText size={20} />
            </span>
            <span className="flex flex-1 flex-col gap-2">
              <span className="block h-2 w-4/5 animate-pulse rounded-full bg-white/15" />
              <span className="block h-2 w-3/5 animate-pulse rounded-full bg-white/10" />
              <span className="block h-2 w-2/5 animate-pulse rounded-full bg-white/[0.07]" />
            </span>
          </div>
        </PageHero>
      </main>

      <Footer />
    </div>
  );
}
