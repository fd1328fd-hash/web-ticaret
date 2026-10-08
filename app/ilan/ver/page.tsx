// app/api/ilan-ver/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, city, district, categorySlug, imageUrl } = body;

    if (!title || !city || !categorySlug) {
      return NextResponse.json(
        { hata: "Başlık, şehir ve kategori zorunludur." },
        { status: 400 }
      );
    }

    if (!imageUrl || !imageUrl.trim()) {
      return NextResponse.json(
        { hata: "Lütfen bir fotoğraf yükleyin." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const kullaniciCookie = cookieStore.get("kullanici");

    if (!kullaniciCookie) {
      return NextResponse.json(
        { hata: "İlan vermek için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    let kullaniciId: string;
    try {
      const parsed = JSON.parse(kullaniciCookie.value);
      kullaniciId = parsed.id;
    } catch {
      return NextResponse.json(
        { hata: "Oturum bilgisi geçersiz." },
        { status: 401 }
      );
    }

    const kategori = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!kategori) {
      return NextResponse.json(
        { hata: "Kategori bulunamadı." },
        { status: 400 }
      );
    }

    const ilan = await prisma.listing.create({
      data: {
        title,
        description: description || "",
        price: Number(price) || 0,
        city,
        district: district || null,
        images: JSON.stringify([imageUrl]),
        status: "ACTIVE",
        userId: kullaniciId,
        categoryId: kategori.id,
      },
    });

    return NextResponse.json(
      { mesaj: "İlan başarıyla oluşturuldu!", ilan: { id: ilan.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("İlan verme hatası:", error);
    return NextResponse.json(
      { hata: "Sunucu hatası." },
      { status: 500 }
    );
  }
}