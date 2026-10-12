import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazar.com - Türkiye'nin İlan Platformu",
  description: "Satılık, Kiralık, İkinci el, otomobil, emlak ilanları...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Sayfa İçeriği */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Altbilgi (Footer) - Tüm sayfalarda görünür */}
        <footer className="bg-white border-t border-gray-200 mt-10 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Kurumsal</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-yellow-500">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-yellow-500">Kariyer</a></li>
                <li><a href="#" className="hover:text-yellow-500">İletişim</a></li>
                <li><a href="#" className="hover:text-yellow-500">Basın</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Yardım</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-yellow-500">Sıkça Sorulan Sorular</a></li>
                <li><a href="#" className="hover:text-yellow-500">Güvenli Alışveriş</a></li>
                <li><a href="#" className="hover:text-yellow-500">İlan Ver</a></li>
                <li><a href="#" className="hover:text-yellow-500">Şikayet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Kategoriler</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="/kategori/emlak" className="hover:text-yellow-500">Emlak</a></li>
                <li><a href="/kategori/vasita" className="hover:text-yellow-500">Vasıta</a></li>
                <li><a href="#" className="hover:text-yellow-500">Ev & Yaşam</a></li>
                <li><a href="#" className="hover:text-yellow-500">İş Makineleri</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Güvenlik</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-yellow-500">KVKK Aydınlatma</a></li>
                <li><a href="#" className="hover:text-yellow-500">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-yellow-500">Çerez Politikası</a></li>
                <li><a href="#" className="hover:text-yellow-500">Kullanım Şartları</a></li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 py-4 text-center text-xs text-gray-400 border-t border-gray-100">
            © 2024 Bazar.com - Tüm hakları saklıdır.
          </div>
        </footer>

        {/* Mobil Alt Navigasyon */}
        <BottomNav />
      </body>
    </html>
  );
}