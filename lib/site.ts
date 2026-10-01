/**
 * Site configuration.
 *
 * Single source of truth for contact details, prices, terms and portfolio
 * entries. Everything here renders directly on the live site.
 */

/* ─── Contact ───────────────────────────────────────────────────────────── */

export const WHATSAPP_NUMBER = "27612891218"; // wa.me format: country code, no + or spaces
export const PHONE_DISPLAY = "061 289 1218";
export const PHONE_TEL = "+27612891218";
export const EMAIL = "clearsitestudios@outlook.com";
export const INSTAGRAM_URL = "https://instagram.com/clearsitestudios";
export const INSTAGRAM_HANDLE = "@clearsitestudios";

export const WHATSAPP_MESSAGE =
  "Hi Divan, I found ClearSite Studios and I'd like to chat about a project.";

/** Builds a click-to-chat link with a pre-filled message. */
export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TEL_LINK = `tel:${PHONE_TEL}`;
export const MAIL_LINK = `mailto:${EMAIL}`;

/* ─── Founder ───────────────────────────────────────────────────────────── */

export const MATHLY_URL = "https://mathly.co.za";

/* ─── Terms ─────────────────────────────────────────────────────────────── */

/** How long after launch you'll still answer questions. */
export const SUPPORT_WINDOW = "2 weeks";

/** How payment is collected. */
export const PAYMENT_TERMS =
  "I send you an invoice for the deposit to start, and a second invoice for the balance on completion.";

/* ─── Pricing ───────────────────────────────────────────────────────────── */

/** The one public price anchor. Everything else is quoted per project. */
export const FROM_PRICE = "R800";

/** Where every "Get a quote" button points. Add ?service=website|redesign|store|workflow to preselect. */
export const QUOTE_PATH = "/quote";

export function quoteHref(service?: "website" | "redesign" | "store" | "workflow"): string {
  return service ? `${QUOTE_PATH}?service=${service}` : QUOTE_PATH;
}

export const WORKFLOW_MESSAGE =
  "Hi Divan, I'd like to chat about a custom workflow for my business.";

/* ─── Work ──────────────────────────────────────────────────────────────── */

export type Project = {
  name: string;
  kind: "Client website" | "Personal project";
  industry: string;
  description: string;
  /** Path under /public. */
  screenshot: string;
  screenshotAlt: string;
  url: string;
  /** Domain shown in the browser frame. */
  domain: string;
};

export const clientWork: Project[] = [
  {
    name: "Hooked by Bella",
    kind: "Client website",
    industry: "Crafts & Handmade Goods",
    description:
      "A warm online store for a South African handmade crochet business, built to showcase products and take enquiries.",
    screenshot: "/work/hookedbybella.webp",
    screenshotAlt: "Hooked by Bella website homepage",
    url: "https://hookedbybella.co.za",
    domain: "hookedbybella.co.za",
  },
  {
    name: "Beaver Tree Felling & Gardening",
    kind: "Client website",
    industry: "Trades & Services",
    description:
      "A professional service website for a Cape Town tree felling and gardening company, built to attract local customers and generate leads.",
    screenshot: "/work/beaver.webp",
    screenshotAlt: "Beaver Tree Felling & Gardening Services website homepage",
    url: "https://beavertreefellinggardeningservices.co.za",
    domain: "beavertreefellinggardeningservices.co.za",
  },
];

export const mathly: Project = {
  name: "Mathly",
  kind: "Personal project",
  industry: "Education",
  description:
    "A maths education platform for South African learners from Grade 4 to Grade 12 — study guides, worked examples and practice questions at a fraction of the cost of a private tutor. Designed, built and run by me.",
  screenshot: "/work/mathly.webp",
  screenshotAlt: "Mathly maths education platform homepage",
  url: MATHLY_URL,
  domain: "mathly.co.za",
};

/* ─── Workflow case study ───────────────────────────────────────────────── */

export type WorkflowStep = {
  title: string;
  body: string;
  /** Path under /public — a phone-sized screen from the real app. */
  screen: string;
  screenAlt: string;
};

export const radSteps: WorkflowStep[] = [
  {
    title: "Quote sent as a private link",
    body: "The owner builds the quote from a price list and sends it on WhatsApp. The client opens their own job page — no app, no account — and accepts in one tap.",
    screen: "/work/rad-01-quote.webp",
    screenAlt: "RAD Cricket client page showing a quote ready to accept",
  },
  {
    title: "Extra work, approved with photos",
    body: "Found a crack once work started? Snap a photo, add the cost, and the client approves or declines each item. Every decision is on record.",
    screen: "/work/rad-03-extra.webp",
    screenAlt: "RAD Cricket client page asking the client to approve extra work with a photo",
  },
  {
    title: "Ready, invoiced, paid",
    body: "Marking a job ready issues the invoice. The client chooses cash or EFT on their page and uploads proof of payment straight from their phone.",
    screen: "/work/rad-06-ready.webp",
    screenAlt: "RAD Cricket client page showing the amount due and payment options",
  },
  {
    title: "Invoices that match the old template",
    body: "Quotes and invoices are generated from the job as A5 PDFs that mirror the Excel template the business already used — numbering carries on where it left off.",
    screen: "/work/rad-09-invoice.webp",
    screenAlt: "Generated RAD Cricket invoice PDF",
  },
  {
    title: "One screen per job for the owner",
    body: "Push notifications when a client responds, and a clear next step on every job — from quote to collected — all running from the owner's phone.",
    screen: "/work/rad-11-admin-paid.webp",
    screenAlt: "RAD Cricket admin screen for a job marked as paid",
  },
];
