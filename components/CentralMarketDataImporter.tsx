
"use client";

import { useState } from "react";

type ImportStatus = {
  success?: boolean;
  message?: string;
  error?: string;
  result?: {
    index_symbol?: string;
    record_count?: number;
    snapshot_date?: string;
  };
  trade_date?: string;
  snapshot_date?: string;
  total_constituents?: number;
  matched_records?: number;
  imported_records?: number;
  missing_count?: number;
  invalid_count?: number;
  duplicate_count?: number;
};

type ImportType = "constituents" | "eod";

export default function CentralMarketDataImporter() {
  const [constituentFile, setConstituentFile] = useState<File | null>(null);
  const [eodFile, setEodFile] = useState<File | null>(null);
  const [indexFile, setIndexFile] = useState<File | null>(null);

  const [indexResult, setIndexResult] = useState<ImportStatus | null>(null);
  const [indexLoading, setIndexLoading] = useState(false);

  const [fiiDiiFile, setFiiDiiFile] = useState<File | null>(null);
  const [fiiDiiResult, setFiiDiiResult] = useState<ImportStatus | null>(null);
  const [fiiDiiLoading, setFiiDiiLoading] = useState(false);

const [vixFile, setVixFile] = useState<File | null>(null);
const [vixResult, setVixResult] = useState<ImportStatus | null>(null);
const [vixLoading, setVixLoading] = useState(false);

  const [snapshotDate, setSnapshotDate] = useState("");
  const [tradeDate, setTradeDate] = useState("");

  const [loading, setLoading] = useState<
    "constituents" | "eod" | "all" | null
  >(null);

  const [constituentResult, setConstituentResult] =
    useState<ImportStatus | null>(null);

  const [eodResult, setEodResult] =
    useState<ImportStatus | null>(null);

  async function uploadIndexFile() {
    if (!indexFile) return;

    setIndexLoading(true);
    setIndexResult(null);

    const formData = new FormData();
    formData.append("file", indexFile);

    try {
      const response = await fetch("/api/admin/market-data/indices", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setIndexResult({
          error: data.error || "Index data import failed.",
        });
        return;
      }

      setIndexResult({
        ...data,
        message: data.message || data.error,
      });

      setIndexFile(null);
      clearFileInput("central-index-csv");
    } catch {
      setIndexResult({
        success: false,
        error: "Index data upload failed. Please try again.",
      });
    } finally {
      setIndexLoading(false);
    }
  }

  async function uploadFiiDiiFile() {
    if (!fiiDiiFile) return;

    if (fiiDiiFile.size > 2 * 1024 * 1024) {
      setFiiDiiResult({
        error: "File size must not exceed 2 MB.",
      });
      return;
    }

    setFiiDiiLoading(true);
    setFiiDiiResult(null);

    const formData = new FormData();
    formData.append("file", fiiDiiFile);

    try {
      const response = await fetch("/api/admin/market-data/fii-dii", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setFiiDiiResult({
          error: data.error || "FII/DII import failed.",
        });
        return;
      }

      setFiiDiiResult(data);
      setFiiDiiFile(null);
      clearFileInput("central-fii-dii-csv");
    } catch {
      setFiiDiiResult({
        success: false,
        error: "FII/DII upload failed. Please try again.",
      });
    } finally {
      setFiiDiiLoading(false);
    }
  }

  async function uploadVixFile() {
    if (!vixFile) return;

    if (vixFile.size > 2 * 1024 * 1024) {
      setVixResult({
        error: "File size must not exceed 2 MB.",
      });
      return;
    }

    setVixLoading(true);
    setVixResult(null);

    const formData = new FormData();
    formData.append("file", vixFile);

    try {
      const response = await fetch("/api/admin/market-data/vix", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setVixResult({
          error: data.error || "India VIX import failed.",
        });
        return;
      }

      setVixResult(data);
      setVixFile(null);
      clearFileInput("central-vix-csv");
    } catch {
      setVixResult({
        success: false,
        error: "India VIX upload failed. Please try again.",
      });
    } finally {
      setVixLoading(false);
    }
  }

  async function uploadFile(
    type: ImportType,
    file: File,
    date: string
  ): Promise<ImportStatus> {
    const formData = new FormData();

    formData.append("file", file);

    if (type === "constituents") {
      formData.append("snapshot_date", date);
    } else {
      formData.append("trade_date", date);
    }

    try {
      const endpoint =
        type === "constituents"
          ? "/api/admin/market-constituents/import"
          : "/api/admin/market-eod/import";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || "Import failed. Please try again.",
        };
      }

      return data;
    } catch {
      return {
        error: "Could not connect to the server.",
      };
    }
  }

  function clearFileInput(id: string) {
    const input = document.getElementById(
      id
    ) as HTMLInputElement | null;

    if (input) input.value = "";
  }

  async function runSingleImport(type: ImportType) {
    const isConstituent = type === "constituents";

    const file = isConstituent ? constituentFile : eodFile;
    const date = isConstituent ? snapshotDate : tradeDate;

    if (!file || !date) return;

    if (file.size > 2 * 1024 * 1024) {
      const error = {
        error: "File size must not exceed 2 MB.",
      };

      if (isConstituent) setConstituentResult(error);
      else setEodResult(error);

      return;
    }

    setLoading(type);

    if (isConstituent) setConstituentResult(null);
    else setEodResult(null);

    const result = await uploadFile(type, file, date);

    if (isConstituent) {
      setConstituentResult(result);

      if (result.success) {
        setConstituentFile(null);
        clearFileInput("central-constituent-csv");
      }
    } else {
      setEodResult(result);

      if (result.success) {
        setEodFile(null);
        clearFileInput("central-eod-csv");
      }
    }

    setLoading(null);
  }

  async function runImportAll() {
    if (
      !constituentFile ||
      !eodFile ||
      !snapshotDate ||
      !tradeDate
    ) {
      return;
    }

    if (snapshotDate > tradeDate) {
      setConstituentResult({
        error: "Snapshot date cannot be later than the trade date.",
      });
      return;
    }

    if (
      constituentFile.size > 2 * 1024 * 1024 ||
      eodFile.size > 2 * 1024 * 1024
    ) {
      setConstituentResult({
        error: "Both CSV files must be 2 MB or smaller.",
      });
      return;
    }

    setLoading("all");
    setConstituentResult(null);
    setEodResult(null);

    const constituentResponse = await uploadFile(
      "constituents",
      constituentFile,
      snapshotDate
    );

    setConstituentResult(constituentResponse);

    if (!constituentResponse.success) {
      setEodResult({
        error:
          "EOD import skipped because the constituent import failed. " +
          "Use the existing snapshot and import EOD separately if appropriate.",
      });

      setLoading(null);
      return;
    }

    setConstituentFile(null);
    clearFileInput("central-constituent-csv");

    const eodResponse = await uploadFile(
      "eod",
      eodFile,
      tradeDate
    );

    setEodResult(eodResponse);

    if (eodResponse.success) {
      setEodFile(null);
      clearFileInput("central-eod-csv");
    }

    setLoading(null);
  }

  function ResultPanel({
    title,
    result,
    type,
  }: {
    title: string;
    result: ImportStatus | null;
    type: ImportType;
  }) {
    if (!result) return null;

    return (
      <div
        role="status"
        className={`mt-4 rounded-xl border p-4 ${
          result.error
            ? "border-red-500/30 bg-red-500/10"
            : "border-emerald-500/30 bg-emerald-500/10"
        }`}
      >
        <p
          className={`font-semibold ${
            result.error ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {title}: {result.error ? "Failed" : "Successful"}
        </p>

        {result.error ? (
          <p className="mt-2 text-sm text-red-300">
            {result.error}
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-slate-300">
              {result.message}
            </p>

            {type === "constituents" ? (
              <>
                <p className="mt-2 text-sm text-slate-300">
                  Records imported: {result.result?.record_count ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Snapshot date: {result.result?.snapshot_date ?? "—"}
                </p>
              </>
            ) : (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <p className="text-sm text-slate-300">
                  Trade date: {result.trade_date ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Imported: {result.imported_records ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Matched: {result.matched_records ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Missing: {result.missing_count ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Invalid: {result.invalid_count ?? "—"}
                </p>
                <p className="text-sm text-slate-300">
                  Duplicates: {result.duplicate_count ?? "—"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  const busy =
    loading !== null || indexLoading || fiiDiiLoading || vixLoading;

  return (
    <section className="mt-10 rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          KARDB Data Management
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Central Market Data Importer
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage your market data imports from one central control panel.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
          <h3 className="text-lg font-bold text-white">
            1. NIFTY 500 Constituents
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Import the NSE constituent list.
          </p>

          <label
            htmlFor="central-constituent-csv"
            className="mb-2 mt-5 block text-sm text-slate-300"
          >
            Constituents CSV
          </label>

          <input
            id="central-constituent-csv"
            type="file"
            accept=".csv,text/csv"
            disabled={busy}
            onChange={(event) => {
              setConstituentFile(event.target.files?.[0] ?? null);
              setConstituentResult(null);
            }}
            className="w-full text-sm text-slate-300"
          />

          <label
            htmlFor="central-snapshot-date"
            className="mb-2 mt-5 block text-sm text-slate-300"
          >
            Snapshot Date
          </label>

          <input
            id="central-snapshot-date"
            type="date"
            value={snapshotDate}
            disabled={busy}
            onChange={(event) => setSnapshotDate(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white"
          />

          <button
            type="button"
            disabled={busy || !constituentFile || !snapshotDate}
            onClick={() => runSingleImport("constituents")}
            className="mt-5 w-full rounded-lg bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-40"
          >
            {loading === "constituents"
              ? "Importing..."
              : "Import Constituents"}
          </button>

          <ResultPanel
            title="Constituents"
            result={constituentResult}
            type="constituents"
          />
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
          <h3 className="text-lg font-bold text-white">
            2. NSE EOD Market Data
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Import daily OHLC and volume data.
          </p>

          <label
            htmlFor="central-eod-csv"
            className="mb-2 mt-5 block text-sm text-slate-300"
          >
            NSE EOD CSV (pd*.csv)
          </label>

          <input
            id="central-eod-csv"
            type="file"
            accept=".csv,text/csv"
            disabled={busy}
            onChange={(event) => {
              setEodFile(event.target.files?.[0] ?? null);
              setEodResult(null);
            }}
            className="w-full text-sm text-slate-300"
          />

          <label
            htmlFor="central-trade-date"
            className="mb-2 mt-5 block text-sm text-slate-300"
          >
            Trade Date
          </label>

          <input
            id="central-trade-date"
            type="date"
            value={tradeDate}
            disabled={busy}
            onChange={(event) => setTradeDate(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white"
          />

          <button
            type="button"
            disabled={busy || !eodFile || !tradeDate}
            onClick={() => runSingleImport("eod")}
            className="mt-5 w-full rounded-lg bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-40"
          >
            {loading === "eod" ? "Importing..." : "Import NSE EOD Data"}
          </button>

          <ResultPanel
            title="NSE EOD"
            result={eodResult}
            type="eod"
          />
        </div>
      </div>

      <div className="mt-7 rounded-xl border border-violet-500/30 bg-violet-500/5 p-5">
        <h3 className="text-lg font-bold text-white">
          Index EOD Data Import
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Upload daily EOD data for all 10 indices: NIFTY 50, SENSEX, BANK NIFTY,
          NIFTY MIDCAP 100, NIFTY SMALLCAP 100, NIFTY IT, NIFTY METAL,
          NIFTY AUTO, NIFTY REALTY and NIFTY PHARMA.
        </p>

        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-slate-300">
            Required CSV columns
          </p>
          <code className="mt-2 block break-all text-xs text-violet-300">
            trade_date,index_symbol,open,high,low,close,previous_close
          </code>
          <p className="mt-2 text-xs text-slate-400">
            Use one row per index per trading date. Maximum 10 records per file.
            Use the approved internal index symbols and provide previous_close
            for accurate daily change calculations. Maximum file size: 2 MB.
          </p>
        </div>

        <input
          id="central-index-csv"
          type="file"
          accept=".csv,text/csv"
          disabled={busy}
          onChange={(event) => {
            setIndexFile(event.target.files?.[0] || null);
            setIndexResult(null);
          }}
          className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white"
        />

        <button
          type="button"
          disabled={!indexFile || busy}
          onClick={uploadIndexFile}
          className="mt-4 w-full rounded-lg bg-violet-500 px-4 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {indexLoading ? "Importing Index Data..." : "Import Index EOD Data"}
        </button>

        {indexResult && (
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 p-4">
            <p className="text-sm font-bold text-white">
              {indexResult.error ? "Import Failed" : "Import Successful"}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {indexResult.message || indexResult.error || "No response message"}
            </p>
            {indexResult.imported_records !== undefined && (
              <p className="mt-2 text-sm text-emerald-400">
                Records imported: {indexResult.imported_records}
              </p>
            )}
          </div>
        )}
      </div>

      {/* India VIX Import */}
      <div className="mt-7 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <h3 className="text-lg font-bold text-white">
          India VIX EOD Import
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Upload daily India VIX OHLC data.
        </p>

        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-slate-300">
            Required CSV columns
          </p>
          <code className="mt-2 block break-all text-xs text-amber-300">
            trade_date,open,high,low,close,previous_close
          </code>
          <p className="mt-2 text-xs text-slate-500">
            Use one row per trading date. Maximum file size: 2 MB.
          </p>
        </div>

        <label
          htmlFor="central-vix-csv"
          className="mb-2 mt-5 block text-sm text-slate-300"
        >
          India VIX CSV File
        </label>

        <input
          id="central-vix-csv"
          type="file"
          accept=".csv,text/csv"
          disabled={busy}
          onChange={(event) => {
            setVixFile(event.target.files?.[0] ?? null);
            setVixResult(null);
          }}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white"
        />

        <button
          type="button"
          disabled={!vixFile || busy}
          onClick={uploadVixFile}
          className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {vixLoading ? "Importing India VIX..." : "Import India VIX Data"}
        </button>

        {vixResult && (
          <div
            role="status"
            className={`mt-4 rounded-lg border p-4 ${
              vixResult.error
                ? "border-red-500/30 bg-red-500/10"
                : "border-emerald-500/30 bg-emerald-500/10"
            }`}
          >
            <p
              className={`font-semibold ${
                vixResult.error ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {vixResult.error ? "Import Failed" : "Import Successful"}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              {vixResult.message || vixResult.error}
            </p>

            {!vixResult.error && (
              <p className="mt-2 text-sm text-emerald-300">
                Records imported: {vixResult.imported_records ?? "—"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* FII / DII Import */}
      <div className="mt-7 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
        <h3 className="text-lg font-bold text-white">
          FII / DII Activity Import
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Upload daily institutional buying and selling data.
        </p>

        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-slate-300">
            Required CSV columns
          </p>
          <code className="mt-2 block break-all text-xs text-emerald-300">
            trade_date,fii_buy,fii_sell,dii_buy,dii_sell
          </code>
          <p className="mt-2 text-xs text-slate-500">
            Net values are calculated automatically during import.
          </p>
        </div>

        <label
          htmlFor="central-fii-dii-csv"
          className="mb-2 mt-5 block text-sm text-slate-300"
        >
          FII / DII CSV File
        </label>

        <input
          id="central-fii-dii-csv"
          type="file"
          accept=".csv,text/csv"
          disabled={busy}
          onChange={(event) => {
            setFiiDiiFile(event.target.files?.[0] ?? null);
            setFiiDiiResult(null);
          }}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white"
        />

        <button
          type="button"
          disabled={!fiiDiiFile || busy}
          onClick={uploadFiiDiiFile}
          className="mt-5 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {fiiDiiLoading ? "Importing FII / DII..." : "Import FII / DII Data"}
        </button>

        {fiiDiiResult && (
          <div
            role="status"
            className={`mt-4 rounded-lg border p-4 ${
              fiiDiiResult.error
                ? "border-red-500/30 bg-red-500/10"
                : "border-emerald-500/30 bg-emerald-500/10"
            }`}
          >
            <p
              className={`font-semibold ${
                fiiDiiResult.error ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {fiiDiiResult.error ? "Import Failed" : "Import Successful"}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              {fiiDiiResult.message || fiiDiiResult.error}
            </p>

            {!fiiDiiResult.error && (
              <p className="mt-2 text-sm text-emerald-300">
                Records imported: {fiiDiiResult.imported_records ?? "—"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-7 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
        <h3 className="text-lg font-bold text-white">
          Central Import Control
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Import both selected files sequentially. Each import reports its
          own result independently.
        </p>

        <button
          type="button"
          disabled={
            busy ||
            !constituentFile ||
            !eodFile ||
            !snapshotDate ||
            !tradeDate
          }
          onClick={runImportAll}
          className="mt-5 w-full rounded-lg bg-emerald-500 px-5 py-4 text-base font-black text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading === "all" ? "Importing All Data..." : "IMPORT ALL"}
        </button>

        <p className="mt-3 text-xs text-slate-500">
          Both CSV files and their respective dates are required for Import All.
        </p>
      </div>

      <div className="mt-7">
        <h3 className="mb-3 text-lg font-bold text-white">
          Upcoming Data Integrations
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "USD / INR",
            "NIFTY P/E and P/B",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-700 bg-slate-950/50 p-4"
            >
              <p className="text-sm font-medium text-slate-300">
                {item}
              </p>
              <p className="mt-2 text-xs text-amber-400">
                Integration pending
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
