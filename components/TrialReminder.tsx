
"use client";

import { useEffect, useState } from "react";

export default function TrialReminder({
  trialExpiresAt,
}: {
  trialExpiresAt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [trialDay, setTrialDay] = useState(0);

  useEffect(() => {
    const expiryTime = new Date(trialExpiresAt).getTime();
    const trialStartTime = expiryTime - 7 * 24 * 60 * 60 * 1000;
    const elapsedDays = Math.floor(
      (Date.now() - trialStartTime) / (24 * 60 * 60 * 1000)
    ) + 1;

    if (elapsedDays < 4 || elapsedDays > 7) return;

    const reminderKey = `kardb-trial-reminder-${trialExpiresAt}-${elapsedDays}`;

    if (localStorage.getItem(reminderKey)) return;

    setTrialDay(elapsedDays);
    setIsOpen(true);
  }, [trialExpiresAt]);

  function closeReminder() {
    const reminderKey = `kardb-trial-reminder-${trialExpiresAt}-${trialDay}`;
    localStorage.setItem(reminderKey, "shown");
    setIsOpen(false);
  }

  if (!isOpen) return null;

  const isFinalDay = trialDay === 7;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/40 bg-slate-900 p-7 shadow-2xl">
        <p className="text-sm font-bold text-cyan-400">
          KARDB FREE PREVIEW
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          {isFinalDay
            ? "Your Free Preview Ends Today!"
            : `Your Free Preview Has ${7 - trialDay} Day(s) Left`}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {isFinalDay
            ? "Today is the final day of your KARDB free preview. Explore the available platform features before your access expires."
            : "Continue exploring Market Brief and Economic Intelligence during your KARDB free preview."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={closeReminder}
            className="rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Continue Exploring
          </button>

          <a
            href="/account/subscription"
            className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            View Plans
          </a>
        </div>
      </div>
    </div>
  );
}
