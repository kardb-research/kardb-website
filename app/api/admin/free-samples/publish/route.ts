
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const body = await request.json();
    const sampleId = body.sample_id;

    if (
      typeof sampleId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sampleId)
    ) {
      return NextResponse.json(
        { error: "A valid sample ID is required." },
        { status: 400 }
      );
    }

    const { data: sample, error: fetchError } = await supabase
      .from("kardb_free_samples")
      .select("id, storage_path, status")
      .eq("id", sampleId)
      .maybeSingle();

    if (fetchError || !sample) {
      return NextResponse.json(
        { error: "Sample report not found." },
        { status: 404 }
      );
    }

    if (sample.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft samples can be published." },
        { status: 400 }
      );
    }

    if (!sample.storage_path) {
      return NextResponse.json(
        { error: "Sample PDF is missing." },
        { status: 400 }
      );
    }

    const { data: object, error: storageError } =
      await supabase.storage
        .from("research-reports")
        .list("free-samples", {
          search: sample.storage_path.split("/").pop(),
          limit: 100,
        });

    const fileName = sample.storage_path.split("/").pop();

    if (
      storageError ||
      !fileName ||
      !object?.some((item) => item.name === fileName)
    ) {
      return NextResponse.json(
        { error: "Sample PDF was not found in private storage." },
        { status: 400 }
      );
    }

    const { data, error: updateError } = await supabase
      .from("kardb_free_samples")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
      })
      .eq("id", sampleId)
      .eq("status", "draft")
      .select("id, title, status, published_at")
      .maybeSingle();

    if (updateError || !data) {
      return NextResponse.json(
        { error: "Could not publish sample report." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sample: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not publish sample report." },
      { status: 500 }
    );
  }
}
