// Loads the modular price list from the spreadsheet into Firestore (`prices`).
//
//   npm run prices:import                      local emulator
//   npm run prices:import:prod                 live Firebase project
//   ... -- path/to/file.xlsx                   use a different file
//   ... -- --dry-run                           show what would change, write nothing
//   ... -- --prune                             delete items that aren't in the sheet
//                                              (default: hide them instead)
//
// Each row with an ID becomes the document prices/<ID>, so re-importing updates
// items in place. Price = "Your price", or the suggested price (hours × rate,
// rounded to R10) when "Your price" is blank — exactly like the sheet.
import ExcelJS from "exceljs";
import { getFirestore } from "firebase-admin/firestore";
import { adminApp, usingEmulator } from "./admin-app.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const prune = args.includes("--prune");
const file = args.find((a) => !a.startsWith("--")) ?? "pricing/ClearSite-Price-List.xlsx";

/** Unwraps formula results and rich text into plain values. */
function plain(v) {
  if (v && typeof v === "object") {
    if ("result" in v) return v.result;
    if ("richText" in v) return v.richText.map((t) => t.text).join("");
    if ("text" in v) return v.text;
  }
  return v;
}
const text = (v) => String(plain(v) ?? "").trim();
const num = (v) => {
  const n = plain(v);
  if (n === null || n === undefined || n === "") return null;
  const parsed = typeof n === "number" ? n : Number(String(n).replace(/[R\s,]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
};

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(file);
const ws = wb.getWorksheet("Price list");
if (!ws) {
  console.error(`No "Price list" sheet in ${file}.`);
  process.exit(1);
}

// Header row and hourly rate
let headerRow = 0;
let rate = 0;
ws.eachRow((row, r) => {
  row.eachCell((cell, c) => {
    if (!headerRow && text(cell.value) === "ID" && c === 1) headerRow = r;
    if (text(cell.value).startsWith("Your hourly rate")) rate = num(row.getCell(c + 1).value) ?? 0;
  });
});
if (!headerRow) {
  console.error('Couldn\'t find the header row (a cell "ID" in column A).');
  process.exit(1);
}
const headers = {};
ws.getRow(headerRow).eachCell((cell, c) => (headers[text(cell.value)] = c));
const col = (name) => {
  const key = Object.keys(headers).find((h) => h.startsWith(name));
  if (!key) throw new Error(`Missing column "${name}" in the price list sheet.`);
  return headers[key];
};
const C = {
  id: col("ID"),
  category: col("Category"),
  item: col("Item"),
  description: col("What the client gets"),
  unit: col("Unit"),
  hours: col("Est. hours"),
  yourPrice: col("Your price"),
  rules: col("Auto-add rules"),
  active: col("Active"),
};

const items = [];
const problems = [];
for (let r = headerRow + 1; r <= ws.rowCount; r++) {
  const row = ws.getRow(r);
  const sku = text(row.getCell(C.id).value);
  // The table ends at the first empty row (notes sit below it).
  if (!sku && !text(row.getCell(C.item).value)) break;
  if (!sku) {
    problems.push(`Row ${r}: missing ID`);
    continue;
  }
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(sku)) {
    problems.push(`Row ${r}: ID "${sku}" can only use letters, numbers, - and _`);
    continue;
  }
  const name = text(row.getCell(C.item).value);
  if (!name) {
    problems.push(`Row ${r} (${sku}): no item name`);
    continue;
  }
  const yourPrice = num(row.getCell(C.yourPrice).value);
  const hours = num(row.getCell(C.hours).value) ?? 0;
  const rand = yourPrice ?? Math.round((hours * rate) / 10) * 10;
  items.push({
    sku,
    name,
    description: text(row.getCell(C.description).value),
    category: text(row.getCell(C.category).value),
    unit: text(row.getCell(C.unit).value),
    price: Math.round(rand * 100),
    priceSource: yourPrice === null ? "suggested" : "yours",
    autoAddFor: text(row.getCell(C.rules).value)
      .split(/[;\n]/)
      .map((s) => s.trim())
      .filter(Boolean),
    active: text(row.getCell(C.active).value).toLowerCase() !== "no",
    order: items.length + 1,
  });
}

if (problems.length) {
  console.error("Fix these rows first:\n  " + problems.join("\n  "));
  process.exit(1);
}
const dupes = items.map((i) => i.sku).filter((s, i, all) => all.indexOf(s) !== i);
if (dupes.length) {
  console.error(`Duplicate IDs: ${[...new Set(dupes)].join(", ")}`);
  process.exit(1);
}

const fmt = (cents) => `R${(cents / 100).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;
console.log(`\n${file} — ${items.length} modules (hourly rate R${rate})\n`);
let category = "";
for (const i of items) {
  if (i.category !== category) console.log(`  ${(category = i.category)}`);
  const flag = !i.active ? " [hidden]" : i.priceSource === "suggested" ? " (suggested)" : "";
  console.log(`    ${i.sku.padEnd(8)} ${i.name.padEnd(42).slice(0, 42)} ${fmt(i.price).padStart(9)}${flag}`);
}
const suggested = items.filter((i) => i.priceSource === "suggested" && i.active).length;
if (suggested) console.log(`\n  ${suggested} active item(s) have no "Your price" yet and use the suggested price.`);

if (dryRun) {
  console.log("\nDry run — nothing was written.");
  process.exit(0);
}

const db = getFirestore(adminApp());
const existing = await db.collection("prices").get();
const keep = new Set(items.map((i) => i.sku));
const batch = db.batch();
for (const { priceSource, ...item } of items) batch.set(db.collection("prices").doc(item.sku), item);
let removed = 0;
for (const doc of existing.docs) {
  if (keep.has(doc.id)) continue;
  removed++;
  if (prune) batch.delete(doc.ref);
  else batch.update(doc.ref, { active: false });
}
await batch.commit();
console.log(
  `\nImported ${items.length} modules into ${usingEmulator ? "the local emulator" : "the live project"}.` +
    (removed ? ` ${removed} old item(s) ${prune ? "deleted" : "hidden"}.` : ""),
);
process.exit(0);
