// components/ilan/FavoriButonu.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoriButonu({
  ilanId,
  baslangicFavori,
  girisYapildi,
}: {
  ilanId: string;
  baslangicFavori: boolean;
  girisYapildi: boolean;
}) {
  const router = useRouter();
  const [favori, setFavori] = useState(baslangicFavori);
  const [yukleniyor, setYukleniyor] = useState(false);

  const tikla = async () => {
    if (!girisYapildi) {
      router.push("/giris");
      return;
    }

    setYukleniyor(true);
    const res = await fetch("/api/favori", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId }),
    });

    const data = await res.json();

    if (res.ok) {
      setFavori(data.favori);
    } else {
      alert(data.hata || "İşlem başarısız.");
    }
    setYukleniyor(false);
  };

  return (
    <button
      onClick={tikla}
      disabled={yukleniyor}
      className={`w-full font-medium py-3 rounded-md transition border ${
        favori
          ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
          : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
      } disabled:opacity-50`}
    >
      {yukleniyor
        ? "..."
        : favori
        ? "♥ Favorilerden Çıkar"
        : "♡ Favorilere Ekle"}
    </button>
  );
}