// ========================================
// FOR LOOP
// ========================================
// (PDF "TypeScript Dasar" hlm. 125-127: For Loop, Kode : For Loop)
// Materi sebelumnya: file 27-29 (if, ternary, switch). Ini LOOP
// PERTAMA kurikulum — setelah file ini, loop sah dipakai di
// latihan-latihan berikutnya. Prasyarat: file 3 (array, .length),
// file 13 (Object.keys), file 18 (indexable interface).


// ------------------------------------------------------------------
// (1) FOR KLASIK — INIT; KONDISI; STEP — IDENTIK DENGAN DART
//
// PDF hlm. 126: perulangan For di TypeScript sama seperti di
// JavaScript, dan mendukung for biasa, for-in, dan for-of.
//
//     for (let i = 0; i < 5; i++) { ... }
//      ↑        ↑        ↑       ↑
//   mulai    selama   naikkan   badan loop
//
// Jika di Dart seperti ini:
//     for (var i = 0; i < 5; i++) { print(i); }
// di TypeScript jadi seperti ini: PERSIS SAMPAI HURUF — cukup
// ganti var jadi let (kata kunci "nilai yang akan berubah",
// kebiasaan lama kita sejak file 3). Nol usaha, langsung jalan.
// ------------------------------------------------------------------

for (let i = 0; i < 5; i++) {
    console.log(i);   // 0 1 2 3 4 (baris terpisah: 0,1,2,3,4)
}

// Pola paling sering: menjelajah array lewat index (file 3:
// array diakses lewat [index], panjangnya .length):
const belanja = ["satu", "dua", "tiga"];
for (let i = 0; i < belanja.length; i++) {
    console.log(i, belanja[i]);   // 0 satu / 1 dua / 2 tiga
}

// Mundur pun tinggal dibalik:
for (let i = 3; i > 0; i--) {
    console.log(i);   // 3 2 1 (baris terpisah: 3,2,1)
}


// ------------------------------------------------------------------
// (2) FOR-OF — ITERASI NILAI (≈ FOR-IN DART)
//
// Cara modern menjelajah array TANPA mengurus index:
//
//     for (const item of belanja) { ... }
//                     ↑ "untuk setiap item DI DALAM belanja"
//
// Jika di Dart seperti ini:
//     for (final item in belanja) { print(item); }   ← nilai!
// di TypeScript jadi seperti ini: ganti `in` jadi `of` —
// PERHATIKAN KATANYA: Dart pakai in untuk NILAI, TS pakai of
// (in di TS artinya lain — jebakan besar di sub-section 3).
//
// for-of juga jalan untuk STRING (per karakter) dan array berisi
// object (pola keranjang file 11/15).
// ------------------------------------------------------------------

for (const item of belanja) {
    console.log(item);   // satu / dua / tiga (baris terpisah)
}

for (const huruf of "TS") {
    console.log(huruf);   // T / S
}

const keranjang = [
    { nama: "Pensil", harga: 2000 },
    { nama: "Buku", harga: 5000 },
];
for (const barang of keranjang) {
    console.log(barang.nama, barang.harga);   // Pensil 2000 / Buku 5000
}

// Pola AKUMULATOR — menjumlahkan sambil berjalan. (Ingat file 15
// dulu sengaja menghindari loop karena belum diajarkan — sekarang sah!)
const hargaBarang = [2000, 5000, 1000];
let total = 0;
for (const h of hargaBarang) {
    total += h;
}
console.log(total);   // 8000


// ------------------------------------------------------------------
// (3) FOR-IN — JEBAKAN TERBESAR: ITERASI INDEX/KEY, BUKAN NILAI!
//
// PERBEDAAN NYATA yang WAJIB diingat Dart developer:
//   for-in DART  → iterasi NILAI    ("untuk setiap item")
//   for-in TS/JS → iterasi INDEX/KEY — dan tipenya STRING!
//
//     for (const k in belanja) { ... }   ← k = "0", "1", "2"
//
// Terlihat seperti angka saat dicetak, tapi typeof membongkarnya.
// Akibat paling sering tersandung: k + 1 BUKAN menambah angka —
// ia MENGGABUNG STRING ("0" + 1 = "01" — ingat file 7 tentang
// operator + pada string). Untuk iterasi nilai, pakai for-of
// (sub-section 2) — for-in pada array hampir selalu salah pilihan.
//
// Kegunaan ASLI for-in: menjelajah KEY sebuah OBJECT — pasangan
// dari Object.keys file 13. Catatan penjaga: object-nya perlu
// bentuk indexable interface (file 18) supaya boleh di-index
// dengan kunci string-nya.
// ------------------------------------------------------------------

for (const k in belanja) {
    console.log(k, typeof k);   // 0 string / 1 string / 2 string
}

for (const k in belanja) {
    console.log(k + 1);   // 01 / 11 / 21  ← penggabungan, BUKAN jumlah!
}

const warna: { [kunci: string]: string } = { merah: "red", hijau: "green" };
for (const kunci in warna) {
    console.log(kunci, "→", warna[kunci]);   // merah → red / hijau → green
}

// Kalau warna ditulis object literal ketat ({ merah: "red" } tanpa
// index signature), warna[kunci] ditolak TS7053 — sama keluarga
// dengan TS7015 file 18: compiler menolak menebak index bebas.
// Solusinya persis file 18: beri index signature (bentuk di atas).


// ------------------------------------------------------------------
// (4) PENJAGA COMPILER — EMPAT BENTUK
//
// Loop punya penjaga sendiri; semuanya terverifikasi:
// ------------------------------------------------------------------

// const objekBiasa = { a: 1, b: 2 };
// for (const x of objekBiasa) { console.log(x); }
// ❌ ERROR kalau di-uncomment:
//    error TS2488: Type '{ a: number; b: number; }' must have a
//    '[Symbol.iterator]()' method that returns an iterator.
//    (for-of hanya untuk yang "bisa dijelajahi": array, string...
//    object biasa TIDAK punya pintu iterator. Untuk object, pakai
//    for-in di sub-section 3)

// for (const x of 42) { console.log(x); }
// ❌ ERROR kalau di-uncomment:
//    error TS2488: Type '42' must have a '[Symbol.iterator]()'
//    method that returns an iterator.
//    (angka juga bukan "bisa dijelajahi" — keluarga error yang sama)

// for (const k in belanja) {
//     const idx: number = k;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    (bukti tertulis dari sub-section 3: index for-in itu STRING —
//    mau dijadikan number, harus lewat konversi sungguhan seperti
//    Number(k) file 22)

// for (const i = 0; i < 5; i++) { console.log(i); }
// ❌ ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'i' because it is a constant.
//    (i++ = mengubah i — jadi pakai let. Ingat pelajaran const di
//    file 16: const menjaga VARIABEL, dan inilah errornya yang
//    persis sama. Kecuali for-OF: const-nya aman karena tiap
//    putaran dapat NILAI BARU, bukan mengubah lama)

// for (let i = 0; i < "3"; i++) { console.log(i); }
// ❌ ERROR kalau di-uncomment:
//    error TS2365: Operator '<' cannot be applied to types 'number'
//    and 'string'.
//    (kondisi klasik membandingkan number dengan string — ditahan,
//    padahal JavaScript diam-diam akan berperilaku aneh)


// ========================================
// RANGKUMAN
// ========================================
// 1. TIGA bentuk for (PDF hlm. 126): klasik (init;kondisi;step),
//    for-of, for-in.
// 2. FOR KLASIK identik dengan Dart — tinggal var → let. Pola
//    andalan: i < arr.length + arr[i] (file 3).
// 3. FOR-OF iterasi NILAI — inilah bentuk yang SETARA dengan
//    for-in Dart: array, string per karakter,
//    array of objects. Konsepnya "untuk setiap item".
// 4. PERBEDAAN NYATA TERBESAR file ini: for-in TS iterasi INDEX/
//    KEY bertipe STRING ("0","1",...), BUKAN nilai — kebalikan
//    intuisi Dart (untuk nilai: Dart in = TS of; TS in = jebakan).
//    Bukti: typeof k "string", k + 1 = "01" (gabungan string).
// 5. for-in yang berguna: menjelajah KEY object — dengan syarat
//    object bertipe indexable interface (file 18) supaya
//    obj[kunci] lolos; object literal ketat → TS7053.
// 6. Penjaga: for-of pada object/number → TS2488 (harus punya
//    [Symbol.iterator]); index for-in ke number → TS2322; const
//    di for klasik + i++ → TS2588; number < string → TS2365.
// 7. Pola akumulator (let total; total += item) — pola menjumlah
//    sambil berjalan — resmi diajarkan mulai file ini.
//
// Cara menjalankan file ini:  npx tsx src/30_for_loop.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Dengan for klasik, cetak KUADRAT angka 1 sampai 5 (1, 4, 9,
//    16, 25) — satu baris per angka.
//
//    JAWABAN:
for (let n = 1; n <= 5; n++) {
    console.log(n * n);   // 1 / 4 / 9 / 16 / 25 (baris terpisah)
}

// 2. Ramal dulu, baru cek: apa hasil potongan ini?
//       const buah = ["apel", "mangga"];
//       for (const k in buah) { console.log(k + 1); }
//    Lalu tulis versi for-of yang mencetak ISI buahnya.
//
//    JAWABAN:
const buah = ["apel", "mangga"];
for (const k in buah) {
    console.log(k + 1);   // 01 / 11  ← index string "0"/"1"
                          // digabung angka 1 — bukan jumlah!
}
for (const b of buah) {
    console.log(b);   // apel / mangga  ← nilai, bukan index
}

// 3. Eksperimen error TS2488: uncomment `const objekBiasa = ...`
//    dan `for (const x of objekBiasa) ...` di sub-section (4),
//    jalankan `npx tsc --noEmit`, baca — lalu comment-kan kembali.
//    Pertanyaan: kenapa array dan string BOLEH di for-of, tapi
//    object biasa tidak? Apa itu "[Symbol.iterator]()"?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/30_for_loop.tsx:136:17
//    error TS2488: Type '{ a: number; b: number; }' must have a
//    '[Symbol.iterator]()' method that returns an iterator.
//    ---------------------------------------------------------------
//    for-of meminta satu hal dari targetnya: "cara berjalan langkah
//    demi langkah" — resminya method [Symbol.iterator]() yang
//    mengembalikan iterator. Array dan string PUNYA mekanisme itu
//    bawaan (array: elemen demi elemen; string: karakter demi
//    karakter). Object biasa TIDAK punya — JavaScript tidak
//    menetapkan urutan jalan untuk property. Makanya untuk object
//    jalannya lewat KEY (for-in sub-section 3), bukan iterator.
//    (Symbol adalah jenis "label khusus" JavaScript — cukup tahu
//    ada; memahami dalam-dalam tidak diperlukan di tahap ini.)
