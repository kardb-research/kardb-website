
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Grievance Redressal | KARDB",
  description:
    "Understand the SEBI SCORES 2.0 grievance process, review timelines and SMART ODR mechanism, along with KARDB's current registration status.",
  alternates: {
    canonical: "https://kardb.com/regulatory/grievance",
  },
  openGraph: {
    title: "Grievance Redressal | KARDB",
    description:
      "SEBI SCORES 2.0, investor grievance escalation and SMART ODR information, with KARDB's current registration disclosure.",
    url: "https://kardb.com/regulatory/grievance",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Grievance Redressal | KARDB",
    description:
      "Investor grievance redressal information and KARDB's current registration status.",
  },
};

const linkClass =
  "font-semibold text-cyan-400 underline underline-offset-4";

export default function Page() {
  return (
    <ContentPage
      eyebrow="GRIEVANCE REDRESSAL"
      title="Grievance Redressal"
      intro="This page explains the grievance redressal framework applicable to SEBI-registered Research Analysts, including direct complaints, SCORES 2.0 and the SMART ODR mechanism."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            KARDB is not currently registered as a SEBI Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted
            SEBI Research Analyst registration. The platform is
            under development and is not currently offering paid
            research subscriptions or regulated Research Analyst
            services.
          </p>
          <p className="mt-3">
            No registered grievance officer, compliance officer,
            official complaint email address or operational
            grievance channel is being represented on this page.
          </p>
          <p className="mt-3">
            The procedures below explain the regulatory framework
            for investor awareness. They should not be interpreted
            as confirmation that KARDB is currently operating as
            a registered intermediary.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. First approach — concerned Research Analyst">
        <p>
          Under the prescribed investor grievance framework, an
          investor should first approach the concerned Research
          Analyst through its designated complaint or grievance
          channel.
        </p>
        <p className="mt-3">
          The complaint should clearly explain the issue and
          include relevant supporting documents, correspondence
          and other information needed to review the matter.
        </p>
        <p className="mt-3">
          A Research Analyst is expected to endeavour to resolve
          an investor grievance immediately and no later than
          21 days from receipt of the grievance.
        </p>
        <p className="mt-3">
          KARDB has not published an operational registered
          Research Analyst grievance contact because its
          registration has not been granted.
        </p>
      </InfoBlock>

      <InfoBlock title="2. SEBI SCORES 2.0 — lodging and tracking complaints">
        <p>
          SCORES (SEBI Complaints Redress System) is SEBI's
          online platform for lodging and tracking eligible
          complaints against SEBI-regulated entities and
          securities-market participants.
        </p>
        <p className="mt-3">
          Investors can use the portal to submit a complaint,
          upload supporting documents, track its status and
          review the Action Taken Report (ATR).
        </p>
        <p className="mt-4">
          <a
            href="https://scores.sebi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Open SEBI SCORES 2.0
          </a>
        </p>
        <p className="mt-3">
          <a
            href="https://scores.sebi.gov.in/faqs"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Read official SCORES 2.0 FAQs
          </a>
        </p>
        <p className="mt-4">
          Investors should select the correct regulated entity
          and complaint category when filing. SCORES is not a
          general-purpose complaint portal for every website
          or business.
        </p>
      </InfoBlock>

      <InfoBlock title="3. SCORES 2.0 — two-level review mechanism">
        <p>
          The SCORES 2.0 process provides two levels of review
          if an investor is not satisfied with the Action Taken
          Report.
        </p>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-slate-700 p-4">
            <p className="font-semibold text-cyan-400">
              Initial entity response
            </p>
            <p className="mt-2">
              The concerned entity is required to submit its
              Action Taken Report to the investor within
              21 calendar days of receipt of the complaint
              on SCORES.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 p-4">
            <p className="font-semibold text-cyan-400">
              First-level review — Designated Body
            </p>
            <p className="mt-2">
              If the investor is dissatisfied with the entity's
              ATR, the investor may seek a first-level review
              within 15 calendar days of receiving that ATR.
            </p>
            <p className="mt-2">
              The designated body, such as RAASB for Research
              Analysts, handles the first-level review. Its
              prescribed ATR timeline is 10 calendar days.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 p-4">
            <p className="font-semibold text-cyan-400">
              Second-level review — SEBI
            </p>
            <p className="mt-2">
              If the investor remains dissatisfied with the
              designated body's ATR, a second-level review
              may be requested within 15 calendar days of
              receiving that ATR.
            </p>
            <p className="mt-2">
              SEBI handles the second-level review under
              the SCORES framework.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          The 15-day review windows and ATR timelines are
          governed by the applicable SCORES 2.0 process.
          Investors should check the latest portal instructions
          and their complaint's action history.
        </p>
      </InfoBlock>

      <InfoBlock title="4. SMART ODR — online dispute resolution">
        <p>
          SMART ODR is the securities-market Online Dispute
          Resolution mechanism for eligible disputes involving
          investors or clients and specified regulated entities.
        </p>
        <p className="mt-3">
          The framework provides for online dispute resolution
          through the following stages:
        </p>

        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li>
            <strong>Pre-conciliation:</strong> The relevant
            Market Infrastructure Institution reviews the
            matter and endeavours to facilitate resolution
            between the investor and market participant.
          </li>
          <li>
            <strong>Conciliation:</strong> If the matter is
            not resolved amicably, it may proceed to
            conciliation through an independent conciliator.
          </li>
          <li>
            <strong>Arbitration:</strong> If conciliation
            is unsuccessful, the investor may request
            arbitration under the applicable framework.
          </li>
        </ul>

        <p className="mt-4">
          The applicable framework prescribes timelines for
          these stages, including 21 days for the initial
          resolution effort, 21 days for conciliation
          (extendable by 10 days with the parties' consent),
          and 30 days for arbitration (extendable by
          30 days with consent).
        </p>

        <p className="mt-4">
          <a
            href="https://smartodr.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Open SMART ODR portal
          </a>
        </p>

        <p className="mt-3">
          <a
            href="https://investor.sebi.gov.in/smart_orr.html"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Read SEBI's SMART ODR investor guidance
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="5. Important points for investors">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            Preserve complaint reference numbers, emails,
            payment records and supporting documents.
          </li>
          <li>
            Clearly describe the issue and the resolution
            being requested.
          </li>
          <li>
            Use the correct entity name and complaint
            category when filing on SCORES.
          </li>
          <li>
            Monitor the Action Taken Report and applicable
            review deadlines.
          </li>
          <li>
            Do not share passwords, OTPs or trading and
            demat account credentials with anyone claiming
            to resolve a grievance.
          </li>
          <li>
            Refer to the official SEBI and SMART ODR
            instructions for eligibility, procedures and
            applicable costs.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="6. Official regulatory references">
        <div className="space-y-3">
          <p>
            <a
              href="https://scores.sebi.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              SEBI SCORES 2.0 portal
            </a>
          </p>
          <p>
            <a
              href="https://scores.sebi.gov.in/faqs"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              SCORES 2.0 FAQs and process
            </a>
          </p>
          <p>
            <a
              href="https://www.sebi.gov.in/legal/circulars/sep-2023/redressal-of-investor-grievances-through-the-sebi-complaint-redressal-scores-platform-and-linking-it-to-online-dispute-resolution-platform_77159.html"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              SEBI circular on SCORES and ODR linkage
            </a>
          </p>
          <p>
            <a
              href="https://www.sebi.gov.in/sebi_data/attachdocs/may-2025/1747210157307.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              SEBI circular on ODR procedure dated May 2025
            </a>
          </p>
          <p>
            <a
              href="https://smartodr.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              SMART ODR portal
            </a>
          </p>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          This page is an informational summary of the
          regulatory framework. The applicable SEBI regulations,
          circulars, portal instructions and amendments prevail
          over this summary. This page does not represent
          registration, regulatory approval or operational
          grievance-redressal capability on the part of KARDB.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
