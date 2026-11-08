
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "@/components/PageShell";

const indices = [
  { name: "NIFTY 50", symbol: "NIFTY" },
  { name: "SENSEX", symbol: "SENSEX" },
  { name: "BANK NIFTY", symbol: "BANKNIFTY" },
];

export default async function SubscriberMarketBriefPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";
  const now = new Date().toISOString();

  if (!isAdmin) {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("plan_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .lte("starts_at", now)
      .gt("expires_at", now)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !subscription) {
      redirect("/account/login?reason=subscription-expired");
    }

    const { data: plan } = await supabase
      .from("plans")
      .select("id")
      .eq("id", subscription.plan_id)
      .eq("is_active", true)
      .maybeSingle();

    if (!plan) redirect("/account/login?reason=subscription-expired");
  }

  const { data: indexRows } = await supabase
    .from("market_eod_indices")
    .select("trade_date, index_symbol, open, high, low, close, previous_close")
    .in("index_symbol", ["NIFTY", "SENSEX", "BANKNIFTY"])
    .order("trade_date", { ascending: false });

  const latestIndexData: Record<string, NonNullable<typeof indexRows>[number]> = {};

  for (const row of indexRows ?? []) {
    if (!latestIndexData[row.index_symbol]) {
      latestIndexData[row.index_symbol] = row;
    }
  }
  const { data: vixData } = await supabase
    .from("market_eod_vix")
    .select("trade_date, open, high, low, close, previous_close")
    .order("trade_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: breadth } = await supabase
    .from("market_eod_stocks")
    .select("close, previous_close")
    .order("trade_date", { ascending: false })
    .limit(500);

  const advances = (breadth ?? []).filter(
    (row) => Number(row.close) > Number(row.previous_close)
  ).length;

  const declines = (breadth ?? []).filter(
    (row) => Number(row.close) < Number(row.previous_close)
  ).length;

  const unchanged = (breadth ?? []).length - advances - declines;

  const ratio = declines > 0
    ? (advances / declines).toFixed(2)
    : "—";

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

            if (!data) {
              return (
                <div key={item.symbol} className="rounded-xl border border-slate-700 bg-slate-900 p-6">
                  <h2 className="font-bold text-slate-400">{item.name}</h2>
                  <p className="mt-4 text-sm text-slate-500">Data unavailable</p>
                </div>
              );
            }

            const close = Number(data.close);
            const previous = Number(data.previous_close);
            const change = close - previous;
            const percentage = previous > 0 ? (change / previous) * 100 : 0;
            const positive = change > 0;
            const negative = change < 0;

            const changeColor = positive
              ? "text-emerald-400"
              : negative
              ? "text-red-400"
              : "text-slate-400";

            return (
              <div key={item.symbol} className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
                <h2 className="text-sm font-semibold text-slate-400">{item.name}</h2>

                <p className="mt-4 text-3xl font-black text-white">
                  {close.toLocaleString("en-IN")}
                </p>

                <p className={`mt-2 text-sm font-bold ${changeColor}`}>
                  {change > 0 ? "+" : ""}
                  {change.toLocaleString("en-IN")} pts
                  {" ("}
                  {percentage > 0 ? "+" : ""}
                  {percentage.toFixed(2)}%)
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <p className="text-slate-400">Open: <span className="text-white">{Number(data.open).toLocaleString("en-IN")}</span></p>
                  <p className="text-slate-400">High: <span className="text-white">{Number(data.high).toLocaleString("en-IN")}</span></p>
                  <p className="text-slate-400">Low: <span className="text-white">{Number(data.low).toLocaleString("en-IN")}</span></p>
                  <p className="text-slate-400">Prev. Close: <span className="text-white">{previous.toLocaleString("en-IN")}</span></p>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Trade Date: {data.trade_date}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900/60 p-6">
          <h2 className="text-xl font-bold text-white">
            NIFTY 500 Market Breadth
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">Advances</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">{advances}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Declines</p>
              <p className="mt-2 text-2xl font-bold text-red-400">{declines}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Unchanged</p>
              <p className="mt-2 text-2xl font-bold text-white">{unchanged}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Advance / Decline</p>
              <p className="mt-2 text-2xl font-bold text-white">{ratio}</p>
            </div>
          </div>

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="bg-emerald-500" style={{ width: `${breadth?.length ? advances / breadth.length * 100 : 0}%` }} />
            <div className="bg-red-500" style={{ width: `${breadth?.length ? declines / breadth.length * 100 : 0}%` }} />
            <div className="bg-slate-500 flex-1" />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Based on available imported EOD stock records.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-amber-500/30 bg-slate-900/60 p-6">
          <h2 className="text-xl font-bold text-white">
            India VIX
          </h2>

          {vixData ? (
            <>
              <p className="mt-4 text-3xl font-black text-white">
                {Number(vixData.close).toFixed(2)}
              </p>

              {(() => {
                const change =
                  Number(vixData.close) -
                  Number(vixData.previous_close);

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
                <p className="text-slate-400">
                  Open: <span className="text-white">{Number(vixData.open).toFixed(2)}</span>
                </p>
                <p className="text-slate-400">
                  High: <span className="text-white">{Number(vixData.high).toFixed(2)}</span>
                </p>
                <p className="text-slate-400">
                  Low: <span className="text-white">{Number(vixData.low).toFixed(2)}</span>
                </p>
                <p className="text-slate-400">
                  Previous Close: <span className="text-white">{Number(vixData.previous_close).toFixed(2)}</span>
                </p>
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


        <div className="mt-8 rounded-xl border border-cyan-500/30 bg-slate-900/50 p-6">
          <h2 className="text-lg font-bold text-white">Market Intelligence</h2>
          <p className="mt-2 text-sm text-slate-400">
            India VIX, FII/DII activity, sector performance and additional market indicators will be introduced as verified data integrations become available.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
