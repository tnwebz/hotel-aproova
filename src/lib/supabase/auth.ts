import { createClient } from "./client";
import { DbAdminProfile } from "@/types/database";

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function getAdminProfile(): Promise<DbAdminProfile | null> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as DbAdminProfile;
}

export async function signInAdmin(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Check if profile exists and is active
  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .eq("is_active", true)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error("Unauthorized: You do not have active admin privileges.");
    }
  }

  return data;
}

export async function signOutAdmin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
