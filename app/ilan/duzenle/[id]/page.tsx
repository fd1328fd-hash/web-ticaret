// app/ilan/duzenle/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const kategoriler = [
  { id: "emlak", ad: "Emlak" },
  { id: "vasita", ad: "Vasıta" },
  { id: "ev-yasam", ad: "Ev & Yaşam" },
  { id: "is-makineleri", ad: "İş Makineleri" },
];

export default function IlanDuzenleSayfasi() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    district: "",
    categorySlug: "emlak",
    imageUrl: "",
  });
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Sayfa açıldığında ilanı çek ve formu doldur
  useEffect(() => {
    if (!id) return;

    fetch(`/api/ilan-getir?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hata) {
          setMesaj(`❌ ${data.hata}`);
          setYukleniyor(false);
          return;
        }

        const ilan = data.ilan;
        let resim = "";
        try {
          const parsed = JSON.parse(ilan.images);
          if (Array.isArray(parsed) && parsed[0]) resim = parsed[0];
        } catch {}

        setForm({
          title: ilan.title || "",
          description: ilan.description || "",
          price: ilan.price ? String(ilan.price) : "",
          city: ilan.city || "",
          district: ilan.district || "",
          categorySlug: ilan.category?.slug || "emlak",
          imageUrl: resim,
        });
        setYukleniyor(false);
      })
      .catch(() => {
        setMesaj("❌ İlan yüklenemedi.");
        setYukleniyor(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("Güncelleniyor...");

    const res = await fetch("/api/ilan-duzenle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ilanId: id }),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ İlan güncellendi! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/ilanlarim");
        router.refresh();
      }, 1500);
    } else {
      setMesaj(`❌ ${data.hata || "Güncellenemedi"}`);
    }
  };

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">İlan yükleniyor...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            İlanı Düzenle
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            İlan bilgilerini güncelleyin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlan Başlığı *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori *
              </label>
              <select
                name="categorySlug"
                value={form.categorySlug}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
              >
                {kategoriler.map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.ad}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat (TL)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlçe
              </label>
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fotoğraf URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://picsum.photos/seed/1/800/600"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {mesaj && (
              <div className="text-sm text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md p-2">
                {mesaj}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition"
              >
                Değişiklikleri Kaydet
              </button>
              <button
                type="button"
                onClick={() => router.push("/ilanlarim")}
                className="px-6 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}