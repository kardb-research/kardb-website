
import Link from "next/link";

export default function SiteFooter() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/kardb.research/",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/deepak-bhandari-75545b447/",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@kardb.research",
    },
  ];

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-5">

        {/* Brand */}
        <div>
          <div className="text-xl font-black text-white">
            KARDB<span className="text-cyan-400">.</span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Structured research focused on business, financials, ratios, peers,
            industry context and market behaviour.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold text-white">Platform</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <Link className="block hover:text-cyan-400" href="/research">Research</Link>
            <Link className="block hover:text-cyan-400" href="/reports">Research Reports</Link>
            <Link className="block hover:text-cyan-400" href="/methodology">Methodology</Link>
            <Link className="block hover:text-cyan-400" href="/pricing">Pricing</Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-white">Resources</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <Link className="block hover:text-cyan-400" href="/about">About</Link>
            <Link className="block hover:text-cyan-400" href="/faq">FAQ</Link>
            <Link className="block hover:text-cyan-400" href="/account/login">Login</Link>
            <Link className="block hover:text-cyan-400" href="/account/register">Register</Link>
          </div>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white">Follow KARDB</h3>

          <div className="mt-4 space-y-4 text-sm text-slate-400">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/kardb.research/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-pink-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
              </svg>
              <span>Instagram ↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/deepak-bhandari-75545b447/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.5h3.6V21H3.4V9.5Zm5.8 0h3.4v1.6h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.25 2.35 4.25 5.4V21h-3.6v-5.62c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H9.2V9.5Z" />
              </svg>
              <span>LinkedIn ↗</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@kardb.research"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
              <span>YouTube ↗</span>
            </a>

          </div>
        </div>

       
        {/* Regulatory */}
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
