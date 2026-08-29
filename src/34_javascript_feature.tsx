// ==================================================================
// JAVASCRIPT FEATURE
// ==================================================================
// Sumber: PDF "TypeScript Dasar" hlm. 137-138 (materi TERAKHIR
// kelas Dasar; hlm. 139-140 hanya berisi jembatan ke kelas
// lanjutan). Semua klaim perilaku di file ini DIVERIFIKASI
// (tsc + tsx + Dart 3.11 via dart analyze/run).

// ------------------------------------------------------------------
// (1) PESAN INTI BUKU: JAVASCRIPT BISA → TYPESCRIPT BISA
//
// PDF hlm. 138: "Semua fitur yang pernah kita bahas di kelas
// JavaScript, bisa dilakukan di TypeScript. Seperti Operator
// Matematika, Perbandingan, Logika, String Template, Optional
// Chaining, With Statement, Default Parameter, Function Generator,
// Getter Setter, Destructuring, Modules, Standard Library dan
// lain-lain. Yang membedakan adalah, pada fitur TypeScript, karena
// Strongly Type, kita harus menentukan tipe data dari tiap
// variabel dan parameter."
//
// Cara pandangnya: TypeScript = JavaScript + lapisan tipe. Semua
// fitur bahasa JS tetap ada — yang ditambah hanyalah ANOTASI
// (dan pemeriksaannya). Kebalikannya juga berlaku sebagai jalan
// keluar (pesan penutup buku): kalau ingin variabel/parameter
// bebas tipe APA PUN persis seperti JavaScript, gunakan tipe
// `any` — tapi ingat pelajaran file 6: any mematikan pengawasan
// tipe, gunakan hanya kalau benar-benar perlu.
// ------------------------------------------------------------------

function jarakJs(angka: number): number {      // ← versi TS
    return angka * 2;                          // tipe dipaksa jelas
}
console.log("versi TS (bertipe):", jarakJs(21));   // versi TS (bertipe): 42

function jarakAny(angka: any): any {           // ← "kembali seperti JS"
    return angka * 2;                          // any = tanpa pengawasan
}
console.log("versi any (bebas):", jarakAny(21));   // versi any (bebas): 42

// ------------------------------------------------------------------
// (2) FITUR YANG SUDAH KITA PAKAI DIAM-DIAM SEPANJANG KELAS
//
// Tanpa dijelaskan formal, fitur JavaScript ini sudah lama jadi
// kebiasaan kita (tidak perlu dibahas ulang mendalam — cukup
// disadari):
//   - Operator matematika (+ * %), perbandingan (=== !== < >),
//     logika (&& || !)   → dipakai sejak file 1 & 27
//   - String template `teks ${ekspresi}` → sejak file 10
//     (Jika di Dart: 'teks $ekspresi' — cukup $ tanpa kurung
//     kurawal untuk variabel sederhana)
//   - Optional chaining ?. dan nullish ?? → file 12 dan 14 —
//     dan di sana sudah dibuktikan: SAMA PERSIS seperti di Dart
//   - Default parameter & rest parameter (...) → file 24
//   - Modules import/export → dipakai setiap file test proyek ini
// ------------------------------------------------------------------

const namaProduk = "Kopi";
const harga = 15000;
console.log(`Ringkasan: ${namaProduk} seharga ${harga}`);  // Ringkasan: Kopi seharga 15000

// ------------------------------------------------------------------
// (3) DESTRUCTURING — MENGERJAK ISI TANPA ALAMAT
//
// Destructuring = mengurai isi array/object LANGSUNG ke variabel
// dalam satu penugasan. Bayangkan paket kiriman: daripada membaca
// "kiriman laci 0, laci 1", kita buka sekali dan langsung bilang
// "yang ini buat m, yang ini buat n".
//
// Jika di Dart seperti ini (Dart 3 punya "patterns" — konsepnya
// SAMA, sebagian bentuknya beda):
//     final [x, y] = [10, 20];              // list pattern
//     final Orang(nama: n, kota: k) = org;  // object pattern
// di TypeScript jadi seperti ini:
//     const [x, y] = [10, 20];              // array: SAMA
//     const { nama: n, kota: k } = org;     // object: KURUNG KURAWAL
// Untuk ARRAY dua bahasa nyaris identik. Untuk OBJECT beda bentuk:
// TS langsung kurawal { nama } di tempat yang sama; Dart memakai
// pola NamaKelas(field: var) — dua-duanya destructuring, hanya
// idiom yang berbeda. Swap dua nilai pun dua-duanya bisa (di bawah).
// ------------------------------------------------------------------

const [x, y] = [10, 20];
console.log("array:", x, y);                       // array: 10 20

const [satu, , tiga] = [1, 2, 3];                  // elemen tengah di-skip
console.log("skip tengah:", satu, tiga);           // skip tengah: 1 3

const [pertama, ...sisanya] = [1, 2, 3, 4];        // ... menampung sisanya
console.log("rest:", pertama, sisanya);            // rest: 1 [ 2, 3, 4 ]

let m = 1;
let n = 2;
[m, n] = [n, m];                                   // swap tanpa variabel bantu
console.log("swap:", m, n);                        // swap: 2 1
// (Jika di Dart: (n, m) = (m, n); — swap record, juga tanpa
// variabel bantu — terverifikasi dart run)

type Orang = { nama: string; kota: string; umur?: number };
const org: Orang = { nama: "Eko", kota: "Bandung" };
const { nama, kota, umur = 30 } = org;             // default untuk optional
console.log("object:", nama, "dari", kota, "umur", umur);  // object: Eko dari Bandung umur 30

const { nama: panggilan } = org;                   // rename: nama → panggilan
console.log("rename:", panggilan);                 // rename: Eko

// ------------------------------------------------------------------
// (4) PANGKAT ** DAN STRING MULTI-BARIS
//
// Operator pangkat di TypeScript: ** (2 ** 10 artinya 2 pangkat
// 10). PERBEDAAN NYATA dengan Dart: Dart TIDAK punya operator **
// (dart analyze: error missing_identifier) — di Dart pakai fungsi
// math.pow(2, 10) dari package dart:math. Kebalikannya, string
// multi-baris dua-duanya punya dan mirip: TS pakai backtick `...`
// (bisa langsung menampung enter), Dart pakai triple-quote '''...'''.
// ------------------------------------------------------------------

console.log("2 pangkat 10:", 2 ** 10);             // 2 pangkat 10: 1024
console.log("2 pangkat 16:", 2 ** 16);             // 2 pangkat 16: 65536

const surat = `Halo,
ini baris kedua.`;                                 // enter langsung di dalam
console.log("multi-baris:", surat.length, "karakter");  // multi-baris: 22 karakter

// ------------------------------------------------------------------
// (5) WITH STATEMENT (USANG), FITUR LANJUTAN, DAN STANDARD LIBRARY
//
// Dua nama di daftar buku perlu catatan jujur:
//
// With Statement — warisan lama JavaScript, kini USANG dan
// dilarang di mode ketat (strict kita aktif — file tsconfig):
//
// with (Math) { console.log(PI); }
// ❌ ERROR kalau di-uncomment — DUA error sekaligus:
//    error TS1101: 'with' statements are not allowed in strict mode.
//    error TS2410: The 'with' statement is not supported. All
//    symbols in a 'with' block will have type 'any'.
//    (with menumpulkan pengecekan tipe — kebalikan tujuan TS;
//    Dart juga tidak punya with untuk objek — dengan-nya untuk
//    mixin, hal yang sama sekali berbeda)
//
// Function Generator & Getter Setter — ada di daftar buku tapi
// BERBATAS kelas lanjutan; hlm. 140 PDF memang menutup kelas Dasar
// dan menawarkan: TypeScript OOP, Generic, Decorator.
//
// Standard Library — pustaka bawaan yang sudah kita pakai terus:
// console, Math, JSON, sampai method bawaan array/string. Tipenya
// pun ikut dijaga TS (mis. Math.max mengembalikan number).
// ------------------------------------------------------------------

console.log("Math.max:", Math.max(3, 7, 5));       // Math.max: 7
console.log("Math.pow (saudara **):", Math.pow(2, 10));  // Math.pow (saudara **): 1024
console.log("JSON.parse:", typeof JSON.parse("42"));     // JSON.parse: number

// ==================================================================
// RANGKUMAN
// ==================================================================
// 1. TypeScript = JavaScript + lapisan tipe: SEMUA fitur JS bisa —
//    operator, string template, optional chaining, default/rest
//    parameter, destructuring, modules, standard library.
// 2. Yang membedakan: TS strongly-typed — tiap variabel/parameter
//    dituntut tipe jelas. Jalan keluar "bebas seperti JS" = any
//    (file 6) — dengan harga pengawasan tipe mati.
// 3. Banyak fitur sudah kita pakai diam-diam: `template ${}`
//    (file 10+), ?. dan ?? (file 12/14 — identik dengan Dart),
//    default & rest parameter (file 24), import/export (test).
// 4. Destructuring array TS ≈ Dart 3 list pattern (kurung siku);
//    destructuring object BEDA BENTUK: TS { nama: n } langsung,
//    Dart pakai pola Orang(nama: n). Swap dua nilai: dua-duanya
//    bisa tanpa variabel bantu.
// 5. ... di destructuring menampung "sisanya" jadi array —
//    sepupu rest parameter file 24, tapi di posisi penugasan.
// 6. PERBEDAAN NYATA: pangkat — TS punya operator **, Dart TIDAK
//    (pakai math.pow). String multi-baris: TS backtick, Dart '''.
// 7. With statement: usang, DILARANG mode ketat (TS1101 + TS2410
//    sekaligus). Generator & getter/setter: ranah kelas lanjutan
//    (PDF hlm. 140: OOP, Generic, Decorator).
// 8. Standard library (Math, JSON, console, method array/string)
//    ikut dijaga tipenya oleh TS.
//
// Cara menjalankan file ini: npx tsx src/34_javascript_feature.tsx

// ==================================================================
// LATIHAN (+ JAWABAN)
// ==================================================================

// 1. Destructuring array: ambil nilai PERTAMA dan TERAKHIR dari
//    [5, 6, 7, 8, 9] dalam SATU baris penugasan.
//
// JAWABAN:
const [awal, , , , akhir] = [5, 6, 7, 8, 9];
console.log(awal, akhir);                          // 5 9

// 2. Swap dua variabel saldo (tanpa variabel ketiga) lalu cetak.
//
// JAWABAN:
let saldoA = 100;
let saldoB = 250;
[saldoA, saldoB] = [saldoB, saldoA];
console.log("setelah swap:", saldoA, saldoB);      // setelah swap: 250 100

// 3. Destructuring object dengan default: tipe Susunan berisi
//    judul (wajib) dan tag (optional) — ambil keduanya, tag
//    berdefault "umum".
//
// JAWABAN:
type Susunan = { judul: string; tag?: string };
const item: Susunan = { judul: "Belajar TS" };
const { judul, tag = "umum" } = item;
console.log(`${judul} [${tag}]`);                  // Belajar TS [umum]
