import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">

          <Link
            href="/"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/kardb-logo.png"
              alt="KARDB Equity Research"
              width={130}
              height={130}
              className="h-14 w-14 object-contain"
              priority
            />
          </Link>

          <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">

            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/research" className="hover:text-white">
              Research
            </Link>

            <Link href="/reports" className="hover:text-white">
              Reports
            </Link>

            <Link href="/methodology" className="hover:text-white">
              Methodology
            </Link>

            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link href="/about" className="text-white">
              About
            </Link>

            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>

            <Link href="/regulatory" className="hover:text-white">
              Regulatory
            </Link>

          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/account/login"
              className="hidden text-sm text-slate-300 hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/account/register"
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              Get Started
            </Link>

          </div>

        </div>
      </nav>

      {/* About Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          About KARDB
        </p>

        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Research built around
          <br />
          the numbers.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          KARDB is being developed as a structured equity research platform
          focused on understanding businesses through financial analysis,
          ratios, peer comparison, industry context and market behaviour.
        </p>

      </section>

      {/* Founder Section */}
      <section className="border-y border-white/10 bg-slate-900/50">

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">

          {/* Photo */}
          <div className="flex justify-center md:justify-start">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">

              <Image
                src="/deepak-bhandari.png"
                alt="Deepak Bhandari"
                width={700}
                height={880}
                className="h-auto w-full max-w-md object-cover"
                priority
              />

            </div>

          </div>

          {/* Content */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Founder & Research
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Deepak Bhandari
            </h2>

            <p className="mt-2 text-lg text-cyan-400">
              Founder — KARDB Equity Research
            </p>

            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-400">

              <p>
                KARDB is being developed with the objective of creating a
                structured approach to equity research where financial data,
                business analysis and market behaviour can be studied together.
              </p>

              <p>
                The research framework focuses on understanding the business,
                analysing financial performance, studying ratios, comparing
                relevant peers and evaluating industry and market context.
              </p>

              <p>
                The aim is to make research structured, transparent and easier
                to understand rather than relying on a single financial metric
                or isolated market signal.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* KARDB Identity */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              KARDB Equity Research
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              A structured research framework.
            </h2>

          </div>

          <div className="flex items-center justify-center">

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-10">

              <Image
                src="/kardb-logo.png"
                alt="KARDB Equity Research"
                width={300}
                height={300}
                className="h-56 w-56 object-contain"
              />

            </div>

          </div>

        </div>

      </section>

      {/* What KARDB Studies */}
      <section className="border-y border-white/10 bg-slate-900/50">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            What We Study
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Multiple layers of company research.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Business",
                text: "Business model, products, competitive positioning and growth drivers.",
              },
              {
                title: "Financials",
                text: "Revenue, profitability, margins, cash flow and balance sheet strength.",
              },
              {
                title: "Ratios",
                text: "Profitability, efficiency, leverage, liquidity and return indicators.",
              },
              {
                title: "Peers",
                text: "Consistent comparison with relevant companies and operating metrics.",
              },
              {
                title: "Industry",
                text: "Industry structure, cycles, competition and external factors.",
              },
              {
                title: "Market Behaviour",
                text: "Price structure, trends, momentum, support and resistance.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-7"
              >

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

          <div>

            <Link href="/" className="inline-flex">
              <Image
                src="/kardb-logo.png"
                alt="KARDB Equity Research"
                width={130}
                height={130}
                className="h-20 w-20 object-contain"
              />
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
              Structured research focused on business, financials, ratios,
              peers, industry context and market behaviour.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              Platform
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-500">

              <Link href="/research" className="block hover:text-cyan-400">
                Research
              </Link>

              <Link href="/reports" className="block hover:text-cyan-400">
                Research Reports
              </Link>

              <Link href="/methodology" className="block hover:text-cyan-400">
                Methodology
              </Link>

              <Link href="/pricing" className="block hover:text-cyan-400">
                Pricing
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              Resources
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-500">

              <Link href="/about" className="block hover:text-cyan-400">
                About
              </Link>

              <Link href="/faq" className="block hover:text-cyan-400">
                FAQ
              </Link>

              <Link
                href="/account/login"
                className="block hover:text-cyan-400"
              >
                Login
              </Link>

              <Link
                href="/account/register"
                className="block hover:text-cyan-400"
              >
                Register
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              Regulatory
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-500">

              <Link href="/regulatory" className="block hover:text-cyan-400">
                Regulatory Disclosures
              </Link>

              <Link
                href="/regulatory/investor-charter"
                className="block hover:text-cyan-400"
              >
                Investor Charter
              </Link>

              <Link
                href="/regulatory/complaints"
                className="block hover:text-cyan-400"
              >
                Investor Complaints
              </Link>

              <Link
                href="/regulatory/grievance"
                className="block hover:text-cyan-400"
              >
                Grievance Redressal
              </Link>

              <Link
                href="/regulatory/disclaimers"
                className="block hover:text-cyan-400"
              >
                Disclaimers
              </Link>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} KARDB. All rights reserved.
        </div>

      </footer>

    </main>
  );
}