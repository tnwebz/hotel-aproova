"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { MenuCategory, MenuItem, menuData as fallbackMenuData } from "@/data/menu";
import { fetchPublicMenu, fetchFeaturedItems } from "@/lib/supabase/menu";
import { createClient } from "@/lib/supabase/client";

interface MenuDataContextType {
  menuData: MenuCategory[];
  featuredItems: MenuItem[];
  isLoading: boolean;
  isLive: boolean;
  refreshMenu: () => Promise<void>;
}

const MenuDataContext = createContext<MenuDataContextType>({
  menuData: fallbackMenuData,
  featuredItems: [],
  isLoading: false,
  isLive: false,
  refreshMenu: async () => {},
});

export const MenuDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuData, setMenuData] = useState<MenuCategory[]>(fallbackMenuData);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const loadMenu = useCallback(async () => {
    try {
      const [liveCategories, liveFeatured] = await Promise.all([
        fetchPublicMenu(),
        fetchFeaturedItems(),
      ]);

      if (liveCategories && liveCategories.length > 0) {
        setMenuData(liveCategories);
        setFeaturedItems(liveFeatured || []);
        setIsLive(true);
      }
    } catch (err) {
      console.warn("Using fallback local menu data:", err);
      // fallback to static menuData
      setMenuData(fallbackMenuData);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();

    // Supabase Realtime subscription for live menu item changes
    const supabase = createClient();
    const channel = supabase
      .channel("menu-items-realtime-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        () => {
          loadMenu();
        }
      )
      .subscribe();

    // Local custom event listener for instant UI sync
    const handleMenuRefresh = () => {
      loadMenu();
    };
    window.addEventListener("hotel_apoorvaa_menu_refresh", handleMenuRefresh);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("hotel_apoorvaa_menu_refresh", handleMenuRefresh);
    };
  }, [loadMenu]);

  return (
    <MenuDataContext.Provider
      value={{
        menuData,
        featuredItems,
        isLoading,
        isLive,
        refreshMenu: loadMenu,
      }}
    >
      {children}
    </MenuDataContext.Provider>
  );
};

export const useMenuData = () => useContext(MenuDataContext);
