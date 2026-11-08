import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("report_id");

    if (
      !reportId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reportId)
    ) {
      return NextResponse.json(
        { error: "A valid report ID is required." },
        { status: 400 }
      );
    }

    const { data: report, error } = await supabase
      .from("research_reports")
      .select("id, storage_path")
      .eq("id", reportId)
      .maybeSingle();

    if (error || !report || !report.storage_path) {
      return NextResponse.json(
        { error: "Research report or PDF not found." },
        { status: 404 }
      );
    }

    const { data, error: storageError } = await supabase.storage
      .from("research-reports")
      .createSignedUrl(report.storage_path, 60);

    if (storageError || !data?.signedUrl) {
      return NextResponse.json(
        { error: "Could not generate secure PDF link." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch {
    return NextResponse.json(
      { error: "Could not open research report." },
      { status: 500 }
    );
  }
}