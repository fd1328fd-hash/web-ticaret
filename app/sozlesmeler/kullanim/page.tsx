// app/sozlesmeler/kullanim/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Kullanım Koşulları - bazar.com",
};

export default function KullanimPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kullanım Koşulları ve Üyelik Sözleşmesi
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Son güncelleme: 07.10.2026
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">1. Taraflar</h2>
            <p>
              İşbu Kullanım Koşulları ve Üyelik Sözleşmesi (&quot;Sözleşme&quot;),
              bir tarafta <strong>bazar.com</strong> (bundan sonra
              &quot;Platform&quot; olarak anılacaktır) ile diğer tarafta
              Platform&apos;a üye olan kullanıcı (&quot;Kullanıcı&quot;)
              arasında elektronik ortamda akdedilmiştir.
            </p>

            <h2 className="text-lg font-bold text-gray-800">2. Sözleşmenin Konusu</h2>
            <p>
              İşbu Sözleşme&apos;nin konusu, Kullanıcı&apos;nın Platform
              üzerinden sunulan hizmetlerden yararlanmasına ilişkin tarafların
              hak ve yükümlülüklerinin belirlenmesidir. Kullanıcı, üyelik
              formunu doldurup onayladığı anda işbu Sözleşme&apos;nin tüm
              hükümlerini kabul etmiş sayılır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">3. Hizmetin Tanımı</h2>
            <p>
              Platform, kullanıcıların ikinci el veya sıfır ürün, emlak, vasıta
              ve benzeri kategorilerde ilan verebileceği, ilanları
              inceleyebileceği, favorilere ekleyebileceği ve diğer kullanıcılarla
              mesajlaşabileceği bir ilan platformudur. Platform, alıcı ve satıcı
              arasındaki işlemin tarafı değildir; yalnızca aracılık hizmeti sunar.
            </p>

            <h2 className="text-lg font-bold text-gray-800">4. Üyelik Şartları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>18 yaşını doldurmuş olmak</li>
              <li>Gerçek ve güncel bilgiler vermek</li>
              <li>Platform&apos;u hukuka ve ahlaka aykırı amaçlarla kullanmamak</li>
              <li>Üyelik bilgilerinin güvenliğinden kullanıcı sorumludur</li>
              <li>Aynı kullanıcı birden fazla hesap açamaz</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">5. Kullanıcı Yükümlülükleri</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Yanıltıcı, yanlış veya hukuka aykırı ilan vermemek</li>
              <li>Telif hakkı ihlali içeren içerik paylaşmamak</li>
              <li>Başka kullanıcıları rahatsız etmemek, tehdit etmemek</li>
              <li>Spam, dolandırıcılık veya yasa dışı faaliyetlerde bulunmamak</li>
              <li>Platform&apos;un teknik altyapısına zarar vermemek</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">6. İlan Kuralları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>İlanlar gerçek ürün veya hizmetleri yansıtmalıdır</li>
              <li>Aynı ürün için tekrar eden ilanlar açılamaz</li>
              <li>Yasaklı ürünler (uyuşturucu, silah vb.) ilan edilemez</li>
              <li>İlan içerikleri Platform yönetimi tarafından denetlenebilir</li>
              <li>Kurallara aykırı ilanlar uyarı yapılmaksızın kaldırılabilir</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">7. Fikri Mülkiyet</h2>
            <p>
              Platform&apos;un logosu, tasarımı, yazılımı ve tüm içeriği
              bazar.com&apos;a aittir. Kullanıcılar, Platform&apos;dan izinsiz
              olarak kopyalama, çoğaltma, dağıtma veya ticari amaçla kullanma
              hakkına sahip değildir.
            </p>

            <h2 className="text-lg font-bold text-gray-800">8. Sorumluluk Sınırı</h2>
            <p>
              bazar.com, kullanıcılar arasındaki işlemlerden, ilan içeriklerinden
              veya kullanıcıların birbirlerine verdikleri zararlardan sorumlu
              değildir. Kullanıcılar, alım-satım işlemlerini kendi sorumlulukları
              altında yapar. Platform, ilan içeriklerinin doğruluğunu garanti
              etmez.
            </p>

            <h2 className="text-lg font-bold text-gray-800">9. Hesabın Askıya Alınması</h2>
            <p>
              Platform, işbu Sözleşme&apos;ye aykırı davranan kullanıcıların
              hesabını uyarı yapmaksızın askıya alabilir veya silebilir. Bu
              durumda kullanıcı hiçbir hak talebinde bulunamaz.
            </p>

            <h2 className="text-lg font-bold text-gray-800">10. Uyuşmazlıkların Çözümü</h2>
            <p>
              İşbu Sözleşme&apos;den doğan uyuşmazlıklarda Türkiye Cumhuriyeti
              kanunları uygulanır. Uyuşmazlıkların çözümünde İstanbul
              Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>

            <h2 className="text-lg font-bold text-gray-800">11. Yürürlük</h2>
            <p>
              İşbu Sözleşme, Kullanıcı&apos;nın üyelik formunu onayladığı anda
              yürürlüğe girer ve taraflar arasında elektronik ortamda akdedilmiş
              sayılır. Platform, Sözleşme&apos;de tek taraflı değişiklik yapma
              hakkını saklı tutar.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}