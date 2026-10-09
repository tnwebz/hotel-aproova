import { AvailabilityType, MealPeriod } from "@/data/mealPeriods";
import { BadgeType } from "@/components/Menu/MenuItemCard";

export type DietType = "VEGETARIAN" | "VEGAN";

export interface DbCategory {
  id: string;
  slug: string;
  name: string;
  hero_image: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbMenuItem {
  id: string;
  legacy_id: string | null;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  diet_type: DietType;
  badge_tags: string[];
  rating: number | null;
  reviews_count: number | null;
  image_path: string | null;
  availability_type: AvailabilityType;
  start_time: string | null;
  end_time: string | null;
  is_available: boolean;
  is_featured: boolean;
  featured_order: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbMenuItemMealPeriod {
  id: string;
  menu_item_id: string;
  meal_period: MealPeriod;
  created_at: string;
}

export interface DbAdminProfile {
  id: string;
  user_id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProductFormValues {
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  category_id: string;
  diet_type: DietType;
  badge_tags: BadgeType[];
  meal_periods: MealPeriod[];
  availability_type: AvailabilityType;
  start_time?: string;
  end_time?: string;
  image_path?: string;
  is_available: boolean;
  is_featured: boolean;
  featured_order?: number;
}
