// app/api/mesaj-oku/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mesajId } = body;

    if (!mesajId) {
      return NextResponse.json({ hata: "Mesaj ID gerekli." }, { status: 400 });
    }

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

    const mesaj = await prisma.message.findUnique({
      where: { id: mesajId },
    });

    if (!mesaj || mesaj.aliciId !== kullaniciId) {
      return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
    }

    await prisma.message.update({
      where: { id: mesajId },
      data: { okundu: true },
    });

    return NextResponse.json({ mesaj: "Okundu olarak işaretlendi." });
  } catch (error) {
    console.error("Mesaj okuma hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}