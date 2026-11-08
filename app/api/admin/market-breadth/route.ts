
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { calculateMarketBreadth } from "@/lib/market/breadth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const requestedDate = searchParams.get("date");

    let tradeDate = requestedDate;

    if (!tradeDate) {
      const { data: latestRecord, error } = await supabase
        .from("market_eod_stocks")
        .select("trade_date")
        .order("trade_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !latestRecord) {
        return NextResponse.json(
          { error: "No EOD market data available." },
          { status: 404 }
        );
      }

      tradeDate = latestRecord.trade_date;
    }

    if (!tradeDate || !/^\d{4}-\d{2}-\d{2}$/.test(tradeDate)) {
      return NextResponse.json(
        { error: "Invalid trading date." },
        { status: 400 }
      );
    }

    const { data: snapshot, error: snapshotError } = await supabase
      .from("market_constituent_snapshots")
      .select("id, snapshot_date")
      .eq("index_symbol", "NIFTY500")
      .lte("snapshot_date", tradeDate)
      .order("snapshot_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (snapshotError || !snapshot) {
      return NextResponse.json(
        { error: "No valid NIFTY500 constituent snapshot found." },
        { status: 404 }
      );
    }

    const { data: constituents, error: constituentError } = await supabase
      .from("market_constituent_snapshot_items")
      .select("symbol, series")
      .eq("snapshot_id", snapshot.id);

    if (constituentError || !constituents) {
      return NextResponse.json(
        { error: "Could not load NIFTY500 constituents." },
        { status: 500 }
      );
    }

    // Exclude the known dummy entry.
    const actualConstituents = constituents.filter(
      (item) => String(item.symbol).toUpperCase() !== "DUMMYHEG"
    );

    const { data: eodRecords, error: eodError } = await supabase
      .from("market_eod_stocks")
      .select("symbol, series, close, previous_close")
      .eq("trade_date", tradeDate);

    if (eodError) {
      return NextResponse.json(
        { error: "Could not load EOD market data." },
        { status: 500 }
      );
    }

    const eodMap = new Map(
      (eodRecords ?? []).map((record) => [
        `${String(record.symbol).toUpperCase()}|${String(record.series).toUpperCase()}`,
        record,
      ])
    );

    const stocks = actualConstituents.map((item) => {
      const key = `${String(item.symbol).toUpperCase()}|${String(item.series).toUpperCase()}`;
      const record = eodMap.get(key);

      if (!record) return null;

      return {
        symbol: String(item.symbol),
        currentPrice: Number(record.close),
        previousClose: Number(record.previous_close),
      };
    });

    const breadth = calculateMarketBreadth(stocks);

    const marketHealthScore =
      breadth.evaluatedStocks > 0
        ? Math.round(
            ((breadth.advances + breadth.unchanged * 0.5) /
              breadth.evaluatedStocks) *
              100
          )
        : null;

    return NextResponse.json({
      success: true,
      trade_date: tradeDate,
      snapshot_date: snapshot.snapshot_date,
      index: "NIFTY500",
      market_breadth: {
        ...breadth,
        marketHealthScore,
      },
    });
  } catch (error) {
    console.error("Market breadth API error:", error);

    return NextResponse.json(
      { error: "Unable to calculate market breadth." },
      { status: 500 }
    );
  }
}
