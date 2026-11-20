
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function GET() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("kardb_free_samples")
    .select("id, title, description, storage_path, status, created_at, published_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Could not load free sample reports." },
      { status: 500 }
    );
  }

  return NextResponse.json({ samples: data || [] });
}

export async function POST(request: Request) {
  const { supabase } = await requireAdmin();
  let storagePath: string | null = null;

  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 200
    ) {
      return NextResponse.json(
        { error: "A valid title is required (maximum 200 characters)." },
        { status: 400 }
      );
    }

    if (
      description !== null &&
      typeof description !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid description." },
        { status: 400 }
      );
    }

    if (
      typeof description === "string" &&
      description.length > 1000
    ) {
      return NextResponse.json(
        { error: "Description must not exceed 1000 characters." },
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

    const signature = new TextDecoder().decode(
      new Uint8Array(await file.slice(0, 5).arrayBuffer())
    );

    if (signature !== "%PDF-") {
      return NextResponse.json(
        { error: "The selected file is not a valid PDF." },
        { status: 400 }
      );
    }

    const existing = await supabase
      .from("kardb_free_samples")
      .select("id")
      .in("status", ["draft", "published"])
      .limit(1);

    if (existing.error) {
      return NextResponse.json(
        { error: "Could not verify existing sample reports." },
        { status: 500 }
      );
    }

    if (existing.data && existing.data.length > 0) {
      return NextResponse.json(
        { error: "A draft or published sample already exists. Archive it before uploading another." },
        { status: 409 }
      );
    }

    storagePath = `free-samples/${crypto.randomUUID()}.pdf`;

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

    const { data, error: insertError } = await supabase
      .from("kardb_free_samples")
      .insert({
        title: title.trim(),
        description:
          typeof description === "string" ? description.trim() : null,
        storage_path: storagePath,
        status: "draft",
      })
      .select("id, title, description, status, created_at")
      .single();

    if (insertError) {
      await supabase.storage
        .from("research-reports")
        .remove([storagePath]);

      storagePath = null;

      return NextResponse.json(
        { error: "PDF uploaded, but sample record could not be created." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, sample: data },
      { status: 201 }
    );
  } catch {
    if (storagePath) {
      await supabase.storage
        .from("research-reports")
        .remove([storagePath]);
    }

    return NextResponse.json(
      { error: "Sample upload failed. Please try again." },
      { status: 500 }
    );
  }
}
