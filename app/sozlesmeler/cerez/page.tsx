// app/sozlesmeler/cerez/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Çerez Aydınlatma Metni - bazar.com",
};

export default function CerezPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Çerez Aydınlatma Metni
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Son güncelleme: 07.10.2026
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">1. Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), ziyaret ettiğiniz web siteleri tarafından
              tarayıcınıza kaydedilen küçük metin dosyalarıdır. Çerezler; web
              sitesinin daha verimli çalışmasını, kullanıcı deneyiminin
              iyileştirilmesini ve site kullanımına dair istatistiklerin
              toplanmasını sağlar.
            </p>

            <h2 className="text-lg font-bold text-gray-800">2. Kullandığımız Çerez Türleri</h2>

            <h3 className="font-bold text-gray-800 mt-3">a) Zorunlu Çerezler</h3>
            <p>
              Platformumuzun temel işlevlerini yerine getirebilmesi için
              gereklidir. Oturum yönetimi, kullanıcı girişi gibi işlemler için
              kullanılır. Devre dışı bırakılamaz.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>kullanici</strong> — Oturum bilgisi (7 gün)</li>
            </ul>

            <h3 className="font-bold text-gray-800 mt-3">b) Performans Çerezleri</h3>
            <p>
              Platform kullanımına ilişkin istatistikleri toplar. Sayfa
              görüntüleme sayıları, ziyaret süreleri gibi bilgileri içerir.
              Anonim olarak işlenir.
            </p>

            <h3 className="font-bold text-gray-800 mt-3">c) İşlevsellik Çerezleri</h3>
            <p>
              Dil tercihi, şehir seçimi, arama filtreleri gibi kullanıcı
              tercihlerini hatırlamak için kullanılır.
            </p>

            <h2 className="text-lg font-bold text-gray-800">3. Çerezlerin Kullanım Amaçları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kullanıcı oturumunu yönetmek</li>
              <li>Güvenliği sağlamak</li>
              <li>Kullanıcı tercihlerini hatırlamak</li>
              <li>Hizmet kalitesini ölçmek ve iyileştirmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              Tarayıcınızın ayarlarından çerezleri yönetebilir, silebilir veya
              engelleyebilirsiniz. Ancak çerezleri devre dışı bırakırsanız,
              Platform&apos;un bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h3 className="font-bold text-gray-800 mt-3">Popüler Tarayıcılar İçin:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
              <li><strong>Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik</li>
              <li><strong>Safari:</strong> Tercihler → Gizlilik</li>
              <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800">5. Üçüncü Taraf Çerezleri</h2>
            <p>
              Platformumuzda; analitik (Google Analytics benzeri) ve sosyal
              medya (Facebook, Twitter) çerezleri bulunabilir. Bu çerezler,
              ilgili üçüncü taraf şirketlerin gizlilik politikalarına tabidir.
            </p>

            <h2 className="text-lg font-bold text-gray-800">6. Değişiklikler</h2>
            <p>
              bazar.com, işbu Çerez Aydınlatma Metni&apos;ni dilediği zaman
              güncelleyebilir. Güncel metin Platform&apos;da yayımlandığı anda
              yürürlüğe girer.
            </p>

            <h2 className="text-lg font-bold text-gray-800">7. İletişim</h2>
            <p>
              Çerez kullanımına ilişkin sorularınız için{" "}
              <strong>kvkk@bazar.com</strong> adresine e-posta gönderebilirsiniz.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}