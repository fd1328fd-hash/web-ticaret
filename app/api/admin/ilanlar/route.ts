/// app/api/admin/ilanlar/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function adminKontrol() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("kullanici");

  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie.value);
    const kullanici = await prisma.user.findUnique({
      where: { id: parsed.id },
    });
    if (!kullanici || kullanici.role !== "ADMIN") return null;
    return kullanici;
  } catch {
    return null;
  }
}

// Tüm ilanları listele
export async function GET() {
  const admin = await adminKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  const ilanlar = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      category: true,
    },
  });

  return NextResponse.json({ ilanlar });
}

// İlan sil
export async function POST(request: Request) {
  const admin = await adminKontrol();
  if (!admin) {
    return NextResponse.json({ hata: "Yetkiniz yok." }, { status: 403 });
  }

  const body = await request.json();
  const { ilanId } = body;

  if (!ilanId) {
    return NextResponse.json({ hata: "İlan ID gerekli." }, { status: 400 });
  }

  await prisma.listing.delete({ where: { id: ilanId } });

  return NextResponse.json({ mesaj: "İlan silindi." });
}