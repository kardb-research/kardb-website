import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">ABOUT KARDB</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Research the business. Understand the numbers.</h1>
        <p className="mt-7 text-lg leading-8 text-slate-400">
          KARDB is being designed as a structured research platform focused on turning
          financial and market information into understandable research.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            ["Research over noise", "Focus on structured analysis rather than a stream of disconnected market numbers."],
            ["Numbers with context", "Financial metrics become more useful when viewed through peers, industry and history."],
            ["Transparent methodology", "The research framework is designed to make the analytical process understandable."],
            ["Clear communication", "Reports should help readers understand what the numbers say and what they do not say."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
