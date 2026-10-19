"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UtensilsCrossed,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/admin-access/menu";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if session already authenticated
  useEffect(() => {
    async function checkCurrentSession() {
      try {
        const res = await fetch("/api/admin-auth", { method: "GET" });
        if (res.ok) {
          router.replace(fromParam);
          return;
        }
      } catch (err) {
        // Not authenticated
      } finally {
        setCheckingAuth(false);
      }
    }
    checkCurrentSession();
  }, [router, fromParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data: any = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid password. Access denied.");
      }

      // Successful login
      router.replace(fromParam);
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify your password.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-40 pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(180,83,9,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-800 to-amber-600 text-white shadow-lg shadow-amber-800/20 ring-4 ring-white mb-3">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-extrabold text-zinc-950 tracking-tight">
            Hotel Apoorvaa
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Pure Veg
            </span>
            <span className="text-xs text-zinc-500 font-medium">· Staff Management Portal</span>
          </div>
        </div>

        {/* Security Login Card */}
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-xl shadow-zinc-200/50 rounded-3xl border border-zinc-200/90 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-700" />
                Staff Access Verification
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Enter your authorized admin password to continue
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  autoFocus
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-800/15 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-zinc-100">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-500 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
            >
              ← Return to Customer Digital Menu
            </Link>
          </div>
        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-zinc-400 font-medium mt-6">
          🔒 Secure Protected Gateway · Hotel Apoorvaa Internal Operations
        </p>
      </div>
    </div>
  );
}

export default function AdminAccessLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
