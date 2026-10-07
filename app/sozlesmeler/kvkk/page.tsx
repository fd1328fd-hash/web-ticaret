// app/sozlesmeler/kvkk/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "KVKK Aydınlatma Metni - bazar.com",
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kişisel Verilerin Korunması ve İşlenmesi Hakkında Aydınlatma Metni
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Son güncelleme: 07.10.2026
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">1. Veri Sorumlusu</h2>
            <p>
              İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması
              Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu sıfatıyla
              <strong> bazar.com </strong> tarafından hazırlanmıştır. Amacımız,
              platformumuzu kullanan bireysel ve kurumsal kullanıcılarımızın
              kişisel verilerinin hukuka uygun olarak toplanması, saklanması ve
              işlenmesi konusunda sizleri bilgilendirmektir.
            </p>

            <h2 className="text-lg font-bold text-gray-800">2. İşlenen Kişisel Veriler</h2>
            <p>Platformumuz üzerinden aşağıdaki kişisel verileriniz işlenebilmektedir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, şehir</li>
              <li><strong>Hesap Bilgileri:</strong> Şifre (hash&apos;lenmiş olarak), üyelik tarihi</li>
              <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, oturum bilgileri</li>
              <li><strong>İlan Bilgileri:</strong> İlan başlığı, açıklaması, fiyatı, konumu, görselleri</li>
              <li><strong>Finansal Bilgiler:</strong> (İleride e-ticaret özelliği eklenirse)</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Üyelik işlemlerinin gerçekleştirilmesi ve hesap oluşturulması</li>
              <li>İlan verme, düzenleme ve yayınlama hizmetlerinin sunulması</li>
              <li>Kullanıcılar arası iletişim (mesajlaşma) hizmetinin sağlanması</li>
              <li>Güvenli alışveriş ortamının sağlanması ve dolandırıcılığın önlenmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Talep ve şikayetlerin değerlendirilmesi</li>
              <li>Platform hizmetlerinin iyileştirilmesi ve geliştirilmesi</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz; yasal yükümlülüklerimizin gerektirdiği
              durumlarda yetkili kamu kurum ve kuruluşlarına, hizmet aldığımız
              altyapı sağlayıcılarına (hosting, veritabanı) ve açık rızanız
              bulunması halinde iş ortaklarımıza aktarılabilir. Verileriniz
              üçüncü kişilere satılmaz veya kiralanmaz.
            </p>

            <h2 className="text-lg font-bold text-gray-800">5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz; platformumuza üye olmanız, ilan vermeniz,
              mesaj göndermeniz veya platformu ziyaret etmeniz sırasında
              elektronik ortamda otomatik ya da manuel yollarla toplanmaktadır.
              Hukuki sebebi; KVKK&apos;nın 5. maddesinde belirtilen
              &quot;sözleşmenin ifası&quot;, &quot;hukuki yükümlülük&quot; ve
              &quot;meşru menfaat&quot; şartlarıdır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">6. KVKK Kapsamındaki Haklarınız</h2>
            <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi durumunda itiraz etme</li>
              <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">7. İletişim</h2>
            <p>
              KVKK kapsamındaki taleplerinizi <strong>kvkk@bazar.com</strong>{" "}
              adresine iletebilirsiniz. Başvurularınız en geç 30 gün içinde
              ücretsiz olarak sonuçlandırılacaktır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">8. Güncellemeler</h2>
            <p>
              bazar.com, işbu Aydınlatma Metni&apos;ni dilediği zaman Portal
              üzerinden yayımlamak suretiyle güncelleyebilir ve değiştirebilir.
              Güncellemeler, Portal&apos;da yayınlandığı tarihten itibaren
              geçerli olacaktır.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}