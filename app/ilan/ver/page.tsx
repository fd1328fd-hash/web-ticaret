// app/ilan/ver/page.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { iller, illerIlceler } from "@/lib/data/iller";

const kategoriler = [
  { id: "emlak", ad: "Emlak" },
  { id: "vasita", ad: "Vasıta" },
  { id: "ev-yasam", ad: "Ev & Yaşam" },
  { id: "is-makineleri", ad: "İş Makineleri" },
];

export default function IlanVerSayfasi() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    district: "",
    categorySlug: "emlak",
  });

  const [resimUrl, setResimUrl] = useState("");
  const [resimYukleniyor, setResimYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState("");

  const ilceler = form.city ? illerIlceler[form.city] || [] : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "city") {
      setForm({ ...form, city: value, district: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleResimSec = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResimYukleniyor(true);
    setMesaj("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResimUrl(data.url);
        setMesaj("✅ Resim yüklendi!");
      } else {
        setMesaj(`❌ ${data.hata || "Resim yüklenemedi"}`);
      }
    } catch {
      setMesaj("❌ Resim yüklenemedi");
    } finally {
      setResimYukleniyor(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("İlan veriliyor...");

    const res = await fetch("/api/ilan-ver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl: resimUrl,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ İlan başarıyla verildi! Anasayfaya yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } else {
      setMesaj(`❌ ${data.hata || "İlan verilemedi"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ücretsiz İlan Ver
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            İlanınızı oluşturun ve binlerce kişiye ulaştırın.
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
                placeholder="Örn: Satılık 3+1 Daire"
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
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                >
                  <option value="">Şehir seçin</option>
                  {iller.map((il) => (
                    <option key={il} value={il}>
                      {il}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlçe
              </label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                disabled={!form.city}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {form.city ? "İlçe seçin (opsiyonel)" : "Önce şehir seçin"}
                </option>
                {ilceler.map((ilce) => (
                  <option key={ilce} value={ilce}>
                    {ilce}
                  </option>
                ))}
              </select>
            </div>

            {/* RESİM YÜKLEME (opsiyonel) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fotoğraf (opsiyonel)
              </label>

              {resimUrl ? (
                <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                  <div className="relative w-full h-48 mb-3 bg-gray-100 rounded overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resimUrl}
                      alt="Yüklenen resim"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setResimUrl("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-red-600 hover:underline text-xs font-medium"
                  >
                    🗑️ Resmi Kaldır
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50/30 transition"
                >
                  {resimYukleniyor ? (
                    <p className="text-sm text-gray-500">⏳ Resim yükleniyor...</p>
                  ) : (
                    <>
                      <p className="text-3xl mb-2">📷</p>
                      <p className="text-sm text-gray-700 font-medium">
                        Fotoğraf seçmek için tıklayın
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG — Maks 5 MB
                      </p>
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleResimSec}
                className="hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama (opsiyonel)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="İlanınız hakkında detaylı bilgi verin..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {mesaj && (
              <div className="text-sm text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md p-2">
                {mesaj}
              </div>
            )}

            <button
              type="submit"
              disabled={resimYukleniyor}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition disabled:opacity-50"
            >
              İlanı Yayınla
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}