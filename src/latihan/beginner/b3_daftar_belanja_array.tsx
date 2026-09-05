// ========================================
// LATIHAN BEGINNER 3 — DAFTAR BELANJA ARRAY
// ========================================
// Level: Beginner
// Konsep: array + push/pop/includes/indexOf (materi 3), ReadonlyArray
//         (materi 4), for klasik & for-of (materi 30)
// Program: keranjang belanja (berubah) + katalog toko (terkunci readonly).

// ========================================
// SOAL
// ========================================
// 1. Buat KATALOG toko sebagai ReadonlyArray<string> berisi 5 barang —
//    barang yang dijual tidak boleh bisa ditambah/diubah. WAJIB readonly.
// 2. Buat KERANJANG string[] (mulai kosong):
//    a. tambah 3 item dengan push
//    b. keluarkan item TERAKHIR dengan pop
//    c. cek "gula" ada tidak (includes) dan cari posisi "teh" (indexOf)
// 3. Cetak isi keranjang bernomor dengan for klasik (index 0..length-1).
// 4. Cetak seluruh katalog dengan for-of.

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) KATALOG READONLY — (Jika di Dart: List.unmodifiable([...]) dijaga
//     RUNTIME sampai crash — di TS ReadonlyArray dijaga COMPILE-TIME saja:
//     tsx diam-diam tetap menjalankan, tsc yang menolak)
// ------------------------------------------------------------------
const katalog: ReadonlyArray<string> = ["kopi", "gula", "susu", "teh", "roti"];

// katalog.push("keju");
// ERROR TS2339: Property 'push' does not exist on type 'readonly string[]'.

console.log(katalog.length);  // 5

// ------------------------------------------------------------------
// (2) KERANJANG — array biasa, isinya bebas berubah.
//     const array ≈ final List Dart: REASSIGN dilarang, ISI boleh diubah
// ------------------------------------------------------------------
const keranjang: string[] = [];

keranjang.push("kopi");   // Dart: list.add("kopi")    → tambah di BELAKANG
keranjang.push("gula");
keranjang.push("susu");

console.log(keranjang);         // [ 'kopi', 'gula', 'susu' ]
console.log(keranjang.length);  // 3

keranjang.pop();                // Dart: list.removeLast() → keluarkan TERAKHIR

console.log(keranjang);         // [ 'kopi', 'gula' ]

console.log(keranjang.includes("gula"));  // true  (Dart: list.contains)
console.log(keranjang.indexOf("teh"));    // -1    (tidak ditemukan — SAMA dengan Dart)
console.log(katalog.includes("keju"));    // false

// ------------------------------------------------------------------
// (3) CETAK BERNOMOR — for klasik PERSIS Dart, cukup ganti var → let
// ------------------------------------------------------------------
for (let i = 0; i < keranjang.length; i++) {
  console.log(`${i + 1}. ${keranjang[i]}`);
}
// 1. kopi
// 2. gula

// ------------------------------------------------------------------
// (4) CETAK KATALOG — for-of mengambil NILAINYA langsung
//     (Jika di Dart: for (final item in list) — SAMA, tapi AWAS:
//     di TS yang mirip itu for-OF. for-IN memberi INDEX string "0","1",...)
// ------------------------------------------------------------------
for (const item of katalog) {
  console.log(`- ${item}`);
}
// - kopi
// - gula
// - susu
// - teh
// - roti

// ========================================
// RANGKUMAN
// ========================================
// - Ganti nama method kunci: add→push, removeLast→pop, contains→includes;
//   indexOf & index & .length SAMA PERSIS Dart.
// - const array ≈ final List: reassign dilarang (TS2588), isi tetap bebas.
// - ReadonlyArray: kunci COMPILE-TIME saja (Dart List.unmodifiable: RUNTIME).
// - for klasik cocok saat butuh INDEX (penomoran); for-of untuk NILAI.
// - Jebakan namanya: for-of = nilai (≈ Dart for-in), for-IN TS = index/key.
