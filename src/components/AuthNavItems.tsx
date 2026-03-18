"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AuthNavItems({ onNavigate }: { onNavigate?: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
    onNavigate?.();
  }

  if (isLoggedIn) {
    return (
      <>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          onClick={onNavigate}
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Log Out
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-white/90 transition-colors hover:text-white"
        onClick={onNavigate}
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-brand-amber px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light"
        onClick={onNavigate}
      >
        Sign Up
      </Link>
    </>
  );
}
