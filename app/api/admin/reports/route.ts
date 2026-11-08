
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function GET(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get("batch_id");

    if (
      !batchId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(batchId)
    ) {
      return NextResponse.json(
        { error: "A valid batch ID is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("research_reports")
      .select(
        "id, batch_id, company_name, report_title, sequence_number, status, created_at"
      )
      .eq("batch_id", batchId)
      .order("sequence_number", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Could not fetch research reports." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reports: data });
  } catch {
    return NextResponse.json(
      { error: "Could not load research reports." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();
  let storagePath: string | null = null;

  try {
    const formData = await request.formData();

    const batchId = formData.get("batch_id");
    const companyName = formData.get("company_name");
    const reportTitle = formData.get("report_title");
    const sequenceValue = formData.get("sequence_number");
    const file = formData.get("file");

    if (
      typeof batchId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(batchId)
    ) {
      return NextResponse.json(
        { error: "Please select a valid monthly batch." },
        { status: 400 }
      );
    }

    if (
      typeof companyName !== "string" ||
      !companyName.trim() ||
      companyName.trim().length > 100
    ) {
      return NextResponse.json(
        { error: "Valid company name is required." },
        { status: 400 }
      );
    }

    if (
      typeof reportTitle !== "string" ||
      !reportTitle.trim() ||
      reportTitle.trim().length > 200
    ) {
      return NextResponse.json(
        { error: "Valid report title is required." },
        { status: 400 }
      );
    }

    const sequenceNumber = Number(sequenceValue);

    if (
      !Number.isInteger(sequenceNumber) ||
      sequenceNumber < 1 ||
      sequenceNumber > 6
    ) {
      return NextResponse.json(
        { error: "Sequence number must be between 1 and 6." },
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

    const fileBytes = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    const pdfSignature = new TextDecoder().decode(fileBytes);

    if (pdfSignature !== "%PDF-") {
      return NextResponse.json(
        { error: "The selected file is not a valid PDF." },
        { status: 400 }
      );
    }

    const { data: batch, error: batchError } = await supabase
      .from("monthly_batches")
      .select("id, status")
      .eq("id", batchId)
      .maybeSingle();

    if (batchError || !batch) {
      return NextResponse.json(
        { error: "Selected monthly batch was not found." },
        { status: 404 }
      );
    }

    if (batch.status !== "draft") {
      return NextResponse.json(
        { error: "Reports can only be added to draft batches." },
        { status: 400 }
      );
    }

    const { data: existingReport, error: checkError } = await supabase
      .from("research_reports")
      .select("id")
      .eq("batch_id", batchId)
      .eq("sequence_number", sequenceNumber)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { error: "Could not verify the report sequence." },
        { status: 500 }
      );
    }

    if (existingReport) {
      return NextResponse.json(
        { error: "This sequence number is already occupied." },
        { status: 409 }
      );
    }

    storagePath = `${batchId}/${sequenceNumber}-${crypto.randomUUID()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("research-reports")
      .upload(storagePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      storagePath = null;

      return NextResponse.json(
        { error: "Could not upload PDF to private storage." },
        { status: 500 }
      );
    }

    const { data: report, error: insertError } = await supabase
      .from("research_reports")
      .insert({
        batch_id: batchId,
        company_name: companyName.trim(),
        report_title: reportTitle.trim(),
        sequence_number: sequenceNumber,
        storage_path: storagePath,
        status: "draft",
      })
      .select()
      .single();

    if (insertError) {
      await supabase.storage
        .from("research-reports")
        .remove([storagePath]);

      storagePath = null;

      return NextResponse.json(
        { error: "PDF uploaded, but report record could not be created." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, report },
      { status: 201 }
    );
  } catch {
    if (supabase && storagePath) {
      await supabase.storage
        .from("research-reports")
        .remove([storagePath]);
    }

    return NextResponse.json(
      { error: "Request failed. Please check admin access." },
      { status: 500 }
    );
  }
}
