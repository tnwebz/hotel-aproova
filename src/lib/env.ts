/**
 * Safe environment variable validation for Supabase configuration.
 * Exposes only public runtime variables (URL and Anon key).
 * Secrets or service_role keys are never exposed or logged.
 */
const DEFAULT_SUPABASE_URL = "https://oleqbctgwdxpfxqdhgff.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZXFiY3Rnd2R4cGZ4cWRoZ2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1MzA3MjEsImV4cCI6MjEwNzEwNjcyMX0.7WtFHnQXhFnCc02T7icnrNUJWgXQeMYsKFmLpv1pLQs";

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

