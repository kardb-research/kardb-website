import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Compliance Audit Disclosure",
  description:
    "KARDB's compliance audit disclosure explains the annual SEBI Research Analyst audit framework, reporting timelines, audit findings and public disclosures.",
  alternates: {
    canonical: "https://kardb.com/regulatory/audit",
  },
  openGraph: {
    title: "Compliance Audit Disclosure | KARDB",
    description:
      "Understand the annual compliance audit and disclosure framework applicable to SEBI-registered Research Analysts.",
    url: "https://kardb.com/regulatory/audit",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compliance Audit Disclosure | KARDB",
    description:
      "Understand the annual compliance audit and disclosure framework applicable to SEBI-registered Research Analysts.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="REGULATORY COMPLIANCE"
      title="Compliance Audit Disclosure"
      intro="This page explains the annual compliance-audit framework applicable to SEBI-registered Research Analysts and Research Entities. KARDB's own audit status will be published only when an applicable audit has actually been completed."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="font-semibold text-amber-400">
            KARDB is not currently registered with SEBI as a Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted SEBI Research
            Analyst registration. The platform is under development and is
            not currently offering paid research subscriptions or regulated
            Research Analyst services.
          </p>
          <p className="mt-3">
            No annual Research Analyst compliance audit is being claimed as
            completed, and no audit certificate or audit report is being
            represented on this page.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Annual compliance audit requirement">
        <p>
          Regulation 25(3) of the SEBI (Research Analysts) Regulations, 2014
          requires a Research Analyst or Research Entity to conduct an annual
          audit relating to compliance with the applicable Research Analyst
          Regulations.
        </p>
        <p className="mt-4">
          The audit covers the applicable regulatory provisions, circulars
          and guidelines governing Research Analyst activities.
        </p>
        <p className="mt-4">
          The compliance audit report is expected to specify the provisions
          against which compliance has been examined and reported.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Who may conduct the audit">
        <p>
          Under the SEBI framework, the annual compliance audit may be
          conducted by an eligible member of:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Institute of Chartered Accountants of India (ICAI).
          </li>
          <li>
            Institute of Company Secretaries of India (ICSI).
          </li>
          <li>
            Institute of Cost Accountants of India (ICMAI).
          </li>
        </ul>
        <p className="mt-4">
          The recognition of ICMAI members was clarified by SEBI circular
          dated 25 March 2026. The eligibility and applicable requirements
          must be verified when an audit is arranged.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Annual audit and submission timelines">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 p-4">
            <p className="text-sm font-semibold text-cyan-400">
              Audit completion
            </p>
            <p className="mt-2 text-xl font-bold">
              Within 6 months
            </p>
            <p className="mt-2 text-sm text-slate-400">
              From the end of the relevant financial year.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 p-4">
            <p className="text-sm font-semibold text-cyan-400">
              Report submission
            </p>
            <p className="mt-2 text-xl font-bold">
              Within 1 month
            </p>
            <p className="mt-2 text-sm text-slate-400">
              From the date of the audit report, to RAASB/SEBI as applicable.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The audit must be completed within six months from the end of each
          financial year. The compliance audit report must then be submitted
          to RAASB/SEBI within one month from the date of the audit report.
        </p>
        <p className="mt-4">
          Adverse audit findings, if any, together with the action taken and
          the approval required under the applicable framework, must also be
          submitted within one month from the date of the audit report, but
          not later than 31 October of each year for the previous financial
          year.
        </p>
      </InfoBlock>

      <InfoBlock title="4. Adverse findings and corrective action">
        <p>
          Where an audit identifies adverse findings, the Research Analyst
          or Research Entity must submit the findings together with the
          action taken. The submission must be duly approved by the individual
          Research Analyst or, for a non-individual Research Analyst or
          Research Entity, its management, as applicable.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Findings and corrective action must be appropriately documented.
          </li>
          <li>
            The action taken must receive the approval required under the
            applicable framework.
          </li>
          <li>
            The adverse findings and action taken must be submitted to
            RAASB/SEBI within one month from the date of the audit report,
            subject to the outer deadline of 31 October each year for the
            previous financial year.
          </li>
          <li>
            The relevant audit status, adverse findings and action taken
            must be published on the website as applicable.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="5. Client-level segregation certificate">
        <p>
          The annual audit framework also requires an annual certificate
          confirming compliance with client-level segregation requirements.
        </p>
        <p className="mt-4">
          The certificate must be maintained on record and form part of
          the compliance audit, in accordance with the applicable SEBI
          requirements.
        </p>
      </InfoBlock>

      <InfoBlock title="6. Website disclosure and client access">
        <p>
          Under the applicable framework, a registered Research Analyst
          or Research Entity is required to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Publish the status of its annual compliance audit report on
            its website.
          </li>
          <li>
            Publish adverse audit findings, if any, together with the
            action taken.
          </li>
          <li>
            Provide the compliance audit report to its clients.
          </li>
        </ul>
        <p className="mt-4">
          Any future KARDB disclosure will identify the relevant financial
          year, audit status and applicable findings without implying
          that an audit has been completed when it has not.
        </p>
      </InfoBlock>

      <InfoBlock title="7. KARDB audit disclosure status">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="py-3 pr-4 text-slate-400">
                  SEBI Research Analyst registration
                </td>
                <td className="py-3 font-medium">
                  Not granted
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-3 pr-4 text-slate-400">
                  Annual compliance audit
                </td>
                <td className="py-3 font-medium">
                  Not applicable at present
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-3 pr-4 text-slate-400">
                  Audit report
                </td>
                <td className="py-3 font-medium">
                  Not available
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-slate-400">
                  Adverse findings and action taken
                </td>
                <td className="py-3 font-medium">
                  No audit findings represented
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          These entries describe KARDB's present pre-registration status.
          They are not an audit opinion, certificate or confirmation of
          regulatory compliance.
        </p>
      </InfoBlock>

      <InfoBlock title="8. Important clarification">
        <p>
          This page is an informational explanation of the regulatory
          audit framework. It does not represent that KARDB has obtained
          SEBI registration, completed an annual compliance audit or
          received an independent compliance certification.
        </p>
        <p className="mt-4">
          Any future audit disclosure will be updated using the actual
          audit report and applicable regulatory submissions.
        </p>
        <a
          href="/regulatory/sebi-registration"
          className="mt-4 inline-block font-semibold text-cyan-400 underline underline-offset-4"
        >
          View KARDB's SEBI Registration Status
        </a>
      </InfoBlock>

      <InfoBlock title="9. Official regulatory references">
        <div className="space-y-4">
          <div>
            <a
              href="https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 underline underline-offset-4"
            >
              SEBI Research Analysts Master Circular — 6 February 2026
            </a>
            <p className="mt-2 text-sm text-slate-400">
              Paragraph 1.14 — Compliance audit requirements, including
              audit completion, report submission, adverse findings,
              client-level segregation certificate and website disclosure.
            </p>
          </div>
          <div>
            <a
              href="https://www.sebi.gov.in/legal/circulars/mar-2026/clarification-regarding-eligibility-of-members-of-the-institute-of-cost-accountants-of-india-to-conduct-annual-audit-of-research-analysts_100565.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 underline underline-offset-4"
            >
              SEBI clarification on ICMAI audit eligibility — 25 March 2026
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Applicable SEBI Regulations, subsequent amendments, circulars
          and directions prevail over this informational summary.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
