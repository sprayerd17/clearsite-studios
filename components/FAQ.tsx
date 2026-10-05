"use client";

import { useState } from "react";
import { Plus, WhatsApp } from "./icons";
import { FROM_PRICE, PAYMENT_TERMS, SUPPORT_WINDOW, whatsappLink } from "@/lib/site";

const faqs = [
  {
    question: "How much does a website cost?",
    answer: `Websites start from ${FROM_PRICE} for a simple one-page site with your services or catalogue, contact details and a WhatsApp button. From there the price depends on what you need — more pages, bookings, a blog, an online store. Request a quote and you'll get a written price on your own project page, usually within 1 business day. It takes about two minutes and there's no obligation.`,
  },
  {
    question: "What's a business workflow, and do I need one?",
    answer:
      "It's a custom tool built around a process you already run — quoting, taking bookings, tracking jobs, getting approvals, invoicing, chasing payments. If that process currently lives in spreadsheets, paper or a long WhatsApp thread per customer, a workflow puts it in one place: your clients get a simple link, and you get one screen that shows where everything stands. If your process already runs smoothly, you probably don't need one — and I'll tell you that.",
  },
  {
    question: "Who hosts it, and what does hosting cost me?",
    answer:
      "Websites go live on a hosting account in your own name — usually on a free tier — and I hand you the credentials on completion. If you'd rather not deal with any of it, I offer a monthly plan that covers hosting, maintenance and ongoing support; when it's right for you, it's shown as a separate monthly amount on your quote, so you always know exactly what's once-off and what's monthly. A custom domain is paid directly to the registrar; I don't mark it up or hold it on your behalf. Custom workflows follow the same principle, and any running costs are spelled out in your quote before you commit.",
  },
  {
    question: "Do I own the site and the code?",
    answer:
      "Yes, outright. Once the build is paid for, the site, the code and the hosting account are all yours. There is no licence and no lock-in — even with a monthly support plan, you can stop it any time. If you ever want another developer to take it over, they can — everything they need is already in your hands.",
  },
  {
    question: "What if I need changes after launch?",
    answer: `I answer questions during the build and for ${SUPPORT_WINDOW} after launch. After that, message me with what you'd like changed and I'll quote it — or have updates covered by a monthly support plan. A static site on a free tier has very little that can break on its own — there's no server to fall over and no database to corrupt — and because you own the code and the hosting account outright, any developer can pick it up without needing anything from me.`,
  },
  {
    question: "Will my website work on mobile phones?",
    answer:
      "Absolutely. Every website I build is mobile-first and tested across different screen sizes — most of your visitors are on a phone, so that's where I start. Workflows are built the same way: they run on your phone like an app, with nothing to download from an app store.",
  },
  {
    question: "How long does a build take, and how do I pay?",
    answer: `Website build times depend on the size of the site: about 3 days for a single page, 7 for up to 5 pages, 14 for up to 10 pages and 21 for an online store, counted from when you have sent me your content. Custom workflows are scoped individually and get their own timeline in the quote. Payment is a 50% deposit to secure your spot and start the build, with the balance due once it's live and handed over to you. ${PAYMENT_TERMS}`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-paper">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow anim-fade-up">FAQ</span>
            <h2
              className="anim-fade-up mt-5 text-[34px] leading-[1.04] tracking-tightest text-ink sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              Questions, <span className="serif-accent">answered.</span>
            </h2>
            <p className="anim-fade-up prose-muted mt-5 max-w-sm" style={{ animationDelay: "160ms" }}>
              Straight answers on hosting, ownership, timelines and payment. Anything else, just ask.
            </p>
            <a
              href={whatsappLink("Hi Divan, I have a question before getting started.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost anim-fade-up mt-8"
              style={{ animationDelay: "220ms" }}
            >
              <WhatsApp size={16} className="text-[#25d366]" />
              Ask me on WhatsApp
            </a>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                    >
                      <span className="text-[17px] font-medium tracking-tight text-ink sm:text-lg">{faq.question}</span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-ink bg-ink text-lime" : "border-line bg-white text-ink group-hover:border-ink/30"
                        }`}
                      >
                        <Plus size={15} strokeWidth={2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden pr-12 text-[15px] leading-relaxed text-muted">
                      <span className="block pb-6">{faq.answer}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
