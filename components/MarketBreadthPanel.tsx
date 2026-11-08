
"use client";

import { useCallback, useEffect, useState } from "react";

type BreadthData = {
  totalStocks: number;
  evaluatedStocks: number;
  advances: number;
  declines: number;
  unchanged: number;
  missingData: number;
  netAdvances: number;
  advanceDeclineRatio: number | null;
  dataCoveragePercent: number;
  isComplete: boolean;
  marketHealthScore: number | null;
};

type ApiResponse = {
  success?: boolean;
  trade_date?: string;
  snapshot_date?: string;
  market_breadth?: BreadthData;
  error?: string;
};

function MetricCard({
  label,
  value,
  detail,
  color = "text-white",
}: {
  label: string;
  value: string | number;
  detail?: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-black ${color}`}>{value}</p>
      {detail && (
        <p className="mt-2 text-xs text-slate-500">{detail}</p>
      )}
    </div>
  );
}

export default function MarketBreadthPanel() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBreadth = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/market-breadth",
        { cache: "no-store" }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success || !result.market_breadth) {
        throw new Error(result.error || "Unable to load market breadth.");
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to market breadth API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBreadth();
  }, [fetchBreadth]);

  const breadth = data?.market_breadth;

  const formatRatio = (ratio: number | null) =>
    ratio === null ? "—" : ratio.toFixed(2);

  return (
    <section className="mt-10 rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            KARDB Market Intelligence
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            NIFTY 500 Market Breadth
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Daily advance, decline and market participation analysis.
          </p>
          {data?.trade_date && (
            <p className="mt-2 text-xs text-slate-500">
              Trading date: {data.trade_date}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => void fetchBreadth()}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      {loading && !breadth && (
        <p className="py-8 text-center text-sm text-slate-400">
          Loading NIFTY 500 market data...
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {breadth && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Market Health Score"
              value={`${breadth.marketHealthScore ?? "—"}/100`}
              detail="Based on advances and unchanged stocks"
              color="text-cyan-400"
            />
            <MetricCard
              label="Advance / Decline Ratio"
              value={formatRatio(breadth.advanceDeclineRatio)}
              detail="Advances divided by declines"
              color="text-emerald-400"
            />
            <MetricCard
              label="Net Advances"
              value={breadth.netAdvances > 0 ? `+${breadth.netAdvances}` : breadth.netAdvances}
              detail="Advances minus declines"
              color={breadth.netAdvances >= 0 ? "text-emerald-400" : "text-red-400"}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Advances"
              value={breadth.advances}
              color="text-emerald-400"
            />
            <MetricCard
              label="Declines"
              value={breadth.declines}
              color="text-red-400"
            />
            <MetricCard
              label="Unchanged"
              value={breadth.unchanged}
              color="text-slate-300"
            />
            <MetricCard
              label="Data Coverage"
              value={`${breadth.dataCoveragePercent.toFixed(1)}%`}
              detail={`${breadth.evaluatedStocks}/${breadth.totalStocks} evaluated`}
              color="text-cyan-400"
            />
          </div>

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/50 p-5">
            <div className="mb-3 flex justify-between text-sm">
              <span className="font-semibold text-white">
                Market Participation
              </span>
              <span className="text-slate-400">
                {breadth.totalStocks} stocks
              </span>
            </div>

            <div className="flex h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="bg-emerald-500"
                style={{
                  width: `${(breadth.advances / breadth.totalStocks) * 100}%`,
                }}
              />
              <div
                className="bg-red-500"
                style={{
                  width: `${(breadth.declines / breadth.totalStocks) * 100}%`,
                }}
              />
              <div
                className="bg-slate-400"
                style={{
                  width: `${(breadth.unchanged / breadth.totalStocks) * 100}%`,
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
              <span>● Advances</span>
              <span>● Declines</span>
              <span>● Unchanged</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>
              {breadth.isComplete
                ? "All available constituent data evaluated."
                : `${breadth.missingData} stocks have missing data.`}
            </span>
            <span>
              {breadth.isComplete ? "Complete dataset" : "Partial dataset"}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
