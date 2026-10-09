"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop", alt: "Restaurant Interior", className: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", alt: "Food Photography", className: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=600&auto=format&fit=crop", alt: "Kitchen", className: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop", alt: "Coffee Making", className: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop", alt: "Desserts", className: "col-span-2 row-span-1" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop", alt: "Outdoor Seating", className: "col-span-3 row-span-2" }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Gallery</h1>
          <p className="text-muted-foreground">Experience the ambiance and flavors of Cafe Time.</p>
        </motion.div>

        {/* Masonry Layout approximation using CSS Grid */}
        <div className="grid grid-cols-3 gap-3 auto-rows-[120px] md:auto-rows-[180px]">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative rounded-xl overflow-hidden group ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm md:text-lg drop-shadow-md">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
