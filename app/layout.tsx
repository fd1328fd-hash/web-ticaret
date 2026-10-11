// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav"; // YENİ EKLENDİ

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazar.com - Türkiye'nin İlan Platformu",
  description: "Satılık, Kiralık, ikinci el, otomobil, emlak ilanları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <BottomNav /> {/* YENİ EKLENDİ: Alt menüyü sayfaya sabitler */}
      </body>
    </html>
  );
}