/**
 * Regenerates the brand image assets from app/icon.svg:
 *   public/icon.png (512), public/apple-icon.png (180), public/favicon.ico (16/32/48),
 *   public/favicon.svg, and public/clearsite-studios-logo.{png,webp} (1200×1200).
 *
 * Run: node scripts/export-logo.mjs
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const INK = "#0a0b0d";
const LIME = "#c6f24e";

const svg = await fs.readFile(path.join(root, "app", "icon.svg"));
await fs.writeFile(path.join(publicDir, "favicon.svg"), svg);

// iOS rounds the apple icon itself, so it gets square corners.
const appleSvg = Buffer.from(svg.toString().replace(`rx="8" fill="${INK}"`, `rx="0" fill="${INK}"`));

await sharp(svg, { density: 1200 }).resize(512, 512).png().toFile(path.join(publicDir, "icon.png"));
await sharp(appleSvg, { density: 1200 }).resize(180, 180).png().toFile(path.join(publicDir, "apple-icon.png"));

// favicon.ico — an ICO container holding PNG images.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(svg, { density: 600 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
const dir = Buffer.alloc(16 * sizes.length);
let offset = 6 + dir.length;
sizes.forEach((s, i) => {
  const b = i * 16;
  dir.writeUInt8(s, b);
  dir.writeUInt8(s, b + 1);
  dir.writeUInt16LE(1, b + 4);
  dir.writeUInt16LE(32, b + 6);
  dir.writeUInt32LE(pngs[i].length, b + 8);
  dir.writeUInt32LE(offset, b + 12);
  offset += pngs[i].length;
});
await fs.writeFile(path.join(publicDir, "favicon.ico"), Buffer.concat([header, dir, ...pngs]));

// Full logo: mark + wordmark on paper.
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" xml:space="preserve">
  <rect width="1200" height="1200" fill="#f5f5f0"/>
  <g transform="translate(240 540) scale(4.2)">
    <rect x="1.5" y="1.5" width="16" height="16" rx="4.5" fill="none" stroke="rgba(10,11,13,0.45)" stroke-width="1.6"/>
    <rect x="9.5" y="9.5" width="17" height="17" rx="4.5" fill="${LIME}"/>
  </g>
  <text x="390" y="640" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="700" fill="${INK}" letter-spacing="-3">Clearsite<tspan font-weight="400" fill="#5c6169"> Studios</tspan></text>
</svg>`;
await sharp(Buffer.from(logo)).png().toFile(path.join(publicDir, "clearsite-studios-logo.png"));
await sharp(Buffer.from(logo)).webp({ quality: 90 }).toFile(path.join(publicDir, "clearsite-studios-logo.webp"));

console.log("Brand assets exported.");
