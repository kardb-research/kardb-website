
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Regulatory Information | KARDB",
  description:
    "Review KARDB's regulatory status, investor information, proposed disclosures, grievance information and official SEBI regulatory references.",
  alternates: {
    canonical: "https://kardb.com/regulatory",
  },
  openGraph: {
    title: "Regulatory Information | KARDB",
    description:
      "Access KARDB's regulatory status, investor information and regulatory reference material.",
    url: "https://kardb.com/regulatory",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Regulatory Information | KARDB",
    description:
      "Access KARDB's regulatory status, investor information and regulatory reference material.",
  },
};

const disclosureGroups = [
  {
    title: "Registration and Investor Information",
    description:
      "Information about the platform's status and investor-facing reference material.",
    items: [
      {
        name: "SEBI Registration Status",
        href: "/regulatory/sebi-registration",
        description:
          "Current registration status and information relating to KARDB's regulatory position.",
        status: "Status information",
      },
      {
        name: "Investor Charter",
        href: "/regulatory/investor-charter",
        description:
          "Investor-facing information and the applicable Research Analyst Investor Charter reference.",
        status: "Reference document",
      },
      {
        name: "Investor Complaints",
        href: "/regulatory/complaints",
        description:
          "Information about complaint reporting and the applicable disclosure framework.",
        status: "Disclosure information",
      },
    ],
  },
  {
    title: "Service Terms and Investor Protection",
    description:
      "Information concerning service terms, fees and grievance mechanisms.",
    items: [
      {
        name: "Grievance Redressal",
        href: "/regulatory/grievance",
        description:
          "Complaint-handling information and relevant securities-market grievance channels.",
        status: "Process information",
      },
      {
        name: "Terms and Conditions",
        href: "/regulatory/terms",
        description:
          "Information about the proposed terms governing future platform and research services.",
        status: "Under development",
      },
      {
        name: "Most Important Terms and Conditions",
        href: "/regulatory/mitc",
        description:
          "Reference information concerning the important terms applicable to Research Analyst services.",
        status: "Under development",
      },
      {
        name: "Fee Structure",
        href: "/regulatory/fees",
        description:
          "Information about the fee framework and future service pricing disclosures.",
        status: "Future disclosure",
      },
    ],
  },
  {
    title: "Research Governance and Disclosures",
    description:
      "Information about independence, technology, audit and research-related limitations.",
    items: [
      {
        name: "Conflict of Interest",
        href: "/regulatory/conflict",
        description:
          "Proposed information covering research independence and conflict-related disclosures.",
        status: "Under development",
      },
      {
        name: "AI Disclosure",
        href: "/regulatory/ai-disclosure",
        description:
          "Information about AI-assisted workflows, their limitations and applicable oversight.",
        status: "Under development",
      },
      {
        name: "Compliance Audit",
        href: "/regulatory/audit",
        description:
          "Information concerning the applicable audit framework and future audit disclosures.",
        status: "Applicability to be assessed",
      },
      {
        name: "Disclaimers",
        href: "/regulatory/disclaimers",
        description:
          "Important information about research limitations, market risks and the use of website content.",
        status: "General information",
      },
    ],
  },
];

const officialReferences = [
  {
    title: "SEBI — Research Analysts Regulations, 2014",
    detail: "Official regulations listing; last amended 10 October 2026.",
    href: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&glsId=1&sid=1&ssid=3",
  },
  {
    title: "SEBI — Master Circular for Research Analysts",
    detail: "6 February 2026 · Official circular webpage.",
    href: "https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-research-analysts_99571.html",
  },
  {
    title: "SEBI — Research Analysts Amendment Regulations, 2026",
    detail: "8 October 2026 · Official notification PDF.",
    href: "https://www.sebi.gov.in/web/?file=https%3A%2F%2Fwww.sebi.gov.in%2Fsebi_data%2Fattachdocs%2Foct-2026%2F1791796596784.pdf",
  },
  {
    title: "SEBI — SCORES Portal",
    detail: "Official SEBI Complaint Redress System.",
    href: "https://scores.sebi.gov.in/",
  },
  {
    title: "SEBI — Investor Grievance Guidance",
    detail: "Official guidance on securities-market grievance redressal.",
    href: "https://investor.sebi.gov.in/securities-resolvedispute.html",
  },
  {
    title: "SMART ODR — Online Dispute Resolution",
    detail: "Securities-market online dispute resolution information.",
    href: "https://smartodr.in/",
  },
];

export default function RegulatoryPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* HERO */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            TRANSPARENCY AND GOVERNANCE
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Regulatory Information
            <span className="block text-cyan-400">
              and Disclosures.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            This section provides access to KARDB's regulatory-status
            information, investor-related references and proposed
            disclosure framework. The applicability of individual
            requirements depends on the platform's actual activities
            and regulatory status.
          </p>
        </div>

        {/* REGULATORY STATUS */}
        <div className="mt-12 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7">
          <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
            CURRENT REGULATORY STATUS
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            KARDB is under development.
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            KARDB has not been granted SEBI registration as a
            Research Analyst as of 21 November 2026. The platform
            is under development. KARDB is not currently offering
            paid research subscriptions or regulated Research
            Analyst services.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            The information on this website must not be interpreted
            as confirmation of SEBI registration, regulatory approval
            or completion of applicable compliance requirements.
          </p>

          <Link
            href="/regulatory/sebi-registration"
            className="mt-5 inline-flex text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
          >
            View Registration Status
          </Link>
        </div>

        {/* DISCLOSURE CATEGORIES */}
        <div className="mt-16 space-y-14">
          {disclosureGroups.map((group, index) => (
            <section key={group.title}>
              <div className="mb-6">
                <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                  CATEGORY {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {group.title}
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-white transition group-hover:text-cyan-400">
                        {item.name}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-lg text-cyan-400"
                      >
                        →
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>

                    <p className="mt-5 border-t border-slate-800 pt-4 text-xs font-semibold text-slate-500">
                      {item.status}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* OFFICIAL REFERENCES */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
            OFFICIAL REGULATORY REFERENCES
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Refer to official SEBI publications.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Regulatory requirements may change through amendments,
            circulars and official directions. Consult the official
            publications for the applicable regulatory text.
            KARDB website summaries are not a substitute for those
            publications.
          </p>

          <div className="mt-7 space-y-5">
            {officialReferences.map((reference) => (
              <div key={reference.href}>
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
                >
                  {reference.title}
                </a>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {reference.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMPORTANT INFORMATION */}
        <div className="mt-8 rounded-xl border border-slate-800 p-6">
          <h2 className="text-lg font-bold text-white">
            Important information about this section
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            The pages linked above provide platform information,
            regulatory references and disclosures under development.
            Their presence does not establish that KARDB is a
            registered Research Analyst or that every document
            currently constitutes an operative regulatory disclosure.
            Registration-specific details and applicable operational
            disclosures must be published only after the relevant
            facts and requirements have been verified.
          </p>
        </div>

        <p className="mt-8 text-xs leading-6 text-slate-500">
          Regulatory status stated as of 21 November 2026.
          Information should be reviewed and updated when KARDB's
          activities, regulatory status or applicable requirements change.
        </p>
      </section>
    </PageShell>
  );
}
