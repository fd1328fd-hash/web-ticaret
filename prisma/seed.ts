// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed başlıyor...");

  // Önce eski verileri temizle
  await prisma.listing.deleteMany();
  await prisma.category.deleteMany();
  console.log("🧹 Eski veriler temizlendi.");

  // Kategorileri oluştur
  const kategoriler = await Promise.all([
    prisma.category.create({
      data: { name: "Emlak", slug: "emlak", icon: "🏢" },
    }),
    prisma.category.create({
      data: { name: "Vasıta", slug: "vasita", icon: "🏍️" },
    }),
    prisma.category.create({
      data: { name: "Ev & Yaşam", slug: "ev-yasam", icon: "🛋️" },
    }),
    prisma.category.create({
      data: { name: "İş Makineleri", slug: "is-makineleri", icon: "🏗️" },
    }),
    prisma.category.create({
      data: { name: "Emlak360", slug: "emlak360", icon: "🏠" },
    }),
    prisma.category.create({
      data: { name: "Oto360", slug: "oto360", icon: "🚗" },
    }),
    prisma.category.create({
      data: { name: "Acil Acil", slug: "acil-acil", icon: "🚨" },
    }),
  ]);

  console.log(`✅ ${kategoriler.length} kategori oluşturuldu.`);

  // Kategori ID'lerini al
  const katMap: Record<string, string> = {};
  kategoriler.forEach((k) => {
    katMap[k.slug] = k.id;
  });

  // Örnek kullanıcı (ilan sahibi)
  const kullanici = await prisma.user.create({
    data: {
      email: "demo@sahibinden.com",
      name: "Demo Kullanıcı",
      phone: "0555 000 00 00",
      password: "demo123",
      city: "İstanbul",
    },
  });

  console.log("👤 Demo kullanıcı oluşturuldu.");

  // 20 ilan oluştur
  const ilanlar = [
    { title: "Aksaray Satılık Otel", city: "Aksaray", district: "Merkez", price: 0, categorySlug: "emlak", imgSeed: 1 },
    { title: "Köyceğiz Beyobası Satılık Arsa", city: "Muğla", district: "Köyceğiz", price: 1950000, categorySlug: "emlak", imgSeed: 2 },
    { title: "Sahibinden Invicta Koltuk Takımı", city: "İstanbul", district: "Kadıköy", price: 4500, categorySlug: "ev-yasam", imgSeed: 3 },
    { title: "Aft Oto 1.99 Kredi Fırsatı", city: "Ankara", district: "Çankaya", price: 0, categorySlug: "vasita", imgSeed: 4 },
    { title: "Ticari Konut Caddebostan", city: "İstanbul", district: "Kadıköy", price: 12500000, categorySlug: "emlak", imgSeed: 5 },
    { title: "Katta Tek Daire Kiralık", city: "İzmir", district: "Bornova", price: 18000, categorySlug: "emlak", imgSeed: 6 },
    { title: "Bahçeşehir Yeni Bina", city: "İstanbul", district: "Başakşehir", price: 8750000, categorySlug: "emlak", imgSeed: 7 },
    { title: "Silivri'de Havuzlu Villa", city: "İstanbul", district: "Silivri", price: 15000000, categorySlug: "emlak", imgSeed: 8 },
    { title: "Raimondi Kule Vinç", city: "Ankara", district: "Yenimahalle", price: 0, categorySlug: "is-makineleri", imgSeed: 9 },
    { title: "Yarı Fiyatına İndi! Acil!", city: "İstanbul", district: "Beşiktaş", price: 2750000, categorySlug: "emlak", imgSeed: 10 },
    { title: "Balıkesir Açıklaması", city: "Balıkesir", district: "Merkez", price: 0, categorySlug: "emlak", imgSeed: 11 },
    { title: "İç Bayraklı Bavullar", city: "İzmir", district: "Bayraklı", price: 1200, categorySlug: "ev-yasam", imgSeed: 12 },
    { title: "120.000 Yıllıkta İkinci El", city: "Bursa", district: "Nilüfer", price: 450000, categorySlug: "vasita", imgSeed: 13 },
    { title: "Komponent Koaksiyon", city: "Kocaeli", district: "Gebze", price: 0, categorySlug: "is-makineleri", imgSeed: 14 },
    { title: "Tertemiz Bayi Çıkışı", city: "Ankara", district: "Keçiören", price: 1100000, categorySlug: "vasita", imgSeed: 15 },
    { title: "Sahibinden Kuşadası", city: "Aydın", district: "Kuşadası", price: 3400000, categorySlug: "emlak", imgSeed: 16 },
    { title: "Güçbir Jeneratör", city: "İstanbul", district: "Ümraniye", price: 85000, categorySlug: "is-makineleri", imgSeed: 17 },
    { title: "33.5 Dönüm Yola", city: "Tekirdağ", district: "Çorlu", price: 5500000, categorySlug: "emlak", imgSeed: 18 },
    { title: "Urla Ferla De Kiralık", city: "İzmir", district: "Urla", price: 45000, categorySlug: "emlak", imgSeed: 19 },
    { title: "Ürkü Ayvalıkta Satılık", city: "Balıkesir", district: "Ayvalık", price: 2800000, categorySlug: "emlak", imgSeed: 20 },
  ];

  for (const i of ilanlar) {
    await prisma.listing.create({
      data: {
        title: i.title,
        description: `${i.title} - Detaylı bilgi için iletişime geçin.`,
        price: i.price,
        city: i.city,
        district: i.district,
        images: JSON.stringify([`https://picsum.photos/seed/${i.imgSeed}/800/600`]),
        status: "ACTIVE",
        userId: kullanici.id,
        categoryId: katMap[i.categorySlug],
      },
    });
  }

  console.log(`✅ ${ilanlar.length} ilan oluşturuldu.`);
  console.log("🎉 Seed tamamlandı!");
}

main()
  .catch((e) => {
    console.error("❌ Hata:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });