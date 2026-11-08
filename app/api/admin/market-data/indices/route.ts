
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { requireAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_RECORDS = 10;

const ALLOWED_INDICES = new Set([
  "NIFTY",
  "SENSEX",
  "BANKNIFTY",
]);

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function numberValue(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const cleaned = String(value).replace(/,/g, "").trim();

  if (!cleaned) return null;

  const result = Number(cleaned);

  return Number.isFinite(result) ? result : null;
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const origin = request.headers.get("origin");

    if (!origin || origin !== new URL(request.url).origin) {
      return errorResponse("Invalid request origin.", 403);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse("Please select an index CSV file.", 400);
    }

    if (
      !file.name.toLowerCase().endsWith(".csv") ||
      file.size > MAX_FILE_SIZE
    ) {
      return errorResponse("Only CSV files up to 2 MB are allowed.", 400);
    }

    let rows: Record<string, string>[];

    try {
      rows = parse(await file.text(), {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true,
        max_record_size: 10000,
      });
    } catch {
      return errorResponse("Invalid CSV format.", 400);
    }

    const expectedHeaders = [
      "trade_date",
      "index_symbol",
      "open",
      "high",
      "low",
      "close",
      "previous_close",
    ];

    if (
      rows.length === 0 ||
      rows.length > MAX_RECORDS ||
      expectedHeaders.some(
        (header) => !Object.keys(rows[0]).includes(header)
      ) ||
      Object.keys(rows[0]).length !== expectedHeaders.length
    ) {
      return errorResponse(
        "CSV headers or record count are invalid.",
        400
      );
    }

    const seen = new Set<string>();

    const records = [];

    for (const row of rows) {
      const tradeDate = String(row.trade_date || "").trim();
      const indexSymbol = String(row.index_symbol || "")
        .trim()
        .toUpperCase();

      const open = numberValue(row.open);
      const high = numberValue(row.high);
      const low = numberValue(row.low);
      const close = numberValue(row.close);

      const previousCloseText = String(
        row.previous_close ?? ""
      ).trim();

      const previousClose = previousCloseText
        ? numberValue(previousCloseText)
        : null;

      if (
        !validDate(tradeDate) ||
        !ALLOWED_INDICES.has(indexSymbol) ||
        open === null ||
        high === null ||
        low === null ||
        close === null ||
        open <= 0 ||
        high <= 0 ||
        low <= 0 ||
        close <= 0 ||
        (previousCloseText !== "" &&
          (previousClose === null || previousClose <= 0)) ||
        high < Math.max(open, close) ||
        low > Math.min(open, close) ||
        high < low
      ) {
        return errorResponse(
          `Invalid index data for ${indexSymbol || "unknown index"}.`,
          400
        );
      }

      const key = `${tradeDate}|${indexSymbol}`;

      if (seen.has(key)) {
        return errorResponse(`Duplicate record: ${key}`, 400);
      }

      seen.add(key);

      records.push({
        trade_date: tradeDate,
        index_symbol: indexSymbol,
        open,
        high,
        low,
        close,
        previous_close: previousClose,
        source: "KARDB_INDEX_CSV",
      });
    }

    const { data, error } = await supabase
      .from("market_eod_indices")
      .upsert(records, {
        onConflict: "trade_date,index_symbol",
      })
      .select(
        "trade_date,index_symbol,open,high,low,close,previous_close"
      );

    if (error) {
      console.error("Index EOD import failed:", error);

      return errorResponse(
        "Database import failed. Check server logs.",
        500
      );
    }

    return NextResponse.json({
      success: true,
      message: "Index EOD data imported successfully.",
      imported_records: data?.length ?? 0,
      records: data,
      source_file: file.name,
    });
  } catch (error) {
    console.error("Index import error:", error);

    return errorResponse("Unable to process index CSV.", 500);
  }
}
