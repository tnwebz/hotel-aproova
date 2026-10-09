-- ======================================================================
-- HOTEL APOORVAA - SUPABASE SCHEMA DEFINITION
-- Schema Version: 1.0.0
-- Portable and idempotent for Hotel Apoorvaa Production & Test instances
-- ======================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. ADMIN PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'ADMIN' CHECK (role IN ('ADMIN', 'SUPER_ADMIN')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_admin_profiles_user_id UNIQUE (user_id),
    CONSTRAINT uq_admin_profiles_email UNIQUE (email)
);

CREATE TRIGGER set_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Helper function to check if current user is an active admin (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN false;
    END IF;
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE user_id = auth.uid() AND is_active = true
    );
END;
$$;

-- 4. MENU CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    hero_image TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_menu_categories_updated_at
BEFORE UPDATE ON public.menu_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_menu_categories_slug ON public.menu_categories (slug);
CREATE INDEX IF NOT EXISTS idx_menu_categories_order ON public.menu_categories (display_order);

-- 5. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legacy_id TEXT NOT NULL UNIQUE,
    category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2) CHECK (original_price IS NULL OR original_price >= price),
    diet_type TEXT NOT NULL DEFAULT 'VEGETARIAN' CHECK (diet_type IN ('VEGETARIAN', 'VEGAN')),
    badge_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    rating NUMERIC(3, 2),
    reviews_count INTEGER,
    image_path TEXT,
    availability_type TEXT NOT NULL DEFAULT 'ALWAYS' CHECK (availability_type IN ('ALWAYS', 'TIME_SLOT', 'DINNER')),
    start_time TIME,
    end_time TIME,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    featured_order INTEGER DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_timeslot_times CHECK (
        availability_type != 'TIME_SLOT' OR (start_time IS NOT NULL AND end_time IS NOT NULL)
    )
);

CREATE TRIGGER set_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON public.menu_items (category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_legacy_id ON public.menu_items (legacy_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_available ON public.menu_items (is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_featured ON public.menu_items (is_featured);
CREATE INDEX IF NOT EXISTS idx_menu_items_display_order ON public.menu_items (display_order);

-- 6. MENU ITEM MEAL PERIODS TABLE (Relational Many-to-Many)
CREATE TABLE IF NOT EXISTS public.menu_item_meal_periods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
    meal_period TEXT NOT NULL CHECK (meal_period IN ('BREAKFAST', 'LUNCH', 'EVENING_SNACKS', 'DINNER', 'ALL_DAY')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_item_meal_period UNIQUE (menu_item_id, meal_period)
);

CREATE INDEX IF NOT EXISTS idx_meal_periods_item_id ON public.menu_item_meal_periods (menu_item_id);
CREATE INDEX IF NOT EXISTS idx_meal_periods_period ON public.menu_item_meal_periods (meal_period);

-- ======================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ======================================================================

-- Enable RLS
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_meal_periods ENABLE ROW LEVEL SECURITY;

-- 1. admin_profiles RLS
CREATE POLICY "Admins can view own admin profile"
ON public.admin_profiles FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Super admins can manage admin profiles"
ON public.admin_profiles FOR ALL
USING (public.is_admin());

-- 2. menu_categories RLS
CREATE POLICY "Public read menu categories"
ON public.menu_categories FOR SELECT
USING (true);

CREATE POLICY "Admin manage menu categories"
ON public.menu_categories FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 3. menu_items RLS
CREATE POLICY "Public read menu items"
ON public.menu_items FOR SELECT
USING (true);

CREATE POLICY "Admin manage menu items"
ON public.menu_items FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. menu_item_meal_periods RLS
CREATE POLICY "Public read meal periods"
ON public.menu_item_meal_periods FOR SELECT
USING (true);

CREATE POLICY "Admin manage meal periods"
ON public.menu_item_meal_periods FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
