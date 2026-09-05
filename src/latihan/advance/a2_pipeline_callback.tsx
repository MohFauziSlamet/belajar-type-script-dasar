// ========================================
// LATIHAN ADVANCE 2 — PIPELINE DATA CALLBACK
// ========================================
// Level: Advance
// Konsep: function interfaces (materi 17), function sebagai parameter
//         / callback (materi 26), for-of (materi 30)
// Program: pipeline angka — data melewati tahap transformasi lewat
//          fungsi yang dikirim sebagai argumen.

// ========================================
// SOAL
// ========================================
// 1. Definisikan function interface Transformer: menerima number,
//    mengembalikan number. Buat dua implementasi: kaliDua dan
//    tambahPajak (pajak 10%, hitung (n * 11) / 10 supaya mulus).
// 2. Buat fungsi terapkan(data: number[], t: Transformer): number[]
//    yang mengembalikan array baru hasil transformasi — pakai for-of
//    + push (versi loop; .map() belum dibahas materi dasar).
// 3. Definisikan type Formatter = (n: number) => string, fungsi
//    formatSemua(data, f) serupa tapi menghasilkan string[].
// 4. Rangkai PIPELINE: data [1000, 2500, 500] → kaliDua → tambahPajak
//    → format "Rp...". Cetak tiap tahap. Lalu coba satu callback
//    anonim langsung di argumen: (n) => n * 3.
// 5. Ramal dulu: apa error kalau callback-nya (s: string) => s.length?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) FUNCTION INTERFACE — kontrak UNTUK BENTUK FUNGSI
//     (Jika di Dart: typedef Transformer = int Function(int);
//      di TS bentuk fungsi ditulis sebagai anggota call-signature)
// ------------------------------------------------------------------
interface Transformer {
  (input: number): number; // bentuk pemanggilan, bukan property
}

const kaliDua: Transformer = (input: number): number => input * 2;

function tambahPajak(n: number): number {
  return (n * 11) / 10; // +10% — dikali & dibagi dulu supaya mulus
}

console.log(kaliDua(500));    // 1000
console.log(tambahPajak(500)); // 550

// ------------------------------------------------------------------
// (2) FUNCTION SEBAGAI PARAMETER — terapkan menerima "resep" ubah
//     (callback = fungsi yang dititipkan, materi 26)
// ------------------------------------------------------------------
function terapkan(data: number[], t: Transformer): number[] {
  const hasil: number[] = [];
  for (const n of data) {
    hasil.push(t(n)); // jalankan resep yang dititipkan
  }
  return hasil;
}

console.log(terapkan([1000, 2500, 500], kaliDua)); // [ 2000, 5000, 1000 ]

// ------------------------------------------------------------------
// (3) TYPE ALIAS utk bentuk fungsi — dua-duanya sah bersama interface;
//     tulisan arrow lebih ringkas, maknanya sama
// ------------------------------------------------------------------
type Formatter = (n: number) => string;

const rp: Formatter = (n: number): string => `Rp${n}`;

function formatSemua(data: number[], f: Formatter): string[] {
  const hasil: string[] = [];
  for (const n of data) {
    hasil.push(f(n));
  }
  return hasil;
}

console.log(formatSemua([2200, 5500], rp)); // [ 'Rp2200', 'Rp5500' ]

// ------------------------------------------------------------------
// (4) PIPELINE — keluaran satu tahap jadi masukan tahap berikutnya
// ------------------------------------------------------------------
const data: number[] = [1000, 2500, 500];

const tahap1: number[] = terapkan(data, kaliDua);      // ×2
const tahap2: number[] = terapkan(tahap1, tambahPajak); // +10%
const tampil: string[] = formatSemua(tahap2, rp);       // "Rp..."

console.log(tahap1); // [ 2000, 5000, 1000 ]
console.log(tahap2); // [ 2200, 5500, 1100 ]
console.log(tampil); // [ 'Rp2200', 'Rp5500', 'Rp1100' ]

console.log(terapkan(data, (n) => n * 3)); // callback ANONIM langsung
// [ 3000, 7500, 1500 ]

// ------------------------------------------------------------------
// (5) RAMAL DULU: callback (s: string) => s.length bentuknya tak
//     cocok dengan kontrak Transformer (param harus number)
// ------------------------------------------------------------------
// const salahCallback = terapkan([1, 2], (s: string) => s.length);
// ERROR TS2345: Argument of type '(s: string) => number' is not assignable to parameter of type 'Transformer'.
//   Types of parameters 's' and 'input' are incompatible.
//     Type 'number' is not assignable to type 'string'.

// ========================================
// RANGKUMAN
// ========================================
// - Function interface / type alias = kontrak BENTUK fungsi ≈ typedef
//   Dart; implementasinya bebas (arrow, function biasa, anonim).
// - Callback = fungsi sebagai argumen — dipanggil di dalam fungsi
//   penerima (t(n)); array hasil dibangun dengan for-of + push.
// - Pipeline = menyusun terapkan berantai: keluaran tahap awal
//   menjadi masukan tahap berikutnya.
// - Callback yang bentuknya menyimpang dari kontrak ditolak tsc
//   lewat TS2345 — ketertiban tetap terjaga tanpa runtime check.

