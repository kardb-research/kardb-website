
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/account/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  const now = new Date().toISOString();

  const {
    data: subscription,
    error: subscriptionError,
  } = await supabase
    .from("subscriptions")
    .select("plan_id, expires_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .lte("starts_at", now)
    .gt("expires_at", now)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let plan = null;

  if (subscription && !subscriptionError) {
    const { data } = await supabase
      .from("plans")
      .select("name, report_limit")
      .eq("id", subscription.plan_id)
      .eq("is_active", true)
      .maybeSingle();

    plan = data;
  }

  if (!isAdmin && subscriptionError) {
    redirect("/account/login?reason=verification");
  }

  if (!isAdmin && (!subscription || !plan)) {
    redirect("/account/login?reason=subscription-expired");
  }

  const name =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email ||
    "Subscriber";

  const subscriptionStatus = isAdmin
    ? "Administrator"
    : plan?.name || "Active";

  const subscriptionDetail = isAdmin
    ? "Administrator access"
    : `Active subscription · ${plan?.report_limit} monthly research reports`;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <p className="text-sm text-cyan-400 font-semibold">
            KARDB SUBSCRIBER PORTAL
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Welcome, {name}
          </h1>

          <p className="mt-2 text-slate-400">
            Your KARDB account dashboard.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
           title="Historical Data"
          description="Explore previous monthly research reports included in your subscription."
          href="/account/dashboard/historical"
           />

            <DashboardCard
              title="Research Reports"
              description="Access your entitled company research reports."
              href="/account/dashboard/research"
            />

                       <DashboardCard
              title="Market Brief"
              description="Daily market updates, index movements and market breadth analysis."
              href="/account/dashboard/market-brief"
            />
          
            <DashboardCard
              title="Economic Intelligence"
              description="Weekly economic updates and monthly reviews."
            />
          </div>

          <div className="mt-8 rounded-xl border border-slate-700 p-5">
            <h2 className="text-lg font-bold">Account Information</h2>

            <p className="mt-3 text-sm text-slate-400">
              Email: {profile?.email || user.email}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Subscription: {subscriptionStatus}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {subscriptionDetail}
            </p>

            {subscription && (
              <p className="mt-2 text-sm text-slate-400">
                Valid until:{" "}
                {new Date(subscription.expires_at).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>

          <Link
            href="/account/subscription"
            className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            View Subscription
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
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const cardContent = (
    <>
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{description}</p>

      {href ? (
        <p className="mt-4 text-xs font-semibold text-cyan-400">
          View Reports →
        </p>
      ) : (
        <p className="mt-4 text-xs text-cyan-400">
          Coming soon
        </p>
      )}
    </>
  );

  const className =
    "block rounded-xl border border-slate-700 bg-slate-950/50 p-5 transition hover:border-cyan-400";

  return href ? (
    <Link href={href} className={className}>
      {cardContent}
    </Link>
  ) : (
    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-5">
      {cardContent}
    </div>
  );
}
