import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo ve Mobil Menü İkonu */}
        <div className="flex items-center gap-3">
          <Menu className="md:hidden text-gray-600 cursor-pointer" size={24} />
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-yellow-500">bazar</span><span className="text-gray-800">.com</span>
          </Link>
        </div>

        {/* Arama Çubuğu (Masaüstü) */}
        <div className="flex-1 hidden md:flex relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Kelime, ilan no veya ilan sahibi no ile ara" 
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Sağ Üst Butonlar */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="/giris" className="text-gray-600 hover:text-yellow-500 hidden md:block">Giriş Yap</Link>
          <Link href="/kayit" className="text-gray-600 hover:text-yellow-500 hidden md:block">Kayıt Ol</Link>
          <Link href="/ilan-ver" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Ücretsiz İlan Ver
          </Link>
        </div>
      </div>

      {/* Mobil Arama Çubuğu */}
      <div className="md:hidden bg-white p-3 border-t border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Kelime veya ilan numarası ile ara" 
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </header>
  );
}