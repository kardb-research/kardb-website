
"use client";

import { useEffect, useState, FormEvent } from "react";

type Sample = {
  id: string;
  title: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  published_at: string | null;
};

export default function AdminFreeSampleManager() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [publishingId, setPublishingId] = useState("");
  const [message, setMessage] = useState("");

  async function loadSamples() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/free-samples", {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not load samples.");
        return;
      }

      setSamples(result.samples || []);
    } catch {
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSamples();
  }, []);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capture the form before asynchronous operations.
    const form = event.currentTarget;

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch("/api/admin/free-samples", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Upload failed.");
        return;
      }

      setMessage("Free sample uploaded successfully as draft.");
      setTitle("");
      setDescription("");
      setFile(null);
      form.reset();

      await loadSamples();
    } catch {
      setMessage("Unable to upload sample.");
    } finally {
      setUploading(false);
    }
  }

  async function handlePublish(sampleId: string) {
    if (!window.confirm("Publish this free sample for all logged-in users?")) {
      return;
    }

    setPublishingId(sampleId);
    setMessage("");

    try {
      const response = await fetch("/api/admin/free-samples/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample_id: sampleId }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Could not publish sample.");
        return;
      }

      setMessage("Free sample published successfully!");
      await loadSamples();
    } catch {
      setMessage("Unable to publish sample.");
    } finally {
      setPublishingId("");
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="text-xl font-bold text-white">
          Upload Free Sample Report
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Upload the official KARDB fictional demonstration report.
          It will remain private until published.
        </p>

        <form onSubmit={handleUpload} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Report Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              placeholder="KARDB Premium Sample Research Report"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Fictional educational demonstration only. Not an actual investment recommendation."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select PDF
            </label>
            <input
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-300"
            />
            <p className="mt-2 text-xs text-slate-500">
              PDF only. Maximum file size: 20 MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Sample PDF"}
          </button>
        </form>
      </section>

      {message && (
        <p className="text-sm text-cyan-400" role="status">
          {message}
        </p>
      )}

      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-6">
        <h2 className="text-xl font-bold text-white">
          Existing Sample Reports
        </h2>

        {loading ? (
          <p className="mt-4 text-slate-400">Loading samples...</p>
        ) : samples.length === 0 ? (
          <p className="mt-4 text-slate-400">
            No sample reports uploaded yet.
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 p-4"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {sample.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {sample.description}
                  </p>
                </div>

                <span className="rounded-full border border-slate-600 px-3 py-1 text-xs text-cyan-400">
                  {sample.status}
                </span>

                {sample.status === "draft" && (
                  <button
                    type="button"
                    onClick={() => handlePublish(sample.id)}
                    disabled={publishingId === sample.id}
                    className="rounded-lg border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-400 disabled:opacity-50"
                  >
                    {publishingId === sample.id
                      ? "Publishing..."
                      : "Publish Sample"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
