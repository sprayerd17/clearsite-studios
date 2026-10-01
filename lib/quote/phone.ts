/**
 * Normalises a phone number to WhatsApp's format: digits only, with country code.
 * Local South African numbers ("082 123 4567") get the 27 country code.
 */
export function normalizePhone(input: string): string {
  let s = input.trim().replace(/[^\d+]/g, "");
  if (s.startsWith("+")) s = s.slice(1);
  else if (s.startsWith("00")) s = s.slice(2);
  else if (s.startsWith("0")) s = `27${s.slice(1)}`;
  return s.replace(/\D/g, "");
}

export function isValidPhone(normalized: string): boolean {
  return normalized.length >= 10 && normalized.length <= 15;
}

/** Shows SA numbers the way people write them locally: 082 123 4567. */
export function displayPhone(phone: string): string {
  if (phone.startsWith("27") && phone.length === 11) {
    const local = `0${phone.slice(2)}`;
    return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return phone ? `+${phone}` : "";
}

/** Link that opens a WhatsApp chat with the message already typed in. */
export function waLink(phone: string, text?: string): string {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Replaces {placeholders} in a message template. Unknown placeholders are left as-is. */
export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? vars[key] : match));
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}
