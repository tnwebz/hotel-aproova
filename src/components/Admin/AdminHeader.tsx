"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutAdmin } from "@/lib/supabase/auth";
import { LogOut, ExternalLink, ShieldCheck, UtensilsCrossed } from "lucide-react";

interface AdminHeaderProps {
  adminEmail?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ adminEmail }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-auth", { method: "DELETE" });
      await signOutAdmin();
    } catch (err) {
      console.error("Logout notice:", err);
    } finally {
      router.replace("/admin-access/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-600 flex items-center justify-center text-white shadow-sm ring-2 ring-amber-700/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-zinc-900 tracking-tight">
                Hotel Apoorvaa
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Admin
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium hidden sm:block">
              Menu Management Portal
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            View Live Menu
          </Link>

          {adminEmail && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="truncate max-w-[150px]">{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 rounded-lg transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
