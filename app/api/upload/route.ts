// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Giriş kontrolü
    const cookieStore = await cookies();
    const cookie = cookieStore.get("kullanici");

    if (!cookie) {
      return NextResponse.json(
        { hata: "Giriş yapmalısınız." },
        { status: 401 }
      );
    }

    // FormData al
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { hata: "Dosya bulunamadı." },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { hata: "Sadece resim dosyaları yüklenebilir." },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { hata: "Dosya boyutu 5 MB'dan küçük olmalıdır." },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary'e yükle
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "bazar-ilanlar",
              resource_type: "image",
              transformation: [
                { width: 1200, height: 900, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({
      mesaj: "Resim yüklendi!",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload hatası:", error);
    return NextResponse.json(
      { hata: "Yükleme başarısız." },
      { status: 500 }
    );
  }
}