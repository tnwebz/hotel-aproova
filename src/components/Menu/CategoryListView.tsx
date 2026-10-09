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
            className="group relative w-full h-22 sm:h-26 rounded-2xl overflow-hidden border border-border/70 shadow-xs hover:shadow-md hover:border-amber-500/60 transition-all duration-300 text-left p-3.5 sm:p-4 flex items-center justify-between cursor-pointer"
          >
            {/* Background Thumbnail with Gradient */}
            {category.heroImage && (
              <Image
                src={category.heroImage}
                alt={category.name}
                fill
                priority={index < 4}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45 group-hover:from-black/95 transition-colors" />

            {/* Left Category Info */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Utensils size={18} />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors drop-shadow-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-amber-200/85 font-semibold mt-0.5">
                  {category.items.length} {category.items.length === 1 ? "dish" : "dishes"}
                </p>
              </div>
            </div>

            {/* Right Arrow Button */}
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-white text-white/90 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shrink-0">
              <ArrowRight size={16} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
