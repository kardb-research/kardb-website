
"use client";

import { useState } from "react";

type ImportResult = {
  success?: boolean;
  message?: string;
  error?: string;
  trade_date?: string;
  snapshot_date?: string;
  total_constituents?: number;
  matched_records?: number;
  imported_records?: number;
  missing_count?: number;
  missing_stocks?: (string | { symbol?: string; series?: string })[];
  skipped_count?: number;
  skipped_symbols?: string[];
  invalid_count?: number;
  invalid_records?: string[];
  duplicate_count?: number;
  duplicate_records?: string[];
  source_file?: string;
};

export default function MarketEodImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [tradeDate, setTradeDate] = useState("2026-11-08");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    if (!file) {
      setResult({ error: "Please select the NSE EOD CSV file." });
      return;
    }

    if (!tradeDate) {
      setResult({ error: "Please select the trade date." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setResult({ error: "File size must not exceed 2 MB." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("trade_date", tradeDate);

    setLoading(true);

    try {
      const response = await fetch("/api/admin/market-eod/import", {
        method: "POST",
        body: formData,
      });

      const data: ImportResult = await response.json();

      if (!response.ok) {
        setResult({
          error: data.error || "EOD import failed. Please try again.",
        });
        return;
      }

      setResult(data);
      setFile(null);

      const fileInput = document.getElementById(
        "market-eod-csv"
      ) as HTMLInputElement | null;

      if (fileInput) fileInput.value = "";
    } catch {
      setResult({
        error: "Could not connect to the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Data Management
        </p>

        <h2 className="mt-2 text-xl font-bold text-white">
          NSE EOD Market Data Importer
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Import official NSE daily OHLC and volume data for NIFTY 500 constituents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="market-eod-csv"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            NSE EOD CSV (pd*.csv)
          </label>

          <input
            id="market-eod-csv"
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setResult(null);
            }}
            disabled={loading}
            className="block w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
          />

          <p className="mt-2 text-xs text-slate-500">
            Official NSE pd CSV format only. Maximum file size: 2 MB.
          </p>
        </div>

        <div>
          <label
            htmlFor="market-eod-date"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Trade Date
          </label>

          <input
            id="market-eod-date"
            type="date"
            value={tradeDate}
            onChange={(event) => {
              setTradeDate(event.target.value);
              setResult(null);
            }}
            disabled={loading}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white"
          />

          <p className="mt-2 text-xs text-slate-500">
            Select the trading date represented by the NSE EOD file.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !file || !tradeDate}
          className="w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Importing EOD Data..." : "Import NSE EOD Data"}
        </button>
      </form>

      {result?.error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          {result.error}
        </div>
      )}

      {result?.success && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4"
        >
          <p className="font-semibold text-emerald-400">
            EOD import completed!
          </p>

          <p className="mt-2 text-sm text-slate-300">{result.message}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <p className="text-sm text-slate-300">
              Trade date: {result.trade_date ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Snapshot date: {result.snapshot_date ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Total constituents: {result.total_constituents ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Matched records: {result.matched_records ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Imported records: {result.imported_records ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Missing stocks: {result.missing_count ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Invalid records: {result.invalid_count ?? "—"}
            </p>
            <p className="text-sm text-slate-300">
              Duplicate records: {result.duplicate_count ?? "—"}
            </p>
          </div>

          {(result.missing_stocks?.length ?? 0) > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-amber-400">
                Missing stocks
              </p>
              <p className="mt-1 break-words text-sm text-slate-300">
                {result.missing_stocks
  ?.map((stock) =>
    typeof stock === "string"
      ? stock
      : `${stock.symbol ?? "Unknown"} (${stock.series ?? "—"})`
  )
  .join(", ")}
              </p>
            </div>
          )}

          {(result.invalid_records?.length ?? 0) > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-amber-400">
                Invalid records
              </p>
              <p className="mt-1 break-words text-sm text-slate-300">
                {result.invalid_records?.join(", ")}
              </p>
            </div>
          )}

          {(result.duplicate_records?.length ?? 0) > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-amber-400">
                Duplicate records
              </p>
              <p className="mt-1 break-words text-sm text-slate-300">
                {result.duplicate_records?.join(", ")}
              </p>
            </div>
          )}

          {(result.skipped_symbols?.length ?? 0) > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-slate-400">
                Skipped symbols
              </p>
              <p className="mt-1 break-words text-sm text-slate-300">
                {result.skipped_symbols?.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
