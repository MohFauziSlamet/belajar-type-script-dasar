// ========================================
// WHILE LOOP
// ========================================
// (PDF "TypeScript Dasar" hlm. 128-130: While Loop,
//  Kode : While Loop)
// Materi sebelumnya: file 30 (for loop — loop pertama kita).
// Prasyarat: file 3 (array .length, pop), file 27 (truthiness).
// Catatan kurikulum: do-while menyusul di file berikutnya;
// break/continue menyusul setelah itu — file ini TIDAK memakainya.


// ------------------------------------------------------------------
// (1) BENTUK DASAR — CEK DULU, JALAN KALAU BENAR
//
// PDF hlm. 129: TypeScript mendukung While Loop seperti di
// JavaScript. Struktur pengecekannya: cek kondisi → kalau benar,
// jalankan badan → cek lagi → ... sampai kondisi salah:
//
//     let hitung = 1;             ← penentu mulai (DI LUAR loop)
//     while (hitung <= 3) {       ← cek dulu setiap putaran
//         console.log(hitung);
//         hitung++;               ← pengubah kondisi (DI DALAM)
//     }
//
// Jika di Dart seperti ini:
//     var hitung = 1;
//     while (hitung <= 3) { print(hitung); hitung++; }
// di TypeScript jadi seperti ini: PERSIS — var tinggal diganti
// let (kebiasaan file 3/30). Nol konsep baru, hanya bentuk baru.
//
// Dua bagian WAJIB yang beda dari for klasik: penentu MULAI
// ditulis sebelum loop, dan PENGUBAH kondisi ditulis di badan
// loop. Lupa mengubah kondisi di badan = bahaya sub-section (4).
// ------------------------------------------------------------------

let hitung = 1;
while (hitung <= 3) {
    console.log(hitung);   // 1 / 2 / 3 (baris terpisah)
    hitung++;
}


// ------------------------------------------------------------------
// (2) NOL ITERASI — KONDISI SALAH SEJAK AWAL
//
// Berbeda dengan do-while (file berikutnya!), while mengecek
// DULU: kalau kondisi salah sejak awal, badan loop TIDAK PERNAH
// jalan — program langsung melompat ke bawahnya.
// ------------------------------------------------------------------

let stok = 10;
while (stok < 5) {
    console.log("baris ini tidak pernah tercetak");
    stok--;
}
console.log(stok);   // 10   ← badan dilewati, stok utuh


// ------------------------------------------------------------------
// (3) POLA ANDALAN — "PROSES SAMPAI HABIS" + KONDISI TRUTHY
//
// Kegunaan while dibanding for klasik: saat jumlah putaran TIDAK
// diketahui di depan — hanya "sampai sesuatu habis/tercapai".
// Pola paling jelas: kosongkan array dengan pop (file 3) sampai
// panjangnya nol.
//
// Kondisi while juga menerima truthiness seperti if (file 27) —
// bukan hanya perbandingan angka.
// ------------------------------------------------------------------

const tumpukan = ["a", "b", "c"];
while (tumpukan.length > 0) {
    const ambil = tumpukan.pop();   // ambil dari belakang (file 3)
    console.log(ambil);   // c / b / a (baris terpisah)
}

let nama = "";
while (nama.length < 3) {
    nama = nama + "x";
}
console.log(nama);   // xxx


// ------------------------------------------------------------------
// (4) SIFAT KHUSUS WHILE: INFINITE LOOP TIDAK DITANGKAP COMPILER
//
// for klasik menuliskan tiga bagiannya SEKALI LIHAT (mulai; selama;
// naikkan) — kelihatan kalau ada yang hilang. while menyebarkannya:
// kondisi di atas, pengubah di badan. Kalau pengubah LUPA atau
// kondisinya tidak mungkin salah → loop berjalan SELAMANYA.
//
// Hasil verifikasi: `while (true) { }` lolos `npx tsc --noEmit`
// TANPA error (compiler tidak mengecek alur runtime — sama seperti
// this lepas di file 20), dan saat dijalankan program MENGGANT
// selamanya (terbukti: 4 detik masih jalan, baris setelah loop
// tak pernah tercetak, proses harus dibunuh paksa).
//
// Jika di Dart seperti ini: nasibnya SAMA — while (true) di Dart
// juga menggant, compiler juga diam. Jadi ini bukan perbedaan
// bahasa, melainkan sifat while di mana pun: KEBIASAAN yang
// menjaga kita, bukan compiler. Checklist setiap while:
//   1. apa yang membuat kondisi BERUBAH? (ada pengubahnya?)
//   2. arah perubahan menuju SALAH? (naik/turun mendekati batas?)
// ------------------------------------------------------------------

// console.log("mulai");
// while (true) { }
// console.log("selesai");
// ❌ BUKAN error compile — tapi RUNTIME MENGGANT SELAMANYA kalau
//    di-uncomment: hanya "mulai" tercetak, "selesai" tidak pernah
//    (terverifikasi: proses harus di-kill). JANGAN dijalankan
//    tanpa siap menghentikan terminal. Break penyelamatnya
//    menyusul di materi Break dan Continue.


// ------------------------------------------------------------------
// (5) PENJAGA YANG ADA — KELUARGA LAMA
//
// Compiler tetap menjaga TIPE di kondisi dan penugasan (meski
// tidak menjaga ALUR). Dua bentuknya, sekeluarga file 30:
// ------------------------------------------------------------------

// let i = 0;
// while (i < "3") { i++; }
// ❌ ERROR kalau di-uncomment:
//    error TS2365: Operator '<' cannot be applied to types 'number'
//    and 'string'.
//    (kondisi membandingkan number dengan string — persis for
//    klasik file 30)

// const j = 0;
// while (j < 3) { j++; }
// ❌ ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'j' because it is a constant.
//    (j++ mengubah j — penentu putaran memang HARUS let)

// CATATAN jujur hasil verifikasi: `while (5 < 3) { }` (perbandingan
// literal yang pasti salah) TIDAK ditandai compiler — kode "mati"
// dibiarkan diam saja. Dan penugasan di kondisi `while (k = 5)`
// juga lolos (hasilnya truthy). Dua-duanya tidak dipakai di file
// ini — cukup tahu compiler menjaga TIPE, bukan AKAL SEHAT.


// ========================================
// RANGKUMAN
// ========================================
// 1. while (kondisi) — cek DULU, jalan kalau benar (PDF hlm. 129).
//    Identik dengan Dart: var → let, selesai.
// 2. Dua bagian wajib tersebar: penentu MULAI di luar loop,
//    PENGUBAH kondisi di badan — beda dari for klasik yang
//    terkumpul dalam satu baris.
// 3. Nol iterasi sah: kondisi salah sejak awal → badan dilewati
//    total (beda dengan do-while nanti, yang jalan dulu sekali).
// 4. while unggul saat jumlah putaran TIDAK diketahui: pola
//    "sampai habis" (pop sampai .length === 0). Kondisi menerima
//    truthiness seperti if (file 27).
// 5. INFINITE LOOP TIDAK ditangkap compiler (tsc bersih untuk
//    while(true)) — program menggant selamanya (terverifikasi).
//    Nasib sama di Dart. Penjaganya adalah KEBIASAAN: setiap while
//    ditanya "apa pengubah kondisinya, dan arahnya menuju salah?"
// 6. Penjaga yang ada: TS2365 (number < string — keluarga file 30),
//    TS2588 (const++ — penentu putaran wajib let).
// 7. Compiler menjaga TIPE, bukan AKAL SEHAT: perbandingan literal
//    pasti-salah (5 < 3) dan penugasan di kondisi (k = 5) lolos
//    tanpa peringatan — hasil verifikasi, bukan tebakan.
//
// Cara menjalankan file ini:  npx tsx src/31_while_loop.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Dengan while, cetak angka 10, 8, 6, 4, 2 (turun dua-dua).
//
//    JAWABAN:
let turun = 10;
while (turun >= 2) {
    console.log(turun);   // 10 / 8 / 6 / 4 / 2 (baris terpisah)
    turun = turun - 2;
}

// 2. Pola "sampai habis": buat array ["x", "y", "z"], dengan while
//    cetak dan buang elemen DEPAN satu-satu sampai kosong.
//    (Petunjuk: buang depan = shift — belajar di file 3.)
//
//    JAWABAN:
const antrean = ["x", "y", "z"];
while (antrean.length > 0) {
    const dilayani = antrean.shift();   // ambil depan (file 3)
    console.log(dilayani);   // x / y / z (baris terpisah)
}

// 3. Ramal dulu, baru cek: apa hasil potongan ini?
//       let saldo = 100;
//       while (saldo > 0) {
//           saldo = saldo - 60;
//       }
//       console.log(saldo);
//    Apakah loop berhenti? Apakah saldo pernah TEPAT 0?
//
//    JAWABAN:
let saldo = 100;
while (saldo > 0) {
    saldo = saldo - 60;
}
console.log(saldo);   // -20
// Berhenti — tapi bukan karena pas menyentuh 0: 100 → 40 → -20.
// Kondisi > 0 salah justru saat saldo MENJADI -20 (melewati 0,
// bukan berhenti tepat di 0). Pelajaran while: pastikan arah
// perubahan benar-benar MEMOTONG kondisi — mengurangi 60 dari 100
// tidak pernah menghasilkan tepat 0, dan while tidak peduli:
// dia cuma berhenti saat kondisi jadi salah, seberapa pun
// "jauhnya" meleset.
