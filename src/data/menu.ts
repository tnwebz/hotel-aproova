import { BadgeType } from "@/components/Menu/MenuItemCard";
import { AvailabilityType, MealPeriod } from "./mealPeriods";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  category: string;
  categoryName: string;
  availabilityType: AvailabilityType;
  startTime?: string;
  endTime?: string;
  mealPeriods: MealPeriod[];
  isVeg: true;
  isAvailable?: boolean;
  image: string;
  badges: BadgeType[];
}

export interface MenuCategory {
  id: string;
  name: string;
  heroImage: string;
  defaultMealPeriods: MealPeriod[];
  availabilityType: AvailabilityType;
  startTime?: string;
  endTime?: string;
  items: MenuItem[];
}

export const hotelDetails = {
  name: "Hotel Apoorvaa",
  tagline: "Pure Veg",
  location: "Tamil Nadu, India",
  timezone: "Asia/Kolkata",
};

// Curated Category Default Hero Images
const categoryHeroImages: Record<string, string> = {
  "tiffin": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
  "dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
  "rava-roast": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
  "uthappam": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
  "parotta-chappathi": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop",
  "meals": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1200&auto=format&fit=crop",
  "tandoori-starters": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200&auto=format&fit=crop",
  "starters": "https://images.unsplash.com/photo-1610057099443-f6893282423a?q=80&w=1200&auto=format&fit=crop",
  "soup": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",
  "variety-rice": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
  "main-course": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop",
  "tandoori-roti": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop",
  "tandoori-naan-kulcha": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop",
  "rice-pulao-noodles": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop",
  "indian-main-course": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
  "juice": "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1200&auto=format&fit=crop",
  "chaat": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
  "kids-special": "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1200&auto=format&fit=crop",
  "sandwich": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop",
  "apoorvaa-special-pasta": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
  "beverages": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
  "snacks": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
  "ice-creams-milk-shake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
};

// Curated Dish Image Mapping Helper
function getDishImage(categoryId: string, name: string): string {
  const n = name.toLowerCase();

  // Tiffin & Snacks
  if (n.includes("idly") || n.includes("idli")) return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop";
  if (n.includes("vada")) return "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop";
  if (n.includes("pongal")) return "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop";
  if (n.includes("poori") || n.includes("puri")) return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop";
  if (n.includes("kesari")) return "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop";
  if (n.includes("upma")) return "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop";
  if (n.includes("appam") || n.includes("paniyaram") || n.includes("idiyappam")) return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop";

  // Dosa & Rava & Uthappam
  if (categoryId === "dosa" || categoryId === "rava-roast" || categoryId === "uthappam") {
    return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop";
  }

  // Parotta & Chappathi
  if (n.includes("parotta")) return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop";
  if (n.includes("chappathi") || n.includes("pulka") || n.includes("roti")) return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop";
  if (n.includes("naan") || n.includes("kulcha")) return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop";

  // Meals & Rice
  if (categoryId === "meals") return "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop";
  if (n.includes("biriyani") || n.includes("biryani")) return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop";
  if (n.includes("rice") || n.includes("pulao")) return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop";
  if (n.includes("noodles") || n.includes("chop suey")) return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop";

  // Starters & Tandoor
  if (n.includes("tikka") || n.includes("kebab")) return "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop";
  if (categoryId === "starters" || categoryId === "tandoori-starters") {
    return "https://images.unsplash.com/photo-1610057099443-f6893282423a?q=80&w=800&auto=format&fit=crop";
  }

  // Soups
  if (categoryId === "soup") return "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop";

  // Gravies & Main Course
  if (categoryId === "main-course" || categoryId === "indian-main-course") {
    if (n.includes("paneer")) return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop";
    if (n.includes("dal") || n.includes("thadka")) return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop";
  }

  // Beverages
  if (n.includes("coffee")) return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop";
  if (n.includes("tea") || n.includes("chai")) return "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop";
  if (n.includes("milk") || n.includes("boost") || n.includes("horlicks")) return "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop";

  // Juices & Shakes
  if (categoryId === "juice") return "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop";
  if (categoryId === "ice-creams-milk-shake") return "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop";

  // Chaat & Snacks
  if (categoryId === "chaat") return "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop";
  if (categoryId === "snacks") return "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop";

  // Kids & Sandwich & Pasta
  if (categoryId === "kids-special") return "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=800&auto=format&fit=crop";
  if (categoryId === "sandwich") {
    if (n.includes("momos")) return "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop";
  }
  if (categoryId === "apoorvaa-special-pasta") return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop";

  return categoryHeroImages[categoryId] || "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop";
}

// -------------------------------------------------------------
// CANONICAL 23 CATEGORIES & 306 ITEMS DATASET
// -------------------------------------------------------------

export const menuData: MenuCategory[] = [
  // 1. TIFFIN
  {
    id: "tiffin",
    name: "Tiffin",
    heroImage: categoryHeroImages["tiffin"],
    defaultMealPeriods: ["BREAKFAST", "ALL_DAY", "DINNER"],
    availabilityType: "ALWAYS",
    items: [
      { id: "tiffin-kesari", name: "Kesari", price: 70, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Kesari"), badges: ["veg"] },
      { id: "tiffin-idly-2pcs", name: "Idly (2Pcs)", price: 50, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Idly (2Pcs)"), badges: ["veg", "bestseller"] },
      { id: "tiffin-sambar-idly-2pcs", name: "Sambar Idly (2Pcs)", price: 90, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Sambar Idly (2Pcs)"), badges: ["veg"] },
      { id: "tiffin-mini-idly-sambar-14pcs", name: "Mini Idly Sambar (14Pcs)", price: 100, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Mini Idly Sambar (14Pcs)"), badges: ["veg", "bestseller"] },
      { id: "tiffin-ellu-podi-idly", name: "Ellu Podi Idly", price: 89, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Ellu Podi Idly"), badges: ["veg"] },
      { id: "tiffin-andhra-podi-idly", name: "Andhra Podi Idly", price: 89, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Andhra Podi Idly"), badges: ["veg", "spicy"] },
      { id: "tiffin-poondu-podi-idly", name: "Poondu Podi Idly", price: 89, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Poondu Podi Idly"), badges: ["veg"] },
      { id: "tiffin-ghee-podi-idly", name: "Ghee podi idly", price: 109, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Ghee podi idly"), badges: ["veg", "chef-choice"] },
      { id: "tiffin-vada-1pc", name: "Vada (1pc)", price: 45, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Vada (1pc)"), badges: ["veg"] },
      { id: "tiffin-vada-sambar-curd-rasa-1pc", name: "Vada Sambar / Curd / Rasa (1pc)", price: 55, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Vada Sambar / Curd / Rasa (1pc)"), badges: ["veg"] },
      { id: "tiffin-ghee-pongal", name: "Ghee Pongal", price: 99, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Ghee Pongal"), badges: ["veg", "bestseller"] },
      { id: "tiffin-poori-2pcs", name: "Poori (2Pcs)", price: 89, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Poori (2Pcs)"), badges: ["veg"] },
      { id: "tiffin-wheat-upma-with-curd", name: "Wheat Upma with Curd", price: 100, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Wheat Upma with Curd"), badges: ["veg"] },
      { id: "tiffin-idiyappam-3pcs", name: "Idiyappam (3Pcs)", price: 90, category: "tiffin", categoryName: "Tiffin", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("tiffin", "Idiyappam (3Pcs)"), badges: ["veg"] },
      // Dinner only items
      { id: "tiffin-vadakari", name: "Vadakari", price: 55, category: "tiffin", categoryName: "Tiffin", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("tiffin", "Vadakari"), badges: ["veg", "chef-choice"] },
      { id: "tiffin-paniyaram", name: "Paniyaram", price: 75, category: "tiffin", categoryName: "Tiffin", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("tiffin", "Paniyaram"), badges: ["veg"] },
      { id: "tiffin-idly-vadakari", name: "Idly vadakari", price: 100, category: "tiffin", categoryName: "Tiffin", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("tiffin", "Idly vadakari"), badges: ["veg", "bestseller"] },
      { id: "tiffin-appam-1pc", name: "Appam (1Pc)", price: 70, category: "tiffin", categoryName: "Tiffin", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("tiffin", "Appam (1Pc)"), badges: ["veg"] },
    ],
  },

  // 2. DOSA
  {
    id: "dosa",
    name: "Dosa",
    heroImage: categoryHeroImages["dosa"],
    defaultMealPeriods: ["BREAKFAST", "ALL_DAY", "DINNER"],
    availabilityType: "ALWAYS",
    items: [
      { id: "dosa-apoorvaa-special-roast", name: "Apoorvaa Special Roast", price: 199, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Apoorvaa Special Roast"), badges: ["veg", "bestseller", "chef-choice"] },
      { id: "dosa-roast", name: "Roast", price: 110, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Roast"), badges: ["veg"] },
      { id: "dosa-paper-roast", name: "Paper Roast", price: 190, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Paper Roast"), badges: ["veg", "bestseller"] },
      { id: "dosa-onion-masal-roast", name: "Onion Masal Roast", price: 160, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Onion Masal Roast"), badges: ["veg"] },
      { id: "dosa-ghee-roast", name: "Ghee Roast", price: 160, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Roast"), badges: ["veg", "bestseller"] },
      { id: "dosa-masal-roast", name: "Masal Roast", price: 135, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Masal Roast"), badges: ["veg"] },
      { id: "dosa-onion-roast", name: "Onion Roast", price: 135, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Onion Roast"), badges: ["veg"] },
      { id: "dosa-podi-roast", name: "Podi Roast", price: 135, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Podi Roast"), badges: ["veg"] },
      { id: "dosa-podi-masal-roast", name: "Podi Masal Roast", price: 150, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Podi Masal Roast"), badges: ["veg"] },
      { id: "dosa-ghee-masal-roast", name: "Ghee Masal Roast", price: 180, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Masal Roast"), badges: ["veg"] },
      { id: "dosa-ghee-podi-masal-roast", name: "Ghee Podi Masal Roast", price: 185, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Podi Masal Roast"), badges: ["veg", "chef-choice"] },
      { id: "dosa-ghee-podi-roast", name: "Ghee Podi Roast", price: 170, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Podi Roast"), badges: ["veg"] },
      { id: "dosa-podi-onion-roast", name: "Podi Onion Roast", price: 150, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Podi Onion Roast"), badges: ["veg"] },
      { id: "dosa-ghee-onion-roast", name: "Ghee Onion Roast", price: 165, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Onion Roast"), badges: ["veg"] },
      { id: "dosa-ghee-podi-onion-roast", name: "Ghee Podi Onion Roast", price: 175, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Ghee Podi Onion Roast"), badges: ["veg"] },
      { id: "dosa-family-roast", name: "Family Roast", price: 300, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Family Roast"), badges: ["veg", "bestseller"] },
      { id: "dosa-butter-roast", name: "Butter Roast", price: 160, category: "dosa", categoryName: "Dosa", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("dosa", "Butter Roast"), badges: ["veg"] },
      // Dinner only items
      { id: "dosa-mushroom-roast", name: "Mushroom Roast", price: 180, category: "dosa", categoryName: "Dosa", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("dosa", "Mushroom Roast"), badges: ["veg", "chef-choice"] },
      { id: "dosa-paneer-roast", name: "Paneer Roast", price: 189, category: "dosa", categoryName: "Dosa", availabilityType: "DINNER", startTime: "18:00", endTime: "23:00", mealPeriods: ["DINNER"], isVeg: true, image: getDishImage("dosa", "Paneer Roast"), badges: ["veg", "bestseller"] },
    ],
  },

  // 3. RAVA ROAST
  {
    id: "rava-roast",
    name: "Rava Roast",
    heroImage: categoryHeroImages["rava-roast"],
    defaultMealPeriods: ["BREAKFAST", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "rava-roast-plain", name: "Rava Roast", price: 110, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Rava Roast"), badges: ["veg"] },
      { id: "rava-roast-masal", name: "Rava Masal Roast", price: 135, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Rava Masal Roast"), badges: ["veg", "bestseller"] },
      { id: "rava-roast-onion", name: "Onion Rava Roast", price: 135, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Onion Rava Roast"), badges: ["veg"] },
      { id: "rava-roast-ghee", name: "Ghee Rava Roast", price: 160, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Ghee Rava Roast"), badges: ["veg", "chef-choice"] },
      { id: "rava-roast-special", name: "Special Rava Roast", price: 170, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Special Rava Roast"), badges: ["veg"] },
      { id: "rava-roast-ghee-onion", name: "Ghee Onion Rava Roast", price: 165, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Ghee Onion Rava Roast"), badges: ["veg"] },
      { id: "rava-roast-cashew", name: "Cashew Rava Roast", price: 190, category: "rava-roast", categoryName: "Rava Roast", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("rava-roast", "Cashew Rava Roast"), badges: ["veg", "bestseller"] },
    ],
  },

  // 4. UTHAPPAM
  {
    id: "uthappam",
    name: "Uthappam",
    heroImage: categoryHeroImages["uthappam"],
    defaultMealPeriods: ["BREAKFAST", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "uthappam-plain", name: "Uthappam", price: 99, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Uthappam"), badges: ["veg"] },
      { id: "uthappam-small-onion", name: "Small Onion Uthappam", price: 139, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Small Onion Uthappam"), badges: ["veg", "bestseller"] },
      { id: "uthappam-ghee-onion", name: "Ghee Onion Uthappam", price: 160, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Ghee Onion Uthappam"), badges: ["veg"] },
      { id: "uthappam-ghee-podi", name: "Ghee podi Uthappam", price: 150, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Ghee podi Uthappam"), badges: ["veg", "chef-choice"] },
      { id: "uthappam-ghee", name: "Ghee Uthappam", price: 140, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Ghee Uthappam"), badges: ["veg"] },
      { id: "uthappam-onion", name: "Onion Uthappam", price: 140, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Onion Uthappam"), badges: ["veg"] },
      { id: "uthappam-podi", name: "Podi Uthappam", price: 110, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Podi Uthappam"), badges: ["veg"] },
      { id: "uthappam-garlic", name: "Garlic Uthappam", price: 130, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Garlic Uthappam"), badges: ["veg"] },
      { id: "uthappam-tomato", name: "Tomato Uthappam", price: 130, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Tomato Uthappam"), badges: ["veg"] },
      { id: "uthappam-butter", name: "Butter Uthappam", price: 140, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Butter Uthappam"), badges: ["veg"] },
      { id: "uthappam-ghee-podi-onion", name: "Ghee Podi Onion Uthappam", price: 165, category: "uthappam", categoryName: "Uthappam", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "ALL_DAY"], isVeg: true, image: getDishImage("uthappam", "Ghee Podi Onion Uthappam"), badges: ["veg"] },
    ],
  },

  // 5. PAROTTA & CHAPPATHI (12:00 PM – 11:00 PM)
  {
    id: "parotta-chappathi",
    name: "Parotta & Chappathi",
    heroImage: categoryHeroImages["parotta-chappathi"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "parotta-chappathi-2pcs", name: "Chappathi (2Pcs)", price: 89, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Chappathi (2Pcs)"), badges: ["veg"] },
      { id: "parotta-plain-2pcs", name: "Parotta (2Pcs)", price: 89, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Parotta (2Pcs)"), badges: ["veg", "bestseller"] },
      { id: "parotta-bun-1pc", name: "Bun Parotta (1Pc)", price: 75, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Bun Parotta (1Pc)"), badges: ["veg"] },
      { id: "parotta-nool-1pc", name: "Nool Parotta (1Pc)", price: 75, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Nool Parotta (1Pc)"), badges: ["veg"] },
      { id: "parotta-chilly", name: "Chilly Parotta", price: 159, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Chilly Parotta"), badges: ["veg", "spicy"] },
      { id: "parotta-veg-kothu", name: "Veg Kothu Parotta", price: 159, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Veg Kothu Parotta"), badges: ["veg", "bestseller"] },
      { id: "parotta-mushroom", name: "Mushroom Parotta", price: 160, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Mushroom Parotta"), badges: ["veg"] },
      { id: "parotta-methi", name: "Methi Parotta", price: 150, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Methi Parotta"), badges: ["veg"] },
      { id: "parotta-vazhaielai", name: "Vazhaielai Parotta", price: 169, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Vazhaielai Parotta"), badges: ["veg", "chef-choice"] },
      { id: "parotta-coin", name: "Coin Parotta", price: 159, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Coin Parotta"), badges: ["veg"] },
      { id: "parotta-kaima", name: "Kaima Parotta", price: 155, category: "parotta-chappathi", categoryName: "Parotta & Chappathi", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("parotta-chappathi", "Kaima Parotta"), badges: ["veg"] },
    ],
  },

  // 6. MEALS (12:00 PM – 3:30 PM)
  {
    id: "meals",
    name: "Meals",
    heroImage: categoryHeroImages["meals"],
    defaultMealPeriods: ["LUNCH"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "15:30",
    items: [
      { id: "meals-special-unlimited", name: "Special Meals - Unlimited", price: 270, category: "meals", categoryName: "Meals", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("meals", "Special Meals - Unlimited"), badges: ["veg", "bestseller", "chef-choice"] },
      { id: "meals-limited", name: "Meals - Limited", price: 180, category: "meals", categoryName: "Meals", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("meals", "Meals - Limited"), badges: ["veg"] },
      { id: "meals-mini", name: "Mini Meals", price: 165, category: "meals", categoryName: "Meals", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("meals", "Mini Meals"), badges: ["veg"] },
    ],
  },

  // 7. TANDOORI STARTERS (12:00 PM – 11:00 PM)
  {
    id: "tandoori-starters",
    name: "Tandoori Starters",
    heroImage: categoryHeroImages["tandoori-starters"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "tandoori-starters-paneer-tikka", name: "Paneer Tikka", price: 249, category: "tandoori-starters", categoryName: "Tandoori Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-starters", "Paneer Tikka"), badges: ["veg", "bestseller"] },
      { id: "tandoori-starters-mushroom-tikka", name: "Mushroom Tikka", price: 225, category: "tandoori-starters", categoryName: "Tandoori Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-starters", "Mushroom Tikka"), badges: ["veg"] },
      { id: "tandoori-starters-aloo-tikka", name: "Aloo Tikka", price: 230, category: "tandoori-starters", categoryName: "Tandoori Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-starters", "Aloo Tikka"), badges: ["veg"] },
      { id: "tandoori-starters-veg-seekh-kebab", name: "Veg Seekh Kebab", price: 225, category: "tandoori-starters", categoryName: "Tandoori Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-starters", "Veg Seekh Kebab"), badges: ["veg", "chef-choice"] },
    ],
  },

  // 8. STARTERS (12:00 PM – 11:00 PM)
  {
    id: "starters",
    name: "Starters",
    heroImage: categoryHeroImages["starters"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "starters-paneer-pepper-fry", name: "Paneer Pepper Fry", price: 259, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Pepper Fry"), badges: ["veg", "bestseller"] },
      { id: "starters-mushroom-pepper-fry", name: "Mushroom Pepper Fry", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Pepper Fry"), badges: ["veg"] },
      { id: "starters-gobi-pepper-fry", name: "Gobi Pepper Fry", price: 230, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Pepper Fry"), badges: ["veg"] },
      { id: "starters-babycorn-pepper-fry", name: "Babycorn Pepper Fry", price: 220, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn Pepper Fry"), badges: ["veg"] },
      { id: "starters-paneer-schezwan-manchurian", name: "Paneer Schezwan Manchurian", price: 259, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Schezwan Manchurian"), badges: ["veg", "spicy"] },
      { id: "starters-mushroom-schezwan-manchurian", name: "Mushroom Schezwan Manchurian", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Schezwan Manchurian"), badges: ["veg", "spicy"] },
      { id: "starters-gobi-schezwan-manchurian", name: "Gobi Schezwan Manchurian", price: 230, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Schezwan Manchurian"), badges: ["veg", "spicy"] },
      { id: "starters-paneer-chilly", name: "Paneer Chilly", price: 260, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Chilly"), badges: ["veg", "bestseller"] },
      { id: "starters-mushroom-chilly", name: "Mushroom Chilly", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Chilly"), badges: ["veg"] },
      { id: "starters-gobi-chilly", name: "Gobi Chilly", price: 230, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Chilly"), badges: ["veg"] },
      { id: "starters-babycorn-chilly", name: "Babycorn Chilly", price: 220, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn Chilly"), badges: ["veg"] },
      { id: "starters-paneer-65", name: "Paneer 65", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer 65"), badges: ["veg", "bestseller"] },
      { id: "starters-mushroom-65", name: "Mushroom 65", price: 240, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom 65"), badges: ["veg"] },
      { id: "starters-gobi-65", name: "Gobi 65", price: 230, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi 65"), badges: ["veg", "bestseller"] },
      { id: "starters-babycorn-65", name: "Babycorn 65", price: 220, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn 65"), badges: ["veg"] },
      { id: "starters-paneer-manchurian", name: "Paneer Manchurian", price: 259, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Manchurian"), badges: ["veg"] },
      { id: "starters-mushroom-manchurian", name: "Mushroom Manchurian", price: 249, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Manchurian"), badges: ["veg"] },
      { id: "starters-gobi-manchurian", name: "Gobi Manchurian", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Manchurian"), badges: ["veg", "bestseller"] },
      { id: "starters-babycorn-manchurian", name: "Babycorn Manchurian", price: 240, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn Manchurian"), badges: ["veg"] },
      { id: "starters-paneer-hot-pepper", name: "Paneer Hot Pepper", price: 260, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Hot Pepper"), badges: ["veg", "spicy"] },
      { id: "starters-mushroom-hot-pepper", name: "Mushroom Hot Pepper", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Hot Pepper"), badges: ["veg", "spicy"] },
      { id: "starters-gobi-hot-pepper", name: "Gobi Hot Pepper", price: 240, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Hot Pepper"), badges: ["veg", "spicy"] },
      { id: "starters-babycorn-hot-pepper", name: "Babycorn Hot Pepper", price: 220, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn Hot Pepper"), badges: ["veg", "spicy"] },
      { id: "starters-paneer-dragon", name: "Paneer Dragon", price: 260, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Paneer Dragon"), badges: ["veg", "chef-choice"] },
      { id: "starters-mushroom-dragon", name: "Mushroom Dragon", price: 250, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Mushroom Dragon"), badges: ["veg"] },
      { id: "starters-gobi-dragon", name: "Gobi Dragon", price: 240, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Gobi Dragon"), badges: ["veg"] },
      { id: "starters-babycorn-dragon", name: "Babycorn Dragon", price: 230, category: "starters", categoryName: "Starters", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("starters", "Babycorn Dragon"), badges: ["veg"] },
    ],
  },

  // 9. SOUP (12:00 PM – 11:00 PM)
  {
    id: "soup",
    name: "Soup",
    heroImage: categoryHeroImages["soup"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "soup-veg-clear", name: "Veg Clear Soup", price: 100, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Veg Clear Soup"), badges: ["veg"] },
      { id: "soup-tomatto", name: "Tomatto Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Tomatto Soup"), badges: ["veg", "bestseller"] },
      { id: "soup-sweet-corn", name: "Sweet Corn Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Sweet Corn Soup"), badges: ["veg", "bestseller"] },
      { id: "soup-mushroom", name: "Mushroom Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Mushroom Soup"), badges: ["veg"] },
      { id: "soup-chettinad", name: "Chettinad Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Chettinad Soup"), badges: ["veg", "spicy"] },
      { id: "soup-pepper-leaf", name: "Pepper Leaf Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Pepper Leaf Soup"), badges: ["veg"] },
      { id: "soup-hot-sour", name: "Hot & Sour Soup", price: 105, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Hot & Sour Soup"), badges: ["veg", "spicy"] },
      { id: "soup-milagu-dhaniya", name: "Milagu Dhaniya Soup", price: 105, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Milagu Dhaniya Soup"), badges: ["veg"] },
      { id: "soup-lemon-with-coriander", name: "Lemon With Coriander Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Lemon With Coriander Soup"), badges: ["veg"] },
      { id: "soup-french-onion", name: "French Onion Soup", price: 99, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "French Onion Soup"), badges: ["veg"] },
      { id: "soup-manchow", name: "Manchow Soup", price: 95, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Manchow Soup"), badges: ["veg", "chef-choice"] },
      { id: "soup-cream-of-veg", name: "Cream of veg soup", price: 105, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Cream of veg soup"), badges: ["veg"] },
      { id: "soup-broccoli", name: "Broccoli soup", price: 115, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Broccoli soup"), badges: ["veg"] },
      { id: "soup-cream-of-mushroom", name: "Cream Of Mushroom", price: 105, category: "soup", categoryName: "Soup", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("soup", "Cream Of Mushroom"), badges: ["veg"] },
    ],
  },

  // 10. VARIETY RICE (12:00 PM – 3:30 PM)
  {
    id: "variety-rice",
    name: "Variety Rice",
    heroImage: categoryHeroImages["variety-rice"],
    defaultMealPeriods: ["LUNCH"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "15:30",
    items: [
      { id: "variety-rice-curd", name: "Curd Rice", price: 89, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Curd Rice"), badges: ["veg", "bestseller"] },
      { id: "variety-rice-sambar", name: "Sambar Rice", price: 89, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Sambar Rice"), badges: ["veg"] },
      { id: "variety-rice-lemon", name: "Lemon Rice", price: 89, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Lemon Rice"), badges: ["veg"] },
      { id: "variety-rice-tomato", name: "Tomato Rice", price: 89, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Tomato Rice"), badges: ["veg"] },
      { id: "variety-rice-tamarind", name: "Tamarind Rice", price: 89, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Tamarind Rice"), badges: ["veg"] },
      { id: "variety-rice-veg-chinese-biriyani", name: "Veg Chinese Biriyani", price: 149, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Veg Chinese Biriyani"), badges: ["veg"] },
      { id: "variety-rice-mushroom-dum-biriyani", name: "Mushroom Dum Biriyani", price: 179, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Mushroom Dum Biriyani"), badges: ["veg", "chef-choice"] },
      { id: "variety-rice-veg-dum-biriyani", name: "Veg Dum Biriyani", price: 149, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Veg Dum Biriyani"), badges: ["veg", "bestseller"] },
      { id: "variety-rice-paneer-biriyani", name: "Paneer Biriyani", price: 200, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Paneer Biriyani"), badges: ["veg", "bestseller"] },
      { id: "variety-rice-special-curd", name: "Special curd rice", price: 109, category: "variety-rice", categoryName: "Variety Rice", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "15:30", mealPeriods: ["LUNCH"], isVeg: true, image: getDishImage("variety-rice", "Special curd rice"), badges: ["veg"] },
    ],
  },

  // 11. MAIN COURSE (12:00 PM – 11:00 PM)
  {
    id: "main-course",
    name: "Main Course",
    heroImage: categoryHeroImages["main-course"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "main-course-paneer-tikka-masala", name: "Paneer Tikka Masala", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Tikka Masala"), badges: ["veg", "bestseller"] },
      { id: "main-course-mushroom-tikka-masala", name: "Mushroom Tikka Masala", price: 239, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Tikka Masala"), badges: ["veg"] },
      { id: "main-course-paneer-pallipalayam", name: "Paneer Pallipalayam", price: 259, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Pallipalayam"), badges: ["veg"] },
      { id: "main-course-mushroom-pallipalayam", name: "Mushroom Pallipalayam", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Pallipalayam"), badges: ["veg"] },
      { id: "main-course-gobi-pallipalayam", name: "Gobi Pallipalayam", price: 239, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Pallipalayam"), badges: ["veg"] },
      { id: "main-course-babycorn-pallipalayam", name: "Babycorn Pallipalayam", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Pallipalayam"), badges: ["veg"] },
      { id: "main-course-paneer-methi-apoorvaa-spl", name: "Paneer Methi (ApoorvaA spl)", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Methi (ApoorvaA spl)"), badges: ["veg", "chef-choice"] },
      { id: "main-course-mushroom-methi-apoorvaa-spl", name: "Mushroom Methi (ApoorvaA Spl)", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Methi (ApoorvaA Spl)"), badges: ["veg"] },
      { id: "main-course-gobi-methi-apoorvaa-spl", name: "Gobi Methi (ApoorvaA Spl)", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Methi (ApoorvaA Spl)"), badges: ["veg"] },
      { id: "main-course-paneer-maharani-dry", name: "Paneer Maharani (Dry)", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Maharani (Dry)"), badges: ["veg"] },
      { id: "main-course-mushroom-maharani-dry", name: "Mushroom Maharani (Dry)", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Maharani (Dry)"), badges: ["veg"] },
      { id: "main-course-gobi-maharani-dry", name: "Gobi Maharani (Dry)", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Maharani (Dry)"), badges: ["veg"] },
      { id: "main-course-babycorn-maharani-dry", name: "Babycorn Maharani (Dry)", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Maharani (Dry)"), badges: ["veg"] },
      { id: "main-course-paneer-chinthamani", name: "Paneer - Chinthamani", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer - Chinthamani"), badges: ["veg"] },
      { id: "main-course-mushroom-chinthamani", name: "Mushroom - Chinthamani", price: 239, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom - Chinthamani"), badges: ["veg"] },
      { id: "main-course-gobi-chithamani", name: "Gobi - Chithamani", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi - Chithamani"), badges: ["veg"] },
      { id: "main-course-babycorn-chithamani", name: "Babycorn - Chithamani", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn - Chithamani"), badges: ["veg"] },
      { id: "main-course-paneer-mutter-rogan-gravy", name: "Paneer - Mutter Rogan Gravy", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer - Mutter Rogan Gravy"), badges: ["veg"] },
      { id: "main-course-mushroom-mutter-rogan-gravy", name: "Mushroom - Mutter Rogan Gravy", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom - Mutter Rogan Gravy"), badges: ["veg"] },
      { id: "main-course-gobi-mutter-rogan-gravy", name: "Gobi - Mutter Rogan Gravy", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi - Mutter Rogan Gravy"), badges: ["veg"] },
      { id: "main-course-babycorn-mutter-rogan-gravy", name: "Babycorn - Mutter Rogan Gravy", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn - Mutter Rogan Gravy"), badges: ["veg"] },
      { id: "main-course-paneer-butter-masala", name: "Paneer Butter Masala", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Butter Masala"), badges: ["veg", "bestseller"] },
      { id: "main-course-paneer-hariyali", name: "Paneer Hariyali", price: 249, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Hariyali"), badges: ["veg"] },
      { id: "main-course-mushroom-hariyali", name: "Mushroom Hariyali", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Hariyali"), badges: ["veg"] },
      { id: "main-course-gobi-hariyali", name: "Gobi Hariyali", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Hariyali"), badges: ["veg"] },
      { id: "main-course-babycorn-hariyali", name: "Babycorn Hariyali", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Hariyali"), badges: ["veg"] },
      { id: "main-course-paneer-hyderabad-gravy", name: "Paneer Hyderabad Gravy", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Hyderabad Gravy"), badges: ["veg"] },
      { id: "main-course-mushroom-hyderabad-gravy", name: "Mushroom Hyderabad Gravy", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Hyderabad Gravy"), badges: ["veg"] },
      { id: "main-course-gobi-hyderabad-gravy", name: "Gobi Hyderabad Gravy", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Hyderabad Gravy"), badges: ["veg"] },
      { id: "main-course-babycorn-hyderabad-gravy", name: "Babycorn Hyderabad Gravy", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Hyderabad Gravy"), badges: ["veg"] },
      { id: "main-course-paneer-apoorvaa-special", name: "Paneer Apoorvaa Special", price: 270, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Apoorvaa Special"), badges: ["veg", "chef-choice", "bestseller"] },
      { id: "main-course-mushroom-apoorvaa-special", name: "Mushroom Apoorvaa Special", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Apoorvaa Special"), badges: ["veg"] },
      { id: "main-course-gobi-apoorvaa-special", name: "Gobi Apoorvaa Special", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Apoorvaa Special"), badges: ["veg"] },
      { id: "main-course-babycorn-apoorvaa-special", name: "Babycorn Apoorvaa Special", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Apoorvaa Special"), badges: ["veg"] },
      { id: "main-course-paneer-chettinad", name: "Paneer Chettinad", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Chettinad"), badges: ["veg", "spicy"] },
      { id: "main-course-mushroom-chettinad", name: "Mushroom Chettinad", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mushroom Chettinad"), badges: ["veg"] },
      { id: "main-course-gobi-chettinad", name: "Gobi Chettinad", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Gobi Chettinad"), badges: ["veg"] },
      { id: "main-course-babycorn-chettinad", name: "Babycorn Chettinad", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Babycorn Chettinad"), badges: ["veg"] },
      { id: "main-course-kadaai-paneer", name: "Kadaai Paneer", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Kadaai Paneer"), badges: ["veg", "bestseller"] },
      { id: "main-course-kadaai-mushroom", name: "Kadaai Mushroom", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Kadaai Mushroom"), badges: ["veg"] },
      { id: "main-course-kadaai-gobi", name: "Kadaai Gobi", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Kadaai Gobi"), badges: ["veg"] },
      { id: "main-course-kadaai-babycorn", name: "Kadaai Babycorn", price: 230, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Kadaai Babycorn"), badges: ["veg"] },
      { id: "main-course-kadaai-veg", name: "Kadaai Veg", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Kadaai Veg"), badges: ["veg"] },
      { id: "main-course-paneer-sizzler", name: "Paneer Sizzler", price: 280, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Paneer Sizzler"), badges: ["veg", "chef-choice"] },
      { id: "main-course-mughlai-paneer", name: "Mughlai Paneer", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mughlai Paneer"), badges: ["veg"] },
      { id: "main-course-mughlai-mushroom", name: "Mughlai Mushroom", price: 250, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mughlai Mushroom"), badges: ["veg"] },
      { id: "main-course-mughlai-gobi", name: "Mughlai Gobi", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mughlai Gobi"), badges: ["veg"] },
      { id: "main-course-mughlai-babycorn", name: "Mughlai Babycorn", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Mughlai Babycorn"), badges: ["veg"] },
      { id: "main-course-monika-paneer", name: "Monika Paneer", price: 270, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Monika Paneer"), badges: ["veg"] },
      { id: "main-course-monika-mushroom", name: "Monika Mushroom", price: 260, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Monika Mushroom"), badges: ["veg"] },
      { id: "main-course-monika-gobi", name: "Monika Gobi", price: 240, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Monika Gobi"), badges: ["veg"] },
      { id: "main-course-monika-babycorn", name: "Monika Babycorn", price: 220, category: "main-course", categoryName: "Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("main-course", "Monika Babycorn"), badges: ["veg"] },
    ],
  },

  // 12. TANDOORI ROTI (12:00 PM – 11:00 PM)
  {
    id: "tandoori-roti",
    name: "Tandoori Roti",
    heroImage: categoryHeroImages["tandoori-roti"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "tandoori-roti-plain", name: "Roti", price: 50, category: "tandoori-roti", categoryName: "Tandoori Roti", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-roti", "Roti"), badges: ["veg"] },
      { id: "tandoori-roti-butter", name: "Butter Roti", price: 69, category: "tandoori-roti", categoryName: "Tandoori Roti", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-roti", "Butter Roti"), badges: ["veg", "bestseller"] },
      { id: "tandoori-roti-garlic", name: "Garlic Roti", price: 69, category: "tandoori-roti", categoryName: "Tandoori Roti", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-roti", "Garlic Roti"), badges: ["veg"] },
      { id: "tandoori-roti-pulka-2pcs", name: "Pulka (2Pcs)", price: 69, category: "tandoori-roti", categoryName: "Tandoori Roti", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-roti", "Pulka (2Pcs)"), badges: ["veg"] },
    ],
  },

  // 13. TANDOORI, NAAN & KULCHA (12:00 PM – 11:00 PM)
  {
    id: "tandoori-naan-kulcha",
    name: "Tandoori, Naan & Kulcha",
    heroImage: categoryHeroImages["tandoori-naan-kulcha"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "naan-paneer-cheese", name: "Paneer Cheese Naan", price: 120, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Paneer Cheese Naan"), badges: ["veg", "chef-choice"] },
      { id: "naan-plain", name: "Naan", price: 59, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Naan"), badges: ["veg"] },
      { id: "naan-butter", name: "Butter Naan", price: 69, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Butter Naan"), badges: ["veg", "bestseller"] },
      { id: "naan-garlic", name: "Garlic Naan", price: 75, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Garlic Naan"), badges: ["veg"] },
      { id: "naan-stuffed", name: "Stuffed Naan", price: 95, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Stuffed Naan"), badges: ["veg"] },
      { id: "naan-kashmiri", name: "Kashmiri Naan", price: 75, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Kashmiri Naan"), badges: ["veg"] },
      { id: "naan-garlic-butter", name: "Garlic Butter Naan", price: 85, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Garlic Butter Naan"), badges: ["veg", "bestseller"] },
      { id: "kulcha-plain", name: "Kulcha", price: 75, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Kulcha"), badges: ["veg"] },
      { id: "kulcha-butter", name: "Butter Kulcha", price: 85, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Butter Kulcha"), badges: ["veg"] },
      { id: "kulcha-paneer", name: "Paneer Kulcha", price: 90, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Paneer Kulcha"), badges: ["veg", "bestseller"] },
      { id: "kulcha-stuffed", name: "Stuffed Kulcha", price: 95, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Stuffed Kulcha"), badges: ["veg"] },
      { id: "kulcha-garlic", name: "Garlic Kulcha", price: 85, category: "tandoori-naan-kulcha", categoryName: "Tandoori, Naan & Kulcha", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("tandoori-naan-kulcha", "Garlic Kulcha"), badges: ["veg"] },
    ],
  },

  // 14. RICE, PULAO & NOODLES (12:00 PM – 11:00 PM)
  {
    id: "rice-pulao-noodles",
    name: "Rice, Pulao & Noodles",
    heroImage: categoryHeroImages["rice-pulao-noodles"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "rpn-jeera-rice", name: "Jeera Rice", price: 200, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Jeera Rice"), badges: ["veg"] },
      { id: "rpn-ghee-rice", name: "Ghee Rice", price: 220, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Ghee Rice"), badges: ["veg", "bestseller"] },
      { id: "rpn-fried-rice", name: "Fried Rice", price: 190, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Fried Rice"), badges: ["veg"] },
      { id: "rpn-mushroom-fried-rice", name: "Mushroom Fried Rice", price: 240, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Mushroom Fried Rice"), badges: ["veg"] },
      { id: "rpn-paneer-fried-rice", name: "Paneer Fried Rice", price: 250, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Paneer Fried Rice"), badges: ["veg", "bestseller"] },
      { id: "rpn-mix-fried-rice", name: "Mix Fried Rice", price: 250, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Mix Fried Rice"), badges: ["veg"] },
      { id: "rpn-schezwan-fried-rice", name: "Schezwan Fried Rice", price: 220, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Schezwan Fried Rice"), badges: ["veg", "spicy"] },
      { id: "rpn-gobi-fried-rice", name: "Gobi Fried Rice", price: 230, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Gobi Fried Rice"), badges: ["veg"] },
      { id: "rpn-schezwan-paneer-fried-rice", name: "Schezwan Paneer Fried Rice", price: 260, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Schezwan Paneer Fried Rice"), badges: ["veg", "spicy"] },
      { id: "rpn-garlic-fried-rice", name: "Garlic Fried Rice", price: 230, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Garlic Fried Rice"), badges: ["veg"] },
      { id: "rpn-paneer-kaju-pulao", name: "Paneer Kaju Pulao", price: 270, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Paneer Kaju Pulao"), badges: ["veg", "chef-choice"] },
      { id: "rpn-cashew-pulao", name: "Cashew Pulao", price: 260, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Cashew Pulao"), badges: ["veg"] },
      { id: "rpn-green-peas-pulao", name: "Green Peas Pulao", price: 230, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Green Peas Pulao"), badges: ["veg"] },
      { id: "rpn-veg-pulao", name: "Veg Pulao", price: 240, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Veg Pulao"), badges: ["veg"] },
      { id: "rpn-jeera-pulao", name: "Jeera Pulao", price: 220, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Jeera Pulao"), badges: ["veg"] },
      { id: "rpn-mushroom-pulao", name: "Mushroom Pulao", price: 250, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Mushroom Pulao"), badges: ["veg"] },
      { id: "rpn-paneer-pulao", name: "Paneer Pulao", price: 260, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Paneer Pulao"), badges: ["veg"] },
      { id: "rpn-kashmiri-pulao", name: "Kashmiri Pulao", price: 270, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Kashmiri Pulao"), badges: ["veg"] },
      { id: "rpn-veg-noodles", name: "Veg Noodles", price: 190, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Veg Noodles"), badges: ["veg"] },
      { id: "rpn-mushroom-noodles", name: "Mushroom Noodles", price: 250, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Mushroom Noodles"), badges: ["veg"] },
      { id: "rpn-paneer-noodles", name: "Paneer Noodles", price: 260, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Paneer Noodles"), badges: ["veg", "bestseller"] },
      { id: "rpn-mix-noodles", name: "Mix Noodles", price: 250, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Mix Noodles"), badges: ["veg"] },
      { id: "rpn-schezwan-noodles", name: "Schezwan Noodles", price: 260, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "Schezwan Noodles"), badges: ["veg", "spicy"] },
      { id: "rpn-american-chop-suey", name: "American Chop Suey", price: 270, category: "rice-pulao-noodles", categoryName: "Rice, Pulao & Noodles", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("rice-pulao-noodles", "American Chop Suey"), badges: ["veg", "chef-choice"] },
    ],
  },

  // 15. INDIAN MAIN COURSE (12:00 PM – 11:00 PM)
  {
    id: "indian-main-course",
    name: "Indian Main Course",
    heroImage: categoryHeroImages["indian-main-course"],
    defaultMealPeriods: ["LUNCH", "DINNER"],
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    items: [
      { id: "imc-channa-masala", name: "Channa Masala", price: 145, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Channa Masala"), badges: ["veg", "bestseller"] },
      { id: "imc-green-peas-masala", name: "Green Peas Masala", price: 155, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Green Peas Masala"), badges: ["veg"] },
      { id: "imc-veg-kadaai", name: "Veg Kadaai", price: 190, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Veg Kadaai"), badges: ["veg"] },
      { id: "imc-peshawari-gravy", name: "Peshawari Gravy", price: 200, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Peshawari Gravy"), badges: ["veg", "chef-choice"] },
      { id: "imc-dal-fry", name: "Dal Fry", price: 175, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Dal Fry"), badges: ["veg"] },
      { id: "imc-thadka", name: "Thadka", price: 175, category: "indian-main-course", categoryName: "Indian Main Course", availabilityType: "TIME_SLOT", startTime: "12:00", endTime: "23:00", mealPeriods: ["LUNCH", "DINNER"], isVeg: true, image: getDishImage("indian-main-course", "Thadka"), badges: ["veg", "bestseller"] },
    ],
  },

  // 16. JUICE (8:00 AM – 11:00 PM)
  {
    id: "juice",
    name: "Juice",
    heroImage: categoryHeroImages["juice"],
    defaultMealPeriods: ["EVENING_SNACKS"],
    availabilityType: "TIME_SLOT",
    startTime: "08:00",
    endTime: "23:00",
    items: [
      { id: "juice-apple", name: "Apple Juice", price: 130, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Apple Juice"), badges: ["veg"] },
      { id: "juice-orange", name: "Orange Juice", price: 125, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Orange Juice"), badges: ["veg", "bestseller"] },
      { id: "juice-madhulai", name: "Madhulai Juice", price: 160, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Madhulai Juice"), badges: ["veg"] },
      { id: "juice-madhulai-pure", name: "Madhulai pure", price: 180, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Madhulai pure"), badges: ["veg", "chef-choice"] },
      { id: "juice-sathukudi", name: "Sathukudi Juice", price: 110, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Sathukudi Juice"), badges: ["veg"] },
      { id: "juice-grape", name: "Grape Juice", price: 99, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Grape Juice"), badges: ["veg"] },
      { id: "juice-lemon", name: "Lemon Juice", price: 70, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Lemon Juice"), badges: ["veg"] },
      { id: "juice-water-melon", name: "Water Melon", price: 85, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Water Melon"), badges: ["veg"] },
      { id: "juice-rose-milk", name: "Rose Milk", price: 90, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Rose Milk"), badges: ["veg", "bestseller"] },
      { id: "juice-badam-milk", name: "Badam milk", price: 100, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Badam milk"), badges: ["veg"] },
      { id: "juice-lime-soda-sweet-salt", name: "Lime soda sweet& Salt", price: 80, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Lime soda sweet& Salt"), badges: ["veg"] },
      { id: "juice-virgin-mojito", name: "Virgin Mojito", price: 110, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Virgin Mojito"), badges: ["veg", "bestseller"] },
      { id: "juice-blueberry", name: "Blueberry", price: 120, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Blueberry"), badges: ["veg"] },
      { id: "juice-blue-curacao", name: "Blue Curacao", price: 120, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Blue Curacao"), badges: ["veg"] },
      { id: "juice-lemon-mint", name: "Lemon Mint", price: 90, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Lemon Mint"), badges: ["veg"] },
      { id: "juice-butter-milk-masala", name: "Butter Milk (Masala)", price: 50, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Butter Milk (Masala)"), badges: ["veg"] },
      { id: "juice-lassi", name: "Lassi", price: 80, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Lassi"), badges: ["veg", "bestseller"] },
      { id: "juice-pine-apple", name: "Pine Apple", price: 120, category: "juice", categoryName: "Juice", availabilityType: "TIME_SLOT", startTime: "08:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("juice", "Pine Apple"), badges: ["veg"] },
    ],
  },

  // 17. CHAAT (3:00 PM – 11:00 PM)
  {
    id: "chaat",
    name: "Chaat",
    heroImage: categoryHeroImages["chaat"],
    defaultMealPeriods: ["EVENING_SNACKS"],
    availabilityType: "TIME_SLOT",
    startTime: "15:00",
    endTime: "23:00",
    items: [
      { id: "chaat-cheese-pav-bhaji", name: "Cheese Pav Bhaji", price: 120, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Cheese Pav Bhaji"), badges: ["veg", "bestseller"] },
      { id: "chaat-panner-pav-bhaji", name: "Panner Pav Bhaji", price: 120, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Panner Pav Bhaji"), badges: ["veg"] },
      { id: "chaat-mushroom-pav-bhaji", name: "Mushroom Pav Bhaji", price: 120, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Mushroom Pav Bhaji"), badges: ["veg"] },
      { id: "chaat-pav-bhaji", name: "Pav Bhaji", price: 100, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Pav Bhaji"), badges: ["veg", "bestseller"] },
      { id: "chaat-bhel-poori", name: "Bhel Poori", price: 80, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Bhel Poori"), badges: ["veg"] },
      { id: "chaat-masala-poori", name: "Masala Poori", price: 80, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Masala Poori"), badges: ["veg", "bestseller"] },
      { id: "chaat-dahi-poori", name: "Dahi Poori", price: 85, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Dahi Poori"), badges: ["veg"] },
      { id: "chaat-pani-poori", name: "Pani Poori", price: 70, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Pani Poori"), badges: ["veg", "bestseller"] },
      { id: "chaat-onion-samosa-2pcs", name: "Onion Samosa - 2 Pcs", price: 50, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Onion Samosa - 2 Pcs"), badges: ["veg"] },
      { id: "chaat-aloo-samosa-2pcs", name: "Aloo Samosa - 2 Pcs", price: 60, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Aloo Samosa - 2 Pcs"), badges: ["veg", "bestseller"] },
      { id: "chaat-kachori", name: "Kachori", price: 80, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Kachori"), badges: ["veg"] },
      { id: "chaat-sev-poori", name: "Sev poori", price: 80, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Sev poori"), badges: ["veg"] },
      { id: "chaat-papdi-chats", name: "Papdi chats", price: 80, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Papdi chats"), badges: ["veg"] },
      { id: "chaat-chenna-samosa", name: "Chenna Samosa", price: 100, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Chenna Samosa"), badges: ["veg", "chef-choice"] },
      { id: "chaat-chenna-masala", name: "Chenna Masala", price: 90, category: "chaat", categoryName: "Chaat", availabilityType: "TIME_SLOT", startTime: "15:00", endTime: "23:00", mealPeriods: ["EVENING_SNACKS"], isVeg: true, image: getDishImage("chaat", "Chenna Masala"), badges: ["veg"] },
    ],
  },

  // 18. KIDS SPECIAL (Always available)
  {
    id: "kids-special",
    name: "Kids Special",
    heroImage: categoryHeroImages["kids-special"],
    defaultMealPeriods: ["EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "kids-french-fries-veg-mayonnaise", name: "French Fries (veg Mayonnaise)", price: 120, category: "kids-special", categoryName: "Kids Special", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("kids-special", "French Fries (veg Mayonnaise)"), badges: ["veg", "bestseller"] },
      { id: "kids-veg-nuggets-t-sauce", name: "Veg Nuggets (T sauce)", price: 80, category: "kids-special", categoryName: "Kids Special", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("kids-special", "Veg Nuggets (T sauce)"), badges: ["veg"] },
      { id: "kids-smileys-t-sauce", name: "Smileys (T sauce)", price: 90, category: "kids-special", categoryName: "Kids Special", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("kids-special", "Smileys (T sauce)"), badges: ["veg", "bestseller"] },
      { id: "kids-cutlet-t-sauce-two-pcs", name: "Cutlet (T sauce) two pcs", price: 60, category: "kids-special", categoryName: "Kids Special", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("kids-special", "Cutlet (T sauce) two pcs"), badges: ["veg"] },
      { id: "kids-veg-spring-roll-t-sauce", name: "Veg Spring Roll (T sauce)", price: 130, category: "kids-special", categoryName: "Kids Special", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("kids-special", "Veg Spring Roll (T sauce)"), badges: ["veg", "chef-choice"] },
    ],
  },

  // 19. SANDWICH (Always available)
  {
    id: "sandwich",
    name: "Sandwich",
    heroImage: categoryHeroImages["sandwich"],
    defaultMealPeriods: ["EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "sandwich-corn", name: "Corn Sandwich", price: 95, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Corn Sandwich"), badges: ["veg"] },
      { id: "sandwich-paneer", name: "Paneer Sandwich", price: 100, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Paneer Sandwich"), badges: ["veg", "bestseller"] },
      { id: "sandwich-mushroom", name: "Mushroom Sandwich", price: 95, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Mushroom Sandwich"), badges: ["veg"] },
      { id: "sandwich-cheese", name: "Cheese Sandwich", price: 100, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Cheese Sandwich"), badges: ["veg", "bestseller"] },
      { id: "sandwich-classic-veg", name: "Classic Veg Sandwich", price: 90, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Classic Veg Sandwich"), badges: ["veg"] },
      { id: "sandwich-veg-club", name: "Veg club Sandwich", price: 95, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Veg club Sandwich"), badges: ["veg", "chef-choice"] },
      { id: "sandwich-veg-burger", name: "Veg Burger", price: 100, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Veg Burger"), badges: ["veg", "bestseller"] },
      { id: "sandwich-fried-momos", name: "Fried Momos", price: 120, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Fried Momos"), badges: ["veg"] },
      { id: "sandwich-paneer-momos", name: "Paneer Momos", price: 150, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Paneer Momos"), badges: ["veg", "bestseller"] },
      { id: "sandwich-mushroom-momos", name: "Mushroom Momos", price: 140, category: "sandwich", categoryName: "Sandwich", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("sandwich", "Mushroom Momos"), badges: ["veg"] },
    ],
  },

  // 20. APOORVAA SPECIAL - PASTA (Always available)
  {
    id: "apoorvaa-special-pasta",
    name: "Apoorvaa Special - Pasta",
    heroImage: categoryHeroImages["apoorvaa-special-pasta"],
    defaultMealPeriods: ["EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "pasta-classic-mac-and-cheese", name: "Classic Mac and Cheese", price: 270, category: "apoorvaa-special-pasta", categoryName: "Apoorvaa Special - Pasta", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("apoorvaa-special-pasta", "Classic Mac and Cheese"), badges: ["veg", "bestseller"] },
      { id: "pasta-penne-arrabbiata-tomato", name: "Penne arrabbiata (Tomato)", price: 270, category: "apoorvaa-special-pasta", categoryName: "Apoorvaa Special - Pasta", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("apoorvaa-special-pasta", "Penne arrabbiata (Tomato)"), badges: ["veg"] },
      { id: "pasta-chef-spl-spaghetti", name: "Chef Spl Spaghetti Pasta", price: 280, category: "apoorvaa-special-pasta", categoryName: "Apoorvaa Special - Pasta", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("apoorvaa-special-pasta", "Chef Spl Spaghetti Pasta"), badges: ["veg", "chef-choice"] },
      { id: "pasta-maggie-noodles-apo-spl", name: "Maggie Noodles (Apo Spl)", price: 130, category: "apoorvaa-special-pasta", categoryName: "Apoorvaa Special - Pasta", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("apoorvaa-special-pasta", "Maggie Noodles (Apo Spl)"), badges: ["veg"] },
      { id: "pasta-plain-maggie", name: "Plain Maggie", price: 65, category: "apoorvaa-special-pasta", categoryName: "Apoorvaa Special - Pasta", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("apoorvaa-special-pasta", "Plain Maggie"), badges: ["veg"] },
    ],
  },

  // 21. BEVERAGES (Always available)
  {
    id: "beverages",
    name: "Beverages",
    heroImage: categoryHeroImages["beverages"],
    defaultMealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "bev-filter-coffee", name: "Filter coffee", price: 45, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Filter coffee"), badges: ["veg", "bestseller"] },
      { id: "bev-tea", name: "Tea", price: 40, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Tea"), badges: ["veg"] },
      { id: "bev-masala-tea", name: "Masala Tea", price: 45, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Masala Tea"), badges: ["veg", "bestseller"] },
      { id: "bev-ginger-tea", name: "Ginger Tea", price: 50, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Ginger Tea"), badges: ["veg"] },
      { id: "bev-green-tea", name: "Green Tea", price: 40, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Green Tea"), badges: ["veg"] },
      { id: "bev-lemon-with-mint-tea", name: "Lemon with Mint tea", price: 40, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Lemon with Mint tea"), badges: ["veg"] },
      { id: "bev-black-tea", name: "Black Tea", price: 25, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Black Tea"), badges: ["veg"] },
      { id: "bev-black-coffee", name: "Black coffee", price: 30, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Black coffee"), badges: ["veg"] },
      { id: "bev-panan-kalkandu-milk", name: "Panan Kalkandu Milk", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Panan Kalkandu Milk"), badges: ["veg"] },
      { id: "bev-sukku-paal", name: "Sukku paal", price: 55, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Sukku paal"), badges: ["veg"] },
      { id: "bev-hot-badam-milk", name: "Hot Badam Milk", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Hot Badam Milk"), badges: ["veg", "chef-choice"] },
      { id: "bev-badam-kheer", name: "Badam kheer", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Badam kheer"), badges: ["veg"] },
      { id: "bev-horlicks", name: "Horlicks", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Horlicks"), badges: ["veg"] },
      { id: "bev-boost", name: "Boost", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Boost"), badges: ["veg"] },
      { id: "bev-ragi-malt", name: "Ragi malt", price: 60, category: "beverages", categoryName: "Beverages", availabilityType: "ALWAYS", mealPeriods: ["BREAKFAST", "EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("beverages", "Ragi malt"), badges: ["veg"] },
    ],
  },

  // 22. SNACKS (Always available)
  {
    id: "snacks",
    name: "Snacks",
    heroImage: categoryHeroImages["snacks"],
    defaultMealPeriods: ["EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "snacks-vazhaikkai-baji", name: "Vazhaikkai Baji", price: 65, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Vazhaikkai Baji"), badges: ["veg", "bestseller"] },
      { id: "snacks-onion-baji", name: "Onion Baji", price: 65, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Onion Baji"), badges: ["veg"] },
      { id: "snacks-milagai-baji", name: "Milagai Baji", price: 65, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Milagai Baji"), badges: ["veg", "spicy"] },
      { id: "snacks-paruppu-vada", name: "Paruppu Vada", price: 60, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Paruppu Vada"), badges: ["veg"] },
      { id: "snacks-bonda", name: "Bonda", price: 60, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Bonda"), badges: ["veg"] },
      { id: "snacks-masal-bonda", name: "Masal Bonda", price: 60, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Masal Bonda"), badges: ["veg", "bestseller"] },
      { id: "snacks-arisi-bonda", name: "Arisi Bonda", price: 60, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Arisi Bonda"), badges: ["veg"] },
      { id: "snacks-pasiparuppu-bonda", name: "Pasiparuppu Bonda", price: 55, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Pasiparuppu Bonda"), badges: ["veg"] },
      { id: "snacks-sundal-payir", name: "Sundal / Payir", price: 45, category: "snacks", categoryName: "Snacks", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("snacks", "Sundal / Payir"), badges: ["veg"] },
    ],
  },

  // 23. ICE CREAMS & MILK SHAKE (Always available)
  {
    id: "ice-creams-milk-shake",
    name: "Ice Creams & Milk Shake",
    heroImage: categoryHeroImages["ice-creams-milk-shake"],
    defaultMealPeriods: ["EVENING_SNACKS", "ALL_DAY"],
    availabilityType: "ALWAYS",
    items: [
      { id: "icms-kulfi", name: "Kulfi", price: 100, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Kulfi"), badges: ["veg", "bestseller"] },
      { id: "icms-chocolate-milk-shake", name: "Chocolate Milk Shake", price: 170, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Chocolate Milk Shake"), badges: ["veg"] },
      { id: "icms-butterscotch-milk-shake", name: "Butterscotch Milk Shake", price: 175, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Butterscotch Milk Shake"), badges: ["veg", "chef-choice"] },
      { id: "icms-pista-milk-shake", name: "Pista Milk shake", price: 170, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Pista Milk shake"), badges: ["veg"] },
      { id: "icms-strawberry-milk-shake", name: "Strawberry Milk shake", price: 160, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Strawberry Milk shake"), badges: ["veg"] },
      { id: "icms-venilla-milk-shake", name: "Venilla Milk shake", price: 160, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Venilla Milk shake"), badges: ["veg"] },
      { id: "icms-mango-milk-shake", name: "Mango Milk shake", price: 170, category: "ice-creams-milk-shake", categoryName: "Ice Creams & Milk Shake", availabilityType: "ALWAYS", mealPeriods: ["EVENING_SNACKS", "ALL_DAY"], isVeg: true, image: getDishImage("ice-creams-milk-shake", "Mango Milk shake"), badges: ["veg", "bestseller"] },
    ],
  },
];

// Flat canonical list of all products (exactly 306 items)
export const allMenuItems: MenuItem[] = menuData.flatMap((cat) => cat.items);

// Featured Signature Chef Specials for Home Banner Slider
export const bestSellingItems: MenuItem[] = [
  {
    id: "dosa-apoorvaa-special-roast",
    name: "Apoorvaa Special Roast",
    price: 199,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 520,
    category: "dosa",
    categoryName: "Dosa",
    availabilityType: "ALWAYS",
    mealPeriods: ["BREAKFAST", "ALL_DAY"],
    isVeg: true,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop",
    badges: ["veg", "bestseller", "chef-choice"],
  },
  {
    id: "meals-special-unlimited",
    name: "Special Meals - Unlimited",
    price: 270,
    originalPrice: 340,
    rating: 4.9,
    reviewsCount: 780,
    category: "meals",
    categoryName: "Meals",
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "15:30",
    mealPeriods: ["LUNCH"],
    isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop",
    badges: ["veg", "bestseller"],
  },
  {
    id: "tandoori-starters-paneer-tikka",
    name: "Paneer Tikka Grill",
    price: 249,
    originalPrice: 310,
    rating: 4.8,
    reviewsCount: 460,
    category: "tandoori-starters",
    categoryName: "Tandoori Starters",
    availabilityType: "TIME_SLOT",
    startTime: "12:00",
    endTime: "23:00",
    mealPeriods: ["LUNCH", "DINNER"],
    isVeg: true,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop",
    badges: ["veg", "chef-choice"],
  },
  {
    id: "tiffin-ghee-podi-idly",
    name: "Ghee Podi Idli",
    price: 109,
    originalPrice: 145,
    rating: 4.9,
    reviewsCount: 630,
    category: "tiffin",
    categoryName: "Tiffin",
    availabilityType: "ALWAYS",
    mealPeriods: ["BREAKFAST", "ALL_DAY"],
    isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    badges: ["veg", "bestseller"],
  },
];
