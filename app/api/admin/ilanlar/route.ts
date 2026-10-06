// app/api/admin/ilanlar/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function yetkiKontrol() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("kullanici");
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie.value);
    const kullanici = await prisma.user.findUnique({
      where: { id: parsed.id },
    });
    if (!kullanici || kullanici.role !== "ADMIN") return null;
    return kullanici;
  } catch {
    return null;
  }
}

// Tüm ilanları getir
export async function GET() {
  const admin = await yetkiKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  const ilanlar = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      category: true,
    },
  });

  return NextResponse.json({ ilanlar });
}

// İlan sil
export async function POST(request: Request) {
  const admin = await yetkiKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { ilanId, islem } = body;

    if (!ilanId || !islem) {
      return NextResponse.json({ hata: "Eksik parametre." }, { status: 400 });
    }

    if (islem === "sil") {
      // Favorileri sil
      await prisma.favorite.deleteMany({ where: { listingId: ilanId } });
      // Mesajlarla ilişkiyi kopar
      await prisma.message.updateMany({
        where: { ilanId },
        data: { ilanId: null },
      });
      // İlanı sil
      await prisma.listing.delete({ where: { id: ilanId } });
      return NextResponse.json({ mesaj: "İlan silindi." });
    }

    if (islem === "durum") {
      const { yeniDurum } = body;
      await prisma.listing.update({
        where: { id: ilanId },
        data: { status: yeniDurum },
      });
      return NextResponse.json({ mesaj: "Durum güncellendi." });
    }

    return NextResponse.json({ hata: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    console.error("Admin ilan hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}