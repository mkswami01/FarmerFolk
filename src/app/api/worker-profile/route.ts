import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabase as supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { fullName, bio, availability, marketsWorked, skills } = body;

  if (!fullName || !availability) {
    return NextResponse.json(
      { error: "Name and availability are required." },
      { status: 400 }
    );
  }

  // Get the public user row
  const { data: publicUser, error: userError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (userError || !publicUser) {
    return NextResponse.json(
      { error: "User account not found." },
      { status: 404 }
    );
  }

  // Create worker profile
  const { error: profileError } = await supabaseAdmin
    .from("worker_profiles")
    .insert({
      user_id: publicUser.id,
      full_name: fullName,
      bio: bio || null,
      availability,
      markets_worked: marketsWorked || [],
      skills: skills || [],
    });

  if (profileError) {
    if (profileError.code === "23505") {
      return NextResponse.json(
        { error: "Profile already exists." },
        { status: 409 }
      );
    }
    console.error("Profile creation error:", profileError);
    return NextResponse.json(
      { error: "Failed to create profile." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
