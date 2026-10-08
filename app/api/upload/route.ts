// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json({ hata: "Giriş yapmalısınız." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ hata: "Dosya bulunamadı." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ hata: "Sadece resim yüklenebilir." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ hata: "Maks 5 MB." }, { status: 400 });
    }

    const blob = await put(`bazar-ilanlar/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({
      mesaj: "Resim yüklendi!",
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload hatası:", error);
    return NextResponse.json({ hata: "Yükleme başarısız." }, { status: 500 });
  }
}