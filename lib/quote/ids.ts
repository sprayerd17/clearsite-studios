const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  // 256 % 62 bias is negligible for these purposes.
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

/** Short id for items inside a lead (quote lines, payments, files...). */
export function newId(): string {
  return randomString(12);
}

/** Unguessable token for a client's private project link. */
export function newToken(): string {
  return randomString(32);
}

export const TOKEN_PATTERN = /^[A-Za-z0-9]{32}$/;
