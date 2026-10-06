// app/admin/ilanlar/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Ilan = {
  id: string;
  title: string;
  price: number;
  city: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  category: { name: string };
};

export default function AdminIlanlar() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [silinenId, setSilinenId] = useState<string | null>(null);
  const [arama, setArama] = useState("");

  const yukle = () => {
    fetch("/api/admin/ilanlar")
      .then((res) => res.json())
      .then((data) => {
        setIlanlar(data.ilanlar || []);
        setYukleniyor(false);
      })
      .catch(() => setYukleniyor(false));
  };

  useEffect(() => {
    yukle();
  }, []);

  const sil = async (id: string, baslik: string) => {
    if (!confirm(`"${baslik}" ilanını silmek istediğinizden emin misiniz?`)) return;

    setSilinenId(id);
    const res = await fetch("/api/admin/ilanlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId: id }),
    });

    if (res.ok) {
      setIlanlar(ilanlar.filter((i) => i.id !== id));
    } else {
      alert("İlan silinemedi.");
    }
    setSilinenId(null);
  };

  const filtreli = ilanlar.filter(
    (i) =>
      i.title.toLowerCase().includes(arama.toLowerCase()) ||
      i.user.name.toLowerCase().includes(arama.toLowerCase()) ||
      i.city.toLowerCase().includes(arama.toLowerCase())
  );

  if (yukleniyor) {
    return <p className="text-gray-500 p-8 text-center">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">İlan Yönetimi</h2>
          <p className="text-sm text-gray-500">
            Toplam <strong>{ilanlar.length}</strong> ilan
          </p>
        </div>
        <input
          type="text"
          placeholder="🔍 İlan başlığı, sahip, şehir ara..."
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
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Başlık</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Sahip
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Fiyat</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                  Şehir
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtreli.map((ilan) => (
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
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">
                    {ilan.user.name}
                    <br />
                    <span className="text-gray-400">{ilan.user.email}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {ilan.category.name}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {ilan.price > 0
                      ? `${ilan.price.toLocaleString("tr-TR")} TL`
                      : "Fiyat Yok"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {ilan.city}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/ilan/${ilan.id}`}
                      className="text-blue-600 hover:underline text-xs font-medium mr-3"
                    >
                      Görüntüle
                    </Link>
                    <button
                      onClick={() => sil(ilan.id, ilan.title)}
                      disabled={silinenId === ilan.id}
                      className="text-red-600 hover:underline text-xs font-medium disabled:opacity-50"
                    >
                      {silinenId === ilan.id ? "Siliniyor..." : "Sil"}
                    </button>
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