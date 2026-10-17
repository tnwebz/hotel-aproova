import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { OrderListProvider } from "@/context/OrderListContext";
import { MenuDataProvider } from "@/context/MenuDataContext";
import FloatingOrderBar from "@/components/OrderList/FloatingOrderBar";
import OrderListModal from "@/components/OrderList/OrderListModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Apoorvaa - Pure Veg | Digital Menu",
  description: "Digital QR Menu Card for Hotel Apoorvaa - Pure Veg Restaurant",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/20">
        <OrderListProvider>
          <MenuDataProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <FloatingOrderBar />
            <OrderListModal />
          </MenuDataProvider>
        </OrderListProvider>
      </body>
    </html>
  );
}
