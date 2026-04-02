// To activate Google Analytics:
// 1. Go to https://analytics.google.com and create a property for your site.
// 2. Copy the Measurement ID (format: G-XXXXXXXXXX) from Admin → Data Streams → your stream.
// 3. Replace "G-XXXXXXXXXX" below with your real Measurement ID.

const GA_MEASUREMENT_ID = "G-VWN7ZZQMN7";

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
