import Link from "next/link";
import Logo from "./Logo";
import { ArrowUpRight, Instagram, Mail, Phone, WhatsApp } from "./icons";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAIL_LINK,
  PHONE_DISPLAY,
  TEL_LINK,
  whatsappLink,
} from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Websites" },
      { href: "/#workflows", label: "Business workflows" },
      { href: "/quote?service=store", label: "Online stores" },
      { href: "/pricing", label: "Pricing" },
      { href: "/quote", label: "Get a quote" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/portfolio", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink text-white">
      <div className="container-site pb-28 pt-16 sm:pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              Websites and business workflows for South African businesses. Designed, built and
              handed over by one person.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/65 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-white/65 hover:text-white">
                  <WhatsApp size={15} className="text-white/40 group-hover:text-lime" />
                  WhatsApp
                  <ArrowUpRight size={13} className="text-white/30" />
                </a>
              </li>
              <li>
                <a href={TEL_LINK} className="group inline-flex items-center gap-2.5 text-white/65 hover:text-white">
                  <Phone size={15} className="text-white/40 group-hover:text-lime" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={MAIL_LINK} className="group inline-flex items-center gap-2.5 break-all text-white/65 hover:text-white">
                  <Mail size={15} className="shrink-0 text-white/40 group-hover:text-lime" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-white/65 hover:text-white">
                  <Instagram size={15} className="text-white/40 group-hover:text-lime" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-[13px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Clearsite Studios. All rights reserved.</p>
          <div className="flex items-center gap-6 sm:pr-20">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Built in South Africa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
