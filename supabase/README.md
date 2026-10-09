# Hotel Apoorvaa — Database & Storage Migration Guide

This directory contains version-controlled SQL files to initialize and migrate the complete Hotel Apoorvaa menu system to any Supabase account (including the future production deployment for the client).

---

## 📁 Directory Structure

```
supabase/
├── schema.sql     # Database tables, FKs, CHECK constraints, indexes, triggers & RLS policies
├── storage.sql    # Storage bucket configuration ('menu-images') & storage RLS policies
├── seed.sql       # Canonical seed dataset: 23 categories, 306 menu items & meal-period mappings
└── README.md      # Reproduction & deployment instructions
```

---

## 🚀 Step-by-Step Deployment to Client's Supabase Account

### STEP 1: Create Blank Supabase Project
1. Log in to the client's official Supabase Dashboard (`https://supabase.com/dashboard`).
2. Create a new organization / project (e.g. `hotel-apoorvaa-menu`).
3. Note down the **Project Reference ID**, **Project URL**, and **Anon (Public) Key** under **Settings > API**.

---

### STEP 2: Execute Schema DDL
1. Open the Supabase **SQL Editor** in the dashboard.
2. Open and paste the contents of `supabase/schema.sql`.
3. Click **RUN**.
4. This creates:
   - `public.admin_profiles`
   - `public.menu_categories`
   - `public.menu_items`
   - `public.menu_item_meal_periods`
   - `updated_at` automated triggers
   - Indexes on categories, display order, legacy IDs, and availability
   - Complete Row Level Security (RLS) policies (Public SELECT, Admin-only INSERT/UPDATE/DELETE)

---

### STEP 3: Configure Supabase Storage
1. In the Supabase **SQL Editor**, open and paste the contents of `supabase/storage.sql`.
2. Click **RUN**.
3. This creates the public bucket `menu-images` with:
   - Public read access for customers
   - Authenticated active admin-only write, update, and delete access

---

### STEP 4: Seed Canonical Menu Data (306 Products & 23 Categories)
1. In the Supabase **SQL Editor**, open and paste the contents of `supabase/seed.sql`.
2. Click **RUN**.
3. This safely populates:
   - All 23 categories with ordering and slugs
   - All 306 canonical Hotel Apoorvaa products with exact prices, badges, and timing availability
   - All 575 meal-period mappings (`BREAKFAST`, `LUNCH`, `EVENING_SNACKS`, `DINNER`, `ALL_DAY`)
4. Verify counts with:
   ```sql
   SELECT count(*) FROM public.menu_categories; -- Expected: 23
   SELECT count(*) FROM public.menu_items;      -- Expected: 306
   SELECT count(*) FROM public.menu_item_meal_periods; -- Expected: 575
   ```

---

### STEP 5: Create First Admin User
1. Go to **Authentication > Users** in the Supabase dashboard.
2. Click **Add User** -> **Create User**.
3. Enter the staff/admin email and a strong password (e.g. `admin@apoorvaa.com`). Check "Auto Confirm Email".
4. Copy the generated User ID (`UUID`).
5. Run the following in the SQL Editor to grant admin privileges:
   ```sql
   INSERT INTO public.admin_profiles (user_id, email, role, is_active)
   VALUES ('<PASTE-USER-UUID-HERE>', 'admin@apoorvaa.com', 'ADMIN', true)
   ON CONFLICT (user_id) DO UPDATE SET is_active = true;
   ```

---

### STEP 6: Configure Environment Variables
In the production hosting provider (Vercel, Netlify, Cloudflare, or local `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...<your-anon-key>
```

> **Security Guardrail:** Never expose the `SUPABASE_SERVICE_ROLE_KEY` in frontend environment variables or client bundles.

---

### STEP 7: Storage Asset Migration (Images)
Database records store **portable relative paths** (such as `tiffin-kesari/main.webp`). The application resolves these dynamically against `NEXT_PUBLIC_SUPABASE_URL`.

To copy binary images between Supabase projects:
1. Export the contents of the `menu-images` bucket using the Supabase CLI (`supabase storage cp`) or AWS S3 CLI with Supabase S3 compatibility.
2. Import the objects to the client's `menu-images` bucket preserving object keys (`{legacy_id}/main.webp`).
3. If an item has no custom photo uploaded yet, the application automatically uses category-specific default presentation images.
