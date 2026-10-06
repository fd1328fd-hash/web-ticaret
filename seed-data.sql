-- Kategorileri ekle
INSERT INTO "Category" (id, name, slug, icon) VALUES
('cat1', 'Emlak', 'emlak', '🏢'),
('cat2', 'Vasıta', 'vasita', '🏍️'),
('cat3', 'Ev & Yaşam', 'ev-yasam', '🛋️'),
('cat4', 'İş Makineleri', 'is-makineleri', '🏗️'),
('cat5', 'Emlak360', 'emlak360', '🏠'),
('cat6', 'Oto360', 'oto360', '🚗'),
('cat7', 'Acil Acil', 'acil-acil', '🚨');

-- Demo kullanıcı ekle
INSERT INTO "User" (id, email, name, phone, password, city, "createdAt") VALUES
('user_demo', 'demo@sahibinden.com', 'Demo Kullanıcı', '0555 000 00 00', 'demo123', 'İstanbul', NOW());

-- 20 ilan ekle
INSERT INTO "Listing" (id, title, description, price, city, district, images, status, "userId", "categoryId", views, "createdAt") VALUES
('ilan1', 'Aksaray Satılık Otel', 'Aksaray merkezde satılık otel.', 0, 'Aksaray', 'Merkez', '["https://picsum.photos/seed/1/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan2', 'Köyceğiz Beyobası Satılık Arsa', 'İmarlı satılık arsa.', 1950000, 'Muğla', 'Köyceğiz', '["https://picsum.photos/seed/2/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan3', 'Sahibinden Invicta Koltuk Takımı', 'Az kullanılmış koltuk takımı.', 4500, 'İstanbul', 'Kadıköy', '["https://picsum.photos/seed/3/800/600"]', 'ACTIVE', 'user_demo', 'cat3', 0, NOW()),
('ilan4', 'Aft Oto 1.99 Kredi Fırsatı', 'Kampanyalı oto kredisi.', 0, 'Ankara', 'Çankaya', '["https://picsum.photos/seed/4/800/600"]', 'ACTIVE', 'user_demo', 'cat2', 0, NOW()),
('ilan5', 'Ticari Konut Caddebostan', 'Deniz manzaralı konut.', 12500000, 'İstanbul', 'Kadıköy', '["https://picsum.photos/seed/5/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan6', 'Katta Tek Daire Kiralık', 'Kiralık daire.', 18000, 'İzmir', 'Bornova', '["https://picsum.photos/seed/6/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan7', 'Bahçeşehir Yeni Bina', 'Yeni yapılmış bina.', 8750000, 'İstanbul', 'Başakşehir', '["https://picsum.photos/seed/7/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan8', 'Silivri''de Havuzlu Villa', 'Havuzlu villa.', 15000000, 'İstanbul', 'Silivri', '["https://picsum.photos/seed/8/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan9', 'Raimondi Kule Vinç', 'Kule vinç satılık.', 0, 'Ankara', 'Yenimahalle', '["https://picsum.photos/seed/9/800/600"]', 'ACTIVE', 'user_demo', 'cat4', 0, NOW()),
('ilan10', 'Yarı Fiyatına İndi! Acil!', 'Acil satılık.', 2750000, 'İstanbul', 'Beşiktaş', '["https://picsum.photos/seed/10/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan11', 'Balıkesir Açıklaması', 'Balıkesir ilanı.', 0, 'Balıkesir', 'Merkez', '["https://picsum.photos/seed/11/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan12', 'İç Bayraklı Bavullar', 'Bavul satılık.', 1200, 'İzmir', 'Bayraklı', '["https://picsum.photos/seed/12/800/600"]', 'ACTIVE', 'user_demo', 'cat3', 0, NOW()),
('ilan13', '120.000 Yıllıkta İkinci El', 'İkinci el araç.', 450000, 'Bursa', 'Nilüfer', '["https://picsum.photos/seed/13/800/600"]', 'ACTIVE', 'user_demo', 'cat2', 0, NOW()),
('ilan14', 'Komponent Koaksiyon', 'İş makinesi.', 0, 'Kocaeli', 'Gebze', '["https://picsum.photos/seed/14/800/600"]', 'ACTIVE', 'user_demo', 'cat4', 0, NOW()),
('ilan15', 'Tertemiz Bayi Çıkışı', 'Araç satılık.', 1100000, 'Ankara', 'Keçiören', '["https://picsum.photos/seed/15/800/600"]', 'ACTIVE', 'user_demo', 'cat2', 0, NOW()),
('ilan16', 'Sahibinden Kuşadası', 'Kuşadası ilanı.', 3400000, 'Aydın', 'Kuşadası', '["https://picsum.photos/seed/16/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan17', 'Güçbir Jeneratör', 'Jeneratör satılık.', 85000, 'İstanbul', 'Ümraniye', '["https://picsum.photos/seed/17/800/600"]', 'ACTIVE', 'user_demo', 'cat4', 0, NOW()),
('ilan18', '33.5 Dönüm Yola', 'Dönüm satılık.', 5500000, 'Tekirdağ', 'Çorlu', '["https://picsum.photos/seed/18/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan19', 'Urla Ferla De Kiralık', 'Kiralık yazlık.', 45000, 'İzmir', 'Urla', '["https://picsum.photos/seed/19/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW()),
('ilan20', 'Ürkü Ayvalıkta Satılık', 'Satılık arsa.', 2800000, 'Balıkesir', 'Ayvalık', '["https://picsum.photos/seed/20/800/600"]', 'ACTIVE', 'user_demo', 'cat1', 0, NOW());