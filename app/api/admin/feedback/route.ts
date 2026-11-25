import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

const ALLOWED_STATUSES = ["new", "under_review", "planned", "completed", "declined"];

async function attachProfileDetails(supabase: any, rows: any[]) {
  const userIds = [...new Set(rows.map((row) => row.user_id).filter(Boolean))];

  if (userIds.length === 0) {
    return rows.map((row) => ({ ...row, full_name: null, email: null }));
  }

  // This RPC is SECURITY DEFINER but explicitly verifies the caller's admin role.
  // It returns only the requested users' public profile fields.
  const { data: profiles, error } = await supabase.rpc(
    "admin_feedback_user_profiles",
    { p_user_ids: userIds }
  );

  if (error) {
    console.error("Admin feedback profile lookup failed:", error);
    throw new Error("Could not load feedback submitter details.");
  }

  const profileMap = new Map(
    (profiles || []).map((profile: any) => [profile.id, profile])
  );

  return rows.map((row) => {
    const profile = profileMap.get(row.user_id) as
      | { full_name: string | null; email: string | null }
      | undefined;

    return {
      ...row,
      full_name: profile?.full_name ?? null,
      email: profile?.email ?? null,
    };
  });
}

export async function GET() {
  try {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase
      .from("user_feedback")
      .select("id, user_id, submission_type, category, message, priority, status, admin_notes, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin feedback fetch failed:", error);
      return NextResponse.json({ error: "Could not load feedback submissions." }, { status: 500 });
    }

    const feedback = await attachProfileDetails(supabase, data || []);
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Admin feedback GET failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to verify admin access or load feedback." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    const status = typeof body.status === "string" ? body.status : "";
    const admin_notes = typeof body.admin_notes === "string" ? body.admin_notes.trim() : "";

    if (!id || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "A valid submission ID and status are required." }, { status: 400 });
    }
    if (admin_notes.length > 3000) {
      return NextResponse.json({ error: "Admin notes cannot exceed 3000 characters." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("user_feedback")
      .update({ status, admin_notes, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id, user_id, submission_type, category, message, priority, status, admin_notes, created_at, updated_at")
      .single();

    if (error) {
      console.error("Admin feedback update failed:", error);
      return NextResponse.json({ error: "Could not update this submission." }, { status: 500 });
    }

    const [feedback] = await attachProfileDetails(supabase, [data]);
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Admin feedback PATCH failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to verify admin access or update feedback." },
      { status: 500 }
    );
  }
}
