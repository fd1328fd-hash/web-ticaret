// app/api/favori/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Favoriye ekle / çıkar (toggle)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ilanId } = body;

    if (!ilanId) {
      return NextResponse.json({ hata: "İlan ID gerekli." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json(
        { hata: "Favorilere eklemek için giriş yapmalısınız." },
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

    // Zaten favoride mi?
    const mevcut = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: kullaniciId,
          listingId: ilanId,
        },
      },
    });

    if (mevcut) {
      // Çıkar
      await prisma.favorite.delete({
        where: { id: mevcut.id },
      });
      return NextResponse.json({ mesaj: "Favoriden çıkarıldı.", favori: false });
    } else {
      // Ekle
      await prisma.favorite.create({
        data: {
          userId: kullaniciId,
          listingId: ilanId,
        },
      });
      return NextResponse.json({ mesaj: "Favorilere eklendi.", favori: true });
    }
  } catch (error) {
    console.error("Favori hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}