import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Calendar } from "@/components/icons";
import { EMAIL, MAIL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Clearsite Studios",
  description: "Clearsite Studios privacy policy. How we collect, use and protect your information.",
  alternates: {
    canonical: "https://www.clearsitestudios.co.za/privacy",
  },
};

type Section = {
  number: string;
  title: string;
  content: string | null;
  list?: string[];
  contact?: boolean;
};

const sections: Section[] = [
  {
    number: "01",
    title: "Introduction",
    content:
      "At Clearsite Studios, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your personal data.",
  },
  {
    number: "02",
    title: "What Information We Collect",
    content:
      "When you submit a quote request through our website, we collect the following information:",
    list: [
      "Your name",
      "Your business name",
      "Your email address",
      "Your phone number",
      "The details of your project that you choose to share (what you need, timeline and budget range)",
      "If you go ahead: proof of payment and the content you upload for your project (logo, photos, text)",
    ],
  },
  {
    number: "03",
    title: "Your Project Page",
    content:
      "When you request a quote, you get a private project page with an unguessable link. Your quote, invoices and uploads are shown there, so keep the link to yourself. Only Clearsite Studios can see your details in our admin system, and your information is stored securely with Google Firebase. We keep it for as long as we work together and as required for tax and accounting records, and you can ask us to delete it at any time.",
  },
  {
    number: "04",
    title: "How We Use Your Information",
    content:
      "The information you provide is used solely to respond to your quote request and to communicate with you about your project. We will never sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    number: "05",
    title: "Cookies",
    content:
      "We use basic cookies to improve your browsing experience on our site. These cookies do not collect personally identifiable information. By continuing to use our site, you consent to our use of cookies. You can disable cookies through your browser settings at any time.",
  },
  {
    number: "06",
    title: "Third-Party Services",
    content:
      "We use the following third-party services to operate this website:",
    list: [
      "Google Firebase — used to store quote requests, project pages and uploaded files securely.",
      "Formspree — used as a backup to deliver quote request form submissions.",
      "Google Analytics — used to understand how visitors interact with our site. Data collected is anonymous and aggregated.",
    ],
  },
  {
    number: "07",
    title: "Your Rights",
    content:
      "You have the right to request access to the personal information we hold about you, and to request that it be corrected or deleted, in line with the Protection of Personal Information Act (POPIA). To exercise any of these rights, please contact us at the email address below and we will respond within a reasonable timeframe.",
  },
  {
    number: "08",
    title: "Contact",
    content: null,
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHero
        align="left"
        back={{ href: "/", label: "Back to home" }}
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="serif-accent text-lime">policy.</span>
          </>
        }
      >
        <span className="chip-dark font-mono uppercase tracking-[0.12em]">
          <Calendar size={13} />
          Last updated: April 2026
        </span>
      </PageHero>

      <main className="flex-1 bg-paper">
        <section className="py-20 md:py-28">
          <div className="container-site">
            <div className="mx-auto max-w-[720px] border-b border-line">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="grid gap-x-8 gap-y-3 border-t border-line py-10 sm:grid-cols-[64px_1fr]"
                >
                  <span className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {section.number}
                  </span>
                  <div>
                    <h2 className="text-2xl leading-tight tracking-tight text-ink">{section.title}</h2>

                    {section.content && (
                      <p className="mt-4 text-base leading-[1.75] text-ink/75">{section.content}</p>
                    )}

                    {section.list && (
                      <ul className="mt-4 space-y-2.5">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-base leading-[1.7] text-ink/75">
                            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink ring-[3px] ring-lime/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.contact && (
                      <div className="mt-4 space-y-2 text-base leading-[1.75] text-ink/75">
                        <p>
                          For any privacy-related questions or requests, please contact us at:{" "}
                          <a
                            href={MAIL_LINK}
                            className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
                          >
                            {EMAIL}
                          </a>
                        </p>
                        <p>Clearsite Studios is based in South Africa.</p>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
