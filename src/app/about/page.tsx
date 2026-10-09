"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { Award, Leaf, ShieldCheck, Clock } from "lucide-react";

const features = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Farm to table everyday" },
  { icon: ShieldCheck, title: "Quality Promise", desc: "No compromises on taste" },
  { icon: Award, title: "Award Winning", desc: "Voted best cafe 2024" },
  { icon: Clock, title: "Fast Service", desc: "Quick and elegant" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Our Story</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Since 2010, Cafe Time has been a sanctuary for food lovers and coffee enthusiasts. 
            Our mission is simple: to provide a premium dining experience that feels both luxurious and welcoming.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-16 shadow-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
            alt="Cafe Interior"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-card p-6 rounded-2xl text-center border border-border/50 shadow-sm"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <feat.icon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Chef Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/30 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop"
              alt="Head Chef"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Meet Our Chef</h2>
            <p className="text-muted-foreground italic mb-4">"Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors—it's how you combine them that sets you apart."</p>
            <h4 className="font-semibold text-primary">Chef Antonio Rossi</h4>
          </div>
        </motion.section>
      </div>
      
      <BottomNav />
    </main>
  );
}
