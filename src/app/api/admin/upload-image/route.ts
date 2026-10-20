import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const COOKIE_NAME = "apoorvaa_admin_session";
const SESSION_TOKEN = "hotel_apoorvaa_authenticated_admin_session_token_2026";
const STORAGE_BUCKET = "menu-items";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration in environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME);
  return cookie?.value === SESSION_TOKEN;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const itemKey = (formData.get("itemKey") as string) || "item";

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    const safeKey = itemKey.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase() || "item";
    const filePath = `custom_uploads/${safeKey}/main.webp`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabase = getAdminClient();

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      console.error("Server storage upload error:", uploadError);
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      filePath,
    });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error during upload." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const body = await req.json();
    const { imagePath } = body;

    if (!imagePath) {
      return NextResponse.json({ error: "No image path provided." }, { status: 400 });
    }

    const cleanPath = imagePath.replace(/^\//, "").replace(/^menu-items\//, "");

    const supabase = getAdminClient();
    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([cleanPath]);

    if (deleteError) {
      console.error("Server storage delete error:", deleteError);
      return NextResponse.json(
        { error: `Storage delete failed: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete handler error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error during delete." },
      { status: 500 }
    );
  }
}
