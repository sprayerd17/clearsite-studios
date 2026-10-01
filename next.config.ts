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
  async redirects() {
    return [
      // Package price pages were retired when pricing moved to quotes.
      { source: "/packages/:slug*", destination: "/pricing", permanent: true },
      { source: "/get-started", destination: "/quote", permanent: true },
    ];
  },
};

export default nextConfig;
