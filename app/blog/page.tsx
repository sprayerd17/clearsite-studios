import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "small-business-website",
    title: "5 Reasons Your Small Business Needs a Website in 2026",
    description: "Still relying on social media alone? Here's why a proper website is the smartest investment you can make this year.",
    category: "Business Tips",
    readTime: "3 min read",
    categoryColor: "#7c3aed",
    categoryBg: "#ede9fe",
  },
  {
    slug: "prepare-before-building",
    title: "What to Prepare Before Building Your Website",
    description: "A simple checklist of what to have ready before your first conversation with a web designer.",
    category: "Getting Started",
    readTime: "4 min read",
    categoryColor: "#0d9488",
    categoryBg: "#f0fdfa",
  },
  {
    slug: "mobile-friendly-design",
    title: "Why Mobile-Friendly Design Is No Longer Optional",
    description: "More than half of all web traffic comes from phones. Here's what that means for your business.",
    category: "Web Design",
    readTime: "3 min read",
    categoryColor: "#3b82f6",
    categoryBg: "#dbeafe",
  },
];

export default function BlogPage() {
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
            <span className="text-white">Tips &amp;</span>{" "}
            <span className="gradient-text">Insights</span>
          </h1>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto anim-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Practical advice to help small businesses grow their online presence.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <main className="flex-1 py-20 md:py-28" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <div
                key={post.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 anim-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: post.categoryColor, backgroundColor: post.categoryBg }}
                  >
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold mb-3 leading-snug" style={{ color: "#111827" }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#6b7280" }}>
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: post.categoryColor }}
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
