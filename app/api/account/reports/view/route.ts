
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Please log in to access this report." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("report_id");

  if (
    !reportId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      reportId
    )
  ) {
    return NextResponse.json(
      { error: "A valid report ID is required." },
      { status: 400 }
    );
  }

  const { data: canView, error: entitlementError } =
    await supabase.rpc("can_view_research_report", {
      p_report_id: reportId,
    });

  if (entitlementError || canView !== true) {
    return NextResponse.json(
      { error: "You are not entitled to access this report." },
      { status: 403 }
    );
  }

  const { data: report, error: reportError } = await supabase
    .from("research_reports")
    .select("storage_path")
    .eq("id", reportId)
    .eq("status", "published")
    .maybeSingle();

  if (reportError || !report?.storage_path) {
    return NextResponse.json(
      { error: "Report PDF could not be found." },
      { status: 404 }
    );
  }

  const { data: signedUrlData, error: signedUrlError } =
    await supabase.storage
      .from("research-reports")
      .createSignedUrl(report.storage_path, 60);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    return NextResponse.json(
      { error: "Unable to generate secure report access." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(signedUrlData.signedUrl);
}
