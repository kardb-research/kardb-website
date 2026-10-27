import PageShell from "@/components/PageShell";

const steps = [
  ["01", "Data", "Collect relevant company, financial, peer, industry and market data."],
  ["02", "Analysis", "Examine growth, profitability, cash flow, balance sheet and operating efficiency."],
  ["03", "Comparison", "Benchmark the company against relevant peers and historical performance."],
  ["04", "Interpretation", "Convert numbers into business and market context rather than simply displaying metrics."],
  ["05", "Research Output", "Present the findings in a structured, readable research format."],
];

export default function MethodologyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">METHODOLOGY</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black md:text-6xl">From data to structured research.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          KARDB is designed around analysis and interpretation, not simply displaying raw market numbers.
        </p>

        <div className="mt-14 space-y-4">
          {steps.map(([num, title, text]) => (
            <div key={num} className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-7 md:grid-cols-[80px_220px_1fr]">
              <div className="text-cyan-400 font-bold">{num}</div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
