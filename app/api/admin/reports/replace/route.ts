import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();
  let newStoragePath: string | null = null;

  try {
    const formData = await request.formData();

    const reportId = formData.get("report_id");
    const file = formData.get("file");

    if (
      typeof reportId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reportId)
    ) {
      return NextResponse.json(
        { error: "A valid report ID is required." },
        { status: 400 }
      );
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Please select a PDF file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "PDF size must not exceed 20 MB." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    const fileBytes = new Uint8Array(
      await file.slice(0, 5).arrayBuffer()
    );

    if (new TextDecoder().decode(fileBytes) !== "%PDF-") {
      return NextResponse.json(
        { error: "The selected file is not a valid PDF." },
        { status: 400 }
      );
    }

    const { data: report, error: reportError } = await supabase
      .from("research_reports")
      .select("id, batch_id, sequence_number, storage_path, status")
      .eq("id", reportId)
      .maybeSingle();

    if (reportError || !report) {
      return NextResponse.json(
        { error: "Research report not found." },
        { status: 404 }
      );
    }

    if (report.status !== "draft" || !report.storage_path) {
      return NextResponse.json(
        { error: "Only draft reports with an existing PDF can be replaced." },
        { status: 400 }
      );
    }

    const { data: batch, error: batchError } = await supabase
      .from("monthly_batches")
      .select("status")
      .eq("id", report.batch_id)
      .maybeSingle();

    if (batchError || !batch || batch.status !== "draft") {
      return NextResponse.json(
        { error: "Only reports in draft batches can be replaced." },
        { status: 400 }
      );
    }

    const oldStoragePath = report.storage_path;

    newStoragePath =
      `${report.batch_id}/${report.sequence_number}-${crypto.randomUUID()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("research-reports")
      .upload(newStoragePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      newStoragePath = null;

      return NextResponse.json(
        { error: "Could not upload replacement PDF." },
        { status: 500 }
      );
    }

    const { data: updatedReport, error: updateError } = await supabase
      .from("research_reports")
      .update({ storage_path: newStoragePath })
      .eq("id", reportId)
      .eq("status", "draft")
      .select()
      .maybeSingle();

    if (updateError || !updatedReport) {
      await supabase.storage
        .from("research-reports")
        .remove([newStoragePath]);

      newStoragePath = null;

      return NextResponse.json(
        { error: "Could not update the report record." },
        { status: 500 }
      );
    }

    const { error: cleanupError } = await supabase.storage
      .from("research-reports")
      .remove([oldStoragePath]);

    newStoragePath = null;

    return NextResponse.json({
      success: true,
      report: updatedReport,
      warning: cleanupError
        ? "New PDF saved, but the previous file could not be removed."
        : null,
    });
  } catch {
    if (newStoragePath) {
      await supabase.storage
        .from("research-reports")
        .remove([newStoragePath]);
    }

    return NextResponse.json(
      { error: "PDF replacement failed." },
      { status: 500 }
    );
  }
}