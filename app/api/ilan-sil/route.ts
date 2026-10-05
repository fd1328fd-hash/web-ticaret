// app/api/ilan-sil/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ilanId } = body;

    if (!ilanId) {
      return NextResponse.json(
        { hata: "İlan ID gerekli." },
        { status: 400 }
      );
    }

    // Kullanıcıyı cookie'den oku
    const cookieStore = await cookies();
    const kullaniciCookie = cookieStore.get("kullanici");

    if (!kullaniciCookie) {
      return NextResponse.json(
        { hata: "Giriş yapmalısınız." },
        { status: 401 }
      );
    }

    let kullaniciId = "";
    try {
      const parsed = JSON.parse(kullaniciCookie.value);
      kullaniciId = parsed.id;
    } catch {
      return NextResponse.json(
        { hata: "Oturum geçersiz." },
        { status: 401 }
      );
    }

    // İlanı bul
    const ilan = await prisma.listing.findUnique({
      where: { id: ilanId },
    });

    if (!ilan) {
      return NextResponse.json(
        { hata: "İlan bulunamadı." },
        { status: 404 }
      );
    }

    // Sadece ilan sahibi silebilir
    if (ilan.userId !== kullaniciId) {
      return NextResponse.json(
        { hata: "Bu ilanı silme yetkiniz yok." },
        { status: 403 }
      );
    }

    // İlanı sil
    await prisma.listing.delete({
      where: { id: ilanId },
    });

    return NextResponse.json(
      { mesaj: "İlan başarıyla silindi." },
      { status: 200 }
    );
  } catch (error) {
    console.error("İlan silme hatası:", error);
    return NextResponse.json(
      { hata: "Sunucu hatası." },
      { status: 500 }
    );
  }
}