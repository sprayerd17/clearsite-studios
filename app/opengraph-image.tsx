import { ImageResponse } from "next/og";

/**
 * Link-preview card, generated at build time.
 *
 * This is the first thing a prospect sees when the site is pasted into
 * WhatsApp, so it carries the announcement rather than just the logo.
 * Next picks this up by file convention and populates og:image and
 * twitter:image for every route — no manual asset to keep in sync.
 */
export const alt =
  "ClearSite Studios closing down — remaining website packages reduced";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1e1b4b 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row — studio name + sale pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            ClearSite Studios
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              color: "#c4b5fd",
              background: "rgba(124,58,237,0.18)",
              border: "2px solid rgba(124,58,237,0.45)",
              borderRadius: 999,
              padding: "10px 26px",
            }}
          >
            Closing Down Sale
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            The studio is closing.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              color: "#a855f7",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginTop: 8,
            }}
          >
            Remaining packages reduced.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 31,
              color: "#cbd5e1",
              marginTop: 28,
              lineHeight: 1.4,
            }}
          >
            Websites from R399 once-off — yours outright, no monthly fee.
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 64, height: 5, background: "#7c3aed", borderRadius: 999 }} />
          <div style={{ display: "flex", fontSize: 25, color: "#94a3b8" }}>
            clearsitestudios.co.za
          </div>
        </div>
      </div>
    ),
    size
  );
}
