// app/admin/ilanlar/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import IlanAksiyonlar from "@/components/admin/IlanAksiyonlar";

export const dynamic = "force-dynamic";

const durumEtiketleri: Record<string, { label: string; renk: string }> = {
  ACTIVE: { label: "Aktif", renk: "bg-green-100 text-green-700" },
  PENDING: { label: "Bekliyor", renk: "bg-yellow-100 text-yellow-700" },
  REJECTED: { label: "Reddedildi", renk: "bg-red-100 text-red-700" },
  SOLD: { label: "Satıldı", renk: "bg-gray-100 text-gray-700" },
};

export default async function AdminIlanlar({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string }>;
}) {
  const sp = await searchParams;
  const durum = sp.durum;

  const where = durum ? { status: durum } : {};

  const ilanlar = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      category: true,
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-gray-800">
          Tüm İlanlar <span className="text-sm text-gray-500 font-normal">({ilanlar.length})</span>
        </h2>
        <div className="flex gap-1 flex-wrap">
          <Link
            href="/admin/ilanlar"
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              !durum
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tümü
          </Link>
          <Link
            href="/admin/ilanlar?durum=ACTIVE"
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              durum === "ACTIVE"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Aktif
          </Link>
          <Link
            href="/admin/ilanlar?durum=PENDING"
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              durum === "PENDING"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bekleyen
          </Link>
          <Link
            href="/admin/ilanlar?durum=REJECTED"
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              durum === "REJECTED"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Reddedilen
          </Link>
        </div>
      </div>

      {ilanlar.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          Bu kriterde ilan bulunmuyor.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  İlan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Sahibi
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                  Konum
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Fiyat
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Durum
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {ilanlar.map((ilan) => {
                const d = durumEtiketleri[ilan.status] || {
                  label: ilan.status,
                  renk: "bg-gray-100 text-gray-700",
                };
                let resim = "";
                try {
                  const parsed = JSON.parse(ilan.images);
                  if (Array.isArray(parsed) && parsed[0]) resim = parsed[0];
                } catch {}

                return (
                  <tr
                    key={ilan.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {resim && (
                          <img
                            src={resim}
                            alt={ilan.title}
                            className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <Link
                          href={`/ilan/${ilan.id}`}
                          className="font-medium text-gray-800 hover:text-yellow-600 line-clamp-2 max-w-[200px]"
                        >
                          {ilan.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                      <div className="text-xs">
                        <p className="font-medium">{ilan.user.name}</p>
                        <p className="text-gray-400">{ilan.user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                      {ilan.category.name}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">
                      {ilan.city}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {ilan.price > 0
                        ? `${ilan.price.toLocaleString("tr-TR")} ₺`
                        : "Fiyat Yok"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${d.renk}`}
                      >
                        {d.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <IlanAksiyonlar
                        ilanId={ilan.id}
                        baslik={ilan.title}
                        mevcutStatus={ilan.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}