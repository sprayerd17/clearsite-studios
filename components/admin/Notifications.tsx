"use client";

import { useState } from "react";
import { Bell, X } from "@/components/icons";
import { Button, Card, CardBody, CardHeader } from "./ui";
import { usePushNotifications, type PushState } from "./usePushNotifications";

const WHAT = "for every new quote request, and when a client accepts a quote, uploads proof of payment or finishes adding their content";

function InstallHelp() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      On iPhone, notifications only work once the admin is on your home screen: tap{" "}
      <strong className="font-medium text-ink">Share</strong> →{" "}
      <strong className="font-medium text-ink">Add to Home Screen</strong>, open ClearSite Admin from there, and come back to
      this page.
    </p>
  );
}

function StateHelp({ state }: { state: PushState }) {
  if (state === "loading") return <p className="text-sm text-muted">Checking…</p>;
  if (state === "needs-install") return <InstallHelp />;
  if (state === "unsupported")
    return (
      <p className="text-sm leading-relaxed text-muted">
        This browser can&apos;t show notifications. On Android, open the admin in <strong className="font-medium text-ink">Chrome</strong>;
        on iPhone, add it to your home screen first.
      </p>
    );
  if (state === "blocked")
    return (
      <p className="text-sm leading-relaxed text-muted">
        Notifications are blocked for this site. Open the site settings (the icon next to the web address), allow{" "}
        <strong className="font-medium text-ink">Notifications</strong>, then reload this page.
      </p>
    );
  return null;
}

/** Settings card to turn notifications on/off for this phone and send a test. */
export function NotificationsCard() {
  const { state, enable, disable, test } = usePushNotifications();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(fn: () => Promise<string | null | void>) {
    setBusy(true);
    setMessage("");
    try {
      const result = await fn();
      if (result) setMessage(result);
    } catch (e) {
      console.error(e);
      setMessage("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader eyebrow="Alerts" title="Notifications on this phone" subtitle={`Get a notification ${WHAT}.`} />
      <CardBody className="space-y-3">
        <StateHelp state={state} />
        {state === "off" && (
          <Button variant="lime" onClick={() => run(enable)} pending={busy}>
            <Bell size={16} /> Turn on notifications
          </Button>
        )}
        {state === "on" && (
          <>
            <p className="text-sm font-medium text-emerald-700">Notifications are on for this phone.</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => run(test)} disabled={busy}>
                Send a test
              </Button>
              <Button size="sm" variant="quiet" onClick={() => run(disable)} disabled={busy}>
                Turn off
              </Button>
            </div>
          </>
        )}
        {message && <p className="text-sm text-ink">{message}</p>}
      </CardBody>
    </Card>
  );
}

const DISMISS_KEY = "clearsite-notify-prompt-dismissed";

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/** A nudge on the leads page until notifications are turned on for this phone. */
export function NotificationPrompt() {
  const { state, enable } = usePushNotifications();
  const [dismissed, setDismissed] = useState(wasDismissed);
  const [message, setMessage] = useState("");

  if ((state !== "off" && state !== "needs-install") || dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-lime/60 bg-lime-soft/50 px-4 py-3.5">
      <Bell size={18} className="mt-0.5 shrink-0 text-ink" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <p className="text-sm text-ink">Get a notification on this phone {WHAT}.</p>
        {state === "needs-install" ? (
          <InstallHelp />
        ) : (
          <Button size="sm" variant="ink" onClick={async () => setMessage((await enable()) ?? "")}>
            Turn on notifications
          </Button>
        )}
        {message && <p className="text-sm text-ink">{message}</p>}
      </div>
      <button onClick={dismiss} className="-mr-1 rounded-full p-1 text-muted hover:text-ink" aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}
