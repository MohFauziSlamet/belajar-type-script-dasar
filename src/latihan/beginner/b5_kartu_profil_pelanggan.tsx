// ========================================
// LATIHAN BEGINNER 5 — KARTU PROFIL PELANGGAN
// ========================================
// Level: Beginner
// Konsep: object type inline (materi 11), optional properties ? (materi 12),
//         akses aman ?. dan ?? (SAMA PERSIS Dart)
// Program: kartu profil pelanggan cafe yang datanya tidak selalu lengkap.

// ========================================
// SOAL
// ========================================
// 1. Buat object pelanggan dengan object type INLINE:
//    nama: string (wajib), member: boolean (wajib), telepon?: string (opsional),
//    alamat?: { kota: string; kodePos?: string } (opsional, bertingkat).
//    Kirim data: nama "Rani", member true, alamat hanya { kota: "Bandung" } —
//    telepon & kodePos sengaja tidak dikirim.
// 2. Cetak nama (wajib → akses langsung aman) dan telepon (opsional).
// 3. Cetak telepon dengan ?? fallback "belum ada".
// 4. Cetak kota lewat ?. dan kodePos lewat ?. + ?? fallback.
// 5. (Baca) kenapa pelanggan.telepon.toUpperCase() ditolak compiler?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) DEFINISI — (Jika di Dart: class Pelanggan { String? telepon; } —
//     di TS cukup object literal + annotation inline, TANPA class/new)
// ------------------------------------------------------------------
const pelanggan: {
  nama: string;
  member: boolean;
  telepon?: string;
  alamat?: { kota: string; kodePos?: string };
} = {
  nama: "Rani",
  member: true,
  alamat: { kota: "Bandung" },  // telepon & kodePos sengaja tidak dikirim
};

console.log(pelanggan.nama);    // Rani      (wajib → selalu ada, akses langsung aman)
console.log(pelanggan.telepon); // undefined (opsional yang dilewatkan)

// ------------------------------------------------------------------
// (2) AKSES AMAN — ?. dan ?? SAMA PERSIS Dart, nol usaha baru
// ------------------------------------------------------------------
console.log(pelanggan.telepon ?? "belum ada");           // belum ada
console.log(pelanggan.alamat?.kota);                     // Bandung
console.log(pelanggan.alamat?.kodePos ?? "tidak diisi"); // tidak diisi

// reuse ternary latihan b1 untuk status member
console.log(pelanggan.member ? "Member aktif" : "Tamu"); // Member aktif

// ------------------------------------------------------------------
// (3) KENAPA AKSES LANGSUNG DITOLAK — telepon bertipe string | undefined,
//     method string belum pasti tersedia di sana
// ------------------------------------------------------------------
// pelanggan.telepon.toUpperCase();
// ERROR TS18048: 'pelanggan.telepon' is possibly 'undefined'.

// pelanggan.kota;
// ERROR TS2339: Property 'kota' does not exist on type '{ nama: string; member: boolean; telepon?: string | undefined; alamat?: { kota: string; kodePos?: string | undefined; } | undefined; }'.
// (CATATAN: tsc merender property optional dengan tambahan "| undefined" —
//  itu wujud nyata telepon?: string yang dibaca string | undefined)
// (object TS itu KAKU: hanya property yang dideklarasi — beda Map Dart yang bebas nambah key)

// ------------------------------------------------------------------
// (4) OBJECT KEDUA DENGAN KONTRAK BERBEDA — tipe inline beda = property beda.
//     optional harus ADA DI TIPE dulu, baru boleh tidak dikirim
// ------------------------------------------------------------------
const tamu: { nama: string; member: boolean } = {
  nama: "Budi",
  member: false,
};

// tamu.telepon;
// ERROR TS2339: Property 'telepon' does not exist on type '{ nama: string; member: boolean; }'.

console.log(`${tamu.nama} — ${tamu.member ? "Member" : "Tamu"}`); // Budi — Tamu

// ========================================
// RANGKUMAN
// ========================================
// - telepon?: string ≈ String? di Dart: boleh tidak dikirim → terbaca undefined.
// - Akses optional tanpa pengaman = TS18048 ("possibly 'undefined'").
// - Tiga jalan aman SAMA PERSIS Dart: ?. (mungkin undefined), ?? (fallback),
//   if (cek dulu baru pakai).
// - Object TS kaku: property tidak dideklarasi = TS2339 (beda Map Dart).
// - Object type inline panjang & dipakai berulang → nanti dirapikan type
//   alias (materi 9) / interface (materi 15) di level berikutnya.
