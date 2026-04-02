import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[#fafafa]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-muted)]">
          <Link href="/" className="text-[var(--color-text)] font-semibold transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[var(--color-text)] transition-colors">About</Link>
          <Link href="/portfolio" className="hover:text-[var(--color-text)] transition-colors">Portfolio</Link>
          <Link href="/blog" className="hover:text-[var(--color-text)] transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-[var(--color-text)] transition-colors">Pricing</Link>
        </nav>
        <Link href="/pricing" className="btn-primary text-sm">
          Get Started
        </Link>
      </div>
    </header>
  );
}
