"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import { DbCategory, AdminProductFormValues } from "@/types/database";
import { MealPeriod, AvailabilityType } from "@/data/mealPeriods";
import { BadgeType } from "@/components/Menu/MenuItemCard";
import { ImageUploader } from "./ImageUploader";
import { uploadProductImage, deleteProductImage } from "@/lib/supabase/storage";
import { saveAdminMenuItem, AdminMenuItemWithDetails } from "@/lib/supabase/menu";

interface MenuItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (savedId: string) => void;
  editingItem?: AdminMenuItemWithDetails | null;
  categories: DbCategory[];
}

const ALL_MEAL_PERIODS: { id: MealPeriod; label: string }[] = [
  { id: "BREAKFAST", label: "Breakfast" },
  { id: "LUNCH", label: "Lunch" },
  { id: "EVENING_SNACKS", label: "Evening Snacks" },
  { id: "DINNER", label: "Dinner" },
  { id: "ALL_DAY", label: "All Day" },
];

const AVAILABLE_BADGES: { id: BadgeType; label: string }[] = [
  { id: "veg", label: "Pure Veg" },
  { id: "bestseller", label: "Bestseller" },
  { id: "chef-choice", label: "Chef's Choice" },
  { id: "spicy", label: "Spicy" },
  { id: "new", label: "New Item" },
];

export const MenuItemFormModal: React.FC<MenuItemFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingItem,
  categories,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState("");
  const [dietType] = useState<"VEGETARIAN">("VEGETARIAN");
  const [selectedMealPeriods, setSelectedMealPeriods] = useState<MealPeriod[]>(["ALL_DAY"]);
  const [selectedBadges, setSelectedBadges] = useState<BadgeType[]>(["veg"]);
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>("ALWAYS");
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("23:00");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState<number>(0);

  const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize or reset form on open / editItem change
  useEffect(() => {
    if (!isOpen) return;

    if (editingItem) {
      setName(editingItem.name || "");
      setDescription(editingItem.description || "");
      setPrice(editingItem.price.toString());
      setOriginalPrice(editingItem.original_price ? editingItem.original_price.toString() : "");
      setCategoryId(editingItem.category_id || categories[0]?.id || "");
      setSelectedMealPeriods(editingItem.meal_periods || ["ALL_DAY"]);
      setSelectedBadges((editingItem.badge_tags as BadgeType[]) || ["veg"]);
      setAvailabilityType(editingItem.availability_type || "ALWAYS");
      setStartTime(editingItem.start_time ? editingItem.start_time.substring(0, 5) : "12:00");
      setEndTime(editingItem.end_time ? editingItem.end_time.substring(0, 5) : "23:00");
      setIsAvailable(editingItem.is_available ?? true);
      setIsFeatured(editingItem.is_featured ?? false);
      setFeaturedOrder(editingItem.featured_order || 0);
      setCurrentImagePath(editingItem.image_path || null);
      setPendingFile(null);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setOriginalPrice("");
      setCategoryId(categories[0]?.id || "");
      setSelectedMealPeriods(["ALL_DAY"]);
      setSelectedBadges(["veg"]);
      setAvailabilityType("ALWAYS");
      setStartTime("12:00");
      setEndTime("23:00");
      setIsAvailable(true);
      setIsFeatured(false);
      setFeaturedOrder(0);
      setCurrentImagePath(null);
      setPendingFile(null);
    }
    setFormError(null);
  }, [isOpen, editingItem, categories]);

  if (!isOpen) return null;

  const toggleMealPeriod = (mp: MealPeriod) => {
    if (selectedMealPeriods.includes(mp)) {
      if (selectedMealPeriods.length === 1) return; // keep at least one
      setSelectedMealPeriods(selectedMealPeriods.filter((p) => p !== mp));
    } else {
      setSelectedMealPeriods([...selectedMealPeriods, mp]);
    }
  };

  const toggleBadge = (b: BadgeType) => {
    if (selectedBadges.includes(b)) {
      setSelectedBadges(selectedBadges.filter((item) => item !== b));
    } else {
      setSelectedBadges([...selectedBadges, b]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!name.trim()) {
      setFormError("Item name is required.");
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError("Please enter a valid price greater than 0.");
      return;
    }

    if (!categoryId) {
      setFormError("Please select a category.");
      return;
    }

    if (availabilityType === "TIME_SLOT" && (!startTime || !endTime)) {
      setFormError("Time Slot availability requires both start and end times.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImagePath = currentImagePath;

      // Handle image upload if user picked a new file
      if (pendingFile) {
        const itemSlug = editingItem?.legacy_id || name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        finalImagePath = await uploadProductImage(pendingFile, itemSlug);
      }

      const formValues: AdminProductFormValues = {
        name: name.trim(),
        description: description.trim() || undefined,
        price: numPrice,
        original_price: originalPrice ? parseFloat(originalPrice) : undefined,
        category_id: categoryId,
        diet_type: dietType,
        badge_tags: selectedBadges,
        meal_periods: selectedMealPeriods,
        availability_type: availabilityType,
        start_time: availabilityType === "TIME_SLOT" ? startTime : undefined,
        end_time: availabilityType === "TIME_SLOT" ? endTime : undefined,
        image_path: finalImagePath || undefined,
        is_available: isAvailable,
        is_featured: isFeatured,
        featured_order: isFeatured ? Number(featuredOrder || 1) : 0,
      };

      const savedId = await saveAdminMenuItem(formValues, editingItem?.id);
      onSuccess(savedId);
      onClose();
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err.message || "Failed to save menu item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-2xl min-h-screen sm:min-h-0 bg-white sm:rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/70">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
            <p className="text-xs text-zinc-500">
              {editingItem
                ? `Editing: ${editingItem.name} (${editingItem.legacy_id || "ID: " + editingItem.id.substring(0, 8)})`
                : "Add a new product directly to Hotel Apoorvaa's menu"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span>{formError}</span>
            </div>
          )}

          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Item Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Garlic Butter Naan"
              required
              disabled={isSubmitting}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Description <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about size, taste, or special ingredients..."
              rows={2}
              disabled={isSubmitting}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white resize-none"
            />
          </div>

          {/* Pricing & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Price (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="250"
                required
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Original Price (₹) <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 280"
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Meal Periods Multi-Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Meal Periods <span className="text-zinc-400 font-normal">(Select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_MEAL_PERIODS.map((mp) => {
                const active = selectedMealPeriods.includes(mp.id);
                return (
                  <button
                    key={mp.id}
                    type="button"
                    onClick={() => toggleMealPeriod(mp.id)}
                    disabled={isSubmitting}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      active
                        ? "bg-amber-700 text-white border-amber-700 shadow-xs"
                        : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200"
                    }`}
                  >
                    {mp.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Badges / Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Badges & Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BADGES.map((b) => {
                const active = selectedBadges.includes(b.id);
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => toggleBadge(b.id)}
                    disabled={isSubmitting}
                    className={`px-3 py-1 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                      active
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                        : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Type & Time Slots */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Availability Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={availabilityType}
                onChange={(e) => setAvailabilityType(e.target.value as AvailabilityType)}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2 text-sm font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="ALWAYS">Always Available (All Day)</option>
                <option value="TIME_SLOT">Specific Time Slot</option>
                <option value="DINNER">Dinner Only (6:00 PM – 11:00 PM)</option>
              </select>
            </div>

            {availabilityType === "TIME_SLOT" && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Direct Photo Uploader */}
          <ImageUploader
            currentImagePath={currentImagePath}
            pendingFile={pendingFile}
            onFileSelect={(file) => setPendingFile(file)}
            onRemoveCurrent={() => {
              setCurrentImagePath(null);
              setPendingFile(null);
            }}
            disabled={isSubmitting}
          />

          {/* Toggles: Available for Sale & Chef's Special */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 text-emerald-600 rounded border-zinc-300 focus:ring-emerald-500"
              />
              <div>
                <span className="text-sm font-semibold text-zinc-900 block">
                  Item is Available for Sale
                </span>
                <span className="text-xs text-zinc-500 block">
                  Turn off if item is temporarily out of stock
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 text-amber-600 rounded border-zinc-300 focus:ring-amber-500"
              />
              <div className="flex-1">
                <span className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Chef&apos;s Special / Featured
                </span>
                <span className="text-xs text-zinc-500 block">
                  Highlight this product in the top hero slider
                </span>
              </div>
              {isFeatured && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-500">Order:</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={featuredOrder || 1}
                    onChange={(e) => setFeaturedOrder(parseInt(e.target.value) || 1)}
                    className="w-14 px-2 py-1 text-xs border border-zinc-300 rounded-md bg-white text-center"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </label>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isSubmitting ? "Saving..." : editingItem ? "Save Changes" : "Save Item"}
          </button>
        </div>
      </div>
    </div>
  );
};
