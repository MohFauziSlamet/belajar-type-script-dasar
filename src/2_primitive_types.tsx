// ========================================
// TIPE DATA PRIMITIF (STRING, NUMBER, BOOLEAN)
// ========================================
// (PDF "TypeScript Dasar" hlm. 26-34)
//
// TypeScript hanya punya 3 tipe primitif. Bandingkan dengan Dart:
//   Dart        → TypeScript
//   String      → string  (huruf kecil!)
//   int, double → number  (keyword int/double TIDAK ADA di TypeScript)
//   bool        → boolean
//
// MATERI SEBELUMNYA: file 1 (function, template literal, console.log, const/let).


// ------------------------------------------------------------------
// (1) STRING — teks, dibungkus "..." atau '...' (dua-duanya sah)
//
// Jika di Dart seperti ini:  String nama = 'Fauzi';
// di TypeScript jadi seperti ini:  let nama: string = 'Fauzi';
// (tipe ditulis SETELAH nama + huruf kecil — ingat dari file 1)
// ------------------------------------------------------------------

export function sapa(nama: string): string {
    return `Halo, ${nama}!`;
}

console.log(sapa("Fauzi"));   // Halo, Fauzi!
console.log(sapa("Azka"));    // Halo, Azka!

const namaToko: string = "Mocca POS";  // pakai "..." juga sah
console.log(namaToko);                  // Mocca POS


// ------------------------------------------------------------------
// (2) NUMBER — SEMUA angka (bulat & desimal) cuma punya satu tipe
//
// Jika di Dart seperti ini:
//     int umur = 25;
//     double berat = 62.5;
// di TypeScript jadi seperti ini: dua-duanya number
//     let umur: number = 25;
//     let berat: number = 62.5;
//
// Rasanya paling mirip `num` di Dart (induk int & double) — bedanya
// `number` dipakai untuk SEMUA angka, bukan kasus khusus.
// ------------------------------------------------------------------

export function luasPersegi(sisi: number): number {
    return sisi * sisi;
}

const umur: number = 25;
const berat: number = 62.5;
const hexa: number = 0xff; // heksadesimal juga number

console.log(umur, berat, hexa);  // 25 62.5 255
console.log(luasPersegi(5));     // 25
console.log(luasPersegi(3.5));   // 12.25   desimal juga termasuk number
console.log(berat * 2);          // 125

// Format angka desimal:
// jika di Dart:     harga.toStringAsFixed(2)
// di TypeScript:    harga.toFixed(2)
const harga: number = 15000;
console.log(harga.toFixed(2)); // 15000.00
console.log(harga.toFixed(1)); // 15000.0


// ------------------------------------------------------------------
// (3) BOOLEAN — hanya true atau false (Dart: bool, TS: boolean)
//
// Hasil perbandingan selalu boolean — sama seperti Dart.
// ------------------------------------------------------------------

export function genap(angka: number): boolean {
    return angka % 2 === 0; // % dan === perilakunya sama seperti Dart
}

const tokoBuka: boolean = true;
console.log(tokoBuka);   // true
console.log(genap(4));   // true
console.log(genap(7));   // false
console.log(umur >= 17); // true


// ------------------------------------------------------------------
// (4) KOMBINASI ketiganya dalam satu function
// Ternary ?: SAMA PERSIS dengan Dart.
// ------------------------------------------------------------------

export function buatProfil(nama: string, umur: number, aktif: boolean): string {
    const status = aktif ? "aktif" : "tidak aktif";
    return `${nama} berumur ${umur} tahun, status: ${status}`;
}

console.log(buatProfil("Azka", 5, true));    // Azka berumur 5 tahun, status: aktif
console.log(buatProfil("Budi", 30, false));  // Budi berumur 30 tahun, status: tidak aktif


// ------------------------------------------------------------------
// (5) TYPE INFERENCE — TypeScript menebak tipe dari nilai awal
//
// Tidak wajib tulis ": number" — cukup tulis nilainya, TS yang menebak.
// Hasilnya TETAP strongly typed (bukan jadi bebas seperti dynamic).
// Analogi Dart: seperti `var umur = 20;` yang tetap terkunci jadi int.
// ------------------------------------------------------------------

export function demoTipeInference(): { teks: string; angka: number; benar: boolean } {
    const teks = "Belajar TypeScript"; // TS tahu ini string
    const angka = 2024;                // TS tahu ini number
    const benar = true;                // TS tahu ini boolean
    return { teks, angka, benar };     // { teks, angka } singkatan { teks: teks, ... }
}

console.log(demoTipeInference()); // { teks: 'Belajar TypeScript', angka: 2024, benar: true }


// ------------------------------------------------------------------
// (6) STRONGLY TYPED — nilai boleh BERUBAH, TIPE tidak boleh
//
// let (≈ var di Dart) bisa di-reassign.
// Tapi sekali number, selamanya number.
// ------------------------------------------------------------------

export function demoUbahNilai(): number {
    let umur = 20;       // tipe: number (ditebak otomatis / inference)
    umur = 21;           // ✅ valid, masih number
    umur = umur + 1;     // ✅ valid, masih number
    return umur;
}

console.log(demoUbahNilai()); // 22

let stok = 10;
stok = 15; // ✅ masih number
console.log(stok); // 15

// stok = "habis";
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    (penjelasan cara membaca error ini: menyusul di materi Union Type)


// ========================================
// RANGKUMAN
// ========================================
// 1. TS hanya punya 3 primitif: string, number, boolean — semuanya
//    huruf kecil dan ditulis SETELAH nama variabel.
// 2. Dart int + double → TS number (keyword int/double tidak ada).
//    toStringAsFixed(2) → toFixed(2).
// 3. Dart bool → TS boolean.
// 4. Type inference: `let umur = 20` cukup — TS menebak, tetap ketat.
//    Jika di Dart `var` menebak sekali lalu terkunci → di TS sama.
// 5. Strongly typed: nilai boleh berubah (let), tipe TIDAK boleh.
//    Error-nya kelihatan saat `npx tsc --noEmit`, bukan saat tsx/Jest.
//
// Cara menjalankan file ini:  npx tsx src/2_primitive_types.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================
// 1. Buat variabel produk (string), hargaJual (number), readyStock
//    (boolean) tanpa type annotation (andalkan inference), lalu
//    gabungkan ketiganya dalam satu console.log template literal.
//
//    JAWABAN: (perhatikan: tanpa ": string" / ": number" pun TS tahu)
const produk = "Kopi Susu";   // ditebak string
const hargaJual = 18000;      // ditebak number
const readyStock = true;      // ditebak boolean
console.log(`${produk} harga Rp${hargaJual} — ready: ${readyStock}`);
// Kopi Susu harga Rp18000 — ready: true

// 2. Buat function totalHarga(harga: number, jumlah: number): number
//    yang mengembalikan harga * jumlah, cetak hasilnya.
//
//    JAWABAN:
function totalHarga(harga: number, jumlah: number): number {
    return harga * jumlah;
}
console.log(totalHarga(18000, 3)); // 54000

// 3. Eksperimen strongly typed: uncomment baris `stok = "habis"` di
//    atas, jalankan `npx tsc --noEmit`, baca errornya, lalu
//    comment-kan kembali.
//
//    JAWABAN: error yang muncul kira-kira seperti ini:
//    ---------------------------------------------------------------
//    src/2_primitive_types.tsx:135:1
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    ---------------------------------------------------------------
//    Cara bacanya (dari kiri):
//    - lokasi file + barisnya          → src/2_primitive_types.tsx:135
//    - kode error TS2322               → "assignment" salah tipe
//    - Type 'string' (nilai baru)      → "habis" itu string
//    - not assignable to type 'number' → tidak bisa masuk ke variabel number
//    Pelajaran: TS tahu `stok` dulunya number (dari inference `= 10`),
//    jadi string ditolak. Nilai boleh berubah, tipe tidak.
