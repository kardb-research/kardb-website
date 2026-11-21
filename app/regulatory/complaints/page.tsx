
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Investor Complaints | KARDB",
  description:
    "KARDB's investor complaint disclosure status and preparatory reporting framework based on Annexure E of the SEBI Research Analysts Master Circular dated 6 February 2026.",
  alternates: {
    canonical: "https://kardb.com/regulatory/complaints",
  },
  openGraph: {
    title: "Investor Complaints | KARDB",
    description:
      "View KARDB's current complaint disclosure status and the prescribed SEBI reporting framework.",
    url: "https://kardb.com/regulatory/complaints",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Investor Complaints | KARDB",
    description:
      "KARDB's complaint disclosure status and regulatory reporting framework.",
  },
};

const tableClass =
  "w-full min-w-[900px] text-left text-sm";

const headClass =
  "border-b border-slate-700 text-slate-300";

const cellClass =
  "border-b border-slate-800 px-3 py-3 align-top";

const naClass =
  "px-3 py-3 text-slate-400";

export default function Page() {
  return (
    <ContentPage
      eyebrow="INVESTOR PROTECTION"
      title="Investor Complaints"
      intro="This page explains KARDB's current complaint disclosure status and the complaint reporting framework prescribed for registered Research Analysts under SEBI's applicable regulatory requirements."
    >
      <InfoBlock title="Current status — KARDB">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            Complaint statistics are not currently applicable.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted
            SEBI registration as a Research Analyst. The platform
            is under development and is not currently offering paid
            research subscriptions or regulated Research Analyst
            services.
          </p>
          <p className="mt-3">
            Accordingly, this page does not report any registered
            Research Analyst complaint statistics. No zero-complaint
            figures or nil complaint performance are being claimed.
          </p>
          <p className="mt-3">
            The reporting tables below are provided as a
            preparatory reference and will be populated only when
            applicable, using verified complaint records.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Monthly investor complaint data">
        <p className="mb-4">
          Prescribed reporting format — Annexure E of the SEBI
          Research Analysts Master Circular dated 6 February 2026.
        </p>

        <p className="mb-3 font-semibold">
          Data for the month ending: Not applicable at present
        </p>

        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className={headClass}>
              <tr>
                <th className="px-3 py-3">Sr. No.</th>
                <th className="px-3 py-3">Received from</th>
                <th className="px-3 py-3">
                  Pending at end of last month
                </th>
                <th className="px-3 py-3">Received</th>
                <th className="px-3 py-3">Resolved*</th>
                <th className="px-3 py-3">Total pending#</th>
                <th className="px-3 py-3">
                  Pending complaints over 3 months
                </th>
                <th className="px-3 py-3">
                  Average resolution time (days)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                "Directly from investors",
                "SEBI (SCORES)",
                "Other sources (if any)",
                "Grand Total",
              ].map((source, index) => (
                <tr key={source}>
                  <td className={cellClass}>
                    {index === 3 ? "—" : index + 1}
                  </td>
                  <td className={cellClass}>
                    <strong>{source}</strong>
                  </td>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <td key={i} className={naClass}>
                      N/A
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5">
          <strong>Impersonation complaints:</strong> Not applicable
          at present. No registered Research Analyst complaint
          reporting period is being represented.
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <p>
            * Resolved includes complaints of previous months
            resolved in the current month.
          </p>
          <p>
            # Total pending includes complaints pending as on the
            last day of the month.
          </p>
          <p>
            Average resolution time is the sum total of time taken
            to resolve each complaint, in days, in the current
            month divided by the total number of complaints
            resolved in the current month.
          </p>
          <p>
            The prescribed framework permits adjustment of
            impersonation-related complaints from total received
            and resolved figures, subject to the applicable SEBI
            and RAASB process.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="2. Trend of monthly disposal of complaints">
        <p className="mb-4">
          The prescribed format tracks complaints carried forward,
          received, resolved and pending for each month of the
          financial year.
        </p>

        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className={headClass}>
              <tr>
                <th className="px-3 py-3">Sr. No.</th>
                <th className="px-3 py-3">Month</th>
                <th className="px-3 py-3">
                  Carried forward from previous month
                </th>
                <th className="px-3 py-3">Received</th>
                <th className="px-3 py-3">Resolved*</th>
                <th className="px-3 py-3">Pending#</th>
              </tr>
            </thead>
            <tbody>
              {[
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
                "January",
                "February",
                "March",
              ].map((month, index) => (
                <tr key={month}>
                  <td className={cellClass}>{index + 1}</td>
                  <td className={cellClass}>{month}</td>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <td key={i} className={naClass}>
                      N/A
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className={cellClass}>—</td>
                <td className={cellClass}>
                  <strong>Grand Total</strong>
                </td>
                {Array.from({ length: 4 }).map((_, i) => (
                  <td key={i} className={naClass}>
                    N/A
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <p>
            * Resolved includes complaints of previous months
            resolved in the current month.
          </p>
          <p>
            # Pending includes complaints pending as on the last
            day of the month.
          </p>
          <p>
            Monthly trend figures will be published only for
            applicable reporting periods after operations begin.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="3. Trend of annual disposal of complaints">
        <p className="mb-4">
          The annual trend format tracks complaints carried forward
          from the previous financial year, received, resolved
          and pending.
        </p>

        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className={headClass}>
              <tr>
                <th className="px-3 py-3">Sr. No.</th>
                <th className="px-3 py-3">Financial year</th>
                <th className="px-3 py-3">
                  Carried forward from previous year
                </th>
                <th className="px-3 py-3">Received</th>
                <th className="px-3 py-3">Resolved*</th>
                <th className="px-3 py-3">Pending#</th>
              </tr>
            </thead>
            <tbody>
              {[
                "2021-22",
                "2022-23",
                "2023-24",
                "2024-25",
                "2025-26",
                "2026-27",
              ].map((year, index) => (
                <tr key={year}>
                  <td className={cellClass}>{index + 1}</td>
                  <td className={cellClass}>{year}</td>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <td key={i} className={naClass}>
                      N/A
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className={cellClass}>—</td>
                <td className={cellClass}>
                  <strong>Grand Total</strong>
                </td>
                {Array.from({ length: 4 }).map((_, i) => (
                  <td key={i} className={naClass}>
                    N/A
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <p>
            * Resolved includes complaints of previous years
            resolved in the current year.
          </p>
          <p>
            # Pending includes complaints pending as on the last
            day of the year.
          </p>
          <p>
            Historical periods before KARDB's applicable
            registration and operations will not be represented
            as KARDB complaint performance.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="4. Disclosure frequency and reporting process">
        <p>
          Under paragraph 7.3 of the SEBI Research Analysts Master
          Circular dated 6 February 2026, registered Research
          Analysts are required to disclose complaint data on
          their websites and mobile applications, if any, latest
          by the 7th day of the succeeding month, in the format
          prescribed in Annexure E.
        </p>
        <p className="mt-4">
          Once applicable, KARDB's reporting process will use
          verified complaint records, source-wise classification,
          opening and closing balances, resolution dates and
          the prescribed monthly and annual summaries.
        </p>
        <p className="mt-4">
          No reporting timeline or operational compliance is
          being claimed for KARDB at its current pre-registration
          stage.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Official regulatory reference">
        <p>
          The reporting framework on this page is based on
          paragraph 7.3 and Annexure E of the SEBI Master Circular
          for Research Analysts dated 6 February 2026.
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-research-analysts_99571.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            View SEBI Research Analysts Master Circular
          </a>
        </p>
        <p className="mt-4 text-sm">
          This page is a preparatory disclosure framework. It
          does not represent SEBI registration, regulatory
          approval, actual complaint statistics, or confirmation
          that KARDB has implemented every applicable regulatory
          requirement.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
