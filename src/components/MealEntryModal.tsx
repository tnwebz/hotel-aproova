"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sunrise,
  UtensilsCrossed,
  Coffee,
  MoonStar,
  Clock,
  ArrowRight,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MealEntryOption {
  id: string;
  name: string;
  sub: string;
  time: string;
  Icon: LucideIcon;
  param: string;
  itemsCount: number;
}

const ENTRY_MEAL_OPTIONS: MealEntryOption[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    sub: "Idly, Dosa, Roast, Poori & Hot Filter Coffee",
    time: "Opening – 11:59 AM",
    Icon: Sunrise,
    param: "breakfast",
    itemsCount: 52,
  },
  {
    id: "lunch",
    name: "Lunch",
    sub: "Traditional South Indian Meals, Biryani & Curries",
    time: "12:00 PM – 3:30 PM",
    Icon: UtensilsCrossed,
    param: "lunch",
    itemsCount: 168,
  },
  {
    id: "evening_snacks",
    name: "Snacks & Juice",
    sub: "Chaat, Sandwiches, Pasta, Shakes & Fresh Juices",
    time: "3:00 PM – 6:00 PM",
    Icon: Coffee,
    param: "evening_snacks",
    itemsCount: 86,
  },
  {
    id: "dinner",
    name: "Dinner",
    sub: "Tandoori, Naan, Rotis, Paneer Gravies & Dosas",
    time: "6:00 PM – 11:00 PM",
    Icon: MoonStar,
    param: "dinner",
    itemsCount: 172,
  },
];

interface MealEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (mealParam: string) => void;
}

export default function MealEntryModal({ isOpen, onClose, onSelectMeal }: MealEntryModalProps) {
  // Determine which meal is currently being served in Hotel Apoorvaa timezone (Asia/Kolkata)
  const currentLiveMeal = useMemo(() => {
    try {
      const kDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const mins = kDate.getHours() * 60 + kDate.getMinutes();
      if (mins < 12 * 60) return "breakfast";
      if (mins >= 12 * 60 && mins < 15 * 60 + 30) return "lunch";
      if (mins >= 15 * 60 + 30 && mins < 18 * 60) return "evening_snacks";
      if (mins >= 18 * 60 && mins <= 23 * 60) return "dinner";
      return "breakfast";
    } catch {
      return "lunch";
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-stone-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.15)] overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="relative bg-slate-950 px-5 pt-6 pb-5 text-white overflow-hidden">
            <Image
              src="/hero2.jpg"
              alt="Hotel Apoorvaa"
              fill
              className="object-cover opacity-35 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer z-20 backdrop-blur-xs"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/logo2.png"
                  alt="Hotel Apoorvaa Logo"
                  width={42}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-xl text-white tracking-tight drop-shadow-xs">
                    Welcome to Hotel Apoorvaa
                  </h2>
                </div>
                <p className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Please select your dining preference
                </p>
              </div>
            </div>
          </div>

          {/* 3D Floating Meal Options Grid */}
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ENTRY_MEAL_OPTIONS.map((opt) => {
                const IconComponent = opt.Icon;
                const isLive = opt.id === currentLiveMeal;

                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => onSelectMeal(opt.param)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={cn(
                      "group relative flex flex-col justify-between text-left p-4 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300",
                      "bg-white shadow-[0_8px_20px_-4px_rgba(40,30,20,0.08),0_2px_6px_-1px_rgba(40,30,20,0.03)]",
                      "hover:shadow-[0_18px_36px_-6px_rgba(217,119,6,0.18),0_4px_12px_rgba(0,0,0,0.06)] hover:border-amber-500/70",
                      "before:absolute before:inset-x-0 before:top-0 before:h-[1.5px] before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:z-10",
                      isLive
                        ? "border-2 border-amber-400/90 ring-3 ring-amber-400/15 bg-gradient-to-b from-amber-50/40 to-white"
                        : "border border-stone-200/90"
                    )}
                  >
                    {/* Top Row: Professional Bold Icon + Time Pill / Live Indicator */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/25 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-amber-500 group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                        <IconComponent className="w-5 h-5 stroke-[2.4]" />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {isLive && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Serving Now
                          </span>
                        )}
                        <span className="text-[10px] sm:text-[11px] font-bold text-amber-900/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <Clock size={10} className="text-amber-600 shrink-0" />
                          {opt.time}
                        </span>
                      </div>
                    </div>

                    {/* Content Section: Title, Description, and Hover Arrow */}
                    <div className="mt-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-extrabold text-base sm:text-lg text-zinc-950 group-hover:text-amber-600 transition-colors tracking-tight">
                          {opt.name}
                        </h3>
                        <div className="w-7 h-7 rounded-full bg-stone-100/90 group-hover:bg-amber-500 group-hover:text-white text-stone-500 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shrink-0 shadow-2xs border border-stone-200/60">
                          <ArrowRight size={14} className="stroke-[2.5]" />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-1 font-medium leading-relaxed">
                        {opt.sub}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

