// app/api/admin/ilan/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
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

    // İşlem bilgisi
    const body = await request.json();
    const { ilanId, islem } = body;

    if (!ilanId || !islem) {
      return NextResponse.json(
        { hata: "İlan ID ve işlem gerekli." },
        { status: 400 }
      );
    }

    const ilan = await prisma.listing.findUnique({
      where: { id: ilanId },
    });

    if (!ilan) {
      return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
    }

    // İşleme göre hareket et
    if (islem === "onayla") {
      await prisma.listing.update({
        where: { id: ilanId },
        data: { status: "ACTIVE" },
      });
      return NextResponse.json({ mesaj: "İlan onaylandı." });
    }

    if (islem === "reddet") {
      await prisma.listing.update({
        where: { id: ilanId },
        data: { status: "REJECTED" },
      });
      return NextResponse.json({ mesaj: "İlan reddedildi." });
    }

    if (islem === "sil") {
      // Önce ilişkili kayıtları sil
      await prisma.favorite.deleteMany({ where: { listingId: ilanId } });
      await prisma.message.updateMany({
        where: { ilanId: ilanId },
        data: { ilanId: null },
      });
      await prisma.listing.delete({ where: { id: ilanId } });
      return NextResponse.json({ mesaj: "İlan silindi." });
    }

    return NextResponse.json({ hata: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    console.error("Admin ilan işlem hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}