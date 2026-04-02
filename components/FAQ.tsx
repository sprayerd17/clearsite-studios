"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects are completed within a couple of days depending on the size and complexity. I'll give you a clear timeline before we start.",
  },
  {
    question: "Do I need to provide my own content and photos?",
    answer:
      "You provide the basic info about your business — I'll help shape it into clean, professional copy. For photos, I recommend using your own but I can source free stock images if needed.",
  },
  {
    question: "What if I need changes after the website launches?",
    answer:
      "Minor changes are included for 2 weeks after launch. For ongoing updates, you can sign up for one of our monthly maintenance plans.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer:
      "Absolutely. Every website I build is fully mobile responsive and tested across different screen sizes.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes — for larger projects I can arrange a 50% deposit upfront and 50% on completion. Get in touch to discuss options.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just fill in the quote request form and I'll get back to you within 1 business day. No commitment required.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section bg-white">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="badge mb-4">FAQ</span>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
            Common questions
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="max-w-2xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
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
                  <p className="pb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>
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
