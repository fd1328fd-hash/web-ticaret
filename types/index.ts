import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-500 flex-shrink-0">
          sahibinden<span className="text-gray-800">.com</span>
        </Link>

        {/* Arama Çubuğu */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <input
            type="text"
            placeholder="Kelime, ilan no veya ilan sahibi no ile arama"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Sağ Butonlar */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="/giris" className="hidden sm:block hover:text-yellow-600">
            Giriş Yap
          </Link>
          <Link href="/kayit" className="hidden sm:block hover:text-yellow-600">
            Kayıt Ol
          </Link>
          <Link
            href="/ilan/ver"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Ücretsiz İlan Ver
          </Link>
        </div>
      </div>
    </header>
  );
}