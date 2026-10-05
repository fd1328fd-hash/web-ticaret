// app/ara/page.tsx
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import IlanKarti from "@/components/ilan/IlanKarti";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AraSayfasi({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const arama = (q || "").trim();

  const ilanlar = arama
    ? await prisma.listing.findMany({
        where: {
          status: "ACTIVE",
          OR: [
            { title: { contains: arama } },
            { description: { contains: arama } },
            { city: { contains: arama } },
            { district: { contains: arama } },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 flex-1 w-full">
        <Sidebar />

        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {arama ? (
                <>
                  &quot;{arama}&quot; için{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({ilanlar.length} sonuç bulundu)
                  </span>
                </>
              ) : (
                "Arama yapmak için bir kelime yazın"
              )}
            </h2>
            <a href="/" className="text-sm text-blue-600 hover:underline">
              Tüm ilanlar
            </a>
          </div>

          {arama && ilanlar.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">
                &quot;{arama}&quot; için sonuç bulunamadı.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Farklı bir kelime deneyin.
              </p>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}