// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    toplamIlan,
    aktifIlan,
    toplamKullanici,
    toplamMesaj,
    toplamFavori,
    sonIlanlar,
    sonKullanicilar,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.message.count(),
    prisma.favorite.count(),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true } }, category: true },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Toplam İlan</p>
          <p className="text-2xl font-bold text-gray-900">{toplamIlan}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Aktif İlan</p>
          <p className="text-2xl font-bold text-green-600">{aktifIlan}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Kullanıcı</p>
          <p className="text-2xl font-bold text-blue-600">{toplamKullanici}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Mesaj</p>
          <p className="text-2xl font-bold text-purple-600">{toplamMesaj}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Favori</p>
          <p className="text-2xl font-bold text-red-600">{toplamFavori}</p>
        </div>
      </div>

      {/* Son İlanlar ve Son Kullanıcılar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son İlanlar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Son İlanlar</h2>
            <Link
              href="/admin/ilanlar"
              className="text-xs text-blue-600 hover:underline"
            >
              Tümünü Gör →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {sonIlanlar.map((ilan) => (
              <div key={ilan.id} className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/ilan/${ilan.id}`}
                    className="text-sm font-medium text-gray-800 hover:text-yellow-600 line-clamp-1"
                  >
                    {ilan.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ilan.user.name} · {ilan.category.name} · {ilan.city}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-800">
                    {ilan.price > 0
                      ? `${ilan.price.toLocaleString("tr-TR")} ₺`
                      : "Fiyat Yok"}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(ilan.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Son Kullanıcılar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Son Kullanıcılar</h2>
            <Link
              href="/admin/kullanicilar"
              className="text-xs text-blue-600 hover:underline"
            >
              Tümünü Gör →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {sonKullanicilar.map((k) => (
              <div key={k.id} className="px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {k.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {k.name}
                    {k.role === "ADMIN" && (
                      <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        ADMIN
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{k.email}</p>
                </div>
                <p className="text-[10px] text-gray-400 flex-shrink-0">
                  {new Date(k.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}