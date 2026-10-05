// app/kayit/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function KayitSayfasi() {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [sehir, setSehir] = useState("");
  const [sifre, setSifre] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("Kayıt yapılıyor...");

    const res = await fetch("/api/kayit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: ad,
        email,
        phone: telefon,
        city: sehir,
        password: sifre,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => {
        window.location.href = "/giris";
      }, 1500);
    } else {
      setMesaj(`❌ ${data.hata || "Kayıt başarısız"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Kayıt Ol
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Ücretsiz hesap oluşturun
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                required
                placeholder="Adınız Soyadınız"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@mail.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon (opsiyonel)
              </label>
              <input
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="0555 000 00 00"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şehir (opsiyonel)
              </label>
              <input
                type="text"
                value={sehir}
                onChange={(e) => setSehir(e.target.value)}
                placeholder="İstanbul"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
                minLength={6}
                placeholder="En az 6 karakter"
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
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-md transition"
            >
              Kayıt Ol
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-yellow-600 hover:underline font-medium">
              Giriş Yap
            </Link>
          </div>

          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600">
            Kayıt olarak <strong>Kullanım Şartları</strong> ve{" "}
            <strong>Gizlilik Politikası</strong>&apos;nı kabul etmiş olursunuz.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}