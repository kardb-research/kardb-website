
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

export default async function SubscriptionPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/account/login");
  }

  const now = new Date().toISOString();

  const { data: subscription, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("plan_id, status, starts_at, expires_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .lte("starts_at", now)
    .gt("expires_at", now)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let plan = null;
  let pageMessage = "";

  if (subscriptionError) {
    pageMessage = "Unable to verify your subscription right now.";
  } else if (subscription) {
    const { data, error } = await supabase
      .from("plans")
      .select("name, report_limit")
      .eq("id", subscription.plan_id)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      pageMessage = "Unable to load your plan details.";
    } else if (data) {
      plan = data;
    } else {
      pageMessage = "Your subscription is awaiting plan verification.";
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
          ACCOUNT
        </p>

        <h1 className="mt-4 text-4xl font-black">My Subscription</h1>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <p className="text-sm text-slate-500">CURRENT PLAN</p>

          <h2 className="mt-2 text-2xl font-bold">
            {plan?.name || "Free"}
          </h2>

          {pageMessage ? (
            <p className="mt-2 text-amber-400">{pageMessage}</p>
          ) : plan ? (
            <>
              <p className="mt-2 text-slate-400">
                Active subscription
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Monthly research report access: {plan.report_limit}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Valid until:{" "}
                {subscription?.expires_at
                  ? new Date(subscription.expires_at).toLocaleDateString("en-IN")
                  : "Not available"}
              </p>
            </>
          ) : (
            <p className="mt-2 text-slate-400">
              No active paid subscription.
            </p>
          )}

          <Link
            href="/pricing"
            className="mt-7 inline-block rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950"
          >
            View Plans
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
