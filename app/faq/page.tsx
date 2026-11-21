
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about KARDB, sample research material, future subscriptions, research methodology, investment risks, AI transparency and regulatory status.",
  alternates: {
    canonical: "https://kardb.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | KARDB",
    description:
      "Understand KARDB's research framework, sample material, current availability and regulatory status.",
    url: "https://kardb.com/faq",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Frequently Asked Questions | KARDB",
    description:
      "Answers about KARDB research, sample material, future access and regulatory information.",
  },
};

const faqSections = [
  {
    title: "About KARDB",
    description: "Understanding the platform and its current development status.",
    items: [
      {
        question: "What is KARDB?",
        answer:
          "KARDB is being developed as an equity research platform focused on structured company and market analysis. Its proposed research framework covers business fundamentals, financial statements, financial ratios, peer and industry analysis, valuation, technical analysis and risk assessment.",
      },
      {
        question: "What is the current status of KARDB?",
        answer:
          "KARDB is under development. As of 21 November 2026, KARDB has not been granted SEBI registration as a Research Analyst. It is not currently offering paid research subscriptions or regulated Research Analyst services.",
      },
      {
        question: "Is KARDB registered with SEBI?",
        answer:
          "No. KARDB has not been granted SEBI registration as a Research Analyst as of 21 November 2026. Users should not interpret the website, sample material or proposed research framework as evidence of SEBI registration.",
      },
      {
        question: "Who is KARDB designed for?",
        answer:
          "The platform is being designed for people interested in understanding companies, financial performance, valuation methods, industry conditions and market behaviour through structured research.",
      },
    ],
  },
  {
    title: "Research and Sample Material",
    description: "Understanding the proposed research framework and illustrative content.",
    items: [
      {
        question: "What does KARDB research aim to cover?",
        answer:
          "The proposed framework includes business analysis, revenue and profitability, balance sheet and cash flow assessment, working capital, financial ratios, peer comparison, industry analysis, valuation, technical analysis and risk assessment. The relevance of each area may vary according to the research objective and available information.",
      },
      {
        question: "What is sample research material?",
        answer:
          "Sample research material is illustrative content intended to demonstrate the proposed structure, analytical approach and presentation style of KARDB. It should not be treated as a live research subscription, a current investment recommendation or a promise of future performance.",
      },
      {
        question: "Does sample material constitute investment advice?",
        answer:
          "No. Illustrative sample material is provided for educational and demonstration purposes. It is not a personalised recommendation or a substitute for independent investment research and decision-making.",
      },
      {
        question: "What is the difference between a sample report and a research report service?",
        answer:
          "A sample report demonstrates a possible research format. A research report service involves an actual research offering with its applicable scope, disclosures, terms and regulatory requirements. KARDB is not currently offering regulated Research Analyst services.",
      },
      {
        question: "Does KARDB use technical analysis?",
        answer:
          "Technical analysis is included in the proposed methodology. It may examine price trends, market structure, support and resistance, moving averages, momentum, volume, breakouts, pullbacks and other price-action concepts. Technical indicators and chart patterns cannot guarantee future price movements.",
      },
    ],
  },
  {
    title: "Accounts and Subscriptions",
    description: "Clarifying account access, sample content and future commercial plans.",
    items: [
      {
        question: "Are paid KARDB subscriptions currently available?",
        answer:
          "No. Paid research subscriptions are not currently being offered, and KARDB is not accepting subscription payments through this website. Future access options and pricing will be communicated only when the platform is ready to offer applicable services.",
      },
      {
        question: "Does creating an account mean I have purchased a subscription?",
        answer:
          "No. Creating an account and obtaining access to any research subscription are separate matters. An account does not automatically create a paid subscription or provide entitlement to paid research material.",
      },
      {
        question: "Will KARDB offer free and paid research plans in the future?",
        answer:
          "KARDB is evaluating future access options. Any plans, features, fees, eligibility conditions and subscription terms will be communicated separately if and when such services are introduced.",
      },
      {
        question: "Can I purchase an individual research report?",
        answer:
          "Individual report purchases are not currently available. Any future report-level access arrangements will be announced with their applicable terms and disclosures.",
      },
      {
        question: "Where can I view sample material?",
        answer:
          "Visit the Reports section to explore the sample research material made available on the platform. Access may be subject to the website's account and content-access controls.",
      },
    ],
  },
  {
    title: "Investment Risks and Research Limitations",
    description: "Important information about interpreting research and market information.",
    items: [
      {
        question: "Does KARDB guarantee investment returns?",
        answer:
          "No. No research method, financial model, technical indicator or market assessment can guarantee investment returns. Securities market investments are subject to market risks, including possible loss of capital.",
      },
      {
        question: "Does SEBI registration guarantee research performance?",
        answer:
          "No. Registration with a regulator is not a guarantee of investment performance, research accuracy, returns or protection against market losses.",
      },
      {
        question: "Can KARDB execute trades on behalf of users?",
        answer:
          "KARDB is being developed as a research platform. This website does not currently offer trade execution services. Research access should not be confused with brokerage or portfolio management services.",
      },
      {
        question: "Are financial estimates and valuations certain?",
        answer:
          "No. Valuation models and financial estimates depend on assumptions such as future performance, discount rates, growth expectations and comparable-company selection. Changes in assumptions can materially affect estimated values.",
      },
      {
        question: "Can users rely entirely on historical data?",
        answer:
          "Historical information can help explain past performance and market behaviour, but it may not predict future outcomes. Data availability, reporting periods, estimates and source limitations should be considered when interpreting analysis.",
      },
    ],
  },
  {
    title: "Technology and AI",
    description: "Understanding the role and limitations of technology-assisted workflows.",
    items: [
      {
        question: "Does KARDB use artificial intelligence?",
        answer:
          "KARDB may use AI-assisted tools in parts of its development or research workflow. AI-generated or AI-assisted outputs can contain errors, omissions or misleading interpretations. The actual extent and purpose of AI use, relevant limitations and applicable oversight will be disclosed before any relevant research service is offered.",
      },
      {
        question: "Does AI replace human research and verification?",
        answer:
          "AI outputs should not automatically be treated as verified facts or final research conclusions. Information, calculations, assumptions and interpretations require appropriate review and validation. AI assistance does not remove responsibility for the quality and integrity of research.",
      },
      {
        question: "Are AI-generated outputs always accurate?",
        answer:
          "No. AI systems can produce inaccurate, incomplete or outdated information. Users should consider source material, reporting dates, assumptions and limitations before relying on any information.",
      },
    ],
  },
  {
    title: "Regulatory and Grievance Information",
    description: "Finding information about regulatory status and complaint channels.",
    items: [
      {
        question: "Where can I find KARDB's regulatory information?",
        answer:
          "The Regulatory section contains the platform's regulatory-status information and the relevant policy and disclosure sections. Documents and disclosures must be read in the context of KARDB's current development and registration status.",
      },
      {
        question: "What is SEBI SCORES?",
        answer:
          "SCORES is SEBI's online platform for securities-market investor grievance redressal. Its availability and applicability depend on the nature of the complaint and the relevant entity and regulatory framework.",
      },
      {
        question: "How can I raise a complaint about KARDB?",
        answer:
          "KARDB's current website status and available contact details should be checked before submitting a complaint. If and when regulated services are introduced, the applicable grievance contact details and complaint-handling procedures will be published in accordance with the requirements applicable at that time.",
      },
      {
        question: "What is the Online Dispute Resolution (ODR) mechanism?",
        answer:
          "The securities-market ODR framework provides an online mechanism for eligible disputes involving entities and participants covered by the applicable framework. Its applicability depends on the parties, nature of the dispute and relevant regulatory requirements.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            HELP CENTRE
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Clear answers about KARDB, its proposed research framework,
            sample material, future access options, investment risks
            and regulatory information.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {faqSections.map((section, index) => (
            <section key={section.title}>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                  SECTION {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {section.description}
                </p>
              </div>

              <div className="space-y-3">
                {section.items.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-white marker:content-none">
                      <span>{faq.question}</span>

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xl font-normal text-cyan-400 transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>

                    <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-7 text-slate-400">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
            NEED MORE INFORMATION?
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Explore KARDB further.
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Learn about the proposed research framework, review
            illustrative sample material or read the platform's
            regulatory-status information.
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold">
            <Link
              href="/methodology"
              className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Research Methodology
            </Link>

            <Link
              href="/reports"
              className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Sample Research
            </Link>

            <Link
              href="/regulatory"
              className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Regulatory Information
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs leading-6 text-slate-500">
          Platform status stated as of 21 November 2026. Website
          information is subject to revision as KARDB's development
          and regulatory status evolve.
        </p>
      </section>
    </PageShell>
  );
}
