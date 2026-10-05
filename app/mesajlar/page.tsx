// app/mesajlar/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

type Kisi = { id: string; name: string; email: string; city: string | null };

type Mesaj = {
  id: string;
  icerik: string;
  okundu: boolean;
  createdAt: string;
  gonderen?: Kisi;
  alici?: Kisi;
  ilan: { id: string; title: string } | null;
};

export default function MesajlarSayfasi() {
  const router = useRouter();
  const [sekme, setSekme] = useState<"gelen" | "giden">("gelen");
  const [gelenMesajlar, setGelenMesajlar] = useState<Mesaj[]>([]);
  const [gidenMesajlar, setGidenMesajlar] = useState<Mesaj[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [acikMesaj, setAcikMesaj] = useState<Mesaj | null>(null);
  const [yanit, setYanit] = useState("");
  const [gonderiyor, setGonderiyor] = useState(false);
  const [yanitMesaj, setYanitMesaj] = useState("");

  const yukle = async () => {
    try {
      const [gelenRes, gidenRes] = await Promise.all([
        fetch("/api/mesajlar?tip=gelen").then((r) => r.json()),
        fetch("/api/mesajlar?tip=giden").then((r) => r.json()),
      ]);

      if (gelenRes.hata) {
        router.push("/giris");
        return;
      }

      setGelenMesajlar(gelenRes.mesajlar || []);
      setGidenMesajlar(gidenRes.mesajlar || []);
      setYukleniyor(false);
    } catch {
      router.push("/giris");
    }
  };

  useEffect(() => {
    yukle();
  }, []);

  const mesajAc = async (mesaj: Mesaj) => {
    setAcikMesaj(mesaj);
    setYanit("");
    setYanitMesaj("");

    if (!mesaj.okundu && sekme === "gelen") {
      await fetch("/api/mesaj-oku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesajId: mesaj.id }),
      });

      setGelenMesajlar(
        gelenMesajlar.map((m) =>
          m.id === mesaj.id ? { ...m, okundu: true } : m
        )
      );
    }
  };

  const yanitGonder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acikMesaj || !yanit.trim() || !acikMesaj.gonderen) return;

    setGonderiyor(true);
    setYanitMesaj("");

    const res = await fetch("/api/mesaj-gonder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aliciId: acikMesaj.gonderen.id,
        ilanId: acikMesaj.ilan?.id || null,
        icerik: yanit.trim(),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setYanitMesaj("✅ Yanıtınız gönderildi!");
      setYanit("");
      setTimeout(() => setYanitMesaj(""), 2000);
      yukle(); // giden kutusunu güncelle
    } else {
      setYanitMesaj(`❌ ${data.hata || "Gönderilemedi"}`);
    }
    setGonderiyor(false);
  };

  const aktifMesajlar = sekme === "gelen" ? gelenMesajlar : gidenMesajlar;
  const okunmamisSayi = gelenMesajlar.filter((m) => !m.okundu).length;

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

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mesajlarım</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gelen: <strong>{gelenMesajlar.length}</strong> · Gönderilen:{" "}
            <strong>{gidenMesajlar.length}</strong>
          </p>
        </div>

        {/* Sekmeler */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setSekme("gelen")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition -mb-px ${
              sekme === "gelen"
                ? "border-yellow-500 text-yellow-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📥 Gelen Kutusu ({gelenMesajlar.length})
            {okunmamisSayi > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {okunmamisSayi}
              </span>
            )}
          </button>
          <button
            onClick={() => setSekme("giden")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition -mb-px ${
              sekme === "giden"
                ? "border-yellow-500 text-yellow-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📤 Gönderilenler ({gidenMesajlar.length})
          </button>
        </div>

        {aktifMesajlar.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-2">
              {sekme === "gelen"
                ? "Henüz gelen mesajınız yok."
                : "Henüz gönderilmiş mesajınız yok."}
            </p>
            <p className="text-xs text-gray-400">
              {sekme === "gelen"
                ? "Bir ilana tıklayıp 'İletişime Geç' butonuyla mesaj gönderebilirsiniz."
                : "İlanlardaki 'İletişime Geç' butonu ile mesaj gönderebilirsiniz."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {aktifMesajlar.map((mesaj) => {
              const karsi = sekme === "gelen" ? mesaj.gonderen : mesaj.alici;
              if (!karsi) return null;

              return (
                <button
                  key={mesaj.id}
                  onClick={() => mesajAc(mesaj)}
                  className={`w-full text-left bg-white rounded-lg border p-4 hover:shadow-md transition ${
                    sekme === "gelen" && !mesaj.okundu
                      ? "border-yellow-300 bg-yellow-50/30"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {karsi.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900 text-sm">
                          {karsi.name}
                        </p>
                        {sekme === "gelen" && !mesaj.okundu && (
                          <span className="bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            YENİ
                          </span>
                        )}
                        {sekme === "giden" && (
                          <span className="text-[10px] text-gray-400">
                            → Gönderildi
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {karsi.email}
                        {karsi.city && ` · ${karsi.city}`}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {mesaj.icerik}
                      </p>
                      {mesaj.ilan && (
                        <p className="text-xs text-blue-600 mt-2">
                          📎 İlgili ilan: {mesaj.ilan.title}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-2">
                        {new Date(mesaj.createdAt).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Modal */}
      {acikMesaj && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-4 py-8 overflow-y-auto"
          onClick={() => setAcikMesaj(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const karsi =
                sekme === "gelen" ? acikMesaj.gonderen : acikMesaj.alici;
              if (!karsi) return null;

              return (
                <>
                  <div className="flex justify-between items-start p-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {karsi.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {karsi.name}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {karsi.email}
                          {karsi.city && ` · ${karsi.city}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAcikMesaj(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-6 pb-4">
                    <div
                      className={`border rounded-lg p-4 mb-3 ${
                        sekme === "gelen"
                          ? "bg-gray-50 border-gray-200"
                          : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <p className="text-xs text-gray-500 mb-2">
                        <strong>
                          {sekme === "gelen"
                            ? acikMesaj.gonderen?.name
                            : "Siz"}
                        </strong>{" "}
                        · {new Date(acikMesaj.createdAt).toLocaleString("tr-TR")}
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                        {acikMesaj.icerik}
                      </p>
                    </div>

                    {acikMesaj.ilan && (
                      <Link
                        href={`/ilan/${acikMesaj.ilan.id}`}
                        onClick={() => setAcikMesaj(null)}
                        className="inline-block text-xs text-blue-600 hover:underline"
                      >
                        📎 İlgili ilan: <strong>{acikMesaj.ilan.title}</strong>
                      </Link>
                    )}
                  </div>

                  {sekme === "gelen" && (
                    <div className="p-6 pt-0 border-t border-gray-200">
                      <h3 className="text-sm font-bold text-gray-800 mb-3 mt-4">
                        ✍️ Yanıtla
                      </h3>
                      <form onSubmit={yanitGonder} className="space-y-3">
                        <textarea
                          value={yanit}
                          onChange={(e) => setYanit(e.target.value)}
                          required
                          rows={3}
                          maxLength={500}
                          placeholder="Yanıtınızı buraya yazın..."
                          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                        />
                        <p className="text-xs text-gray-400 text-right -mt-2">
                          {yanit.length}/500
                        </p>

                        {yanitMesaj && (
                          <div className="text-sm text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md p-2">
                            {yanitMesaj}
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={gonderiyor || yanit.trim().length === 0}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-md transition disabled:opacity-50"
                          >
                            {gonderiyor ? "Gönderiliyor..." : "Yanıtı Gönder"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setAcikMesaj(null)}
                            className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition"
                          >
                            Kapat
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {sekme === "giden" && (
                    <div className="p-6 pt-4 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => setAcikMesaj(null)}
                        className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition"
                      >
                        Kapat
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}