// ========================================
// TERNARY OPERATOR
// ========================================
// (PDF "TypeScript Dasar" hlm. 119-121: Ternary Operator,
//  Kode : Ternary Operator)
// Materi sebelumnya: file 27 (If Statement).
// Sekarang kita mempelajari Ternary Operator (`kondisi ? benar : salah`)
// untuk menulis percabangan ringkas berbasis ekspresi (expression).


// ------------------------------------------------------------------
// (1) SINTAKS DASAR TERNARY OPERATOR (DART VS TYPESCRIPT)
//
// PDF hlm. 120-121: Ternary operator adalah bentuk sederhana dari `if-else`
// yang terdiri dari kondisi dan dua pilihan hasil dipisahkan tanda tanya (?)
// dan titik dua (:).
//
// Jika di Dart seperti ini:
//     final int value = 80;
//     final String say = value >= 75 ? 'Congratulation' : 'Try Again';
//     print(say);
// di TypeScript jadi seperti ini:
//     const value: number = 80;
//     const say: string = value >= 75 ? "Congratulation" : "Try Again";
//     console.log(say);
//
// KEMIRIPAN BESAR:
// - Sintaks `kondisi ? ekspresiBenar : ekspresiSalah` sama persis
//   antara Dart dan TypeScript.
// ------------------------------------------------------------------

const value: number = 80;
const say: string = value >= 75 ? "Congratulation" : "Try Again";
console.log(say);                                // Congratulation

const nilaiGagal: number = 60;
const statusGagal: string = nilaiGagal >= 75 ? "Congratulation" : "Try Again";
console.log(statusGagal);                        // Try Again


// ------------------------------------------------------------------
// (2) STATEMENT (IF-ELSE) VS EXPRESSION (TERNARY)
//
// Perbedaan paling fundamental antara `if-else` dan ternary operator:
// 1. `if-else` adalah STATEMENT (pernyataan alur):
//    Tidak menghasilkan nilai secara langsung, sehingga TIDAK BISA
//    di-assign langsung ke variabel atau disisipkan ke dalam string template.
//
// 2. Ternary `? :` adalah EXPRESSION (ekspresi nilai):
//    Menghasilkan nilai kembalian secara langsung, sehingga BISA
//    langsung di-return, disimpan ke variabel, atau disisipkan ke template string `${}`.
// ------------------------------------------------------------------

function cekKelulusan(nilai: number): string {
    // Ternary langsung di-return sebagai ekspresi nilai
    return nilai >= 75 ? "LULUS" : "REMIDI";
}

// Ternary langsung disisipkan ke dalam Template Literal:
console.log(`Status Siswa: ${cekKelulusan(90)}`); // Status Siswa: LULUS
console.log(`Status Siswa: ${cekKelulusan(50)}`); // Status Siswa: REMIDI


// ------------------------------------------------------------------
// (3) TYPE INFERENCE PADA TERNARY (UNION TYPE PADA CABANG BEDA TIPE)
//
// Jika cabang `true` dan `false` menghasilkan tipe data yang berbeda,
// TypeScript secara cerdas menyimpulkan tipenya sebagai UNION TYPE:
//
// PERBEDAAN DENGAN DART:
// - Di Dart: Cabang beda tipe (`true ? 'Aktif' : 0`) disimpulkan ke tipe umum `Object`.
// - Di TypeScript: Disimpulkan secara presisi menjadi Union Type `string | number`!
// ------------------------------------------------------------------

const isPremium: boolean = false;

// Tipe `kuota` otomatis disimpulkan sebagai: `string | number`
const kuota = isPremium ? "Unlimited" : 100;

console.log(kuota);                              // 100
console.log(typeof kuota);                       // number

// const teksSalah: string = value >= 75 ? "Lulus" : 0;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string | number' is not assignable to type 'string'.
//      Type 'number' is not assignable to type 'string'.
//    (alasan: cabang false menghasilkan number, tidak cocok dengan variabel bertipe string)


// ------------------------------------------------------------------
// (4) NESTED TERNARY (TERNARY BERSARANG)
//
// Ternary operator bisa digabungkan bertingkat (*nested*) untuk menangani
// banyak kondisi (mirip rantai `if - else if - else`).
//
// Jika di Dart seperti ini:
//     final String grade = score >= 85 ? 'A' : score >= 70 ? 'B' : 'C';
// di TypeScript jadi seperti ini:
//     const grade: string = score >= 85 ? "A" : score >= 70 ? "B" : "C";
// ------------------------------------------------------------------

const score: number = 78;

const grade: string = score >= 85
    ? "A"
    : score >= 70
    ? "B"
    : score >= 55
    ? "C"
    : "D";

console.log(grade);                              // B

// CATATAN BEST PRACTICE:
// Gunakan nested ternary hanya untuk kondisi singkat dan sederhana.
// Jika percabangan terlalu panjang atau kompleks, lebih disarankan menggunakan
// `if-else` (file 27) atau `switch` (file 29) agar kode tetap mudah dibaca.


// ------------------------------------------------------------------
// (5) TRUTHY / FALSY PADA KONDISI TERNARY (DART VS TYPESCRIPT)
//
// PERBEDAAN DENGAN DART:
// - Di Dart: Kondisi ternary WAJIB bertipe `bool` statis.
// - Di TypeScript: Kondisi ternary menerima nilai truthy / falsy apa pun.
// ------------------------------------------------------------------

const namaUser: string = "";

// String kosong `""` adalah FALSY, sehingga cabang false ("Pengguna Tamu") dieksekusi:
const namaTampil: string = namaUser ? namaUser : "Pengguna Tamu";

console.log(namaTampil);                         // Pengguna Tamu


// ========================================
// RANGKUMAN
// ========================================
// 1. Ternary operator memiliki sintaks `kondisi ? ekspresiBenar : ekspresiSalah` (PDF hlm. 119-121).
// 2. KEMIRIPAN BESAR DENGAN DART: Sintaks simbol `?` dan `:` identik antara Dart dan TypeScript.
// 3. Perbedaan mendasar: `if-else` adalah Statement, sedangkan Ternary adalah Expression (menghasilkan nilai).
// 4. Karena bersifat expression, ternary bisa langsung di-return, di-assign ke variabel,
//    atau disisipkan ke dalam Template Literal `${}`.
// 5. Jika cabang true dan false memiliki tipe berbeda, TypeScript menyimpulkan hasilnya
//    sebagai Union Type (`T1 | T2`), bukan `Object` seperti di Dart.
// 6. Nested ternary dapat digunakan untuk kondisi bertingkat singkat, namun hindari pemakaian
//    berlebihan jika mengurangi keterbacaan kode.
// 7. Kondisi ternary di TypeScript mendukung Truthy & Falsy (misal `""` dievaluasi sebagai false).
//
// Cara menjalankan file ini:  npx tsx src/28_ternary_operator.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat fungsi `hitungOngkir(member: boolean, totalBelanja: number): number`
//    menggunakan nested ternary:
//    - Jika `member` adalah true:
//        - Jika `totalBelanja >= 100000` -> ongkir 0
//        - Selain itu -> ongkir 10000
//    - Jika `member` adalah false -> ongkir 20000
//    Panggil dan cetak hasilnya untuk ketiga skenario tersebut.
//
//    JAWABAN:
function hitungOngkir(member: boolean, totalBelanja: number): number {
    return member ? (totalBelanja >= 100000 ? 0 : 10000) : 20000;
}

console.log(hitungOngkir(true, 150000));          // 0
console.log(hitungOngkir(true, 50000));           // 10000
console.log(hitungOngkir(false, 300000));         // 20000

// 2. Ramal dulu, baru cek: Apa tipe data yang disimpulkan oleh TypeScript pada kode di bawah ini,
//    dan apa perbedaannya dengan cara Dart memperlakukan cabang bertipe beda?
//    `const hasil = true ? "Sukses" : 200;`
//
//    JAWABAN:
//    Di TypeScript, tipe `hasil` disimpulkan secara presisi sebagai Union Type: `string | number`.
//    Di Dart, cabang dengan tipe `String` dan `int` akan disimpulkan ke tipe umum (supertype) yaitu `Object`.
//    TypeScript lebih presisi karena membatasi tipe hanya pada kemungkinan nilai yang benar-benar ada.

// 3. Eksperimen error TS2322: uncomment baris `const teksSalah` di sub-section (3),
//    jalankan `npx tsc --noEmit`, baca pesannya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/28_ternary_operator.tsx:83:7
//    error TS2322: Type 'string | number' is not assignable to type 'string'.
//      Type 'number' is not assignable to type 'string'.
//    ---------------------------------------------------------------
//    Penjelasan: Ekspresi ternary `value >= 75 ? "Lulus" : 0` menghasilkan tipe
//    `string | number`. Karena variabel `teksSalah` secara eksplisit diketik `string`,
//    TypeScript menolak kemungkinan nilai `number` yang dapat dihasilkan cabang false.
