export default function AcilPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-2xl font-bold text-red-600 mb-4">🚨 Acil Acil İlanlar</h1>
      <p className="text-gray-500 mb-6">Acil satılık ilanlar burada listelenir. (Bu sayfa ana sayfadaki genel kategorilerden farklıdır).</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Fotoğraf Yok</div>
           <div className="p-3">
              <div className="font-bold text-gray-800">Acil Satılık Daire</div>
              <div className="text-xs text-gray-500 mt-1">İstanbul</div>
              <div className="text-sm font-semibold text-red-600 mt-2">2.500.000 TL</div>
           </div>
        </div>
      </div>
    </div>
  );
}