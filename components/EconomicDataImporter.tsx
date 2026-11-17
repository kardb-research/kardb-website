
"use client";

import { useState } from "react";

type PreviewRecord = {
  indicator_code: string;
  indicator_name: string;
  period_start: string;
  period_end: string;
  period_label: string;
  value: number;
  publication_date: string | null;
  source: string | null;
};

type ImportResult = {
  success?: boolean;
  action?: string;
  message?: string;
  error?: string;
  valid_records?: number;
  imported_records?: number;
  records?: PreviewRecord[];
  source_file?: string;
};

export default function EconomicDataImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"select" | "preview" | "done">(
    "select"
  );
  const [result, setResult] = useState<ImportResult | null>(null);
  const [errorAction, setErrorAction] = useState<
    "validate" | "import" | null
  >(null);

  async function sendRequest(action: "validate" | "import") {
    if (!file) {
      setResult({ error: "Please select an economic data CSV file." });
      setErrorAction(action);
      return;
    }

    setLoading(true);

    if (action === "validate") {
      setResult(null);
    }

    setErrorAction(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("action", action);

      const response = await fetch(
        "/api/admin/economic-intelligence/import",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: ImportResult = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Economic data request failed.");
      }

      setResult(data);

      if (action === "validate") {
        setStage("preview");
      } else {
        setStage("done");
        setFile(null);

        const input = document.getElementById(
          "economic-csv-file"
        ) as HTMLInputElement | null;

        if (input) input.value = "";
      }
    } catch (error) {
      setResult({
        error:
          error instanceof Error
            ? error.message
            : "Unable to process economic data.",
      });
      setErrorAction(action);
    } finally {
      setLoading(false);
    }
  }

  function resetImporter() {
    setFile(null);
    setResult(null);
    setErrorAction(null);
    setStage("select");

    const input = document.getElementById(
      "economic-csv-file"
    ) as HTMLInputElement | null;

    if (input) input.value = "";
  }

  return (
    <section className="mt-10 rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6">
      <div>
        <p className="text-sm font-semibold text-cyan-400">
          KARDB ECONOMIC INTELLIGENCE
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Economic Data Importer
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Validate and preview your CSV before confirming the database import.
          Existing records will not be overwritten.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-slate-600 bg-slate-950/50 p-6">
        <label
          htmlFor="economic-csv-file"
          className="block text-sm font-semibold text-white"
        >
          Select Economic Data CSV
        </label>

        <input
          id="economic-csv-file"
          type="file"
          accept=".csv,text/csv"
          disabled={loading || stage === "preview"}
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setResult(null);
            setErrorAction(null);
            setStage("select");
          }}
          className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-cyan-400"
        />

        {file && (
          <p className="mt-3 text-sm text-emerald-400">
            Selected: {file.name}
          </p>
        )}

        {stage === "select" && (
          <button
            type="button"
            onClick={() => sendRequest("validate")}
            disabled={!file || loading}
            className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Validating..." : "Validate & Preview CSV"}
          </button>
        )}

        {stage === "preview" && (
          <div className="mt-6">
            {result?.success && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="font-bold text-amber-400">
                  Review Before Import
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Validation passed. No records have been inserted yet.
                </p>
                <p className="mt-2 text-sm text-white">
                  Valid Records: {result.valid_records ?? 0}
                </p>
              </div>
            )}

            {result?.records && (
              <>
                <div className="mt-4 overflow-x-auto rounded-lg border border-slate-700">
                  <table className="w-full min-w-[750px] text-left text-sm">
                    <thead className="bg-slate-800 text-slate-300">
                      <tr>
                        <th className="p-3">Indicator</th>
                        <th className="p-3">Period</th>
                        <th className="p-3">Value</th>
                        <th className="p-3">Publication Date</th>
                        <th className="p-3">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.records.slice(0, 20).map((record, index) => (
                        <tr
                          key={`${record.indicator_code}-${record.period_start}-${index}`}
                          className="border-t border-slate-700 text-slate-300"
                        >
                          <td className="p-3">
                            <div className="font-semibold text-white">
                              {record.indicator_name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {record.indicator_code}
                            </div>
                          </td>
                          <td className="p-3">
                            {record.period_label}
                            <div className="text-xs text-slate-500">
                              {record.period_start} to {record.period_end}
                            </div>
                          </td>
                          <td className="p-3 font-semibold text-white">
                            {record.value}
                          </td>
                          <td className="p-3">
                            {record.publication_date || "—"}
                          </td>
                          <td className="p-3">
                            {record.source || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.records.length > 20 && (
                  <p className="mt-2 text-xs text-slate-400">
                    Showing first 20 of {result.valid_records} records.
                  </p>
                )}

                <p className="mt-4 text-sm text-amber-300">
                  Confirming will write these records to the KARDB database.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => sendRequest("import")}
                    disabled={loading || !result.success}
                    className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    {loading ? "Importing..." : "Confirm & Import"}
                  </button>

                  <button
                    type="button"
                    onClick={resetImporter}
                    disabled={loading}
                    className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {result?.success && stage === "done" && (
        <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="font-bold text-emerald-400">
            Import Successful
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {result.message}
          </p>
          <p className="mt-2 text-sm text-white">
            Imported Records: {result.imported_records ?? 0}
          </p>
          {result.source_file && (
            <p className="mt-1 text-xs text-slate-400">
              File: {result.source_file}
            </p>
          )}
          <button
            type="button"
            onClick={resetImporter}
            className="mt-4 rounded-lg border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
          >
            Import Another File
          </button>
        </div>
      )}

      {result?.error && (
        <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="font-bold text-red-400">
            {errorAction === "import" ? "Import Failed" : "Validation Failed"}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {result.error}
          </p>
        </div>
      )}
    </section>
  );
}
