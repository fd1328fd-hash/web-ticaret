export default function IlanVerPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">İlan Ver</h1>
      <p className="text-gray-500 mb-6 text-sm">Ücretsiz ilanınızı oluşturmak için formu doldurun.</p>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">İlan Başlığı *</label>
          <input type="text" placeholder="Örn: Satılık Daire" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <option>Emlak</option>
            <option>Vasıta</option>
            <option>İkinci El Alışveriş</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) *</label>
          <input type="number" placeholder="Örn: 1500000" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama *</label>
          <textarea rows={4} placeholder="İlan detaylarını yazın..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
        </div>
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg">İlanı Yayınla</button>
      </div>
    </div>
  );
}