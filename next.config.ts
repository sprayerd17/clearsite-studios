import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Content uploads on the client project page (max 10 MB per file) go through server actions.
      bodySizeLimit: "11mb",
    },
  },
  async headers() {
    return [
      {
        // Always fetch the latest service worker so notification changes roll out.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Package price pages were retired when pricing moved to quotes.
      { source: "/packages/:slug*", destination: "/pricing", permanent: true },
      { source: "/get-started", destination: "/quote", permanent: true },
      // Was the old Formspree redirect target.
      { source: "/thank-you", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
