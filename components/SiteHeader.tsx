
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const links = [
  ["Home", "/"],
  ["Research", "/research"],
  ["Reports", "/reports"],
  ["Methodology", "/methodology"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Regulatory", "/regulatory"],
];

export default async function SiteHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  let hasActiveSubscription = false;
  let userName = "";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", user.id)
      .maybeSingle();

    isAdmin = profile?.role === "admin";
    userName = profile?.full_name || "";

    if (!isAdmin) {
      const now = new Date().toISOString();

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan_id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .lte("starts_at", now)
        .gt("expires_at", now)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (subscription) {
        const { data: plan } = await supabase
          .from("plans")
          .select("id")
          .eq("id", subscription.plan_id)
          .eq("is_active", true)
          .maybeSingle();

        hasActiveSubscription = !!plan;
      }
    }
  }

  const canAccessDashboard = !!user && (isAdmin || hasActiveSubscription);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-white">
          KARDB<span className="text-cyan-400">.</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-sm text-slate-300 transition hover:text-cyan-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {canAccessDashboard ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="text-sm font-semibold text-cyan-400">
                  Admin
                </Link>
              )}

              <Link
                href="/account/dashboard"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Dashboard
              </Link>

              {userName && (
                <span className="whitespace-nowrap text-sm font-semibold text-cyan-400">
                  {userName}
                </span>
              )}

              <form action="/account/logout" method="POST">
                <button
                  type="submit"
                  className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Logout
                </button>
              </form>
            </>
          ) : user ? (
            <Link
              href="/account/subscription"
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950"
            >
              Renew Subscription
            </Link>
          ) : (
            <>
              <Link
                href="/account/login"
                className="hidden text-sm text-slate-300 transition hover:text-white sm:block"
              >
                Login
              </Link>

              <Link
                href="/account/register"
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border-t border-slate-800/60 lg:hidden">
        <nav className="mx-auto flex min-w-max items-center gap-5 px-6 py-3">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-slate-300 hover:text-cyan-400"
            >
              {label}
            </Link>
          ))}

          {canAccessDashboard && (
            <>
              <Link href="/account/dashboard" className="text-sm text-cyan-400">
                Dashboard
              </Link>

              {isAdmin && (
                <Link href="/admin" className="text-sm font-semibold text-cyan-400">
                  Admin
                </Link>
              )}
            </>
          )}

          {user && !canAccessDashboard && (
            <Link href="/account/subscription" className="text-sm text-cyan-400">
              Renew Subscription
            </Link>
          )}

          {!user && (
            <Link href="/account/login" className="text-sm text-cyan-400">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
