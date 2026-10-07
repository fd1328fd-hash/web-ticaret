// components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Kurumsal</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="#" className="hover:text-yellow-600">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-yellow-600">Kariyer</Link></li>
              <li><Link href="#" className="hover:text-yellow-600">İletişim</Link></li>
              <li><Link href="#" className="hover:text-yellow-600">Basın</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Yardım</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="#" className="hover:text-yellow-600">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="#" className="hover:text-yellow-600">Güvenli Alışveriş</Link></li>
              <li><Link href="/ilan/ver" className="hover:text-yellow-600">İlan Ver</Link></li>
              <li><Link href="#" className="hover:text-yellow-600">Şikayet</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Kategoriler</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/kategori/emlak" className="hover:text-yellow-600">Emlak</Link></li>
              <li><Link href="/kategori/vasita" className="hover:text-yellow-600">Vasıta</Link></li>
              <li><Link href="/kategori/ev-yasam" className="hover:text-yellow-600">Ev & Yaşam</Link></li>
              <li><Link href="/kategori/is-makineleri" className="hover:text-yellow-600">İş Makineleri</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Güvenlik</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/sozlesmeler/kvkk" className="hover:text-yellow-600">KVKK Aydınlatma</Link></li>
              <li><Link href="/sozlesmeler/gizlilik" className="hover:text-yellow-600">Gizlilik Politikası</Link></li>
              <li><Link href="/sozlesmeler/cerez" className="hover:text-yellow-600">Çerez Politikası</Link></li>
              <li><Link href="/sozlesmeler/kullanim" className="hover:text-yellow-600">Kullanım Şartları</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-xs text-gray-500">
          © 2026 bazar.com — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}