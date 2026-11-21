
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | KARDB",
  description:
    "Read KARDB's proposed website terms, research service framework, investment risk disclosures, intellectual property and future subscription conditions.",
  alternates: {
    canonical: "https://kardb.com/regulatory/terms",
  },
  openGraph: {
    title: "Terms & Conditions | KARDB",
    description:
      "KARDB's website terms and proposed research service framework, including current regulatory status and service limitations.",
    url: "https://kardb.com/regulatory/terms",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | KARDB",
    description:
      "KARDB's website terms and proposed research service framework.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="LEGAL"
      title="Terms & Conditions"
      intro="This page describes the proposed terms framework for the KARDB website and any research services that may be introduced in the future. A final, legally reviewed agreement will be published before any regulated paid research service is offered."
    >
      <InfoBlock title="Important notice — current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            These terms are currently an informational framework,
            not a paid research service agreement.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted
            SEBI registration as a Research Analyst. The platform
            is under development and is not currently offering
            paid research subscriptions or regulated Research
            Analyst services.
          </p>
          <p className="mt-3">
            No payment, subscription or regulated research
            service is being offered under this draft. The final
            legal agreement, including the applicable entity
            details and service-specific terms, will be published
            only after the relevant regulatory and operational
            requirements have been addressed.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Website access and account use">
        <p>
          KARDB may provide website pages, account facilities,
          educational information and illustrative research
          material during its development.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Users should provide accurate information when
            creating an account.
          </li>
          <li>
            Users are responsible for maintaining the
            confidentiality of their login credentials.
          </li>
          <li>
            Users should not attempt unauthorised access,
            interfere with website operations or misuse
            platform facilities.
          </li>
          <li>
            Account creation does not establish eligibility
            for paid research services or create a subscription.
          </li>
          <li>
            Access to any future service will be subject to
            its applicable eligibility requirements and
            separately disclosed terms.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="2. Scope of research services">
        <p>
          Subject to applicable registration and regulatory
          requirements, future KARDB research services may
          include:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Company and fundamental research.</li>
          <li>Financial statement and ratio analysis.</li>
          <li>Industry and sector research.</li>
          <li>Peer comparison and valuation analysis.</li>
          <li>Technical analysis and market observations.</li>
          <li>Research reports and related analytical material.</li>
        </ul>
        <p className="mt-4">
          The actual scope, delivery frequency, coverage,
          research horizon, applicable limitations and
          subscription entitlements will be specified in the
          final service agreement and relevant service pages.
        </p>
        <p className="mt-3">
          The presence of these descriptions on the website
          does not mean that these services are currently
          being offered.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Nature and limitations of research">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            Research may use publicly available information,
            company disclosures, financial statements,
            market data and analytical assumptions.
          </li>
          <li>
            Information may change after a report is prepared
            or published. Historical data and estimates may
            contain limitations or errors.
          </li>
          <li>
            Research opinions, estimates, projections and
            valuation outputs are subject to assumptions
            and uncertainty.
          </li>
          <li>
            Research material should not be treated as a
            guarantee of returns, profits or protection
            against losses.
          </li>
          <li>
            No assured, guaranteed or fixed-return outcome
            is represented.
          </li>
          <li>
            Users should independently assess their financial
            circumstances, objectives, risk tolerance and
            suitability before making investment decisions.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="4. No execution of trades or custody">
        <p>
          Research services are distinct from the execution
          of securities transactions.
        </p>
        <p className="mt-3">
          KARDB does not represent that it will execute
          purchase or sale transactions, operate a client's
          trading or demat account, hold client investment
          funds, or take custody of securities as part of
          the research framework described on this page.
        </p>
        <p className="mt-3">
          Users should never share trading, demat or bank
          account passwords, OTPs or login credentials with
          anyone claiming to represent KARDB.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Future subscriptions, fees and payments">
        <p>
          Paid research subscriptions and payment facilities
          are not currently available through KARDB.
        </p>
        <p className="mt-3">
          Before any future paid service is introduced,
          the applicable service terms will disclose:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Available subscription plans and their scope.</li>
          <li>Applicable fees, statutory charges and taxes.</li>
          <li>Payment methods and payment confirmation.</li>
          <li>Subscription duration and commencement date.</li>
          <li>Renewal arrangements, if any.</li>
          <li>Service delivery and access conditions.</li>
          <li>
            Applicable SEBI fee limits and other regulatory
            requirements.
          </li>
        </ul>
        <p className="mt-4">
          Where applicable, fees will be governed by the
          relevant SEBI requirements, the final agreement
          and the published Most Important Terms and
          Conditions (MITC).
        </p>
      </InfoBlock>

      <InfoBlock title="6. Cancellation, termination and refunds">
        <p>
          No paid research subscription is currently being
          accepted by KARDB. Therefore, this page does not
          establish a current paid subscription cancellation
          or refund arrangement.
        </p>
        <p className="mt-3">
          Before paid services commence, the final agreement
          will explain:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>How a client may request cancellation.</li>
          <li>When research service access may be suspended or terminated.</li>
          <li>
            The treatment of fees for an unexpired subscription
            period.
          </li>
          <li>
            Applicable refund procedures and timelines.
          </li>
          <li>
            The effect of suspension or cancellation of
            regulatory registration, where relevant.
          </li>
        </ul>
        <p className="mt-4">
          Any future cancellation and refund provisions
          will be consistent with applicable SEBI requirements,
          including the requirement for proportionate refund
          of eligible unexpired fees and no breakage fee
          where prescribed.
        </p>
      </InfoBlock>

      <InfoBlock title="7. Intellectual property and permitted use">
        <p>
          Website design, branding, original research reports,
          written analysis, graphics and other original
          materials may be protected by applicable
          intellectual property laws.
        </p>
        <p className="mt-3">
          Unless expressly permitted by the applicable
          licence or written authorisation, users should
          not reproduce, republish, resell, distribute or
          commercially exploit KARDB's original research
          material.
        </p>
        <p className="mt-3">
          Third-party names, trademarks, company information
          and source material remain subject to the rights
          and terms of their respective owners.
        </p>
      </InfoBlock>

      <InfoBlock title="8. Data, privacy and communications">
        <p>
          Account information and other personal data will
          be handled in accordance with the privacy
          disclosures and applicable laws that govern
          KARDB's operations.
        </p>
        <p className="mt-3">
          Before account registration or collection of
          additional personal information, users should
          review the applicable privacy notice and
          understand the purposes for which information
          is collected and processed.
        </p>
        <p className="mt-3">
          Any future research-service onboarding will
          separately explain applicable KYC requirements,
          client information handling, communication
          records and consent requirements.
        </p>
        <p className="mt-3">
          This section is not a substitute for a complete
          Privacy Policy or data protection notice.
        </p>
      </InfoBlock>

      <InfoBlock title="9. Grievance redressal and dispute resolution">
        <p>
          The applicable grievance redressal and dispute
          resolution framework for future regulated
          research services will be disclosed before
          onboarding.
        </p>
        <p className="mt-3">
          It will include the designated grievance contact,
          complaint submission procedure, applicable
          resolution timelines, escalation mechanism,
          SCORES and SMART ODR information, as applicable.
        </p>
        <p className="mt-3">
          KARDB is not currently representing a registered
          Research Analyst grievance officer or an
          operational grievance channel in that capacity.
        </p>
        <p className="mt-4">
          <a
            href="/regulatory/grievance"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            View Grievance Redressal Information
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="10. Changes and future legal agreement">
        <p>
          This page is a preparatory description of the
          proposed terms framework and is not the final
          agreement for regulated research services.
        </p>
        <p className="mt-3">
          Before any future service is launched, KARDB
          will publish the applicable legal entity details,
          regulatory disclosures, complete service terms,
          MITC, fee and refund provisions, privacy
          disclosures and grievance arrangements.
        </p>
        <p className="mt-3">
          Any future changes to operative client terms
          will be communicated in the manner required
          by applicable law and the agreement.
        </p>
      </InfoBlock>

      <InfoBlock title="11. Regulatory status and important clarification">
        <p>
          As of 21 November 2026, KARDB has not been granted
          SEBI registration as a Research Analyst.
        </p>
        <p className="mt-3">
          Nothing on this page should be interpreted as
          a representation of SEBI registration, regulatory
          approval, guaranteed investment performance or
          confirmation that all requirements for a
          regulated service have been fulfilled.
        </p>
        <p className="mt-3">
          The applicable laws, SEBI regulations, circulars
          and final executed client agreement will prevail
          over this informational framework.
        </p>
        <p className="mt-4">
          <a
            href="/regulatory/sebi-registration"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            View KARDB's SEBI Registration Status
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="Official regulatory references">
        <p>
          The future research-service agreement and MITC
          will be reviewed against the applicable SEBI
          Research Analysts Regulations and circulars.
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-research-analysts_99571.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            SEBI Research Analysts Master Circular — February 2026
          </a>
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/legal/circulars/feb-2025/most-important-terms-and-conditions-mitc-for-research-analysts_91965.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            SEBI Most Important Terms and Conditions — MITC
          </a>
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&glsId=1&sid=1&ssid=3"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            SEBI Research Analysts Regulations
          </a>
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
