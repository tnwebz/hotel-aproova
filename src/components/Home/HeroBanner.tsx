"use client";

import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft, Flame, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MealPeriod, MEAL_PERIOD_CONFIGS } from "@/data/mealPeriods";
import { cn } from "@/lib/utils";
import { useMenuData } from "@/context/MenuDataContext";

interface HeroBannerProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  activeMeal?: MealPeriod;
  onMealChange?: (meal: MealPeriod) => void;
}

const SPECIAL_MENU_ITEMS = [
  {
    id: "dosa-apoorvaa-special-roast",
    name: "Apoorvaa Special Roast",
    category: "dosa",
    categoryName: "Dosa",
    price: 199,
    originalPrice: 249,
    rating: 4.9,
    tag: "Signature Special",
    image: "/menu-images/dosa/apoorvaa-special-roast.webp",
  },
  {
    id: "main-course-paneer-apoorvaa-special",
    name: "Paneer Apoorvaa Special",
    category: "main-course",
    categoryName: "Main Course",
    price: 270,
    originalPrice: 330,
    rating: 4.9,
    tag: "Chef's Signature",
    image: "/menu-images/main-course/paneer-apoorvaa-special.webp",
  },
  {
    id: "meals-special-unlimited",
    name: "Special Meals - Unlimited",
    category: "meals",
    categoryName: "Meals",
    price: 270,
    originalPrice: 320,
    rating: 4.9,
    tag: "Grand Royal Thali",
    image: "/menu-images/meals/special-meals-unlimited.webp",
  },
  {
    id: "main-course-mushroom-apoorvaa-special",
    name: "Mushroom Apoorvaa Special",
    category: "main-course",
    categoryName: "Main Course",
    price: 250,
    originalPrice: 310,
    rating: 4.8,
    tag: "Apoorvaa Special",
    image: "/menu-images/main-course/mushroom-apoorvaa-special.webp",
  },
  {
    id: "main-course-babycorn-apoorvaa-special",
    name: "Babycorn Apoorvaa Special",
    category: "main-course",
    categoryName: "Main Course",
    price: 230,
    originalPrice: 280,
    rating: 4.8,
    tag: "Apoorvaa Special",
    image: "/menu-images/main-course/babycorn-apoorvaa-special.webp",
  },
  {
    id: "main-course-gobi-apoorvaa-special",
    name: "Gobi Apoorvaa Special",
    category: "main-course",
    categoryName: "Main Course",
    price: 240,
    originalPrice: 295,
    rating: 4.8,
    tag: "Apoorvaa Special",
    image: "/menu-images/main-course/gobi-apoorvaa-special.webp",
  },
  {
    id: "rava-roast-special",
    name: "Special Rava Roast",
    category: "rava-roast",
    categoryName: "Rava Roast",
    price: 170,
    originalPrice: 215,
    rating: 4.9,
    tag: "Crispy Special",
    image: "/menu-images/rava-roast/special-rava-roast.webp",
  },
];

export default function HeroBanner({
  onSearchChange,
  searchQuery = "",
  activeMeal = "LUNCH",
  onMealChange,
}: HeroBannerProps) {
  const { featuredItems } = useMenuData();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const displaySpecials = (featuredItems && featuredItems.length > 0)
    ? featuredItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        categoryName: item.categoryName,
        price: item.price,
        originalPrice: item.originalPrice || Math.round(item.price * 1.25),
        rating: item.rating || 4.9,
        tag: "Chef's Special",
        image: item.image || "/menu-images/main-course/paneer-apoorvaa-special.webp",
      }))
    : SPECIAL_MENU_ITEMS;

  // Auto-slide through separate rectangular boxes every 3.2s
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const cardWidth = 304; // 290px card + 14px gap
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -310 : 310;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pb-5">
      {/* Background Image: hero2.jpg (Clear & Unblurred) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero2.jpg"
          alt="Hotel Apoorvaa Interior Ambiance"
          fill
          priority
          className="object-cover object-center scale-100"
          sizes="100vw"
        />
        {/* Balanced soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85 pointer-events-none" />
      </div>

      {/* Floating Curvy Nav Bar with logo2.png and Search Bar */}
      <div className="relative z-30 pt-3 px-3 sm:px-4 max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
        <div className="bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.18)] rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3 transition-all">
          {/* Logo2 on the left inside curvy pill */}
          <Link href="/" className="flex items-center shrink-0 pl-1">
            <div className="relative w-9 h-7 sm:w-11 sm:h-8 flex items-center justify-center">
              <Image
                src="/logo2.png"
                alt="Hotel Apoorvaa"
                width={44}
                height={32}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Integrated Search Bar */}
          <div className="relative flex-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-amber-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search 300+ dishes (Dosa, Paneer, Soup)..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="block w-full pl-8 pr-9 py-1.5 sm:py-2 bg-transparent text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none"
            />
            <Link
              href={`/menu?meal=${activeMeal.toLowerCase()}`}
              className="p-1.5 sm:p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-xs shrink-0"
              title="Browse full menu"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Special Signature Dishes Slider Header */}
      <div className="relative z-20 px-4 pt-4 sm:pt-5 max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs shadow-sm">
            <Flame size={13} />
          </span>
          <h2 className="text-sm sm:text-base font-heading font-extrabold text-white tracking-tight drop-shadow-sm">
            Chef&apos;s Signature Specials
          </h2>
        </div>

        {/* Prev / Next navigation arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll("left")}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
            aria-label="Previous special"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
            aria-label="Next special"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Auto-Sliding Separate Rectangular Cards Carousel */}
      <div
        className="relative z-20 px-3.5 sm:px-4 pt-2 max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displaySpecials.map((item, idx) => {
            const calculatedOriginalPrice = item.originalPrice || Math.round(item.price * 1.25);

            return (
              <Link
                key={item.id}
                href={`/menu?category=${item.category}`}
                className="shrink-0 w-[290px] sm:w-[330px] snap-center group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border/70 shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-2xl hover:border-amber-500/60 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Top Half: Wide Rectangular Image */}
                  <div className="relative w-full h-28 sm:h-32 bg-muted overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={idx < 2}
                      sizes="330px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="flex items-center gap-1 bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                        <Flame size={10} /> {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Half: Details */}
                  <div className="p-3 flex flex-col justify-between flex-1 gap-1.5 bg-card">
                    <div>
                      {/* Category Tag, Veg Indicator & Star Rating on Right */}
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {/* Pure Veg Green Icon */}
                          <div
                            className="flex items-center justify-center w-3.5 h-3.5 border-2 border-emerald-600 rounded-xs shrink-0 bg-white"
                            title="Pure Veg"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          </div>

                          <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wide truncate">
                            {item.categoryName}
                          </span>
                        </div>

                        {/* Rating on right */}
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-1.5 sm:px-2 py-0.5 rounded-md shrink-0">
                          <Star size={10} className="fill-amber-500 stroke-none" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Dish Name */}
                      <h3 className="font-heading font-bold text-sm sm:text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {/* Pricing & Order Action Bottom Row */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-border/40 mt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-sans font-extrabold text-base sm:text-lg text-primary">
                          ₹{item.price}
                        </span>
                        <span className="font-sans text-[11px] font-medium text-muted-foreground/60 line-through">
                          ₹{calculatedOriginalPrice}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 group-hover:text-amber-600 transition-colors">
                        <CheckCircle2 size={12} /> Order Now
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Meal Timing Switcher (Floating over bottom of hero) */}
      {onMealChange && (
        <div className="relative z-20 max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-3.5 sm:px-4 pt-3">
          <div
            className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {MEAL_PERIOD_CONFIGS.map((config) => {
              const isActive = activeMeal === config.id;
              return (
                <button
                  key={config.id}
                  onClick={() => onMealChange(config.id)}
                  className={cn(
                    "snap-start shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-center flex items-center gap-1.5 cursor-pointer",
                    isActive
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-102"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
