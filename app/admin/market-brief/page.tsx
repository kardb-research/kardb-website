import PageShell from "@/components/PageShell";
import { requireAdmin } from "@/lib/supabase/admin";
import CentralMarketDataImporter from "@/components/CentralMarketDataImporter";
import MarketBreadthPanel from "@/components/MarketBreadthPanel";

const indexCards = [
  { name: "NIFTY 50", symbol: "NIFTY" },
  { name: "SENSEX", symbol: "SENSEX" },
  { name: "BANK NIFTY", symbol: "BANKNIFTY" },
];

function getChangeColor(change: number) {
  if (change > 0) return "text-emerald-400";
  if (change < 0) return "text-red-400";
  return "text-slate-400";
}

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default async function MarketBriefAdminPage() {
  const { supabase } = await requireAdmin();

  const { data: indexRows } = await supabase
    .from("market_eod_indices")
    .select("trade_date, index_symbol, open, high, low, close, previous_close")
    .in("index_symbol", ["NIFTY", "SENSEX", "BANKNIFTY"])
    .order("trade_date", { ascending: false });

  const { data: vixData } = await supabase
    .from("market_eod_vix")
    .select("trade_date, close, previous_close")
    .order("trade_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: fiiDiiData } = await supabase
    .from("market_eod_fii_dii")
    .select("trade_date, fii_buy, fii_sell, dii_buy, dii_sell")
    .order("trade_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const latestIndexData: Record<
    string,
    NonNullable<typeof indexRows>[number]
  > = {};

  for (const row of indexRows ?? []) {
    if (!latestIndexData[row.index_symbol]) {
      latestIndexData[row.index_symbol] = row;
    }
  }

  const vixClose = vixData ? Number(vixData.close) : 0;
  const vixPrevious = vixData ? Number(vixData.previous_close) : 0;
  const vixChange = vixClose - vixPrevious;
  const vixPercentage =
    vixPrevious > 0 ? (vixChange / vixPrevious) * 100 : 0;

  const fiiBuy = fiiDiiData ? Number(fiiDiiData.fii_buy) : 0;
  const fiiSell = fiiDiiData ? Number(fiiDiiData.fii_sell) : 0;
  const diiBuy = fiiDiiData ? Number(fiiDiiData.dii_buy) : 0;
  const diiSell = fiiDiiData ? Number(fiiDiiData.dii_sell) : 0;
  const fiiNet = fiiBuy - fiiSell;
  const diiNet = diiBuy - diiSell;

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
            Daily market overview, volatility, institutional activity and market breadth.
          </p>
        </div>

        {/* Main Market Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indexCards.map((item) => {
            const data = latestIndexData[item.symbol];

            if (!data) {
              return (
                <div
                  key={item.symbol}
                  className="rounded-xl border border-slate-700 bg-slate-900/60 p-6"
                >
                  <p className="text-sm font-semibold text-slate-400">
                    {item.name}
                  </p>
                  <p className="mt-4 text-sm text-slate-500">
                    Waiting for verified market data
                  </p>
                </div>
              );
            }

            const close = Number(data.close);
            const previous = Number(data.previous_close);
            const change = close - previous;
            const percentage =
              previous > 0 ? (change / previous) * 100 : 0;

            const changeColor = getChangeColor(change);

            return (
              <div
                key={item.symbol}
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-6"
              >
                <p className="text-sm font-semibold text-slate-400">
                  {item.name}
                </p>

                <p className="mt-4 text-3xl font-black text-white">
                  {close.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Previous Close: {previous.toLocaleString("en-IN")}
                </p>

                <p className={`mt-2 text-sm font-bold ${changeColor}`}>
                  {change > 0 ? "+" : ""}
                  {change.toLocaleString("en-IN")} pts
                </p>

                <p className={`mt-2 text-sm font-bold ${changeColor}`}>
                  {percentage > 0 ? "+" : ""}
                  {percentage.toFixed(2)}%
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <p className="text-slate-400">
                    Open:{" "}
                    <span className="text-white">
                      {Number(data.open).toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="text-slate-400">
                    High:{" "}
                    <span className="text-white">
                      {Number(data.high).toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="text-slate-400">
                    Low:{" "}
                    <span className="text-white">
                      {Number(data.low).toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>

                <p className="mt-3 text-xs text-emerald-400">
                  Data: {data.trade_date}
                </p>
              </div>
            );
          })}

          {/* India VIX */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-slate-400">
              INDIA VIX
            </p>

            {vixData ? (
              <>
                <p className="mt-4 text-3xl font-black text-white">
                  {vixClose.toFixed(2)}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Previous Close: {vixPrevious.toFixed(2)}
                </p>

                <p
                  className={`mt-2 text-sm font-bold ${getChangeColor(vixChange)}`}
                >
                  {vixChange > 0 ? "+" : ""}
                  {vixChange.toFixed(2)} pts
                </p>

                <p
                  className={`mt-2 text-sm font-bold ${getChangeColor(vixChange)}`}
                >
                  {vixPercentage > 0 ? "+" : ""}
                  {vixPercentage.toFixed(2)}%
                </p>

                <p className="mt-4 text-xs text-emerald-400">
                  Data: {vixData.trade_date}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Waiting for verified India VIX data
              </p>
            )}
          </div>

          {/* FII / DII Activity */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-slate-400">
              FII / DII ACTIVITY
            </p>

            {fiiDiiData ? (
              <>
                <p className="mt-2 text-xs text-emerald-400">
                  Trade Date: {fiiDiiData.trade_date}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-white">
                    FII Activity
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <p>Buy: {formatIndianNumber(fiiBuy)}</p>
                    <p>Sell: {formatIndianNumber(fiiSell)}</p>
                  </div>
                  <p className={`mt-2 text-lg font-black ${getChangeColor(fiiNet)}`}>
                    Net: {fiiNet > 0 ? "+" : ""}
                    {formatIndianNumber(fiiNet)}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-700 pt-3">
                  <p className="text-sm font-semibold text-white">
                    DII Activity
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <p>Buy: {formatIndianNumber(diiBuy)}</p>
                    <p>Sell: {formatIndianNumber(diiSell)}</p>
                  </div>
                  <p className={`mt-2 text-lg font-black ${getChangeColor(diiNet)}`}>
                    Net: {diiNet > 0 ? "+" : ""}
                    {formatIndianNumber(diiNet)}
                  </p>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Values in ₹ Crores
                </p>
              </>
            ) : (
              <>
                <p className="mt-4 text-2xl font-black text-white">
                  Awaiting Data
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  FII Net Buy / Sell
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  DII Net Buy / Sell
                </p>
                <p className="mt-4 text-xs font-semibold text-amber-400">
                  No FII/DII records found
                </p>
              </>
            )}
          </div>
        </div>

        {/* Market Breadth */}
        <MarketBreadthPanel />

        {/* Market Data Importer */}
        <CentralMarketDataImporter />
      </section>
    </PageShell>
  );
}
