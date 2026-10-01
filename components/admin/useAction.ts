"use client";

import { useCallback, useRef, useState } from "react";

/** Turns Firebase and network errors into something worth showing on a phone. */
export function friendlyError(e: unknown): string {
  const code = typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : "";
  const message = e instanceof Error ? e.message : "";

  switch (code) {
    case "permission-denied":
    case "storage/unauthorized":
      return "Permission denied. Make sure you're signed in with an admin account.";
    case "unauthenticated":
      return "You've been signed out. Sign in again and retry.";
    case "unavailable":
    case "deadline-exceeded":
    case "auth/network-request-failed":
      return "Couldn't reach the server. Check your connection and try again.";
    case "aborted":
    case "failed-precondition":
      return "Something changed while saving. Please try again.";
    case "not-found":
      return "This record no longer exists.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return "That email and password don't match. Try again.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
  }
  if (message === "Lead not found") return "This lead no longer exists — it may have been deleted.";
  if (message && !code) return message;
  return "That didn't save. Check your connection and try again.";
}

/**
 * Runs async writes with a pending flag and a visible error instead of failing
 * silently. `run` resolves to true on success. Pass a key to tell several
 * buttons in one card apart (`pending("send")`).
 */
export function useAction() {
  const [running, setRunning] = useState<string | null>(null);
  const [failed, setFailed] = useState<{ key: string; message: string } | null>(null);
  const inFlight = useRef(false);

  const run = useCallback(async (fn: () => Promise<unknown>, key = "default"): Promise<boolean> => {
    if (inFlight.current) return false;
    inFlight.current = true;
    setRunning(key);
    setFailed(null);
    try {
      await fn();
      return true;
    } catch (e) {
      console.error(e);
      setFailed({ key, message: friendlyError(e) });
      return false;
    } finally {
      inFlight.current = false;
      setRunning(null);
    }
  }, []);

  const pending = useCallback((key = "default") => running === key, [running]);
  /** The last error, but only if it came from this key. */
  const errorFor = useCallback((key = "default") => (failed?.key === key ? failed.message : ""), [failed]);
  /** Shows a validation message as if the action had failed. */
  const fail = useCallback((message: string, key = "default") => setFailed({ key, message }), []);
  const clearError = useCallback(() => setFailed(null), []);

  return { busy: running !== null, pending, error: failed?.message ?? "", errorFor, fail, clearError, run };
}

/** "Saved" flash for a couple of seconds after a successful save. */
export function useFlash(ms = 2500) {
  const [on, setOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flash = useCallback(() => {
    setOn(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(false), ms);
  }, [ms]);
  return [on, flash] as const;
}
