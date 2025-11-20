# Panduan Deployment – Undangan Ranti & Septe

## 📋 Daftar Periksa Pre-Deployment

### 1. **Personalisasi Data**
- [x] Tanggal acara: **27 November 2025**
- [x] Lokasi: **Kios Enneng, Palopo**
- [x] Koordinat peta: **-2.9938863, 120.1901129**
- [ ] Nama pasangan: Ranti & Septe (sesuaikan jika diperlukan)
- [ ] Nomor rekening/hadiah: Tambahkan di section-gift jika ada

### 2. **Multimedia**
- [ ] **Background Music** (`assets/audio/background-music.mp3`)
  - Ganti file placeholder dengan lagu pilihan Anda
  - Rekomendasi: Format MP3, ukuran < 5MB, durasi 3-5 menit
  - Musik akan diputar dengan kontrol toggle di kanan bawah

- [ ] **Foto Acara** (opsional)
  - Tambahkan ke `assets/images/`
  - Sesuaikan di HTML jika menggunakan gallery

### 3. **Guest List**
- [ ] Update `assets/guests.json` dengan daftar tamu lengkap
- [ ] Gunakan admin panel di `admin.html` untuk mengelola tamu
- [ ] Export JSON setelah selesai

### 4. **Meta Information**
- [x] Open Graph Image: Sudah menggunakan SVG data URI (professional)
- [x] Meta description: Sudah update dengan info terbaru
- [ ] Sesuaikan nama pasangan di title jika diperlukan

---

## 🚀 Opsi Deployment

### **Option A: Static Hosting (Rekomendasi)**
Cocok untuk undangan yang sederhana dan tidak memerlukan backend.

**Platform:**
- **Netlify** (gratis, unlimited)
  ```bash
  npm install -g netlify-cli
  netlify deploy --prod --dir=.
  ```

- **Vercel** (gratis, unlimited)
  ```bash
  npm install -g vercel
  vercel --prod
  ```

- **GitHub Pages** (gratis)
  - Push ke repository
  - Aktifkan GitHub Pages di Settings

- **Firebase Hosting** (gratis tier)
  ```bash
  npm install -g firebase-tools
  firebase deploy
  ```

### **Option B: Traditional Web Hosting**
- Upload semua file ke hosting provider via FTP/SFTP
- Pastikan `index.html` dapat diakses langsung (bukan `index.html/`)

### **Option C: Docker (untuk production-grade)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npx", "http-server", "-p", "3000"]
```

---

## 📱 Testing Sebelum Live

### Desktop
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (Mac)
- [ ] Edge

### Mobile
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet

### Fitur yang Harus Ditest
- [x] Countdown accuracy
- [x] Google Maps embed
- [x] Music toggle & autoplay
- [x] Guest name personalization (?to=Name, ?id=1)
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Calendar integration (Save to Google Calendar)
- [x] Scroll animations
- [x] Social sharing (WhatsApp, Email, Facebook)

---

## 📊 URL Personalisasi Tamu

Setelah deploy, bagikan link ke tamu dengan nama mereka:

**Opsi 1 – Dengan nama:**
```
https://yoursite.com/?to=Nama+Tamu
https://yoursite.com/undangan.html?to=Nama+Tamu
```

**Opsi 2 – Dengan ID dari guests.json:**
```
https://yoursite.com/?id=1
https://yoursite.com/undangan.html?id=2
```

**WhatsApp Template:**
```
Kepada [NAMA TAMU],

Kami dengan bahagia mengundang Anda untuk merayakan pernikahan kami:

👰 Ranti & 🤵 Septe
📅 Kamis, 27 November 2025
📍 Kios Enneng, Palopo

Buka undangan: [PERSONALIZED_LINK]

Terima kasih! 🙏💍
```

---

## ⚡ Optimasi Performance

### 1. **Image Optimization**
- Kompres semua image di `assets/images/`
- Tools: TinyPNG, ImageOptim, atau Squoosh

### 2. **CSS/JS Minification** (Opsional)
- Saat ini sudah inline dalam HTML (good untuk simple project)
- Untuk production besar, pertimbangkan bundler

### 3. **Lazy Loading**
- Google Maps embed: ✅ Sudah menggunakan `loading="lazy"`
- Audio: ✅ Sudah menggunakan `preload="none"`

### 4. **Caching Headers** (untuk production server)
```
Cache-Control: max-age=86400 (untuk aset statis)
Cache-Control: max-age=0 (untuk HTML)
```

### 5. **CDN for Fonts**
- ✅ Sudah menggunakan Google Fonts dengan preconnect

---

## 🔒 Security Checklist

- [x] Tidak ada hardcoded sensitive data
- [x] External links membuka di tab baru (`target="_blank"`)
- [x] HTTPS direkomendasikan (enable di hosting provider)
- [ ] Tidak ada console.error atau debug logs sebelum launch
- [x] Metadata sudah proper untuk SEO

---

## 📁 File Structure untuk Production

### **Harus Dikompilasi ke Server:**
```
/
├── index.html              ✅ Landing page utama
├── undangan.html           ✅ Halaman undangan
├── admin.html              ⚠️ Opsi: Simpan untuk manage guest
├── assets/
│   ├── css/style.css       ✅ Styling
│   ├── js/app.js           ✅ JavaScript
│   ├── audio/              ✅ Background music
│   ├── images/             ✅ Decorative images
│   └── guests.json         ✅ Guest list
├── .gitignore              ✅ Git config
└── DEPLOYMENT.md           ℹ️ Dokumentasi ini
```

### **Opsi: Hapus dari Production**
Untuk website yang lebih clean, hapus file ini:
- `bulk-insert.html` (utility)
- `generator-undangan.html` (generator tool)
- `test-personalization.html` (testing page)
- `.qodo/`, `.zencoder/` (config files)

**Catatan:** Jika admin.html diakses publik, orang bisa memanipulasi guest list. Rekomendasinya:
1. **Keep it**: Simpan di server untuk admin manage guest secara lokal
2. **Remove it**: Hapus jika tidak perlu, edit `guests.json` manual
3. **Secure it**: Pakai password/authentication (perlu backend)

---

## 🛠️ Custom Modifications

### Menambahkan Section Baru
1. Buka `undangan.html`
2. Copy section existing (mis. `.section-details`)
3. Sesuaikan class, id, dan styling di `assets/css/style.css`
4. Import JS tambahan jika diperlukan di `assets/js/app.js`

### Mengubah Warna Tema
Edit `:root` di `assets/css/style.css`:
```css
:root{
  --accent:#d4af37;        /* Warna emas – ubah di sini */
  --primary:#0b2447;       /* Warna biru gelap */
  --primary-dark:#0a1b36;  /* Lebih gelap lagi */
}
```

### Menambahkan Music
1. Upload MP3 ke `assets/audio/background-music.mp3`
2. Pastikan file berukuran < 5MB untuk loading cepat
3. Musik akan otomatis dikenali

---

## 📞 Troubleshooting

| Issue | Solusi |
|-------|--------|
| Google Maps tidak muncul | Periksa koordinat di embed URL, pastikan internet stabil |
| Music tidak play | Cek browser autoplay policy, click toggle untuk manual play |
| Countdown salah | Update `data-countdown` di `<body>` undangan.html |
| Guest name tidak tampil | Pastikan URL parameter `?to=` atau `?id=` correct-encoded |
| Layout berantakan di mobile | Test di DevTools → Toggle device toolbar (F12) |
| Font tidak load | Cek koneksi internet, refresh page, clear browser cache |

---

## 📈 Analytics (Opsional)

Tambahkan Google Analytics untuk tracking:
```html
<!-- Di </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## ✅ Final Checklist Sebelum Launch

- [ ] Semua tanggal, lokasi, dan informasi sudah benar
- [ ] Music file sudah di `assets/audio/background-music.mp3`
- [ ] Guest list sudah di `assets/guests.json`
- [ ] Testing di semua device & browser ✓
- [ ] Countdown berjalan dengan akurat ✓
- [ ] Maps embed menampilkan lokasi yang benar ✓
- [ ] Social sharing links sudah siap
- [ ] HTTPS aktif (jika hosting support)
- [ ] Domain custom sudah setup (jika ada)
- [ ] Backup file lokal sebelum deploy

---

## 🎉 Selesai!

Selamat! Undangan digital Anda sudah siap untuk dibagikan.

**Tips Akhir:**
- Bagikan beberapa hari sebelum acara untuk reminder
- Gunakan QR code untuk link personalisasi tamu
- Monitor RSVP melalui Google Form terpisah (jika ada)

Semoga acara Anda berjalan sempurna! 💍✨
