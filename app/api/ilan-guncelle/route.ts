// app/api/ilan-guncelle/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ilanId, title, description, price, city, district, categorySlug, imageUrl } = body;

    if (!ilanId || !title || !description || !city || !categorySlug) {
      return NextResponse.json(
        { hata: "Gerekli alanları doldurun." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json(
        { hata: "Giriş yapmalısınız." },
        { status: 401 }
      );
    }

    let kullaniciId = "";
    try {
      const parsed = JSON.parse(cookie.value);
      kullaniciId = parsed.id;
    } catch {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    const mevcutIlan = await prisma.listing.findUnique({
      where: { id: ilanId },
    });

    if (!mevcutIlan) {
      return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
    }

    if (mevcutIlan.userId !== kullaniciId) {
      return NextResponse.json(
        { hata: "Bu ilanı düzenleme yetkiniz yok." },
        { status: 403 }
      );
    }

    const kategori = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!kategori) {
      return NextResponse.json({ hata: "Kategori bulunamadı." }, { status: 400 });
    }

    // Resim: yeni URL verilmediyse eskisini koru
    let yeniResim = mevcutIlan.images;
    if (imageUrl?.trim()) {
      yeniResim = JSON.stringify([imageUrl.trim()]);
    }

    const guncellenmis = await prisma.listing.update({
      where: { id: ilanId },
      data: {
        title,
        description,
        price: Number(price) || 0,
        city,
        district: district || null,
        images: yeniResim,
        categoryId: kategori.id,
      },
    });

    return NextResponse.json(
      {
        mesaj: "İlan güncellendi.",
        ilan: { id: guncellenmis.id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("İlan güncelleme hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}