// components/ilan/IletisimButonu.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IletisimButonu({
  aliciId,
  ilanId,
  ilanBaslik,
  girisYapildi,
}: {
  aliciId: string;
  ilanId: string;
  ilanBaslik: string;
  girisYapildi: boolean;
}) {
  const router = useRouter();
  const [modalAcik, setModalAcik] = useState(false);
  const [icerik, setIcerik] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [gonderiyor, setGonderiyor] = useState(false);

  const tikla = () => {
    if (!girisYapildi) {
      router.push("/giris");
      return;
    }
    setModalAcik(true);
    setMesaj("");
    setIcerik(
      `Merhaba, "${ilanBaslik}" ilanınızla ilgileniyorum. Detaylı bilgi alabilir miyim?`
    );
  };

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    setGonderiyor(true);
    setMesaj("");

    const res = await fetch("/api/mesaj-gonder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aliciId, ilanId, icerik }),
    });

    const data = await res.json();

    if (res.ok) {
      setMesaj("✅ Mesaj gönderildi!");
      setTimeout(() => {
        setModalAcik(false);
        setIcerik("");
        router.refresh();
      }, 1500);
    } else {
      setMesaj(`❌ ${data.hata || "Gönderilemedi"}`);
    }
    setGonderiyor(false);
  };

  return (
    <>
      <button
        onClick={tikla}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition"
      >
        İletişime Geç
      </button>

      {modalAcik && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center px-4"
          onClick={() => setModalAcik(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Mesaj Gönder
              </h2>
              <button
                onClick={() => setModalAcik(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              İlan: <strong>{ilanBaslik}</strong>
            </p>

            <form onSubmit={gonder} className="space-y-4">
              <textarea
                value={icerik}
                onChange={(e) => setIcerik(e.target.value)}
                required
                rows={5}
                maxLength={500}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-400 text-right">
                {icerik.length}/500
              </p>

              {mesaj && (
                <div className="text-sm text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md p-2">
                  {mesaj}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={gonderiyor || icerik.trim().length === 0}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-md transition disabled:opacity-50"
                >
                  {gonderiyor ? "Gönderiliyor..." : "Mesajı Gönder"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalAcik(false)}
                  className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}