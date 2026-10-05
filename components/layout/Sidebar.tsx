// components/layout/Sidebar.tsx
import Link from "next/link";

type AltKategori = {
  ad: string;
  slug: string;
};

type Kategori = {
  ad: string;
  slug: string;
  ikon: string;
  badge?: string;
  altKategoriler?: AltKategori[];
};

const kategoriler: Kategori[] = [
  {
    ad: "Acil Acil",
    slug: "acil-acil",
    ikon: "🚨",
  },
  {
    ad: "Oto360",
    slug: "oto360",
    ikon: "🚗",
    altKategoriler: [
      { ad: "Oto Ekspertiz", slug: "oto-ekspertiz" },
      { ad: "Tümünü Göster", slug: "tumu" },
    ],
  },
  {
    ad: "Emlak360",
    slug: "emlak360",
    ikon: "🏠",
    badge: "YENİ",
    altKategoriler: [
      { ad: "Bana Emlakçı Bul", slug: "emlakci-bul" },
      { ad: "Tümünü Göster", slug: "tumu" },
    ],
  },
  {
    ad: "Emlak",
    slug: "emlak",
    ikon: "🏢",
    altKategoriler: [
      { ad: "Konut", slug: "konut" },
      { ad: "İş Yeri", slug: "is-yeri" },
      { ad: "Arsa", slug: "arsa" },
      { ad: "Konut Projeleri", slug: "konut-projeleri" },
      { ad: "Bina", slug: "bina" },
      { ad: "Devre Mülk", slug: "devre-mulk" },
      { ad: "Turistik Tesis", slug: "turistik-tesis" },
    ],
  },
  {
    ad: "Vasıta",
    slug: "vasita",
    ikon: "🏍️",
    altKategoriler: [
      { ad: "Otomobil", slug: "otomobil" },
      { ad: "Arazi, SUV", slug: "arazi-suv" },
      { ad: "Motosiklet", slug: "motosiklet" },
      { ad: "Ticari Araçlar", slug: "ticari" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
          Kategoriler
        </h2>
        <ul className="space-y-3">
          {kategoriler.map((kat) => (
            <li key={kat.slug}>
              <Link
                href={`/kategori/${kat.slug}`}
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-yellow-600 transition text-sm"
              >
                <span className="text-lg">{kat.ikon}</span>
                <span>{kat.ad}</span>
                {kat.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {kat.badge}
                  </span>
                )}
              </Link>
              {kat.altKategoriler && (
                <ul className="ml-7 mt-1 space-y-1">
                  {kat.altKategoriler.map((alt) => (
                    <li key={alt.slug}>
                      <Link
                        href={`/kategori/${kat.slug}/${alt.slug}`}
                        className="text-xs text-gray-500 hover:text-yellow-600 transition"
                      >
                        {alt.ad}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}