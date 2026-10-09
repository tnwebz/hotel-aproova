-- ======================================================================
-- HOTEL APOORVAA - SUPABASE STORAGE BUCKET & POLICIES
-- ======================================================================

-- 1. Create public bucket for menu images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'menu-images',
    'menu-images',
    true,
    5242880, -- 5 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- 2. Storage Policies
-- A. Public read access to all menu images
CREATE POLICY "Public read menu images"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

-- B. Admin upload images
CREATE POLICY "Admin upload menu images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'menu-images'
    AND public.is_admin()
);

-- C. Admin update images
CREATE POLICY "Admin update menu images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'menu-images'
    AND public.is_admin()
);

-- D. Admin delete images
CREATE POLICY "Admin delete menu images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'menu-images'
    AND public.is_admin()
);
