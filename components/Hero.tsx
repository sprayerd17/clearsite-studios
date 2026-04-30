import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row md:h-screen">
      {/* LEFT SIDE — white background */}
      <div className="w-full md:flex-1 bg-white flex items-center px-8 py-16 md:px-20 md:py-0">
        <div className="max-w-lg">
          <span className="badge mb-8 anim-scale-in">
            ✦ Web Design &amp; Development Studio
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 anim-fade-up"
            style={{ color: "#1a1a1a", animationDelay: "100ms" }}
          >
            See your brand new website before spending a single cent.
          </h1>

          <p
            className="text-lg leading-relaxed mb-8 anim-fade-up"
            style={{ color: "#71717a", animationDelay: "200ms" }}
          >
            We design a fully custom mockup for free — built to your exact vision. You decide if you want to go further. Zero pressure, zero obligation.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mb-6 anim-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link href="/get-started" className="btn-primary text-base px-8 py-4">
              Get My Free Mockup →
            </Link>
            <Link href="/portfolio" className="btn-outline text-base px-8 py-4">
              View Our Work
            </Link>
          </div>

          <p
            className="text-sm anim-fade-up"
            style={{ color: "#a1a1aa", animationDelay: "400ms" }}
          >
            ✦ 100% custom design — no templates, no shortcuts
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — dark navy with image */}
      <div
        className="relative w-full h-[300px] md:flex-1 md:h-auto overflow-hidden md:rounded-tr-3xl md:rounded-br-3xl"
        style={{ backgroundColor: "#1e1b4b" }}
      >
        <Image
          src="/portfolio/hooked-by-bella.jpg"
          alt="Website design showcase"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle purple gradient overlay fading up from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(30,27,75,0.85), transparent)",
          }}
        />
      </div>
    </section>
  );
}
