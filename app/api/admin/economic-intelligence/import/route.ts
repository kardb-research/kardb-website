import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { requireAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_RECORDS = 500;

const EXPECTED_HEADERS = [
  "indicator_code",
  "period_start",
  "period_end",
  "period_label",
  "value",
  "publication_date",
  "source",
];

type CsvRecord = {
  indicator_code: string;
  period_start: string;
  period_end: string;
  period_label: string;
  value: number;
  publication_date: string | null;
  source: string | null;
};

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
  if (typeof value !== "string" && typeof value !== "number") return null;
  const cleaned = String(value).replace(/,/g, "").trim();
  if (!cleaned) return null;
  const result = Number(cleaned);
  return Number.isFinite(result) ? result : null;
}

function observationKey(
  indicatorId: string,
  periodStart: string,
  periodEnd: string
) {
  return `${indicatorId}|${periodStart}|${periodEnd}`;
}

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();

    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) {
      return errorResponse("Invalid request origin.", 403);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const action = formData.get("action");

    if (action !== "validate" && action !== "import") {
      return errorResponse("Invalid import action.", 400);
    }

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse("Please select an economic data CSV file.", 400);
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

    if (
      rows.length === 0 ||
      rows.length > MAX_RECORDS ||
      Object.keys(rows[0]).length !== EXPECTED_HEADERS.length ||
      EXPECTED_HEADERS.some((header) => !Object.keys(rows[0]).includes(header))
    ) {
      return errorResponse("CSV headers or record count are invalid.", 400);
    }

    const seen = new Set<string>();
    const parsedRecords: CsvRecord[] = [];

    for (const row of rows) {
      const indicatorCode = String(row.indicator_code || "")
        .trim()
        .toUpperCase();
      const periodStart = String(row.period_start || "").trim();
      const periodEnd = String(row.period_end || "").trim();
      const periodLabel = String(row.period_label || "").trim();
      const value = numberValue(row.value);
      const publicationDate = String(row.publication_date || "").trim();
      const source = String(row.source || "").trim();

      if (
        !indicatorCode ||
        !validDate(periodStart) ||
        !validDate(periodEnd) ||
        periodEnd < periodStart ||
        !periodLabel ||
        periodLabel.length > 100 ||
        value === null ||
        (publicationDate && !validDate(publicationDate)) ||
        source.length > 200
      ) {
        return errorResponse(
          `Invalid economic data for ${indicatorCode || "unknown indicator"}.`,
          400
        );
      }

      const duplicateKey = `${indicatorCode}|${periodStart}|${periodEnd}`;
      if (seen.has(duplicateKey)) {
        return errorResponse(
          `Duplicate CSV record: ${indicatorCode}, ${periodLabel}`,
          400
        );
      }

      seen.add(duplicateKey);
      parsedRecords.push({
        indicator_code: indicatorCode,
        period_start: periodStart,
        period_end: periodEnd,
        period_label: periodLabel,
        value,
        publication_date: publicationDate || null,
        source: source || null,
      });
    }

    const indicatorCodes = [
      ...new Set(parsedRecords.map((record) => record.indicator_code)),
    ];

    const { data: indicators, error: indicatorError } = await supabase
      .from("economic_indicators")
      .select("id, indicator_code, indicator_name, source")
      .in("indicator_code", indicatorCodes)
      .eq("is_active", true);

    if (indicatorError) {
      console.error("Economic indicator lookup failed:", indicatorError);
      return errorResponse("Unable to validate indicators.", 500);
    }

    const indicatorMap = new Map(
      (indicators ?? []).map((indicator) => [
        indicator.indicator_code,
        indicator,
      ])
    );

    for (const record of parsedRecords) {
      if (!indicatorMap.has(record.indicator_code)) {
        return errorResponse(
          `Unknown or inactive indicator: ${record.indicator_code}`,
          400
        );
      }
    }

    const observations = parsedRecords.map((record) => {
      const indicator = indicatorMap.get(record.indicator_code)!;
      return {
        indicator_id: indicator.id,
        period_start: record.period_start,
        period_end: record.period_end,
        period_label: record.period_label,
        value: record.value,
        publication_date: record.publication_date,
        source: record.source || indicator.source,
        indicator_code: record.indicator_code,
        indicator_name: indicator.indicator_name,
      };
    });

    // Find already-imported exact indicator + reporting-period combinations.
    // Existing records are skipped, never updated or overwritten.
    const indicatorIds = [
      ...new Set(observations.map((record) => record.indicator_id)),
    ];
    const periodStarts = [
      ...new Set(observations.map((record) => record.period_start)),
    ];

    const { data: existing, error: existingError } = await supabase
      .from("economic_indicator_observations")
      .select("indicator_id, period_start, period_end")
      .in("indicator_id", indicatorIds)
      .in("period_start", periodStarts);

    if (existingError) {
      console.error("Duplicate check failed:", existingError);
      return errorResponse("Unable to check existing observations.", 500);
    }

    const existingKeys = new Set(
      (existing ?? []).map((record) =>
        observationKey(
          record.indicator_id,
          record.period_start,
          record.period_end
        )
      )
    );

    const existingRecords = observations.filter((record) =>
      existingKeys.has(
        observationKey(
          record.indicator_id,
          record.period_start,
          record.period_end
        )
      )
    );

    const newRecords = observations.filter(
      (record) =>
        !existingKeys.has(
          observationKey(
            record.indicator_id,
            record.period_start,
            record.period_end
          )
        )
    );

    const previewRecords = newRecords.map((record) => ({
      indicator_code: record.indicator_code,
      indicator_name: record.indicator_name,
      period_start: record.period_start,
      period_end: record.period_end,
      period_label: record.period_label,
      value: record.value,
      publication_date: record.publication_date,
      source: record.source,
    }));

    if (action === "validate") {
      return NextResponse.json({
        success: true,
        action: "validate",
        message:
          newRecords.length > 0
            ? "CSV validated. Existing observations will be skipped; only new observations are eligible for import."
            : "CSV is valid, but all observations already exist. Nothing new needs importing.",
        total_records: parsedRecords.length,
        valid_records: newRecords.length,
        skipped_existing_records: existingRecords.length,
        records: previewRecords,
        source_file: file.name,
      });
    }

    if (newRecords.length === 0) {
      return NextResponse.json({
        success: true,
        action: "import",
        message: "No new observations. All CSV records already exist; nothing was changed.",
        imported_records: 0,
        skipped_existing_records: existingRecords.length,
        records: [],
        source_file: file.name,
      });
    }

    // INSERT ONLY. Existing rows are never updated or overwritten.
    const insertPayload = newRecords.map(
      ({
        indicator_code: _indicatorCode,
        indicator_name: _indicatorName,
        ...record
      }) => record
    );

    const { data, error } = await supabase
      .from("economic_indicator_observations")
      .insert(insertPayload)
      .select("id, indicator_id, period_start, period_end, period_label, value");

    if (error) {
      console.error("Economic data import failed:", error);
      if (error.code === "23505") {
        return errorResponse(
          "A matching observation was inserted by another request during this import. No existing data was overwritten. Please validate the CSV again to refresh the skipped/new counts.",
          409
        );
      }
      return errorResponse("Database import failed.", 500);
    }

    return NextResponse.json({
      success: true,
      action: "import",
      message: "New economic observations imported. Existing observations were skipped and not changed.",
      imported_records: data?.length ?? 0,
      skipped_existing_records: existingRecords.length,
      records: data,
      source_file: file.name,
    });
  } catch (error) {
    console.error("Economic import error:", error);
    return errorResponse("Unable to process economic data CSV.", 500);
  }
}
