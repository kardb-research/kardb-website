
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { requireAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_RECORDS = 5000;

const REQUIRED_HEADERS = [
  "TradDt",
  "Sgmt",
  "FinInstrmTp",
  "TckrSymb",
  "SctySrs",
  "OpnPric",
  "HghPric",
  "LwPric",
  "ClsPric",
  "PrvsClsgPric",
  "TtlTradgVol",
];

function numberValue(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const cleaned = String(value).replace(/,/g, "").trim();

  if (!cleaned) return null;

  const result = Number(cleaned);

  return Number.isFinite(result) ? result : null;
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const origin = request.headers.get("origin");

    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const tradeDate = formData.get("trade_date");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Please select an NSE Common Bhavcopy CSV file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "CSV file must not exceed 2 MB." },
        { status: 400 }
      );
    }

    if (typeof tradeDate !== "string" || !validDate(tradeDate)) {
      return NextResponse.json(
        { error: "Please provide a valid trading date." },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        { error: "Only NSE CSV files are accepted." },
        { status: 400 }
      );
    }

    const csvText = await file.text();

    const rows = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
      relax_column_count: false,
      max_record_size: 20000,
    }) as Record<string, string>[];

    if (rows.length === 0 || rows.length > MAX_RECORDS) {
      return NextResponse.json(
        { error: "CSV contains no records or too many records." },
        { status: 400 }
      );
    }

    const actualHeaders = Object.keys(rows[0]);

    const missingHeaders = REQUIRED_HEADERS.filter(
      (header) => !actualHeaders.includes(header)
    );

    if (missingHeaders.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid NSE Common Bhavcopy format.",
          missing_headers: missingHeaders,
          received_headers: actualHeaders,
        },
        { status: 400 }
      );
    }

    const fileDates = new Set(
      rows
        .map((row) => String(row.TradDt || "").trim())
        .filter(Boolean)
    );

    if (
      fileDates.size !== 1 ||
      !fileDates.has(tradeDate)
    ) {
      return NextResponse.json(
        {
          error:
            "The CSV trading date does not match the selected Trade Date.",
          file_dates: Array.from(fileDates),
          selected_trade_date: tradeDate,
        },
        { status: 400 }
      );
    }

    // Find the latest constituent snapshot valid for this trading date.
    const { data: snapshot, error: snapshotError } = await supabase
      .from("market_constituent_snapshots")
      .select("id, snapshot_date, record_count")
      .eq("index_symbol", "NIFTY500")
      .lte("snapshot_date", tradeDate)
      .order("snapshot_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (snapshotError || !snapshot) {
      console.error("NIFTY500 snapshot lookup error:", snapshotError);

      return NextResponse.json(
        {
          error:
            "No NIFTY500 constituent snapshot found for this trading date.",
        },
        { status: 404 }
      );
    }

    const { data: constituents, error: constituentsError } =
      await supabase
        .from("market_constituent_snapshot_items")
        .select("symbol, series")
        .eq("snapshot_id", snapshot.id);

    if (constituentsError || !constituents?.length) {
      return NextResponse.json(
        { error: "Could not load NIFTY500 constituents." },
        { status: 500 }
      );
    }

    const constituentMap = new Map<string, string>();

    for (const item of constituents) {
      const symbol = String(item.symbol).trim().toUpperCase();
      const series = String(item.series).trim().toUpperCase();

      constituentMap.set(`${symbol}|${series}`, symbol);
    }

    const seen = new Set<string>();
    const importedKeys = new Set<string>();

    const eodRecords: {
      trade_date: string;
      symbol: string;
      series: string;
      open: number;
      high: number;
      low: number;
      close: number;
      previous_close: number;
      volume: number;
      source: string;
    }[] = [];

    const skippedSymbols = new Set<string>();
    const invalidRecords: string[] = [];
    const duplicateRecords: string[] = [];

    for (const row of rows) {
      const segment = String(row.Sgmt || "").trim().toUpperCase();
      const instrumentType = String(row.FinInstrmTp || "")
        .trim()
        .toUpperCase();

      // Only cash-market security records are relevant.
      if (segment !== "CM" || instrumentType !== "STK") {
        continue;
      }

      const symbol = String(row.TckrSymb || "").trim().toUpperCase();
      const series = String(row.SctySrs || "").trim().toUpperCase();

      if (!symbol || !series) continue;

      const key = `${symbol}|${series}`;

      // Ignore securities outside the NIFTY500 snapshot.
      if (!constituentMap.has(key)) {
        skippedSymbols.add(symbol);
        continue;
      }

      if (seen.has(key)) {
        duplicateRecords.push(key);
        continue;
      }

      seen.add(key);

      const open = numberValue(row.OpnPric);
      const high = numberValue(row.HghPric);
      const low = numberValue(row.LwPric);
      const close = numberValue(row.ClsPric);
      const previousClose = numberValue(row.PrvsClsgPric);
      const volume = numberValue(row.TtlTradgVol);

      if (
        open === null ||
        high === null ||
        low === null ||
        close === null ||
        previousClose === null ||
        volume === null ||
        open <= 0 ||
        high <= 0 ||
        low <= 0 ||
        close <= 0 ||
        previousClose <= 0 ||
        volume < 0 ||
        !Number.isSafeInteger(volume) ||
        high < Math.max(open, close) ||
        low > Math.min(open, close) ||
        high < low
      ) {
        invalidRecords.push(key);
        continue;
      }

      eodRecords.push({
        trade_date: tradeDate,
        symbol,
        series,
        open,
        high,
        low,
        close,
        previous_close: previousClose,
        volume,
        source: "NSE_COMMON_BHAVCOPY",
      });

      importedKeys.add(key);
    }

    const missingStocks = constituents
      .filter((item) => {
        const key = `${String(item.symbol).trim().toUpperCase()}|${String(
          item.series
        ).trim().toUpperCase()}`;

        return !importedKeys.has(key);
      })
      .map((item) => ({
        symbol: item.symbol,
        series: item.series,
      }));

    if (eodRecords.length === 0) {
      return NextResponse.json(
        {
          error: "No valid NIFTY500 records found in this CSV.",
          missing_count: missingStocks.length,
          missing_stocks: missingStocks,
          skipped_count: skippedSymbols.size,
          invalid_count: invalidRecords.length,
        },
        { status: 400 }
      );
    }

    const { data: savedRecords, error: importError } = await supabase
      .from("market_eod_stocks")
      .upsert(eodRecords, {
        onConflict: "trade_date,symbol,series",
      })
      .select("symbol, series");

    if (importError) {
      console.error("NSE EOD import failed:", importError);

      return NextResponse.json(
        { error: "Database import failed. Please check server logs." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "NSE Common Bhavcopy imported successfully.",
      trade_date: tradeDate,
      snapshot_date: snapshot.snapshot_date,
      total_constituents: constituents.length,
      matched_records: eodRecords.length,
      imported_records: savedRecords?.length ?? 0,
      missing_count: missingStocks.length,
      missing_stocks: missingStocks,
      skipped_count: skippedSymbols.size,
      skipped_symbols: Array.from(skippedSymbols),
      invalid_count: invalidRecords.length,
      invalid_records: invalidRecords,
      duplicate_count: duplicateRecords.length,
      duplicate_records: duplicateRecords,
      source_file: file.name,
    });
  } catch (error) {
    console.error("NSE Common Bhavcopy import error:", error);

    return NextResponse.json(
      { error: "Unable to process NSE Common Bhavcopy file." },
      { status: 500 }
    );
  }
}
