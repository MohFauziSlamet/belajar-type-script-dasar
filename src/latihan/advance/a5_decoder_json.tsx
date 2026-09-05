// ========================================
// LATIHAN ADVANCE 5 — DECODER JSON API
// ========================================
// Level: Advance
// Konsep: tipe any (materi 6), type assertions `as` (materi 22)
// Program: mengurai response API (JSON.parse) — dari data liar `any`
//          menjadi data ber-tipe yang terjaga, plus validasi manual.

// ========================================
// SOAL
// ========================================
// 1. Simpan response API sebagai string JSON (status + data toko +
//    array menu), lalu JSON.parse ke variabel `any`. Cetak status —
//    dan buktikan bahayanya: cetak property TYPO (status → sttus).
// 2. Definisikan interface ItemMenu { nama, harga } dan MenuResponse
//    { toko: string; menu: ItemMenu[] }. Assertion `hasilApi.data as
//    MenuResponse`, lalu cetak toko + daftar menu dengan for-of.
// 3. Buat cekMenu(x: any): boolean — validasi BERTINGKAT dengan
//    typeof: x object (dan bukan null), x.toko string, x.menu object,
//    dan tiap item punya nama string + harga number. Uji dengan data
//    asli (true) dan object kosong {} (false).
// 4. Buktikan `as` hanyalah klaim saat compile: assertion ke number
//    tetap SAH dari any — cetak typeof-nya untuk membongkar.
// 5. Ramal dulu: setelah assertion, apa error mengakses property yang
//    tidak ada dalam interface?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) ANY dari JSON.parse — data liar tanpa pengawalan
//     (Jika di Dart: jsonDecode() return dynamic — untuk object JSON
//      jadi Map<String, dynamic>; dynamic ≈ any TS: akses bebas,
//      typo baru ketahuan saat RUNTIME)
// ------------------------------------------------------------------
const responsJson: string = `{
  "status": "ok",
  "data": {
    "toko": "Kafe PZ Now",
    "menu": [
      { "nama": "Kopi Susu", "harga": 18000 },
      { "nama": "Teh Panas", "harga": 12000 }
    ]
  }
}`;

const hasilApi: any = JSON.parse(responsJson); // any — semua diterima

console.log(hasilApi.status); // ok
console.log(hasilApi.sttus);  // undefined ← TYPO lolos senyap (bahaya any)

// ------------------------------------------------------------------
// (2) ASSERTION BERTINGKAT — dari any ke kontrak interface
//     (≈ Dart: hasil['data'] as Map<String, dynamic> lalu diurai)
// ------------------------------------------------------------------
interface ItemMenu {
  nama: string;
  harga: number;
}

interface MenuResponse {
  toko: string;
  menu: ItemMenu[]; // array of objects — bertingkat dua level
}

const data: MenuResponse = hasilApi.data as MenuResponse;

console.log(data.toko); // Kafe PZ Now

for (const item of data.menu) {
  console.log(`- ${item.nama} Rp${item.harga}`);
}
// - Kopi Susu Rp18000
// - Teh Panas Rp12000

// ------------------------------------------------------------------
// (3) VALIDASI BERTINGKAT — `as` TIDAK memeriksa runtime; kalau data
//     bisa berasal dari luar, cek bentuknya sendiri dengan typeof
//     (typeof null juga "object" — cek x !== null wajib ikut)
// ------------------------------------------------------------------
function cekMenu(x: any): boolean {
  if (typeof x !== "object" || x === null) {
    return false;
  }
  if (typeof x.toko !== "string" || typeof x.menu !== "object") {
    return false;
  }
  for (const item of x.menu) {
    if (typeof item.nama !== "string" || typeof item.harga !== "number") {
      return false; // satu item cacat — seluruh data gagal
    }
  }
  return true;
}

console.log(cekMenu(hasilApi.data)); // true
console.log(cekMenu({}));            // false (toko tidak ada)

// ------------------------------------------------------------------
// (4) KLAIM NGAWUR dari any tetap SAH — runtime membongkarnya
// ------------------------------------------------------------------
const klaimAngka: number = hasilApi.data as number; // tsc DIAM (dari any)

console.log(typeof klaimAngka); // object ← bukan number! as tak mengubah apa pun

// ------------------------------------------------------------------
// (5) RAMAL DULU: sesudah assertion, akses dikunci kontrak — property
//     di luar interface DITOLAK (kebalikan zona bebas any di poin 1)
// ------------------------------------------------------------------
// const stok = data.stok;
// ERROR TS2339: Property 'stok' does not exist on type 'MenuResponse'.

// ========================================
// RANGKUMAN
// ========================================
// - JSON.parse → any ≈ jsonDecode Dart → dynamic: tanpa pengawalan,
//   typo property lolos senyap jadi undefined.
// - `as` = klaim bentuk saat COMPILE saja: memudahkan akses bertingkat
//   (object berisi array of objects), tapi tidak mengubah/meriksa
//   runtime — bahkan klaim jelas salah tetap lolos dari any.
// - Karena itu data eksternal divalidasi manual bertingkat dengan
//   typeof (+ cek null) SEBELUM dipercaya.
// - Sesudah assertion, akses dikunci kontrak: property asing = TS2339 —
//   zona any (bebas) vs zona ber-tipe (terjaga) kini terlihat berdampingan.

