import { createClient } from "./client";

export const STORAGE_BUCKET = "menu-items";

/**
 * Returns the image URL for an item.
 * - If the image is a custom admin upload (starts with "custom_uploads/" or has "/main.webp"),
 *   it resolves from the Supabase Storage bucket.
 * - For all standard menu items, it loads the real, authentic image from the local
 *   repository (/menu-images/...) avoiding stale Supabase bucket assets as instructed.
 */
export function getStorageImageUrl(imagePath?: string | null): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("/menu-images/")) {
    return imagePath;
  }
  
  // Custom admin uploaded photo in Supabase bucket
  if (imagePath.startsWith("custom_uploads/") || imagePath.includes("/main.webp")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cghalaypznubnitsegjy.supabase.co";
    if (supabaseUrl) {
      return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${STORAGE_BUCKET}/${imagePath.replace(/^\//, "")}`;
    }
  }

  // Real local repository image from github
  return imagePath.startsWith("/") ? imagePath : `/menu-images/${imagePath}`;
}

/**
 * Compresses any image client-side using HTML5 Canvas.
 * Automatically scales down to max dimension 1280px and compresses to ~250-300KB WebP.
 * Handles ANY size input file (e.g. 10MB-25MB mobile camera photos) seamlessly.
 */
export async function compressImage(
  file: File | Blob,
  maxDimension = 1280,
  maxSizeBytes = 350 * 1024
): Promise<File> {
  if (typeof window === "undefined") {
    return file as File;
  }

  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Scale down to maxDimension while maintaining aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file as File);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        const baseName = (file as File).name
          ? (file as File).name.replace(/\.[^/.]+$/, "")
          : "product-image";

        // Iteratively adjust quality to ensure file stays under target ~300-350KB
        const attemptCompression = (quality: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file as File);
                return;
              }

              if (blob.size <= maxSizeBytes || quality <= 0.45) {
                const compressedFile = new File([blob], `${baseName}.webp`, {
                  type: "image/webp",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                // Step down quality
                attemptCompression(Math.max(0.4, quality - 0.15));
              }
            },
            "image/webp",
            quality
          );
        };

        // Start at high quality 0.82
        attemptCompression(0.82);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };
  });
}

/**
 * Uploads a product image directly to Supabase Storage.
 * Automatically resizes & compresses any input file to ~300KB WebP.
 * Stores under `menu-images/{itemKey}/main.webp`
 * Returns the relative path for portable database storage.
 */
export async function uploadProductImage(file: File, itemKey: string): Promise<string> {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (file.type && !allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, or WebP image.");
  }

  const supabase = createClient();
  const safeKey = itemKey.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase() || "item";
  const filePath = `custom_uploads/${safeKey}/main.webp`;

  // Automatically compress to ~250-300KB WebP
  const compressedFile = await compressImage(file);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, compressedFile, {
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
