
"use client";

import { useEffect, useState } from "react";

export default function TrialReminder({
  trialExpiresAt,
}: {
  trialExpiresAt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const expiryTime = new Date(trialExpiresAt).getTime();
    const now = Date.now();

    if (!Number.isFinite(expiryTime) || expiryTime <= now) return;

    const remainingMs = expiryTime - now;
    const remainingDays = Math.ceil(
      remainingMs / (24 * 60 * 60 * 1000)
    );

    // Show reminders only during the final 7 days.
    if (remainingDays > 7 || remainingDays < 1) return;

    const reminderKey = `kardb-trial-reminder-${trialExpiresAt}-${remainingDays}`;

    if (localStorage.getItem(reminderKey)) return;

    setDaysLeft(remainingDays);
    setIsOpen(true);
  }, [trialExpiresAt]);

  function closeReminder() {
    const reminderKey = `kardb-trial-reminder-${trialExpiresAt}-${daysLeft}`;
    localStorage.setItem(reminderKey, "shown");
    setIsOpen(false);
  }

  if (!isOpen) return null;

  const isFinalDay = daysLeft === 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/40 bg-slate-900 p-7 shadow-2xl">
        <p className="text-sm font-bold text-cyan-400">
          KARDB 30-DAY FREE PREVIEW
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          {isFinalDay
            ? "Your Free Preview Ends Today!"
            : `Your Free Preview Has ${daysLeft} Day(s) Left`}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {isFinalDay
            ? "Today is the final day of your KARDB free preview. Your preview access will expire at the displayed expiry time."
            : "Your KARDB free preview is nearing its end. Continue exploring Market Brief and Economic Intelligence, or review the available subscription plans."}
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
