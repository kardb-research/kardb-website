import PageShell from "@/components/PageShell";

const reports = [
  ["Sample Research Report", "Company Research", "Coming soon"],
  ["Sample Sector Report", "Industry Research", "Coming soon"],
  ["Sample Technical Research", "Technical Analysis", "Coming soon"],
];

export default function ReportsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">RESEARCH REPORTS</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Research, organised.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Published reports will appear here with research date, category and access level.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reports.map(([title, type, status]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{type}</span>
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm text-slate-500">{status}</p>
              <button disabled className="mt-7 w-full rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-500">
                Report unavailable
              </button>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
