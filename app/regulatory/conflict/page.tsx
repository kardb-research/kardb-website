
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Conflict of Interest Policy | KARDB",
  description:
    "Understand the SEBI Research Analyst framework for conflicts of interest, personal trading restrictions, financial interests, compensation and research disclosures.",
  alternates: {
    canonical: "https://kardb.com/regulatory/conflict",
  },
  openGraph: {
    title: "Conflict of Interest Policy | KARDB",
    description:
      "KARDB's preparatory disclosure of the SEBI Research Analyst conflict-of-interest framework.",
    url: "https://kardb.com/regulatory/conflict",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Conflict of Interest Policy | KARDB",
    description:
      "KARDB's preparatory disclosure of the SEBI Research Analyst conflict-of-interest framework.",
  },
};

const linkClass =
  "font-semibold text-cyan-400 underline underline-offset-4";

export default function Page() {
  return (
    <ContentPage
      eyebrow="RESEARCH GOVERNANCE"
      title="Conflict of Interest"
      intro="This page explains the conflict-of-interest management and disclosure framework prescribed for SEBI-registered Research Analysts. It is provided for investor awareness and does not represent that KARDB has implemented or operationalised these controls."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            KARDB is not currently registered with SEBI as a Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted
            SEBI Research Analyst registration. The platform is
            under development and is not currently offering paid
            research subscriptions or regulated Research Analyst
            services.
          </p>
          <p className="mt-3">
            No individual is being represented on this page
            as a SEBI-registered Research Analyst, and no
            operational personal-trading approval process,
            restricted list or compliance monitoring system
            is being claimed.
          </p>
          <p className="mt-3">
            The sections below describe the applicable
            regulatory framework and proposed governance
            areas for review before any future regulated
            research service is commenced.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Identifying and managing conflicts of interest">
        <p>
          Regulation 15 of the SEBI (Research Analysts)
          Regulations, 2014 requires a Research Analyst
          or Research Entity to have written internal
          policies and control procedures governing
          dealings and trading by Research Analysts.
        </p>

        <p className="mt-3">
          These policies and procedures are intended to:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Address actual or potential conflicts arising
            from dealings or trading in securities of
            subject companies.
          </li>
          <li>
            Promote objective and reliable research
            reflecting the unbiased views of the
            Research Analyst.
          </li>
          <li>
            Prevent the use of research reports or
            research analysis to manipulate securities
            markets.
          </li>
          <li>
            Maintain appropriate independence between
            research activities and other business
            activities.
          </li>
        </ul>

        <p className="mt-4">
          Conflict identification, disclosure, escalation
          and mitigation procedures should be documented
          and reviewed as part of the applicable
          compliance framework.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Personal trading restrictions">
        <p>
          Regulation 16 prescribes restrictions on
          personal dealings and trading by independent
          Research Analysts, part-time Research Analysts,
          individuals employed as Research Analysts and
          their associates.
        </p>

        <div className="mt-4 rounded-xl border border-slate-700 p-4">
          <p className="font-semibold text-cyan-400">
            Restricted trading window
          </p>
          <p className="mt-2 text-2xl font-bold">
            30 days before / 5 days after
          </p>
          <p className="mt-2">
            They must not deal or trade in securities
            recommended or followed by the Research
            Analyst during the 30 days before and
            5 days after publication of a research
            report on the subject company.
          </p>
        </div>

        <p className="mt-4 font-semibold">
          Other restrictions include:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            They must not deal or trade directly or
            indirectly in securities reviewed by the
            Research Analyst in a manner contrary to
            the recommendation given.
          </li>
          <li>
            They must not purchase or receive securities
            of an issuer before its IPO where the issuer
            is principally engaged in the same types
            of business as companies followed or
            recommended by the Research Analyst.
          </li>
        </ul>

        <p className="mt-4">
          Personal trading activities of individuals
          employed as Research Analysts by a Research
          Entity must be monitored and recorded and,
          wherever necessary, made subject to a formal
          approval process.
        </p>

        <p className="mt-3">
          Regulation 16 also provides limited
          circumstances in which restrictions under
          sub-regulations (2) to (4) may not apply,
          such as significant news or an unanticipated
          significant change in personal financial
          circumstances, subject to prior written
          approval under the approved internal policies
          and procedures.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Financial interest and beneficial ownership">
        <p>
          Regulation 19 requires disclosures in research
          reports and public appearances concerning
          financial interests, beneficial ownership
          and other material conflicts.
        </p>

        <div className="mt-4 rounded-xl border border-slate-700 p-4">
          <p className="font-semibold text-cyan-400">
            Beneficial ownership threshold
          </p>
          <p className="mt-2 text-3xl font-bold">
            1% or more
          </p>
          <p className="mt-2">
            Actual or beneficial ownership of 1% or
            more of the securities of the subject
            company is a specified disclosure item.
          </p>
        </div>

        <p className="mt-4">
          The relevant disclosure covers whether the
          Research Analyst or Research Entity, its
          associate or relative:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Has any financial interest in the subject
            company and the nature of that interest.
          </li>
          <li>
            Has actual or beneficial ownership of
            1% or more of the subject company's
            securities at the end of the month
            immediately preceding publication of
            the report or the public appearance.
          </li>
          <li>
            Has any other material conflict of
            interest at the time of publication
            or public appearance.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="4. Compensation and benefits from subject companies">
        <p>
          Regulation 19 also prescribes disclosures
          concerning compensation received by the
          Research Analyst or Research Entity and
          its associates.
        </p>

        <p className="mt-3">
          Research reports must disclose, as applicable,
          whether the Research Analyst or Research Entity
          or its associates have:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Received compensation from the subject
            company during the preceding 12 months.
          </li>
          <li>
            Managed or co-managed a public offering
            of securities for the subject company
            during the preceding 12 months.
          </li>
          <li>
            Received compensation for investment
            banking, merchant banking or brokerage
            services from the subject company during
            the preceding 12 months.
          </li>
          <li>
            Received compensation for products or
            services other than investment banking,
            merchant banking or brokerage services
            from the subject company during the
            preceding 12 months.
          </li>
          <li>
            Received compensation or other benefits
            from the subject company or a third party
            in connection with the research report.
          </li>
        </ul>

        <p className="mt-4">
          The regulations contain a limited exception
          where specified disclosures would reveal
          material non-public information regarding
          certain potential future transactions.
          The applicable regulatory wording must
          be followed when determining whether
          that exception applies.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Additional disclosures in public appearances">
        <p>
          Regulation 19 prescribes disclosures for
          public appearances separately from the
          disclosures required in research reports.
        </p>

        <p className="mt-3">
          These include, as applicable:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Whether the Research Analyst or Research
            Entity or its associates received compensation
            from the subject company during the
            preceding 12 months.
          </li>
          <li>
            Whether the subject company is or was
            a client during the 12 months preceding
            the date of distribution of the research
            report, together with the types of services
            provided.
          </li>
          <li>
            Ownership and material-conflict disclosures
            prescribed for public appearances.
          </li>
        </ul>

        <p className="mt-4">
          Regulation 21 also requires applicable
          registration-status and financial-interest
          disclosures when a Research Analyst or
          Research Entity, including its director
          or employee, makes a public appearance.
        </p>
      </InfoBlock>

      <InfoBlock title="6. Analyst compensation and independence">
        <p>
          Regulation 17 addresses compensation
          arrangements for individuals employed
          as Research Analysts by a Research Entity.
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Compensation must not be determined
            or based on any specific merchant banking,
            investment banking or brokerage-services
            transaction.
          </li>
          <li>
            Compensation must be reviewed, documented
            and approved annually by the board of
            directors or its appointed committee,
            as prescribed.
          </li>
          <li>
            The approving board or committee must
            not take into account the Research
            Analyst's contribution to the relevant
            investment banking, merchant banking
            or brokerage-services business.
          </li>
          <li>
            An individual employed as a Research
            Analyst must not be subject to the
            supervision or control of an employee
            of those divisions.
          </li>
        </ul>

        <p className="mt-4">
          Regulation 18 also addresses restrictions
          on communication with certain employees
          and on influence over research coverage
          and recommendations.
        </p>
      </InfoBlock>

      <InfoBlock title="7. Research independence and report distribution">
        <p>
          The regulatory framework requires safeguards
          to preserve the independence and integrity
          of research.
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Research activity should maintain an
            appropriate arms-length relationship
            from other business activities.
          </li>
          <li>
            Research reports must not be promised
            favourable treatment in exchange for
            commencing or influencing a business
            relationship or receiving compensation
            or other benefits.
          </li>
          <li>
            Research reports must not be inconsistent
            with the views of the individuals employed
            as Research Analysts regarding the
            subject company.
          </li>
          <li>
            Research reports must not be selectively
            made available in advance to internal
            trading personnel or particular clients
            or client classes who are not entitled
            to earlier access.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="8. Client interaction records and institutional investors">
        <p>
          Regulation 25(1)(vii) of the SEBI (Research Analysts)
          Regulations, 2014, as amended by the SEBI (Research Analysts)
          (Amendment) Regulations, 2026 dated 8 October 2026, requires
          Research Analysts and Research Entities to maintain records
          of communications with clients. The amendment came into force
          on the thirtieth day from its publication in the Official Gazette.
        </p>

        <p className="mt-3">
          SEBI circular dated 23 October 2026, effective 8 November 2026,
          clarifies the interaction-record requirements and provides that
          call recordings of interactions with institutional investor
          clients are not mandatory. This is a limited relaxation from
          call recording; it is not a general exemption from maintaining
          records of client interactions.
        </p>

        <p className="mt-4 font-semibold">
          The framework requires records of service-related interactions:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            For all clients, including prospective clients before onboarding,
            where a conversation related to the Research Analyst's services
            has taken place.
          </li>
          <li>
            From the first interaction with the client until completion of
            research services to that client.
          </li>
          <li>
            In an appropriate legally verifiable form, such as a physical
            record written and signed by the client, call recording, email
            from the registered email ID, SMS record or another legally
            verifiable record.
          </li>
          <li>
            For five years. Where a dispute has been raised, the records
            must be retained until resolution of the dispute; where SEBI
            requires specific records to be preserved, they must be kept
            until further intimation from SEBI.
          </li>
        </ul>

        <p className="mt-4">
          The interaction-record requirement applies to fee-paying as well
          as non-fee-paying clients. The institutional-investor relaxation
          is specifically that call recordings are not mandatory; other
          legally verifiable records of interactions continue to be relevant.
          The circular also clarifies that a separate call recording is not
          required where the interaction takes place through a channel such
          as email that already provides a digital footprint.
        </p>

        <p className="mt-4 text-sm text-slate-400">
          These requirements are presented as part of the regulatory
          framework for registered Research Analysts and Research Entities.
          KARDB is not claiming that it currently provides regulated
          research services or has operationalised these record-keeping
          controls.
        </p>
      </InfoBlock>

      <InfoBlock title="9. Proposed KARDB governance controls">
        <p>
          Before any future regulated research
          service is commenced, the applicable
          internal policies and operational controls
          will need to be established, documented
          and reviewed.
        </p>

        <p className="mt-3 font-semibold">
          Areas for implementation and verification:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Written conflict-of-interest policy
            and escalation procedure.
          </li>
          <li>
            Identification and disclosure of
            relevant financial interests and
            beneficial ownership.
          </li>
          <li>
            Personal-trading monitoring, records
            and pre-clearance where required.
          </li>
          <li>
            Restricted securities and report
            publication controls, where applicable.
          </li>
          <li>
            Review of compensation and commercial
            relationships involving subject companies.
          </li>
          <li>
            Research independence and separation
            safeguards.
          </li>
          <li>
            Conflict disclosures in research
            reports and public appearances.
          </li>
          <li>
            Record keeping and periodic compliance
            review.
          </li>
        </ul>

        <p className="mt-4 text-sm text-slate-400">
          This is a proposed implementation checklist.
          It is not a statement that these controls,
          registers, approvals or monitoring systems
          are currently operational at KARDB.
        </p>
      </InfoBlock>

      <InfoBlock title="10. Important clarification">
        <p>
          This page is an informational presentation
          of the SEBI Research Analyst conflict-of-interest
          framework.
        </p>

        <p className="mt-3">
          As of 21 November 2026, KARDB has not been
          granted SEBI Research Analyst registration.
          No registration, regulatory approval or
          operational compliance status is being
          claimed through this page.
        </p>

        <p className="mt-3">
          Any future conflict policy, research-report
          disclosure process and personal-trading
          controls will be finalised against the
          applicable regulations and directions
          before regulated services commence.
        </p>

        <p className="mt-4">
          <a
            href="/regulatory/sebi-registration"
            className={linkClass}
          >
            View KARDB's SEBI Registration Status
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="11. Official regulatory references">
        <p>
          The principal regulatory references for
          this framework include:
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/sebi_data/commondocs/RESEARCHANALYSTS-regulations_p.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI (Research Analysts) Regulations, 2014
          </a>
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Relevant provisions: Regulations 15, 16,
          17, 18, 19, 21, 22 and 24.
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI Research Analysts Master Circular — 6 February 2026
          </a>
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/web/?file=https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1791796596784.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI (Research Analysts) (Amendment) Regulations, 2026 — 8 October 2026
          </a>
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/web/?file=https://www.sebi.gov.in/sebi_data/attachdocs/oct-2026/1792753022042.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI Circular on institutional client interaction records — 23 October 2026
          </a>
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/sebi_data/attachdocs/jul-2025/1753268710217.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI FAQs on Research Analyst Regulations — July 2025
          </a>
        </p>

        <p className="mt-5 text-sm text-slate-400">
          This page is an informational and preparatory
          disclosure, not a substitute for the applicable
          regulations, internal policies, compliance
          procedures or professional legal advice.
          Applicable laws, regulations, circulars and
          directions prevail.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
