
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Research Reports | KARDB",
  description:
    "Explore KARDB's proposed company research framework and report transparency approach.",
  alternates: {
    canonical: "https://kardb.com/reports",
  },
  openGraph: {
    title: "Research Reports | KARDB",
    description:
      "Explore KARDB's research framework and report transparency approach.",
    url: "https://kardb.com/reports",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Research Reports | KARDB",
    description:
      "Explore KARDB's research framework and report transparency approach.",
  },
};

export default function ReportsPage() {
  return (
    <PageShell>
      <main>
        {/* Hero */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <p className="text-sm font-bold tracking-[0.25em] text-cyan-400">
              KARDB RESEARCH LIBRARY
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Research, organised.
              <span className="block text-cyan-400">
                Information with context.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              This section introduces the KARDB research presentation
              approach, report structure and transparency principles.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
              Reports and research material should be read with their
              publication dates, underlying information, assumptions,
              limitations and relevant disclosures.
            </p>

            <div className="mt-9">
              <Link
                href="/methodology"
                className="inline-block rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400"
              >
                View Methodology
              </Link>
            </div>
          </div>
        </section>

        {/* Paid Research Status */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              RESEARCH SERVICE AVAILABILITY
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Subscription research services.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Paid research subscriptions and regulated Research Analyst
              services are not currently being offered by KARDB.
              Information about future service availability will be
              communicated through the platform when applicable.
            </p>

            <div className="mt-9 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7 md:p-9">
              <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
                REGULATORY STATUS
              </p>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Platform under development
              </h3>

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

        {/* Report Transparency */}
        <section className="border-t border-slate-800 bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              REPORT TRANSPARENCY
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-4xl">
              Understanding a report beyond its conclusion.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              A research report should be understood in the context of
              the information and assumptions supporting its analysis.
              Relevant dates, limitations, risks and disclosures matter
              when interpreting research findings.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
                <h3 className="text-lg font-bold text-white">
                  Research information
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  The relevant company information, financial periods,
                  data references and research dates help establish
                  the context of an analysis.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7">
                <h3 className="text-lg font-bold text-white">
                  Assumptions and limitations
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Estimates, assumptions, uncertainties and potential
                  risks should be considered alongside analytical
                  conclusions.
                </p>
              </article>
            </div>

            <Link
              href="/regulatory/disclaimers"
              className="mt-8 inline-block text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
            >
              Read research disclaimers
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
