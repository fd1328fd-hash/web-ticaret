import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Home() {
  const hizliLinkler = [
    { name: 'Acil Acil', href: '/kategori/acil', icon: '🚨' },
    { name: 'Son 48 Saat', href: '/kategori/son48', icon: '⏳' },
    { name: 'Oto360', href: '/kategori/oto360', icon: '🚗' },
    { name: 'Emlak360', href: '/kategori/emlak360', icon: '🏠' },
  ];

  const kategoriler = [
    { name: 'Emlak', desc: 'Konut, İş Yeri, Arsa, Konut Projeleri...', href: '/kategori/emlak', icon: '🏠', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Vasıta', desc: 'Otomobil, Arazi, SUV & Pickup, Elektrikli...', href: '/kategori/vasita', icon: '🚗', color: 'bg-red-100 text-red-600' },
    { name: 'Yedek Parça, Aksesuar', desc: 'Otomotiv Ekipmanları, Motosiklet Ekipmanları...', href: '/kategori/yedek-parca', icon: '🔧', color: 'bg-teal-100 text-teal-600' },
    { name: 'İkinci El ve Sıfır Alışveriş', desc: 'Bilgisayar, Cep Telefonu, Fotoğraf & Kamera...', href: '/kategori/alisveris', icon: '🛒', color: 'bg-purple-100 text-purple-600' },
    { name: 'İş Makineleri & Sanayi', desc: 'İş Makineleri, Tarım Makineleri, Sanayi...', href: '/kategori/is-makineleri', icon: '🚜', color: 'bg-purple-100 text-purple-600' },
    { name: 'Ustalar ve Hizmetler', desc: 'Ev Tadilat & Dekorasyon, Nakliye, Araç...', href: '/kategori/ustalar', icon: '🖌️', color: 'bg-blue-100 text-blue-600' },
    { name: 'Özel Ders Verenler', desc: 'Lise & Üniversite, İlkokul & Ortaokul...', href: '/kategori/ozel-ders', icon: '📚', color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="pb-20"> 
      {/* Üst Arama Çubuğu (Mobil için) */}
      <div className="md:hidden bg-white sticky top-0 z-40 p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Menu className="text-gray-600" size={24} />
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Kelime veya ilan numarası ile ara" 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Yatay Kayan Hızlı Linkler (Mobil için) */}
      <div className="md:hidden bg-white py-3 px-4 flex gap-4 overflow-x-auto no-scrollbar border-b border-gray-100">
        {hizliLinkler.map((link) => (
          <Link key={link.name} href={link.href} className="flex flex-col items-center min-w-[70px] gap-1">
            <span className="text-2xl">{link.icon}</span>
            <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Kategori Listesi */}
      <div className="bg-white mt-2 md:mt-0">
        {kategoriler.map((kat) => (
          <Link 
            key={kat.name} 
            href={kat.href}
            className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${kat.color} mr-4 shrink-0`}>
              {kat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-800">{kat.name}</h3>
              <p className="text-sm text-gray-500 truncate">{kat.desc}</p>
            </div>
            <div className="text-gray-300 ml-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Vitrin Alanı */}
      <div className="p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Anasayfa Vitrini</h2>
          <Link href="/vitrin" className="text-sm text-blue-600 font-medium">Tüm vitrin ilanlarını göster</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Fotoğraf Yok</div>
             <div className="p-3">
                <div className="font-bold text-gray-800">000</div>
                <div className="text-xs text-gray-500 mt-1">Batman</div>
                <div className="text-sm font-semibold text-gray-900 mt-2">4.578 TL</div>
             </div>
          </div>
           <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Fotoğraf Yok</div>
             <div className="p-3">
                <div className="font-bold text-gray-800">000</div>
                <div className="text-xs text-gray-500 mt-1">Bilecik</div>
                <div className="text-sm font-semibold text-gray-900 mt-2">88 TL</div>
             </div>
          </div>
        </div>
      </div>

      {/* Altbilgi (Footer) */}
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
    </div>
  );
}