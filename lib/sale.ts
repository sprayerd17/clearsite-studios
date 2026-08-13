/**
 * Closing-down sale configuration.
 *
 * Single source of truth for prices, contact details and sale copy.
 * Everything here renders directly on the live site.
 */

/* ─── Contact ───────────────────────────────────────────────────────────── */

/** Carried over from the previous site content — replace if it has changed. */
export const WHATSAPP_NUMBER = "27612891218"; // wa.me format: country code, no + or spaces
export const PHONE_DISPLAY = "061 289 1218";
export const PHONE_TEL = "+27612891218";

export const WHATSAPP_MESSAGE =
  "Hi Divan, I saw the ClearSite closing-down sale and I'm interested in a website.";

/** Builds a click-to-chat link with a pre-filled message. */
export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TEL_LINK = `tel:${PHONE_TEL}`;

/* ─── Founder ───────────────────────────────────────────────────────────── */

/** Leave empty and the site renders the name as plain text instead of a link. */
export const MATHLY_URL = "https://mathly.co.za";

/**
 * Set to a path under /public (e.g. "/portfolio/mathly.png") once you have a
 * screenshot. Null renders the initials fallback on the portfolio page.
 */
export const MATHLY_SCREENSHOT: string | null = null;

/* ─── Terms ─────────────────────────────────────────────────────────────── */

/**
 * How long after launch you'll still answer questions.
 * Defaulted to the 2 weeks the site already promised — confirm it still holds
 * once the studio is closed.
 */
export const SUPPORT_WINDOW = "2 weeks";

/** How payment is collected. */
export const PAYMENT_TERMS =
  "I send you an invoice for the deposit to start, and a second invoice for the balance on completion.";

/* ─── Pricing ───────────────────────────────────────────────────────────── */

/**
 * Every tier is discounted 80% off its original price, matching Starter
 * (R1,999 -> R399), rounded down to the nearest x99.
 */
export type Package = {
  name: string;
  planParam: string;
  originalPrice: string;
  salePrice: string;
  delivery: string;
  learnMoreLink: string;
  features: string[];
};

export const packages: Package[] = [
  {
    name: "STARTER",
    planParam: "Starter",
    originalPrice: "R1,999",
    salePrice: "R399",
    delivery: "3 days",
    learnMoreLink: "/packages/starter",
    features: [
      "Single page website",
      "Mobile responsive",
      "WhatsApp contact button",
      "Basic SEO setup",
      "1 round of revisions",
    ],
  },
  {
    name: "BUSINESS",
    planParam: "Business",
    originalPrice: "R3,499",
    salePrice: "R699",
    delivery: "7 days",
    learnMoreLink: "/packages/business",
    features: [
      "Up to 5 pages",
      "WhatsApp contact button",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media links",
      "2 rounds of revisions",
    ],
  },
  {
    name: "PROFESSIONAL",
    planParam: "Professional",
    originalPrice: "R5,499",
    salePrice: "R1,099",
    delivery: "14 days",
    learnMoreLink: "/packages/professional",
    features: [
      "Up to 10 pages",
      "Everything in Business",
      "Blog or news section",
      "Google Analytics setup",
      "Speed optimised",
      "3 rounds of revisions",
    ],
  },
  {
    name: "E-COMMERCE",
    planParam: "E-Commerce",
    originalPrice: "R6,499",
    salePrice: "R1,299",
    delivery: "21 days",
    learnMoreLink: "/packages/ecommerce",
    features: [
      "Full online store",
      "Product catalogue",
      "PayFast integration",
      "Order management",
      "Everything in Professional",
    ],
  },
];

/* ─── Featured work ─────────────────────────────────────────────────────── */

export type FeaturedProject = {
  name: string;
  description: string;
  industry: string;
  accentColor: string;
  /** Path under /public. */
  screenshot: string;
  screenshotAlt: string;
  url: string;
};

export const featuredWork: FeaturedProject[] = [
  {
    name: "Hooked by Bella",
    description:
      "A warm online store for a South African handmade crochet business, built to showcase products and take enquiries.",
    industry: "Crafts & Handmade Goods",
    accentColor: "#e879a0",
    screenshot: "/portfolio/hookedbybella.png",
    screenshotAlt: "Hooked by Bella website screenshot",
    url: "https://hookedbybella.co.za",
  },
  {
    name: "Beaver Tree Felling & Gardening Services",
    description:
      "A professional service website for a Cape Town tree felling and gardening company, built to attract local customers and generate leads.",
    industry: "Trades & Services",
    accentColor: "#16a34a",
    screenshot: "/portfolio/beavertreefelling.png",
    screenshotAlt: "Beaver Tree Felling & Gardening Services website screenshot",
    url: "https://beavertreefellinggardeningservices.co.za",
  },
];
