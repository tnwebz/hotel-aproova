"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Utensils } from "lucide-react";
import { MenuCategory } from "@/data/menu";

interface CategoryListViewProps {
  categories: MenuCategory[];
  onSelectCategory: (categoryId: string) => void;
  mealLabel: string;
}

export default function CategoryListView({
  categories,
  onSelectCategory,
  mealLabel,
}: CategoryListViewProps) {
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <h2 className="text-base sm:text-lg font-heading font-extrabold text-foreground">
          {mealLabel} Categories
        </h2>
        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
          {categories.length} {categories.length === 1 ? "Category" : "Categories"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.25) }}
            className="group relative w-full h-22 sm:h-24 md:h-26 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#EADBCE]/85 shadow-[0_8px_24px_-4px_rgba(40,30,20,0.08),0_2px_6px_-1px_rgba(40,30,20,0.04)] hover:shadow-[0_18px_36px_-6px_rgba(40,30,20,0.14),0_4px_14px_rgba(217,119,6,0.12)] hover:-translate-y-1 hover:border-amber-500/50 transition-all duration-300 text-left p-3.5 sm:p-4 flex items-center justify-between cursor-pointer before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-white before:via-white/60 before:to-transparent before:z-10"
          >
            {/* Right Half: Clear & Vibrant Food Background Image (Increased size, subtle edge fade) */}
            {category.heroImage && (
              <div className="absolute right-0 top-0 bottom-0 w-[58%] sm:w-[56%] h-full overflow-hidden pointer-events-none">
                <Image
                  src={category.heroImage}
                  alt={category.name}
                  fill
                  priority={index < 4}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  sizes="(max-width: 640px) 60vw, 350px"
                />
                {/* Horizontal Gradient: Gentle soft feather on left edge only */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] from-0% via-[#FAF6F0]/25 via-18% to-transparent to-45%" />
              </div>
            )}

            {/* Left Half: Category Info (Deep charcoal & rich amber typography) */}
            <div className="relative z-10 flex items-center gap-3 max-w-[50%] sm:max-w-[52%]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 backdrop-blur-xs border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold shrink-0 shadow-xs group-hover:bg-amber-500 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                <Utensils size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-extrabold text-sm sm:text-base md:text-lg text-zinc-900 group-hover:text-amber-700 transition-colors leading-tight line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-amber-700 font-bold mt-0.5 tracking-wide">
                  {category.items.length} {category.items.length === 1 ? "dish" : "dishes"}
                </p>
              </div>
            </div>

            {/* Right Arrow Button (Floating glass pill) */}
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#EADBCE] text-stone-700 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shrink-0 shadow-[0_2px_8px_rgba(40,30,20,0.08)]">
              <ArrowRight size={15} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
