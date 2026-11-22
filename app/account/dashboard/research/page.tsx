
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

  // Get current month in Indian Standard Time.
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;

  const currentMonthStart = `${year}-${month}-01`;

  // Database RLS and can_view_research_report control old report access.
  const { data: reports, error: reportError } = await supabase
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
          Research Reports
        </h1>

        <p className="mt-3 text-slate-400">
          Access eligible monthly research reports according to your subscription entitlement.
        </p>

        {/* SUBSCRIPTION REPORTS SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white">
            Monthly Research Reports
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Published company research reports available under eligible
            subscriptions.
          </p>

          {reportError ? (
            <div className="mt-8 rounded-xl border border-red-500/40 p-6">
              <p className="text-red-400">
                Unable to load research reports. Please try again later.
              </p>
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-slate-700 bg-slate-900/50 p-6"
                >
                  <p className="text-xs font-semibold text-cyan-400">
                    REPORT #{report.sequence_number}
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-white">
                    {report.company_name}
                  </h3>

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
            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900/50 p-8">
              <h3 className="text-xl font-bold text-white">
                {isAdmin
                  ? "No current reports available yet"
                  : "No subscription reports available"}
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                {isAdmin
                  ? "Current month research reports will appear here once published."
                  : "Eligible monthly reports will appear here when your account has access."}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
