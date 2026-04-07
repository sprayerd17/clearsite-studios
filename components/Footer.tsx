import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-8 bg-white">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <span className="flex items-center gap-3">
          <Logo />
          <span>&copy; {year}. All rights reserved.</span>
        </span>
        <nav className="flex items-center gap-6" style={{ paddingRight: "80px" }}>
          <a href="mailto:clearsitestudios@outlook.com" className="hover:text-[var(--color-accent)] transition-colors">
            clearsitestudios@outlook.com
          </a>
<Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
