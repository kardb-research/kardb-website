import PageShell from "@/components/PageShell";
import { requireAdmin } from "@/lib/supabase/admin";
import EconomicDataImporter from "@/components/EconomicDataImporter";

const categories = [
  "Inflation",
  "GDP Growth",
  "Economic Growth",
  "Monetary Policy",
  "Banking Credit & Deposit",
  "External Sector",
  "Forex Reserves",
];

export default async function EconomicIntelligenceAdminPage() {
  const { supabase } = await requireAdmin();

  const { data: indicators, error } = await supabase
    .from("economic_indicators")
    .select("id, indicator_code, indicator_name, category, unit, frequency, is_active")
    .order("category")
    .order("indicator_name");

  const activeIndicators =
    indicators?.filter((item) => item.is_active).length ?? 0;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-400">
            KARDB ECONOMIC INTELLIGENCE
          </p>
          <h1 className="mt-3 text-3xl font-black text-white">
            Economic Data Management
          </h1>
          <p className="mt-2 text-slate-400">
            Manage the latest official figures and the period-wise observations
            used in the Economic Intelligence charts.
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
            Unable to load economic indicators.
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Data Categories</p>
                <p className="mt-3 text-3xl font-black text-white">
                  {categories.length}
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Active Indicators</p>
                <p className="mt-3 text-3xl font-black text-white">
                  {activeIndicators}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-white">
                Approved Data Categories
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => {
                  const categoryIndicators =
                    indicators?.filter(
                      (item) => item.category === category && item.is_active
                    ) ?? [];
                  return (
                    <div
                      key={category}
                      className="rounded-xl border border-slate-700 bg-slate-900/60 p-5"
                    >
                      <h3 className="font-bold text-white">{category}</h3>
                      <p className="mt-3 text-2xl font-black text-cyan-400">
                        {categoryIndicators.length}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Active Indicators
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-white">
                Registered Indicators
              </h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full min-w-[750px] text-left text-sm">
                  <thead className="bg-slate-800 text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Indicator</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Unit</th>
                      <th className="px-4 py-3">Frequency</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(indicators ?? []).map((indicator) => (
                      <tr
                        key={indicator.id}
                        className="border-t border-slate-700 text-slate-300"
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-white">
                            {indicator.indicator_name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {indicator.indicator_code}
                          </p>
                        </td>
                        <td className="px-4 py-3">{indicator.category}</td>
                        <td className="px-4 py-3">{indicator.unit}</td>
                        <td className="px-4 py-3">{indicator.frequency}</td>
                        <td className="px-4 py-3">
                          {indicator.is_active ? (
                            <span className="text-emerald-400">Active</span>
                          ) : (
                            <span className="text-red-400">Inactive</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <EconomicDataImporter />
          </>
        )}
      </section>
    </PageShell>
  );
}
