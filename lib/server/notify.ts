import "server-only";
import nodemailer from "nodemailer";
import { briefSummary } from "@/lib/quote/brief";
import { DEFAULT_SETTINGS, SITE_URL } from "@/lib/quote/defaults";
import { displayPhone } from "@/lib/quote/phone";
import type { Brief, Contact } from "@/lib/quote/types";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqolnaq";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Emails the studio. Uses the same SMTP_* variables as the old lead emails.
 * Never throws — a failed notification must not fail the client's request.
 */
export async function notifyStudio(subject: string, lines: { label: string; value: string }[], link?: string) {
  const to = process.env.NOTIFY_EMAIL || DEFAULT_SETTINGS.notifyEmail;
  if (!smtpConfigured()) {
    console.info(`[notify] SMTP not configured — skipped "${subject}"`);
    return;
  }
  const rows = lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 12px;color:#5c6169;font-size:13px;vertical-align:top;white-space:nowrap">${escape(l.label)}</td><td style="padding:8px 12px;color:#0a0b0d;font-size:14px">${escape(l.value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:#0a0b0d;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#c6f24e">ClearSite Studios</div>
        <div style="font-size:18px;font-weight:bold;margin-top:6px">${escape(subject)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f5f5f0">${rows}</table>
      ${link ? `<div style="padding:20px 24px;background:#f5f5f0;border-radius:0 0 12px 12px"><a href="${link}" style="background:#c6f24e;color:#0a0b0d;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:bold">Open in admin</a></div>` : ""}
    </div>`;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
    await transporter.sendMail({
      from: `"ClearSite Quotes" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: lines.map((l) => `${l.label}: ${l.value}`).join("\n") + (link ? `\n\n${link}` : ""),
    });
  } catch (e) {
    console.error("[notify] email failed", e);
  }
}

export function contactLines(contact: Contact): { label: string; value: string }[] {
  return [
    { label: "Name", value: contact.name },
    { label: "Business", value: contact.business || "—" },
    { label: "WhatsApp", value: displayPhone(contact.phone) },
    { label: "Email", value: contact.email || "—" },
    { label: "Prefers", value: contact.preferred },
  ];
}

export async function notifyNewLead(number: number, leadId: string, contact: Contact, brief: Brief) {
  await notifyStudio(
    `New quote request #${number} — ${contact.business || contact.name}`,
    [...contactLines(contact), ...briefSummary(brief)],
    `${SITE_URL}/admin/leads/${leadId}`,
  );
}

/**
 * Used before Firebase is set up: sends the brief to the existing Formspree
 * form so requests still reach the inbox. Returns false if that fails too.
 */
export async function sendToFormspree(contact: Contact, brief: Brief): Promise<boolean> {
  const fields: Record<string, string> = {};
  for (const l of [...contactLines(contact), ...briefSummary(brief)]) fields[l.label] = l.value;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: `Quote request — ${contact.business || contact.name}`, ...fields }),
    });
    return res.ok;
  } catch (e) {
    console.error("[formspree] failed", e);
    return false;
  }
}
