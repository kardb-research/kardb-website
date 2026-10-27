import Link from "next/link";
import PageShell from "@/components/PageShell";

const items = [
  ["SEBI Registration", "/regulatory/sebi-registration"],
  ["Investor Charter", "/regulatory/investor-charter"],
  ["Investor Complaints", "/regulatory/complaints"],
  ["Grievance Redressal", "/regulatory/grievance"],
  ["Terms & Conditions", "/regulatory/terms"],
  ["MITC", "/regulatory/mitc"],
  ["Fee Structure", "/regulatory/fees"],
  ["Conflict of Interest", "/regulatory/conflict"],
  ["AI Disclosure", "/regulatory/ai-disclosure"],
  ["Compliance Audit", "/regulatory/audit"],
  ["Disclaimers", "/regulatory/disclaimers"],
];

export default function RegulatoryPage() {
  return <PageShell><section className="mx-auto max-w-7xl px-6 py-20">
    <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">REGULATORY</p>
    <h1 className="mt-4 text-4xl font-black md:text-6xl">Regulatory Disclosures</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">A central location for applicable regulatory, investor and service disclosures.</p>
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([name, href]) => <Link key={href} href={href} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 font-semibold hover:border-cyan-400/50 hover:text-cyan-400">{name}<span className="float-right">→</span></Link>)}
    </div>
    <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-sm leading-6 text-slate-400">
      <strong className="text-amber-300">Development status:</strong> Registration-specific fields are intentionally not populated with invented information. Actual registration number, registered name, officers, addresses and other regulated disclosures must be inserted only after the applicable status is confirmed.
    </div>
  </section></PageShell>;
}
