// app/api/ilan-getir/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ hata: "İlan ID gerekli." }, { status: 400 });
    }

    const ilan = await prisma.listing.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!ilan) {
      return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ ilan });
  } catch (error) {
    console.error("İlan getirme hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}