// app/api/mesajlar/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tip = searchParams.get("tip") || "gelen"; // "gelen" veya "giden"

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

    if (tip === "giden") {
      // Gönderilen mesajlar
      const mesajlar = await prisma.message.findMany({
        where: { gonderenId: kullaniciId },
        orderBy: { createdAt: "desc" },
        include: {
          alici: {
            select: { id: true, name: true, email: true, city: true },
          },
          ilan: { select: { id: true, title: true } },
        },
      });

      return NextResponse.json({ mesajlar, tip: "giden" });
    }

    // Gelen mesajlar (varsayılan)
    const mesajlar = await prisma.message.findMany({
      where: { aliciId: kullaniciId },
      orderBy: { createdAt: "desc" },
      include: {
        gonderen: {
          select: { id: true, name: true, email: true, city: true },
        },
        ilan: { select: { id: true, title: true } },
      },
    });

    const okunmamisSayi = mesajlar.filter((m) => !m.okundu).length;
    return NextResponse.json({ mesajlar, okunmamisSayi, tip: "gelen" });
  } catch (error) {
    console.error("Mesajlar hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");
    if (!cookie) return NextResponse.json({ hata: "Giriş yapmalısınız." }, { status: 401 });

    let kullaniciId = "";
    try {
      const parsed = JSON.parse(cookie.value);
      kullaniciId = parsed.id;
    } catch {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    await prisma.message.updateMany({
      where: { aliciId: kullaniciId, okundu: false },
      data: { okundu: true },
    });

    return NextResponse.json({ mesaj: "Tüm mesajlar okundu." });
  } catch (error) {
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}