// app/api/ilan/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ilan = await prisma.listing.findUnique({
      where: { id },
      include: { category: true, user: true },
    });

    if (!ilan) {
      return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ ilan });
  } catch (error) {
    console.error("İlan detay API hatası:", error);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}