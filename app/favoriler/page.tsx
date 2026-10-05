// app/favoriler/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IlanKarti from "@/components/ilan/IlanKarti";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function FavorilerSayfasi() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("kullanici");

  if (!cookie) {
    redirect("/giris");
  }

  let kullaniciId = "";
  try {
    const parsed = JSON.parse(cookie.value);
    kullaniciId = parsed.id;
  } catch {
    redirect("/giris");
  }

  const favoriler = await prisma.favorite.findMany({
    where: { userId: kullaniciId },
    include: {
      listing: {
        include: { category: true },
      },
    },
  });

  const ilanlar = favoriler.map((f) => f.listing);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
          <p className="text-sm text-gray-500 mt-1">
            Toplam <strong>{ilanlar.length}</strong> favori ilanınız var.
          </p>
        </div>

        {ilanlar.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">
              Henüz favori ilanınız yok.
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              İlanlara Göz At
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {ilanlar.map((ilan) => {
              let resim = "https://picsum.photos/seed/1/400/300";
              try {
                const parsed = JSON.parse(ilan.images);
                if (Array.isArray(parsed) && parsed[0]) resim = parsed[0];
              } catch {}

              return (
                <IlanKarti
                  key={ilan.id}
                  id={ilan.id}
                  baslik={ilan.title}
                  konum={ilan.city}
                  fiyat={
                    ilan.price > 0
                      ? `${ilan.price.toLocaleString("tr-TR")} TL`
                      : "Fiyat Yok"
                  }
                  resim={resim}
                />
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}