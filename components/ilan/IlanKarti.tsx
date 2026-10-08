// components/ilan/IlanKarti.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export type IlanKartiProps = {
  id: number | string;
  baslik: string;
  konum: string;
  fiyat: string;
  resim: string;
};

export default function IlanKarti({
  id,
  baslik,
  konum,
  fiyat,
  resim,
}: IlanKartiProps) {
  const [resimHata, setResimHata] = useState(false);
  const resimVar = resim && resim.trim() && !resimHata;

  return (
    <Link
      href={`/ilan/${id}`}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group block"
    >
      <div className="w-full h-32 bg-gray-100 overflow-hidden">
        {resimVar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resim}
            alt=""
            onError={() => setResimHata(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>
      <div className="p-2">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 h-8 leading-tight">
          {baslik}
        </h3>
        <p className="text-[10px] text-gray-500 mt-1">{konum}</p>
        <p className="text-sm font-bold text-gray-900 mt-1">{fiyat}</p>
      </div>
    </Link>
  );
}