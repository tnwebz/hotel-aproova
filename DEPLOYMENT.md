# HOTEL APOORVAA — CLOUDFLARE DEPLOYMENT GUIDE

Comprehensive step-by-step production deployment guide for Hotel Apoorvaa Digital Menu & Admin Portal on **Cloudflare Workers** with **Supabase Backend (PostgreSQL, Auth & Storage)**.

---

## PREREQUISITES

Before starting the deployment, ensure you have:
1. **GitHub Account** (with permissions to create repositories)
2. **Cloudflare Account** (Workers & Pages enabled)
3. **Supabase Project** (Database, Auth, and Storage initialized via `supabase/` SQL files)
4. **Git CLI** and **Node.js 20+** installed locally

---

## STEP 1 — CREATE GITHUB REPOSITORY

1. Open [GitHub](https://github.com/new) and create a new repository (e.g. `hotel-apoorvaa-menu`). You can make it Public or Private.
2. In your local project terminal, run:

```bash
# Initialize git (if not already initialized)
git init

# Stage all production-ready files
git add .

# Commit changes
git commit -m "feat: Hotel Apoorvaa production-ready Cloudflare Workers build"

# Set main branch
git branch -M main

# Add your GitHub remote (replace with your actual GitHub repository URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push to GitHub
git push -u origin main
```

*(Note: Never commit `.env.local` or secret keys. `.gitignore` is pre-configured to protect local secrets).*

---

## STEP 2 — CONNECT GITHUB TO CLOUDFLARE

Deploying as a full-stack Next.js app on **Cloudflare Workers** (not static pages):

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, navigate to **Compute (Workers) > Workers & Pages**.
3. Click **Create** (or **Create Application**).
4. Select the **Pages / Workers** tab -> **Connect to Git** (or **Import repository**).
5. Select your GitHub account and choose the repository you created (`hotel-apoorvaa-menu`).
6. Configure the Build & Deployment Settings:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | `None` / `Next.js (OpenNext)` |
| **Build command** | `npx @opennextjs/cloudflare build` *(or `npm run build:worker`)* |
| **Deploy command** | `npx @opennextjs/cloudflare deploy` |
| **Build output directory** | `.open-next` |
| **Root directory** | `/` (leave empty or default) |
| **Production branch** | `main` |
| **Compatibility flag** | `nodejs_compat` |
| **Compatibility date** | `2024-12-30` (or latest) |

---

## STEP 3 — CLOUDFLARE ENVIRONMENT VARIABLES

Enter the required environment variables in Cloudflare Dashboard under **Project Settings > Variables and Secrets** (or during the initial Git import setup):

### Required Environment Variables:

| Variable Name | Type | Value / Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **PUBLIC** | `https://cghalaypznubnitsegjy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **PUBLIC** | `sb_publishable_9st-KWunnskqHYFeepltGA_T_PBITBH` |
| `ADMIN_PASSWORD` | **SECRET / ENCRYPTED** | `apoorvaa@2026` |
| `NODE_VERSION` | **PUBLIC** (Build variable) | `20` |


> **IMPORTANT SECURITY RULES:**
> - **DO NOT** enter `SUPABASE_SERVICE_ROLE_KEY` in frontend or public environment variables.
> - Admin management operations are securely authenticated via Supabase Auth + Postgres Row Level Security (RLS).
> - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are provided to both **Build** and **Runtime** environments in Cloudflare.

---

## STEP 4 — FIRST DEPLOYMENT

1. Click **Save and Deploy** in Cloudflare.
2. Cloudflare will clone the repository, install dependencies, compile the Next.js bundle via OpenNext, and deploy the Worker to Cloudflare's global edge network.
3. Once completed, Cloudflare will assign a temporary live URL, for example:
   `https://hotel-apoorvaa-menu.<your-subdomain>.workers.dev` (or `*.pages.dev`)

---

## STEP 5 — CONFIGURE SUPABASE AUTH REDIRECT URLS

After obtaining your Cloudflare deployment URL, configure Supabase Auth so admin authentication and session management work seamlessly:

1. Open your Supabase Project Dashboard (`https://supabase.com/dashboard/project/<your-project-ref>`).
2. Navigate to **Authentication > URL Configuration**.
3. Set **Site URL**:
   ```
   https://hotel-apoorvaa-menu.<your-subdomain>.workers.dev
   ```
4. In **Redirect URLs**, add:
   ```
   https://hotel-apoorvaa-menu.<your-subdomain>.workers.dev/**
   https://hotel-apoorvaa-menu.<your-subdomain>.workers.dev/admin/login
   https://hotel-apoorvaa-menu.<your-subdomain>.workers.dev/admin/menu
   http://localhost:3000/**
   ```
5. Click **Save**.

---

## STEP 6 — PRODUCTION VERIFICATION CHECKLIST

Verify all application features on the live Cloudflare deployment URL:

- [ ] **Home Page**: Loads fast with Hotel Apoorvaa hero branding and quick category links
- [ ] **Splash Screen**: Branded animated splash screen transitions smoothly without freezing
- [ ] **Menu Catalog**: All 23 categories and 306 products load with real-time Supabase sync
- [ ] **Product Images**: High-resolution WebP images load quickly from Supabase Storage CDN
- [ ] **Search**: Real-time product search by dish name, category, or description
- [ ] **Meal Filtering**: Breakfast, Lunch, Evening Snacks, Dinner, and All Day filter properly
- [ ] **Time Availability**: Dynamic availability engine reflects Asia/Kolkata restaurant hours
- [ ] **Chef's Special**: Featured dish banner slider displays correctly
- [ ] **Order List & QR**: Add to list, quantity counter, order summary, and QR generation work
- [ ] **Browser State Cache**: Selected items persist upon page refresh via localStorage
- [ ] **Admin Sign In**: `/admin/login` authenticates authorized staff credentials
- [ ] **Admin Menu Dashboard**: `/admin/menu` lists items with live status badges and counts
- [ ] **Add Product**: New dishes can be created with category, prices, and timing
- [ ] **Direct Image Upload**: Photos are compressed client-side and uploaded directly to Supabase bucket
- [ ] **Edit Product**: Existing dishes, prices, and meal periods can be updated in real-time
- [ ] **Toggle Availability**: Single-click stock enable/disable works immediately
- [ ] **Delete Product**: Dish deletion removes database record and associated storage assets
- [ ] **Admin Sign Out**: Staff logout clears session and redirects safely
- [ ] **Mobile Responsiveness**: Touch-friendly bottom bar, sticky navigation, and modal sheets

---

## STEP 7 — CONNECT CUSTOM DOMAIN (LATER)

When you are ready to connect Hotel Apoorvaa's official domain (e.g. `menu.hotelapoorvaa.com`):

1. In Cloudflare Dashboard, go to your Worker project -> **Settings > Domains & Routes**.
2. Click **Add > Custom Domain** and enter your desired domain.
3. Cloudflare will automatically provision SSL/TLS certificates and route DNS traffic.
4. **Update Supabase Auth URLs**:
   Add the custom domain to Supabase **Authentication > URL Configuration**:
   - Site URL: `https://menu.hotelapoorvaa.com`
   - Redirect URL: `https://menu.hotelapoorvaa.com/**`

---

## STEP 8 — FUTURE CLIENT SUPABASE MIGRATION

When migrating from the test Supabase account to the client's official Supabase project:

1. Refer to [supabase/README.md](file:///supabase/README.md) in this repository.
2. Execute in order on the client's Supabase SQL Editor:
   - `supabase/schema.sql` (Creates tables, triggers, indexes, and RLS policies)
   - `supabase/storage.sql` (Creates `menu-images` bucket with public read and admin write policies)
   - `supabase/seed.sql` (Seeds 23 categories, 306 menu items, and 575 meal-period mappings)
3. Create the staff admin user in Supabase Auth and insert their UUID into `public.admin_profiles`.
4. Update `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Cloudflare Variables.
5. Deployments update instantly with zero code alterations required!
