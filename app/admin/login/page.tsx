"use client";

import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import { ArrowRight, Check } from "@/components/icons";
import { Button, ErrorText, Field, Input } from "@/components/admin/ui";
import { friendlyError } from "@/components/admin/useAction";
import { fb } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(fb().auth, (user) => {
        if (user) router.replace("/admin");
      }),
    [router],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!email.trim() || !password) return setError("Enter your email and password.");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(fb().auth, email.trim(), password);
      router.replace("/admin");
    } catch (err) {
      console.error(err);
      setError(friendlyError(err));
      setBusy(false);
    }
  }

  async function onReset() {
    setError("");
    setInfo("");
    if (!email.trim()) return setError("Enter your email address first, then tap “Forgot password?”.");
    try {
      await sendPasswordResetEmail(fb().auth, email.trim());
      setInfo("If that email has an account, a reset link is on its way.");
    } catch (err) {
      setError(friendlyError(err));
    }
  }

  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-ink px-4 py-12">
      <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo tone="light" />
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white p-6 shadow-frame sm:p-8" noValidate>
          <p className="eyebrow">Studio admin</p>
          <h1 className="mt-3 text-2xl tracking-[-0.035em]">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted">Quotes, projects and payments.</p>

          <div className="mt-6 space-y-4">
            <Field label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field label="Password" htmlFor="password">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <ErrorText>{error}</ErrorText>
            {info && (
              <p className="flex items-start gap-2 rounded-xl bg-lime-soft/70 px-3.5 py-2.5 text-sm text-ink">
                <Check size={16} className="mt-0.5 shrink-0" />
                {info}
              </p>
            )}

            <Button type="submit" variant="ink" className="w-full" pending={busy}>
              {busy ? "Signing in…" : "Sign in"}
              {!busy && <ArrowRight size={17} className="btn-arrow" />}
            </Button>
            <button
              type="button"
              onClick={onReset}
              className="w-full py-1 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
