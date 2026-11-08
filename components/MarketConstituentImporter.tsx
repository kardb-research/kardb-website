
"use client";

import { useState } from "react";

type ImportResult = {
  success?: boolean;
  message?: string;
  result?: {
    snapshot_id?: string;
    index_symbol?: string;
    record_count?: number;
    snapshot_date?: string;
  };
  error?: string;
};

export default function MarketConstituentImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [snapshotDate, setSnapshotDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    if (!file) {
      setResult({ error: "Please select the NSE CSV file." });
      return;
    }

    if (!snapshotDate) {
      setResult({ error: "Please select the snapshot date." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("snapshot_date", snapshotDate);

    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/market-constituents/import",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: ImportResult = await response.json();

      if (!response.ok) {
        setResult({
          error: data.error || "Import failed. Please try again.",
        });
        return;
      }

      setResult(data);
      setFile(null);

      const fileInput = document.getElementById(
        "constituent-csv"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
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
          NIFTY 500 Constituent Importer
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Import the official NSE constituent list into the KARDB database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="constituent-csv"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            NSE Constituents CSV
          </label>

          <input
            id="constituent-csv"
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
            CSV format only. Maximum file size: 2 MB.
          </p>
        </div>

        <div>
          <label
            htmlFor="snapshot-date"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Snapshot Date
          </label>

          <input
            id="snapshot-date"
            type="date"
            value={snapshotDate}
            onChange={(event) => setSnapshotDate(event.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white"
          />

          <p className="mt-2 text-xs text-slate-500">
            Enter the date represented by this constituent snapshot.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !file || !snapshotDate}
          className="w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Importing..." : "Import NIFTY 500 Constituents"}
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
            Import successful!
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {result.message}
          </p>

          <p className="mt-2 text-sm text-slate-300">
            Records imported: {result.result?.record_count ?? "—"}
          </p>

          <p className="text-sm text-slate-300">
            Snapshot date: {result.result?.snapshot_date ?? "—"}
          </p>

          <p className="text-sm text-slate-300">
            Index: {result.result?.index_symbol ?? "NIFTY500"}
          </p>
        </div>
      )}
    </section>
  );
}
