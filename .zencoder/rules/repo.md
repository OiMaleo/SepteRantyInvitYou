# Repo Info: Undangan Online Pernikahan (Modern & Elegan)

## Ringkasan Proyek
- **Tujuan**: Template undangan pernikahan Katolik, gaya modern & elegan terinspirasi tema "Blue Velvet".
- **Teknologi**: HTML, CSS, JavaScript murni (tanpa framework).
- **Status**: Template dasar siap. Pengguna akan mengubah konten sesuai kebutuhan.

## Struktur Direktori
- **index.html**: Halaman utama undangan.
- **assets/**
  - **css/style.css**: Styling (tema velvet biru + aksen emas, glassmorphism).
  - **js/app.js**: Interaktivitas (loader, musik toggle, countdown, salin nomor).
  - **images/**: Gambar latar tekstur + galeri.
  - **audio/**: Musik latar `bgm.mp3`.

## Bagian Halaman (index.html)
- **Hero/Cover**: Judul, nama pasangan, tanggal, tombol "Buka Undangan".
- **Invitation**: Salam, nama lengkap, ayat Alkitab (bisa diganti).
- **Details**: Misa Pemberkatan & Resepsi (jam, lokasi, map, save-to-calendar).
- **Countdown**: Hitung mundur ke tanggal pemberkatan.
- **Gallery**: Grid foto (4 item default, dapat ditambah).
- **RSVP**: Form ke Formspree (ganti action sesuai akun).
- **Gift**: Amplop digital (nomor rekening + tombol salin).
- **Footer**: Ucapan terima kasih.

## Kustomisasi Umum
- **Nama & tanggal**: Ubah di `index.html` (hero) dan `assets/js/app.js` (variabel `target`).
- **Lokasi & peta**: Ubah teks dan link Google Maps pada bagian Details.
- **Kalender**: Parameter `text`, `dates`, `location` di link Google Calendar.
- **Warna**: Edit variabel CSS di `:root` pada `style.css`.
- **RSVP**: Ganti `action` Formspree di `index.html`.
- **Amplop digital**: Perbarui nomor rekening/QR pada section Gift.
- **Galeri**: Tambah/hapus gambar di `assets/images` lalu sesuaikan `index.html`.

## Aset yang Diharapkan
- `assets/images/velvet-texture.jpg`
- `assets/images/gallery-1.jpg` s/d `gallery-4.jpg`
- `assets/audio/bgm.mp3`

## Ide Pengembangan Lanjutan (opsional)
- Animasi masuk (AOS) ringan.
- Variasi tema warna (emerald, burgundy).
- Komponen doa/berkat, our story timeline, guestbook.
- Deploy ke Netlify/Vercel/GitHub Pages.

## Catatan
- Tidak ada dependensi build; cukup buka `index.html` di browser.
- Optimalkan gambar untuk performa (WebP/JPEG, < 200KB per gambar bila memungkinkan).