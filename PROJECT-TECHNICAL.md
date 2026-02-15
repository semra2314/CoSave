# CoSave - Ortak Dijital Kumbara

**Garanti BBVA "Genç Fikrinle Parla" Yarışması - Teknik Proje**

---

## 🎯 Proje Hakkında

CoSave, ortak hedeflere yönelik **grup bazlı dijital kumbara sistemi**. Arkadaş grupları, aileler ve iş ortakları 2-6 kişi olarak birlikte para biriktirebilir.

### Ana Özellikler

✅ **Grup Yönetimi** - 2-6 kişi ile grup oluşturma  
✅ **Ortak Hedefler** - Tatil, ev alımı, etkinlik gibi hedefler  
✅ **Güvenli Çekimler** - Tüm üyelerin onayı gerekir  
✅ **Çok Para Birimi** - TRY, USD, EUR, GBP  
✅ **Otomatik Kur Dönüşümü** - Akın güncel kur oranları  
✅ **Artan Kazanç Oranları** - 1. hedef %10 → 2. hedef %12  
✅ **Oyunlaştırma** - Rozetler, başarılar, indirimler  
✅ **Şeffaflık** - Tüm işlemler görülebilir

---

## 🛠️ Teknoloji Stack

```
Frontend:
- React 18.2
- Axios (API istemcisi)
- CSS3 (Gradient & Modern Stil)

Backend:
- Node.js + Express
- SQLite3 (Veritabanı)
- UUID (ID üretimi)
- CORS (Cross-Origin isteği)

Database:
- SQLite (Dosya tabanlı)
```

---

## 📁 Proje Yapısı

```
CoSave/
├── backend/
│   ├── package.json
│   ├── server.js           # Express sunucusu
│   └── database.js         # SQLite şeması & setup
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── index.css
│       └── components/
│           ├── Dashboard.js        # Ana sayfa
│           ├── CreateGroup.js      # Grup oluştur
│           ├── GroupList.js        # Grupları listele
│           └── GroupDetail.js      # Grup detayları
│
├── sunum/                  # Video sunum metinleri
├── dokumantasyon/         # Hazırlık rehberleri
└── README.md
```

---

## 🚀 Hızlı Başlama

### Gereksinimler

- Node.js 14+
- npm veya yarn
- Git (opsiyonel)

### Backend Kurulumu

```bash
cd backend
npm install
npm start
```

Backend `http://localhost:5000` portunda çalışacak.

**Backend API Endpoints:**

```
POST   /api/users                    # Kullanıcı oluştur
GET    /api/users/:id               # Kullanıcı bilgisi

POST   /api/groups                  # Grup oluştur
GET    /api/groups/:id              # Grup detayları
POST   /api/groups/:id/members      # Üye ekle

POST   /api/goals                   # Hedef oluştur
GET    /api/groups/:id/goals        # Grup hedefleri
GET    /api/goals/:id               # Hedef detayları

POST   /api/transactions            # Para katkısı
GET    /api/goals/:id/transactions  # İşlem geçmişi

POST   /api/withdrawals             # Çekim isteği
POST   /api/withdrawals/:id/approve # Çekim onayı

GET    /api/exchange-rates          # Kur oranları
GET    /api/health                  # Sağlık kontrolü
```

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend `http://localhost:3000` portunda açılacak.

---

## 💾 Veritabanı Şeması

### Tablolar

| Tablo                  | Açıklama               |
| ---------------------- | ---------------------- |
| `users`                | Sistem kullanıcıları   |
| `groups`               | Finans grupları        |
| `group_members`        | Grup üyelikleri        |
| `goals`                | Hedefler               |
| `transactions`         | Para işlemleri         |
| `withdrawal_requests`  | Çekim istekleri        |
| `withdrawal_approvals` | Çekim onayları         |
| `badges`               | Oyunlaştırma rozetleri |
| `user_badges`          | Kullanıcı rozetleri    |

---

## 🔐 Güvenlik Özellikleri

1. **Çoklu Onay Mekanizması**
   - Para çekmeleri tüm üyelerin onayını gerektirir
   - Bloklı çekim engeller ihtilafları

2. **Şeffaflık**
   - Tüm işlemler günlüğe kaydedilir
   - Tarih, saat, tutar, para birimi görülebilir

3. **Veri Yalıtma**
   - Gruplar birbirinden bağımsız
   - Verilere yetkisiz erişim engellenir

---

## 🎮 Oyunlaştırma Sistemi

### Rozetler

| Rozet               | Gereksinim             | Ödül           |
| ------------------- | ---------------------- | -------------- |
| 🥇 İlk Hedef        | 1. hedefi tamamla      | +%2 kazanç     |
| 🔥 7 Gün Disiplini  | 7 gün kesintisiz katkı | Banka indirimi |
| 💪 Köklü Tasarrufçu | 3 hedefi tamamla       | Premium durum  |
| 🌟 Ekip Oyuncusu    | Grup oluştur           | +%1 kazanç     |

---

## 💱 Kur Dönüştürme

Sistem şunları destekler:

- **TRY** (Türk Lirası) - Temel para birimi
- **USD** (Amerikan Doları)
- **EUR** (Euro)
- **GBP** (İngiliz Sterlini)

Kur oranları gerçek zamanlı API'den alınır.

---

## 📊 Örnek Kullanım Senaryosu

### Senaryo 1: Arkadaş Grubu Tatili

```
Grup: "Yazın Kayak Tatili"
Hedef: 5000 TRY
Üyeler: Dilanur, Ali, Zeynep (3 kişi)
Kazanç: %10 (ilk hedef)

1. Dilanur: 500 TRY → 500 ₺
2. Ali: 1000 TRY → 1000 ₺
3. Zeynep: 800 USD → 24800 ₺ (31x kur)
Toplam: 26.3K ₺ (+10% = 28.9K ₺)
```

### Senaryo 2: İş Ortakları

```
Grup: "Yeni Proje Bütçesi"
Hedef: 10000 USD
Üyeler: İbrahim, Fatih (2 kişi)
Kazanç: %10

Tüm işlemler Türkçe arayüzde USD'de gösterilir
```

---

## 🧪 Test Etme

### Manuel Test

1. Dashboard'da "Yeni Grup Oluştur" tıkla
2. Grup adı gir (örn: "Test Grubu")
3. Öğrenci oluştur
4. Hedef ekle (örn: "Tatil - 5000 TRY")
5. Para katkısı yap (örn: "500 TRY")
6. İlerleme çubuğunun güncellenmesini izle
7. Çekim isteği oluştur

---

## 🐞 Bilinen Sınırlamalar

1. **Demo Modu**
   - Veritabanı yeniden başlatılırsa silinir
   - Gerçek ödeme işlemi uygulanmadı

2. **Kur Oranları**
   - Mock veriler kullanılıyor
   - Gerçek API'ye bağlanmadı

3. **Oyunlaştırma**
   - Temel rozet sistemi
   - Gerçek ödüller uygulanmadı

---

## 📱 Mobil Uyumluluk

Uygulama mobil cihazlarda da çalışır. Responsive tasarım:

- Mobil telefon (320px+)
- Tablet (768px+)
- Masaüstü (1024px+)

---

## 🚀 Deployment

### Vercel'e Deploy (Frontend)

```bash
npm install -g vercel
cd frontend
vercel
```

### Heroku'ya Deploy (Backend)

```bash
cd backend
heroku create cosave-api
git push heroku main
```

---

## 📞 İletişim & Destek

- **Proje**: CoSave - Ortak Dijital Kumbara
- **Yarışma**: Garanti BBVA "Genç Fikrinle Parla"
- **Tema**: Sürdürülebilir Bankacılık
- **Geliştirici**: Dilanur Bal

---

## 📄 Lisans

MIT License - Açık kaynak projesidir.

---

## 🙏 Teşekkürler

Garanti BBVA'ya bu harika yarışma fırsatı için teşekkür ederiz!

**Başarılar! 🚀✨**
