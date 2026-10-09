"use client";

import React, { useState, useMemo } from "react";
import { useOrderList } from "@/context/OrderListContext";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Utensils,
  FileText,
  Clock,
  MapPin,
  QrCode,
  ListOrdered,
  Sparkles,
  Share2,
} from "lucide-react";

export default function OrderListModal() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearList,
    totalCount,
    totalPrice,
    totalOriginalPrice,
    totalSavings,
    tableNumber,
    setTableNumber,
    customerNotes,
    setCustomerNotes,
    isOrderModalOpen,
    setIsOrderModalOpen,
  } = useOrderList();

  const [orderFinalized, setOrderFinalized] = useState(false);
  const [orderToken, setOrderToken] = useState<string>("");
  const [orderTime, setOrderTime] = useState<string>("");
  const [viewMode, setViewMode] = useState<"QR" | "RECEIPT">("QR");

  // Generate URL for waiter scan
  const qrUrl = useMemo(() => {
    if (typeof window === "undefined" || !orderToken) return "";

    try {
      const payload = {
        token: orderToken,
        time: orderTime,
        table: tableNumber?.trim() || undefined,
        notes: customerNotes?.trim() || undefined,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total: totalPrice,
      };

      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      return `${window.location.origin}/order?data=${encoded}`;
    } catch (e) {
      return `${window.location.origin}/order?token=${orderToken}&total=${totalPrice}`;
    }
  }, [orderToken, orderTime, tableNumber, customerNotes, items, totalPrice]);

  if (!isOrderModalOpen) return null;

  const handleFinishOrder = () => {
    const randomToken = "APV-" + Math.floor(1000 + Math.random() * 9000);
    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setOrderToken(randomToken);
    setOrderTime(timeStr);
    setViewMode("QR");
    setOrderFinalized(true);
  };

  const handleResetAndClose = () => {
    setOrderFinalized(false);
    setIsOrderModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-card rounded-t-3xl sm:rounded-3xl border border-border/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Header */}
          <div className="relative bg-slate-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
                {orderFinalized ? <QrCode size={20} /> : <ShoppingBag size={20} />}
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  {orderFinalized ? "Order Summary" : "My Order List"}
                </h2>
                <p className="text-xs text-amber-300 font-medium flex items-center gap-1">
                  <span>•</span>
                  {orderFinalized
                    ? `Token #${orderToken} • ${orderTime}`
                    : `${totalCount} ${totalCount === 1 ? "dish selected" : "dishes selected"}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
            {orderFinalized ? (
              /* =================== FINALIZED ORDER TOKEN / RECEIPT WITH QR =================== */
              <div className="flex flex-col gap-4">
                {/* View Switcher Tabs */}
                <div className="grid grid-cols-2 p-1 bg-muted/80 rounded-2xl border border-border/60">
                  <button
                    onClick={() => setViewMode("QR")}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      viewMode === "QR"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <QrCode size={14} className="text-amber-600" />
                    <span>Waiter QR Code</span>
                  </button>
                  <button
                    onClick={() => setViewMode("RECEIPT")}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      viewMode === "RECEIPT"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ListOrdered size={14} className="text-amber-600" />
                    <span>Receipt Summary</span>
                  </button>
                </div>

                {viewMode === "QR" ? (
                  /* QR Code View */
                  <div className="flex flex-col items-center p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-foreground text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-500 text-white font-mono font-extrabold text-xs tracking-wider shadow-xs mb-3">
                      Token #{orderToken}
                    </div>

                    <h3 className="font-heading font-extrabold text-lg text-foreground">
                      Scan to Transfer Order
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-xs mb-4">
                      When the waiter comes to your table, they can scan this QR code to instantly view and record your items.
                    </p>

                    {/* QR Code Canvas */}
                    <div className="p-4 bg-white rounded-2xl shadow-md border border-zinc-200 flex items-center justify-center">
                      <QRCodeSVG
                        value={qrUrl || "https://hotelapoorvaa.com"}
                        size={190}
                        level="H"
                        includeMargin={false}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold text-zinc-700">
                      <span className="px-2.5 py-1 bg-white rounded-lg border border-border/80 shadow-2xs">
                        {items.reduce((a, b) => a + b.quantity, 0)} Items
                      </span>
                      <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg shadow-2xs">
                        Total: ₹{totalPrice}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Receipt Details View */
                  <div className="p-4 rounded-2xl border border-border/80 bg-muted/30 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-border/60 font-semibold">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={12} /> {orderTime}
                      </span>
                      <span className="text-primary font-bold">
                        {tableNumber ? `Table: ${tableNumber}` : "Dine-In"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 pt-1 max-h-56 overflow-y-auto pr-1">
                      {items.map((item, idx) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">
                            {idx + 1}. {item.name} × {item.quantity}
                          </span>
                          <span className="font-bold text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {customerNotes && (
                      <div className="text-xs pt-2 border-t border-border/40 text-muted-foreground italic">
                        Notes: &quot;{customerNotes}&quot;
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border/60 text-sm font-extrabold">
                      <span>Grand Total</span>
                      <span className="text-primary text-base">₹{totalPrice}</span>
                    </div>
                  </div>
                )}

                {/* Waiter Presentation Banner & Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md">
                    <Utensils size={16} className="text-amber-400" />
                    <span>Show This Screen / QR to Waiter</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderFinalized(false)}
                      className="flex-1 py-2.5 rounded-xl border border-border bg-card text-foreground font-semibold text-xs hover:bg-muted transition-colors cursor-pointer"
                    >
                      Edit List
                    </button>
                    <button
                      onClick={() => {
                        clearList();
                        handleResetAndClose();
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground font-semibold text-xs hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      Start New Order
                    </button>
                  </div>
                </div>
              </div>
            ) : items.length === 0 ? (
              /* =================== EMPTY LIST =================== */
              <div className="text-center py-12 px-4 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                  <ShoppingBag size={26} />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  Your Order List is Empty
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Tap &quot;Add +&quot; on any delicious dish from the menu to build your food list.
                </p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* =================== ACTIVE ORDER LIST =================== */
              <>
                {/* Table Number & Quick Notes Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                      <MapPin size={11} className="text-amber-500" /> Table Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-1.5 bg-muted/60 border border-border/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                      <FileText size={11} className="text-amber-500" /> Cooking Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Less spicy"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-1.5 bg-muted/60 border border-border/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
                    <span>Selected Items ({items.length})</span>
                    <button
                      onClick={clearList}
                      className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Trash2 size={12} /> Clear List
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {items.map((item) => {
                      const itemSubtotal = item.price * item.quantity;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-2xl border border-border/70 bg-card shadow-xs gap-2.5"
                        >
                          {/* Item info */}
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50">
                              <Image
                                src={item.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200"}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-heading font-bold text-xs text-foreground truncate">
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-primary">
                                ₹{item.price}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-muted/80 p-1 rounded-xl shrink-0 border border-border/50">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item.id);
                                } else {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-6 h-6 rounded-lg bg-card text-foreground flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-5 text-center text-xs font-extrabold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Items Subtotal ({totalCount} items)</span>
                    <span className="font-medium">₹{totalPrice}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span>Total Savings</span>
                      <span>-₹{totalSavings}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between font-extrabold text-sm text-foreground pt-1.5 border-t border-border/50">
                    <span>Grand Total</span>
                    <span className="text-primary text-base">₹{totalPrice}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Action Buttons */}
          {!orderFinalized && items.length > 0 && (
            <div className="p-4 bg-card border-t border-border/80 flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="flex-1 py-3 rounded-2xl border border-border bg-muted/50 text-foreground font-bold text-xs hover:bg-muted transition-colors cursor-pointer"
              >
                + Add More Items
              </button>

              <button
                onClick={handleFinishOrder}
                className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Utensils size={14} />
                <span>Show to Waiter</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
