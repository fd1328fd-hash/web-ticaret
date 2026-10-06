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
    gonderilenMesajlar: number;
  };
};

export default function AdminKullanicilar() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");

  const yukle = async () => {
    setYukleniyor(true);
    const res = await fetch("/api/admin/kullanicilar");
    const data = await res.json();
    if (res.ok) setKullanicilar(data.kullanicilar || []);
    setYukleniyor(false);
  };

  useEffect(() => {
    yukle();
  }, []);

  const rolDegistir = async (id: string, yeniRol: string) => {
    const res = await fetch("/api/admin/kullanicilar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kullaniciId: id, islem: "rol", yeniRol }),
    });

    if (res.ok) {
      setKullanicilar(
        kullanicilar.map((k) => (k.id === id ? { ...k, role: yeniRol } : k))
      );
    } else {
      const d = await res.json();
      alert(d.hata || "İşlem başarısız.");
    }
  };

  const silHandler = async (id: string, isim: string) => {
    if (
      !confirm(
        `"${isim}" kullanıcısını silmek istediğinizden emin misiniz?\n\nBu işlem kullanıcının TÜM ilanlarını, favorilerini ve mesajlarını da silecek!`
      )
    )
      return;

    const res = await fetch("/api/admin/kullanicilar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kullaniciId: id, islem: "sil" }),
    });

    if (res.ok) {
      setKullanicilar(kullanicilar.filter((k) => k.id !== id));
    } else {
      const d = await res.json();
      alert(d.hata || "Silinemedi.");
    }
  };

  const filtreli = kullanicilar.filter(
    (k) =>
      k.name.toLowerCase().includes(arama.toLowerCase()) ||
      k.email.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              👥 Kullanıcı Yönetimi
            </h2>
            <p className="text-sm text-gray-500">
              Toplam {filtreli.length} / {kullanicilar.length} kullanıcı
            </p>
          </div>
          <input
            type="text"
            placeholder="🔍 İsim veya e-posta ara..."
            value={arama}
            onChange={(e) => setArama(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-72"
          />
        </div>
      </div>

      {yukleniyor ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          Yükleniyor...
        </div>
      ) : filtreli.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          Kullanıcı bulunamadı.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Kullanıcı
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Şehir
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                  İstatistik
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Rol
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Kayıt
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">
                  İşlem
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
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {k.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{k.name}</p>
                        <p className="text-xs text-gray-500">{k.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {k.city || "-"}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                    📋 {k._count.listings} · ❤️ {k._count.favorites} · ✉️{" "}
                    {k._count.gonderilenMesajlar}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={k.role}
                      onChange={(e) => rolDegistir(k.id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded border-0 cursor-pointer ${
                        k.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                    {new Date(k.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => silHandler(k.id, k.name)}
                      className="text-red-600 hover:underline text-xs font-medium"
                    >
                      Sil
                    </button>
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