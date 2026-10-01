import { newId } from "./ids";
import type { OnboardingItem, Settings } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.clearsitestudios.co.za";

export const DEFAULT_SETTINGS: Settings = {
  businessName: "ClearSite Studios",
  contactName: "Divan Bosman",
  phone: "27612891218",
  email: "clearsitestudios@outlook.com",
  website: "clearsitestudios.co.za",
  bank: { bankName: "", accountHolder: "", accountNumber: "", branchCode: "", accountType: "" },
  depositPercent: 50,
  quoteValidDays: 14,
  quoteTerms:
    "A 50% deposit secures your spot and starts the build; the balance is due once it's live and handed over. Build time is counted from when I've received your content. Everything goes live under accounts in your name — no monthly fee to me.",
  notifyEmail: "clearsitestudios@outlook.com",
  templates: {
    quoteReady:
      "Hi {firstName}, thanks for your request! Your quote from ClearSite Studios is ready ({total}). You can view it and accept it here: {link}",
    depositReceived:
      "Hi {firstName}, I've received your deposit for project #{number} — thank you! You can upload your logo, photos and text on your project page: {link}",
    launched:
      "Hi {firstName}, great news — your project #{number} is live! The final invoice ({balance}) is on your project page: {link}",
    general: "Hi {firstName}, here's your project page with ClearSite Studios: {link}",
  },
};

/** Fills any missing settings fields (old documents, partial saves) from the defaults. */
export function withDefaults(saved: Partial<Settings> | undefined): Settings {
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    bank: { ...DEFAULT_SETTINGS.bank, ...saved?.bank },
    templates: { ...DEFAULT_SETTINGS.templates, ...saved?.templates },
  };
}

/** The content checklist a client works through after accepting a quote. */
export function defaultOnboarding(): OnboardingItem[] {
  const item = (label: string, hint: string): OnboardingItem => ({
    id: newId(),
    label,
    hint,
    done: false,
    response: "",
    files: [],
  });
  return [
    item("Logo", "Upload your logo — the highest quality version you have (PNG, SVG or PDF is ideal)."),
    item("Photos", "Photos of your work, products, premises or team. Phone photos are fine."),
    item("Text & services", "Your services or products, prices if you show them, and anything you'd like said about the business. A Word doc, PDF or just type it here."),
    item("Contact details", "Phone, WhatsApp, email, address and opening hours as they should appear on the site."),
    item("Domain name", "Do you already own a domain (e.g. mybusiness.co.za)? If so, which one and where is it registered?"),
    item("Social media & extras", "Links to your Facebook, Instagram, Google Business profile — and anything else I should know."),
  ];
}
