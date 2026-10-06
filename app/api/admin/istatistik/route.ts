// app/api/admin/istatistik/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Yetki kontrolü
    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json({ hata: "Giriş yapmalısınız." }, { status: 401 });
    }

    let kullaniciId = "";
    try {
      const parsed = JSON.parse(cookie.value);
      kullaniciId = parsed.id;
    } catch {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    const kullanici = await prisma.user.findUnique({
      where: { id: kullaniciId },
    });

    if (!kullanici || kullanici.role !== "ADMIN") {
      return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
    }

    // İstatistikleri topla
    const [
      toplamIlan,
      aktifIlan,
      toplamKullanici,
      toplamMesaj,
      toplamFavori,
      sonIlanlar,
    ] = await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { status: "ACTIVE" } }),
      prisma.user.count(),
      prisma.message.count(),
      prisma.favorite.count(),
      prisma.listing.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { user: { select: { name: true } }, category: true },
      }),
    ]);

    return NextResponse.json({
      toplamIlan,
      aktifIlan,
      toplamKullanici,
      toplamMesaj,
      toplamFavori,
      sonIlanlar,
    });
  } catch (error) {
    console.error("Admin istatistik hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}