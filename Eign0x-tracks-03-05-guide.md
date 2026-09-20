# Track 03–05 — Eign0x

Tiga komposisi Strudel untuk melengkapi mini album lima track. Acuan: kode **No warning** dan **Weight of the air** di [FIXED-CODE](https://github.com/lucidizeee/FIXED-CODE), dibaca pada 19 September 2026.

| Urutan | Track | BPM | Durasi komposisi | Start cycle | End cycle |
| --- | --- | ---: | ---: | ---: | ---: |
| 01 | No warning — sudah terbit | 180 | 3:12 | 0 | 144 |
| 02 | Weight of the air — sudah terbit | 174 | 3:40.69 | 0 | 160 |
| 03 | Involuntary motion | 176 | 3:27.27 | 0 | 152 |
| 04 | Pressure fracture | 182 | 3:09.89 | 0 | 144 |
| 05 | After the impact | 172 | 3:43.26 | 0 | 160 |

Judul ketiga track baru bisa diganti. Durasi dihitung dari `END × 240 / BPM`, dengan satu cycle berisi empat ketuk. Total lima komposisi sekitar **17:13**.

## Arah musik

**03 · Involuntary motion**

Drum jazz dengan lapisan break mentah, bass sinkop, dan akor G minor. Melodi pendek bergerak seperti saling menjawab. Track ini menghubungkan harmoni murung “Weight of the air” dengan tekanan bass “No warning”. Bagian tengah berpindah ke half-time sebelum kembali ke groove penuh.

**04 · Pressure fracture**

Bagian paling mendesak dalam rangkaian ini. Tempo 182 BPM, Reese bass pendek, benturan nada F dan Gb, serta stab gelap. Fill ditulis pada ujung frase, dengan snare utama tetap menjadi pegangan. Drop kedua dimulai pada cycle 72, sekitar 1:34.95.

**05 · After the impact**

Penutup yang melankolis dengan bass turun D–C–Bb–A, FM keys, dan melodi yang berkembang pada paruh kedua. Lapisan break serta Reese muncul secara bertahap, lalu instrumen dilepas satu per satu. Nada akhir kembali ke D minor.

Ketiganya instrumental, memakai sample drum yang juga muncul di dua track acuan. Struktur lagunya tertulis dari intro sampai outro; fill tidak memakai pemilihan acak. Melodi, pola bass, dan susunan bagian dibedakan pada setiap track.

## Memainkan

1. Buka [Strudel](https://strudel.cc/).
2. Buka salah satu file `.strudel.js` dengan editor teks, lalu salin **seluruh isinya** ke Strudel. Jalankan satu file setiap kali.
3. Biarkan `START_CYCLE = 0` dan `LOOP = false`, lalu tekan Play. Beri waktu untuk memuat sample pada pemutaran pertama.
4. Untuk memainkan ulang dari awal, Stop lalu Play.

Pengaturan di atas setiap file:

- `LEVEL`: level keluaran keseluruhan. Nilai awal dipilih untuk menyisakan ruang pada campuran suara.
- `START_CYCLE`: lompat ke bagian tertentu untuk preview; gunakan nomor awal bagian pada komentar `song`.
- `LOOP`: `false` untuk satu kali putar; `true` untuk mengulang seluruh lagu.
- `END`: batas komposisi. Sesuaikan bersama durasi bagian jika nanti mengubah susunan lagu.

## Export

Gunakan tab **Export** Strudel. Atur start ke **0** dan end sesuai tabel. Saat export, pastikan `START_CYCLE = 0` dan `LOOP = false`.

Jika ingin memberi ruang tambahan untuk ekor reverb, end export boleh ditambah dua cycle. Kode tetap berhenti memicu nada baru pada nilai `END`; dua cycle tambahan hanya memperpanjang waktu rekaman.

Fitur export dijelaskan di [FAQ resmi Strudel](https://strudel.cc/learn/faq/). Paket ini berisi kode komposisi dan petunjuk pemakaian.

## Pemeriksaan

Ketiga file dievaluasi dengan parser dan mesin pattern Strudel (`@strudel/core`, `mini`, `tonal`, dan `transpiler` versi 1.2.6). Pemeriksaan mencakup semua cycle, nama instrumen, nilai event, panjang susunan bagian, mode loop, perpindahan titik mulai, serta penghentian event pada akhir lagu. Sepuluh file sample sumber berhasil diambil dan didekode.

Render cuplikan padat sepanjang 16 cycle per track juga dijalankan dengan Superdough 1.3.0 dan Web Audio pada 44.1 kHz. Setelah penyesuaian `LEVEL`, ketiganya menghasilkan audio tanpa error dan tanpa sample melewati 0 dBFS. Puncak cuplikan: track 03 −3.28 dBFS, track 04 −2.38 dBFS, dan track 05 −2.86 dBFS. Pemeriksaan level audio ini terbatas pada cuplikan tersebut.

Pemeriksaan teknis membantu memastikan kode berjalan. Penilaian artistik dan keseimbangan akhir dengan dua rekaman yang sudah terbit tetap perlu dilakukan lewat pemutaran album secara berurutan.

## Sumber acuan

- [No warning](https://github.com/lucidizeee/FIXED-CODE/blob/main/No%20Warning), blob `c8496c61032b46234caf7258a55b2f319b42f97f`.
- [Weight of the air](https://github.com/lucidizeee/FIXED-CODE/blob/main/Weight%20of%20the%20Air), blob `3d3b708ebf2d7f2ba541c7f7dff9b45136dbb9be`.
- [Dirt-Samples](https://github.com/tidalcycles/Dirt-Samples), sumber sample yang digunakan dalam kode acuan dan ketiga track baru.
