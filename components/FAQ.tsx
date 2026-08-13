"use client";

import { useState } from "react";
import { PAYMENT_TERMS, SUPPORT_WINDOW } from "@/lib/sale";

const faqs = [
  {
    question: "What happens to my site after ClearSite closes?",
    answer:
      "Nothing. Your site keeps running exactly as it is. It is deployed to a hosting account in your name, not mine, so it does not depend on ClearSite Studios still existing. When I close the studio, nothing switches off and nothing needs to be moved.",
  },
  {
    question: "Who hosts it, and what does hosting cost me?",
    answer:
      "Your site is deployed on a free hosting tier under an account in your own name, and I hand you the credentials on completion. That is R0 per month. There is no hosting fee, no maintenance fee, and no invoice from me ever again. The only separate cost is a custom domain if you want one, which you pay directly to the registrar — I do not mark it up or hold it on your behalf.",
  },
  {
    question: "Do I own the site and the code?",
    answer:
      "Yes, outright. Once the build is paid for, the site, the code and the hosting account are all yours. There is no licence, no subscription and no lock-in. If you ever want another developer to take it over, they can — everything they need is already in your hands.",
  },
  {
    question: "What if something breaks later?",
    answer:
      `Straight answer: I am not offering ongoing support once the studio closes, so you should not buy on the assumption that I will be around. Two things make that manageable. A static site on a free tier has very little that can break on its own — there is no server to fall over and no database to corrupt. And because you own the code and the hosting account outright, any developer can pick it up without needing anything from me. I will answer handover questions during the build and for ${SUPPORT_WINDOW} after launch.`,
  },
  {
    question: "Why is the price so low?",
    answer:
      "Because I am closing, not because the work is different. I am moving on to build Mathly, my maths education platform, and I would rather finish a few more sites properly than leave the remaining packages unsold. You are getting the same build I have been charging full price for. There is also no monthly fee attached any more, so the number you see is genuinely the whole cost.",
  },
  {
    question: "How long does a build take, and how do I pay?",
    answer:
      `Build times depend on the package: 3 days for Starter, 7 for Business, 14 for Professional and 21 for E-Commerce, counted from when you have sent me your content. Payment is a 50% deposit to secure your spot and start the build, with the balance due once the site is live and handed over to you. ${PAYMENT_TERMS}`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section bg-white">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="badge mb-4 anim-scale-in">FAQ</span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 anim-fade-up"
            style={{ color: "#111827", animationDelay: "100ms" }}
          >
            The questions you should be asking
          </h2>
          <p
            className="max-w-xl mx-auto anim-fade-up"
            style={{ color: "#6b7280", animationDelay: "180ms" }}
          >
            Buying from a business that is closing is a fair thing to be careful about. Here is
            exactly how it works.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="glass-card-light glass-card-hover rounded-2xl anim-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ color: isOpen ? "#0d9488" : "#111827" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 text-lg font-light transition-transform duration-200"
                    style={{
                      color: isOpen ? "#0d9488" : "#9ca3af",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
