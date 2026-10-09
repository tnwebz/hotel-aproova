"use client";

import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const contactDetails = [
  { icon: Phone, title: "Phone / WhatsApp", value: "+91 98765 43210" },
  { icon: Mail, title: "Email", value: "hello@cafetime.com" },
  { icon: Clock, title: "Opening Hours", value: "Mon-Sun: 10:00 AM - 11:00 PM" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you. Visit us or drop a message.</p>
        </motion.div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full h-64 md:h-96 bg-muted rounded-3xl overflow-hidden mb-12 border border-border/50 shadow-md"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3888.583344605943!2d77.6111306!3d12.9344846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA0LjEiTiA3N8KwMzYnNDAuMSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {contactDetails.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <detail.icon size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground">{detail.title}</h4>
                  <p className="text-muted-foreground">{detail.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-card p-8 rounded-3xl border border-border/50 text-center flex flex-col items-center justify-center"
          >
             <h3 className="text-xl font-heading font-bold text-foreground mb-6">Follow Us</h3>
             <div className="flex gap-4">
                <a href="#" className="w-14 h-14 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors rounded-full flex items-center justify-center">
                  <FaInstagram size={28} />
                </a>
                <a href="#" className="w-14 h-14 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors rounded-full flex items-center justify-center">
                  <FaFacebook size={28} />
                </a>
             </div>
             <p className="mt-6 text-sm text-muted-foreground">Tag us in your photos!</p>
          </motion.div>
        </div>
      </div>
      
      <BottomNav />
    </main>
  );
}
