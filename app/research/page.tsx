import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";

const researchModules = [
  {
    number: "01",
    title: "Fundamental Research",
    description:
      "Analyse business performance, financial statements, profitability, growth and cash-flow quality.",
  },
  {
    number: "02",
    title: "Ratio Analysis",
    description:
      "Evaluate profitability, efficiency, leverage, liquidity and return-based financial indicators.",
  },
  {
    number: "03",
    title: "Peer Comparison",
    description:
      "Compare relevant companies using consistent financial and operating metrics.",
  },
  {
    number: "04",
    title: "Industry Analysis",
    description:
      "Study industry structure, competitive dynamics, cycles and important external factors.",
  },
  {
    number: "05",
    title: "Technical Analysis",
    description:
      "Study price structure, trend, momentum, support, resistance and market behaviour.",
  },
  {
    number: "06",
    title: "Research Output",
    description:
      "Convert analysed data into structured reports, tables, charts and research insights.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Data",
    text: "Collect and organise relevant financial, operating and market data.",
  },
  {
    number: "02",
    title: "Analysis",
    text: "Analyse growth, profitability, cash flows, ratios and business performance.",
  },
  {
    number: "03",
    title: "Comparison",
    text: "Compare relevant metrics across periods, peers and industry context.",
  },
  {
    number: "04",
    title: "Interpretation",
    text: "Connect the numbers with business quality, industry dynamics and market structure.",
  },
  {
    number: "05",
    title: "Output",
    text: "Present findings through structured reports, charts, tables and insights.",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold tracking-tight"
          >
            KARDB<span className="text-cyan-400">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">

            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link
              href="/research"
              className="text-white"
            >
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

            <Link href="/about" className="hover:text-white">
              About
            </Link>

            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>

            <Link href="/regulatory" className="hover:text-white">
              Regulatory
            </Link>

          </div>

          {/* Account */}
          <div className="flex items-center gap-3">

            <Link
              href="/account/login"
              className="hidden text-sm text-slate-300 hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/account/register"
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Get Started
            </Link>

          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="overflow-x-auto border-t border-white/10 lg:hidden">
          <div className="mx-auto flex min-w-max gap-5 px-6 py-3 text-sm text-slate-300">

            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>

            <Link href="/research" className="text-cyan-400">
              Research
            </Link>

            <Link href="/reports" className="hover:text-cyan-400">
              Reports
            </Link>

            <Link href="/methodology" className="hover:text-cyan-400">
              Methodology
            </Link>

            <Link href="/pricing" className="hover:text-cyan-400">
              Pricing
            </Link>

            <Link href="/about" className="hover:text-cyan-400">
              About
            </Link>

            <Link href="/faq" className="hover:text-cyan-400">
              FAQ
            </Link>

            <Link href="/regulatory" className="hover:text-cyan-400">
              Regulatory
            </Link>

          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24">
        <div className="max-w-4xl">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            KARDB Research
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Structured research.
            <br />
            Clear analysis.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            A structured framework for analysing listed companies through
            financial data, ratios, peer comparison, industry context and
            market behaviour.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/reports"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
            >
              Explore Reports
            </Link>

            <Link
              href="/methodology"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:border-slate-500"
            >
              View Methodology
            </Link>

          </div>

        </div>
      </section>

      {/* Research Framework */}
      <section
        id="framework"
        className="border-y border-white/10 bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Research Framework
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Analyse the business through multiple layers.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              KARDB separates research into defined analytical layers so that
              financial performance, business quality, industry structure and
              market behaviour can be examined systematically.
            </p>

          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {researchModules.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-white/10 bg-slate-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
              >

                <div className="text-sm font-semibold text-cyan-400">
                  {item.number}
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Research Workflow */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Research Workflow
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            From data to structured research.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            A consistent process helps transform raw financial and market
            information into a structured research output.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-5">

          {workflow.map((step) => (
            <div key={step.number}>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 text-sm font-semibold text-cyan-400">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {step.text}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* Research Philosophy */}
      <section className="border-y border-white/10 bg-slate-900/50">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Research Philosophy
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Numbers first.
              <br />
              Structure always.
            </h2>

          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-400">

            <p>
              KARDB focuses on structured analysis rather than relying on a
              single metric or isolated market signal.
            </p>

            <p>
              Financial performance, ratios, peer data, industry context and
              market behaviour are studied together to create a broader
              research view.
            </p>

            <p>
              The objective is to make the research process transparent,
              repeatable and easy to understand.
            </p>

            <Link
              href="/reports"
              className="inline-block text-cyan-400 hover:text-cyan-300"
            >
              Explore Research Reports →
            </Link>

          </div>

        </div>

      </section>

      <SiteFooter />


    </main>
  );
}