import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("monthly_batches")
    .select("id, batch_month, title, status, created_at")
    .order("batch_month", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Could not fetch monthly batches." },
      { status: 500 }
    );
  }

  return NextResponse.json({ batches: data });
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();

  try {
    const body = await request.json();

    const batchMonth = body.batch_month;
    const title = body.title?.trim();

    if (
      typeof batchMonth !== "string" ||
      !/^\d{4}-\d{2}-01$/.test(batchMonth)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid batch month." },
        { status: 400 }
      );
    }

    const [year, month] = batchMonth.split("-").map(Number);

    if (month < 1 || month > 12 || year < 2000 || year > 2100) {
      return NextResponse.json(
        { error: "Invalid batch month." },
        { status: 400 }
      );
    }

    if (typeof title !== "string" || !title || title.length > 100) {
      return NextResponse.json(
        { error: "Title is required and must be under 100 characters." },
        { status: 400 }
      );
    }

    const { data: existingBatch, error: checkError } = await supabase
      .from("monthly_batches")
      .select("id")
      .eq("batch_month", batchMonth)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { error: "Could not verify existing batches." },
        { status: 500 }
      );
    }

    if (existingBatch) {
      return NextResponse.json(
        { error: "A batch already exists for this month." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("monthly_batches")
      .insert({ batch_month: batchMonth, title })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Could not create batch." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, batch: data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}