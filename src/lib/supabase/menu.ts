import { createClient } from "./client";
import { getStorageImageUrl } from "./storage";
import { DbCategory, DbMenuItem, AdminProductFormValues } from "@/types/database";
import { MenuCategory, MenuItem } from "@/data/menu";
import { MealPeriod, AvailabilityType } from "@/data/mealPeriods";
import { BadgeType } from "@/components/Menu/MenuItemCard";

// Fallback images per category slug if an item has no custom photo uploaded yet
const categoryDefaultImages: Record<string, string> = {
  "tiffin": "/menu-images/tiffin/andhra-podi-idly.webp",
  "dosa": "/menu-images/dosa/apoorvaa-special-roast.webp",
  "rava-roast": "/menu-images/rava-roast/cashew-rava-roast.webp",
  "uthappam": "/menu-images/uthappam/butter-uthappam.webp",
  "parotta-chappathi": "/menu-images/parotta-chappathi/bun-parotta.webp",
  "meals": "/menu-images/meals/meals-limited.webp",
  "tandoori-starters": "/menu-images/tandoori-starters/aloo-tikka.webp",
  "starters": "/menu-images/starters/babycorn-65.webp",
  "soup": "/menu-images/soup/broccoli-soup.webp",
  "variety-rice": "/menu-images/variety-rice/curd-rice.webp",
  "main-course": "/menu-images/main-course/babycorn-apoorvaa-special.webp",
  "tandoori-roti": "/menu-images/tandoori-roti/butter-roti.webp",
  "tandoori-naan-kulcha": "/menu-images/tandoori-naan-kulcha/butter-kulcha.webp",
  "rice-pulao-noodles": "/menu-images/rice-pulao-noodles/american-chop-suey.webp",
  "indian-main-course": "/menu-images/indian-main-course/channa-masala.webp",
  "juice": "/menu-images/juice/apple-juice.webp",
  "chaat": "/menu-images/chaat/aloo-samosa-2-pcs.webp",
  "kids-special": "/menu-images/kids-special/cutlet-two-pcs.webp",
  "sandwich": "/menu-images/sandwich/cheese-sandwich.webp",
  "apoorvaa-special-pasta": "/menu-images/apoorvaa-special-pasta/chef-spl-spaghetti-pasta.webp",
  "beverages": "/menu-images/beverages/badam-kheer.webp",
  "snacks": "/menu-images/snacks/arisi-bonda.webp",
  "ice-creams-milk-shake": "/menu-images/ice-creams-milk-shake/butterscotch-milk-shake.webp",
};

export interface AdminMenuItemWithDetails extends DbMenuItem {
  category: DbCategory;
  meal_periods: MealPeriod[];
}

/**
 * Fetches the complete menu structure directly from Supabase for public display.
 */
export async function fetchPublicMenu(): Promise<MenuCategory[]> {
  const supabase = createClient();

  // 1. Fetch active categories
  const { data: categories, error: catError } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (catError || !categories) {
    console.error("Error fetching menu categories from Supabase:", catError);
    throw new Error(catError?.message || "Failed to fetch categories");
  }

  // 2. Fetch all menu items
  const { data: items, error: itemsError } = await supabase
    .from("menu_items")
    .select("*, menu_item_meal_periods(meal_period)")
    .order("display_order", { ascending: true });

  if (itemsError || !items) {
    console.error("Error fetching menu items from Supabase:", itemsError);
    throw new Error(itemsError?.message || "Failed to fetch menu items");
  }

  // 3. Map items to their respective category
  const categoryMap: Record<string, MenuItem[]> = {};
  categories.forEach((cat) => {
    categoryMap[cat.id] = [];
  });

  items.forEach((item: any) => {
    const cat = categories.find((c) => c.id === item.category_id);
    if (!cat) return;

    const mealPeriods: MealPeriod[] = (item.menu_item_meal_periods || []).map(
      (mp: { meal_period: MealPeriod }) => mp.meal_period
    );

    // Format start/end time from "HH:MM:SS" to "HH:MM"
    const startTimeFormatted = item.start_time ? item.start_time.substring(0, 5) : undefined;
    const endTimeFormatted = item.end_time ? item.end_time.substring(0, 5) : undefined;

    const publicItem: MenuItem = {
      id: item.legacy_id || item.id,
      name: item.name,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      rating: item.rating ? Number(item.rating) : undefined,
      reviewsCount: item.reviews_count ? Number(item.reviews_count) : undefined,
      category: cat.slug,
      categoryName: cat.name,
      availabilityType: item.availability_type as AvailabilityType,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      mealPeriods: mealPeriods.length > 0 ? mealPeriods : ["ALL_DAY"],
      isVeg: true,
      isAvailable: item.is_available,
      image: item.image_path
        ? getStorageImageUrl(item.image_path)
        : categoryDefaultImages[cat.slug] || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
      badges: (item.badge_tags || []) as BadgeType[],
    };

    if (categoryMap[cat.id]) {
      categoryMap[cat.id].push(publicItem);
    }
  });

  // 4. Assemble standard MenuCategory list
  return categories.map((cat) => {
    const itemsInCat = categoryMap[cat.id] || [];
    const defaultAvailability = itemsInCat.length > 0 ? itemsInCat[0].availabilityType : "ALWAYS";
    const startTime = itemsInCat.length > 0 ? itemsInCat[0].startTime : undefined;
    const endTime = itemsInCat.length > 0 ? itemsInCat[0].endTime : undefined;

    // Collect all meal periods in category
    const catMealPeriodsSet = new Set<MealPeriod>();
    itemsInCat.forEach((it) => it.mealPeriods.forEach((mp) => catMealPeriodsSet.add(mp)));

    return {
      id: cat.slug,
      name: cat.name,
      heroImage: cat.hero_image || categoryDefaultImages[cat.slug] || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
      defaultMealPeriods: Array.from(catMealPeriodsSet),
      availabilityType: defaultAvailability,
      startTime,
      endTime,
      items: itemsInCat,
    };
  });
}

/**
 * Fetches featured / Chef's Special items from Supabase.
 */
export async function fetchFeaturedItems(): Promise<MenuItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*, menu_categories(name, slug), menu_item_meal_periods(meal_period)")
    .eq("is_featured", true)
    .order("featured_order", { ascending: true })
    .limit(10);

  if (error || !data) {
    console.error("Error fetching featured items:", error);
    return [];
  }

  return data.map((item: any) => {
    const cat = item.menu_categories;
    const mealPeriods: MealPeriod[] = (item.menu_item_meal_periods || []).map(
      (mp: { meal_period: MealPeriod }) => mp.meal_period
    );

    return {
      id: item.legacy_id || item.id,
      name: item.name,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      rating: item.rating ? Number(item.rating) : undefined,
      reviewsCount: item.reviews_count ? Number(item.reviews_count) : undefined,
      category: cat?.slug || "tiffin",
      categoryName: cat?.name || "Tiffin",
      availabilityType: item.availability_type as AvailabilityType,
      startTime: item.start_time ? item.start_time.substring(0, 5) : undefined,
      endTime: item.end_time ? item.end_time.substring(0, 5) : undefined,
      mealPeriods: mealPeriods.length > 0 ? mealPeriods : ["ALL_DAY"],
      isVeg: true,
      isAvailable: item.is_available,
      image: item.image_path
        ? getStorageImageUrl(item.image_path)
        : categoryDefaultImages[cat?.slug || "tiffin"] || "",
      badges: (item.badge_tags || []) as BadgeType[],
    };
  });
}

/**
 * Fetches all categories for admin use.
 */
export async function fetchAdminCategories(): Promise<DbCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data as DbCategory[];
}

/**
 * Fetches menu items for admin management with filters.
 */
export async function fetchAdminMenuItems(params?: {
  search?: string;
  categoryId?: string;
  mealPeriod?: string;
  availability?: string;
  status?: "all" | "active" | "inactive";
}): Promise<AdminMenuItemWithDetails[]> {
  const supabase = createClient();

  let query = supabase
    .from("menu_items")
    .select("*, category:menu_categories(*), menu_item_meal_periods(meal_period)")
    .order("display_order", { ascending: true });

  if (params?.categoryId && params.categoryId !== "ALL") {
    query = query.eq("category_id", params.categoryId);
  }

  if (params?.availability && params.availability !== "ALL") {
    query = query.eq("availability_type", params.availability);
  }

  if (params?.status === "active") {
    query = query.eq("is_available", true);
  } else if (params?.status === "inactive") {
    query = query.eq("is_available", false);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  let results = (data || []).map((item: any) => ({
    ...item,
    meal_periods: (item.menu_item_meal_periods || []).map((mp: any) => mp.meal_period),
  })) as AdminMenuItemWithDetails[];

  // Client-side text search
  if (params?.search && params.search.trim()) {
    const s = params.search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        (item.legacy_id && item.legacy_id.toLowerCase().includes(s)) ||
        (item.category?.name && item.category.name.toLowerCase().includes(s))
    );
  }

  // Filter by meal period
  if (params?.mealPeriod && params.mealPeriod !== "ALL") {
    results = results.filter((item) =>
      item.meal_periods.includes(params.mealPeriod as MealPeriod)
    );
  }

  return results;
}

/**
 * Saves (create or update) a menu item and its meal period associations.
 */
export async function saveAdminMenuItem(
  formValues: AdminProductFormValues,
  itemId?: string
): Promise<string> {
  const supabase = createClient();

  const formattedStartTime =
    formValues.availability_type === "TIME_SLOT" && formValues.start_time
      ? `${formValues.start_time}:00`.substring(0, 8)
      : null;

  const formattedEndTime =
    formValues.availability_type === "TIME_SLOT" && formValues.end_time
      ? `${formValues.end_time}:00`.substring(0, 8)
      : null;

  const itemPayload = {
    category_id: formValues.category_id,
    name: formValues.name.trim(),
    description: formValues.description?.trim() || null,
    price: Number(formValues.price),
    original_price: formValues.original_price ? Number(formValues.original_price) : null,
    diet_type: formValues.diet_type,
    badge_tags: formValues.badge_tags,
    image_path: formValues.image_path || null,
    availability_type: formValues.availability_type,
    start_time: formattedStartTime,
    end_time: formattedEndTime,
    is_available: formValues.is_available,
    is_featured: formValues.is_featured,
    featured_order: formValues.is_featured ? (formValues.featured_order || 1) : 0,
    updated_at: new Date().toISOString(),
  };

  let savedId = itemId;

  if (itemId) {
    // Update existing item
    const { error } = await supabase
      .from("menu_items")
      .update(itemPayload)
      .eq("id", itemId);

    if (error) {
      throw new Error(`Failed to update menu item: ${error.message}`);
    }
  } else {
    // Create new item
    // Generate deterministic slug-like legacy_id
    const baseSlug = formValues.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const { data, error } = await supabase
      .from("menu_items")
      .insert({
        ...itemPayload,
        legacy_id: uniqueSlug,
        display_order: 999,
      })
      .select("id")
      .single();

    if (error || !data) {
      throw new Error(`Failed to create menu item: ${error?.message}`);
    }
    savedId = data.id;
  }

  // Update meal periods
  if (savedId && formValues.meal_periods) {
    // Remove existing relations
    await supabase
      .from("menu_item_meal_periods")
      .delete()
      .eq("menu_item_id", savedId);

    // Insert new relations
    if (formValues.meal_periods.length > 0) {
      const mealPeriodRows = formValues.meal_periods.map((mp) => ({
        menu_item_id: savedId,
        meal_period: mp,
      }));

      const { error: mpError } = await supabase
        .from("menu_item_meal_periods")
        .insert(mealPeriodRows);

      if (mpError) {
        console.warn("Failed to update meal periods:", mpError.message);
      }
    }
  }

  return savedId as string;
}

/**
 * Toggles product sale availability status
 */
export async function toggleMenuItemAvailability(id: string, isAvailable: boolean): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("menu_items")
    .update({ is_available: isAvailable, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update status: ${error.message}`);
  }
}

/**
 * Deletes a product and its associated meal period relations
 */
export async function deleteMenuItem(id: string): Promise<void> {
  const supabase = createClient();

  // The database schema has ON DELETE CASCADE for menu_item_meal_periods
  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete menu item: ${error.message}`);
  }
}

/**
 * Gets dashboard summary statistics
 */
export async function getMenuStats(): Promise<{
  totalItems: number;
  availableItems: number;
  unavailableItems: number;
  totalCategories: number;
}> {
  const supabase = createClient();

  const [itemsRes, catRes] = await Promise.all([
    supabase.from("menu_items").select("id, is_available"),
    supabase.from("menu_categories").select("id", { count: "exact" }),
  ]);

  const items = itemsRes.data || [];
  const totalItems = items.length;
  const availableItems = items.filter((i) => i.is_available).length;
  const unavailableItems = totalItems - availableItems;
  const totalCategories = catRes.count || (catRes.data ? catRes.data.length : 0);

  return {
    totalItems,
    availableItems,
    unavailableItems,
    totalCategories,
  };
}
