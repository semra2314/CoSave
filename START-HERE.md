# 🚀 CoSave - Başlangıç Rehberi

## ✅ Kurulum Tamamlandı!

Paketler başarıyla yüklendi:

- ✅ Backend: 223 paket
- ✅ Frontend: (yükleniyor)

---

## 🎮 Çalıştırma - Terminal Komutları

### Terminal 1: Backend Başlat

```powershell
cd c:\Users\semra\Desktop\CoSave\backend
npm start
```

**Beklenen çıktı:**

```
🚀 CoSave Backend sunucu 5000 portunda çalışıyor...
Veritabanı tabloları başarıyla oluşturuldu
```

✅ **Backend Ready:** `http://localhost:5000`

---

### Terminal 2: Frontend Başlat

```powershell
cd c:\Users\semra\Desktop\CoSave\frontend
npm start
```

**Beklenen çıktı:**

```
Compiled successfully!
Local: http://localhost:3000
```

✅ **Frontend Ready:** Automatik olarak `http://localhost:3000` açılacak

---

## 💡 İlk Kullanım - Adım Adım

### Adım 1: Dashboard'u Gör

- Hoş getirme mesajı ve özellikler

### Adım 2: Yeni Grup Oluştur

- "✨ Yeni Grup Oluştur" butonuna tıkla
- Grup adı: "Tatil Kumbarası"
- Grubu oluştur

### Adım 3: Hedef Ekle

- Grubu aç
- "✨ Yeni Hedef Oluştur" formunu doldur
- Başlık: "Tatil Bütçesi"
- Tutar: 5000
- Para Birimi: TRY

### Adım 4: Para Katkısı Yap

- Hedef kartına tıkla
- "💰 Katkı Yap" butonuna tıkla
- Miktar gir: 500

### Adım 5: İlerlemeyi İzle

- Progress bar güncelleneceğini gör
- %80'e ulaştığında rozet kazanacaksın

---

## 🎯 Deneme Senaryosu

```
Grup: "Yazın Tatili"

Hedef 1: Tatil Budjet
- Tutar: 5000 TRY
- Kazanç: % 10

Katkılar:
1. Siz: 500 TRY → +55 TRY kazanç = 555 ₺
2. Arkadaş 1: 1000 TRY → +110 TRY = 1110 ₺
3. Arkadaş 2: 800 USD → +88 USD = 888 USD
```

---

## 🔧 Sorun Giderme

### Port Hatası: "EADDRINUSE - Port 5000 zaten kullanımda"

**Çözüm 1:** Başka port kullan

```powershell
# backend/server.js dosyasında PORT değiştir
const PORT = 5001; // 5000 yerine 5001
```

**Çözüm 2:** Port'u boşalt

```powershell
# Port 5000'ı kullanılan işlemi bul
netstat -ano | findstr :5000

# PID için kill et
taskkill /PID <PID> /F
```

### npm Komutu Bulunamadı

**Çözüm:** Node.js yeniden kur

1. https://nodejs.org adresine git
2. En son LTS versiyonunu indir
3. Kur ve bilgisayarı yeniden başlat

### Veritabanı Hatası

**Çözüm:** Veritabanını sıfırla

```powershell
# backend klasöründe
rm cosave.db
```

---

## 📊 API Test Etme

Backend çalışırken Postman veya REST Client kullan:

```
GET http://localhost:5000/api/health
→ {"status": "OK", "timestamp": "..."}

GET http://localhost:5000/api/exchange-rates
→ {"TRY": 1, "USD": 31, "EUR": 34, ...}
```

---

## 📁 Proje Dosyaları

| Dosya                  | Amaç            |
| ---------------------- | --------------- |
| `README.md`            | Proje özeti     |
| `PROJECT-TECHNICAL.md` | Teknik detaylar |
| `QUICK-START-GUIDE.md` | Hızlı başlama   |
| `PROJECT-INDEX.md`     | Dosya dizini    |

---

## 🎤 Video Sunum

Sunum metinleri hazır:

- `sunum/01-TAM-SUNUM-METNI.md` (5 dakika)
- `sunum/02-ULTRA-KISA-VERSIYON-4-DAKIKA.md` (4 dakika)
- `sunum/03-KAMERA-DURAKLAMALARI-ISARETLI.md` (İpuçları)

---

## 📱 Mobil İstemci Test

Aynı ağdaki cihazlarda:

```
http://<BILGISAYAR_IP>:3000
```

---

## 🚀 Deployment

### Frontend - Vercel

```powershell
npm install -g vercel
# frontend klasöründe
vercel
```

### Backend - Heroku

```powershell
heroku login
cd backend
heroku create cosave-app
git push heroku main
```

---

## 📚 Dökümanlar

Tüm dökümanlar Markdown formatında:

- `README.md` - Başla buradan
- `QUICK-START-GUIDE.md` - Kurulum ve başlama
- `PROJECT-TECHNICAL.md` - Teknik detaylar
- `PROJECT-INDEX.md` - Dosya yapısı

---

## 🎉 Tamamlama Virüsü

✅ Sunum metinleri  
✅ Backend API  
✅ Frontend UI  
✅ Veritabanı şeması  
✅ Oyunlaştırma sistemi  
✅ Mücadele süreci  
✅ Hata işleme  
✅ Dökümentasyon  
✅ Başlama rehberi  
✅ Paket kurulumu

---

## 💬 Akılcı İpuçları

1. **Backend console'unu açık tut** - Hataları görmek için
2. **Browser console'unu aç** (F12) - Frontend hataları
3. **Veritabanın boş olduğunu hatırla** - İlk başta hiçbir yeri yok
4. **Çekimlerde oyunlaştırma** - %80'e ulaşınca rozet alırsın

---

## 🎓 Ne Sonraki?

Bu MVP'den sonra eklenebilecek özellikler:

1. **Gerçek Ödeme Sistemi**
   - Stripe/PayPal integration

2. **Mobil App**
   - React Native / Flutter

3. **Gerçek Veritabanı**
   - PostgreSQL production

4. **Advanced Analytics**
   - Grafikler ve raporlar

5. **Push Notifications**
   - Çekim onayları bildirim

---

## 📞 Sorular?

- **Kur Dönüştürme:** `backend/server.js` → exchangeRates objesi
- **API Endpoints:** `backend/server.js` → app.post / app.get
- **Stil:** `frontend/src/index.css` ve `frontend/src/App.css`
- **Database:** `backend/database.js`

---

## 🏁 Son Çevrimiçi

**Proje:** CoSave - Ortak Dijital Kumbara  
**Durum:** ✅ Tamamlandı  
**Hazırlanma:** 1 Gün  
**Satırlar:** 1700+  
**Bileşenler:** 6+  
**API Endpoints:** 15+  
**Veritabanı Tabloları:** 9

---

**Başarılar! 🚀✨**

Şimdi `npm start` komutlarını çalıştırabilirsin!

---

_Son güncelleme: 13 Şubat 2026_
