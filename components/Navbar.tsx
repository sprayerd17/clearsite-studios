import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[#fafafa]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container-narrow flex items-center justify-between h-16">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-muted)]">
          <a href="/" className="text-[var(--color-text)] font-semibold transition-colors">Home</a>
          <a href="/about" className="hover:text-[var(--color-text)] transition-colors">About</a>
          <a href="/portfolio" className="hover:text-[var(--color-text)] transition-colors">Portfolio</a>
          <a href="/blog" className="hover:text-[var(--color-text)] transition-colors">Blog</a>
          <a href="/pricing" className="hover:text-[var(--color-text)] transition-colors">Pricing</a>
        </nav>
        <a href="/pricing" className="btn-primary text-sm">
          Get Started
        </a>
      </div>
    </header>
  );
}
