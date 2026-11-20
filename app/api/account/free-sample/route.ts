
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
      { error: "Please log in to access the free sample." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const sampleId = searchParams.get("sample_id");

    if (
      !sampleId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sampleId)
    ) {
      return NextResponse.json(
        { error: "A valid sample ID is required." },
        { status: 400 }
      );
    }

    const { data: sample, error } = await supabase
      .from("kardb_free_samples")
      .select("id, storage_path")
      .eq("id", sampleId)
      .eq("status", "published")
      .maybeSingle();

    if (error || !sample?.storage_path) {
      return NextResponse.json(
        { error: "Published free sample or PDF not found." },
        { status: 404 }
      );
    }

    const { data, error: storageError } = await supabase.storage
      .from("research-reports")
      .createSignedUrl(sample.storage_path, 60);

    if (storageError || !data?.signedUrl) {
      return NextResponse.json(
        { error: "Unable to generate secure PDF access." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(data.signedUrl);
  } catch {
    return NextResponse.json(
      { error: "Could not open the free sample report." },
      { status: 500 }
    );
  }
}
