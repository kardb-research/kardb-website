
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

const indices = [
  { name: "NIFTY 50", symbol: "NIFTY" },
  { name: "SENSEX", symbol: "SENSEX" },
  { name: "BANK NIFTY", symbol: "BANKNIFTY" },
];
const sectorIndices = [
  { name: "NIFTY IT", symbol: "NIFTYIT" },
  { name: "NIFTY METAL", symbol: "NIFTYMETAL" },
  { name: "NIFTY AUTO", symbol: "NIFTYAUTO" },
  { name: "NIFTY REALTY", symbol: "NIFTYREALTY" },
  { name: "NIFTY PHARMA", symbol: "NIFTYPHARMA" },
  { name: "NIFTY MIDCAP 100", symbol: "NIFTYMIDCAP100" },
  { name: "NIFTY SMALLCAP 100", symbol: "NIFTYSMALLCAP100" },
];

function formatNumber(value: number, decimals = 2) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function changeColor(change: number) {
  return change > 0
    ? "text-emerald-400"
    : change < 0
      ? "text-red-400"
      : "text-slate-400";
}

function MarketCard({
  name,
  close,
  previous,
  tradeDate,
  decimals = 2,
  unit = "",
  compact = false,
}: {
  name: string;
  close: number | null;
  previous: number | null;
  tradeDate: string | null;
  decimals?: number;
  unit?: string;
  compact?: boolean;
}) {
  if (close === null || previous === null) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-sm font-semibold text-slate-400">{name}</h2>
        <p className="mt-4 text-sm text-slate-500">Data unavailable</p>
      </div>
    );
  }

  const change = close - previous;
  const percentage = previous !== 0 ? (change / previous) * 100 : 0;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold text-slate-400">{name}</h2>

      <p className="mt-4 text-3xl font-black text-white">
        {formatNumber(close, decimals)}
      </p>

      <p className={`mt-2 text-sm font-bold ${changeColor(change)}`}>
        {change > 0 ? "+" : ""}
        {formatNumber(change, decimals)}{unit} (
        {percentage > 0 ? "+" : ""}
        {percentage.toFixed(2)}%)
      </p>

      {!compact && (
        <p className="mt-4 text-xs text-slate-500">
          Previous Close: {formatNumber(previous, decimals)}
        </p>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Trade Date: {tradeDate ?? "—"}
      </p>
    </div>
  );
}

export default async function SubscriberMarketBriefPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    redirect("/account/login?reason=verification");
  }

  const { data: accessData, error: accessError } =
    await supabase.rpc("get_trial_access");

  if (accessError || !accessData?.length) {
    redirect("/account/login?reason=verification");
  }

  const access = accessData[0];

  const canAccessMarketBrief =
    access.is_admin === true ||
    access.has_active_subscription === true ||
    access.is_trial_active === true;

  if (!canAccessMarketBrief) {
    redirect("/account/subscription");
  }

  const [
    { data: indexRows },
    { data: vixData },
    { data: breadth },
    { data: fiiDiiData },
  ] = await Promise.all([
    supabase
      .from("market_eod_indices")
      .select("trade_date, index_symbol, open, high, low, close, previous_close")
      .in(
        "index_symbol",
        [...indices, ...sectorIndices].map((item) => item.symbol)
      )
      .order("trade_date", { ascending: false }),

    supabase
      .from("market_eod_vix")
      .select("trade_date, close, previous_close")
      .order("trade_date", { ascending: false })
      .limit(1)
      .maybeSingle(),

    supabase
      .from("market_eod_stocks")
      .select("trade_date, close, previous_close")
      .order("trade_date", { ascending: false })
      .limit(500),

    supabase
      .from("market_eod_fii_dii")
      .select("trade_date, fii_buy, fii_sell, fii_net, dii_buy, dii_sell, dii_net")
      .order("trade_date", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const latestIndexData: Record<
    string,
    NonNullable<typeof indexRows>[number]
  > = {};

  for (const row of indexRows ?? []) {
    if (!latestIndexData[row.index_symbol]) {
      latestIndexData[row.index_symbol] = row;
    }
  }

  const advances = (breadth ?? []).filter(
    (row) => Number(row.close) > Number(row.previous_close)
  ).length;

  const declines = (breadth ?? []).filter(
    (row) => Number(row.close) < Number(row.previous_close)
  ).length;

  const unchanged = (breadth ?? []).length - advances - declines;

  const ratio =
    declines > 0 ? (advances / declines).toFixed(2) : "—";

  const total = breadth?.length ?? 0;

  const fiiNet = fiiDiiData ? Number(fiiDiiData.fii_net) : null;
  const diiNet = fiiDiiData ? Number(fiiDiiData.dii_net) : null;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold text-cyan-400">
          KARDB EQUITY RESEARCH
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          Market Pulse
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Indian equity market overview and daily market intelligence.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indices.map((item) => {
            const data = latestIndexData[item.symbol];

            return (
              <MarketCard
                key={item.symbol}
                name={item.name}
                close={data ? Number(data.close) : null}
                previous={data ? Number(data.previous_close) : null}
                tradeDate={data?.trade_date ?? null}
                decimals={2}
              />
            );
          })}

          <MarketCard
            name="INDIA VIX"
            close={vixData ? Number(vixData.close) : null}
            previous={vixData ? Number(vixData.previous_close) : null}
            tradeDate={vixData?.trade_date ?? null}
            decimals={2}
            compact
          />

          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
            <h2 className="text-sm font-semibold text-slate-400">
              FII / DII ACTIVITY
            </h2>

            {fiiDiiData ? (
              <>
                <p className="mt-3 text-xs text-slate-500">
                  Trade Date: {fiiDiiData.trade_date}
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-300">
                      FII Activity
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <p>Buy: {formatNumber(Number(fiiDiiData.fii_buy), 0)}</p>
                      <p>Sell: {formatNumber(Number(fiiDiiData.fii_sell), 0)}</p>
                    </div>
                    <p className={`mt-2 text-xl font-bold ${changeColor(fiiNet ?? 0)}`}>
                      Net: {fiiNet !== null && fiiNet > 0 ? "+" : ""}
                      {formatNumber(fiiNet ?? 0, 0)}
                    </p>
                  </div>

                  <div className="border-t border-slate-700 pt-3">
                    <p className="text-sm font-semibold text-slate-300">
                      DII Activity
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <p>Buy: {formatNumber(Number(fiiDiiData.dii_buy), 0)}</p>
                      <p>Sell: {formatNumber(Number(fiiDiiData.dii_sell), 0)}</p>
                    </div>
                    <p className={`mt-2 text-xl font-bold ${changeColor(diiNet ?? 0)}`}>
                      Net: {diiNet !== null && diiNet > 0 ? "+" : ""}
                      {formatNumber(diiNet ?? 0, 0)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-slate-500">
                  FII / DII data not available
                </p>
              </div>
            )}
          </div>

          {/* Sector Data - all seven indices visible, no click required */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-slate-400">
              SECTOR DATA
            </h2>

            <div className="mt-4 space-y-3">
              {sectorIndices.map((item) => {
                const data = latestIndexData[item.symbol];
                const close = data ? Number(data.close) : null;
                const previous = data ? Number(data.previous_close) : null;
                const change =
                  close !== null && previous !== null
                    ? close - previous
                    : null;
                const percentage =
                  previous !== null && previous > 0 && change !== null
                    ? (change / previous) * 100
                    : null;

                return (
                  <div
                    key={item.symbol}
                    className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-medium text-slate-300">
                      {item.name}
                    </span>

                    {close !== null && change !== null && percentage !== null ? (
                      <span className="whitespace-nowrap text-right text-xs font-semibold text-white">
{formatNumber(close)}{" "}
<span className={changeColor(change)}>
  {change > 0 ? "+" : ""}
  {formatNumber(change)} (
  {percentage > 0 ? "+" : ""}
  {percentage.toFixed(2)}%)
</span>
</span>
) : (
  <span className="text-xs text-slate-500">
    Data unavailable
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
              Trade Date: {latestIndexData["NIFTYIT"]?.trade_date ?? "—"}
            </p>
          </div>
        </div>


        <div
          id="market-breadth"
          className="mt-10 scroll-mt-8 rounded-xl border border-slate-700 bg-slate-900/60 p-6"
        >
          <h2 className="text-xl font-bold text-white">
            NIFTY 500 Advance / Decline
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">Advances</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {advances}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Declines</p>
              <p className="mt-2 text-2xl font-bold text-red-400">
                {declines}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Unchanged</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {unchanged}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Advance / Decline
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {ratio}
              </p>
            </div>
          </div>

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="bg-emerald-500"
              style={{
                width: `${total ? (advances / total) * 100 : 0}%`,
              }}
            />
            <div
              className="bg-red-500"
              style={{
                width: `${total ? (declines / total) * 100 : 0}%`,
              }}
            />
            <div
              className="bg-slate-500"
              style={{
                width: `${total ? (unchanged / total) * 100 : 0}%`,
              }}
            />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Based on available imported EOD stock records.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Trade Date: {breadth?.[0]?.trade_date ?? "—"}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
