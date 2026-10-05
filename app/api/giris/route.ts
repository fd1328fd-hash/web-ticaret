// app/api/giris/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, sifre } = body;

    if (!email || !sifre) {
      return NextResponse.json(
        { hata: "E-posta ve şifre zorunludur." },
        { status: 400 }
      );
    }

    const kullanici = await prisma.user.findUnique({
      where: { email },
    });

    if (!kullanici) {
      return NextResponse.json(
        { hata: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    let sifreDogru = false;
    try {
      sifreDogru = await bcrypt.compare(sifre, kullanici.password);
    } catch {
      sifreDogru = false;
    }

    if (!sifreDogru && kullanici.password === sifre) {
      sifreDogru = true;
    }

    if (!sifreDogru) {
      return NextResponse.json(
        { hata: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    // ✅ Cookie'ye kullanıcı bilgisini kaydet
    const cookieStore = await cookies();
    cookieStore.set(
      "kullanici",
      JSON.stringify({
        id: kullanici.id,
        name: kullanici.name,
        email: kullanici.email,
      }),
      {
        maxAge: 60 * 60 * 24 * 7, // 7 gün
        path: "/",
        httpOnly: false, // Navbar okuyabilsin diye
      }
    );

    return NextResponse.json(
      {
        mesaj: "Giriş başarılı!",
        kullanici: {
          id: kullanici.id,
          name: kullanici.name,
          email: kullanici.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Giriş hatası:", error);
    return NextResponse.json(
      { hata: "Sunucu hatası. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}