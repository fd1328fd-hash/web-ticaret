// app/api/admin/kullanicilar/route.ts
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

export async function GET() {
  const admin = await yetkiKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  const kullanicilar = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          listings: true,
          favorites: true,
          gonderilenMesajlar: true,
        },
      },
    },
  });

  return NextResponse.json({ kullanicilar });
}

export async function POST(request: Request) {
  const admin = await yetkiKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { kullaniciId, islem, yeniRol } = body;

    if (!kullaniciId || !islem) {
      return NextResponse.json({ hata: "Eksik parametre." }, { status: 400 });
    }

    // Kendini silmesin / rolünü değiştirmesin
    if (kullaniciId === admin.id) {
      return NextResponse.json(
        { hata: "Kendi hesabınızda işlem yapamazsınız." },
        { status: 400 }
      );
    }

    if (islem === "rol") {
      await prisma.user.update({
        where: { id: kullaniciId },
        data: { role: yeniRol },
      });
      return NextResponse.json({ mesaj: "Rol güncellendi." });
    }

    if (islem === "sil") {
      // Bağımlı kayıtları temizle
      await prisma.favorite.deleteMany({ where: { userId: kullaniciId } });
      await prisma.message.deleteMany({
        where: {
          OR: [{ gonderenId: kullaniciId }, { aliciId: kullaniciId }],
        },
      });
      await prisma.listing.deleteMany({ where: { userId: kullaniciId } });
      await prisma.user.delete({ where: { id: kullaniciId } });
      return NextResponse.json({ mesaj: "Kullanıcı silindi." });
    }

    return NextResponse.json({ hata: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    console.error("Admin kullanıcı hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}