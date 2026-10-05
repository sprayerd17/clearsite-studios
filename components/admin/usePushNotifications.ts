"use client";

import { useEffect, useState } from "react";
import { sendTestNotification } from "@/app/admin/actions";
import { removePushSubscription, savePushSubscription } from "@/lib/firebase/data";
import { useAdmin } from "./AdminProvider";

export type PushState = "loading" | "unsupported" | "needs-install" | "blocked" | "off" | "on";

function supported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window &&
    !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  );
}

/** iPhones only allow web notifications for sites added to the home screen. */
function iosNotInstalled(): boolean {
  if (typeof window === "undefined") return false;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return ios && !standalone;
}

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(padded);
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

/** Push notifications for this phone/browser: register the service worker, turn on/off, test. */
export function usePushNotifications() {
  const { user } = useAdmin();
  const [state, setState] = useState<PushState>("loading");
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if (iosNotInstalled()) return setState("needs-install");
    if (!supported()) return setState("unsupported");
    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((reg) => reg.pushManager.getSubscription())
      .then(async (sub) => {
        if (cancelled) return;
        setSubscription(sub);
        if (Notification.permission === "denied") return setState("blocked");
        setState(sub ? "on" : "off");
        // Re-save in case the stored copy was cleaned up.
        if (sub) await savePushSubscription(sub.toJSON(), user.uid).catch(console.error);
      })
      .catch((e) => {
        console.error(e);
        if (!cancelled) setState("unsupported");
      });
    return () => {
      cancelled = true;
    };
  }, [user.uid]);

  async function enable(): Promise<string | null> {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setState(permission === "denied" ? "blocked" : "off");
      return permission === "denied" ? "Notifications are blocked for this site." : null;
    }
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      await savePushSubscription(sub.toJSON(), user.uid);
      setSubscription(sub);
      setState("on");
      return null;
    } catch (e) {
      console.error(e);
      return "This browser couldn't turn on notifications. On Android, open the admin in Chrome and try again.";
    }
  }

  async function disable(): Promise<void> {
    if (subscription) {
      await removePushSubscription(subscription.endpoint).catch(console.error);
      await subscription.unsubscribe().catch(console.error);
    }
    setSubscription(null);
    setState("off");
  }

  async function test(): Promise<string> {
    const result = await sendTestNotification(await user.getIdToken());
    return result.message;
  }

  return { state, enable, disable, test };
}
