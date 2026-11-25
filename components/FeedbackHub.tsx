"use client";

import { useState, type FormEvent } from "react";

type SubmissionType = "feedback" | "feature_request";
type Category =
  | "Dashboard Improvement"
  | "Market Data"
  | "Economic Intelligence"
  | "Equity Research"
  | "New Feature Request"
  | "Technical Issue"
  | "Other";

const categories: Category[] = [
  "Dashboard Improvement",
  "Market Data",
  "Economic Intelligence",
  "Equity Research",
  "New Feature Request",
  "Technical Issue",
  "Other",
];

export default function FeedbackHub() {
  const [activeForm, setActiveForm] = useState<SubmissionType | null>(null);
  const [category, setCategory] = useState<Category>("Dashboard Improvement");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SubmissionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openForm(type: SubmissionType) {
    setActiveForm(type);
    setSuccess(null);
    setError(null);
    setMessage("");
    setCategory(type === "feature_request" ? "New Feature Request" : "Dashboard Improvement");
    setPriority("Normal");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeForm || message.trim().length < 10) {
      setError("Please enter at least 10 characters so we can understand your suggestion.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_type: activeForm,
          category,
          message: message.trim(),
          priority,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            (response.status === 401
              ? "Your session could not be verified. Please log in again and retry."
              : "We could not submit your response. Please try again.")
        );
      }

      setSuccess(activeForm);
      setMessage("");
      setActiveForm(null);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not submit your response. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="feedback" className="mt-8 scroll-mt-24 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 md:p-7">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Your voice matters</p>
        <h2 className="mt-2 text-2xl font-black text-white">Help Us Improve KARDB</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Share your experience or suggest an idea. Your input will help us make KARDB more useful, informative and user-friendly.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div id="share-feedback" className="scroll-mt-24 rounded-xl border border-slate-700 bg-slate-950/60 p-5">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-cyan-400/10 p-2 text-xl" aria-hidden="true">💬</span>
            <div>
              <h3 className="font-bold text-white">Share Your Feedback</h3>
              <p className="mt-1 text-sm text-slate-400">Tell us about your experience and what could work better.</p>
            </div>
          </div>
          <button type="button" onClick={() => openForm("feedback")} className="mt-5 w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
            Share Feedback
          </button>
        </div>

        <div id="suggest-a-feature" className="scroll-mt-24 rounded-xl border border-slate-700 bg-slate-950/60 p-5">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-cyan-400/10 p-2 text-xl" aria-hidden="true">💡</span>
            <div>
              <h3 className="font-bold text-white">Suggest a Feature</h3>
              <p className="mt-1 text-sm text-slate-400">Recommend new indicators, research tools or platform improvements.</p>
            </div>
          </div>
          <button type="button" onClick={() => openForm("feature_request")} className="mt-5 w-full rounded-lg border border-cyan-400 px-4 py-2.5 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/10">
            Suggest a Feature
          </button>
        </div>
      </div>

      {success && (
        <div role="status" className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          Thank you for helping us improve KARDB. Your {success === "feedback" ? "feedback" : "feature suggestion"} has been received!
        </div>
      )}

      {activeForm && (
        <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-white">{activeForm === "feedback" ? "Share Your Feedback" : "Suggest a Feature"}</h3>
            <button type="button" onClick={() => { setActiveForm(null); setError(null); }} className="text-sm text-slate-400 hover:text-white">Close</button>
          </div>

          <label className="mt-4 block text-sm font-medium text-slate-300" htmlFor="feedback-category">Category</label>
          <select id="feedback-category" value={category} onChange={(event) => setCategory(event.target.value as Category)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>

          <label className="mt-4 block text-sm font-medium text-slate-300" htmlFor="feedback-message">
            {activeForm === "feedback" ? "Your feedback" : "Describe your feature idea"}
          </label>
          <textarea id="feedback-message" value={message} onChange={(event) => setMessage(event.target.value)} minLength={10} maxLength={3000} required rows={5} placeholder={activeForm === "feedback" ? "Tell us what you liked and what we can improve..." : "Describe the feature, indicator or tool you would like to see..."} className="mt-2 w-full resize-y rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400" />
          <div className="mt-1 text-right text-xs text-slate-500">{message.length}/3000 characters</div>

          <label className="mt-3 block text-sm font-medium text-slate-300" htmlFor="feedback-priority">Priority (optional)</label>
          <select id="feedback-priority" value={priority} onChange={(event) => setPriority(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400">
            <option>Low</option><option>Normal</option><option>High</option>
          </select>

          {error && <p role="alert" className="mt-3 text-sm text-rose-400">{error}</p>}
          <button type="submit" disabled={submitting || message.trim().length < 10} className="mt-5 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <p className="mt-3 text-xs text-slate-500">Your submission will be associated with your signed-in KARDB account.</p>
        </form>
      )}
    </section>
  );
}
