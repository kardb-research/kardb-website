import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="text-xl font-black text-white">
            KARDB<span className="text-cyan-400">.</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Structured research focused on business, financials, ratios, peers,
            industry context and market behaviour.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Platform</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <Link className="block hover:text-cyan-400" href="/research">Research</Link>
            <Link className="block hover:text-cyan-400" href="/reports">Research Reports</Link>
            <Link className="block hover:text-cyan-400" href="/methodology">Methodology</Link>
            <Link className="block hover:text-cyan-400" href="/pricing">Pricing</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Resources</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <Link className="block hover:text-cyan-400" href="/about">About</Link>
            <Link className="block hover:text-cyan-400" href="/faq">FAQ</Link>
            <Link className="block hover:text-cyan-400" href="/account/login">Login</Link>
            <Link className="block hover:text-cyan-400" href="/account/register">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Regulatory</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <Link className="block hover:text-cyan-400" href="/regulatory">Regulatory Disclosures</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/investor-charter">Investor Charter</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/complaints">Investor Complaints</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/grievance">Grievance Redressal</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/terms">Terms & Conditions</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/mitc">MITC</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/fees">Fee Structure</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/conflict">Conflict of Interest</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/ai-disclosure">AI Disclosure</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/audit">Compliance Audit</Link>
            <Link className="block hover:text-cyan-400" href="/regulatory/disclaimers">Disclaimers</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} KARDB. All rights reserved.
      </div>
    </footer>
  );
}
