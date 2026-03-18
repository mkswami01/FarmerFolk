import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabase as supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filePath } = await request.json();

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required." },
      { status: 400 }
    );
  }

  // Get worker profile
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("worker_profiles")
    .select("id")
    .eq(
      "user_id",
      (
        await supabaseAdmin
          .from("users")
          .select("id")
          .eq("auth_id", user.id)
          .single()
      ).data?.id
    )
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "Worker profile not found. Complete your profile first." },
      { status: 404 }
    );
  }

  // Create verification record
  const { error: verificationError } = await supabaseAdmin
    .from("id_verifications")
    .insert({
      worker_id: profile.id,
      license_image_url: filePath,
      status: "pending",
    });

  if (verificationError) {
    console.error("Verification creation error:", verificationError);
    return NextResponse.json(
      { error: "Failed to create verification record." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
