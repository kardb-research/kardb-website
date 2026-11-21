
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Investor Charter | KARDB",
  description:
    "Investor Charter reference based on SEBI's Research Analysts Master Circular dated 6 February 2026. KARDB's current registration status and service limitations are disclosed.",
  alternates: {
    canonical: "https://kardb.com/regulatory/investor-charter",
  },
  openGraph: {
    title: "Investor Charter | KARDB",
    description:
      "Read the investor protection framework for Research Analysts and KARDB's current registration status.",
    url: "https://kardb.com/regulatory/investor-charter",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Investor Charter | KARDB",
    description:
      "Investor Charter reference and current registration disclosure for KARDB.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="INVESTOR PROTECTION"
      title="Investor Charter"
      intro="This page presents the investor charter framework specified by SEBI for Research Analysts. It is provided for information and transparency and must be read together with KARDB's current registration status below."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            KARDB is not registered with SEBI as a Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted SEBI
            Research Analyst registration. The platform is under
            development and is not currently offering paid research
            subscriptions or regulated Research Analyst services.
          </p>
          <p className="mt-3">
            The framework below describes the investor protection
            standards prescribed for registered Research Analysts.
            Its publication does not mean that KARDB is registered,
            authorised, or currently providing those services.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="A. Vision and mission statements for investors">
        <p>
          <strong>Vision:</strong> Invest with knowledge and safety.
        </p>
        <p className="mt-4">
          <strong>Mission:</strong> Every investor should be able to
          invest in suitable investment products based on their needs,
          manage and monitor them to meet their goals, access reports,
          and enjoy financial wellness.
        </p>
      </InfoBlock>

      <InfoBlock title="B. Details of business transacted by a Research Analyst">
        <p>The SEBI charter describes the following activities:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Publishing research reports based on the Research Analyst's
            research activities.
          </li>
          <li>
            Providing an independent and unbiased view on securities.
          </li>
          <li>
            Offering unbiased recommendations and disclosing financial
            interests in recommended securities.
          </li>
          <li>
            Providing recommendations based on publicly available
            information and known observations.
          </li>
          <li>Conducting an annual compliance audit.</li>
          <li>
            Ensuring advertisements comply with the applicable
            Advertisement Code for Research Analysts.
          </li>
          <li>
            Maintaining records of relevant interactions with clients
            and prospective clients, including before onboarding.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="C. Details of services provided to investors">
        <p className="font-semibold">1. Onboarding of clients</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Sharing the terms and conditions of research services.</li>
          <li>Completing KYC of fee-paying clients.</li>
        </ul>

        <p className="mt-5 font-semibold">2. Disclosures to clients</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            Disclosing material information needed for an informed
            decision, including business activities, disciplinary
            history, terms and conditions, associates, risks, and
            conflicts of interest.
          </li>
          <li>
            Disclosing the extent of use of Artificial Intelligence
            tools in providing research services.
          </li>
          <li>
            Disclosing material conflicts of interest of third-party
            research providers when distributing their reports, or
            providing a web address directing investors to the relevant
            disclosures.
          </li>
          <li>
            Disclosing conflicts between research services and other
            activities of the Research Analyst.
          </li>
        </ul>

        <p className="mt-5 font-semibold">
          3. Service standards and investor protection
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            Distributing research reports and recommendations to
            clients without discrimination.
          </li>
          <li>
            Maintaining confidentiality of research reports before
            their public release.
          </li>
          <li>
            Respecting client data privacy and taking measures to
            prevent unauthorised use of confidential information.
          </li>
          <li>
            Disclosing service timelines and adhering to them.
          </li>
          <li>
            Providing clear guidance and adequate caution notices for
            complex and high-risk financial products or services.
          </li>
          <li>Treating clients with honesty and integrity.</li>
          <li>
            Maintaining confidentiality unless disclosure is
            necessary to meet legal obligations or the client has
            provided specific consent.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="D. Grievance redressal mechanism">
        <p className="font-semibold">
          1. Complaint to the Research Analyst
        </p>
        <p className="mt-2">
          Under the prescribed framework, an investor may approach
          the concerned Research Analyst with a grievance. The
          Research Analyst is expected to resolve it as soon as
          possible and no later than 21 days from receipt.
        </p>

        <p className="mt-5 font-semibold">
          2. SEBI SCORES 2.0
        </p>
        <p className="mt-2">
          Investors may use the SEBI Complaints Redress System
          (SCORES 2.0). The prescribed two-level review mechanism
          involves the designated body (RAASB) at the first level
          and SEBI at the second level.
        </p>
        <p className="mt-2">
          <a
            href="https://scores.sebi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            Open SEBI SCORES 2.0
          </a>
        </p>

        <p className="mt-5 font-semibold">
          3. SMART ODR platform
        </p>
        <p className="mt-2">
          Where an investor is not satisfied with the resolution
          provided by a market participant, the prescribed framework
          provides access to the SMART ODR platform for online
          conciliation or arbitration, as applicable.
        </p>
        <p className="mt-2">
          <a
            href="https://smartodr.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            Open SMART ODR
          </a>
        </p>

        <p className="mt-5">
          The above mechanisms are reproduced as part of the
          regulatory reference framework. KARDB is not currently
          presenting itself as a registered Research Analyst or
          claiming access to the registered-intermediary grievance
          mechanism in that capacity.
        </p>
      </InfoBlock>

      <InfoBlock title="E. Rights of investors">
        <p>
          The SEBI Investor Charter identifies the following
          investor rights:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Right to privacy and confidentiality.</li>
          <li>Right to transparent practices.</li>
          <li>Right to fair and equitable treatment.</li>
          <li>Right to adequate information.</li>
          <li>
            Right to initial and continuing disclosure of statutory
            and regulatory information.
          </li>
          <li>Right to fair and truthful advertisements.</li>
          <li>
            Right to awareness of service parameters and turnaround
            times.
          </li>
          <li>
            Right to be informed about service timelines.
          </li>
          <li>
            Right to be heard and receive satisfactory and timely
            grievance redressal.
          </li>
          <li>
            Right to exit a financial product or service according
            to the agreed terms and conditions.
          </li>
          <li>
            Right to clear guidance and caution notices for complex
            and high-risk financial products and services.
          </li>
          <li>
            Additional accessibility rights for vulnerable consumers
            and persons with disabilities.
          </li>
          <li>
            Right to provide feedback about financial products and
            services used.
          </li>
          <li>
            Right against coercive, unfair, and one-sided clauses
            in financial agreements.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="F. Expectations from investors — responsibilities">
        <p className="font-semibold">Do's</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Always deal with a SEBI-registered Research Analyst.</li>
          <li>Verify that the Research Analyst holds a valid registration certificate.</li>
          <li>Check the SEBI registration number.</li>
          <li>Read disclosures in research reports before investing.</li>
          <li>
            Fee-paying clients should pay through banking channels
            and maintain signed receipts showing payment details.
            CeFCoM may be used where the Research Analyst has opted
            for that mechanism.
          </li>
          <li>
            Review the relevant research recommendation before
            buying or selling securities or applying in a public offer.
          </li>
          <li>
            Ask relevant questions and clear doubts before acting
            on a recommendation.
          </li>
          <li>
            Seek clarification, especially for complex and high-risk
            products and services.
          </li>
          <li>
            Understand the right to discontinue the service according
            to the agreed terms.
          </li>
          <li>Provide feedback about services received.</li>
          <li>
            Remember that clauses contrary to regulatory provisions
            do not bind investors.
          </li>
          <li>
            Inform SEBI about any Research Analyst offering assured
            or guaranteed returns.
          </li>
        </ul>

        <p className="mt-5 font-semibold">Don'ts</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Do not provide investment funds to the Research Analyst.</li>
          <li>Do not fall for misleading advertisements or market rumours.</li>
          <li>
            Do not be attracted by limited-period discounts,
            incentives, gifts, or similar inducements.
          </li>
          <li>
            Never share trading, demat, or bank account login
            credentials or passwords with a Research Analyst.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="Official regulatory reference">
        <p>
          This reference framework is based on Annexure D of the
          SEBI Master Circular for Research Analysts dated
          6 February 2026, read with the Investor Charter circular
          dated 2 June 2025.
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            View SEBI Research Analysts Master Circular (PDF)
          </a>
        </p>
        <p className="mt-3">
          <a
            href="https://www.sebi.gov.in/legal/circulars/jun-2025/investor-charter-for-research-analysts_94355.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 underline underline-offset-4"
          >
            View SEBI Investor Charter circular dated 2 June 2025
          </a>
        </p>
        <p className="mt-4 text-sm">
          This page is an informational presentation of the
          prescribed framework. It is not a claim of registration,
          regulatory approval, or confirmation that KARDB has
          implemented every operational requirement.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
