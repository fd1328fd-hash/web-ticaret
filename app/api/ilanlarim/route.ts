// app/api/ilanlarim/route.ts
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
    let kullaniciAdi = "";
    try {
      const parsed = JSON.parse(cookie.value);
      kullaniciId = parsed.id;
      kullaniciAdi = parsed.name;
    } catch {
      return NextResponse.json(
        { hata: "Oturum geçersiz." },
        { status: 401 }
      );
    }

    const ilanlar = await prisma.listing.findMany({
      where: { userId: kullaniciId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return NextResponse.json({ ilanlar, kullaniciAdi });
  } catch (error) {
    console.error("İlanlarım hatası:", error);
    return NextResponse.json(
      { hata: "Sunucu hatası." },
      { status: 500 }
    );
  }
}