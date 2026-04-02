const projects = [
  {
    title: "E-Commerce Store",
    description: "Product-first layouts built to drive sales and simplify checkout.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Retail & Shopping",
  },
  {
    title: "Restaurant & Hospitality",
    description: "Warm, immersive designs that get customers through the door.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Food & Drink",
  },
  {
    title: "Creative Portfolio",
    description: "Bold, visual-forward sites that let your work speak for itself.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Creatives & Artists",
  },
  {
    title: "Corporate & Professional",
    description: "Polished business sites that build trust from the first scroll.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Business & Services",
  },
  {
    title: "Health & Wellness",
    description: "Clean, calming designs for clinics, coaches, and wellness brands.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Health & Lifestyle",
  },
  {
    title: "Blog & Editorial",
    description: "Readable, engaging layouts that keep your audience coming back.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&auto=format&q=80",
    tag: "Content & Media",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="badge mb-4">Our Work</span>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
            A site for every business.
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            From launch-day startups to established brands — we craft experiences tailored to your industry and your goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <div className="p-5" style={{ backgroundColor: "#ffffff" }}>
                <h3 className="text-base font-bold mb-1.5" style={{ color: "#111827" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/pricing" className="btn-primary">
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
