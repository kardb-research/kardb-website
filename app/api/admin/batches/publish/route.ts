
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const body = await request.json();
    const batchId = body.batch_id;

    if (
      typeof batchId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        batchId
      )
    ) {
      return NextResponse.json(
        { error: "A valid monthly batch ID is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc(
      "publish_monthly_batch",
      { p_batch_id: batchId }
    );

    if (error) {
      return NextResponse.json(
        { error: error.message || "Could not publish monthly batch." },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
