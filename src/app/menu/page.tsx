"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import HeroBanner from "@/components/Home/HeroBanner";
import CategoryListView from "@/components/Menu/CategoryListView";
import MenuItemCard from "@/components/Menu/MenuItemCard";
import { useMenuData } from "@/context/MenuDataContext";
import {
  MEAL_PERIOD_CONFIGS,
  MealPeriod,
  getAvailabilityDisplay,
  isMealPeriodMatch,
} from "@/data/mealPeriods";
import { cn } from "@/lib/utils";

function MenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { menuData } = useMenuData();
  const mealParam = (searchParams.get("meal")?.toUpperCase() as MealPeriod) || "BREAKFAST";
  const categoryParam = searchParams.get("category");

  const [activeMeal, setActiveMeal] = useState<MealPeriod>(
    MEAL_PERIOD_CONFIGS.some((m) => m.id === mealParam) ? mealParam : "BREAKFAST"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mealParam && MEAL_PERIOD_CONFIGS.some((m) => m.id === mealParam)) {
      setActiveMeal(mealParam);
    }
  }, [mealParam]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategoryId(categoryParam);
    } else {
      setSelectedCategoryId(null);
    }
  }, [categoryParam]);

  const handleMealChange = (m: MealPeriod) => {
    setActiveMeal(m);
    setSelectedCategoryId(null);
    setSearchQuery("");
    router.push(`/menu?meal=${m.toLowerCase()}`, { scroll: false });
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryId(catId);
    router.push(`/menu?meal=${activeMeal.toLowerCase()}&category=${catId}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    router.push(`/menu?meal=${activeMeal.toLowerCase()}`, { scroll: false });
  };

  // Active meal period config
  const activeMealConfig = useMemo(() => {
    return MEAL_PERIOD_CONFIGS.find((m) => m.id === activeMeal) || MEAL_PERIOD_CONFIGS[0];
  }, [activeMeal]);

  // Categories available under the current active meal period
  const availableCategoriesForMeal = useMemo(() => {
    return menuData
      .map((cat) => {
        const matchingItems = cat.items.filter((item) => {
          return isMealPeriodMatch(item.mealPeriods, activeMeal);
        });

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [activeMeal, menuData]);

  // Active category object
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategoryId) return null;
    return availableCategoriesForMeal.find(
      (c) => c.id.toLowerCase() === selectedCategoryId.toLowerCase()
    );
  }, [availableCategoriesForMeal, selectedCategoryId]);

  // Search results
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return availableCategoriesForMeal.flatMap((cat) => {
      const isCatMatch = cat.name.toLowerCase().includes(query);
      return cat.items.filter(
        (item) => isCatMatch || item.name.toLowerCase().includes(query)
      );
    });
  }, [availableCategoriesForMeal, searchQuery]);

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Hero Section with Search, Specials & 4 Meal Tabs */}
      <HeroBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeMeal={activeMeal}
        onMealChange={handleMealChange}
      />

      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-3.5 sm:px-4 mt-3">
        {/* CASE 1: Active Search Results View */}
        {searchQuery.trim() ? (
          <section className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-foreground">
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-primary hover:underline"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {searchResults.map((item, idx) => {
                  const avail = getAvailabilityDisplay(item, currentTime);
                  return (
                    <MenuItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      originalPrice={item.originalPrice}
                      categoryName={item.categoryName}
                      isVeg={item.isVeg}
                      badges={item.badges}
                      image={item.image}
                      isAvailable={avail.isAvailable}
                      availabilityText={avail.statusText}
                      timingLabel={avail.timingLabel}
                      index={idx}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 px-4 border border-dashed border-border/60 rounded-3xl bg-card/40 my-6">
                <p className="text-sm font-semibold text-muted-foreground">
                  No dishes found matching &quot;{searchQuery}&quot; in {activeMealConfig.label}.
                </p>
              </div>
            )}
          </section>
        ) : selectedCategoryId && activeCategoryObj ? (
          /* CASE 2: LEVEL 3 - Selected Category Products View */
          <section className="py-2">
            {/* Top Back to Categories Navigation Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60">
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs transition-colors cursor-pointer border border-amber-500/30"
              >
                <ArrowLeft size={14} />
                <span>Back to {activeMealConfig.label} Categories</span>
              </button>

              {activeCategoryObj.startTime && activeCategoryObj.endTime && (
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Clock size={11} /> {activeCategoryObj.startTime} – {activeCategoryObj.endTime}
                </span>
              )}
            </div>

            {/* Category Title & Count */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {activeMealConfig.label} Menu
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                  {activeCategoryObj.name}
                </h2>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {activeCategoryObj.items.length} dishes
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {activeCategoryObj.items.map((item, idx) => {
                const avail = getAvailabilityDisplay(item, currentTime);
                return (
                  <MenuItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    categoryName={activeCategoryObj.name}
                    isVeg={item.isVeg}
                    badges={item.badges}
                    image={item.image}
                    isAvailable={avail.isAvailable}
                    availabilityText={avail.statusText}
                    timingLabel={avail.timingLabel}
                    index={idx}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          /* CASE 3: LEVEL 2 - Meal Categories Cards View (As sketched by user) */
          <section className="py-2">
            <CategoryListView
              categories={availableCategoriesForMeal}
              onSelectCategory={handleCategorySelect}
              mealLabel={activeMealConfig.label}
            />
          </section>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted-foreground">
          Loading Hotel Apoorvaa Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
