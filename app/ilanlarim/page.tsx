// app/ilanlarim/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Ilan = {
  id: string;
  title: string;
  city: string;
  district: string | null;
  price: number;
  images: string;
  createdAt: string;
  category: { name: string; slug: string };
};

export default function IlanlarimSayfasi() {
  const router = useRouter();
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [silinenId, setSilinenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ilanlarim")
      .then((res) => res.json())
      .then((data) => {
        if (data.hata) {
          router.push("/giris");
          return;
        }
        setIlanlar(data.ilanlar || []);
        setKullaniciAdi(data.kullaniciAdi || "");
        setYukleniyor(false);
      })
      .catch(() => {
        router.push("/giris");
      });
  }, [router]);

  const silHandler = async (id: string, baslik: string) => {
    if (!confirm(`"${baslik}" ilanını silmek istediğinizden emin misiniz?`)) {
      return;
    }

    setSilinenId(id);
    const res = await fetch("/api/ilan-sil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId: id }),
    });

    const data = await res.json();

    if (res.ok) {
      setIlanlar(ilanlar.filter((i) => i.id !== id));
      setSilinenId(null);
    } else {
      alert(data.hata || "İlan silinemedi.");
      setSilinenId(null);
    }
  };

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Yükleniyor...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İlanlarım</h1>
            <p className="text-sm text-gray-500 mt-1">
              Merhaba <strong>{kullaniciAdi}</strong>, toplam{" "}
              <strong>{ilanlar.length}</strong> ilanınız var.
            </p>
          </div>
          <Link
            href="/ilan/ver"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            ➕ Yeni İlan Ver
          </Link>
        </div>

        {ilanlar.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Henüz hiç ilan vermediniz.</p>
            <Link
              href="/ilan/ver"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              İlk İlanınızı Verin
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    İlan
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                    Kategori
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                    Konum
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Fiyat
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody>
                {ilanlar.map((ilan) => {
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
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={resim}
                              alt={ilan.title}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          )}
                          <Link
                            href={`/ilan/${ilan.id}`}
                            className="font-medium text-gray-800 hover:text-yellow-600 line-clamp-2"
                          >
                            {ilan.title}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                        {ilan.category.name}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                        {ilan.city}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {ilan.price > 0
                          ? `${ilan.price.toLocaleString("tr-TR")} TL`
                          : "Fiyat Yok"}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Link
                          href={`/ilan/${ilan.id}`}
                          className="text-blue-600 hover:underline text-xs font-medium mr-3"
                        >
                          Görüntüle
                        </Link>
                        <Link
                          href={`/ilan/duzenle/${ilan.id}`}
                          className="text-yellow-600 hover:underline text-xs font-medium mr-3"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => silHandler(ilan.id, ilan.title)}
                          disabled={silinenId === ilan.id}
                          className="text-red-600 hover:underline text-xs font-medium disabled:opacity-50"
                        >
                          {silinenId === ilan.id ? "Siliniyor..." : "Sil"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}