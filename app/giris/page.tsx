// app/giris/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function GirisSayfasi() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("Giriş yapılıyor...");

    const res = await fetch("/api/giris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, sifre }),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      setMesaj(`❌ ${data.hata || "Giriş başarısız"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Giriş Yap
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Hesabınıza giriş yapın
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                Şifre
              </label>
              <input
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
                placeholder="••••••••"
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
              Giriş Yap
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-yellow-600 hover:underline font-medium">
              Kayıt Ol
            </Link>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
            <strong>Demo hesap:</strong><br />
            E-posta: demo@sahibinden.com<br />
            Şifre: demo123
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}