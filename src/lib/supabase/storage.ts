import { createClient } from "./client";

export const STORAGE_BUCKET = "menu-images";

/**
 * Returns a full public URL for a relative storage path (e.g. "tiffin-kesari/main.webp")
 * or passes through existing absolute URLs (such as unsplash placeholders)
 */
export function getStorageImageUrl(imagePath?: string | null): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${STORAGE_BUCKET}/${imagePath.replace(/^\//, "")}`;
}

/**
 * Compresses an image client-side using HTML5 Canvas.
 * Max width: 1200px, quality: 0.85, outputs WebP blob.
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If not in browser environment, return raw file
    if (typeof window === "undefined" || !window.document) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Prefer WebP export
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Uploads a product image directly to Supabase Storage.
 * Stores under `menu-images/{itemKey}/main.webp`
 * Returns the relative path for portable database storage.
 */
export async function uploadProductImage(file: File, itemKey: string): Promise<string> {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, or WebP image.");
  }

  // Max 5MB raw
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5 MB limit.");
  }

  const supabase = createClient();
  const safeKey = itemKey.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase() || "item";
  const filePath = `${safeKey}/main.webp`;

  // Compress image
  const compressedBlob = await compressImage(file);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, compressedBlob, {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  return filePath;
}

/**
 * Deletes a product image from Supabase Storage given its relative path
 */
export async function deleteProductImage(imagePath: string): Promise<void> {
  if (!imagePath || imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return;
  }

  const supabase = createClient();
  const cleanPath = imagePath.replace(/^\//, "");

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([cleanPath]);

  if (error) {
    console.warn("Could not delete storage image:", error.message);
  }
}
