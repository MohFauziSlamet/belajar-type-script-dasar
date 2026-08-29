// ========================================
// IF STATEMENT
// ========================================
// (PDF "TypeScript Dasar" hlm. 116-118: If Statement,
//  Kode : If Statement)
// Materi sebelumnya: Bagian 4 (Function, Parameter, Overloading, Callback).
// Sekarang kita memulai Bagian 5 — Control Flow, diawali dengan percabangan
// kondisi If Statement (`if`, `else if`, `else`).


// ------------------------------------------------------------------
// (1) SINTAKS DASAR IF, ELSE IF, ELSE (DART VS TYPESCRIPT)
//
// PDF hlm. 117-118: Percabangan if di TypeScript bekerja sama persis
// seperti di JavaScript untuk mengeksekusi blok kode berdasarkan kondisi boolean.
//
// Jika di Dart seperti ini:
//     final int examValue = 90;
//     if (examValue > 80) {
//         print('Good');
//     } else if (examValue > 60) {
//         print('Not Bad');
//     } else {
//         print('Try Again');
//     }
// di TypeScript jadi seperti ini:
//     const examValue: number = 90;
//     if (examValue > 80) {
//         console.log("Good");
//     } else if (examValue > 60) {
//         console.log("Not Bad");
//     } else {
//         console.log("Try Again");
//     }
//
// KEMIRIPAN BESAR:
// - Struktur kata kunci `if`, `else if`, dan `else` serta blok `{}`
//   memiliki alur logika yang identik di kedua bahasa.
// ------------------------------------------------------------------

const examValue: number = 90;

if (examValue > 80) {
    console.log("Good");              // Good
} else if (examValue > 60) {
    console.log("Not Bad");
} else {
    console.log("Try Again");
}

const nilaiRemidi: number = 55;

if (nilaiRemidi > 80) {
    console.log("Good");
} else if (nilaiRemidi > 60) {
    console.log("Not Bad");
} else {
    console.log("Try Again");         // Try Again
}


// ------------------------------------------------------------------
// (2) TRUTHY & FALSY: PERBEDAAN BESAR DENGAN DART
//
// PERBEDAAN SANGAT NYATA:
// - Di Dart: Kondisi di dalam `if (...)` WAJIB bertipe `bool` statis.
//   Menulis `if ("teks")` atau `if (1)` di Dart langsung ERROR:
//   `error - Conditions must have a static type of 'bool'. (non_bool_condition)`.
//
// - Di TypeScript: Mewarisi konsep Truthy & Falsy dari JavaScript.
//   Nilai apa pun dapat diletakkan di dalam kondisi `if (...)`.
//
// NILAI FALSY (dianggap false):
//   `false`, `0`, `-0`, `0n`, `""` (string kosong), `null`, `undefined`, `NaN`.
//
// NILAI TRUTHY (dianggap true):
//   Semua nilai selain falsy, TERMASUK `"0"`, `"false"`, `[]` (array kosong), `{}` (object kosong)!
//
// JEBAKAN KLASIK DART DEVELOPER:
// Di Dart, kita mengecek list kosong dengan `list.isNotEmpty`.
// Di TypeScript, `if ([])` bernilai TRUE karena object/array kosong adalah TRUTHY!
// Untuk mengecek apakah array memiliki isi di TypeScript, WAJIB gunakan `if (arr.length > 0)`.
// ------------------------------------------------------------------

const teksKosong: string = "";
if (teksKosong) {
    console.log("Ada teks");
} else {
    console.log("Falsy: teks kosong");              // Falsy: teks kosong
}

const antrean: string[] = [];
if (antrean.length > 0) {
    console.log("Ada antrean");
} else {
    console.log("Antrean kosong (length = 0)");     // Antrean kosong (length = 0)
}


// ------------------------------------------------------------------
// (3) STRICT EQUALITY (===) VS LOOSE EQUALITY (==)
//
// Di JavaScript terdapat dua jenis operator kesetaraan:
// 1. `===` (Strict Equality): Memeriksa kesetaraan NILAI dan TIPE secara ketat.
// 2. `==` (Loose Equality): Melakukan *type coercion* implisit (misal `"10" == 10` bernilai true).
//
// BEST PRACTICE: SELALU gunakan `===` dan `!==` di TypeScript!
//
// PENJAGA COMPILER TS2367:
// TypeScript melindungi kita dari kesalahan membandingkan dua variabel
// dengan tipe data yang sama sekali tidak beririsan (*no overlap*).
// ------------------------------------------------------------------

const role: string = "admin";

if (role === "admin") {
    console.log("Akses Diberikan");   // Akses Diberikan
} else {
    console.log("Akses Ditolak");
}

// const skorTeks: string = "100";
// const skorAngka: number = 100;
// if (skorTeks === skorAngka) {
//     console.log("Sama");
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2367: This comparison appears to be unintentional because
//    the types 'string' and 'number' have no overlap.


// ------------------------------------------------------------------
// (4) TYPE NARROWING MELALUI IF STATEMENT (MIRIP DART TYPE PROMOTION)
//
// Sama seperti Dart yang melakukan *Type Promotion* saat dicek `if (val is String)`,
// TypeScript secara cerdas melakukan *Type Narrowing* di dalam blok `if`:
// ------------------------------------------------------------------

function formatNilai(input: string | number): string {
    if (typeof input === "string") {
        // Di cabang ini, `input` otomatis dikenali sebagai `string` murni
        return input.toUpperCase();
    } else {
        // Di cabang ini, `input` otomatis dikenali sebagai `number` murni
        return input.toFixed(2);
    }
}

console.log(formatNilai("lulus"));   // LULUS
console.log(formatNilai(85));        // 85.00


// ------------------------------------------------------------------
// (5) OPERATOR LOGIKA: AND (&&), OR (||), DAN NOT (!)
//
// Menggabungkan beberapa kondisi boolean di dalam `if`.
//
// Jika di Dart seperti ini:
//     if (umur >= 17 && punyaSim) { ... }
// di TypeScript jadi seperti ini:
//     if (umur >= 17 && punyaSim) { ... }
//
// KEMIRIPAN BESAR:
// - Simbol operator logika (`&&`, `||`, `!`) dan sifat *short-circuit evaluation*
//   (evaluasi berhenti begitu hasil sudah pasti) sama persis antara Dart dan TypeScript.
// ------------------------------------------------------------------

const umur: number = 20;
const punyaSim: boolean = true;

if (umur >= 17 && punyaSim) {
    console.log("Boleh Mengemudi");   // Boleh Mengemudi
} else {
    console.log("Belum Boleh Mengemudi");
}


// ========================================
// RANGKUMAN
// ========================================
// 1. Percabangan `if`, `else if`, `else` di TypeScript memiliki struktur alur logika
//    yang identik dengan Dart dan JavaScript (PDF hlm. 116-118).
// 2. PERBEDAAN BESAR DENGAN DART: Dart mewajibkan kondisi bertipe `bool` statis (non_bool_condition),
//    sedangkan TypeScript mendukung konsep Truthy & Falsy.
// 3. Nilai Falsy di TypeScript: `false`, `0`, `""` (string kosong), `null`, `undefined`, `NaN`.
// 4. JEBAKAN ARRAY KOSONG: `[]` dan `{}` adalah TRUTHY di TypeScript. Untuk memeriksa array
//    kosong, selalu periksa panjangnya: `if (arr.length > 0)`.
// 5. Selalu gunakan `===` (Strict Equality) dan `!==` (Strict Inequality) untuk mencegah bug type coercion.
// 6. TypeScript mencegah pembandingan tak masuk akal antar tipe yang tidak beririsan via error TS2367.
// 7. Percabangan `if` dengan `typeof` atau pengecekan null otomatis melakukan Type Narrowing (Smart Cast).
//
// Cara menjalankan file ini:  npx tsx src/27_if_statement.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat fungsi `evaluasiDiskon(totalBelanja: number, member: boolean): number` menggunakan `if`:
//    - Jika member dan totalBelanja >= 100000 -> kembalikan 20 (persen).
//    - Jika member tapi totalBelanja < 100000 -> kembalikan 10.
//    - Jika bukan member tapi totalBelanja >= 200000 -> kembalikan 5.
//    - Selain itu -> kembalikan 0.
//    Panggil dan cetak hasilnya untuk beberapa skenario.
//
//    JAWABAN:
function evaluasiDiskon(totalBelanja: number, member: boolean): number {
    if (member && totalBelanja >= 100000) {
        return 20;
    } else if (member) {
        return 10;
    } else if (totalBelanja >= 200000) {
        return 5;
    } else {
        return 0;
    }
}

console.log(evaluasiDiskon(150000, true));   // 20
console.log(evaluasiDiskon(50000, true));    // 10
console.log(evaluasiDiskon(250000, false));  // 5
console.log(evaluasiDiskon(50000, false));   // 0

// 2. Ramal dulu, baru cek: Mengapa kode `if ([])` di bawah ini mencetak "arr adalah truthy",
//    padahal array-nya tidak memiliki elemen sama sekali?
//
//    JAWABAN:
const arr: number[] = [];
if (arr) {
    console.log("arr adalah truthy");        // arr adalah truthy
}
// Penjelasan: Di JavaScript & TypeScript, array adalah Object (`typeof [] === "object"`).
// Semua referensi Object (termasuk array kosong `[]` dan object kosong `{}`) dialokasikan
// di memori dan dianggap sebagai nilai TRUTHY. Oleh karena itu, untuk mengecek apakah array
// memiliki elemen, kita harus memeriksa properti panjangnya: `if (arr.length > 0)`.

// 3. Eksperimen error TS2367: uncomment blok pembandingan `skorTeks === skorAngka`
//    di sub-section (3), jalankan `npx tsc --noEmit`, baca pesannya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/27_if_statement.tsx:124:5
//    error TS2367: This comparison appears to be unintentional because the types 'string' and 'number' have no overlap.
//    ---------------------------------------------------------------
//    Penjelasan: TypeScript mendeteksi bahwa tipe `string` dan `number` tidak pernah bisa
//    bernilai sama secara strict (`===`), sehingga compiler menganggap pembandingan ini
//    sebagai kesalahan logika developer yang tidak disengaja.
