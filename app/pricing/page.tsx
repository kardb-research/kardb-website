
import PageShell from "@/components/PageShell";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "Currently unavailable",
    description: "Explore the KARDB research framework.",
    features: [
      "Selected research",
      "Basic financial information",
      "Methodology access",
      "Selected reports",
    ],
  },
  {
    name: "Research",
    price: "₹0",
    period: "Coming soon",
    description: "For users who want deeper structured research.",
    features: [
      "Full research reports",
      "Financial analysis",
      "Ratio analysis",
      "Peer comparison",
      "Industry analysis",
      "Research archive",
    ],
  },
  {
    name: "Pro",
    price: "₹0",
    period: "Coming soon",
    description: "For users seeking the complete research experience.",
    features: [
      "Everything in Research",
      "Advanced peer analysis",
      "Technical analysis",
      "Detailed company research",
      "Sector research",
      "Premium reports",
    ],
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            PRICING
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Research access is coming soon.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            KARDB is currently under development, and its SEBI Research
            Analyst registration is awaited. Paid research services are
            not currently available. Pricing and access options will be
            announced only after applicable regulatory requirements are met.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                i === 2
                  ? "border-cyan-400 bg-cyan-400/5"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              {i === 2 && (
                <div className="mb-5 inline-block rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-slate-950">
                  PLANNED PLAN
                </div>
              )}

              <h2 className="text-2xl font-bold">{plan.name}</h2>

              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                {plan.description}
              </p>

              <div className="mt-7">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="ml-2 text-sm text-slate-500">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-7 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg border border-slate-700 px-4 py-3 text-center text-sm font-bold text-slate-400">
                Coming Soon
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-sm leading-6 text-slate-400">
          <p className="font-bold text-slate-200">
            Important notice
          </p>
          <p className="mt-2">
            Prices shown as ₹0 do not represent a live service or a free
            research subscription. Plans are under development, and paid
            services are not currently available through this page.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
