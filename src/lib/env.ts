/**
 * Safe environment variable validation for Supabase configuration.
 * Exposes only public runtime variables (URL and Anon key).
 * Secrets or service_role keys are never exposed or logged.
 */
const DEFAULT_SUPABASE_URL = "https://cghalaypznubnitsegjy.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_9st-KWunnskqHYFeepltGA_T_PBITBH";

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return {
    url,
    anonKey,
  };
}

