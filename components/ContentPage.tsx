import PageShell from "@/components/PageShell";

export default function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">{intro}</p>
        <div className="mt-10 space-y-6">{children}</div>
      </section>
    </PageShell>
  );
}

export function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}
