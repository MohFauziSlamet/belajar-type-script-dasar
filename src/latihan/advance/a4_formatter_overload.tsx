// ========================================
// LATIHAN ADVANCE 4 — FORMATTER OVERLOAD
// ========================================
// Level: Advance
// Konsep: function overloading (materi 25), rest parameter & default
//         value (materi 24)
// Program: fungsi format uang yang bisa dipanggil SATU argumen
//          (default Rp) atau DUA argumen (mata uang pilihan).

// ========================================
// SOAL
// ========================================
// 1. Definisikan formatRupiah dengan DUA signature overload:
//    (angka: number): string dan (angka: number, mataUang: string):
//    string — implementasinya satu saja, memakai parameter opsional.
// 2. Panggil dengan satu argumen dan dua argumen.
// 3. Buat totalTagihan(...angka: number[]): number — rest parameter,
//    jumlahkan semua argumen lewat for-of. Panggil dengan 1 dan 3
//    angka.
// 4. Buat sapaVendor(nama: string, salam: string = "Halo"): string —
//    DEFAULT VALUE (bandingkan dengan optional + ?? di latihan m5).
// 5. Ramal dulu: apa error kalau formatRupiah dipanggil dengan
//    argumen string? Dan dengan TIGA argumen?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) OVERLOAD — banyak SIGNATURE, SATU IMPLEMENTASI
//     (PERBEDAAN NYATA: Dart TIDAK punya function overloading —
//      jalannya: parameter opsional/named, atau fungsi beda nama;
//      TS menyediakan keduanya)
// ------------------------------------------------------------------
function formatRupiah(angka: number): string;           // signature 1
function formatRupiah(angka: number, mataUang: string): string; // signature 2
function formatRupiah(angka: number, mataUang?: string): string {
  // implementasi — parameter opsional menampung dua-duanya
  const label: string = mataUang ?? "Rp";
  return `${label}${angka}`;
}

// ------------------------------------------------------------------
// (2) PEMANGGILAN — satu atau dua argumen, dua-duanya sah
// ------------------------------------------------------------------
console.log(formatRupiah(50000));          // Rp50000
console.log(formatRupiah(30000, "RM"));    // RM30000

// ------------------------------------------------------------------
// (3) REST PARAMETER — argumen memanjang sesuka hati, diterima sebagai
//     array (Dart juga punya: ...angka)
// ------------------------------------------------------------------
function totalTagihan(...angka: number[]): number {
  let total: number = 0;
  for (const n of angka) {
    total = total + n;
  }
  return total;
}

console.log(totalTagihan(2000));                 // 2000
console.log(totalTagihan(18000, 12000, 15000));  // 45000

// ------------------------------------------------------------------
// (4) DEFAULT VALUE — parameter "sudah berisi"; optional + ?? (m5)
//     dan default = dua cara mencapai hasil serupa
// ------------------------------------------------------------------
function sapaVendor(nama: string, salam: string = "Halo"): string {
  return `${salam} ${nama}`;
}

console.log(sapaVendor("Eko"));                  // Halo Eko
console.log(sapaVendor("Budi", "Selamat pagi")); // Selamat pagi Budi

// ------------------------------------------------------------------
// (5) RAMAL DULU: pemanggilan di luar signature — tipe salah TIDAK
//     cocok overload mana pun; jumlah argumen kelebihan juga ditolak
// ------------------------------------------------------------------
// const salahTipe = formatRupiah("lima");
// ERROR TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

// const salahJumlah = formatRupiah(50000, "Rp", "ekstra");
// ERROR TS2554: Expected 1-2 arguments, but got 3.

// ========================================
// RANGKUMAN
// ========================================
// - Overload = beberapa signature deklarasi + SATU implementasi;
//   Dart tak punya ini — warga Dart memakai parameter opsional/named
//   atau fungsi terpisah (PERBEDAAN NYATA).
// - Rest `...angka: number[]` mengumpulkan argumen menjadi array —
//   jumlah argumen bebas, sama seperti Dart.
// - Default value (salam = "Halo") dan optional + ?? (latihan m5)
//   adalah dua jalan menuju perilaku serupa.
// - Panggilan liar ditangkap: tipe salah → TS2345, jumlah argumen
//   di luar rentang overload → TS2554 ("Expected 1-2 arguments").

