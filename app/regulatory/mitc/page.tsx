
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Most Important Terms & Conditions (MITC) | KARDB",
  description:
    "KARDB's preparatory MITC disclosure covering research services, fee limits, advance fees, refunds, payment methods, conflicts of interest and investment risks.",
  alternates: {
    canonical: "https://kardb.com/regulatory/mitc",
  },
  openGraph: {
    title: "Most Important Terms & Conditions (MITC) | KARDB",
    description:
      "Review the SEBI Research Analyst MITC framework and KARDB's current registration status.",
    url: "https://kardb.com/regulatory/mitc",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Most Important Terms & Conditions (MITC) | KARDB",
    description:
      "KARDB's preparatory MITC disclosure and current regulatory status.",
  },
};

const linkClass =
  "font-semibold text-cyan-400 underline underline-offset-4";

export default function Page() {
  return (
    <ContentPage
      eyebrow="INVESTOR TERMS"
      title="Most Important Terms & Conditions"
      intro="This page presents the MITC framework prescribed for SEBI-registered Research Analysts. It is provided for investor awareness and is not currently an operative client agreement or an offer of research services by KARDB."
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
            No client is being onboarded for regulated research
            services and no research subscription fee is being
            collected under this preparatory MITC page.
          </p>
          <p className="mt-3">
            The disclosures below describe the regulatory
            framework. They do not represent that KARDB is
            registered, authorised or currently providing
            Research Analyst services.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Research service — no trade execution">
        <p>
          These terms and the consent obtained on them relate
          to research services provided by a Research Analyst.
        </p>
        <p className="mt-3">
          A Research Analyst cannot execute or carry out any
          purchase or sale transaction on behalf of a client.
          Clients should not permit a Research Analyst to
          execute trades on their behalf.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Research fees and prescribed fee limits">
        <p>
          Fees charged by a Research Analyst are subject to
          the maximum amount prescribed by SEBI and the
          Research Analyst Administration and Supervisory
          Body (RAASB), as applicable.
        </p>

        <div className="mt-4 rounded-xl border border-slate-700 p-4">
          <p className="font-semibold text-cyan-400">
            Current prescribed fee ceiling
          </p>
          <p className="mt-2 text-2xl font-bold">
            ₹1,51,000 per annum
          </p>
          <p className="mt-2">
            Per family of an individual or HUF client, for
            all research services of the Research Analyst.
          </p>
        </div>

        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            The prescribed fee ceiling excludes applicable
            statutory charges.
          </li>
          <li>
            The fee ceiling and related fee provisions apply
            to individual and HUF clients who are not
            accredited investors.
          </li>
          <li>
            The specified fee provisions do not apply in
            the same manner to non-individual clients and
            accredited investors.
          </li>
          <li>
            Fee terms for non-individual clients, accredited
            investors and applicable institutional clients
            are governed by bilaterally negotiated
            contractual terms.
          </li>
          <li>
            The fee ceiling may be revised by RAASB in
            accordance with the applicable regulatory
            framework.
          </li>
        </ul>

        <p className="mt-4 text-sm text-slate-400">
          The applicable fee ceiling and client classification
          must be verified again before any future service
          is launched.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Advance fee — regulatory clarification required">
        <p>
          The fee provisions in paragraph 1.9(f) of the
          SEBI Research Analysts Master Circular dated
          6 February 2026 state that a Research Analyst
          may collect advance fees, if agreed by the client,
          for a period not exceeding one year.
        </p>

        <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="font-semibold text-amber-400">
            Important inconsistency in the published MITC text
          </p>
          <p className="mt-2">
            Annexure B of the same Master Circular reproduces
            the standardised MITC wording referring to an
            advance period of one quarter, while paragraph
            1.9(f) specifies a maximum of one year.
          </p>
          <p className="mt-2">
            This page deliberately identifies both statements.
            The final operative MITC and client agreement
            must be checked with a qualified compliance
            professional against the applicable SEBI
            directions before onboarding.
          </p>
        </div>

        <p className="mt-4">
          No advance fee is currently being accepted by
          KARDB.
        </p>
      </InfoBlock>

      <InfoBlock title="4. Premature termination and refunds">
        <p>
          Under the applicable fee framework, where research
          services are terminated prematurely in accordance
          with the agreed terms, the client is entitled to
          a proportionate refund of fees for the unexpired
          service period.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            The refund relates to the eligible unexpired
            period of the service.
          </li>
          <li>
            A Research Analyst shall not charge a breakage
            fee where the prescribed provision applies.
          </li>
          <li>
            The final client agreement should explain the
            cancellation and refund procedure.
          </li>
        </ul>
        <p className="mt-4">
          These provisions describe the future regulatory
          framework. KARDB is not currently accepting paid
          research subscriptions.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Permitted payment modes and CeFCoM">
        <p>
          The prescribed framework permits payment through
          specified modes such as:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Cheque.</li>
          <li>Online bank transfer.</li>
          <li>UPI and other permitted electronic modes.</li>
        </ul>
        <p className="mt-3">
          Cash payment is not permitted under the
          prescribed MITC.
        </p>
        <p className="mt-4">
          Clients may also be provided guidance on the
          optional Centralised Fee Collection Mechanism
          for Investment Advisers and Research Analysts
          (CeFCoM), managed by BSE Limited, the recognised
          RAASB referred to in the current framework.
        </p>
        <p className="mt-3">
          <a
            href="https://www.bseindia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Visit BSE India
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="6. Conflicts of interest">
        <p>
          A Research Analyst is required to comply with
          applicable SEBI and RAASB regulations, circulars
          and directions concerning the identification,
          disclosure and mitigation of actual or potential
          conflicts of interest.
        </p>
        <p className="mt-3">
          The Research Analyst is expected to promptly
          inform the client about any conflict of interest
          that may affect the research services being
          provided.
        </p>
        <p className="mt-4">
          Relevant conflict disclosures and safeguards
          will be described in the final service terms
          and applicable research disclosures.
        </p>
      </InfoBlock>

      <InfoBlock title="7. No assured or guaranteed returns">
        <p>
          Assured, guaranteed or fixed-return schemes,
          or schemes of a similar prohibited nature,
          cannot be offered as Research Analyst services.
        </p>
        <p className="mt-3">
          Research recommendations do not assure any
          particular return, profit or investment outcome.
        </p>
      </InfoBlock>

      <InfoBlock title="8. Research limitations and investment risks">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            Research opinions, projections and estimates
            are based on the available information and
            assumptions as of the date of preparation
            or publication.
          </li>
          <li>
            Actual market conditions and company
            performance may differ from assumptions
            and estimates.
          </li>
          <li>
            Securities investments are subject to market
            risks, including possible loss of capital.
          </li>
          <li>
            Research services cannot guarantee accuracy,
            profits or risk-free investments.
          </li>
          <li>
            Clients should use their own judgement and
            assessment before relying on research
            conclusions.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="9. Client terms, disclosure and consent">
        <p>
          Under the applicable Research Analyst framework,
          the Research Analyst must disclose the terms
          and conditions of research services to the
          client and obtain the required consent.
        </p>
        <p className="mt-3">
          Neither research services should be rendered
          nor fees charged until the required client
          consent has been obtained, subject to the
          applicable regulatory exceptions.
        </p>
        <p className="mt-3">
          The final onboarding process will include
          applicable service terms, fee information,
          risk disclosures and required client
          declarations.
        </p>
        <p className="mt-3">
          Applicable KYC requirements must also be
          followed for fee-paying clients.
        </p>
      </InfoBlock>

      <InfoBlock title="10. Official regulatory references">
        <p>
          This page is based primarily on the following
          official SEBI documents:
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
        <p className="mt-2 text-sm text-slate-400">
          Relevant provisions: paragraph 1.9, paragraph
          1.12 and Annexure B, including the MITC section.
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/web/?file=https%3A%2F%2Fwww.sebi.gov.in%2Fsebi_data%2Fattachdocs%2Ffeb-2025%2F1739794284694.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI Circular on MITC for Research Analysts — 17 February 2025
          </a>
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/sebi_data/attachdocs/may-2025/1748432376099.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            SEBI Bulletin — April 2025 advance-fee relaxation
          </a>
        </p>

        <p className="mt-5 text-sm text-slate-400">
          This page is an informational and preparatory
          disclosure. It is not an executed client agreement,
          a representation of SEBI registration or confirmation
          that KARDB has implemented all applicable
          regulatory requirements. Applicable laws,
          regulations, circulars and directions prevail.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
