// ========================================
// DO WHILE LOOP
// ========================================
// (PDF "TypeScript Dasar" hlm. 131-133: Do While Loop,
//  Kode : Do While Loop)
// Materi sebelumnya: file 31 (while — cek dulu). Prasyarat: file 30
// (for). Catatan kurikulum: break/continue menyusul di file
// berikutnya — file ini TIDAK memakainya.


// ------------------------------------------------------------------
// (1) BENTUK DASAR — JALAN DULU, CEK BELAKANGAN
//
// PDF hlm. 132: TypeScript mendukung perulangan Do While Loop.
// Urutannya kebalikan while: badan DIJALANKAN DULU, kondisi dicek
// BELAKANGAN — lalu diulang selama kondisi benar:
//
//     let hitung = 1;
//     do {
//         console.log(hitung);   ← jalan dulu, tanpa tanya
//         hitung++;
//     } while (hitung <= 3);     ← cek belakangan; titik koma!
//
// Jika di Dart seperti ini:
//     var hitung = 1;
//     do {
//       print(hitung);
//       hitung++;
//     } while (hitung <= 3);
// di TypeScript jadi seperti ini: PERSIS huruf demi huruf (var →
// let). Konsep do-while Dart terbawa utuh — nol usaha.
// ------------------------------------------------------------------

let hitung = 1;
do {
    console.log(hitung);   // 1 / 2 / 3 (baris terpisah)
    hitung++;
} while (hitung <= 3);


// ------------------------------------------------------------------
// (2) KONTRAS INTI DENGAN WHILE — MINIMAL SATU ITERASI
//
// Selama kondisi benar sejak awal, do-while berperilaku sama
// dengan while. BEDANYA baru terlihat saat kondisi SALAH sejak
// awal:
//   while  : cek dulu → kondisi salah → badan DILEWATI (0 iterasi)
//   do-while: jalan dulu → baru sadar kondisi salah (1 iterasi)
//
// Terverifikasi dua-duanya (dan Dart berperilaku SAMA — ini sifat
// do-while universal, bukan beda bahasa):
// ------------------------------------------------------------------

let w = 100;
while (w > 200) {
    console.log("while: baris ini tak pernah jalan");
    w++;
}
console.log(w);   // 100   ← while: 0 iterasi, w utuh

let d = 100;
do {
    console.log(d);   // 100   ← do-while: jalan SEKALI...
    d++;
} while (d > 200);    // ...baru dicek: 101 > 200 salah → berhenti
console.log(d);   // 101


// ------------------------------------------------------------------
// (3) KAPAN DIPAKAI — "LAKUKAN DULU, ULANGI KALAU PERLU"
//
// Aturan praktisnya jelas:
//   - jumlah putaran PASTI diketahui        → for (file 30)
//   - cek dulu, mungkin tak jalan sama sekali → while (file 31)
//   - HARUS jalan minimal sekali             → do-while (file ini)
//
// Contoh pola nyata: "tambah terus sampai cukup" — nilai bertambah
// dulu satu kali, baru ditanya cukup belum. Mulai dari nol pun
// proses pertama tetap jalan.
// ------------------------------------------------------------------

let penuh = 0;
do {
    penuh = penuh + 3;   // isi dulu...
} while (penuh < 10);    // ...baru ditanya: kurang dari 10? ulangi
console.log(penuh);   // 12   ← 0→3→6→9→12: berhenti setelah LEWAT
                      // 10 (bukan tepat 10 — pelajaran saldo file 31
                      // berlaku juga di sini: kondisi cuma tanya,
                      // tidak menjamin mendarat pas)


// ------------------------------------------------------------------
// (4) PENJAGA & FAKTA TITIK KOMA — HASIL VERIFIKASI JUJUR
//
// Penjaga tipenya keluarga lama: TS2365 dan TS2588, persis while.
// Yang menarik justru TITIK KOMA setelah while(kondisi):
//
// Buku-buku menuliskan titik koma itu "wajib". Hasil verifikasi
// kami: HILANGNYA TERNYATA DIMAAFKAN compiler — baik saat baris
// berikutnya statement baru (dijalankan normal, sekali, tidak
// tertelan) maupun saat satu baris. JavaScript punya mekanisme
// otomatis (automatic semicolon insertion) yang menyelipkan titik
// koma itu sendiri untuk do-while. TAPI: tulis saja selalu —
// mengandalkan pemaafan compiler itu kebiasaan buruk, dan gaya
// eksplisit lebih mudah dibaca tim. PERBEDAAN NYATA dengan Dart:
// di Dart titik koma itu benar-benar WAJIB (tidak ada mesin
// pemaaf) — satu lagi tempat TS lebih longgar dari Dart.
// ------------------------------------------------------------------

// let j = 0;
// do { j++; } while (j < "3");
// ❌ ERROR kalau di-uncomment:
//    error TS2365: Operator '<' cannot be applied to types 'number'
//    and 'string'.
//    (keluarga while/for — file 30-31)

// const k = 0;
// do { k++; } while (k < 3);
// ❌ ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'k' because it is a constant.
//    (k++ mengubah k — penentu putaran wajib let)

// let tanpa = 0;
// do { tanpa++; } while (tanpa < 3)
// console.log("setelahnya jalan normal:", tanpa);
// ✅ BUKAN ERROR (hasil verifikasi): titik koma yang hilang
//    dimaafkan — statement berikutnya tetap berdiri sendiri.
//    Tulis tetap titik komanya demi keterbacaan.

// do { } while (true);
// SAMA seperti file 31: tsc BERSIH (compiler tidak mengecek alur),
// runtime menggant selamanya — JANGAN dijalankan. Catatan presisi:
// do-while lebih rawan pada pola "badan pertama MEMBALIK arah
// kondisi jadi selalu-benar" (jaring pengaman cek-dulu while
// hilang); kalau kondisi salah dan TETAP salah, do-while justru
// berhenti setelah sekali — seperti demo b di sub-section (2).


// ========================================
// RANGKUMAN
// ========================================
// 1. do { badan } while (kondisi); — JALAN DULU sekali, baru dicek
//    (PDF hlm. 132). Identik dengan Dart: var → let, selesai.
// 2. KONTRAS INTI dengan while: while bisa 0 iterasi (cek dulu);
//    do-while MINIMAL 1 iterasi (jalan dulu). Saat kondisi benar
//    sejak awal, dua-duanya sama.
// 3. Dart berperilaku sama persis (terverifikasi) — sifat do-while
//    universal, bukan beda bahasa.
// 4. Pemilihan loop: jumlah pasti → for; mungkin tak jalan → while;
//    wajib jalan minimal sekali → do-while.
// 5. Pelajaran "melewati batas" file 31 berlaku juga: penuh
//    bertambah 3 → berhenti di 12, BUKAN tepat 10 — kondisi cuma
//    bertanya, tidak menjamin mendarat pas.
// 6. Penjaga keluarga lama: TS2365 (number < string), TS2588
//    (const++). Titik koma setelah while(kondisi): buku bilang
//    wajib, verifikasi bilang DIMAAFKAN (automatic semicolon
//    insertion) — tetap tulis selalu demi kejelasan.
// 7. Infinite loop do-while sama tak ditangkap compiler (tsc
//    bersih) — dan lebih rawan saat badan pertama MEMBALIK arah
//    kondisi jadi selalu-benar (cek-dulu while hilang); kondisi
//    salah-dan-tetap-salah justru berhenti setelah sekali.
//
// Cara menjalankan file ini:  npx tsx src/32_do_while_loop.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Dengan do-while, cetak angka 5, 4, 3, 2, 1 (turun satu-satu).
//
//    JAWABAN:
let undur = 5;
do {
    console.log(undur);   // 5 / 4 / 3 / 2 / 1 (baris terpisah)
    undur--;
} while (undur >= 1);

// 2. Ramal dulu, baru cek: apa hasil DUA potongan ini?
//       let a = 50;
//       while (a < 10) { a++; }
//       console.log("a:", a);
//
//       let b = 50;
//       do { b++; } while (b < 10);
//       console.log("b:", b);
//
//    JAWABAN:
let a = 50;
while (a < 10) {
    a++;
}
console.log("a:", a);   // a: 50   ← kondisi salah, badan dilewati

let b = 50;
do {
    b++;
} while (b < 10);
console.log("b:", b);   // b: 51   ← jalan dulu sekali, baru dicek

// 3. Eksperimen kontras: bungkus potongan do-while di atas
//    (yang b: 50) dengan komentar, ganti kondisinya jadi
//    while (b > 10) — lalu jalankan `npx tsx src/32_do_while_loop.tsx`
//    (PERINGATAN: program akan MENGGANT — siapkan Ctrl+C, atau
//    cukup ramal dulu tanpa menjalankan).
//    Pertanyaan: kenapa hasilnya bukan 51 lagi, dan kira-kira
//    kapan loop itu berhenti?
//
//    JAWABAN: dengan kondisi b > 10 (benar untuk 51, 52, 53, ...):
//    b terus bertambah selama b > 10 — dan b sudah 51 di putaran
//    pertama, makin besar makin BENAR kondisinya... loop TIDAK
//    PERNAH berhenti: infinite loop (file 31 sub-section 4 —
//    compiler diam, program menggant, harus dihentikan paksa).
//    Pelajaran do-while: karena jalan dulu, kondisi yang "salah
//    arah" tidak menyelamatkan — justru kondisi harus BERUBAH
//    menuju SALAH agar berhenti; di sini arahnya menjauhi salah.
//    (Itulah kenapa potongan aslinya memakai b < 10: salah sejak
//    awal → berhenti setelah satu kali.)
