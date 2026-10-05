// app/api/favoriler/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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

    const favoriler = await prisma.favorite.findMany({
      where: { userId: kullaniciId },
      include: {
        listing: {
          include: { category: true },
        },
      },
    });

    const ilanlar = favoriler.map((f) => f.listing);

    return NextResponse.json({ ilanlar });
  } catch (error) {
    console.error("Favoriler hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}