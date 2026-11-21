
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "AI Usage Disclosure",
  description:
    "KARDB's AI disclosure framework covering planned AI use in research, human oversight, data security, confidentiality and regulatory responsibilities.",
  alternates: {
    canonical: "https://kardb.com/regulatory/ai-disclosure",
  },
  openGraph: {
    title: "AI Usage Disclosure | KARDB",
    description:
      "Understand KARDB's proposed use of AI-assisted tools in research workflows, human oversight and data protection responsibilities.",
    url: "https://kardb.com/regulatory/ai-disclosure",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Usage Disclosure | KARDB",
    description:
      "KARDB's proposed AI usage, human oversight and data protection framework for future research services.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="TECHNOLOGY AND RESEARCH GOVERNANCE"
      title="AI Usage Disclosure"
      intro="This page explains the proposed framework for using Artificial Intelligence (AI) tools in KARDB's future research workflows. The actual extent of AI use in any regulated research service will be disclosed to clients before onboarding and updated whenever required."
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
            The framework below describes proposed technology and governance
            practices. It does not represent that AI-assisted research
            services or the controls described here are currently operational.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Areas where AI tools may be used">
        <p>
          Subject to appropriate review and applicable regulatory
          requirements, AI-assisted tools may support specific research
          workflow activities, including:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Document processing:</strong> Extracting and organising
            information from annual reports, financial statements and
            corporate disclosures.
          </li>
          <li>
            <strong>Data organisation:</strong> Structuring information and
            assisting with the classification of financial and business data.
          </li>
          <li>
            <strong>Screening support:</strong> Assisting with preliminary
            screening of companies, sectors, financial ratios and market data.
          </li>
          <li>
            <strong>Analytical assistance:</strong> Supporting calculations,
            comparisons, summaries and identification of information
            requiring further examination.
          </li>
          <li>
            <strong>Drafting assistance:</strong> Helping organise research
            notes, summaries and explanatory material.
          </li>
        </ul>
        <p className="mt-4">
          These are potential use cases, not a representation that every
          activity is currently performed using AI or that AI independently
          generates KARDB research conclusions.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Extent of AI use and client disclosure">
        <p>
          The extent of AI use may differ across research activities and
          individual services. Where AI tools are used for regulated research
          services, the applicable disclosure will explain their role in the
          relevant workflow.
        </p>
        <p className="mt-4">
          Before any future regulated client onboarding, KARDB will disclose
          the extent of AI use together with the applicable research-service
          terms and conditions. Additional disclosure will be provided
          whenever required by the applicable framework or when a material
          change makes it necessary.
        </p>
        <p className="mt-4">
          The disclosure will distinguish between AI-assisted support and
          research analysis, conclusions or recommendations for which the
          responsible Research Analyst remains accountable.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Human review and research accountability">
        <p>
          AI-generated material may contain inaccurate, incomplete,
          outdated or misleading information. It may also omit important
          context or produce unsupported conclusions.
        </p>
        <p className="mt-4">
          Any future use of AI-assisted outputs in regulated research will
          require appropriate human review and verification before those
          outputs are relied upon in research services.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Important facts should be checked against reliable sources.</li>
          <li>
            Financial figures and calculations should be independently
            validated where relevant.
          </li>
          <li>
            Research assumptions, limitations and analytical reasoning
            should be reviewed.
          </li>
          <li>
            AI output should not automatically become a research
            recommendation or investment conclusion.
          </li>
        </ul>
        <p className="mt-4">
          Responsibility for research services and outputs cannot be
          transferred to an AI tool or its provider.
        </p>
      </InfoBlock>

      <InfoBlock title="4. Client data, confidentiality and security">
        <p>
          Client information and confidential data require appropriate
          protection. Before any AI tool is used in a future regulated
          research workflow, its suitability and data-handling implications
          will need to be assessed.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            Access to confidential information should be restricted to
            authorised purposes and users.
          </li>
          <li>
            Client information should not be submitted to AI services
            without appropriate assessment and safeguards.
          </li>
          <li>
            Applicable confidentiality, privacy, security and data-retention
            requirements should be considered when selecting AI tools.
          </li>
          <li>
            Relevant third-party service-provider risks should be assessed
            before use.
          </li>
        </ul>
        <p className="mt-4">
          Under Regulation 24(7) of the SEBI Research Analysts Regulations,
          a Research Analyst or Research Entity using AI tools for servicing
          clients remains responsible for the security, confidentiality and
          integrity of client data, the use of information in research
          services, AI-supported research outputs and compliance with
          applicable law.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Limitations and risks of AI">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            AI systems may generate incorrect facts, figures or references.
          </li>
          <li>
            Outputs may reflect incomplete, outdated or biased information.
          </li>
          <li>
            AI may misunderstand financial terminology, business context
            or market conditions.
          </li>
          <li>
            Automated calculations and summaries may contain errors.
          </li>
          <li>
            AI-generated analysis does not guarantee accuracy, investment
            performance or protection against losses.
          </li>
        </ul>
        <p className="mt-4">
          Investors should read research reports, assumptions, risk
          disclosures and limitations rather than relying solely on
          automated summaries or outputs.
        </p>
      </InfoBlock>

      <InfoBlock title="6. Third-party AI tools and service providers">
        <p>
          Future research workflows may involve third-party software,
          cloud platforms or AI service providers. The tools and providers
          actually used for regulated research services will be assessed
          and disclosed to the extent required by applicable regulations
          and client disclosure requirements.
        </p>
        <p className="mt-4">
          The use of a third-party AI provider does not remove KARDB's
          responsibility for its own research services, client information
          or regulatory obligations.
        </p>
      </InfoBlock>

      <InfoBlock title="7. Governance, review and record keeping">
        <p>
          Before AI-assisted regulated research services commence, the
          applicable governance arrangements will need to be established,
          documented and reviewed.
        </p>
        <p className="mt-4">Proposed areas for implementation include:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Documenting approved AI use cases and their intended purpose.</li>
          <li>Assessing AI tools and relevant third-party providers.</li>
          <li>Establishing human review and verification procedures.</li>
          <li>Protecting client information and confidential research data.</li>
          <li>Maintaining relevant research and disclosure records.</li>
          <li>Reviewing material changes in AI use and associated risks.</li>
        </ul>
        <p className="mt-4">
          This is a proposed implementation framework. It is not a statement
          that these governance controls or records are already operational
          at KARDB.
        </p>
      </InfoBlock>

      <InfoBlock title="8. Regulatory status and important clarification">
        <p>
          As of 21 November 2026, KARDB has not been granted SEBI Research
          Analyst registration. No regulated Research Analyst service is
          currently being offered through this platform.
        </p>
        <p className="mt-4">
          This page is an informational disclosure framework. It is not
          confirmation of registration, regulatory approval, completed
          AI governance implementation or compliance certification.
        </p>
        <p className="mt-4">
          Any future AI usage disclosure will be reviewed and updated
          according to the actual tools, workflows and applicable
          regulatory requirements at the time of service.
        </p>
        <a
          className="mt-4 inline-block font-semibold text-cyan-400 underline"
          href="/regulatory/sebi-registration"
        >
          View KARDB's SEBI Registration Status
        </a>
      </InfoBlock>

      <InfoBlock title="9. Official regulatory references">
        <p>
          This framework is based on the applicable SEBI Research Analysts
          regulatory provisions, including:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            Regulation 19(vii) — disclosure to clients of the extent of
            AI use in research services.
          </li>
          <li>
            Regulation 24(7) — responsibility for client-data security,
            confidentiality, integrity and AI-supported research services.
          </li>
        </ul>
        <p className="mt-4">
          The SEBI Research Analysts Master Circular dated 6 February 2026
          explains the AI disclosure requirement and specifies disclosure
          at the time of communicating research-service terms and conditions,
          with additional disclosure whenever required.
        </p>
        <a
          className="mt-4 inline-block font-semibold text-cyan-400 underline"
          href="https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View SEBI Research Analysts Master Circular — 6 February 2026
        </a>
        <p className="mt-4 text-slate-400">
          Applicable SEBI regulations, subsequent amendments, circulars
          and directions prevail over this informational summary.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
