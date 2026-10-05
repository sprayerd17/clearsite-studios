import "server-only";
import webpush, { WebPushError } from "web-push";
import { adminDb } from "@/lib/firebase/admin";

export interface AdminNotification {
  title: string;
  body: string;
  /** Page to open when the notification is tapped, e.g. /admin/leads/abc. */
  url: string;
  /** Notifications with the same tag replace each other instead of stacking. */
  tag?: string;
}

let configured = false;

function configure(): boolean {
  if (configured) return true;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:clearsitestudios@outlook.com", publicKey, privateKey);
  configured = true;
  return true;
}

/**
 * Sends a push notification to every phone the admin turned notifications on for
 * (Admin → Settings). Never throws: a failed notification must not undo what the
 * client just did. Phones that turned notifications off are cleaned up.
 */
export async function notifyAdmins(notification: AdminNotification): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;
  try {
    if (!configure()) return { sent, failed };
    const subs = await adminDb().collection("pushSubscriptions").get();
    const payload = JSON.stringify(notification);
    await Promise.all(
      subs.docs.map(async (doc) => {
        const { endpoint, keys } = doc.data() as { endpoint: string; keys: { p256dh: string; auth: string } };
        try {
          await webpush.sendNotification({ endpoint, keys }, payload, { TTL: 60 * 60 * 24, urgency: "high" });
          sent++;
        } catch (e) {
          failed++;
          if (e instanceof WebPushError && (e.statusCode === 404 || e.statusCode === 410)) {
            await doc.ref.delete();
          } else {
            console.error("[push] notification failed", e);
          }
        }
      }),
    );
  } catch (e) {
    console.error("[push] notifyAdmins failed", e);
  }
  return { sent, failed };
}
