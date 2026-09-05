// ========================================
// LATIHAN BEGINNER 1 — KALKULATOR DISKON CAFE
// ========================================
// Level: Beginner
// Konsep: function bertipe (materi 1, 23), tipe primitif number & boolean
//         (materi 2), ternary operator (materi 28), template literal (materi 1)
// Program: menghitung harga final minuman setelah diskon member 10%.

// ========================================
// SOAL
// ========================================
// Sebuah cafe memberi diskon 10% untuk pelanggan member.
// 1. Buat function hitungDiskon(harga: number, isMember: boolean): number
//    yang mengembalikan harga FINAL setelah diskon (non-member: tidak diskon).
// 2. Buat function statusPelanggan(isMember: boolean): string
//    yang mengembalikan "Member" atau "Non-Member" — WAJIB pakai ternary.
// 3. Cetak ringkasan 2 transaksi (kopi & roti) dengan template literal.

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) FUNCTION HITUNG DISKON — diskonnya "10% atau 0" cocok untuk ternary:
//     kondisi ? nilaiJikaBenar : nilaiJikaSalah (PERSIS sintaks Dart)
// ------------------------------------------------------------------
function hitungDiskon(harga: number, isMember: boolean): number {
  const diskon: number = isMember ? harga * 10 / 100 : 0; // member: 10%, lain: 0
  return harga - diskon;
}

console.log(hitungDiskon(50000, true));   // 45000  (50000 - 5000)
console.log(hitungDiskon(50000, false));  // 50000  (non-member: tidak diskon)

// ------------------------------------------------------------------
// (2) FUNCTION STATUS — hasil string juga pas pakai ternary.
//     Catatan: boolean dipakai LANGSUNG sebagai kondisi (isMember ? ...)
//     — tidak perlu isMember == true
// ------------------------------------------------------------------
function statusPelanggan(isMember: boolean): string {
  return isMember ? "Member" : "Non-Member";
}

console.log(statusPelanggan(true));   // Member
console.log(statusPelanggan(false));  // Non-Member

// ------------------------------------------------------------------
// (3) RINGKASAN TRANSAKSI — template literal pakai backtick ` ... ${ ... } `
//     (Jika di Dart: 'Rp $harga' cukup — di TS WAJIB kurung kurawal ${harga},
//     tulis '$harga' polos tidak error tapi tidak berfungsi: dicetak mentah)
// ------------------------------------------------------------------
const hargaKopi: number = 18000;
const hargaRoti: number = 12000;

console.log(`Kopi : ${statusPelanggan(true)} bayar Rp ${hitungDiskon(hargaKopi, true)}`);
// Kopi : Member bayar Rp 16200

console.log(`Roti : ${statusPelanggan(false)} bayar Rp ${hitungDiskon(hargaRoti, false)}`);
// Roti : Non-Member bayar Rp 12000

// ========================================
// RANGKUMAN
// ========================================
// - Posisi tipe di TS ditulis SETELAH nama: (harga: number): number
//   (Jika di Dart: int hitung(int harga) → di TS: hitung(harga: number): number)
// - Ternary `kondisi ? a : b` IDENTIK dengan Dart, termasuk untuk return langsung.
// - boolean cukup dipakai langsung sebagai kondisi: `isMember ? ...`.
// - Template literal wajib ${kurungKurawal}, `$nama` polos = jebakan diam-diam.
