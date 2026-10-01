import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0b0d",
          900: "#0a0b0d",
          800: "#111317",
          700: "#191c21",
          600: "#23272e",
          500: "#2e333b",
        },
        paper: {
          DEFAULT: "#f5f5f0",
          dim: "#ecece5",
        },
        line: {
          DEFAULT: "#e2e2da",
          strong: "#d2d2c8",
        },
        muted: {
          DEFAULT: "#5c6169",
          light: "#8a8f96",
        },
        lime: {
          DEFAULT: "#c6f24e",
          soft: "#e7fab4",
          deep: "#a5d62a",
          ink: "#3b5200",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        site: "1200px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(10,11,13,0.03), 0 12px 32px -16px rgba(10,11,13,0.14)",
        lift: "0 2px 0 rgba(10,11,13,0.03), 0 24px 48px -20px rgba(10,11,13,0.22)",
        frame: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px -24px rgba(0,0,0,0.65)",
        glow: "0 0 0 1px rgba(198,242,78,0.35), 0 10px 30px -10px rgba(198,242,78,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
