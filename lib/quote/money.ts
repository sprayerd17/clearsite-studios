import type { Cents } from "./types";

const amount = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** R1,999.00 */
export function formatRand(cents: Cents): string {
  return `R${amount.format(cents / 100)}`;
}

/** Parses what someone types into a price box ("350", "R 1 250,50", "1,250.50") into cents. */
export function parseRand(input: string): Cents | null {
  let s = input.replace(/[Rr\s ]/g, "");
  if (s.includes(",") && s.includes(".")) s = s.replace(/,/g, "");
  else s = s.replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}

/** Cents to a plain editable string, e.g. 35000 -> "350.00". */
export function centsToInput(cents: Cents): string {
  return (cents / 100).toFixed(2);
}
