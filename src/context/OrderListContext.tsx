"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface OrderListItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  categoryName?: string;
  isVeg?: boolean;
  quantity: number;
}

interface OrderListContextType {
  items: OrderListItem[];
  addItem: (item: Omit<OrderListItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearList: () => void;
  getItemQuantity: (id: string) => number;
  totalCount: number;
  totalPrice: number;
  totalOriginalPrice: number;
  totalSavings: number;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  customerNotes: string;
  setCustomerNotes: (notes: string) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
}

const OrderListContext = createContext<OrderListContextType | undefined>(undefined);

const CACHE_STORAGE_KEY = "hotel_apoorvaa_order_list_cache_v2";
const TABLE_STORAGE_KEY = "hotel_apoorvaa_table_number_cache";
const NOTES_STORAGE_KEY = "hotel_apoorvaa_notes_cache";

export function OrderListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderListItem[]>([]);
  const [tableNumber, setTableNumberState] = useState<string>("");
  const [customerNotes, setCustomerNotesState] = useState<string>("");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore cached order data from localStorage on initial browser load
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }

      const cachedTable = localStorage.getItem(TABLE_STORAGE_KEY);
      if (cachedTable) setTableNumberState(cachedTable);

      const cachedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (cachedNotes) setCustomerNotesState(cachedNotes);
    } catch (e) {
      console.warn("Failed to read order cache from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync cache changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to write order cache to localStorage", e);
    }
  }, [items, isHydrated]);

  const setTableNumber = (table: string) => {
    setTableNumberState(table);
    try {
      localStorage.setItem(TABLE_STORAGE_KEY, table);
    } catch (e) {
      console.warn("Failed to cache table number", e);
    }
  };

  const setCustomerNotes = (notes: string) => {
    setCustomerNotesState(notes);
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, notes);
    } catch (e) {
      console.warn("Failed to cache customer notes", e);
    }
  };

  const addItem = (item: Omit<OrderListItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as OrderListItem[]
    );
  };

  const setQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearList = () => {
    setItems([]);
    try {
      localStorage.removeItem(CACHE_STORAGE_KEY);
      localStorage.removeItem(NOTES_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear order cache", e);
    }
  };

  const getItemQuantity = (id: string) => {
    const item = items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const totalOriginalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      const orig = item.originalPrice || Math.round(item.price * 1.25);
      return acc + orig * item.quantity;
    }, 0);
  }, [items]);

  const totalSavings = useMemo(() => {
    return Math.max(0, totalOriginalPrice - totalPrice);
  }, [totalOriginalPrice, totalPrice]);

  return (
    <OrderListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        setQuantity,
        clearList,
        getItemQuantity,
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
      }}
    >
      {children}
    </OrderListContext.Provider>
  );
}

export function useOrderList() {
  const context = useContext(OrderListContext);
  if (!context) {
    throw new Error("useOrderList must be used within an OrderListProvider");
  }
  return context;
}
