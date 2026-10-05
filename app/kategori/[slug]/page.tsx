// app/kategori/[slug]/page.tsx
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import IlanKarti from "@/components/ilan/IlanKarti";
import FiltrePaneli from "@/components/ilan/FiltrePaneli";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const kategoriAdlari: Record<string, string> = {
  emlak: "Emlak",
  vasita: "Vasıta",
  "ev-yasam": "Ev & Yaşam",
  "is-makineleri": "İş Makineleri",
  emlak360: "Emlak360",
  oto360: "Oto360",
  "acil-acil": "Acil Acil",
  konut: "Konut",
  "is-yeri": "İş Yeri",
  arsa: "Arsa",
  otomobil: "Otomobil",
  motosiklet: "Motosiklet",
  "arazi-suv": "Arazi, SUV",
};

const slugToCategory: Record<string, string> = {
  emlak: "emlak",
  emlak360: "emlak360",
  "acil-acil": "acil-acil",
  konut: "emlak",
  "is-yeri": "emlak",
  arsa: "emlak",
  "konut-projeleri": "emlak",
  bina: "emlak",
  "devre-mulk": "emlak",
  "turistik-tesis": "emlak",
  vasita: "vasita",
  oto360: "oto360",
  otomobil: "vasita",
  "arazi-suv": "vasita",
  motosiklet: "vasita",
  ticari: "vasita",
  "ev-yasam": "ev-yasam",
  "is-makineleri": "is-makineleri",
};

// Türkçe karakterleri normalize eden fonksiyon
// İstanbul → istanbul, Isparta → isparta, Şile → şile...
function normalize(s: string) {
  return s
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/Ş/g, "s")
    .replace(/Ğ/g, "g")
    .replace(/Ç/g, "c")
    .replace(/Ü/g, "u")
    .replace(/Ö/g, "o")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ç/g, "c")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .toLowerCase()
    .trim();
}

export default async function KategoriSayfasi({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    minFiyat?: string;
    maxFiyat?: string;
    sehir?: string;
    siralama?: string;
  }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const kategoriAdi = kategoriAdlari[slug] || slug;
  const minFiyat = sp.minFiyat ? Number(sp.minFiyat) : undefined;
  const maxFiyat = sp.maxFiyat ? Number(sp.maxFiyat) : undefined;
  const sehir = sp.sehir?.trim() || "";
  const siralama = sp.siralama || "yeni";

  // 1. Veritabanından kategori + fiyat filtresi ile çek
  const where: Record<string, unknown> = { status: "ACTIVE" };

  const kategoriSlug = slugToCategory[slug];
  if (kategoriSlug) {
    where.category = { slug: kategoriSlug };
  }

  if (minFiyat !== undefined || maxFiyat !== undefined) {
    const priceFilter: { gte?: number; lte?: number } = {};
    if (minFiyat !== undefined && !isNaN(minFiyat)) priceFilter.gte = minFiyat;
    if (maxFiyat !== undefined && !isNaN(maxFiyat)) priceFilter.lte = maxFiyat;
    if (Object.keys(priceFilter).length > 0) {
      where.price = priceFilter;
    }
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (siralama === "artan") orderBy = { price: "asc" };
  else if (siralama === "azalan") orderBy = { price: "desc" };

  const tumIlanlar = await prisma.listing.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  // 2. Şehir filtresini JavaScript'te uygula (Türkçe karakter duyarlı)
  const ilanlar = sehir
    ? tumIlanlar.filter((i) => normalize(i.city).includes(normalize(sehir)))
    : tumIlanlar;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 flex-1 w-full">
        <Sidebar />

        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {kategoriAdi}{" "}
              <span className="text-sm font-normal text-gray-500">
                ({ilanlar.length} ilan)
              </span>
            </h2>
            <a href="/" className="text-sm text-blue-600 hover:underline">
              Tüm ilanlar
            </a>
          </div>

          <FiltrePaneli slug={slug} />

          {ilanlar.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">
                Bu kriterlere uyan ilan bulunamadı.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Filtreleri temizleyip tekrar deneyin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {ilanlar.map((ilan) => {
                let resim = "https://picsum.photos/seed/1/400/300";
                try {
                  const parsed = JSON.parse(ilan.images);
                  if (Array.isArray(parsed) && parsed[0]) resim = parsed[0];
                } catch {}

                return (
                  <IlanKarti
                    key={ilan.id}
                    id={ilan.id}
                    baslik={ilan.title}
                    konum={ilan.city}
                    fiyat={
                      ilan.price > 0
                        ? `${ilan.price.toLocaleString("tr-TR")} TL`
                        : "Fiyat Yok"
                    }
                    resim={resim}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}