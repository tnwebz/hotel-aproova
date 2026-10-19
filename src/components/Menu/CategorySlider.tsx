"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { menuData } from "@/data/menu";
import { MealPeriod, MEAL_PERIOD_CONFIGS, isMealPeriodMatch } from "@/data/mealPeriods";
import { Utensils, ChevronLeft, ChevronRight } from "lucide-react";

interface CategorySliderProps {
  activeMeal?: MealPeriod;
}

export default function CategorySlider({ activeMeal = "LUNCH" }: CategorySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Filter categories that have items in the active meal period
  const displayedCategories = menuData
    .map((cat) => {
      const items = cat.items.filter((item) => {
        return isMealPeriodMatch(item.mealPeriods, activeMeal);
      });
      return {
        ...cat,
        items,
      };
    })
    .filter((cat) => cat.items.length > 0);

  const mealConfig =
    MEAL_PERIOD_CONFIGS.find((m) => m.id === activeMeal) || MEAL_PERIOD_CONFIGS[0];

  // Auto-slide categories every 2.8s
  useEffect(() => {
    if (isPaused || displayedCategories.length <= 2) return;

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const cardWidth = 172; // Card width (160px) + gap (12px)
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused, displayedCategories.length]);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-5">
      <div className="px-1 mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
            Explore Categories
          </h2>
          <span className="text-xs font-bold text-amber-700 bg-amber-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {mealConfig.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Previous / Next Arrow buttons for categories */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll("left")}
              className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll categories left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll categories right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <Link
            href={`/menu?meal=${activeMeal.toLowerCase()}`}
            className="text-xs sm:text-sm font-bold text-primary hover:underline ml-1"
          >
            View Full Menu →
          </Link>
        </div>
      </div>

      {displayedCategories.length > 0 ? (
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex overflow-x-auto gap-3 pb-3 snap-x snap-mandatory scrollbar-hide w-full scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayedCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/menu?meal=${activeMeal.toLowerCase()}&category=${category.id}`}
              className="group shrink-0"
            >
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.35 }}
                className="relative w-40 h-32 rounded-2xl overflow-hidden snap-center border border-border/60 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all p-3.5 flex flex-col justify-between group"
              >
                {/* Background image */}
                {category.heroImage && (
                  <Image
                    src={category.heroImage}
                    alt={category.name}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

                <div className="relative z-10 w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-amber-300 flex items-center justify-center font-bold">
                  <Utensils size={14} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-white font-heading font-bold text-sm line-clamp-1 group-hover:text-amber-300 transition-colors drop-shadow-sm">
                    {category.name}
                  </h3>
                  <span className="text-amber-200/90 text-[11px] font-semibold">
                    {category.items.length} items
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl">
          No categories found for {mealConfig.label}.
        </div>
      )}
    </section>
  );
}
