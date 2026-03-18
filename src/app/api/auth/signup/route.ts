import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabase as supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // Create public users row using service role client
  if (authData.user) {
    const { error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
        auth_id: authData.user.id,
        email,
        role: "worker",
      });

    if (insertError) {
      console.error("Failed to create public user row:", insertError);
    }
  }

  return NextResponse.json({ success: true });
}
