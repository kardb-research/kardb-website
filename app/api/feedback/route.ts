import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedTypes = ["feedback", "feature_request"] as const;
const allowedCategories = [
  "Dashboard Improvement",
  "Market Data",
  "Economic Intelligence",
  "Equity Research",
  "New Feature Request",
  "Technical Issue",
  "Other",
] as const;
const allowedPriorities = ["Low", "Normal", "High"] as const;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Always identify the submitter from the verified server-side session.
    // Never accept user_id from the browser request body.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Your session could not be verified. Please log in again and retry." },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const submissionType = input.submission_type;
    const category = input.category;
    const message =
      typeof input.message === "string" ? input.message.trim() : "";
    const priority = input.priority ?? "Normal";

    if (!allowedTypes.includes(submissionType as (typeof allowedTypes)[number])) {
      return NextResponse.json({ error: "Invalid submission type." }, { status: 400 });
    }

    if (!allowedCategories.includes(category as (typeof allowedCategories)[number])) {
      return NextResponse.json({ error: "Please select a valid category." }, { status: 400 });
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: "Your message must contain between 10 and 3,000 characters." },
        { status: 400 }
      );
    }

    if (!allowedPriorities.includes(priority as (typeof allowedPriorities)[number])) {
      return NextResponse.json({ error: "Please select a valid priority." }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("user_feedback").insert({
      user_id: user.id,
      submission_type: submissionType,
      category,
      message,
      priority,
    });

    if (insertError) {
      console.error("KARDB feedback insert failed:", insertError);
      return NextResponse.json(
        { error: "We could not save your submission. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("KARDB feedback API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
