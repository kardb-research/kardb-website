
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "KARDB | Equity Research",
  description:
    "Discover KARDB's structured equity research framework, covering business analysis, financial performance, valuation, industry context and market behaviour.",
};

const researchAreas = [
  {
    number: "01",
    title: "Business Analysis",
    description:
      "Understand business models, products, competitive positioning, management and growth drivers.",
  },
  {
    number: "02",
    title: "Financial Analysis",
    description:
      "Study revenue, profitability, margins, cash flows, balance sheets and working capital.",
  },
  {
    number: "03",
    title: "Ratio Analysis",
    description:
      "Evaluate liquidity, leverage, efficiency, profitability and return ratios.",
  },
  {
    number: "04",
    title: "Peer Comparison",
    description:
      "Compare companies using relevant financial and operating parameters.",
  },
  {
    number: "05",
    title: "Industry Analysis",
    description:
      "Examine industry structure, competitive forces, cycles and external influences.",
  },
  {
    number: "06",
    title: "Market Behaviour",
    description:
      "Study price trends, momentum, market structure and technical indicators.",
  },
];

const researchSteps = [
  {
    number: "01",
    title: "Data",
    description: "Collect relevant financial and company information.",
  },
  {
    number: "02",
    title: "Analysis",
    description: "Examine business performance and financial strength.",
  },
  {
    number: "03",
    title: "Comparison",
    description: "Evaluate relevant peers and industry context.",
  },
  {
    number: "04",
    title: "Interpretation",
    description: "Assess findings, assumptions and potential risks.",
  },
  {
    number: "05",
    title: "Output",
    description: "Present structured research findings and conclusions.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <main>
        {/* Regulatory Status Notice */}
        <section className="border-b border-amber-500/20 bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0 text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>

                <div>
                  <h2 className="font-bold text-amber-300">
                    Regulatory Status Disclosure
                  </h2>

                  <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-300">
                    KARDB has not been granted SEBI registration as a Research
                    Analyst as of 21 November 2026. The platform is under
                    development. KARDB is not currently offering paid
                    research subscriptions or regulated Research Analyst
                    services.
                  </p>
                </div>
              </div>

              <Link
                href="/regulatory/sebi-registration"
                className="shrink-0 text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                View Registration Status
              </Link>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                KARDB Equity Research
              </p>

              <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Understand
                <br />
                Businesses.
                <br />
                <span className="text-cyan-400">
                  Analyse Numbers.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                A structured equity research platform being developed to
                bring business analysis, financial performance, valuation,
                industry context and market behaviour together.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="rounded-lg bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Explore Research Framework
                </Link>

                <Link
                  href="/methodology"
                  className="rounded-lg border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Our Methodology
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Platform development and educational demonstration only.
                No paid research service is currently being offered.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl md:p-12">
                <div className="absolute inset-0 rounded-3xl bg-cyan-400/5 blur-2xl" />

                <Image
                  src="/kardb-logo.png"
                  alt="KARDB Equity Research logo"
                  width={500}
                  height={500}
                  priority
                  className="relative h-64 w-64 object-contain md:h-96 md:w-96"
                />

                <div className="relative mt-5 text-center">
                  <p className="text-lg font-bold tracking-[0.2em] text-white">
                    KARDB
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cyan-400">
                    Equity Research
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Philosophy */}
        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Our Approach
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                Research beyond a single financial number.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                Understanding a company requires more than looking at its
                share price or one financial ratio. KARDB's developing
                framework brings together different dimensions of a
                business to build a structured picture of its financial
                and operating performance.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {researchAreas.map((area) => (
                <div
                  key={area.number}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 p-7 transition hover:border-cyan-500/50"
                >
                  <p className="text-sm font-bold tracking-widest text-cyan-400">
                    {area.number}
                  </p>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/research"
                className="text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Explore the research framework
              </Link>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Research Methodology
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                A structured process. Five stages.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                The proposed KARDB research framework follows a sequence
                designed to organise information, examine financial
                performance and communicate findings clearly.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {researchSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-white/10 bg-slate-900/60 p-6"
                >
                  <p className="text-sm font-bold text-cyan-400">
                    STEP {step.number}
                  </p>

                  <h3 className="mt-5 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/methodology"
              className="mt-9 inline-flex text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Read the methodology
            </Link>
          </div>
        </section>

        {/* Founder */}
        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
            <div className="flex justify-center md:justify-start">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
                <Image
                  src="/deepak-bhandari.png"
                  alt="Deepak Bhandari, Founder of KARDB"
                  width={700}
                  height={880}
                  className="h-auto w-full max-w-md object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Founder
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                Deepak Bhandari
              </h2>

              <p className="mt-3 text-lg text-cyan-400">
                Founder — KARDB Equity Research
              </p>

              <div className="mt-8 space-y-5 text-base leading-8 text-slate-400">
                <p>
                  KARDB is being developed with the objective of creating
                  a structured approach to understanding businesses through
                  financial information, company fundamentals and market
                  context.
                </p>

                <p>
                  The focus is on organising research into clear stages:
                  understanding the business, analysing its financials,
                  comparing relevant companies and evaluating the factors
                  that influence business performance.
                </p>

                <p>
                  The aim is to build a platform where research processes,
                  assumptions and limitations can be communicated clearly.
                </p>
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex text-sm font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                Learn more about KARDB
              </Link>
            </div>
          </div>
        </section>

        {/* Educational Sample */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Educational Demonstration
                  </p>

                  <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                    Explore the sample research report.
                  </h2>

                  <p className="mt-5 max-w-2xl leading-8 text-slate-400">
                    A sample report is available to demonstrate the
                    proposed research presentation and analytical
                    structure. It is fictional educational material,
                    not a live research recommendation or investment advice.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/account/register"
                    className="rounded-lg bg-cyan-400 px-6 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Create an Account
                  </Link>

                  <Link
                    href="/account/login"
                    className="rounded-lg border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-400"
                  >
                    Existing User Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Links */}
        <section className="border-t border-white/10 bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Transparency
                </p>

                <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                  Regulatory information and disclosures.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  Review KARDB's current regulatory status, disclosures
                  and published policies.
                </p>
              </div>

              <Link
                href="/regulatory"
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-cyan-500/50 px-6 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/10"
              >
                Visit Regulatory Centre
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
