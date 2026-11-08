
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

export default async function ResearchPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/account/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  if (!isAdmin) {
    const now = new Date().toISOString();

    const { data: subscription, error: subscriptionError } =
      await supabase
        .from("subscriptions")
        .select("plan_id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .lte("starts_at", now)
        .gt("expires_at", now)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (subscriptionError) {
      redirect("/account/login?reason=verification");
    }

    if (!subscription) {
      redirect("/account/login?reason=subscription-expired");
    }

    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("id")
      .eq("id", subscription.plan_id)
      .eq("is_active", true)
      .maybeSingle();

    if (planError) {
      redirect("/account/login?reason=verification");
    }

    if (!plan) {
      redirect("/account/login?reason=subscription-expired");
    }
  }

  // Get current month in Indian Standard Time.
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;

  const currentMonthStart = `${year}-${month}-01`;

  // Fetch only the current month's published batch.
  const { data: reports, error } = await supabase
    .from("research_reports")
    .select(`
      id,
      company_name,
      report_title,
      sequence_number,
      published_at,
      monthly_batches!inner (
        title,
        batch_month
      )
    `)
    .eq("status", "published")
    .eq("monthly_batches.batch_month", currentMonthStart)
    .order("published_at", { ascending: false });

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
          KARDB RESEARCH
        </p>

        <h1 className="mt-4 text-4xl font-black">
          Current Research Reports
        </h1>

        <p className="mt-3 text-slate-400">
          Published company research reports for the current month,
          available under your subscription.
        </p>

        {error ? (
          <div className="mt-10 rounded-xl border border-red-500/40 p-6">
            <p className="text-red-400">
              Unable to load research reports. Please try again later.
            </p>
          </div>
        ) : reports && reports.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-xl border border-slate-700 bg-slate-900/50 p-6"
              >
                <p className="text-xs font-semibold text-cyan-400">
                  REPORT #{report.sequence_number}
                </p>

                <h2 className="mt-3 text-xl font-bold">
                  {report.company_name}
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  {report.report_title}
                </p>

                <p className="mt-4 text-xs text-slate-500">
                  Published:{" "}
                  {report.published_at
                    ? new Date(report.published_at).toLocaleDateString("en-IN")
                    : "Date unavailable"}
                </p>

                <a
                  href={`/api/account/reports/view?report_id=${report.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900/50 p-8">
            <h2 className="text-xl font-bold">
              No current reports available yet
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Current month research reports will appear here once published.
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
