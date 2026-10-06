// app/admin/ilanlar/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Ilan = {
  id: string;
  title: string;
  city: string;
  price: number;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  category: { name: string };
};

export default function AdminIlanlar() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [filtre, setFiltre] = useState<"hepsi" | "ACTIVE" | "PENDING" | "SOLD">("hepsi");

  const yukle = async () => {
    setYukleniyor(true);
    const res = await fetch("/api/admin/ilanlar");
    const data = await res.json();
    if (res.ok) setIlanlar(data.ilanlar || []);
    setYukleniyor(false);
  };

  useEffect(() => {
    yukle();
  }, []);

  const silHandler = async (id: string, baslik: string) => {
    if (!confirm(`"${baslik}" ilanını silmek istediğinizden emin misiniz?`)) return;

    const res = await fetch("/api/admin/ilanlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId: id, islem: "sil" }),
    });

    if (res.ok) {
      setIlanlar(ilanlar.filter((i) => i.id !== id));
    } else {
      alert("Silinemedi.");
    }
  };

  const durumHandler = async (id: string, yeniDurum: string) => {
    const res = await fetch("/api/admin/ilanlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId: id, islem: "durum", yeniDurum }),
    });

    if (res.ok) {
      setIlanlar(
        ilanlar.map((i) => (i.id === id ? { ...i, status: yeniDurum } : i))
      );
    }
  };

  const gosterilen =
    filtre === "hepsi" ? ilanlar : ilanlar.filter((i) => i.status === filtre);

  const durumRenk = (s: string) => {
    if (s === "ACTIVE") return "bg-green-100 text-green-800";
    if (s === "PENDING") return "bg-yellow-100 text-yellow-800";
    if (s === "SOLD") return "bg-gray-100 text-gray-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-lg font-bold text-gray-900 mr-2">
            📋 İlan Yönetimi
          </h2>
          <span className="text-sm text-gray-500">
            Toplam {gosterilen.length} ilan
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["hepsi", "ACTIVE", "PENDING", "SOLD"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                filtre === f
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f === "hepsi" ? "Hepsi" : f}
            </button>
          ))}
        </div>
      </div>

      {yukleniyor ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          Yükleniyor...
        </div>
      ) : gosterilen.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          Bu kriterlere uyan ilan yok.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">İlan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Sahip</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Fiyat</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Durum</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {gosterilen.map((ilan) => (
                <tr key={ilan.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/ilan/${ilan.id}`} className="font-medium text-gray-800 hover:text-yellow-600 line-clamp-1">
                      {ilan.title}
                    </Link>
                    <p className="text-xs text-gray-500">{ilan.city}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">{ilan.category.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">{ilan.user.name}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {ilan.price > 0 ? `${ilan.price.toLocaleString("tr-TR")} TL` : "Fiyat Yok"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={ilan.status}
                      onChange={(e) => durumHandler(ilan.id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded border-0 cursor-pointer ${durumRenk(ilan.status)}`}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="PENDING">PENDING</option>
                      <option value="SOLD">SOLD</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link href={`/ilan/${ilan.id}`} className="text-blue-600 hover:underline text-xs font-medium mr-3">
                      Gör
                    </Link>
                    <button
                      onClick={() => silHandler(ilan.id, ilan.title)}
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