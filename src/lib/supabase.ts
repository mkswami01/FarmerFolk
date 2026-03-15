import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service role key.
// Only import this in API routes / server code — never in client components.
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
