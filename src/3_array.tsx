// ========================================
// TIPE DATA ARRAY
// ========================================
// (PDF "TypeScript Dasar" hlm. 36-38: Tipe Data Array)
// Materi sebelumnya: file 1 (function, export), file 2 (primitif, inference).
// Menyusul: Read Only Array (file 4), Tuple (file 5).


// ------------------------------------------------------------------
// (1) MEMBUAT ARRAY — DUA CARA PENULISAN TIPE
//
// Jika di Dart seperti ini:
//     var names = <String>['Fauzi', 'Azka', 'Budi'];
// di TypeScript jadi seperti ini:
//
// Cara 1 (paling umum):  string[]   ← tipe + kurung siku
// Cara 2 (gaya generic): Array<string>
// Dua-duanya hasilnya SAMA — Dart juga begini: List<String> vs List<String>
// cuma satu cara, TS kasih dua pilihan. Pakai cara 1 saja cukup.
// ------------------------------------------------------------------

let names: string[] = ["Fauzi", "Azka", "Budi"];
console.log(names); // [ 'Fauzi', 'Azka', 'Budi' ]

let harga: number[] = [1000, 2000, 3000];   // cara 1
let stok: Array<number> = [10, 20, 30];     // cara 2 — sama saja
console.log(harga, stok); // [ 1000, 2000, 3000 ] [ 10, 20, 30 ]


// ------------------------------------------------------------------
// (2) ISI HARUS SERAGAM SESUAI TIPENYA
//
// number[] hanya boleh berisi number — sama ketatnya seperti List<int>
// di Dart yang menolak string. Jadi bagian ini terasa familiar.
// ------------------------------------------------------------------

let umur: number[] = [20, 21, 22];
console.log(umur); // [ 20, 21, 22 ]

// umur.push("dua puluh");
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'string' is not assignable
//    to parameter of type 'number'.
//    (push() di number[] cuma mau menerima number)

// Inference dari file 2 juga berlaku untuk array:
let angka = [1, 2, 3]; // tidak perlu tulis ": number[]" — TS menebak sendiri
console.log(angka); // [ 1, 2, 3 ]

// Mau array campuran string + number? BISA, tapi butuh Union Type —
// menyusul di materi Union Type (jangan dipakai dulu sebelum dibahas).


// ------------------------------------------------------------------
// (3) MENGAKSES ISI — INDEX MULAI DARI 0, .length UNTUK PANJANG
//
// Jika di Dart seperti ini:  names[0], names.length
// di TypeScript jadi seperti ini: SAMA PERSIS. Tidak ada yang perlu
// dipelajari ulang di bagian ini.
// ------------------------------------------------------------------

console.log(names[0]);  // Fauzi   (index 0 = elemen pertama)
console.log(names[2]);  // Budi    (index 2 = elemen ketiga)
console.log(names.length); // 3

// CATATAN PERBEDAAN NYATA: akses index di luar batas TIDAK error di TS,
// hasilnya undefined — diam-diam salah kalau tidak hati-hati.
// Jika di Dart seperti ini:  names[10]  → CRASH RangeError (langsung ketahuan)
// di TypeScript jadi seperti ini: names[10] → undefined (program jalan terus)
console.log(names[10]); // undefined

// Mengubah isi lewat index juga sama seperti Dart:
names[1] = "Slamet";
console.log(names); // [ 'Fauzi', 'Slamet', 'Budi' ]


// ------------------------------------------------------------------
// (4) MENAMBAH, MENGHAPUS, DAN MENCARI ISI
//
// Jika di Dart seperti ini:
//     names.add('Darto');        → di TypeScript: names.push("Darto")
//     names.removeLast();        → di TypeScript: names.pop()
//     names.indexOf('Fauzi');    → di TypeScript: SAMA
//     names.contains('Budi');    → di TypeScript: names.includes("Budi")
//
// Yang perlu dihafal cuma GANTI NAMA: add→push, removeLast→pop,
// contains→includes. Sisanya sama.
// ------------------------------------------------------------------

names.push("Darto");
console.log(names); // [ 'Fauzi', 'Slamet', 'Budi', 'Darto' ]

const keluar = names.pop(); // pop mengembalikan elemen yang dihapus
console.log(keluar); // Darto
console.log(names.length); // 3  (Darto sudah keluar)

console.log(names.indexOf("Fauzi")); // 0     (sama seperti Dart)
console.log(names.includes("Budi")); // true  (Dart: .contains)

// Ada juga unshift/shift (tambah/hapus di DEPAN array) — jarang dipakai,
// tahu ada saja. Dart tidak punya langsung (pakai insert(0, x) / removeAt(0)).


// ------------------------------------------------------------------
// (5) const PADA ARRAY — YANG DIKUNCI VARIABELNYA, BUKAN ISINYA
//
// Jika di Dart seperti ini:
//     final buah = ['apel', 'mangga'];
//     buah.add('jeruk');   // ✅ BOLEH — final hanya kunci variabelnya
// di TypeScript jadi seperti ini: SAMA konsepnya persis.
// ------------------------------------------------------------------

const buah: string[] = ["apel", "mangga"];
buah.push("jeruk"); // ✅ boleh — mengubah ISI, bukan mengganti variabel
console.log(buah); // [ 'apel', 'mangga', 'jeruk' ]

// buah = ["nanas", "pisang"];
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'buah' because it is a constant.


// ========================================
// RANGKUMAN
// ========================================
// 1. Dart List<String> → TS string[] (paling umum) atau Array<string>.
//    Dua-duanya sama — pilih satu, konsisten.
// 2. Index mulai 0 dan .length — SAMA PERSIS seperti Dart, nol usaha.
// 3. Ganti nama method: add()→push(), removeLast()→pop(),
//    contains()→includes(). indexOf() tidak berubah.
// 4. Isi wajib seragam: number[] tolak string (TS2345). Array campuran
//    butuh Union Type — menyusul di materinya.
// 5. const array ≈ final List Dart: isi BOLEH ditambah/diubah,
//    tapi variabelnya TIDAK boleh diganti seluruhnya (TS2588).
// 6. Index di luar batas: Dart crash RangeError → TS diam beri undefined.
// 7. Menyusul: ReadonlyArray (file 4), Tuple (file 5).
//
// Cara menjalankan file ini:  npx tsx src/3_array.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat array makanan (string[]) berisi 3 favoritmu, cetak array-nya,
//    lalu cetak elemen pertama dan jumlah elemennya.
//
//    JAWABAN:
const makanan: string[] = ["Nasi Goreng", "Mie Ayam", "Es Teh"];
console.log(makanan); // [ 'Nasi Goreng', 'Mie Ayam', 'Es Teh' ]
console.log(makanan[0]); // Nasi Goreng
console.log(makanan.length); // 3

// 2. Buat keranjang (number[]) berisi dua harga, cetak panjangnya,
//    tambah satu harga dengan push, cetak panjangnya lagi, lalu hitung
//    totalnya secara manual (pakai index — cara otomatis pakai perulangan
//    menyusul di Bagian 5).
//
//    JAWABAN:
const keranjang: number[] = [5000, 12000];
console.log(keranjang.length); // 2
keranjang.push(8000);
console.log(keranjang.length); // 3
console.log(keranjang[0] + keranjang[1] + keranjang[2]); // 25000

// 3. Eksperimen const: uncomment baris `buah = ["nanas", "pisang"]`
//    di atas, jalankan `npx tsc --noEmit`, baca errornya, lalu
//    comment-kan kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/3_array.tsx:117:1
//    error TS2588: Cannot assign to 'buah' because it is a constant.
//    ---------------------------------------------------------------
//    Cara bacanya: 'buah' dideklarasikan const → variabelnya terkunci.
//    Mengubah ISI (push, ubah index) tetap boleh; MENGGANTI seluruh
//    array dengan array baru tidak boleh. Solusi kalau memang perlu
//    mengganti: pakai let, bukan const.
