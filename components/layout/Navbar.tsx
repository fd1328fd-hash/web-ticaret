// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Kullanici = {
  id: string;
  name: string;
  email: string;
};

export default function Navbar() {
  const [arama, setArama] = useState("");
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [menuAcik, setMenuAcik] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("kullanici="));

    if (cookie) {
      try {
        const deger = decodeURIComponent(cookie.split("=")[1]);
        setKullanici(JSON.parse(deger));
      } catch {
        setKullanici(null);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (arama.trim()) {
      router.push(`/ara?q=${encodeURIComponent(arama.trim())}`);
    }
  };

  const cikisYap = () => {
    document.cookie = "kullanici=; path=/; max-age=0";
    setKullanici(null);
    setMenuAcik(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold text-yellow-500">sahibinden</span>
          <span className="text-2xl font-bold text-gray-800">.com</span>
        </Link>

        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
          <input
            type="text"
            value={arama}
            onChange={(e) => setArama(e.target.value)}
            placeholder="Kelime, ilan no veya ilan sahibi no ile arama"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </form>

        <div className="flex items-center gap-3 text-sm">
          {kullanici ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setMenuAcik(!menuAcik)}
                  className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {kullanici.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline">
                    {kullanici.name.split(" ")[0]}
                  </span>
                </button>

                {menuAcik && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-800 text-sm">
                        {kullanici.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {kullanici.email}
                      </p>
                    </div>
                    <Link
                      href="/ilan/ver"
                      onClick={() => setMenuAcik(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      ➕ İlan Ver
                    </Link>
                    <Link
                      href="/mesajlar"
                      onClick={() => setMenuAcik(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      ✉️ Mesajlarım
                    </Link>
                    <Link
                      href="/ilanlarim"
                      onClick={() => setMenuAcik(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      📋 İlanlarım
                    </Link>
                    <Link
                      href="/favoriler"
                      onClick={() => setMenuAcik(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      ♡ Favorilerim
                    </Link>
                    <Link
                      href="/profil"
                      onClick={() => setMenuAcik(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      👤 Profilim
                    </Link>
                    <button
                      onClick={cikisYap}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1"
                    >
                      🚪 Çıkış Yap
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/ilan/ver"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Ücretsiz İlan Ver
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/giris"
                className="text-gray-700 hover:text-yellow-600 font-medium px-2 py-2"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="text-gray-700 hover:text-yellow-600 font-medium px-2 py-2"
              >
                Kayıt Ol
              </Link>
              <Link
                href="/ilan/ver"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Ücretsiz İlan Ver
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}