/**
 * HOTEL APOORVAA - AUTOMATED SUPABASE REPLICATION SCRIPT
 *
 * Usage:
 *   npx tsx scripts/replicate_database.ts
 *
 * This script connects to the target Supabase instance (configured in .env.local
 * or passed via environment variables) and executes the complete replication:
 * 1. Verifies connectivity to the target Supabase project.
 * 2. Checks/Creates the 'menu-images' storage bucket with public read access.
 * 3. Instructs on running supabase/full_replication.sql in SQL Editor for 100% schema+RLS integrity.
 * 4. Verifies all 23 Categories and 306 Menu Items are seeded and live.
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("=================================================");
  console.log("  HOTEL APOORVAA - SUPABASE REPLICATION MANAGER  ");
  console.log("=================================================\n");

  // Automatically read .env.local if present
  const envPath = path.resolve(".env.local");
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or API key in environment / .env.local");
    console.error("Please ensure your target Supabase credentials are configured in .env.local\n");
    process.exit(1);
  }

  console.log(`📡 Target Supabase URL: ${supabaseUrl}`);
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Check storage bucket
  console.log("\n📦 Checking Storage Bucket 'menu-images'...");
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.warn("⚠️  Could not list buckets via API (Service Role Key may be needed).");
    } else {
      const exists = buckets.some((b) => b.id === "menu-images");
      if (exists) {
        console.log("✅ Bucket 'menu-images' already exists and is active.");
      } else {
        const { error: createError } = await supabase.storage.createBucket("menu-images", {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
        });
        if (createError) {
          console.warn("⚠️  Failed to create bucket via API:", createError.message);
          console.log("💡 The bucket will be created via full_replication.sql in Supabase SQL editor.");
        } else {
          console.log("✅ Bucket 'menu-images' created successfully.");
        }
      }
    }
  } catch (err: any) {
    console.warn("⚠️ Storage check notice:", err.message);
  }

  // 2. Check Database Tables & Seed Count
  console.log("\n🔍 Verifying Database Records...");
  const [catRes, itemsRes] = await Promise.all([
    supabase.from("menu_categories").select("id, name, slug", { count: "exact" }),
    supabase.from("menu_items").select("id, name", { count: "exact" }),
  ]);

  const catCount = catRes.count || (catRes.data ? catRes.data.length : 0);
  const itemsCount = itemsRes.count || (itemsRes.data ? itemsRes.data.length : 0);

  console.log(`📊 Current Categories in Database: ${catCount} / 23`);
  console.log(`📊 Current Menu Items in Database: ${itemsCount} / 306`);

  if (catCount >= 23 && itemsCount >= 306) {
    console.log("\n🎉 Target Database is ALREADY fully seeded with all 23 Categories and 306 Items!");
  } else {
    console.log("\n⚠️  Target Database is missing tables or records.");
    console.log("🚀 TO REPLICATE INSTANTLY:");
    console.log("1. Open your target Supabase Dashboard -> SQL Editor");
    console.log("2. Open and copy the contents of:");
    console.log(`   📄 ${path.resolve("supabase/full_replication.sql")}`);
    console.log("3. Click 'RUN' in the Supabase SQL Editor.");
    console.log("   (This runs all DDL, RLS policies, Storage buckets, and seeds all 306 items in < 5 seconds)");
    console.log("4. Update .env.local with your new project URL & anon key, and restart the app.\n");
  }

  console.log("=================================================");
  console.log("  REPLICATION CHECK COMPLETED                    ");
  console.log("=================================================\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
