"use client";

import { useEffect, useMemo, useState } from "react";

type Feedback = {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  submission_type: "feedback" | "feature_request";
  category: string;
  message: string;
  priority: "Low" | "Normal" | "High";
  status: "new" | "under_review" | "planned" | "completed" | "declined";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const STATUSES = ["new", "under_review", "planned", "completed", "declined"] as const;
const statusLabel: Record<string, string> = {
  new: "New",
  under_review: "Under Review",
  planned: "Planned",
  completed: "Completed",
  declined: "Declined",
};

export default function AdminFeedbackManager() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [editStatus, setEditStatus] = useState<Feedback["status"]>("new");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  async function loadFeedback() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/feedback", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load feedback.");
      setItems(result.feedback || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load feedback.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFeedback();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.message.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.user_id.toLowerCase().includes(q) ||
        (item.full_name || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q);
      return (
        matchesSearch &&
        (statusFilter === "all" || item.status === statusFilter) &&
        (priorityFilter === "all" || item.priority === priorityFilter) &&
        (typeFilter === "all" || item.submission_type === typeFilter)
      );
    });
  }, [items, search, statusFilter, priorityFilter, typeFilter]);

  function openDetails(item: Feedback) {
    setSelected(item);
    setEditStatus(item.status);
    setEditNotes(item.admin_notes || "");
    setSaveMessage("");
  }

  async function saveChanges() {
    if (!selected) return;
    setSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch("/api/admin/feedback", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          status: editStatus,
          admin_notes: editNotes,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save changes.");
      setItems((current) => current.map((item) => item.id === selected.id ? result.feedback : item));
      setSelected(result.feedback);
      setSaveMessage("Changes saved successfully.");
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  }

  const count = (predicate: (item: Feedback) => boolean) => items.filter(predicate).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total Submissions", items.length],
          ["New Submissions", count((item) => item.status === "new")],
          ["Feedback", count((item) => item.submission_type === "feedback")],
          ["Feature Requests", count((item) => item.submission_type === "feature_request")],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-950/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">All Submissions</h2>
            <p className="mt-1 text-sm text-slate-400">Review user feedback and manage feature-request status.</p>
          </div>
          <button onClick={() => void loadFeedback()} className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10">
            Refresh
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search message, category, name or email" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white">
            <option value="all">All statuses</option>
            {STATUSES.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white">
            <option value="all">All priorities</option>
            <option>Low</option><option>Normal</option><option>High</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white">
            <option value="all">All submission types</option>
            <option value="feedback">Feedback</option>
            <option value="feature_request">Feature Requests</option>
          </select>
        </div>

        {loading ? <p className="mt-6 text-slate-400">Loading submissions...</p> :
          error ? <p className="mt-6 text-sm text-red-400">{error}</p> :
          filtered.length === 0 ? <p className="mt-6 text-slate-400">No submissions match these filters.</p> : (
            <div className="mt-5 space-y-3">
              {filtered.map((item) => (
                <button key={item.id} onClick={() => openDetails(item)} className="w-full rounded-lg border border-slate-700 bg-slate-900/70 p-4 text-left transition hover:border-cyan-400">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-white">{item.submission_type === "feedback" ? "Feedback" : "Feature Request"}</span>
                        <span className="rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-300">{item.category}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-300">{item.message}</p>
                      <p className="mt-2 text-xs text-slate-300">
                        {item.full_name || "Name not available"} · {item.email || "Email not available"}
                      </p>
                      <p className="mt-1 break-all text-xs text-slate-500">User ID: {item.user_id}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-slate-400">{new Date(item.created_at).toLocaleString("en-IN")}</p>
                      <p className="mt-2 text-xs text-cyan-300">{statusLabel[item.status] || item.status} · {item.priority} priority</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        <p className="mt-4 text-xs text-slate-500">Showing {filtered.length} of {items.length} submissions.</p>
      </section>

      {selected && (
        <div className="rounded-xl border border-cyan-500/40 bg-slate-950/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Submission Details</h2>
            <button onClick={() => setSelected(null)} className="text-sm text-slate-400 hover:text-white">Close</button>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <p className="text-slate-400">Type: <span className="text-white">{selected.submission_type === "feedback" ? "Feedback" : "Feature Request"}</span></p>
            <p className="text-slate-400">Category: <span className="text-white">{selected.category}</span></p>
            <p className="text-slate-400">Priority: <span className="text-white">{selected.priority}</span></p>
            <p className="text-slate-400">Submitted: <span className="text-white">{new Date(selected.created_at).toLocaleString("en-IN")}</span></p>
            <p className="text-slate-400">Name: <span className="text-white">{selected.full_name || "Not available"}</span></p>
            <p className="break-all text-slate-400">Email: <span className="text-white">{selected.email || "Not available"}</span></p>
            <p className="break-all text-slate-400 sm:col-span-2">User ID: <span className="text-white">{selected.user_id}</span></p>
          </div>
          <div className="mt-5 rounded-lg bg-slate-900 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">User Message</p>
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{selected.message}</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-300">Status
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as Feedback["status"])} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white">
                {STATUSES.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
              </select>
            </label>
            <label className="text-sm text-slate-300">Admin Notes
              <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3} maxLength={3000} placeholder="Internal notes for the KARDB team..." className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white placeholder:text-slate-500" />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={() => void saveChanges()} disabled={saving} className="rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
            {saveMessage && <p className="text-sm text-cyan-300">{saveMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
