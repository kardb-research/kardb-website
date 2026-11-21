
import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Pricing & Access | KARDB",
  description:
    "Learn about KARDB's sample research material and future research access. Paid research subscriptions are not currently available.",
  alternates: {
    canonical: "https://kardb.com/pricing",
  },
  openGraph: {
    title: "Pricing & Access | KARDB",
    description:
      "Explore sample research material and learn about future KARDB research access.",
    url: "https://kardb.com/pricing",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pricing & Access | KARDB",
    description:
      "Explore sample research material and learn about future KARDB research access.",
  },
};

export default function PricingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            PRICING & ACCESS
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Transparent access.
            <span className="block text-cyan-400">
              Research in development.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            KARDB is developing a structured equity research platform.
            Sample research material may be explored for educational
            and illustrative purposes. Paid research subscriptions
            and regulated Research Analyst services are not currently
            being offered.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
              SAMPLE MATERIAL
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Explore sample research
            </h2>

            <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
              Review illustrative research material to understand
              KARDB's proposed analytical structure, presentation
              style and research methodology.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Illustrative sample research</li>
              <li>✓ Research methodology overview</li>
              <li>✓ Example analytical presentation</li>
            </ul>

            <Link
              href="/reports"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              View Sample Material
            </Link>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Sample material is illustrative and does not constitute
              a live research subscription or investment recommendation.
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-slate-400">
              FUTURE ACCESS
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Research subscriptions
            </h2>

            <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
              KARDB is evaluating future research access options.
              Any proposed plans, features, fees and subscription
              terms will be communicated separately when the
              platform is ready to offer such services.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>• Research access options under development</li>
              <li>• Future pricing to be announced</li>
              <li>• Applicable terms and disclosures to be published</li>
            </ul>

            <div className="mt-8 rounded-lg border border-slate-700 px-5 py-3 text-center text-sm font-bold text-slate-400">
              Not Currently Available
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              No paid subscription or payment is being accepted
              through this page.
            </p>
          </article>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/30 p-7">
          <h2 className="text-xl font-bold">
            How future pricing will be communicated
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Before any paid research service is introduced, KARDB
            intends to publish the applicable subscription options,
            fees, service scope, access conditions, payment terms
            and relevant disclosures. Any future offering will be
            subject to applicable regulatory requirements and
            operational readiness.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-7">
          <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
            PLATFORM AND REGULATORY STATUS
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            KARDB is under development.
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            KARDB has not been granted SEBI registration as a
            Research Analyst as of 21 November 2026. The platform
            is under development. KARDB is not currently offering
            paid research subscriptions or regulated Research
            Analyst services.
          </p>

          <Link
            href="/regulatory"
            className="mt-5 inline-flex text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
          >
            View Regulatory Information
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Want to understand how KARDB approaches research?
          </p>

          <Link
            href="/methodology"
            className="mt-3 inline-flex text-sm font-bold text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
          >
            Explore Research Methodology
          </Link>
        </div>
      </section>
    </PageShell>
  );
}