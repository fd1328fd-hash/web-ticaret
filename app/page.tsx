import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Home() {
  // Hızlı erişim butonları (Yatay kayan)
  const hizliLinkler = [
    { name: 'Acil Acil', href: '/kategori/acil', icon: '🚨' },
    { name: 'Son 48 Saat', href: '/kategori/son48', icon: '⏳' },
    { name: 'Oto360', href: '/kategori/oto360', icon: '🚗' },
    { name: 'Emlak360', href: '/kategori/emlak360', icon: '🏠' },
  ];

  // Ana Kategoriler (Izgara Düzeni)
  const kategoriler = [
    { name: 'Emlak', href: '/kategori/emlak', icon: '🏠' },
    { name: 'Vasıta', href: '/kategori/vasita', icon: '🚗' },
    { name: 'Yedek Parça', href: '/kategori/yedek-parca', icon: '🔧' },
    { name: 'İkinci El', href: '/kategori/alisveris', icon: '🛒' },
    { name: 'İş Makineleri', href: '/kategori/is-makineleri', icon: '🚜' },
    { name: 'Ustalar', href: '/kategori/ustalar', icon: '🖌️' },
  ];

  // Vitrin İlanları (Örnek)
  const vitrinIlanlari = [
    { id: 1, title: 'Satılık Daire', price: '2.500.000 TL', location: 'İstanbul', img: '🏢' },
    { id: 2, title: '2018 Model Araç', price: '850.000 TL', location: 'Ankara', img: '🚗' },
    { id: 3, title: 'Kiralık Ofis', price: '15.000 TL', location: 'İzmir', img: '🏢' },
    { id: 4, title: 'iPhone 13 Pro', price: '32.000 TL', location: 'Bursa', img: '📱' },
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      
      {/* Üst Başlık ve Arama Çubuğu */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo ve Menü (Mobil için) */}
          <div className="flex items-center gap-3">
            <Menu className="md:hidden text-gray-600" size={24} />
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-yellow-500">bazar</span><span className="text-gray-800">.com</span>
            </Link>
          </div>
          
          {/* Arama Çubuğu */}
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
            <Link href="/ilan-ver" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors">
              Ücretsiz İlan Ver
            </Link>
          </div>
        </div>
      </div>

      {/* Mobil Arama Çubuğu (Sadece mobilde görünür) */}
      <div className="md:hidden bg-white p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Kelime veya ilan numarası ile ara" 
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Hızlı Erişim Butonları (Yatay Kayan) */}
      <div className="bg-white py-4 px-4 flex gap-6 overflow-x-auto no-scrollbar border-b border-gray-100">
        {hizliLinkler.map((link) => (
          <Link key={link.name} href={link.href} className="flex flex-col items-center min-w-[70px] gap-1">
            <span className="text-2xl">{link.icon}</span>
            <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* Kategoriler (Izgara Düzeni) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Kategoriler</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {kategoriler.map((kat) => (
              <Link 
                key={kat.name} 
                href={kat.href}
                className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-yellow-200"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-2xl mb-2">
                  {kat.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{kat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Anasayfa Vitrini */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Anasayfa Vitrini</h2>
            <Link href="/vitrin" className="text-sm text-blue-600 font-medium hover:underline">Tüm vitrin ilanlarını göster</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitrinIlanlari.map((ilan) => (
              <div key={ilan.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                  {ilan.img}
                </div>
                <div className="p-3">
                  <div className="font-semibold text-gray-800 text-sm truncate">{ilan.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{ilan.location}</div>
                  <div className="text-sm font-bold text-gray-900 mt-2">{ilan.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}