import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

type Indicator = {
  id: string;
  indicator_code: string;
  indicator_name: string;
  category: string;
  unit: string;
  frequency: string;
};

type Observation = {
  id: string;
  indicator_id: string;
  period_start: string;
  period_end: string;
  period_label: string;
  value: number;
  publication_date: string | null;
  source: string | null;
};

const CATEGORY_ORDER = [
  "GDP Growth",
  "Inflation",
  "Forex Reserves",
  "Fiscal Deficit",
  "Monetary Policy",
  "Banking Credit & Deposit",
  "GST",
  "Unemployment Rate",
];

function isApprovedIndicator(indicator: Indicator) {
  const code = indicator.indicator_code.toUpperCase();
  const name = indicator.indicator_name.toLowerCase();
  const category = indicator.category.toLowerCase();

  // SLR is intentionally hidden from the customer-facing dashboard.
  if (code === "SLR") return false;

  // Headline CPI only. Do not show food, rural, urban or subgroup inflation.
  if (category === "inflation") {
    return (
      code === "CPI_INFLATION" ||
      name === "cpi inflation" ||
      name === "consumer price index inflation" ||
      name === "headline cpi inflation"
    );
  }

  const approvedCategories = [
    "gdp growth",
    "economic growth",
    "monetary policy",
    "banking credit & deposit",
    "external sector",
    "forex reserves",
    "fiscal deficit",
    "gst",
    "unemployment rate",
  ];

  return approvedCategories.includes(category);
}

function formatValue(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: string | null) {
  if (!date) return "Not available";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function TrendChart({
  observations,
  unit,
  title = "Monthly / Quarterly Trend",
}: {
  observations: Observation[];
  unit: string;
  title?: string;
}) {
  const points = [...observations].reverse();
  if (points.length < 2) return null;

  const width = 720;
  const height = 210;
  const left = 42;
  const right = 18;
  const top = 16;
  const bottom = 42;
  const values = points.map((item) => Number(item.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const x = (index: number) =>
    left + (index * (width - left - right)) / Math.max(points.length - 1, 1);
  const y = (value: number) =>
    top + ((max - value) / spread) * (height - top - bottom);
  const polyline = points
    .map((item, index) => `${x(index)},${y(Number(item.value))}`)
    .join(" ");

  return (
    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-200">
          {title}
        </h4>
        <span className="text-xs text-slate-500">{unit}</span>
      </div>
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Trend chart showing ${points.length} observations`}
          className="h-auto w-full"
        >
          <line
            x1={left}
            y1={top}
            x2={left}
            y2={height - bottom}
            stroke="#334155"
            strokeWidth="1"
          />
          <line
            x1={left}
            y1={height - bottom}
            x2={width - right}
            y2={height - bottom}
            stroke="#334155"
            strokeWidth="1"
          />
          <polyline
            points={polyline}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((item, index) => (
            <g key={item.id}>
              <circle
                cx={x(index)}
                cy={y(Number(item.value))}
                r="4"
                fill="#22d3ee"
              />
              <text
                x={x(index)}
                y={height - 17}
                fill="#94a3b8"
                fontSize="11"
                textAnchor="middle"
              >
                {item.period_label.length > 10
                  ? item.period_label.slice(0, 3)
                  : item.period_label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>{points[0].period_label}</span>
        <span>{points[points.length - 1].period_label}</span>
      </div>
    </div>
  );
}

export default async function EconomicIntelligencePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/account/login");

  const { data: accessData, error: accessError } =
    await supabase.rpc("get_trial_access");

  if (accessError || !accessData?.length) {
    redirect("/account/login?reason=verification");
  }

  const access = accessData[0];
  const isAdmin = access.is_admin === true;
  const hasActiveSubscription = access.has_active_subscription === true;
  const isTrialActive = access.is_trial_active === true;

  if (!isAdmin && !hasActiveSubscription && !isTrialActive) {
    redirect("/account/subscription");
  }

  const { data: indicators, error: indicatorError } = await supabase
    .from("economic_indicators")
    .select("id, indicator_code, indicator_name, category, unit, frequency")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("indicator_name", { ascending: true });

  if (indicatorError) throw new Error("Unable to load economic indicators.");

  const indicatorList = ((indicators || []) as Indicator[]).filter(
    isApprovedIndicator
  );

  const observationResults = await Promise.all(
    indicatorList.map(async (indicator) => {
      const { data, error } = await supabase
        .from("economic_indicator_observations")
        .select(
          "id, indicator_id, period_start, period_end, period_label, value, publication_date, source"
        )
        .eq("indicator_id", indicator.id)
        .order("period_end", { ascending: false })
        .order("publication_date", { ascending: false })
        .limit(24);

      return {
        indicatorId: indicator.id,
        observations: error ? [] : ((data || []) as Observation[]),
        error: Boolean(error),
      };
    })
  );

  const observationsByIndicator = new Map(
    observationResults.map((result) => [result.indicatorId, result])
  );

  const orderedIndicatorList = [...indicatorList].sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a.category);
    const bIndex = CATEGORY_ORDER.indexOf(b.category);
    const categoryDifference =
      (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);

    if (categoryDifference !== 0) return categoryDifference;
    return a.indicator_name.localeCompare(b.indicator_name);
  });

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <Link
          href="/account/dashboard"
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-cyan-400">
            KARDB ECONOMIC INTELLIGENCE
          </p>
          <h1 className="mt-3 text-3xl font-black">
            Economic Intelligence
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Official economic data, latest available figures and period-wise
            trend charts.
          </p>
        </div>

        {indicatorList.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-slate-300">
              No approved economic indicators are currently available.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {orderedIndicatorList.map((indicator) => {
              const result = observationsByIndicator.get(indicator.id);
              const observations = result?.observations || [];
              const latest = observations[0];
              const previous = observations[1];
              const currentYear = String(new Date().getFullYear());
              // GST currently uses a year-on-year comparison (e.g. Oct 2025 vs Oct 2026),
              // so retain both years instead of filtering to the current calendar year.
              const chartObservations =
                indicator.indicator_code === "GST_COLLECTION"
                  ? observations
                  : observations.filter((item) =>
                      item.period_start.startsWith(`${currentYear}-`)
                    );

              return (
                <article
                  key={indicator.id}
                  className="h-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50"
                >
                  <div className="p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                      {indicator.category}
                    </p>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold">
                          {indicator.indicator_name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {indicator.indicator_code}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          Frequency: {indicator.frequency}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs text-slate-400">
                          Latest Available Value
                        </p>
                        {latest ? (
                          <>
                            <p className="mt-1 text-3xl font-bold text-cyan-400">
                              {formatValue(Number(latest.value))}
                              <span className="ml-1 text-base font-medium">
                                {indicator.unit}
                              </span>
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {latest.period_label}
                            </p>
                          </>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            Data Not Available
                          </p>
                        )}
                      </div>
                    </div>

                    {latest && (
                      <div className="mt-5 grid gap-3 border-t border-slate-800 pt-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-slate-500">Previous Period</p>
                          <p className="mt-1 font-semibold text-slate-200">
                            {previous
                              ? `${formatValue(Number(previous.value))} ${indicator.unit}`
                              : "—"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {previous?.period_label || ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Publication Date</p>
                          <p className="mt-1 font-semibold text-slate-200">
                            {formatDate(latest.publication_date)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Source</p>
                          <p className="mt-1 font-semibold text-slate-200">
                            {latest.source || "Not specified"}
                          </p>
                        </div>
                      </div>
                    )}

                    {result?.error && (
                      <p className="mt-4 text-sm text-amber-400">
                        Observations could not be loaded.
                      </p>
                    )}
                    {!latest && !result?.error && (
                      <p className="mt-4 text-sm text-slate-500">
                        No data available.
                      </p>
                    )}

                    <TrendChart
                      observations={chartObservations}
                      unit={indicator.unit}
                      title={
                        indicator.indicator_code === "GST_COLLECTION"
                          ? "Year-on-Year Comparison"
                          : "Monthly / Quarterly Trend"
                      }
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </PageShell>
  );
}
