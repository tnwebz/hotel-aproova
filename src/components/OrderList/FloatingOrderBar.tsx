"use client";

import { useOrderList } from "@/context/OrderListContext";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingOrderBar() {
  const pathname = usePathname();
  const { totalCount, totalPrice, totalSavings, setIsOrderModalOpen } = useOrderList();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/admin-access") || pathname?.startsWith("/order") || pathname?.startsWith("/waiter")) return null;
  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-18 left-0 right-0 z-40 px-3.5 sm:px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl pointer-events-none"
      >
        <div className="pointer-events-auto bg-slate-950 text-white rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-[0_12px_35px_rgba(0,0,0,0.35)] border border-white/20 backdrop-blur-xl flex items-center justify-between gap-3">
          {/* Left: Item count & total bill */}
          <div className="flex items-center gap-3 pl-1.5 sm:pl-2">
            <div className="relative w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-sm">
                {totalCount}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-amber-400">
                  ₹{totalPrice}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  ({totalCount} {totalCount === 1 ? "item" : "items"})
                </span>
              </div>
              {totalSavings > 0 && (
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Saved ₹{totalSavings}</span>
                </p>
              )}
            </div>
          </div>

          {/* Right: View List Button */}
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-full shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>View List</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
