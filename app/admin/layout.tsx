// app/admin/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("kullanici");

  if (!cookie) {
    redirect("/giris");
  }

  let kullaniciId = "";
  try {
    const parsed = JSON.parse(cookie.value);
    kullaniciId = parsed.id;
  } catch {
    redirect("/giris");
  }

  const kullanici = await prisma.user.findUnique({
    where: { id: kullaniciId },
  });

  if (!kullanici || kullanici.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200 px-6 py-4">
              <h1 className="text-xl font-bold text-gray-900">
                🔧 Yönetim Paneli
              </h1>
            </div>
            <nav className="flex flex-wrap gap-1 p-2">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/admin/ilanlar"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition"
              >
                📋 İlanlar
              </Link>
              <Link
                href="/admin/kullanicilar"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition"
              >
                👥 Kullanıcılar
              </Link>
            </nav>
          </div>

          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}