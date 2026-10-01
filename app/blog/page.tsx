import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tips & Insights | Clearsite Studios Blog",
  description: "Practical web design and business tips to help South African small businesses grow their online presence.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/blog",
  },
};

const posts = [
  {
    slug: "small-business-website",
    title: "5 Reasons Your Small Business Needs a Website in 2026",
    description: "Still relying on social media alone? Here's why a proper website is the smartest investment you can make this year.",
    category: "Business Tips",
    readTime: "3 min read",
  },
  {
    slug: "prepare-before-building",
    title: "What to Prepare Before Building Your Website",
    description: "A simple checklist of what to have ready before your first conversation with a web designer.",
    category: "Getting Started",
    readTime: "4 min read",
  },
  {
    slug: "mobile-friendly-design",
    title: "Why Mobile-Friendly Design Is No Longer Optional",
    description: "More than half of all web traffic comes from phones. Here's what that means for your business.",
    category: "Web Design",
    readTime: "3 min read",
  },
];

type Post = (typeof posts)[number];

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="chip">{post.category}</span>
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <Clock size={13} />
        {post.readTime}
      </span>
    </div>
  );
}

function ReadLink() {
  return (
    <span className="link-arrow text-ink">
      Read article
      <ArrowUpRight size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        eyebrow="Blog"
        title={
          <>
            Tips &amp; <span className="serif-accent text-lime">insights.</span>
          </>
        }
        intro="Practical advice to help small businesses grow their online presence."
      />

      <main className="flex-1">
        <section className="section bg-paper">
          <div className="container-site">
            <div className="grid gap-5 md:grid-cols-2">
              {/* ── Featured post ─────────────────────────────────────── */}
              <div className="anim-fade-up md:col-span-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="card card-hover group grid h-full overflow-hidden lg:grid-cols-[1.25fr_0.75fr]"
                >
                  <div className="flex flex-col p-7 sm:p-10">
                    <PostMeta post={featured} />
                    <h2 className="mt-8 max-w-xl text-[28px] leading-[1.1] tracking-tightest text-ink sm:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="prose-muted mt-4 max-w-lg text-[15.5px]">{featured.description}</p>
                    <div className="mt-10 border-t border-line pt-6">
                      <ReadLink />
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="grain relative hidden min-h-[280px] overflow-hidden bg-ink lg:block"
                  >
                    <div className="bg-grid-dark mask-radial-center absolute inset-0" />
                    <div
                      className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-2xl"
                      style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.25), transparent)" }}
                    />
                    <div className="relative z-10 flex h-full flex-col justify-between p-10">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                        01 / 0{posts.length}
                      </span>
                      <span className="serif-accent text-[120px] leading-none text-lime transition-transform duration-500 group-hover:-translate-y-1">
                        01
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* ── Remaining posts ───────────────────────────────────── */}
              {rest.map((post, i) => (
                <div
                  key={post.slug}
                  className="anim-fade-up"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card card-hover group flex h-full flex-col p-7 sm:p-8"
                  >
                    <PostMeta post={post} />
                    <h2 className="mt-8 text-xl leading-snug tracking-tight text-ink sm:text-[22px]">
                      {post.title}
                    </h2>
                    <p className="prose-muted mt-3 flex-1 text-[15px]">{post.description}</p>
                    <div className="mt-8 border-t border-line pt-5">
                      <ReadLink />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
