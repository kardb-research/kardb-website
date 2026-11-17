
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { requireAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_RECORDS = 500;

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
      return errorResponse("Please select an FII/DII CSV file.", 400);
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
      "fii_buy",
      "fii_sell",
      "dii_buy",
      "dii_sell",
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

      const fiiBuy = numberValue(row.fii_buy);
      const fiiSell = numberValue(row.fii_sell);
      const diiBuy = numberValue(row.dii_buy);
      const diiSell = numberValue(row.dii_sell);

      if (
        !validDate(tradeDate) ||
        fiiBuy === null ||
        fiiSell === null ||
        diiBuy === null ||
        diiSell === null ||
        fiiBuy < 0 ||
        fiiSell < 0 ||
        diiBuy < 0 ||
        diiSell < 0
      ) {
        return errorResponse(
          `Invalid FII/DII data for ${tradeDate || "unknown date"}.`,
          400
        );
      }

      if (seen.has(tradeDate)) {
        return errorResponse(
          `Duplicate trade date: ${tradeDate}`,
          400
        );
      }

seen.add(tradeDate);

records.push({
  trade_date: tradeDate,
  fii_buy: fiiBuy,
  fii_sell: fiiSell,
  fii_net: Number((fiiBuy - fiiSell).toFixed(2)),
  dii_buy: diiBuy,
  dii_sell: diiSell,
  dii_net: Number((diiBuy - diiSell).toFixed(2)),
  source: "KARDB_FII_DII_CSV",
});
}
    const { data, error } = await supabase
      .from("market_eod_fii_dii")
      .upsert(records, {
        onConflict: "trade_date",
      })
      .select(
        "trade_date,fii_buy,fii_sell,fii_net,dii_buy,dii_sell,dii_net"
      );

    if (error) {
      console.error("FII/DII import failed:", error);

      return errorResponse("Database import failed.", 500);
    }

    return NextResponse.json({
      success: true,
      message: "FII/DII data imported successfully.",
      imported_records: data?.length ?? 0,
      records: data,
      source_file: file.name,
    });
  } catch (error) {
    console.error("FII/DII import error:", error);

    return errorResponse(
      "Unable to process FII/DII CSV.",
      500
    );
  }
}
