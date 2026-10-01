import { ImageResponse } from "next/og";

/**
 * Link-preview card, generated at build time.
 *
 * This is the first thing a prospect sees when the site is pasted into
 * WhatsApp, so it carries the positioning rather than just the logo.
 * Next picks this up by file convention and populates og:image and
 * twitter:image for every route — no manual asset to keep in sync.
 */
export const alt = "ClearSite Studios — websites that win customers, workflows that run the rest";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0b0d";
const LIME = "#c6f24e";

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
          backgroundColor: INK,
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(198,242,78,0.22), transparent 55%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          padding: "68px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row — mark + wordmark, and a pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", position: "relative", width: 44, height: 44 }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  border: "2.5px solid rgba(255,255,255,0.55)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 15,
                  top: 15,
                  width: 29,
                  height: 29,
                  borderRadius: 8,
                  background: LIME,
                }}
              />
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
              Clearsite
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginLeft: 8 }}>Studios</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 999,
              padding: "10px 24px",
            }}
          >
            Websites · Business workflows
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
            }}
          >
            Websites that win customers.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
              marginTop: 4,
            }}
          >
            <span style={{ color: LIME }}>Workflows</span>
            <span style={{ color: "#ffffff", marginLeft: 22 }}>that run the rest.</span>
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "rgba(255,255,255,0.55)", marginTop: 30, lineHeight: 1.4 }}>
            Built by one person, handed over in full — no monthly fee.
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 56, height: 5, background: LIME, borderRadius: 999 }} />
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.45)" }}>clearsitestudios.co.za</div>
        </div>
      </div>
    ),
    size
  );
}
