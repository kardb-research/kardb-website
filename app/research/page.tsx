
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Equity Research Framework | KARDB",
  description:
    "Explore the proposed KARDB equity research framework, covering fundamental analysis, financial ratios, peer comparison, industry analysis and market behaviour.",
  alternates: {
    canonical: "https://kardb.com/research",
  },
  openGraph: {
    title: "Equity Research Framework | KARDB",
    description:
      "Discover KARDB's proposed structured approach to company and financial analysis.",
    url: "https://kardb.com/research",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Equity Research Framework | KARDB",
    description:
      "Explore the proposed KARDB equity research framework.",
  },
};

const researchModules = [
  {
    number: "01",
    title: "Fundamental Research",
    description:
      "Examine a company's business model, financial statements, revenue, profitability, cash flows, growth and financial position.",
  },
  {
    number: "02",
    title: "Ratio Analysis",
    description:
      "Study profitability, liquidity, leverage, efficiency and return-based indicators to understand financial performance.",
  },
  {
    number: "03",
    title: "Peer Comparison",
    description:
      "Compare relevant companies using appropriate financial and operating parameters, while considering differences in business models.",
  },
  {
    number: "04",
    title: "Industry Analysis",
    description:
      "Examine industry structure, competitive conditions, business cycles and external factors that may influence company performance.",
  },
  {
    number: "05",
    title: "Technical Analysis",
    description:
      "Study price trends, momentum, support and resistance, price structure and other market-behaviour indicators.",
  },
  {
    number: "06",
    title: "Research Output",
    description:
      "Organise analytical findings into a structured research format with relevant explanations, tables, charts and disclosures.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Data",
    text: "Identify and organise relevant company, financial, industry and market information.",
  },
  {
    number: "02",
    title: "Analysis",
    text: "Examine business performance, financial statements, ratios, growth and cash flows.",
  },
  {
    number: "03",
    title: "Comparison",
    text: "Evaluate relevant historical periods, peer companies and industry context.",
  },
  {
    number: "04",
    title: "Interpretation",
    text: "Consider findings alongside assumptions, business conditions, uncertainties and potential risks.",
  },
  {
    number: "05",
    title: "Output",
    text: "Organise the findings into a clear and structured research presentation.",
  },
];

export default function ResearchPage() {
  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="text-sm font-bold tracking-[0.25em] text-cyan-400">
              KARDB RESEARCH FRAMEWORK
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Structured research.
              <span className="block text-cyan-400">
                Clear analysis.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              A proposed framework for examining listed companies through
              business fundamentals, financial information, ratios,
              comparative analysis, industry context and market behaviour.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
              The objective is to bring different dimensions of company
              analysis together so that financial performance and business
              conditions can be understood in a broader context.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/methodology"
                className="rounded-lg bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Methodology
              </Link>

              <Link
                href="/reports"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400"
              >
                View Research Reports
              </Link>
            </div>
          </div>
        </section>

        {/* Research Framework */}
        <section
          id="framework"
          className="border-b border-slate-800 bg-slate-900/50"
        >
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                RESEARCH FRAMEWORK
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Analyse the business through multiple layers.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
                The proposed KARDB framework is organised into six
                analytical areas. The relevance and depth of each area
                depend on the company, available information and research
                objective.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {researchModules.map((item) => (
                <article
                  key={item.number}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7 transition hover:border-cyan-400/50"
                >
                  <p className="text-xs font-bold tracking-widest text-cyan-400">
                    {item.number}
                  </p>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                RESEARCH WORKFLOW
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                From information to structured research.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
                The proposed workflow follows five stages to organise
                information, examine business performance and communicate
                analytical findings.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {workflow.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/50 text-sm font-bold text-cyan-400">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>

            <Link
              href="/methodology"
              className="mt-8 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Read the detailed methodology
            </Link>
          </div>
        </section>

        {/* Research Philosophy */}
        <section className="border-y border-slate-800 bg-slate-900/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                RESEARCH PHILOSOPHY
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Numbers first.
                <span className="block text-cyan-400">
                  Structure always.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-slate-400 md:text-base">
              <p>
                A company's performance cannot always be understood
                through a single financial metric or isolated market
                indicator.
              </p>

              <p>
                Business fundamentals, financial performance, relevant
                peer information, industry conditions and market behaviour
                provide different perspectives that may complement one
                another.
              </p>

              <p>
                The KARDB framework aims to organise these perspectives
                while keeping assumptions, uncertainties and research
                limitations visible.
              </p>

              <Link
                href="/methodology"
                className="inline-block font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Understand our methodology
              </Link>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              RESEARCH TRANSPARENCY
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Analysis must be understood in context.
            </h2>

            <div className="mt-6 max-w-4xl space-y-5 text-sm leading-7 text-slate-400">
              <p>
                Financial information may involve estimation differences,
                reporting limitations and changes in accounting or business
                conditions. Historical performance does not guarantee
                future results.
              </p>

              <p>
                Research conclusions should be considered alongside their
                underlying information, assumptions, relevant risks and
                limitations.
              </p>

              <p>
                The description of a proposed research framework does not
                itself constitute a research recommendation or investment
                advice.
              </p>
            </div>

            <Link
              href="/regulatory"
              className="mt-7 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              View regulatory disclosures
            </Link>
          </div>
        </section>

        {/* Development and registration status */}
        <section className="border-t border-slate-800 bg-slate-900/60">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-9">
              <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
                PLATFORM DEVELOPMENT STATUS
              </p>

              <h2 className="mt-4 text-2xl font-bold text-white">
                KARDB is under development.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
                KARDB has not been granted SEBI registration as a Research
                Analyst as of 21 November 2026. The platform is under
                development. KARDB is not currently offering paid research
                subscriptions or regulated Research Analyst services.
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
