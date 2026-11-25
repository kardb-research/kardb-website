
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (authError || !authData.user) {
        setError(
          "Unable to sign in. Please check your credentials and try again."
        );
        return;
      }

      const { data, error: accessError } = await supabase.rpc(
        "get_trial_access"
      );

      if (
        accessError ||
        !Array.isArray(data) ||
        data.length === 0
      ) {
        await supabase.auth.signOut();
        setError(
          "We could not verify your account access. Please try again later."
        );
        return;
      }

      const access = data[0];

      if (access.is_admin === true) {
        router.replace("/admin");
        router.refresh();
        return;
      }

      if (access.has_active_subscription === true) {
        router.replace("/account/dashboard");
        router.refresh();
        return;
      }

      if (access.is_trial_active === true) {
        router.replace("/account/dashboard");
        router.refresh();
        return;
      }

      router.replace("/account/subscription");
      router.refresh();
    } catch {
      await supabase.auth.signOut();
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
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />
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

          <div className="text-right">
            <Link
              href="/account/forgot-password"
              className="text-sm text-cyan-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
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
