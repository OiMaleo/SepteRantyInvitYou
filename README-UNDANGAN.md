# 🎉 Sistem Undangan Pernikahan Ranti & Septe

Panduan lengkap untuk mengelola dan membagikan undangan pernikahan secara personal.

## 📋 Daftar Isi
- [Persiapan](#persiapan)
- [Cara Membuat Undangan Personal](#cara-membuat-undangan-personal)
- [Generator Link Undangan](#generator-link-undangan)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Tips Pengiriman](#tips-pengiriman)

## 🎯 Persiapan

### File yang Dibutuhkan:
- `undangan.html` - Halaman utama undangan
- `generator-undangan.html` - Tool untuk generate link personal
- `contoh-daftar-tamu.txt` - Template daftar tamu

### Struktur Folder:
```
undangan/
├── undangan.html              # Halaman utama undangan
├── generator-undangan.html    # Generator link personal
├── contoh-daftar-tamu.txt     # Template daftar tamu
├── assets/
│   ├── css/
│   │   └── style.css         # Styling dan animasi
│   ├── js/
│   │   └── app.js           # JavaScript functionality
│   └── images/              # Gambar dekorasi
└── README-UNDANGAN.md       # File ini
```

## 🎊 Cara Membuat Undangan Personal

### Langkah 1: Siapkan Daftar Tamu
1. Buka file `contoh-daftar-tamu.txt`
2. Edit sesuai dengan daftar tamu Anda
3. Format: satu nama per baris
4. Gunakan format yang sopan (contoh: "Bapak Ahmad & Ibu Siti")

### Langkah 2: Generate Link Personal
1. Buka `generator-undangan.html` di browser
2. Copy daftar tamu dari file txt
3. Paste ke textarea di generator
4. Klik "Generate Link Undangan"
5. Copy link yang dihasilkan untuk setiap tamu

### Langkah 3: Bagikan Link
Setiap tamu akan mendapat link personal seperti:
```
https://domainanda.com/undangan/undangan.html?nama=Bapak+Ahmad+%26+Ibu+Siti
```

## 🔗 Generator Link Undangan

### Fitur Generator:
- ✅ Input daftar tamu (satu per baris)
- ✅ Auto-generate link personal
- ✅ Copy to clipboard functionality
- ✅ Responsive design
- ✅ Real-time preview

### Cara Menggunakan Generator:
1. **Buka Generator**: Double-click `generator-undangan.html`
2. **Input Data**: Paste daftar nama tamu
3. **Generate**: Klik tombol "Generate Link Undangan"
4. **Copy Link**: Gunakan tombol copy di setiap link

## 📝 Contoh Penggunaan

### Input (di textarea generator):
```
Bapak Ahmad & Ibu Siti
Keluarga Budi Santoso
Sdr. Rina Wijaya
Dr. Hendro Kusumo
```

### Output (link yang dihasilkan):
```
1. Bapak Ahmad & Ibu Siti
   https://domainanda.com/undangan/undangan.html?nama=Bapak+Ahmad+%26+Ibu+Siti

2. Keluarga Budi Santoso
   https://domainanda.com/undangan/undangan.html?nama=Keluarga+Budi+Santoso

3. Sdr. Rina Wijaya
   https://domainanda.com/undangan/undangan.html?nama=Sdr.+Rina+Wijaya

4. Dr. Hendro Kusumo
   https://domainanda.com/undangan/undangan.html?nama=Dr.+Hendro+Kusumo
```

## 📱 Tips Pengiriman

### Via WhatsApp:
```
Assalamualaikum Wr. Wb.

Dengan hormat, kami *Ranti & Septe* mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

📅 *Tanggal*: Rabu, 19 November 2025
⏰ *Waktu*: 10.00 WIB (Misa Pemberkatan)
📍 *Tempat*: Gereja Katolik St. Ignatius Loyola

Berikut link undangan digital kami:
🔗 https://domainanda.com/undangan/undangan.html?nama=Bapak+Ahmad+%26+Ibu+Siti

Mohon konfirmasi kehadiran melalui link tersebut.

Terima kasih atas doa dan restunya.
Wassalamualaikum Wr. Wb.

Ranti & Septe 💍
```

### Via Email:
```
Subject: Undangan Pernikahan Ranti & Septe

Kepada Yth. Bapak Ahmad & Ibu Siti,

Dengan sukacita kami Ranti & Septe mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

Detail Acara:
- Misa Pemberkatan: 19 November 2025, 10.00 WIB
- Resepsi: 20 November 2025, 12.00 WIB
- Lokasi: Gereja Katolik St. Ignatius Loyola & Grand Velvet Ballroom

Silakan akses undangan digital kami melalui link berikut:
https://domainanda.com/undangan/undangan.html?nama=Bapak+Ahmad+%26+Ibu+Siti

Terima kasih atas doa dan restunya.

Hormat kami,
Ranti & Septe
```

## 🎨 Kustomisasi

### Mengubah Nama Pasangan:
Edit di `undangan.html`:
```html
<h1 class="couple animate-bounce-in">
  <span class="letter-animate">R</span><span class="letter-animate">a</span><span class="letter-animate">n</span><span class="letter-animate">t</span><span class="letter-animate">i</span>
  <span class="ampersand animate-glow">&</span>
  <span class="letter-animate">S</span><span class="letter-animate">e</span><span class="letter-animate">p</span><span class="letter-animate">t</span><span class="letter-animate">e</span>
</h1>
```

### Mengubah Tanggal & Waktu:
Edit di `undangan.html` dan update countdown di `app.js`:
```javascript
data-countdown="2025-11-19T10:00:00+07:00"
```

## 🆘 Troubleshooting

### Link Tidak Berfungsi:
- Pastikan file `undangan.html` berada di folder yang benar
- Periksa URL encoding (spasi menjadi %20 atau +)
- Gunakan domain yang valid untuk production

### Nama Tidak Muncul:
- Periksa parameter URL: `?nama=NamaTamu`
- Pastikan JavaScript tidak disabled
- Check console browser untuk error

### Animasi Tidak Berjalan:
- Browser support untuk CSS animations
- Enable JavaScript
- Check `prefers-reduced-motion` setting

## 📞 Dukungan

Jika ada pertanyaan atau kendala, silakan hubungi tim development atau check dokumentasi lengkap di repository.

---

**Happy Wedding! 💍**
*Ranti & Septe*</content>
</xai:function_call">Write">
<parameter name="file_path">d:\undangan\README-UNDANGAN.md