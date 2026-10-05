// app/ilan/[id]/page.tsx
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import FavoriButonu from "@/components/ilan/FavoriButonu";
import IletisimButonu from "@/components/ilan/IletisimButonu";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function IlanDetay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ilan = await prisma.listing.findUnique({
    where: { id },
    include: { category: true, user: true },
  });

  if (!ilan) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get("kullanici");

  let kullaniciId = "";
  let girisYapildi = false;
  if (cookie) {
    try {
      const parsed = JSON.parse(cookie.value);
      kullaniciId = parsed.id;
      girisYapildi = true;
    } catch {}
  }

  let baslangicFavori = false;
  if (kullaniciId) {
    const fav = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: kullaniciId,
          listingId: ilan.id,
        },
      },
    });
    baslangicFavori = !!fav;
  }

  let resimler: string[] = [];
  try {
    const parsed = JSON.parse(ilan.images);
    if (Array.isArray(parsed)) resimler = parsed;
  } catch {
    resimler = [];
  }

  const anaResim = resimler[0] || "https://picsum.photos/seed/1/800/600";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 flex-1 w-full">
        <Sidebar />

        <section className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-xs text-gray-500 mb-2">
              <Link href="/" className="hover:text-yellow-600">
                Anasayfa
              </Link>
              <span className="mx-1">›</span>
              <Link
                href={`/kategori/${ilan.category.slug}`}
                className="hover:text-yellow-600"
              >
                {ilan.category.name}
              </Link>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {ilan.title}
            </h1>

            <div className="w-full bg-gray-100 rounded-lg overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={anaResim}
                alt={ilan.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    İlan Açıklaması
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {ilan.description}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    İlan Bilgileri
                  </h2>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-gray-500">Kategori:</dt>
                    <dd className="font-medium">{ilan.category.name}</dd>
                    <dt className="text-gray-500">Konum:</dt>
                    <dd className="font-medium">
                      {ilan.district ? `${ilan.district}, ` : ""}
                      {ilan.city}
                    </dd>
                    <dt className="text-gray-500">İlan Tarihi:</dt>
                    <dd className="font-medium">
                      {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}
                    </dd>
                    <dt className="text-gray-500">İlan No:</dt>
                    <dd className="font-medium text-xs break-all">{ilan.id}</dd>
                    <dt className="text-gray-500">Görüntülenme:</dt>
                    <dd className="font-medium">{ilan.views}</dd>
                  </dl>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    İlan Sahibi
                  </h2>
                  <p className="text-sm text-gray-700">
                    <strong>{ilan.user.name}</strong>
                  </p>
                  <p className="text-xs text-gray-500">{ilan.user.city}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Fiyat</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ilan.price > 0
                      ? `${ilan.price.toLocaleString("tr-TR")} TL`
                      : "Fiyat Yok"}
                  </p>
                </div>

                <IletisimButonu
                  aliciId={ilan.user.id}
                  ilanId={ilan.id}
                  ilanBaslik={ilan.title}
                  girisYapildi={girisYapildi}
                />

                <FavoriButonu
                  ilanId={ilan.id}
                  baslangicFavori={baslangicFavori}
                  girisYapildi={girisYapildi}
                />

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600 space-y-1">
                  <p className="font-bold text-gray-800 mb-2">
                    Güvenli Alışveriş
                  </p>
                  <p>• İlan sahibini mutlaka arayın</p>
                  <p>• Kapora göndermeden önce ürünü görün</p>
                  <p>• Şüpheli durumları bildirin</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}