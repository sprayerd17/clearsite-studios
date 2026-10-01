"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fb } from "@/lib/firebase/client";
import { subscribePrices, subscribeSettings } from "@/lib/firebase/data";
import { DEFAULT_SETTINGS } from "@/lib/quote/defaults";
import type { PriceItem, Settings } from "@/lib/quote/types";
import { Button, ErrorText, PageLoader } from "./ui";
import { friendlyError } from "./useAction";

interface AdminContextValue {
  user: User;
  settings: Settings;
  /** False until the saved settings arrive (defaults are used meanwhile). */
  settingsLoaded: boolean;
  /** The whole price list, including inactive items, in list order. */
  prices: PriceItem[];
  pricesLoaded: boolean;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

type AuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "error"; user: User; message: string }
  | { status: "not-admin"; user: User }
  | { status: "admin"; user: User };

export function signOutAdmin(): Promise<void> {
  return signOut(fb().auth);
}

/** Only renders the admin pages for a signed-in user listed in `admins/{uid}`. */
export function AdminProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [prices, setPrices] = useState<PriceItem[] | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(
    () =>
      onAuthStateChanged(fb().auth, async (user) => {
        if (!user) return setAuth({ status: "signed-out" });
        try {
          const adminDoc = await getDoc(doc(fb().db, "admins", user.uid));
          setAuth(adminDoc.exists() ? { status: "admin", user } : { status: "not-admin", user });
        } catch (e) {
          console.error(e);
          setAuth({ status: "error", user, message: friendlyError(e) });
        }
      }),
    [attempt],
  );

  useEffect(() => {
    if (auth.status === "signed-out") router.replace("/admin/login");
  }, [auth.status, router]);

  useEffect(() => {
    if (auth.status !== "admin") return;
    const onError = (e: Error) => {
      console.error(e);
      setLoadError(friendlyError(e));
    };
    const unsubSettings = subscribeSettings(setSettings, onError);
    const unsubPrices = subscribePrices(setPrices, onError);
    return () => {
      unsubSettings();
      unsubPrices();
    };
  }, [auth.status]);

  if (auth.status === "loading" || auth.status === "signed-out") return <PageLoader />;

  if (auth.status === "not-admin" || auth.status === "error") {
    return (
      <div className="mx-auto max-w-md py-16">
        <div className="card rounded-3xl p-6 text-center sm:p-8">
          {auth.status === "not-admin" ? (
            <>
              <h1 className="text-xl font-semibold">No admin access</h1>
              <p className="mt-2 text-sm text-muted">
                <strong className="text-ink">{auth.user.email}</strong> is signed in but isn&apos;t set up as an admin. Ask
                for an <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">admins/{"{uid}"}</code> entry, or
                sign in with a different account.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold">Couldn&apos;t check your access</h1>
              <ErrorText className="mt-3 text-left">{auth.message}</ErrorText>
            </>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {auth.status === "error" && (
              <Button
                variant="ink"
                size="sm"
                onClick={() => {
                  setAuth({ status: "loading" });
                  setAttempt((n) => n + 1);
                }}
              >
                Try again
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => signOutAdmin()}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        user: auth.user,
        settings: settings ?? DEFAULT_SETTINGS,
        settingsLoaded: settings !== null,
        prices: prices ?? [],
        pricesLoaded: prices !== null,
      }}
    >
      {loadError && <ErrorText className="mb-4">{loadError}</ErrorText>}
      {children}
    </AdminContext.Provider>
  );
}
