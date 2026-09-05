// ========================================
// LATIHAN MIDDLE 1 — KASIR UNION
// ========================================
// Level: Middle
// Konsep: union type `A | B` (materi 7), narrowing typeof (materi 8),
//         type alias untuk union (materi 10)
// Program: kasir kafe — nomor meja bisa angka/teks, metode bayar
//          dibatasi pilihan tetap.

// ========================================
// SOAL
// ========================================
// 1. Buat type alias NomorMeja = number | string, lalu fungsi
//    labelMeja(meja: NomorMeja): string yang menghasilkan "Meja 7"
//    untuk angka dan "Meja VIP-1" (uppercase) untuk teks — pakai
//    typeof untuk membedakan.
// 2. Buat type alias MetodeBayar = "cash" | "qris" | "debit", lalu fungsi
//    biayaLayanan(total: number, metode: MetodeBayar): number:
//    qris = 0.5% dari total, debit = flat 2000, cash = 0.
// 3. Buat prosesPembayaran(total, metode, meja): string yang
//    menggabungkan semuanya jadi satu baris ringkasan.
// 4. Ramal dulu: apa yang terjadi kalau metode diisi "bitcoin"?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) UNION number | string + NARROWING typeof
//     (Jika di Dart: `number | string` tidak ada — terpaksa dynamic
//     dan cek tipe hilang saat compile; di TS union tetap dijaga tsc)
// ------------------------------------------------------------------
type NomorMeja = number | string; // type alias union (materi 10)

function labelMeja(meja: NomorMeja): string {
  if (typeof meja === "number") {
    return `Meja ${meja}`;        // di cabang ini meja PASTI number
  } else {
    return `Meja ${meja.toUpperCase()}`; // di sini meja PASTI string
  }
}

console.log(labelMeja(7));        // Meja 7
console.log(labelMeja("vip-1"));  // Meja VIP-1

// ------------------------------------------------------------------
// (2) UNION LITERAL — pilihan tetap, salah ketik langsung tertangkap
// ------------------------------------------------------------------
type MetodeBayar = "cash" | "qris" | "debit";

function biayaLayanan(total: number, metode: MetodeBayar): number {
  if (metode === "qris") {
    return (total * 0.5) / 100; // 0.5% (dikalikan dulu supaya mulus)
  } else if (metode === "debit") {
    return 2000;                // flat
  } else {
    return 0;                   // cash — cabang terakhir
  }
}

console.log(biayaLayanan(50000, "qris"));  // 250
console.log(biayaLayanan(50000, "debit")); // 2000
console.log(biayaLayanan(50000, "cash"));  // 0

// ------------------------------------------------------------------
// (3) MENGABUNGKAN — satu fungsi, parameter campuran tipe alias
// ------------------------------------------------------------------
function prosesPembayaran(
  total: number,
  metode: MetodeBayar,
  meja: NomorMeja,
): string {
  const biaya: number = biayaLayanan(total, metode);
  return `${labelMeja(meja)} | ${metode} | Rp${total} + Rp${biaya} = Rp${total + biaya}`;
}

console.log(prosesPembayaran(50000, "qris", "vip-1"));
// Meja VIP-1 | qris | Rp50000 + Rp250 = Rp50250
console.log(prosesPembayaran(30000, "debit", 7));
// Meja 7 | debit | Rp30000 + Rp2000 = Rp32000

// ------------------------------------------------------------------
// (4) RAMAL DULU: "bitcoin" bukan anggota union — tsc MENOLAK
//     (di sinilah kekuatan union: salah ketik ketahuan SAAT COMPILE,
//     bukan saat program jalan seperti kalau pakai dynamic di Dart)
// ------------------------------------------------------------------
// const salah: MetodeBayar = "bitcoin";
// ERROR TS2322: Type '"bitcoin"' is not assignable to type 'MetodeBayar'.

// ========================================
// RANGKUMAN
// ========================================
// - Union `A | B` = nilai HARUS salah satu dari anggotanya; Dart tak
//   punya ini untuk tipe biasa (dynamic mengorbankan pengecekan).
// - typeof menyempitkan union di cabang if — di dalam cabang, TS
//   SUDAH tipe pastinya (seperti type promotion setelah `is` di Dart).
// - Union literal ("cash" | "qris") = daftar pilihan terkunci;
//   salah ketik ditangkap tsc lewat TS2322.
// - Type alias (type Nama = ...) memberi nama pada union supaya bisa
//   dipakai berulang tanpa menulis ulang anggotanya.

