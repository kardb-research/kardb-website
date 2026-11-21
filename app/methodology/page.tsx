
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Research Methodology | KARDB",
  description:
    "Explore KARDB's proposed integrated equity research methodology covering fundamental analysis, financial statements, valuation, technical analysis, peer comparison and risk assessment.",
  alternates: {
    canonical: "https://kardb.com/methodology",
  },
  openGraph: {
    title: "Research Methodology | KARDB",
    description:
      "Understand KARDB's proposed integrated approach to fundamental, financial and technical research.",
    url: "https://kardb.com/methodology",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Research Methodology | KARDB",
    description:
      "Explore KARDB's proposed integrated equity research methodology.",
  },
};

const researchStages = [
  {
    number: "01",
    title: "Data Identification and Collection",
    description:
      "Identify relevant company, financial, industry and market information according to the research objective.",
    details: [
      "Annual reports and financial statements",
      "Company and stock exchange disclosures",
      "Industry and publicly available market information",
    ],
  },
  {
    number: "02",
    title: "Data Validation and Assessment",
    description:
      "Assess the relevance, consistency, completeness and limitations of information before interpretation.",
    details: [
      "Verify financial periods and reporting units",
      "Identify inconsistencies and missing information",
      "Distinguish reported figures from estimates",
    ],
  },
  {
    number: "03",
    title: "Fundamental and Financial Analysis",
    description:
      "Examine the business model, operating performance, financial position and cash generation.",
    details: [
      "Revenue growth and profitability",
      "Balance sheet and working capital",
      "Cash flow and financial ratios",
    ],
  },
  {
    number: "04",
    title: "Peer and Industry Analysis",
    description:
      "Compare the company with relevant peers and assess its position within the industry.",
    details: [
      "Business model comparability",
      "Historical financial performance",
      "Industry structure and competitive conditions",
    ],
  },
  {
    number: "05",
    title: "Valuation and Technical Analysis",
    description:
      "Where relevant, examine valuation assumptions and market behaviour through complementary analytical methods.",
    details: [
      "Valuation methods and sensitivity analysis",
      "Price trends and market structure",
      "Momentum, volume and technical indicators",
    ],
  },
  {
    number: "06",
    title: "Risk Assessment and Interpretation",
    description:
      "Evaluate analytical findings in the context of business conditions, uncertainties and potential risks.",
    details: [
      "Business and financial risks",
      "Industry and market risks",
      "Assumptions and research limitations",
    ],
  },
  {
    number: "07",
    title: "Research Presentation",
    description:
      "Organise findings into a structured research format with supporting explanations and relevant disclosures.",
    details: [
      "Research findings and analytical reasoning",
      "Relevant assumptions and risks",
      "Applicable disclosures and limitations",
    ],
  },
];

const analysisAreas = [
  {
    number: "01",
    title: "Business and Fundamental Analysis",
    description:
      "Understand the company's business model, products, services, operating structure, competitive position and factors influencing long-term business performance.",
    points: [
      "Business model and revenue drivers",
      "Competitive advantages and challenges",
      "Management and business strategy",
      "Growth opportunities and business risks",
    ],
  },
  {
    number: "02",
    title: "Financial Statement Analysis",
    description:
      "Examine the company's financial performance and position using relevant financial statements and historical reporting periods.",
    points: [
      "Income statement analysis",
      "Balance sheet analysis",
      "Cash flow statement analysis",
      "Working capital assessment",
    ],
  },
  {
    number: "03",
    title: "Financial Ratio Analysis",
    description:
      "Use relevant financial ratios to evaluate profitability, liquidity, leverage, operating efficiency and returns.",
    points: [
      "Profitability and margin ratios",
      "Liquidity and leverage ratios",
      "Efficiency and turnover ratios",
      "Return on capital and equity",
    ],
  },
  {
    number: "04",
    title: "Peer and Industry Analysis",
    description:
      "Compare relevant companies and examine industry conditions while considering differences in business models and financial characteristics.",
    points: [
      "Peer selection and comparability",
      "Relative financial performance",
      "Industry structure and competition",
      "Industry cycles and external influences",
    ],
  },
  {
    number: "05",
    title: "Valuation Analysis",
    description:
      "Where relevant, examine a company's estimated value using suitable valuation methods and clearly identified assumptions.",
    points: [
      "Discounted Cash Flow analysis",
      "Free Cash Flow to Firm and Equity",
      "Discount rates and cost of capital",
      "Comparable company valuation",
      "Sensitivity and scenario analysis",
    ],
  },
  {
    number: "06",
    title: "Technical Analysis",
    description:
      "Study historical price behaviour, market structure, momentum and trading activity as a complementary dimension of research.",
    points: [
      "Trend and price structure analysis",
      "Support and resistance zones",
      "Moving averages and trend indicators",
      "RSI and momentum analysis",
      "Volume and breakout assessment",
      "Multiple timeframe analysis",
    ],
  },
  {
    number: "07",
    title: "Risk Assessment",
    description:
      "Identify factors that could materially influence company performance, valuation assumptions and market behaviour.",
    points: [
      "Business and operational risks",
      "Financial and liquidity risks",
      "Industry and regulatory risks",
      "Market and valuation risks",
    ],
  },
];

const technicalConcepts = [
  {
    title: "Trend and Market Structure",
    description:
      "Examine trend direction, swing highs and lows, price structure and potential changes in market behaviour.",
  },
  {
    title: "Support and Resistance",
    description:
      "Identify relevant price zones and historical levels where buying or selling activity may emerge.",
  },
  {
    title: "Moving Averages",
    description:
      "Study moving averages to understand trend direction, price positioning and potential trend changes.",
  },
  {
    title: "Momentum Indicators",
    description:
      "Use indicators such as RSI to assess momentum and potential changes in the strength of price movements.",
  },
  {
    title: "Volume Analysis",
    description:
      "Examine trading activity alongside price movements to understand market participation and confirmation.",
  },
  {
    title: "Breakouts and Pullbacks",
    description:
      "Study breakouts, breakdowns, retests and pullbacks while considering the possibility of false signals.",
  },
  {
    title: "Multi-Timeframe Analysis",
    description:
      "Compare relevant timeframes to understand broader trends alongside shorter-term price behaviour.",
  },
  {
    title: "Market Structure Concepts",
    description:
      "Where relevant, examine liquidity zones, break of structure, fair value gaps and other price-action concepts as analytical tools.",
  },
];

export default function MethodologyPage() {
  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="text-sm font-bold tracking-[0.25em] text-cyan-400">
              KARDB RESEARCH METHODOLOGY
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Beyond numbers.
              <span className="block text-cyan-400">
                A structured research approach.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              KARDB is developing an integrated research framework
              combining fundamental analysis, financial assessment,
              valuation, technical analysis and risk evaluation.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
              The proposed approach aims to examine companies from
              multiple perspectives rather than relying on a single
              financial metric or isolated market indicator.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="rounded-lg bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Research Framework
              </Link>

              <Link
                href="/reports"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400"
              >
                View Sample Material
              </Link>
            </div>
          </div>
        </section>

        {/* Seven Research Stages */}
        <section className="border-b border-slate-800 bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              RESEARCH PROCESS
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Seven stages of structured research.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              The proposed process moves from data identification to
              analytical interpretation and research communication.
            </p>

            <div className="mt-10 space-y-5">
              {researchStages.map((stage) => (
                <article
                  key={stage.number}
                  className="grid gap-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 md:grid-cols-[65px_1fr] md:p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/50 text-sm font-bold text-cyan-400">
                    {stage.number}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {stage.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                      {stage.description}
                    </p>

                    <ul className="mt-5 grid gap-3 md:grid-cols-3">
                      {stage.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Analytical Dimensions */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              ANALYTICAL DIMENSIONS
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Seven dimensions of company and market research.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Each dimension contributes a different perspective.
              Their relevance depends on the research objective,
              company characteristics and available information.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {analysisAreas.map((area) => (
                <article
                  key={area.number}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7"
                >
                  <p className="text-xs font-bold tracking-widest text-cyan-400">
                    AREA {area.number}
                  </p>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {area.description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Technical Analysis */}
        <section className="border-y border-slate-800 bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              TECHNICAL ANALYSIS METHODOLOGY
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Understanding price behaviour and market structure.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              The proposed technical analysis framework examines
              historical price behaviour, trend structure, momentum
              and trading activity. It complements fundamental
              research and does not replace business or financial analysis.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {technicalConcepts.map((concept) => (
                <article
                  key={concept.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7"
                >
                  <h3 className="text-lg font-bold text-white">
                    {concept.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {concept.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
              <h3 className="text-xl font-bold text-white">
                Technical analysis limitations
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Technical indicators and price patterns are based
                on historical market information. They may produce
                false, delayed or conflicting signals. No indicator,
                chart pattern or price-action concept can guarantee
                future price movements or investment outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Information and Data Quality */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              INFORMATION AND DATA QUALITY
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Information must be understood before interpretation.
            </h2>

            <div className="mt-7 max-w-4xl space-y-5 text-sm leading-7 text-slate-400 md:text-base">
              <p>
                Depending on the research objective, relevant
                information may include company filings, annual reports,
                financial statements, stock exchange disclosures and
                other identifiable public information sources.
              </p>

              <p>
                Where external data or third-party information is used,
                its source, relevant date and limitations should be
                considered. Information availability and reporting
                periods may differ across companies.
              </p>

              <p>
                Estimates, derived metrics and assumptions should be
                distinguished from company-reported information.
                Missing, inconsistent or outdated information may
                affect the scope and interpretation of analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Valuation and Risk */}
        <section className="border-y border-slate-800 bg-slate-900/50">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:py-20">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
              <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                VALUATION DISCIPLINE
              </p>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Assumptions matter.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Where valuation is relevant, conclusions may depend
                on estimates of future performance, discount rates,
                comparable-company selection and other assumptions.
                Changes in these inputs can materially affect
                valuation outcomes.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
              <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                RISK AND LIMITATIONS
              </p>

              <h2 className="mt-4 text-2xl font-bold text-white">
                No analysis removes uncertainty.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Business conditions, economic developments, company
                disclosures and market prices can change. Historical
                information and analytical estimates cannot guarantee
                future performance or investment outcomes.
              </p>
            </article>
          </div>
        </section>

        {/* Research Communication */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              RESEARCH COMMUNICATION
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Clear findings. Relevant disclosures.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Research communication should make relevant information,
              analytical reasoning, assumptions, risks and limitations
              understandable to the reader.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/reports"
                className="text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Explore sample research material
              </Link>

              <Link
                href="/regulatory/disclaimers"
                className="text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Read research disclaimers
              </Link>
            </div>
          </div>
        </section>

        {/* Regulatory Status */}
        <section className="border-t border-slate-800 bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-9">
              <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
                PLATFORM AND REGULATORY STATUS
              </p>

              <h2 className="mt-4 text-2xl font-bold text-white">
                KARDB is under development.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
                KARDB has not been granted SEBI registration as a
                Research Analyst as of 21 November 2026. The platform
                is under development. KARDB is not currently offering
                paid research subscriptions or regulated Research
                Analyst services.
              </p>

              <Link
                href="/regulatory/sebi-registration"
                className="mt-6 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                View registration status
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
