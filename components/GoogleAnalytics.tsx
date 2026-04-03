"use client";

// To activate Google Analytics:
// 1. Go to https://analytics.google.com and create a property for your site.
// 2. Copy the Measurement ID (format: G-XXXXXXXXXX) from Admin → Data Streams → your stream.
// 3. Replace "G-XXXXXXXXXX" below with your real Measurement ID.

import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-VWN7ZZQMN7";

export default function GoogleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (localStorage.getItem("cookie_consent") !== "accepted") return;

    // Load the GA script dynamically
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}
