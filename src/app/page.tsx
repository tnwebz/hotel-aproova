"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import SplashScreen from "@/components/SplashScreen";
import MealEntryModal from "@/components/MealEntryModal";
import BottomNav from "@/components/BottomNav";
import HeroBanner from "@/components/Home/HeroBanner";
import CategoryListView from "@/components/Menu/CategoryListView";
import MenuItemCard from "@/components/Menu/MenuItemCard";
import { useMenuData } from "@/context/MenuDataContext";
import {
  MealPeriod,
  MEAL_PERIOD_CONFIGS,
  getAvailabilityDisplay,
  getKolkataDate,
} from "@/data/mealPeriods";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { menuData } = useMenuData();
  const urlMeal = searchParams.get("meal")?.toUpperCase() as MealPeriod;
  const urlCategory = searchParams.get("category");

  const [showSplash, setShowSplash] = useState(true);
  const [showMealModal, setShowMealModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMeal, setActiveMeal] = useState<MealPeriod>("BREAKFAST");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Check local Kolkata restaurant time to auto-set default meal
    const kDate = getKolkataDate();
    const hour = kDate.getHours();

    let defaultM: MealPeriod = "LUNCH";
    if (hour >= 6 && hour < 12) {
      defaultM = "BREAKFAST";
    } else if (hour >= 12 && hour < 15) {
      defaultM = "LUNCH";
    } else if (hour >= 15 && hour < 18) {
      defaultM = "EVENING_SNACKS";
    } else {
      defaultM = "DINNER";
    }

    if (urlMeal && MEAL_PERIOD_CONFIGS.some((m) => m.id === urlMeal)) {
      setActiveMeal(urlMeal);
    } else {
      setActiveMeal(defaultM);
    }

    if (urlCategory) {
      setSelectedCategoryId(urlCategory);
    }

    const hasSeenSplash = sessionStorage.getItem("hotel_menu_splash");
    if (hasSeenSplash) {
      setShowSplash(false);
      const hasChosenMeal = sessionStorage.getItem("hotel_menu_meal_selected");
      if (!hasChosenMeal && !urlMeal) {
        setShowMealModal(true);
      }
    }

    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, [urlMeal, urlCategory]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hotel_menu_splash", "true");
    const hasChosenMeal = sessionStorage.getItem("hotel_menu_meal_selected");
    if (!hasChosenMeal && !urlMeal) {
      setShowMealModal(true);
    }
  };

  const handleSelectMeal = (mealParam: string) => {
    sessionStorage.setItem("hotel_menu_meal_selected", "true");
    setShowMealModal(false);
    const upperMeal = mealParam.toUpperCase() as MealPeriod;
    if (MEAL_PERIOD_CONFIGS.some((m) => m.id === upperMeal)) {
      setActiveMeal(upperMeal);
      setSelectedCategoryId(null);
    }
  };

  const handleMealChange = (m: MealPeriod) => {
    setActiveMeal(m);
    setSelectedCategoryId(null);
    setSearchQuery("");
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryId(catId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Active meal period configuration
  const activeMealConfig = useMemo(() => {
    return (
      MEAL_PERIOD_CONFIGS.find((m) => m.id === activeMeal) ||
      MEAL_PERIOD_CONFIGS[0]
    );
  }, [activeMeal]);

  // Categories under the active meal period
  const currentMealCategories = useMemo(() => {
    return menuData
      .map((cat) => {
        const items = cat.items.filter((item) => {
          return item.mealPeriods.includes(activeMeal);
        });
        return {
          ...cat,
          items,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [activeMeal]);

  // Selected category object
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategoryId) return null;
    return currentMealCategories.find(
      (c) => c.id.toLowerCase() === selectedCategoryId.toLowerCase()
    );
  }, [currentMealCategories, selectedCategoryId]);

  // Global search matching across active meal items
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return currentMealCategories.flatMap((cat) => {
      const isCatMatch = cat.name.toLowerCase().includes(q);
      return cat.items.filter(
        (item) => isCatMatch || item.name.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, currentMealCategories]);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Interactive Entry Meal Selection Modal */}
      <MealEntryModal
        isOpen={showMealModal}
        onClose={() => setShowMealModal(false)}
        onSelectMeal={handleSelectMeal}
      />

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
                      index={idx}
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
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 px-4 border border-dashed border-border/60 rounded-3xl bg-card/40">
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
                onClick={() => setSelectedCategoryId(null)}
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

            {/* Products 2-Column Side-by-Side Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {activeCategoryObj.items.map((item, idx) => {
                const avail = getAvailabilityDisplay(item, currentTime);
                return (
                  <MenuItemCard
                    key={item.id}
                    id={item.id}
                    index={idx}
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
                  />
                );
              })}
            </div>
          </section>
        ) : (
          /* CASE 3: LEVEL 2 - Meal Categories Cards View (As sketched by user) */
          <section className="py-2">
            <CategoryListView
              categories={currentMealCategories}
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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted-foreground">
          Loading Hotel Apoorvaa...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
