"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, UtensilsCrossed, ArrowRight, X } from "lucide-react";

interface MealEntryOption {
  id: string;
  name: string;
  sub: string;
  time: string;
  icon: string;
  param: string;
  image: string;
  itemsCount: number;
}

const ENTRY_MEAL_OPTIONS: MealEntryOption[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    sub: "Idly, Dosa, Roast, Poori & Hot Filter Coffee",
    time: "Opening – 11:59 AM",
    icon: "🍳",
    param: "breakfast",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
    itemsCount: 52,
  },
  {
    id: "lunch",
    name: "Lunch",
    sub: "Traditional South Indian Meals, Biryani & Curries",
    time: "12:00 PM – 3:30 PM",
    icon: "🍛",
    param: "lunch",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop",
    itemsCount: 168,
  },
  {
    id: "evening_snacks",
    name: "Snacks & Juice",
    sub: "Chaat, Sandwiches, Pasta, Shakes & Fresh Juices",
    time: "3:00 PM – 6:00 PM",
    icon: "☕",
    param: "evening_snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop",
    itemsCount: 86,
  },
  {
    id: "dinner",
    name: "Dinner",
    sub: "Tandoori, Naan, Rotis, Paneer Gravies & Dosas",
    time: "6:00 PM – 11:00 PM",
    icon: "🌙",
    param: "dinner",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop",
    itemsCount: 172,
  },
];

interface MealEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (mealParam: string) => void;
}

export default function MealEntryModal({ isOpen, onClose, onSelectMeal }: MealEntryModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-card rounded-3xl border border-border/80 shadow-2xl overflow-hidden my-auto"
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
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
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
                  <h2 className="font-heading font-extrabold text-xl text-white tracking-tight">
                    Welcome to Hotel Apoorvaa
                  </h2>
                </div>
                <p className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span>•</span> Please select your dining preference
                </p>
              </div>
            </div>
          </div>

          {/* Meal Options Grid */}
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ENTRY_MEAL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onSelectMeal(opt.param)}
                  className="relative group flex flex-col justify-between text-left p-3.5 rounded-2xl border border-border/70 bg-muted/40 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center text-xl shrink-0">
                      {opt.icon}
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      {opt.time}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                        {opt.name}
                      </h3>
                      <ArrowRight
                        size={15}
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 font-medium leading-relaxed">
                      {opt.sub}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
