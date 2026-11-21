
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About KARDB | Equity Research",
  description:
    "Discover KARDB's purpose, research philosophy and structured approach to business and financial analysis.",
  alternates: {
    canonical: "https://kardb.com/about",
  },
  openGraph: {
    title: "About KARDB | Equity Research",
    description:
      "Learn about KARDB's research philosophy, analytical framework and commitment to transparent research communication.",
    url: "https://kardb.com/about",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About KARDB | Equity Research",
    description:
      "Learn about KARDB's research philosophy and structured approach to equity research.",
  },
};

const principles = [
  {
    number: "01",
    title: "Research over noise",
    description:
      "Focus on structured company analysis rather than disconnected market information or short-term market noise.",
  },
  {
    number: "02",
    title: "Numbers with context",
    description:
      "Financial figures are more meaningful when examined alongside business fundamentals, historical performance, industry conditions and relevant peers.",
  },
  {
    number: "03",
    title: "Transparent methodology",
    description:
      "A clear research process helps readers understand the information considered, the assumptions made and the limitations involved.",
  },
  {
    number: "04",
    title: "Clear communication",
    description:
      "Research should explain its findings, supporting reasoning, uncertainties and potential risks in understandable language.",
  },
];

const researchAreas = [
  "Business and industry analysis",
  "Financial statement analysis",
  "Financial ratios and performance",
  "Peer and comparative analysis",
  "Valuation and financial assessment",
  "Market behaviour and technical analysis",
];

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="text-sm font-bold tracking-[0.25em] text-cyan-400">
              ABOUT KARDB
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Research the business.
              <span className="block text-cyan-400">
                Understand the numbers.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              KARDB is a developing equity research platform designed to
              organise financial information, examine company fundamentals
              and communicate analytical findings through a structured
              research framework.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
              The objective is to look beyond individual financial numbers
              and understand the business, its financial performance,
              competitive environment and relevant market context.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="rounded-lg bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore Research
              </Link>

              <Link
                href="/methodology"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400"
              >
                Our Methodology
              </Link>
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="bg-slate-900/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                OUR PURPOSE
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                Making financial research more structured and understandable.
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-slate-400 md:text-base">
              <p>
                Understanding a company requires more than looking at its
                share price, revenue growth or a single financial ratio.
                It requires examining how the business operates, how it
                generates cash, how it manages capital and how it performs
                within its industry.
              </p>

              <p>
                KARDB is being developed around this broader approach.
                Its framework aims to bring relevant business, financial,
                comparative and market information together in a consistent
                research structure.
              </p>

              <p>
                The emphasis is on organised analysis, clearly communicated
                assumptions and an honest presentation of research
                limitations.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-y border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              OUR PRINCIPLES
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What guides the KARDB approach.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              These principles describe the research philosophy that guides
              the development of the KARDB platform.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {principles.map((item) => (
                <article
                  key={item.number}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition hover:border-cyan-400/50"
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

        {/* Research coverage */}
        <section className="bg-slate-900/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                RESEARCH FRAMEWORK
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Looking at businesses from multiple perspectives.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                The proposed KARDB framework brings together different
                dimensions of company and market analysis. The relevance
                of each area depends on the company, available information
                and research objective.
              </p>

              <Link
                href="/research"
                className="mt-7 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Explore the research framework
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
              <ul className="space-y-5">
                {researchAreas.map((area, index) => (
                  <li
                    key={area}
                    className="flex items-start gap-4 border-b border-slate-800 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-bold text-cyan-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="border-y border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              TRANSPARENCY AND RESPONSIBILITY
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Research should explain its assumptions and limitations.
            </h2>

            <div className="mt-7 max-w-4xl space-y-5 text-sm leading-7 text-slate-400">
              <p>
                Financial and market information may contain limitations,
                estimation differences and uncertainties. Analytical
                conclusions therefore need to be understood in the context
                of their underlying information and assumptions.
              </p>

              <p>
                KARDB aims to communicate its research framework,
                information sources, relevant assumptions and potential
                limitations clearly as the platform develops.
              </p>

              <p>
                The availability of a research framework or educational
                demonstration does not by itself constitute a research
                recommendation or investment advice.
              </p>
            </div>

            <Link
              href="/regulatory"
              className="mt-7 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              View regulatory information and disclosures
            </Link>
          </div>
        </section>

        {/* Registration status */}
        <section className="bg-slate-900/60">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-9">
              <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
                REGULATORY STATUS
              </p>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Platform under development
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
