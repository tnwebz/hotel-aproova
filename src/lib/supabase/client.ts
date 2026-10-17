import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/env";

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}

// Export singleton/direct supabase instance using validated environment variables
export const supabase = (() => {
  try {
    const { url, anonKey } = getSupabaseEnv();
    return createBrowserClient(url, anonKey);
  } catch {
    // Graceful fallback during static build phases if env is not yet injected
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
    );
  }
})();

