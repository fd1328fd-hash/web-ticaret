// app/api/mesaj-gonder/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aliciId, ilanId, icerik } = body;

    if (!aliciId || !icerik?.trim()) {
      return NextResponse.json(
        { hata: "Alıcı ve mesaj içeriği zorunludur." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json(
        { hata: "Mesaj göndermek için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    let gonderenId = "";
    try {
      const parsed = JSON.parse(cookie.value);
      gonderenId = parsed.id;
    } catch {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    if (gonderenId === aliciId) {
      return NextResponse.json(
        { hata: "Kendi ilanınıza mesaj gönderemezsiniz." },
        { status: 400 }
      );
    }

    const mesaj = await prisma.message.create({
      data: {
        icerik: icerik.trim(),
        gonderenId,
        aliciId,
        ilanId: ilanId || null,
      },
    });

    return NextResponse.json(
      { mesaj: "Mesaj gönderildi!", id: mesaj.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}