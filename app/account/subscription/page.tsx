import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function SubscriptionPage() {
  return <PageShell><section className="mx-auto max-w-5xl px-6 py-20">
    <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">ACCOUNT</p>
    <h1 className="mt-4 text-4xl font-black">My Subscription</h1>
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
      <p className="text-sm text-slate-500">CURRENT PLAN</p>
      <h2 className="mt-2 text-2xl font-bold">Free</h2>
      <p className="mt-2 text-slate-400">No active paid subscription.</p>
      <Link href="/pricing" className="mt-7 inline-block rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950">View Plans</Link>
    </div>
  </section></PageShell>;
}
