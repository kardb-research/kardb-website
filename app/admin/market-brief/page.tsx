
import PageShell from "@/components/PageShell";
import { requireAdmin } from "@/lib/supabase/admin";
import CentralMarketDataImporter from "@/components/CentralMarketDataImporter";
import MarketBreadthPanel from "@/components/MarketBreadthPanel";

const indexCards = [
  { name: "NIFTY 50", symbol: "NIFTY" },
  { name: "SENSEX", symbol: "SENSEX" },
  { name: "BANK NIFTY", symbol: "BANKNIFTY" },
];

const marketSections = [
  { name: "NIFTY 500 Advance–Decline", active: true },
  { name: "Market Health Score", active: true },
  { name: "India VIX", active: true },
  { name: "FII / DII Activity", active: false },
  { name: "USD / INR", active: false },
  { name: "NIFTY P/E and P/B", active: false },
  { name: "Sector Performance", active: false },
  { name: "Top Gainers and Losers", active: false },
];

export default async function MarketBriefAdminPage() {
  const { supabase } = await requireAdmin();

  const { data: indexRows, error: indexError } = await supabase
    .from("market_eod_indices")
    .select("trade_date, index_symbol, open, high, low, close, previous_close")
    .in("index_symbol", ["NIFTY", "SENSEX", "BANKNIFTY"])
    .order("trade_date", { ascending: false });

  const { data: vixData, error: vixError } = await supabase
    .from("market_eod_vix")
    .select("trade_date, open, high, low, close, previous_close")
    .order("trade_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const latestIndexData: Record<string, NonNullable<typeof indexRows>[number]> = {};

  for (const row of indexRows ?? []) {
    if (!latestIndexData[row.index_symbol]) {
      latestIndexData[row.index_symbol] = row;
    }
  }

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-400">
            KARDB MARKET INTELLIGENCE
          </p>

          <h1 className="mt-3 text-3xl font-black text-white">
            Market Pulse Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Daily market intelligence, breadth and institutional activity.
          </p>

          <p className="mt-3 text-sm text-emerald-400">
            Historical NSE EOD data connected — NIFTY 500 breadth analysis active.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indexCards.map((item) => (
            <div
              key={item.symbol}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-6"
            >
              <p className="text-sm font-semibold text-slate-400">
                {item.name}
              </p>

                            {latestIndexData[item.symbol] ? (
                <>
                  <p className="mt-4 text-3xl font-black text-white">
                    {Number(latestIndexData[item.symbol].close).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Previous Close:{" "}
                    {Number(latestIndexData[item.symbol].previous_close).toLocaleString("en-IN")}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      Number(latestIndexData[item.symbol].close) >
                      Number(latestIndexData[item.symbol].previous_close)
                        ? "text-emerald-400"
                        : Number(latestIndexData[item.symbol].close) <
                          Number(latestIndexData[item.symbol].previous_close)
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {Number(latestIndexData[item.symbol].close) -
                      Number(latestIndexData[item.symbol].previous_close) > 0
                      ? "+"
                      : ""}
                    {(
                      Number(latestIndexData[item.symbol].close) -
                      Number(latestIndexData[item.symbol].previous_close)
                    ).toLocaleString("en-IN")} pts
                  </p>
                  <p
                    className={`mt-2 text-sm font-bold ${
                      Number(latestIndexData[item.symbol].close) >
                      Number(latestIndexData[item.symbol].previous_close)
                        ? "text-emerald-400"
                        : Number(latestIndexData[item.symbol].close) <
                          Number(latestIndexData[item.symbol].previous_close)
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {Number(latestIndexData[item.symbol].close) >
                    Number(latestIndexData[item.symbol].previous_close)
                      ? "+"
                      : ""}
                    {(
                      ((Number(latestIndexData[item.symbol].close) -
                        Number(latestIndexData[item.symbol].previous_close)) /
                        Number(latestIndexData[item.symbol].previous_close)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <p className="text-slate-400">
                      Open: <span className="text-white">
                        {Number(latestIndexData[item.symbol].open).toLocaleString("en-IN")}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      High: <span className="text-white">
                        {Number(latestIndexData[item.symbol].high).toLocaleString("en-IN")}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      Low: <span className="text-white">
                        {Number(latestIndexData[item.symbol].low).toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>

                  <p className="mt-3 text-xs text-emerald-400">
                    Data: {latestIndexData[item.symbol].trade_date}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  Waiting for verified market data
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-slate-900/60 p-6">
          <h2 className="text-xl font-bold text-white">India VIX</h2>

          {vixData ? (
            <>
              <p className="mt-4 text-3xl font-black text-white">
                {Number(vixData.close).toFixed(2)}
              </p>

              {(() => {
                const change =
                  Number(vixData.close) - Number(vixData.previous_close);
                const percentage =
                  (change / Number(vixData.previous_close)) * 100;
                const color =
                  change > 0
                    ? "text-red-400"
                    : change < 0
                    ? "text-emerald-400"
                    : "text-slate-400";

                return (
                  <p className={`mt-2 text-sm font-bold ${color}`}>
                    {change > 0 ? "+" : ""}
                    {change.toFixed(2)} points (
                    {percentage > 0 ? "+" : ""}
                    {percentage.toFixed(2)}%)
                  </p>
                );
              })()}

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <p className="text-slate-400">Open: <span className="text-white">{Number(vixData.open).toFixed(2)}</span></p>
                <p className="text-slate-400">High: <span className="text-white">{Number(vixData.high).toFixed(2)}</span></p>
                <p className="text-slate-400">Low: <span className="text-white">{Number(vixData.low).toFixed(2)}</span></p>
                <p className="text-slate-400">Previous Close: <span className="text-white">{Number(vixData.previous_close).toFixed(2)}</span></p>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Trade Date: {vixData.trade_date}
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              India VIX data unavailable.
            </p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-white">
            Market Intelligence Indicators
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketSections.map((section) => (
              <div
                key={section.name}
                className="rounded-xl border border-slate-700 bg-slate-950/50 p-5"
              >
                <h3 className="font-semibold text-white">
                  {section.name}
                </h3>

                <p
                  className={`mt-3 text-sm ${
                    section.active
                      ? "text-emerald-400"
                      : "text-slate-500"
                  }`}
                >
                  {section.active ? "Active" : "Data integration pending"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <MarketBreadthPanel />

        <CentralMarketDataImporter />

        <div className="mt-10 rounded-xl border border-cyan-500/30 bg-slate-900/50 p-6">
          <h2 className="text-lg font-bold text-white">
            Automatic Market Updates
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Automatic market updates will be enabled once an authorised
            market data provider is connected.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            All displayed values will include their data timestamp.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
