// app/api/kayit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { hata: "Ad, e-posta ve şifre zorunlu" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { hata: "Şifre en az 6 karakter olmalı" },
        { status: 400 }
      );
    }

    // E-posta zaten kullanılıyor mu?
    const mevcut = await prisma.user.findUnique({
      where: { email },
    });

    if (mevcut) {
      return NextResponse.json(
        { hata: "Bu e-posta zaten kayıtlı" },
        { status: 400 }
      );
    }

    // Yeni kullanıcı oluştur
    const yeniKullanici = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        city: city || null,
        password,
      },
    });

    return NextResponse.json({
      basarili: true,
      kullanici: {
        id: yeniKullanici.id,
        name: yeniKullanici.name,
        email: yeniKullanici.email,
      },
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json(
      { hata: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}