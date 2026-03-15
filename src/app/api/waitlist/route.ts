import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, role } = body;

  if (!email || !role || !["worker", "vendor"].includes(role)) {
    return NextResponse.json(
      { error: "Valid email and role (worker/vendor) are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("waitlist_emails")
    .insert({ email, role, signed_up_at: new Date().toISOString() });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist!" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
