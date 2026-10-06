// app/admin/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getIstatistikler() {
  const [
    toplamIlan,
    aktifIlan,
    toplamKullanici,
    toplamMesaj,
    toplamFavori,
    sonIlanlar,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.message.count(),
    prisma.favorite.count(),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: { select: { name: true } },
        category: true,
      },
    }),
  ]);

  return {
    toplamIlan,
    aktifIlan,
    toplamKullanici,
    toplamMesaj,
    toplamFavori,
    sonIlanlar,
  };
}

export default async function AdminDashboard() {
  const ist = await getIstatistikler();

  const kartlar = [
    { baslik: "Toplam İlan", deger: ist.toplamIlan, renk: "bg-blue-500", ikon: "📋" },
    { baslik: "Aktif İlan", deger: ist.aktifIlan, renk: "bg-green-500", ikon: "✅" },
    { baslik: "Kullanıcı", deger: ist.toplamKullanici, renk: "bg-purple-500", ikon: "👥" },
    { baslik: "Mesaj", deger: ist.toplamMesaj, renk: "bg-orange-500", ikon: "✉️" },
    { baslik: "Favori", deger: ist.toplamFavori, renk: "bg-red-500", ikon: "❤️" },
  ];

  return (
    <div className="space-y-6">
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kartlar.map((k) => (
          <div
            key={k.baslik}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{k.ikon}</span>
              <span
                className={`${k.renk} text-white text-[10px] font-bold px-2 py-0.5 rounded`}
              >
                TOPLAM
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{k.deger}</p>
            <p className="text-xs text-gray-500 mt-1">{k.baslik}</p>
          </div>
        ))}
      </div>

      {/* Son İlanlar */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">🕐 Son İlanlar</h2>
          <Link
            href="/admin/ilanlar"
            className="text-sm text-blue-600 hover:underline"
          >
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Başlık
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Sahip
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Fiyat
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody>
              {ist.sonIlanlar.map((ilan) => (
                <tr
                  key={ilan.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/ilan/${ilan.id}`}
                      className="font-medium text-gray-800 hover:text-yellow-600"
                    >
                      {ilan.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {ilan.category.name}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {ilan.user.name}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {ilan.price > 0
                      ? `${ilan.price.toLocaleString("tr-TR")} TL`
                      : "Fiyat Yok"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                    {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hızlı Linkler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Link
          href="/admin/ilanlar"
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
        >
          <p className="text-2xl mb-2">📋</p>
          <p className="font-bold text-gray-900">İlanları Yönet</p>
          <p className="text-xs text-gray-500 mt-1">
            Onayla, reddet, sil
          </p>
        </Link>
        <Link
          href="/admin/kullanicilar"
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
        >
          <p className="text-2xl mb-2">👥</p>
          <p className="font-bold text-gray-900">Kullanıcılar</p>
          <p className="text-xs text-gray-500 mt-1">
            Kullanıcı listesini görüntüle
          </p>
        </Link>
        <Link
          href="/"
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
        >
          <p className="text-2xl mb-2">🏠</p>
          <p className="font-bold text-gray-900">Siteye Dön</p>
          <p className="text-xs text-gray-500 mt-1">
            Ana sayfaya geri dön
          </p>
        </Link>
      </div>
    </div>
  );
}