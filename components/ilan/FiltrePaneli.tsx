// components/ilan/FiltrePaneli.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function FiltrePaneli({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minFiyat, setMinFiyat] = useState(searchParams.get("minFiyat") || "");
  const [maxFiyat, setMaxFiyat] = useState(searchParams.get("maxFiyat") || "");
  const [sehir, setSehir] = useState(searchParams.get("sehir") || "");
  const [siralama, setSiralama] = useState(
    searchParams.get("siralama") || "yeni"
  );
  const [acik, setAcik] = useState(false);

  const uygula = () => {
    const params = new URLSearchParams();
    if (minFiyat) params.set("minFiyat", minFiyat);
    if (maxFiyat) params.set("maxFiyat", maxFiyat);
    if (sehir) params.set("sehir", sehir);
    if (siralama !== "yeni") params.set("siralama", siralama);

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
    setAcik(false);
  };

  const temizle = () => {
    setMinFiyat("");
    setMaxFiyat("");
    setSehir("");
    setSiralama("yeni");
    router.push(pathname);
  };

  const aktifFiltreVar =
    searchParams.get("minFiyat") ||
    searchParams.get("maxFiyat") ||
    searchParams.get("sehir") ||
    searchParams.get("siralama");

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      {/* Başlık */}
      <button
        onClick={() => setAcik(!acik)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          🔍 Filtreler
          {aktifFiltreVar && (
            <span className="bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              AKTİF
            </span>
          )}
        </span>
        <span className="text-gray-400">{acik ? "▲" : "▼"}</span>
      </button>

      {acik && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Fiyat Aralığı */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Fiyat Aralığı (TL)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minFiyat}
                onChange={(e) => setMinFiyat(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxFiyat}
                onChange={(e) => setMaxFiyat(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Şehir */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Şehir
            </label>
            <input
              type="text"
              placeholder="Örn: İstanbul"
              value={sehir}
              onChange={(e) => setSehir(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Sıralama */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Sıralama
            </label>
            <select
              value={siralama}
              onChange={(e) => setSiralama(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="yeni">En Yeni</option>
              <option value="artan">Fiyat: Düşükten Yükseğe</option>
              <option value="azalan">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>

          {/* Butonlar */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={uygula}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-md transition text-sm"
            >
              Filtrele
            </button>
            <button
              onClick={temizle}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition text-sm"
            >
              Temizle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}