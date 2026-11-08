"use client";

import { useEffect, useState, FormEvent } from "react";

type Batch = {
  id: string;
  batch_month: string;
  title: string;
  status: string;
  created_at: string;
};
type Report = {
  id: string;
  batch_id: string;
  company_name: string;
  report_title: string;
  sequence_number: number;
  status: string;
  created_at: string;
};

export default function AdminBatchManager() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedBatch, setSelectedBatch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [sequenceNumber, setSequenceNumber] = useState("1");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsMessage, setReportsMessage] = useState("");
  const [selectedReportsBatch, setSelectedReportsBatch] = useState("");
  const [replacingReportId, setReplacingReportId] = useState<string | null>(null);
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [replaceMessage, setReplaceMessage] = useState("");
  const [replaceMessageReportId, setReplaceMessageReportId] = useState("");
  const [publishingBatchId, setPublishingBatchId] = useState<string | null>(null);
  const [publishMessage, setPublishMessage] = useState("");
  const [publishMessageBatchId, setPublishMessageBatchId] = useState("");
  const [publishMessageType, setPublishMessageType] = useState<"success" | "error" | "">("");

  async function loadBatches() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/batches", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not load batches.");
        return;
      }

      setBatches(result.batches || []);
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  let active = true;

  fetch("/api/admin/batches", {
    cache: "no-store",
  })
    .then(async (response) => {
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not load batches.");
      }

      return result;
    })
    .then((result) => {
      if (active) {
        setBatches(result.batches || []);
      }
    })
    .catch((error) => {
      if (active) {
        setMessage(error.message || "Unable to load batches.");
      }
    })
    .finally(() => {
      if (active) {
        setLoading(false);
      }
    });

  return () => {
    active = false;
  };
}, []);

  async function loadReports(batchId: string) {
    setReportsLoading(true);
    setReportsMessage("");

    try {
      const response = await fetch(
        `/api/admin/reports?batch_id=${encodeURIComponent(batchId)}`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok) {
        setReportsMessage(result.error || "Could not load reports.");
        setReports([]);
        return;
      }

      setReports(result.reports || []);
    } catch {
      setReportsMessage("Unable to connect to the server.");
      setReports([]);
    } finally {
      setReportsLoading(false);
    }
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch_month: `${month}-01`,
          title,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Batch creation failed.");
        return;
      }

      setMessage("Monthly batch created successfully!");
      setMonth("");
      setTitle("");
      await loadBatches();
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  }


    async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!selectedBatch || !pdfFile) {
      setUploadMessage("Please select a batch and PDF file.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();

      formData.append("batch_id", selectedBatch);
      formData.append("company_name", companyName);
      formData.append("report_title", reportTitle);
      formData.append("sequence_number", sequenceNumber);
      formData.append("file", pdfFile);

      const response = await fetch("/api/admin/reports", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setUploadMessage(result.error || "PDF upload failed.");
        return;
      }

      setUploadMessage("Research report uploaded successfully!");
      setCompanyName("");
      setReportTitle("");
      setSequenceNumber("1");
      setPdfFile(null);
      form.reset();
    } catch {
      setUploadMessage("Unable to connect to the server.");
    } finally {
      setUploading(false);
    }
  }

    async function handleReplace(reportId: string) {
  if (!replacementFile) {
    setReplaceMessage("Please select a replacement PDF.");
    return;
  }

   setReplacingReportId(reportId);
   setReplaceMessageReportId(reportId);
   setReplaceMessage("");

  try {
    const formData = new FormData();
    formData.append("report_id", reportId);
    formData.append("file", replacementFile);

    const response = await fetch("/api/admin/reports/replace", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      setReplaceMessage(result.error || "PDF replacement failed.");
      return;
    }

    setReplaceMessage(result.warning || "PDF replaced successfully!");
    setReplacementFile(null);

    if (selectedReportsBatch) {
      await loadReports(selectedReportsBatch);
    }
  } catch {
    setReplaceMessage("Unable to connect to the server.");
  } finally {
    setReplacingReportId(null);
  }
}

async function handlePublish(batchId: string) {
  const confirmed = window.confirm(
    "Publish this monthly batch? All 6 reports will become available to eligible subscribers."
  );

  if (!confirmed) return;

  setPublishingBatchId(batchId);
  setPublishMessage("");
  setPublishMessageBatchId(batchId);

  try {
    const response = await fetch("/api/admin/batches/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batch_id: batchId }),
    });

    const result = await response.json();

    if (!response.ok) {
      setPublishMessageType("error");
      setPublishMessage(result.error || "Could not publish batch.");
      return;
    }

    setPublishMessageType("success");
    setPublishMessage("Monthly batch published successfully!");
    await loadBatches();

    if (selectedReportsBatch === batchId) {
      await loadReports(batchId);
    }
  } catch {
    setPublishMessage("Unable to connect to the server.");
  } finally {
    setPublishingBatchId(null);
  }
}
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="text-xl font-bold text-white">
          Create Monthly Batch
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Create a monthly research report batch.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Batch Month
            </label>

            <input
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Batch Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: November 2026 Research Reports"
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Batch"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-cyan-400" role="status">
            {message}
          </p>
        )}
      </section>

            <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="text-xl font-bold text-white">
          Upload Research Report
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Upload a PDF report to an existing monthly batch.
        </p>

        <form onSubmit={handleUpload} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select Monthly Batch
            </label>

            <select
              value={selectedBatch}
              onChange={(event) => setSelectedBatch(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              <option value="">Choose a batch</option>
              {batches
                .filter((batch) => batch.status === "draft")
                .map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              maxLength={100}
              required
              placeholder="Example: Reliance Industries"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Report Title
            </label>

            <input
              type="text"
              value={reportTitle}
              onChange={(event) => setReportTitle(event.target.value)}
              maxLength={200}
              required
              placeholder="Enter research report title"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Report Sequence
            </label>

            <select
              value={sequenceNumber}
              onChange={(event) => setSequenceNumber(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  Report {number}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select PDF File
            </label>

            <input
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(event) =>
                setPdfFile(event.target.files?.[0] || null)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
            <p className="mt-2 text-xs text-slate-500">
              PDF only. Maximum file size: 20 MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading || !batches.some(
              (batch) => batch.status === "draft"
            )}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Research Report"}
          </button>
        </form>

        {uploadMessage && (
          <p className="mt-4 text-sm text-cyan-400" role="status">
            {uploadMessage}
          </p>
        )}
      </section>
      
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="text-xl font-bold text-white">
          Existing Monthly Batches
        </h2>

        {loading ? (
          <p className="mt-4 text-slate-400">Loading batches...</p>
        ) : batches.length === 0 ? (
          <p className="mt-4 text-slate-400">
            No monthly batches created yet.
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 p-4"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {batch.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {batch.batch_month}
                  </p>
                </div>

                <span className="rounded-full border border-slate-600 px-3 py-1 text-xs text-cyan-400">
                  {batch.status}
                </span>
         <button
  type="button"
  onClick={() => {
    setSelectedReportsBatch(batch.id);
    loadReports(batch.id);
  }}
  className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
>
  View Reports
</button>
{batch.status === "draft" && (
  <button
    type="button"
    onClick={() => handlePublish(batch.id)}
    disabled={publishingBatchId === batch.id}
    className="rounded-lg border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-slate-950 disabled:opacity-50"
  >
    {publishingBatchId === batch.id ? "Publishing..." : "Publish Batch"}
  </button>
)}

{publishMessage && publishMessageBatchId === batch.id && (
  <p
    className={`w-full text-sm ${
      publishMessageType === "success" ? "text-emerald-400" : "text-red-400"
    }`}
  >
    {publishMessage}
  </p>
)}          </div>
            ))}
          </div>
        )}
      </section>
      {selectedReportsBatch && (
        <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
          <h2 className="text-xl font-bold text-white">
            Uploaded Research Reports

          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {batches.find((batch) => batch.id === selectedReportsBatch)?.title}
          </p>

          {reportsLoading ? (
            <p className="mt-4 text-slate-400">Loading reports...</p>
          ) : reportsMessage ? (
            <p className="mt-4 text-red-400">{reportsMessage}</p>
          ) : reports.length === 0 ? (
            <p className="mt-4 text-slate-400">
              No reports uploaded in this batch yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-white">
                      Report {report.sequence_number}: {report.company_name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {report.report_title}
                    </p>
                  </div>

                  <span className="rounded-full border border-slate-600 px-3 py-1 text-xs text-cyan-400">
                    {report.status}
                  </span>
                <button
  type="button"
  onClick={async () => {
    try {
      const response = await fetch(
        `/api/admin/reports/view?report_id=${report.id}`
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Could not open PDF.");
        return;
      }

      window.open(result.url, "_blank", "noopener,noreferrer");
    } catch {
      alert("Unable to open PDF.");
    }
  }}
  className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
      >
        View PDF
      </button>

      {report.status === "draft" && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) =>
              setReplacementFile(event.target.files?.[0] || null)
            }
            className="max-w-full text-sm text-slate-300"
          />

          <button
            type="button"
            onClick={() => handleReplace(report.id)}
            disabled={
              !replacementFile || replacingReportId === report.id
            }
            className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-400 hover:bg-amber-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {replacingReportId === report.id
              ? "Replacing..."
              : "Replace PDF"}
          </button>

          {replaceMessage && replaceMessageReportId === report.id && (
            <p className="w-full text-sm text-cyan-400">
              {replaceMessage}
            </p>
          )}
        </div>
      )}
     </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}