# CoSave - Quick Start Guide

## 🚀 Başlamadan Önce

Bilgisayarınızda aşağıdakiler kurulu olması gerekir:

- **Node.js** (v14+) - https://nodejs.org
- **npm** (Node ile geliyor)
- **Git** (opsiyonel)

### Kontrol Et:

```bash
node --version
npm --version
```

---

## 🔧 Kurulum Adımları

### 1. Backend Başlat (Terminal 1)

```bash
# Backend klasörüne git
cd backend

# Paketleri yükle
npm install

# Sunucuyu başlat
npm start
```

**Beklenen çıktı:**

```
🚀 CoSave Backend sunucu 5000 portunda çalışıyor...
Veritabanı tabloları başarıyla oluşturuldu
```

✅ Backend hazır! `http://localhost:5000` adresinde dinliyor.

---

### 2. Frontend Başlat (Terminal 2)

```bash
# Frontend klasörüne git
cd frontend

# Paketleri yükle
npm install

# Sunucuyu başlat
npm start
```

**Beklenen çıktı:**

```
Compiled successfully!
Local: http://localhost:3000
```

✅ Frontend hazır! Browser'da `http://localhost:3000` açılacak.

---

## 💡 İlk Adımlar

1. **Dashboard'u Gör**
   - CoSave hakkında bilgiler bulunur

2. **Yeni Grup Oluştur**
   - "Yeni Grup Oluştur" butonuna tıkla
   - Grup adı gir (örn: "Tatil Kumbarası")
   - Grubu oluştur

3. **Hedef Ekle**
   - Grubu açtıktan sonra "Yeni Hedef Oluştur" formunu göreceksin
   - Hedef adı, tutar ve para birimini gir
   - İngilizce oluştur

4. **Para Katkısı Yap**
   - Hedefe tıkla
   - "Katkı Yap" butonuna tıkla
   - Miktar gir
   - Otomatik olarak hedef tutarından düşülür

5. **İlerlemeyi İzle**
   - Hedefin ilerleme çubuğunu göreceksin
   - Rozetler kazanırken ekranda bildirim alacaksın

---

## 🎮 Deneme Senaryosu

### Arkadaş Tatil Grubu

```
Grup: "Yaz Tatili"
Hedef 1: Tatil - 5000 TRY
Hedef 2: Yönetim - 2000 TRY

Katkılar:
- Sen: 500 TRY
- Arkadaş 1: 1000 TRY
- Arkadaş 2: 800 USD

Sonuç:
- %20'ye ulaştığında: 🥇 İlk Hedef rozeti
- Her işlem kaydedilir
- Para çekimi tüm onayları gerektirir
```

---

## 🔌 API Test

Backend çalışırken:

```bash
# Sağlık kontrolü
curl http://localhost:5000/api/health

# Kur oranlarını gör
curl http://localhost:5000/api/exchange-rates
```

---

## 🐛 Sorun Giderme

### Problem: "Port 5000 zaten kullanımda"

**Çözüm:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Problem: "npm: command not found"

**Çözüm:** Node.js'i yeniden kur

- https://nodejs.org adresinden indir
- Bilgisayarı yeniden başlat

### Problem: "SQLite hatası"

**Çözüm:** `backend` klasöründe `cosave.db` dosyasını sil

```bash
rm cosave.db
npm start
```

### Problem: Frontend bağlanamıyor

**Kontrol Et:**

- Backend `http://localhost:5000` çalışıyor mu?
- `frontend/src/App.js` doğru API URL'sini kullanıyor mu?
- Aynı ağda mısınız?

---

## 📊 API Endpoint'leri

### Testini Yapabileceğin Endpoints

```
GET  /api/health                    → {"status": "OK", "timestamp": "..."}
GET  /api/exchange-rates            → {"TRY": 1, "USD": 31, ...}

POST /api/users
→ Body: {"name": "Test", "email": "test@test.com"}

POST /api/groups
→ Body: {"name": "Grup", "description": "...", "created_by": "id"}

POST /api/goals
→ Body: {"group_id": "...", "title": "...", "target_amount": 5000, "currency": "TRY"}

POST /api/transactions
→ Body: {"goal_id": "...", "user_id": "...", "amount": 500, "currency": "TRY"}
```

---

## 💾 Veritabanı

Veritabanı dosyası: `backend/cosave.db`

**Sıfırlamak için:**

```bash
cd backend
rm cosave.db
npm start  # Otomatik olarak yeniden oluşturulur
```

---

## 🎨 Stil Özelleştirme

Ana stilleri şurada bulacaksın:

- `frontend/src/index.css` - Global stiller
- `frontend/src/App.css` - App stilleri

Renk paletesi:

- **Primary**: `#667eea` (Mor-Mavi)
- **Secondary**: `#764ba2` (Koyu Mor)
- **Background**: Gradient

---

## 🚀 Production'a Hazırlık

### Frontend Build

```bash
cd frontend
npm run build
```

`frontend/build/` klasörü oluşacak (Vercel'e yükle)

### Backend Optimize

```bash
# Üretim modunda çalıştır
NODE_ENV=production npm start
```

---

## 📱 Mobil Test

Aynı ağda test et:

```bash
# Bilgisayar IP'sini bulun
ipconfig  # Windows
ifconfig  # macOS/Linux

# Telefonun browserıne yazın:
http://<BILGISAYAR_IP>:3000
```

---

## 💡 Sonraki Adımlar

1. **Veritabanı Genişlet**
   - `backend/database.js` düzenle
   - Yeni tablolar ekle

2. **API Endpoint'leri Ekle**
   - `backend/server.js` düzenle
   - Yeni rout'lar oluştur

3. **Frontend Component'leri**
   - `frontend/src/components/` klasöründe ekle
   - `App.js` (router kodu) güncelle

4. **Gerçek Veritabanı**
   - SQLite → PostgreSQL geçiş
   - Production sunucusu kur

---

## 🎓 Öğrenme Kaynakları

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **SQLite Docs**: https://www.sqlite.org
- **Axios Docs**: https://axios-http.com

---

## 💬 Sorular?

Eğer sorun hesaplansa:

1. **Error mesajını oku** - Çoğu zaman çözümü içinde
2. **Console'u kontrol et** (F12)
3. **Node console output'unu oku**
4. **Yukarıdaki sorun giderme bölümüne bak**

---

## 🎉 Başarılar!

Artık CoSave'i kullanmaya başlayabilirsin! 🚀

**İpucu:** Metin seçme modunda, `backend` klasöründe
apisini test etmek için **Postman** veya **REST Client** VS Code uzantısı kullanabilirsin.

---

**Son Güncelleme:** 13 Şubat 2026
**Durum:** ✅ Tam Fonksiyonel
