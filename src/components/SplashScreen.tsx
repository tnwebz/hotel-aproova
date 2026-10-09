"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Premium cinematic timing: ~1800ms presentation, then graceful exit
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for graceful fade/scale exit
    }, 1900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF7F0] px-4 overflow-hidden select-none"
        >
          {/* Subtle Warm Atmospheric Glow & Ambient Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0%,rgba(245,158,11,0.03)_40%,transparent_75%)] pointer-events-none" />
          
          {/* Extremely Subtle Indian Heritage Geometric Lattice Accent Lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#78350F_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Elegant Top & Bottom Delicate Gold Ambient Accent Borders */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          {/* Main Brand Content Container (Balanced slightly above vertical center) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-[500px] -mt-6 sm:-mt-8 px-2"
          >
            {/* 1. LOGO AREA with Soft Ambient Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -3, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.15, ease: "easeOut" },
                scale: { duration: 0.6, delay: 0.15, ease: "easeOut" },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              }}
              className="relative flex items-center justify-center"
            >
              {/* Radial Golden Halo behind Logo */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-transparent blur-xl pointer-events-none" />

              <div className="relative w-36 h-24 sm:w-48 sm:h-32 drop-shadow-[0_8px_20px_rgba(180,83,9,0.12)]">
                <Image
                  src="/logo2.png"
                  alt="Hotel Apoorvaa Pure Veg"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 144px, 192px"
                />
              </div>
            </motion.div>

            {/* 2. EXACT BRAND NAME & VISUAL IDENTITY (Hotel Apoorvaa Pure Veg) */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
              className="mt-3 sm:mt-4 flex flex-col items-center"
            >
              <div className="relative w-56 sm:w-68 h-20 sm:h-24 drop-shadow-[0_4px_14px_rgba(90,40,10,0.1)]">
                <Image
                  src="/Untitled design (7).png"
                  alt="Hotel Apoorvaa - Pure Veg"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 224px, 272px"
                />
              </div>
            </motion.div>

            {/* Subtle Ornamental Divider Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
              className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-600/40 to-transparent my-3.5 sm:my-4"
            />

            {/* 3. EXACT ONE-LINE QUOTE */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
              className="text-xs sm:text-sm font-medium tracking-wide text-[#78593F] font-sans px-4"
            >
              &ldquo;Pure Veg, Pure Taste, Pure Tradition.&rdquo;
            </motion.p>

            {/* 4. PREMIUM ANIMATED LOADING INDICATOR (3 Small Brand Dots: Orange, Green, Deep Blue) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex items-center justify-center gap-2 mt-5 sm:mt-6"
            >
              {/* Dot 1: Brand Warm Orange */}
              <motion.span
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
                className="w-2 h-2 rounded-full bg-[#EA580C] shadow-xs"
              />
              {/* Dot 2: Brand Pure Veg Green */}
              <motion.span
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.18,
                }}
                className="w-2 h-2 rounded-full bg-[#16A34A] shadow-xs"
              />
              {/* Dot 3: Brand River Deep Blue */}
              <motion.span
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.36,
                }}
                className="w-2 h-2 rounded-full bg-[#0284C7] shadow-xs"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
