// app/admin/kullanicilar/page.tsx
"use client";

import { useEffect, useState } from "react";

type Kullanici = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role: string;
  createdAt: string;
  _count: {
    listings: number;
    favorites: number;
  };
};

export default function AdminKullanicilar() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");

  useEffect(() => {
    fetch("/api/admin/kullanicilar")
      .then((res) => res.json())
      .then((data) => {
        setKullanicilar(data.kullanicilar || []);
        setYukleniyor(false);
      })
      .catch(() => setYukleniyor(false));
  }, []);

  const filtreli = kullanicilar.filter(
    (k) =>
      k.name.toLowerCase().includes(arama.toLowerCase()) ||
      k.email.toLowerCase().includes(arama.toLowerCase()) ||
      (k.city && k.city.toLowerCase().includes(arama.toLowerCase()))
  );

  if (yukleniyor) {
    return <p className="text-gray-500 p-8 text-center">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Kullanıcı Yönetimi
          </h2>
          <p className="text-sm text-gray-500">
            Toplam <strong>{kullanicilar.length}</strong> kullanıcı
          </p>
        </div>
        <input
          type="text"
          placeholder="🔍 İsim, e-posta veya şehir ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-80"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Şehir
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  İlan / Favori
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Rol
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Kayıt
                </th>
              </tr>
            </thead>
            <tbody>
              {filtreli.map((k) => (
                <tr
                  key={k.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {k.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{k.name}</p>
                        <p className="text-xs text-gray-400 md:hidden">
                          {k.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">
                    {k.email}
                    {k.phone && (
                      <>
                        <br />
                        <span className="text-gray-400">{k.phone}</span>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {k.city || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="font-semibold">{k._count.listings}</span>{" "}
                    ilan
                    <br />
                    <span className="text-xs text-gray-500">
                      {k._count.favorites} favori
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {k.role === "ADMIN" ? (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        ADMIN
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        USER
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                    {new Date(k.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtreli.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Sonuç bulunamadı.</p>
        </div>
      )}
    </div>
  );
}