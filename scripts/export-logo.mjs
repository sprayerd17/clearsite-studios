import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

// ── 1. 1200×1200 full logo (icon + wordmark) ────────────────────────────────
// viewBox is 0 0 180 36.  Scale to 960 wide (80 % of 1200) → factor 5.333…
// Remaining height: 1200 − (36 × 5.333) ≈ 1200 − 192 = 1008 → pad 504 top/bottom
const logoScale = (1200 * 0.8) / 180; // ≈ 5.333
const logoW = 180 * logoScale;         // 960
const logoH = 36 * logoScale;          // 192
const logoX = (1200 - logoW) / 2;      // 120
const logoY = (1200 - logoH) / 2;      // 504

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
  <rect width="1200" height="1200" fill="#ffffff"/>
  <g transform="translate(${logoX}, ${logoY}) scale(${logoScale})">
    <!-- icon: two overlapping rectangles -->
    <rect x="2" y="6" width="20" height="15" rx="2" fill="#7c3aed" opacity="0.35"/>
    <rect x="8" y="12" width="20" height="15" rx="2" fill="#7c3aed"/>
    <!-- wordmark -->
    <text
      x="36" y="25"
      font-family="Inter, Arial, sans-serif"
      font-size="15"
      font-weight="700"
      fill="#1a1a1a"
      letter-spacing="-0.3"
    >Clearsite<tspan fill="#7c3aed"> Studios</tspan></text>
  </g>
</svg>`;

// ── 2. 512×512 favicon icon mark ────────────────────────────────────────────
// Use the same icon shapes as favicon.svg, but with a clean square viewBox.
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="512" height="512">
  <rect width="32" height="32" rx="7" fill="#1e1b4b"/>
  <rect x="4" y="6" width="16" height="12" rx="2" fill="#7c3aed" opacity="0.45"/>
  <rect x="12" y="13" width="16" height="12" rx="2" fill="#7c3aed"/>
</svg>`;

// Write temp SVGs
const logoSvgPath = path.join(publicDir, "_logo_tmp.svg");
const iconSvgPath = path.join(publicDir, "_icon_tmp.svg");
await fs.writeFile(logoSvgPath, logoSvg);
await fs.writeFile(iconSvgPath, iconSvg);

// Convert with sharp-cli (available via npx)
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

console.log("Exporting clearsite-studios-logo.png (1200×1200)…");
execSync(
  `${npx} sharp-cli -i "${logoSvgPath}" -o "${path.join(publicDir, "clearsite-studios-logo.png")}"`,
  { stdio: "inherit" }
);

console.log("Exporting icon.png (512×512)…");
execSync(
  `${npx} sharp-cli -i "${iconSvgPath}" -o "${path.join(publicDir, "icon.png")}"`,
  { stdio: "inherit" }
);

// Clean up temp files
await fs.unlink(logoSvgPath);
await fs.unlink(iconSvgPath);

// Verify
const verify = async (file, expectedW, expectedH) => {
  const buf = await fs.readFile(file);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const ok = w === expectedW && h === expectedH;
  console.log(`${path.basename(file)}: ${w}×${h} ${ok ? "✓" : "✗ MISMATCH"}`);
};

await verify(path.join(publicDir, "clearsite-studios-logo.png"), 1200, 1200);
await verify(path.join(publicDir, "icon.png"), 512, 512);

console.log("Done.");
