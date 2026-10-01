import Link from "next/link";
import { WhatsApp } from "@/components/icons";
import Logo from "@/components/Logo";
import { whatsappLink } from "@/lib/site";

export default function ProjectNotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid-dark mask-radial-center pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.12), transparent 75%)" }}
      />

      <header className="relative z-10 border-b border-white/[0.08]">
        <div className="container-site flex h-16 items-center">
          <Link href="/" aria-label="ClearSite Studios home">
            <Logo tone="light" />
          </Link>
        </div>
      </header>

      <div className="container-site relative z-10 flex flex-1 flex-col items-center justify-center pb-28 pt-16 text-center">
        <span className="rise eyebrow eyebrow-dark">Project link</span>
        <h1
          className="rise mt-6 max-w-2xl text-[40px] font-semibold leading-[1.04] tracking-tightest text-white sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          This link isn&apos;t <span className="serif-accent text-lime">working.</span>
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55"
          style={{ animationDelay: "160ms" }}
        >
          Please check you copied the whole link from your WhatsApp or email. Still stuck? Send me a message and
          I&apos;ll send it again.
        </p>
        <div
          className="rise mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href={whatsappLink("Hi Divan, my project link isn't working. Could you send it again?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime btn-lg"
          >
            <WhatsApp size={18} />
            Ask for a new link
          </a>
          <Link href="/" className="btn-ghost-dark btn-lg">
            Go to the website
          </Link>
        </div>
      </div>
    </main>
  );
}
