import { SITE_URL } from "@/lib/quote/defaults";
import { formatDate } from "@/lib/quote/leads";
import { fillTemplate, firstName, waLink } from "@/lib/quote/phone";
import type { Lead } from "@/lib/quote/types";

/** "just now", "12m ago", "3h ago", "Yesterday", "4d ago", else a short date. */
export function relativeTime(ms: number, now = Date.now()): string {
  if (!ms) return "";
  const diff = Math.max(0, now - ms);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(ms).toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

export function shortDate(ms: number): string {
  return ms ? formatDate(ms) : "";
}

export function fileSize(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isImage(contentType: string, name = ""): boolean {
  return contentType.startsWith("image/") || /\.(png|jpe?g|gif|webp|avif|heic)$/i.test(name);
}

/** The client's private project page. */
export function clientLink(lead: Pick<Lead, "token">): string {
  const origin = typeof window !== "undefined" ? window.location.origin : SITE_URL;
  return `${origin}/q/${lead.token}`;
}

/** Placeholder values shared by every message template. */
export function messageVars(lead: Lead, extra: Record<string, string> = {}): Record<string, string> {
  return {
    firstName: firstName(lead.contact.name) || "there",
    number: String(lead.number),
    link: clientLink(lead),
    ...extra,
  };
}

/** wa.me link to the client with a template already typed in. */
export function templateLink(lead: Lead, template: string, extra: Record<string, string> = {}): string {
  return waLink(lead.contact.phone, fillTemplate(template, messageVars(lead, extra)));
}

/**
 * Opens a blank tab straight away (inside the tap, so popup blockers allow it)
 * and points it at the real URL once an async save has finished.
 */
export function openAfterSave(): { go: (url: string) => void; cancel: () => void } {
  const win = typeof window !== "undefined" ? window.open("about:blank", "_blank") : null;
  if (win) win.opener = null;
  return {
    go(url) {
      if (win && !win.closed) win.location.href = url;
      else window.open(url, "_blank", "noopener");
    },
    cancel() {
      win?.close();
    },
  };
}
