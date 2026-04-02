import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    content:
      "At Clearsite Studios, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your personal data.",
  },
  {
    title: "2. What Information We Collect",
    content:
      "When you submit a quote request through our website, we collect the following information:",
    list: [
      "Your name",
      "Your business name",
      "Your email address",
      "Your phone number",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content:
      "The information you provide is used solely to respond to your quote request and to communicate with you about your project. We will never sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "4. Cookies",
    content:
      "We use basic cookies to improve your browsing experience on our site. These cookies do not collect personally identifiable information. By continuing to use our site, you consent to our use of cookies. You can disable cookies through your browser settings at any time.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "We use the following third-party services to operate this website:",
    list: [
      "Formspree — used to process and deliver quote request form submissions.",
      "Google Analytics — used to understand how visitors interact with our site. Data collected is anonymous and aggregated.",
    ],
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to request access to the personal information we hold about you, and to request that it be corrected or deleted. To exercise any of these rights, please contact us at the email address below and we will respond within a reasonable timeframe.",
  },
  {
    title: "7. Contact",
    content: null,
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 md:py-28" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-narrow max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:opacity-70"
            style={{ color: "#6b7280" }}
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl font-extrabold mb-2" style={{ color: "#111827" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-10" style={{ color: "#9ca3af" }}>
            Last updated: April 2026
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {sections.map((section) => (
              <div key={section.title} className="p-8">
                <h2 className="text-base font-bold mb-3" style={{ color: "#111827" }}>
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="mt-3 space-y-1.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#6b7280" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#7c3aed" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.contact && (
                  <div className="text-sm leading-relaxed space-y-1" style={{ color: "#6b7280" }}>
                    <p>
                      For any privacy-related questions or requests, please contact us at:{" "}
                      <a
                        href="mailto:clearsitestudios@outlook.com"
                        className="font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
                        style={{ color: "#7c3aed" }}
                      >
                        clearsitestudios@outlook.com
                      </a>
                    </p>
                    <p>Clearsite Studios is based in South Africa.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
