"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Printer,
  Share2,
  Check,
  ChevronLeft,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface DecodedOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DecodedOrder {
  token: string;
  time: string;
  table?: string;
  notes?: string;
  items: DecodedOrderItem[];
  total: number;
}

function OrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [order, setOrder] = useState<DecodedOrder | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [orderStatus, setOrderStatus] = useState<"NEW" | "IN_KITCHEN" | "SERVED">("NEW");

  useEffect(() => {
    // 1. Try to read encoded data parameter
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedStr = decodeURIComponent(escape(atob(dataParam)));
        const parsed = JSON.parse(decodedStr);
        setOrder(parsed);
        return;
      } catch (err) {
        console.error("Failed to decode base64 order data:", err);
      }
    }

    // 2. Fallback to individual query parameters
    const token = searchParams.get("token") || "APV-" + Math.floor(1000 + Math.random() * 9000);
    const time = searchParams.get("time") || new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const table = searchParams.get("table") || undefined;
    const notes = searchParams.get("notes") || undefined;
    const total = parseFloat(searchParams.get("total") || "0");

    const rawItems = searchParams.get("items");
    let items: DecodedOrderItem[] = [];
    if (rawItems) {
      try {
        items = JSON.parse(rawItems);
      } catch (e) {
        items = [];
      }
    }

    if (items.length > 0 || total > 0) {
      setOrder({
        token,
        time,
        table,
        notes,
        items,
        total: total || items.reduce((acc, it) => acc + it.price * it.quantity, 0),
      });
    }
  }, [searchParams]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900">No Active Order Found</h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">
          Please scan the QR code from the customer&apos;s digital menu screen to view their order.
        </p>
        <Link
          href="/"
          className="mt-5 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-800 transition-colors"
        >
          Open Digital Menu
        </Link>
      </div>
    );
  }

  const allItemsChecked =
    order.items.length > 0 && order.items.every((it) => checkedItems[it.id]);

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-zinc-900 pb-16 font-sans">
      {/* Waiter Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white px-4 py-3.5 shadow-md flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base tracking-tight text-white">
                Hotel Apoorvaa
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Pure Veg
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Waiter Order Inspection</p>
          </div>
        </div>

        {/* Live Order Status Badge */}
        <div>
          {orderStatus === "NEW" && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
              New Order
            </span>
          )}
          {orderStatus === "IN_KITCHEN" && (
            <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
              In Kitchen
            </span>
          )}
          {orderStatus === "SERVED" && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
              Served ✓
            </span>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 sm:p-6 space-y-4">
        {/* Big Ticket Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Order Token
              </span>
              <h2 className="text-3xl font-mono font-extrabold text-amber-700 tracking-wider mt-0.5">
                #{order.token}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Table / Location
              </span>
              <span className="inline-block mt-0.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-xl text-sm font-extrabold">
                {order.table ? `Table #${order.table}` : "Dine-In"}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              Placed at: <strong className="text-zinc-700">{order.time}</strong>
            </span>
            <span className="text-zinc-600">
              Total Items: <strong className="text-zinc-900">{order.items.reduce((a, b) => a + b.quantity, 0)}</strong>
            </span>
          </div>
        </div>

        {/* Dish Items Kitchen Checklist */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-amber-700" />
              Ordered Dishes ({order.items.length})
            </h3>
            <span className="text-[11px] text-zinc-400 font-medium">
              Tap item to check off
            </span>
          </div>

          <div className="divide-y divide-zinc-100">
            {order.items.map((item, idx) => {
              const isChecked = !!checkedItems[item.id];

              return (
                <div
                  key={item.id || idx}
                  onClick={() => toggleCheck(item.id)}
                  className={`py-3 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors rounded-xl px-2 -mx-2 ${
                    isChecked ? "bg-emerald-50/50" : "hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox button */}
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold transition-all ${
                            isChecked
                              ? "line-through text-zinc-400 font-medium"
                              : "text-zinc-900"
                          }`}
                        >
                          {item.name}
                        </span>
                        {/* Pure Veg dot */}
                        <div className="w-3 h-3 border border-emerald-600 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400">
                        ₹{item.price} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-900 font-mono font-extrabold text-xs">
                      × {item.quantity}
                    </span>
                    <p className="text-xs font-bold text-zinc-900 mt-0.5">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Special Instructions / Notes */}
          {order.notes && (
            <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <FileText className="w-3.5 h-3.5" />
                Customer Special Request / Notes:
              </div>
              <p className="text-xs text-amber-900 mt-1 italic">
                &ldquo;{order.notes}&rdquo;
              </p>
            </div>
          )}

          {/* Grand Total Calculation */}
          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-600">Grand Total</span>
            <span className="text-2xl font-black text-zinc-950 font-mono">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Waiter Actions */}
        <div className="space-y-2 pt-2">
          {orderStatus === "NEW" && (
            <button
              onClick={() => setOrderStatus("IN_KITCHEN")}
              className="w-full py-3.5 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Acknowledge & Send to Kitchen</span>
            </button>
          )}

          {orderStatus === "IN_KITCHEN" && (
            <button
              onClick={() => setOrderStatus("SERVED")}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Order as Served</span>
            </button>
          )}

          {orderStatus === "SERVED" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Order Completed & Served Successfully</span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 px-3 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl text-xs font-semibold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              Print KOT
            </button>
            <Link
              href="/"
              className="flex-1 py-2.5 px-3 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl text-xs font-semibold shadow-2xs flex items-center justify-center gap-1.5 text-center"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-700 border-t-transparent animate-spin" />
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
