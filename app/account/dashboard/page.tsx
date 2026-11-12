
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";
import TrialReminder from "@/components/TrialReminder";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/account/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    redirect("/account/login?reason=verification");
  }

  const { data: accessData, error: accessError } =
    await supabase.rpc("get_trial_access");

  if (accessError || !accessData?.length) {
    redirect("/account/login?reason=verification");
  }

  const access = accessData[0];

  const isAdmin = access.is_admin === true;
  const hasActiveSubscription =
    access.has_active_subscription === true;
  const isTrialActive = access.is_trial_active === true;

  if (!isAdmin && !hasActiveSubscription && !isTrialActive) {
    redirect("/account/subscription");
  }

  let plan: { name: string; report_limit: number } | null = null;
  let subscriptionExpiresAt: string | null = null;

  if (!isAdmin && hasActiveSubscription) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan_id, expires_at")
      .eq("user_id", user.id)
      .eq("status", "active")
      .lte("starts_at", new Date().toISOString())
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (subscription) {
      subscriptionExpiresAt = subscription.expires_at;

      const { data: planData } = await supabase
        .from("plans")
        .select("name, report_limit")
        .eq("id", subscription.plan_id)
        .eq("is_active", true)
        .maybeSingle();

      plan = planData;
    }
  }

  const name =
    profile.full_name ||
    user.user_metadata?.full_name ||
    user.email ||
    "KARDB User";

  const subscriptionStatus = isAdmin
    ? "Administrator"
    : hasActiveSubscription
      ? plan?.name || "Active Subscription"
      : "7-Day Free Trial";

  const subscriptionDetail = isAdmin
    ? "Administrator access"
    : hasActiveSubscription
      ? `${plan?.report_limit ?? 0} monthly research reports`
      : `${access.trial_days_remaining} day(s) remaining in your free preview`;

  return (
    <PageShell>
      {isTrialActive &&
        !hasActiveSubscription &&
        access.trial_expires_at && (
          <TrialReminder
            trialExpiresAt={access.trial_expires_at}
          />
        )}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <p className="text-sm text-cyan-400 font-semibold">
            KARDB {isTrialActive && !hasActiveSubscription ? "PREVIEW PORTAL" : "SUBSCRIBER PORTAL"}
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Welcome, {name}
          </h1>

          <p className="mt-2 text-slate-400">
            Explore the KARDB Equity Research Platform.
          </p>

          {isTrialActive && !hasActiveSubscription && (
            <div className="mt-6 rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-5">
              <h2 className="font-bold text-cyan-300">
                Your KARDB Free Preview is Active
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                You have {access.trial_days_remaining} day(s) remaining
                to explore Market Brief and Economic Intelligence.
              </p>
              {access.trial_expires_at && (
                <p className="mt-2 text-xs text-slate-400">
                  Preview ends:{" "}
                  {new Date(access.trial_expires_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              )}
              <Link
                href="/account/subscription"
                className="mt-4 inline-block rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950"
              >
                View Subscription Plans
              </Link>
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Market Brief"
              description="Daily market updates, index movements and market breadth analysis."
              href="/account/dashboard/market-brief"
            />

            <DashboardCard
              title="Economic Intelligence"
              description="Weekly economic updates and monthly reviews."
              locked={false}
            />

            <DashboardCard
              title="Research Reports"
              description="Company research reports available according to your subscription entitlement."
              locked={!isAdmin && !hasActiveSubscription}
              href="/account/dashboard/research"
            />

            <DashboardCard
              title="Historical Data"
              description="Explore previous monthly research reports included in your subscription."
              locked={!isAdmin && !hasActiveSubscription}
              href="/account/dashboard/historical"
            />
          </div>

          <div className="mt-8 rounded-xl border border-slate-700 p-5">
            <h2 className="text-lg font-bold">Account Information</h2>

            <p className="mt-3 text-sm text-slate-400">
              Email: {profile.email || user.email}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Access: {subscriptionStatus}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {subscriptionDetail}
            </p>

            {subscriptionExpiresAt && (
              <p className="mt-2 text-sm text-slate-400">
                Valid until:{" "}
                {new Date(subscriptionExpiresAt).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>

          <Link
            href="/account/subscription"
            className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            {hasActiveSubscription ? "View Subscription" : "View Subscription Plans"}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function DashboardCard({
  title,
  description,
  href,
  locked = false,
}: {
  title: string;
  description: string;
  href?: string;
  locked?: boolean;
}) {
  const cardContent = (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{description}</p>

      <p className="mt-4 text-xs font-semibold text-cyan-400">
        {locked ? "Subscriber Access Required" : href ? "Explore →" : "Coming soon"}
      </p>
    </>
  );

  const className =
    "block rounded-xl border border-slate-700 bg-slate-950/50 p-5 transition hover:border-cyan-400";

  if (locked || !href) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-5">
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {cardContent}
    </Link>
  );
}
