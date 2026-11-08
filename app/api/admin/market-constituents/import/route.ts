
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { requireAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_RECORDS = 600;

type Constituent = {
  "Company Name": string;
  Industry: string;
  Symbol: string;
  Series: string;
  "ISIN Code": string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

async function readLimitedBody(request: Request): Promise<Uint8Array> {
  const contentLength = Number(request.headers.get("content-length"));

  if (
    request.headers.has("content-length") &&
    (!Number.isFinite(contentLength) ||
      contentLength < 0 ||
      contentLength > MAX_FILE_SIZE + 64 * 1024)
  ) {
    throw new Error("UPLOAD_TOO_LARGE");
  }

  if (!request.body) {
    throw new Error("EMPTY_BODY");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      total += value.byteLength;

      if (total > MAX_FILE_SIZE + 64 * 1024) {
        await reader.cancel();
        throw new Error("UPLOAD_TOO_LARGE");
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const result = new Uint8Array(total);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result;
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
      const origin = request.headers.get("origin");
    const requestOrigin = new URL(request.url).origin;

    if (!origin || origin !== requestOrigin) {
      return errorResponse("Invalid request origin.", 403);
    }
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return errorResponse("Please upload a CSV file.", 415);
    }

    let body: Uint8Array;

    try {
      body = await readLimitedBody(request);
    } catch (error) {
      if (error instanceof Error && error.message === "UPLOAD_TOO_LARGE") {
        return errorResponse("Upload size exceeds the allowed limit.", 413);
      }

      return errorResponse("Could not read the uploaded file.", 400);
    }

    let formData: FormData;

    try {
      const safeBuffer = new ArrayBuffer(body.byteLength);
new Uint8Array(safeBuffer).set(body);

const boundedRequest = new Request(request.url, {
  method: "POST",
  headers: request.headers,
  body: safeBuffer,
});

formData = await boundedRequest.formData();
    } catch {
      return errorResponse("Invalid upload form.", 400);
    }

    const file = formData.get("file");
    const snapshotDate = formData.get("snapshot_date");

    if (!(file instanceof File)) {
      return errorResponse("Please select a CSV file.", 400);
    }

    if (
      typeof snapshotDate !== "string" ||
      !isValidDate(snapshotDate)
    ) {
      return errorResponse("Please provide a valid snapshot date.", 400);
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return errorResponse("Only CSV files are allowed.", 400);
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return errorResponse("CSV must be between 1 byte and 2 MB.", 400);
    }

    let csvText: string;

    try {
      const bytes = await file.arrayBuffer();
      csvText = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      return errorResponse("CSV must use valid UTF-8 encoding.", 400);
    }

    let rows: string[][];

    try {
      rows = parse(csvText, {
        bom: true,
        skip_empty_lines: true,
        trim: true,
        relax_quotes: false,
        max_record_size: 10000,
      });
    } catch {
      return errorResponse("CSV formatting is invalid.", 400);
    }

    const expectedHeaders = [
      "Company Name",
      "Industry",
      "Symbol",
      "Series",
      "ISIN Code",
    ];

    if (
      rows.length < 2 ||
      rows[0].length !== expectedHeaders.length ||
      !expectedHeaders.every((header, index) => rows[0][index] === header)
    ) {
      return errorResponse(
        "CSV headers do not match the official NSE NIFTY 500 format.",
        400
      );
    }

    const dataRows = rows.slice(1);

    if (dataRows.length > MAX_RECORDS) {
      return errorResponse("Too many constituent records.", 400);
    }

    const symbols = new Set<string>();
    const isins = new Set<string>();
    const items: Constituent[] = [];

    for (let index = 0; index < dataRows.length; index++) {
      const row = dataRows[index];

      if (row.length !== expectedHeaders.length) {
        return errorResponse(
          `Invalid number of columns at CSV row ${index + 2}.`,
          400
        );
      }

      const [
        companyName,
        industry,
        symbolValue,
        seriesValue,
        isinValue,
      ] = row;

      const symbol = symbolValue.toUpperCase();
      const series = seriesValue.toUpperCase();
      const isin = isinValue.toUpperCase();
const isDummyConstituent =
  symbol.startsWith("DUMMY") &&
  companyName.toUpperCase().startsWith("DUMMY");

const validIsin = isDummyConstituent
  ? /^(?:DUM[A-Z0-9]{9}|DU[A-Z0-9]{10})$/.test(isin)
  : /^IN[A-Z0-9]{10}$/.test(isin);

      if (
        !companyName ||
        companyName.length > 200 ||
        !industry ||
        industry.length > 100 ||
        !/^[A-Z0-9&.-]{1,30}$/.test(symbol) ||
        !/^[A-Z0-9]{1,10}$/.test(series) ||
        !validIsin
      ) {
        return errorResponse(
          `Invalid constituent data at CSV row ${index + 2}.`,
          400
        );
      }

      if (symbols.has(symbol)) {
        return errorResponse(`Duplicate symbol found: ${symbol}`, 400);
      }

      if (isins.has(isin)) {
        return errorResponse(`Duplicate ISIN found: ${isin}`, 400);
      }

      symbols.add(symbol);
      isins.add(isin);

      items.push({
        "Company Name": companyName,
        Industry: industry,
        Symbol: symbol,
        Series: series,
        "ISIN Code": isin,
      });
    }

    const rpcItems = items.map((item) => ({
      company_name: item["Company Name"],
      industry: item.Industry,
      symbol: item.Symbol,
      series: item.Series,
      isin: item["ISIN Code"],
    }));

    const { data, error } = await supabase.rpc(
      "import_market_constituent_snapshot",
      {
        p_index_symbol: "NIFTY500",
        p_snapshot_date: snapshotDate,
        p_source: "NSE",
        p_source_file: file.name.slice(0, 255),
        p_items: rpcItems,
      }
    );

    if (error) {
  console.error("NIFTY500 import RPC failed:", {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });

  if (error.code === "23505") {
    return errorResponse(
      "A snapshot already exists for this date.",
      409
    );
  }

  return errorResponse(
    "Database import failed. Check server terminal for details.",
    500
  );
}

    return NextResponse.json(
      {
        success: true,
        message: "NIFTY 500 constituents imported successfully.",
        result: data,
      },
      { status: 201 }
    );
  } catch {
    return errorResponse("Authentication or import request failed.", 500);
  }
}
