import Link from "next/link";
import Logo from "./Logo";
import { PHONE_DISPLAY, TEL_LINK, whatsappLink } from "@/lib/sale";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-8 bg-white">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <span className="flex items-center gap-3">
          <Logo />
          <span>&copy; {year}. All rights reserved.</span>
        </span>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ paddingRight: "80px" }}
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            WhatsApp
          </a>
          <a href={TEL_LINK} className="hover:text-[var(--color-accent)] transition-colors">
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
