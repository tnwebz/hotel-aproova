"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInAdmin, getAdminProfile } from "@/lib/supabase/auth";
import { UtensilsCrossed, Lock, Mail, AlertCircle, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if already authenticated as admin
  useEffect(() => {
    async function checkAuth() {
      try {
        const profile = await getAdminProfile();
        if (profile && profile.is_active) {
          router.replace("/admin/menu");
          return;
        }
      } catch (err) {
        // Not logged in
      } finally {
        setCheckingSession(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInAdmin(email.trim(), password);
      router.push("/admin/menu");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials or unauthorized access.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] opacity-40 pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-800 to-amber-600 text-white shadow-lg shadow-amber-800/20 ring-4 ring-white mb-3">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-zinc-900 tracking-tight">
            Hotel Apoorvaa
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              Pure Veg
            </span>
            <span className="text-xs text-zinc-500 font-medium">· Staff Management Portal</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-xl shadow-zinc-200/50 rounded-2xl border border-zinc-200/80">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Admin Sign In</h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Authorized staff credentials required
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@apoorvaa.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 active:bg-amber-900 disabled:opacity-50 shadow-md shadow-amber-800/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors inline-flex items-center gap-1 font-medium"
            >
              ← Return to Hotel Apoorvaa Public Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
