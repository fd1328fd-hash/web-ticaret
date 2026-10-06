// app/admin/kullanicilar/page.tsx
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminKullanicilar() {
  const kullanicilar = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          listings: true,
          favorites: true,
        },
      },
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="font-bold text-gray-800">
          Kullanıcılar{" "}
          <span className="text-sm text-gray-500 font-normal">
            ({kullanicilar.length})
          </span>
        </h2>
      </div>

      {kullanicilar.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          Henüz kullanıcı yok.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Kullanıcı
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  İletişim
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                  Şehir
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  İlan
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Favori
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Rol
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                  Kayıt
                </th>
              </tr>
            </thead>
            <tbody>
              {kullanicilar.map((k) => (
                <tr
                  key={k.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {k.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{k.name}</p>
                        <p className="text-xs text-gray-500">{k.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">
                    {k.phone || "-"}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-600 text-xs">
                    {k.city || "-"}
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className="text-xs font-semibold text-blue-600">
                      {k._count.listings}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className="text-xs font-semibold text-red-600">
                      {k._count.favorites}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {k.role === "ADMIN" ? (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ADMIN
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        USER
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell text-xs text-gray-500">
                    {new Date(k.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}