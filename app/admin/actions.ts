"use server";

import { verifyAdmin } from "@/lib/firebase/admin";
import { notifyAdmins } from "@/lib/server/push";

/** Sends a test notification to every phone with notifications turned on. Admins only. */
export async function sendTestNotification(idToken: string): Promise<{ ok: boolean; message: string }> {
  if (typeof idToken !== "string" || !(await verifyAdmin(idToken))) {
    return { ok: false, message: "Not allowed." };
  }
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { ok: false, message: "Push notifications aren't set up on the server yet (missing VAPID keys)." };
  }
  const { sent, failed } = await notifyAdmins({
    title: "ClearSite Studios",
    body: "Notifications are working. You'll get one for new quote requests and client responses.",
    url: "/admin",
    tag: "test",
  });
  if (sent > 0) return { ok: true, message: `Test sent to ${sent} device${sent > 1 ? "s" : ""}.` };
  if (failed > 0) return { ok: false, message: "The test couldn't be delivered. Try turning notifications off and on again." };
  return { ok: false, message: "No devices have notifications turned on yet." };
}
