// app/api/profil/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// Kullanıcı bilgilerini getir
export async function GET() {
  try {
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
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        createdAt: true,
      },
    });

    if (!kullanici) {
      return NextResponse.json({ hata: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ kullanici });
  } catch (error) {
    console.error("Profil GET hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

// Kullanıcı bilgilerini güncelle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, yeniSifre } = body;

    if (!name) {
      return NextResponse.json({ hata: "Ad zorunludur." }, { status: 400 });
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

    // Güncelleme verisi
    const data: {
      name: string;
      phone: string | null;
      city: string | null;
      password?: string;
    } = {
      name,
      phone: phone || null,
      city: city || null,
    };

    // Şifre değişecekse hashle
    if (yeniSifre && yeniSifre.trim().length > 0) {
      if (yeniSifre.length < 6) {
        return NextResponse.json(
          { hata: "Yeni şifre en az 6 karakter olmalı." },
          { status: 400 }
        );
      }
      data.password = await bcrypt.hash(yeniSifre, 10);
    }

    const guncelKullanici = await prisma.user.update({
      where: { id: kullaniciId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
      },
    });

    // Cookie'yi de güncelle (isim değişmiş olabilir)
    cookieStore.set(
      "kullanici",
      JSON.stringify({
        id: guncelKullanici.id,
        name: guncelKullanici.name,
        email: guncelKullanici.email,
      }),
      {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        httpOnly: false,
      }
    );

    return NextResponse.json({
      mesaj: "Profil güncellendi!",
      kullanici: guncelKullanici,
    });
  } catch (error) {
    console.error("Profil POST hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}