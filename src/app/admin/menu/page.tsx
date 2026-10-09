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
} from "lucide-react";

export default function AdminMenuPage() {
  const router = useRouter();

  // Auth & Profile
  const [adminProfile, setAdminProfile] = useState<DbAdminProfile | null>(null);
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

  // 1. Verify Admin Session
  useEffect(() => {
    async function checkAuth() {
      try {
        const profile = await getAdminProfile();
        if (!profile || !profile.is_active) {
          router.replace("/admin/login");
          return;
        }
        setAdminProfile(profile);
      } catch (err) {
        router.replace("/admin/login");
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
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
    if (adminProfile) {
      loadData();
    }
  }, [adminProfile, loadData]);

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
      showToast(`Failed to update status: ${err.message}`, "error");
    }
  };

  // Handle Delete Confirmation
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
      showToast(`Failed to delete product: ${err.message}`, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 pb-20">
      {/* Top Header */}
      <AdminHeader adminEmail={adminProfile?.email} />

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
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Categories</p>
              <p className="text-xl sm:text-2xl font-bold text-zinc-900">{stats.totalCategories}</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, ID, or category..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-zinc-50/50 focus:bg-white transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-52">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="ALL">All Categories ({categories.length})</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Period Filter */}
            <div className="w-full md:w-44">
              <select
                value={selectedMealPeriod}
                onChange={(e) => setSelectedMealPeriod(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="ALL">All Meal Periods</option>
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="EVENING_SNACKS">Evening Snacks</option>
                <option value="DINNER">Dinner</option>
                <option value="ALL_DAY">All Day</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="w-full md:w-40">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="ALL">All Availabilities</option>
                <option value="ALWAYS">Always</option>
                <option value="TIME_SLOT">Time Slot</option>
                <option value="DINNER">Dinner Only</option>
              </select>
            </div>

            {/* Active/Inactive Status Filter */}
            <div className="w-full md:w-36">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Disabled Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Items Table / Card Grid */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
          {/* Table Header Controls */}
          <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Product Records
              </span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 text-[11px] font-bold">
                {items.length}
              </span>
            </div>

            <button
              onClick={() => loadData()}
              disabled={loadingData}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 font-medium cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingData ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-zinc-400">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
              <span className="text-xs font-medium">Loading products...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Utensils className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-sm font-bold text-zinc-700">No products found</p>
              <p className="text-xs text-zinc-400">
                Try adjusting your search query or filter options.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-100/50 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Availability</th>
                    <th className="py-3 px-4">Meal Periods</th>
                    <th className="py-3 px-4 text-center">Sale Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {items.map((item) => {
                    const imgUrl = item.image_path ? getStorageImageUrl(item.image_path) : null;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-zinc-50/80 transition-colors ${
                          !item.is_available ? "opacity-60 bg-zinc-50/40" : ""
                        }`}
                      >
                        {/* Item Name & Photo */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shrink-0 flex items-center justify-center">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Utensils className="w-5 h-5 text-zinc-300" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-zinc-900 text-sm">
                                  {item.name}
                                </span>
                                {item.is_featured && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-0.5">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    Special
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-zinc-400 font-mono block">
                                {item.legacy_id || `ID: ${item.id.substring(0, 8)}`}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-medium text-xs">
                            {item.category?.name || "—"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-zinc-900 text-sm">
                            ₹{item.price}
                            {item.original_price && (
                              <span className="text-xs text-zinc-400 line-through ml-1.5 font-normal">
                                ₹{item.original_price}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Availability */}
                        <td className="py-3 px-4">
                          <div className="text-xs font-medium text-zinc-700">
                            {item.availability_type === "ALWAYS" && (
                              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                                <Clock className="w-3.5 h-3.5" /> All Day
                              </span>
                            )}
                            {item.availability_type === "DINNER" && (
                              <span className="text-amber-700 flex items-center gap-1 font-semibold">
                                <Clock className="w-3.5 h-3.5" /> Dinner Only (6PM–11PM)
                              </span>
                            )}
                            {item.availability_type === "TIME_SLOT" && (
                              <span className="text-zinc-600 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                {item.start_time?.substring(0, 5)} – {item.end_time?.substring(0, 5)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Meal Periods */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {(item.meal_periods || []).map((mp) => (
                              <span
                                key={mp}
                                className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-medium"
                              >
                                {mp.replace("_", " ")}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Sale Toggle Switch */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleAvailability(item)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              item.is_available ? "bg-emerald-600" : "bg-zinc-300"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                item.is_available ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span className="block text-[10px] text-zinc-400 mt-0.5">
                            {item.is_available ? "In Stock" : "Disabled"}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(item);
                                setIsFormModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-zinc-600 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
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
