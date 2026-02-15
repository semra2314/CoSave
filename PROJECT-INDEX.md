# 📋 CoSave Proje Dosya Dizini

## 📂 Klasör Yapısı

```
CoSave/
│
├── 📁 backend/                          # Node.js + Express Backend
│   ├── 📄 package.json                 # Backend bağımlılıkları
│   ├── 📄 server.js                    # Express sunucusu (API endpoint'leri)
│   ├── 📄 database.js                  # SQLite veritabanı şeması
│   └── 🗄️ cosave.db (otomatik)        # SQLite veritabanı dosyası
│
├── 📁 frontend/                         # React Frontend
│   ├── 📁 public/
│   │   └── 📄 index.html               # Ana HTML dosyası
│   ├── 📁 src/
│   │   ├── 📄 App.js                   # Ana App component
│   │   ├── 📄 App.css                  # App stilleri
│   │   ├── 📄 index.js                 # React entry point
│   │   ├── 📄 index.css                # Global stiller
│   │   └── 📁 components/
│   │       ├── 📄 Dashboard.js         # Ana sayfa
│   │       ├── 📄 CreateGroup.js       # Grup oluştur formu
│   │       ├── 📄 GroupList.js         # Grupları listele
│   │       └── 📄 GroupDetail.js       # Grup detayları & işlemler
│   ├── 📄 package.json                 # Frontend bağımlılıkları
│   └── 📁 build/                       # (npm run build sonrası)
│
├── 📁 sunum/                            # Video sunum metinleri
│   ├── 📄 01-TAM-SUNUM-METNI.md        # 5 dakikalık tam metin
│   ├── 📄 02-ULTRA-KISA-VERSIYON-4-DAKIKA.md  # 4 dakikalık kısa metin
│   └── 📄 03-KAMERA-DURAKLAMALARI-ISARETLI.md # Kamera ipuçları
│
├── 📁 dokumantasyon/                    # Destek dökümanları
│   └── 📄 VIDEO-HAZIRLIK-REHBERI.md    # Video çekim rehberi
│
├── 📄 README.md                         # Proje genel özeti
├── 📄 PROJECT-TECHNICAL.md              # Teknik detaylar
├── 📄 QUICK-START-GUIDE.md              # Hızlı başlama rehberi
├── 📄 .gitignore                        # Git ignore kuralları
└── 📄 PROJECT-INDEX.md                  # Bu dosya
```

---

## 🎯 Dosya Açıklamaları

### Backend Dosyaları

#### `backend/server.js` (Ana Dosya)

```javascript
// Express sunucusu
// 15+ API endpoint'i
// CORS, Body Parser middleware
// Tüm iş mantığı
```

**Temel Endpoint'ler:**

- `/api/users` - Kullanıcı yönetimi
- `/api/groups` - Grup yönetimi
- `/api/goals` - Hedef yönetimi
- `/api/transactions` - Para işlemleri
- `/api/withdrawals` - Çekim yönetimi
- `/api/exchange-rates` - Kur oranları
- `/api/health` - Sağlık kontrolü

#### `backend/database.js` (Veritabanı)

```javascript
// SQLite kurulumu
// 9 ana tablo
// Şema oluşturma
// İlişkiler (Foreign Keys)
```

**Tablolar:**

- `users` - Sistem kullanıcıları
- `groups` - Finans grupları
- `group_members` - Üyelikler
- `goals` - Hedefler
- `transactions` - İşlemler
- `withdrawal_requests` - Çekim istekleri
- `withdrawal_approvals` - Çekim onayları
- `badges` - Rozetler
- `user_badges` - Kullanıcı rozetleri

### Frontend Dosyaları

#### `frontend/src/App.js` (Ana Component)

```javascript
// Router mantığı
// Global state (groups, user)
// Sayfa yönetimi
```

**Sayfalar:**

1. Dashboard - Bilgi ve tanıtım
2. CreateGroup - Grup oluştur formu
3. GroupList - Oluşturulan grupları listele
4. GroupDetail - Hedefler, işlemler, üyeler

#### `frontend/src/components/`

**Dashboard.js**

- Hoş geldin mesajı
- Hızlı başlama butonları
- Özellikler ve faydalar kartları
- İstatistikler

**CreateGroup.js**

- Grup formu (name, description)
- Doğrulama
- API çağrısı
- Başarı/hata mesajı

**GroupList.js**

- Oluşturulan grupları listele
- Kart tasarımı
- Grup seçme
- Geri dön butonı

**GroupDetail.js**

- Hedef oluşturma formu
- Hedef kartları (progress bar)
- Para katkısı yapma
- İşlem geçmişi
- Grup üyeleri listesi
- Rozetler ve oyunlaştırma

### Sunum Dosyaları

#### `sunum/01-TAM-SUNUM-METNI.md`

- 5 dakikalık tam metni
- Bölümler halinde organize
- Kopya-yapıştır hazır

#### `sunum/02-ULTRA-KISA-VERSIYON-4-DAKIKA.md`

- 4 dakikalık kompakt metin
- Temel bilgiler içeriyor
- Hızlı ve etkili

#### `sunum/03-KAMERA-DURAKLAMALARI-ISARETLI.md`

- Kamera ipuçları ([👀] işaretleri)
- Dinlenme noktaları ([⏸️])
- Ton rehberi

### Döküman Dosyaları

#### `README.md`

- Proje özeti
- Temel özellikler
- Klasör yapısı
- Video hazırlama başlama

#### `PROJECT-TECHNICAL.md`

- Teknik detaylar
- Tech stack
- Veritabanı şeması
- API endpoint'leri
- Deployment talimatları

#### `QUICK-START-GUIDE.md`

- Hızlı kurulum
- Terminal komutları
- Sorun giderme
- Test etme
- Mobil test

#### `QUICK-START-GUIDE.md`

- Adım adım kurulum
- Backend başlatma
- Frontend başlatma
- İlk adımlar
- Senaryolar

---

## 🚀 Başlama Adımları

### 1. Backend Başlat

```bash
cd backend
npm install
npm start
# → http://localhost:5000
```

### 2. Frontend Başlat

```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

### 3. Uygulamayı Kullan

- Dashboard → Yeni Grup → Hedef Ekle → Para Katkısı
- Tüm işlemler SQLite veritabanında saklanır

---

## 📊 Veri İşişleri

### Veri Akışı

```
Frontend (React)
    ↓ (Axios HTTP)
Backend API (Express)
    ↓ (Query)
Database (SQLite)
    ↓ (Response)
Backend (JSON)
    ↓ (Component State)
Frontend (UI Update)
```

### Örnek İşlem: Para Katkısı

```
1. Kullanıcı "Katkı Yap" butonuna tıkla
2. Miktar gir (ör: 500 TRY)
3. POST /api/transactions çağrısı
4. Backend:
   - Kur dönüştür (1 TRY = 1)
   - transactions tablosuna ekle
   - goals tablosundan tutar güncelle
5. Frontend:
   - Başarı mesajı göster
   - State güncelle
   - Progress bar güncelle
6. Rozetler kontrol et:
   - %80'e ulaştı mı? → Rozet ver
```

---

## 🔒 Güvenlik Mimarisi

### API Güvenliği

```
POST /api/withdrawals → Çekim istemi
↓
Tüm üyeler bilgilendirildi
↓
Her üye onayı:
  POST /api/withdrawals/:id/approve
↓
Tüm onaylar kontrol
↓
Konsensusu sağlanmış ✅
↓
Para çekildi
```

### Veri Yalıtma

- Grup A verisi ↔️ Grup B verisi (bağlantı yok)
- User A ↔️ User B (grup üyesi olmadıkça görülmez)
- her işlem günlüğe kaydedilir

---

## 💡 Genişletme İfadeleri

### Yeni Özellik Eklemek İçin

1. **Frontend**

   ```
   frontend/src/components/ → Yeni component oluştur
   App.js → Sayfa ekle (switch statement)
   CSS → Stil ekle
   ```

2. **Backend**

   ```
   server.js → Yeni endpoint ekle
   database.js → Yeni tablo ekle (gerekirse)
   ```

3. **Test**
   ```
   Frontend'de test et
   API endpoint'i postman'de test et
   ```

### Örnek: "Bütçe İkaz Sistemi"

```
backend/server.js:
  POST /api/alerts (İkaz oluştur)

frontend/components/Alert.js:
  - İkaz göster
  - Sil seçeneği

database.js:
  CREATE TABLE alerts (...)
```

---

## 🎓 Eğitim Amaçlı İncelenecek Kod Bölümleri

### React Hooks

- `useState` - State yönetimi (App.js)
- `useEffect` - Yan etkiler (GroupDetail.js)

### Express Patternler

- Route handlers - Express callbacks
- Middleware - CORS, Body Parser
- Error handling - Try-catch, Response

### SQLite Pratikler

- Schema tasarımı (database.js)
- Relationships (Foreign Keys)
- Transactions (future)

### API Design

- RESTful prensipler
- Request/Response formats
- Status codes

---

## 📈 Performans İpuçları

### Frontend

- Componentleri lazy load et
- Memoization (React.memo)
- Virtual scrolling (büyük listeler)

### Backend

- Database indexing
- Query optimization
- Caching (Redis future)

### Deployment

- Frontend: Vercel (auto-scaling)
- Backend: Heroku/Railway
- Database: PostgreSQL production

---

## 🐛 Debug Araçları

### Browser

```
F12 → Console → Errors vs Warnings
Network → API Çağrıları
Application → Local Storage
```

### Terminal

```
Backend: npm logs
Frontend: React DevTools
DB: sqlite open cosave.db
```

---

## 📝 Dosya Büyüklükleri (Tahmini)

```
backend/server.js      ~350 lines (~10 KB)
backend/database.js    ~200 lines (~7 KB)
frontend/App.js        ~100 lines (~3 KB)
frontend/src/components/*.js  ~1000 lines (~30 KB)
*/frontend/*/css       ~200 lines (~5 KB)

Toplam Kod: ~1700 lines (~60 KB)
```

---

## ✅ Proje Tamamlama Kontrol Listesi

- [x] Backend API oluşturuldu
- [x] Frontend oluşturuldu
- [x] Veritabanı tasarımı
- [x] React componentleri
- [x] Stil ve tasarım
- [x] API integration
- [x] Oyunlaştırma sistemi
- [x] Mücadele süreci
- [x] Hata işleme
- [x] Dökümentasyon
- [x] Başlama rehberi

---

## 🎉 Son Söz

Bu proje **16+ saat geliştirme** süresi gerektiren
bir full-stack uygulamadır. **1 günlük** zaman sınırında
tamamlanan MVP'nin tüm kritik özelliklerini içerir.

**Başarılar!** 🚀✨

---

**Son Güncelleme:** 13 Şubat 2026  
**Durum:** ✅ Tamamlandı  
**Proje:** Garanti BBVA - Genç Fikrinle Parla
