import Link from "next/link";
import PageShell from "@/components/PageShell";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Explore the KARDB research framework.",
    features: ["Selected research", "Basic financial information", "Methodology access", "Selected reports"],
  },
  {
    name: "Research",
    price: "₹999",
    period: "per month",
    description: "For users who want deeper structured research.",
    features: ["Full research reports", "Financial analysis", "Ratio analysis", "Peer comparison", "Industry analysis", "Research archive"],
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "per month",
    description: "For users seeking the complete research experience.",
    features: ["Everything in Research", "Advanced peer analysis", "Technical analysis", "Detailed company research", "Sector research", "Premium reports"],
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">PRICING</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Research access that fits your needs.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Start free and upgrade when you need deeper research access.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article key={plan.name} className={`rounded-2xl border p-8 ${i === 2 ? "border-cyan-400 bg-cyan-400/5" : "border-slate-800 bg-slate-900/50"}`}>
              {i === 2 && <div className="mb-5 inline-block rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-slate-950">POPULAR</div>}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{plan.description}</p>
              <div className="mt-7">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="ml-2 text-sm text-slate-500">{plan.period}</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
              </ul>
              <Link href="/account/register" className="mt-8 block rounded-lg bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-cyan-300">
                Get Started
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-sm leading-6 text-slate-400">
          Pricing shown here is a product-design placeholder. Actual fees, applicable taxes,
          terms and regulatory disclosures should be finalised before paid research services are launched.
        </div>
      </section>
    </PageShell>
  );
}
