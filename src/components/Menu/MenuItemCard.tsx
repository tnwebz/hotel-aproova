"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Flame, ChefHat, Clock, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrderList } from "@/context/OrderListContext";

export type BadgeType = "veg" | "non-veg" | "bestseller" | "chef-choice" | "new" | "spicy";

export interface MenuItemCardProps {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  image?: string;
  badges?: BadgeType[];
  isVeg?: boolean;
  categoryName?: string;
  isAvailable?: boolean;
  availabilityText?: string;
  timingLabel?: string;
  index?: number;
}

export default function MenuItemCard({
  id,
  name,
  price,
  originalPrice,
  rating = 4.8,
  reviewsCount = 280,
  image = "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop",
  badges = ["veg"],
  isVeg = true,
  categoryName,
  isAvailable = true,
  availabilityText,
  timingLabel,
  index = 0,
}: MenuItemCardProps) {
  const calculatedOriginalPrice = originalPrice || Math.round(price * 1.25);
  const itemId = id || `item-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  
  const { getItemQuantity, addItem, updateQuantity } = useOrderList();
  const quantity = getItemQuantity(itemId);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: itemId,
      name,
      price,
      originalPrice: calculatedOriginalPrice,
      image,
      categoryName,
      isVeg,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(itemId, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(itemId, -1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.2) }}
      className={cn(
        "bg-card rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col group relative",
        isAvailable
          ? "border-border/60 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-amber-500/50 hover:-translate-y-0.5"
          : "border-border/40 bg-card/60 opacity-80"
      )}
    >
      {/* Top Half: Image */}
      <div className="relative w-full h-32 sm:h-44 md:h-48 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-wrap gap-1 z-10">
          {badges.includes("bestseller") && (
            <span className="flex items-center gap-0.5 sm:gap-1 bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              <Star size={9} className="fill-white stroke-none hidden xs:inline" /> Best Seller
            </span>
          )}
          {badges.includes("chef-choice") && (
            <span className="flex items-center gap-0.5 sm:gap-1 bg-slate-900/90 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
              <ChefHat size={9} /> Special
            </span>
          )}
          {badges.includes("new") && (
            <span className="flex items-center gap-0.5 sm:gap-1 bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
          {badges.includes("spicy") && (
            <span className="flex items-center gap-0.5 sm:gap-1 bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              <Flame size={9} /> Spicy
            </span>
          )}
        </div>

        {/* Availability Timing Tag */}
        {timingLabel && (
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
            <span
              className={cn(
                "text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md shadow-sm",
                isAvailable
                  ? "bg-black/60 text-emerald-300 border border-emerald-400/30"
                  : "bg-black/70 text-amber-300 border border-amber-400/40"
              )}
            >
              <Clock size={9} />
              <span className="line-clamp-1">{timingLabel}</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom Half: Details */}
      <div className="p-2.5 sm:p-3.5 flex flex-col justify-between flex-1 gap-1 sm:gap-1.5 bg-card">
        <div>
          {/* Category Tag, Veg Indicator & Star Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              {/* Pure Veg Green Icon */}
              <div
                className="flex items-center justify-center w-3.5 h-3.5 border-2 border-emerald-600 rounded-xs shrink-0 bg-white"
                title="Pure Veg"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>

              {categoryName && (
                <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wide truncate">
                  {categoryName}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-1.5 sm:px-2 py-0.5 rounded-md shrink-0">
              <Star size={10} className="fill-amber-500 stroke-none" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="font-heading font-bold text-xs sm:text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        {/* Pricing & Add to List Action Bottom Row */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-border/40 mt-0.5 gap-1.5">
          <div className="flex items-baseline gap-1 shrink-0">
            <span className="font-sans font-extrabold text-sm sm:text-lg text-primary">
              ₹{price}
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-medium text-muted-foreground/60 line-through">
              ₹{calculatedOriginalPrice}
            </span>
          </div>

          {/* Add to List / Quantity Controls */}
          {isAvailable ? (
            quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-[11px] sm:text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                aria-label={`Add ${name} to order list`}
              >
                <Plus size={12} className="stroke-[3]" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-xl p-0.5">
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-card hover:bg-muted flex items-center justify-center text-foreground transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={11} className="stroke-[2.5]" />
                </button>
                <span className="w-4 sm:w-5 text-center text-[11px] sm:text-xs font-extrabold text-amber-700 dark:text-amber-400">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={11} className="stroke-[2.5]" />
                </button>
              </div>
            )
          ) : (
            <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full text-amber-800 bg-amber-50 border border-amber-200">
              {availabilityText || "Next Shift"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
