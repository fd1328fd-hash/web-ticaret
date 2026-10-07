// app/sozlesmeler/gizlilik/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Gizlilik Politikası - bazar.com",
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Gizlilik Politikası
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Son güncelleme: 07.10.2026
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">1. Amaç</h2>
            <p>
              İşbu Gizlilik Politikası&apos;nın amacı, bazar.com tarafından
              yönetilmekte olan platformun kullanımına ilişkin koşul ve şartları
              tespit etmektir. Kullanıcılar, üyelik sözleşmesini kabul etmeleri
              üzerine işbu Gizlilik Politikası&apos;nı da kabul etmiş sayılacaktır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">2. Toplanan Bilgiler</h2>
            <p>bazar.com aşağıdaki bilgileri toplayabilir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ad, soyad, e-posta adresi, telefon numarası, şehir</li>
              <li>İlan bilgileri (başlık, açıklama, fiyat, konum, görseller)</li>
              <li>Mesajlaşma içerikleri</li>
              <li>Favori ilanlarınız</li>
              <li>Site kullanım istatistikleri (çerezler aracılığıyla)</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">3. Bilgilerin Kullanımı</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hizmetlerimizi sunmak, geliştirmek ve kişiselleştirmek</li>
              <li>Kullanıcı deneyimini iyileştirmek</li>
              <li>Güvenliği sağlamak ve dolandırıcılığı önlemek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
              <li>İzniniz dahilinde kampanya ve bilgilendirme yapmak</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">4. Bilgilerin Paylaşımı</h2>
            <p>
              bazar.com, kişisel bilgilerinizi yasal zorunluluklar dışında
              üçüncü kişilerle paylaşmaz, satmaz veya kiralamaz. Hizmet
              sağlayıcılarımızla (hosting, veritabanı) yalnızca hizmetin
              gerektirdiği ölçüde paylaşım yapılır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">5. Çerezler</h2>
            <p>
              Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla çerezler
              kullanmaktadır. Detaylı bilgi için{" "}
              <a href="/sozlesmeler/cerez" className="text-yellow-600 hover:underline">
                Çerez Aydınlatma Metni
              </a>
              &apos;ni inceleyebilirsiniz.
            </p>

            <h2 className="text-lg font-bold text-gray-800">6. Veri Güvenliği</h2>
            <p>
              bazar.com, kişisel verilerinizin güvenliğini sağlamak için teknik
              ve idari tedbirler almaktadır. Şifreler hash&apos;lenerek
              saklanır, SSL şifreleme kullanılır ve düzenli güvenlik kontrolleri
              yapılır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">7. Kullanıcı Hakları</h2>
            <p>
              Kullanıcılar; verilerine erişme, düzeltme, silme ve işlemeye
              itiraz etme hakkına sahiptir. Talepleriniz için{" "}
              <strong>kvkk@bazar.com</strong> adresine başvurabilirsiniz.
            </p>

            <h2 className="text-lg font-bold text-gray-800">8. Politika Değişiklikleri</h2>
            <p>
              bazar.com, işbu Gizlilik Politikası&apos;nı dilediği zaman
              güncelleyebilir. Değişiklikler platformda yayımlandığı tarihten
              itibaren geçerli olur.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}