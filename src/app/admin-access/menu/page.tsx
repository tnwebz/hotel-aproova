"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAdminProfile } from "@/lib/supabase/auth";
import {
  fetchAdminMenuItems,
  fetchAdminCategories,
  getMenuStats,
  deleteMenuItem,
  toggleMenuItemAvailability,
  AdminMenuItemWithDetails,
} from "@/lib/supabase/menu";
import { DbCategory, DbAdminProfile } from "@/types/database";
import { getStorageImageUrl } from "@/lib/supabase/storage";
import { AdminHeader } from "@/components/Admin/AdminHeader";
import { MenuItemFormModal } from "@/components/Admin/MenuItemFormModal";
import { DeleteConfirmModal } from "@/components/Admin/DeleteConfirmModal";
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  Loader2,
  Utensils,
  Layers,
  ShoppingBag,
  RefreshCw,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";

export default function AdminAccessMenuPage() {
  const router = useRouter();

  // Auth & Profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@hotelapoorvaa.com");
  const [authLoading, setAuthLoading] = useState(true);

  // Data
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [items, setItems] = useState<AdminMenuItemWithDetails[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    availableItems: 0,
    unavailableItems: 0,
    totalCategories: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedMealPeriod, setSelectedMealPeriod] = useState("ALL");
  const [selectedAvailability, setSelectedAvailability] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive">("all");

  // Modals & Actions
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItemWithDetails | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<AdminMenuItemWithDetails | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Feedback toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Strict Authentication Verification Guard
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        // Verify secure HTTP session cookie via API
        const res = await fetch("/api/admin-auth", { method: "GET" });
        if (!res.ok) {
          // Check Supabase Auth as secondary fallback
          const profile = await getAdminProfile();
          if (!profile || !profile.is_active) {
            if (isMounted) {
              setIsAuthenticated(false);
              router.replace("/admin-access/login");
            }
            return;
          }
          if (isMounted) {
            setAdminEmail(profile.email || "admin@hotelapoorvaa.com");
            setIsAuthenticated(true);
          }
          return;
        }

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
          router.replace("/admin-access/login");
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // 2. Load Categories, Items & Stats
  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [cats, statsData] = await Promise.all([
        fetchAdminCategories(),
        getMenuStats(),
      ]);
      setCategories(cats);
      setStats(statsData);

      const menuItems = await fetchAdminMenuItems({
        search: searchQuery,
        categoryId: selectedCategory,
        mealPeriod: selectedMealPeriod,
        availability: selectedAvailability,
        status: selectedStatus,
      });
      setItems(menuItems);
    } catch (err: any) {
      console.error("Error loading admin menu data:", err);
      showToast(err.message || "Failed to load data", "error");
    } finally {
      setLoadingData(false);
    }
  }, [searchQuery, selectedCategory, selectedMealPeriod, selectedAvailability, selectedStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // Handle Quick Sale Status Toggle
  const handleToggleAvailability = async (item: AdminMenuItemWithDetails) => {
    const newStatus = !item.is_available;
    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_available: newStatus } : i))
    );

    try {
      await toggleMenuItemAvailability(item.id, newStatus);
      showToast(`"${item.name}" marked as ${newStatus ? "Available for Sale" : "Unavailable"}.`);
      // Refresh stats
      const newStats = await getMenuStats();
      setStats(newStats);
    } catch (err: any) {
      // Rollback optimistic update
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_available: item.is_available } : i))
      );
      showToast(err.message || "Failed to update availability status.", "error");
    }
  };

  // Handle Item Deletion Confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);

    try {
      await deleteMenuItem(deletingItem.id);
      showToast(`"${deletingItem.name}" deleted successfully.`);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || "Failed to delete product.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // STRICT SECURITY GUARD: Never render admin panel content if unauthenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-amber-700 animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Verifying secure staff credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900">Access Restricted</h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">
          This portal requires active Hotel Apoorvaa staff authentication.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 pb-20">
      {/* Top Header */}
      <AdminHeader adminEmail={adminEmail} />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold ${
              toastMessage.type === "success"
                ? "bg-zinc-900 text-white border border-zinc-700"
                : "bg-rose-600 text-white"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Hero & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Menu Management
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              Live menu management powered by Supabase for Hotel Apoorvaa Pure Veg.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingItem(null);
              setIsFormModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Menu Item</span>
          </button>
        </div>

        {/* Dashboard Statistics Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total Items</p>
              <p className="text-xl sm:text-2xl font-bold text-zinc-900">{stats.totalItems}</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Available</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-700">{stats.availableItems}</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Disabled / Out</p>
              <p className="text-xl sm:text-2xl font-bold text-rose-700">{stats.unavailableItems}</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Categories</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-700">{stats.totalCategories}</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search Query Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products by name, ID, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 focus:bg-white transition-all"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              >
                <option value="ALL">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Meal Period Filter */}
              <select
                value={selectedMealPeriod}
                onChange={(e) => setSelectedMealPeriod(e.target.value)}
                className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              >
                <option value="ALL">All Meal Periods</option>
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="EVENING_SNACKS">Evening Snacks</option>
                <option value="DINNER">Dinner</option>
                <option value="ALL_DAY">All Day</option>
              </select>

              {/* Availability Filter */}
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              >
                <option value="ALL">All Availabilities</option>
                <option value="ALWAYS">All Day Available</option>
                <option value="TIME_SLOT">Time-Slot Only</option>
                <option value="DINNER">Dinner Only (6PM-11PM)</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              >
                <option value="all">All Status</option>
                <option value="active">In Stock / Enabled</option>
                <option value="inactive">Out of Stock / Disabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Records Table */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Product Records
              </span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold">
                {items.length}
              </span>
            </div>

            <button
              onClick={loadData}
              disabled={loadingData}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingData ? (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700 mb-2" />
              <p className="text-xs font-medium">Fetching real-time menu data...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-zinc-400">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-zinc-300" />
              <p className="text-sm font-bold text-zinc-600">No products match your filters</p>
              <p className="text-xs text-zinc-400 mt-1">
                Try adjusting your search query, category, or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50/75 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    <th className="py-3.5 pl-6 pr-4">Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Availability</th>
                    <th className="py-3.5 px-4">Meal Periods</th>
                    <th className="py-3.5 px-4 text-center">Sale Status</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs">
                  {items.map((item) => {
                    const rawImage = item.image_path ? getStorageImageUrl(item.image_path) : null;

                    return (
                      <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors">
                        {/* Name & Photo */}
                        <td className="py-3.5 pl-6 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200/80">
                              {rawImage ? (
                                <Image
                                  src={rawImage}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="44px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                  <Utensils className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-zinc-900 text-sm">
                                  {item.name}
                                </span>
                                {item.is_featured && (
                                  <span className="p-0.5 rounded bg-amber-100 text-amber-800" title="Featured / Chef's Special">
                                    <Sparkles className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-zinc-400 font-mono">
                                {item.legacy_id || item.id.substring(0, 8)}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-semibold text-[11px]">
                            {item.category?.name || "Uncategorized"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-baseline gap-1 font-mono">
                            <span className="font-bold text-sm text-zinc-900">
                              ₹{item.price}
                            </span>
                            {item.original_price && (
                              <span className="text-zinc-400 line-through text-[11px]">
                                ₹{item.original_price}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Timing Availability */}
                        <td className="py-3.5 px-4">
                          {item.availability_type === "ALWAYS" && (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                              <Clock className="w-3.5 h-3.5" /> All Day
                            </span>
                          )}
                          {item.availability_type === "DINNER" && (
                            <span className="inline-flex items-center gap-1 text-blue-700 font-semibold text-[11px]">
                              <Clock className="w-3.5 h-3.5" /> Dinner Only (6PM-11PM)
                            </span>
                          )}
                          {item.availability_type === "TIME_SLOT" && (
                            <span className="inline-flex items-center gap-1 text-amber-800 font-semibold text-[11px]">
                              <Clock className="w-3.5 h-3.5" />
                              {item.start_time?.substring(0, 5)} - {item.end_time?.substring(0, 5)}
                            </span>
                          )}
                        </td>

                        {/* Meal Periods */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {item.meal_periods && item.meal_periods.length > 0 ? (
                              item.meal_periods.map((mp) => (
                                <span
                                  key={mp}
                                  className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium text-[10px] tracking-wide uppercase"
                                >
                                  {mp.replace("_", " ")}
                                </span>
                              ))
                            ) : (
                              <span className="text-zinc-400 text-[11px] italic">None</span>
                            )}
                          </div>
                        </td>

                        {/* Quick Sale Status Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleAvailability(item)}
                            className="inline-flex flex-col items-center group cursor-pointer focus:outline-none"
                            title={item.is_available ? "Click to disable (Out of stock)" : "Click to enable (In stock)"}
                          >
                            <div
                              className={`w-10 h-6 flex items-center rounded-full p-1 duration-200 cursor-pointer ${
                                item.is_available ? "bg-emerald-600" : "bg-zinc-300"
                              }`}
                            >
                              <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                                  item.is_available ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </div>
                            <span
                              className={`text-[10px] font-bold mt-1 ${
                                item.is_available ? "text-emerald-700" : "text-zinc-400"
                              }`}
                            >
                              {item.is_available ? "In Stock" : "Disabled"}
                            </span>
                          </button>
                        </td>

                        {/* Edit & Delete Actions */}
                        <td className="py-3.5 pr-6 pl-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsFormModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingItem(item);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      <MenuItemFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          showToast(editingItem ? "Menu item updated successfully." : "New menu item created.");
          loadData();
        }}
        editingItem={editingItem}
        categories={categories}
      />

      {/* Delete Product Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingItem(null);
        }}
        onConfirm={handleDeleteConfirm}
        item={deletingItem}
        isDeleting={isDeleting}
      />
    </div>
  );
}
