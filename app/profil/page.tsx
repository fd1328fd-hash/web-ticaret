// app/profil/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

type Kullanici = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  createdAt: string;
};

export default function ProfilSayfasi() {
  const router = useRouter();
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    yeniSifre: "",
  });
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch("/api/profil")
      .then((res) => res.json())
      .then((data) => {
        if (data.hata) {
          router.push("/giris");
          return;
        }
        setKullanici(data.kullanici);
        setForm({
          name: data.kullanici.name || "",
          phone: data.kullanici.phone || "",
          city: data.kullanici.city || "",
          yeniSifre: "",
        });
        setYukleniyor(false);
      })
      .catch(() => router.push("/giris"));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("Kaydediliyor...");

    const res = await fetch("/api/profil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ Profil başarıyla güncellendi!");
      setForm({ ...form, yeniSifre: "" });
      // Cookie'yi güncelle ve navbar'ı yenile
      setTimeout(() => {
        router.refresh();
      }, 500);
    } else {
      setMesaj(`❌ ${data.hata || "Güncellenemedi"}`);
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

      <main className="max-w-3xl mx-auto px-4 py-8 w-full flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profilim</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hesap bilgilerinizi buradan yönetin.
          </p>
        </div>

        {/* Kullanıcı Kartı */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-2xl">
              {kullanici?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {kullanici?.name}
              </h2>
              <p className="text-sm text-gray-500">{kullanici?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Üyelik:{" "}
                {kullanici?.createdAt
                  ? new Date(kullanici.createdAt).toLocaleDateString("tr-TR")
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Bilgi Güncelleme Formu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Bilgileri Güncelle
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta (değiştirilemez)
              </label>
              <input
                type="email"
                value={kullanici?.email || ""}
                disabled
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0555 000 00 00"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şehir
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="İstanbul"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yeni Şifre (değiştirmek istemiyorsanız boş bırakın)
              </label>
              <input
                type="password"
                name="yeniSifre"
                value={form.yeniSifre}
                onChange={handleChange}
                placeholder="En az 6 karakter"
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
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-md transition"
              >
                Bilgileri Kaydet
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition text-center"
              >
                İptal
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}