import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Son48Page() {
  const ikiGunOnce = new Date();
  ikiGunOnce.setDate(ikiGunOnce.getDate() - 2);

  const ilanlar = await prisma.listing.findMany({
    where: {
      createdAt: {
        gte: ikiGunOnce
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Son 48 Saat İlanları</h1>
      
      {ilanlar.length === 0 ? (
        <p className="text-gray-500">Son 48 saat içinde eklenmiş ilan bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ilanlar.map((ilan) => (
            <Link key={ilan.id} href={`/ilan/${ilan.id}`} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-40 bg-gray-100 relative">
                {ilan.images && ilan.images.length > 0 ? (
                  <img src={ilan.images[0]} alt={ilan.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Fotoğraf Yok</div>
                )}
              </div>
              <div className="p-3">
                <div className="font-semibold text-gray-800 text-sm truncate">{ilan.title}</div>
                <div className="text-xs text-gray-500 mt-1">{ilan.city} / {ilan.district}</div>
                <div className="text-sm font-bold text-gray-900 mt-2">
                  {ilan.price > 0 ? `${ilan.price.toLocaleString('tr-TR')} TL` : 'Fiyat Yok'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}