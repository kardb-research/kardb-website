
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const EMAIL_STORAGE_KEY = "kardb_admin_local_emails";

const DEFAULT_EMAILS = [
  "deepsmrit@gmail.com",
  "adhyapanofstockmarket@gmail.com",
  "kaavyaaaliya@gmail.com",
  "shyams1953@gmail.com",
  "deepakbhandari10@rediffmail.com",
];

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function loadLocalEmails() {
    if (window.location.hostname !== "localhost") return;

    try {
      const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
      const parsed: string[] = stored ? JSON.parse(stored) : [];

      const emails = Array.from(
        new Set([...DEFAULT_EMAILS, ...parsed])
      );

      setSavedEmails(emails);
      localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
    } catch {
      setSavedEmails(DEFAULT_EMAILS);
    }
  }

  function saveLocalEmail(value: string) {
    if (window.location.hostname !== "localhost") return;

    try {
      const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
      const parsed: string[] = stored ? JSON.parse(stored) : [];

      const emails = Array.from(
        new Set([...DEFAULT_EMAILS, ...parsed, value.trim().toLowerCase()])
      );

      localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
      setSavedEmails(emails);
    } catch {
      // Login should continue if local storage is unavailable.
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError || !authData.user) {
        setError(authError?.message || "Unable to sign in.");
        return;
      }

      saveLocalEmail(email);

      const { data, error: accessError } = await supabase.rpc(
        "get_trial_access"
      );

      if (accessError || !data || data.length === 0) {
        setError(
          "We could not verify your account access. Please try again later."
        );
        return;
      }

      const access = data[0];

      // Administrator access.
      if (access.is_admin === true) {
        router.replace("/admin");
        router.refresh();
        return;
      }

      // Active paid subscribers.
      if (access.has_active_subscription === true) {
        router.replace("/account/dashboard");
        router.refresh();
        return;
      }

      // Users with an active 7-day trial.
      if (access.is_trial_active === true) {
        router.replace("/account/dashboard");
        router.refresh();
        return;
      }

      // Expired trial or account without trial access.
      router.replace("/account/subscription");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const showExpiredMessage =
    searchParams.get("reason") === "subscription-expired";

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
        <h1 className="text-3xl font-black">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-400">
          Sign in to access your KARDB account.
        </p>

        {showExpiredMessage && (
          <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <h2 className="font-bold text-amber-300">
              Subscription or Trial Access Required
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Please sign in to check your KARDB access status and available
              subscription options.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-slate-300">
            Email
            <input
              required
              type="email"
              list="kardb-saved-emails"
              autoComplete="email"
              onFocus={loadLocalEmails}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />

            <datalist id="kardb-saved-emails">
              {savedEmails.map((savedEmail) => (
                <option key={savedEmail} value={savedEmail} />
              ))}
            </datalist>
          </label>

          <label className="block text-sm text-slate-300">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              placeholder="Enter your password"
            />
          </label>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to KARDB?{" "}
          <Link className="text-cyan-400" href="/account/register">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
