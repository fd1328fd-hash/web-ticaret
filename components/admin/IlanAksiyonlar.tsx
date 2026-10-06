// components/admin/IlanAksiyonlar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IlanAksiyonlar({
  ilanId,
  baslik,
  mevcutStatus,
}: {
  ilanId: string;
  baslik: string;
  mevcutStatus: string;
}) {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState<string | null>(null);

  const islemYap = async (islem: string) => {
    if (islem === "sil") {
      if (!confirm(`"${baslik}" ilanını silmek istediğinizden emin misiniz?`)) {
        return;
      }
    }

    setYukleniyor(islem);
    const res = await fetch("/api/admin/ilan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ilanId, islem }),
    });

    const data = await res.json();

    if (res.ok) {
      router.refresh();
    } else {
      alert(data.hata || "İşlem başarısız.");
    }
    setYukleniyor(null);
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      {mevcutStatus !== "ACTIVE" && (
        <button
          onClick={() => islemYap("onayla")}
          disabled={yukleniyor !== null}
          className="text-xs font-medium text-green-600 hover:underline disabled:opacity-50"
        >
          {yukleniyor === "onayla" ? "..." : "✓ Onayla"}
        </button>
      )}
      {mevcutStatus !== "REJECTED" && (
        <button
          onClick={() => islemYap("reddet")}
          disabled={yukleniyor !== null}
          className="text-xs font-medium text-orange-600 hover:underline disabled:opacity-50"
        >
          {yukleniyor === "reddet" ? "..." : "✕ Reddet"}
        </button>
      )}
      <button
        onClick={() => islemYap("sil")}
        disabled={yukleniyor !== null}
        className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
      >
        {yukleniyor === "sil" ? "..." : "🗑 Sil"}
      </button>
    </div>
  );
}