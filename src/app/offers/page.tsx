"use client";

import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Tag } from "lucide-react";

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6"
        >
          <Tag size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-heading font-bold text-foreground mb-4"
        >
          No Active Offers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground max-w-md"
        >
          Check back later for exclusive deals, combo offers, and seasonal discounts.
        </motion.p>
      </div>
      <BottomNav />
    </main>
  );
}
