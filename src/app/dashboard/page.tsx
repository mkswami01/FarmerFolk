import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabase as supabaseAdmin } from "@/lib/supabase";
import { DashboardProfile } from "@/components/DashboardProfile";

export const metadata = {
  title: "Dashboard — MarketFolk",
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get public user
  const { data: publicUser } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (!publicUser) {
    redirect("/login");
  }

  // Get worker profile
  const { data: profile } = await supabaseAdmin
    .from("worker_profiles")
    .select("*")
    .eq("user_id", publicUser.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  // Get verification status
  const { data: verification } = await supabaseAdmin
    .from("id_verifications")
    .select("status")
    .eq("worker_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <DashboardProfile
      profile={profile}
      verification={verification}
    />
  );
}
