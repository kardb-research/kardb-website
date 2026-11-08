
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

export default async function HistoricalDataPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/account/login");
  }

  // Get the current calendar month in India.
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;

  const currentMonthStart = `${year}-${month}-01`;

  // Fetch only reports belonging to previous monthly batches.
  // RLS restricts the results according to subscription eligibility.
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
    .lt("monthly_batches.batch_month", currentMonthStart)
    .order("published_at", { ascending: false });

  // Group reports month-wise.
  const monthGroups = new Map<
    string,
    {
      label: string;
      reports: NonNullable<typeof reports>;
    }
  >();

  for (const report of reports ?? []) {
    const batch = Array.isArray(report.monthly_batches)
      ? report.monthly_batches[0]
      : report.monthly_batches;

    const batchMonth = batch?.batch_month;

    if (!batchMonth) continue;

    if (!monthGroups.has(batchMonth)) {
      const label = new Date(
        `${batchMonth}T00:00:00Z`
      ).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });

      monthGroups.set(batchMonth, {
        label,
        reports: [],
      });
    }

    monthGroups.get(batchMonth)?.reports.push(report);
  }

  const sortedMonthGroups = Array.from(monthGroups.entries()).sort(
    ([monthA], [monthB]) => monthB.localeCompare(monthA)
  );

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
          KARDB RESEARCH ARCHIVE
        </p>

        <h1 className="mt-4 text-4xl font-black">
          Historical Data
        </h1>

        <p className="mt-3 text-slate-400">
          Access previous monthly research reports covered by your subscription.
        </p>

        <Link
          href="/account/dashboard/research"
          className="mt-6 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          View Current Month Reports →
        </Link>

        {error ? (
          <div className="mt-10 rounded-xl border border-red-500/40 p-6">
            <p className="text-red-400">
              Unable to load historical reports. Please try again later.
            </p>
          </div>
        ) : sortedMonthGroups.length > 0 ? (
          <div className="mt-10 space-y-8">
            {sortedMonthGroups.map(([batchMonth, group]) => (
              <section
                key={batchMonth}
                className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6"
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold">
                    {group.label}
                  </h2>

                  <span className="rounded-full border border-cyan-500/40 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {group.reports.length} Reports
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {group.reports.map((report) => (
                    <div
                      key={report.id}
                      className="rounded-xl border border-slate-700 bg-slate-950/50 p-5"
                    >
                      <p className="text-xs font-semibold text-cyan-400">
                        REPORT #{report.sequence_number}
                      </p>

                      <h3 className="mt-3 text-xl font-bold">
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
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900/50 p-8">
            <h2 className="text-xl font-bold">
              No historical reports available
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Previous monthly reports covered by your subscription will appear here automatically.
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
