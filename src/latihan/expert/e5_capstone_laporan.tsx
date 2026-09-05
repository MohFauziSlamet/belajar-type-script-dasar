// ========================================
// LATIHAN EXPERT 5 — CAPSTONE LAPORAN PENJUALAN
// ========================================
// Level: Expert (gabungan akhir)
// Konsep: any + type assertions dari JSON.parse (6, 22), interface +
//         union literal + optional (15, 10, 12), filterManual dengan
//         callback (26), enum (13), indexable rekap (18), null (14),
//         for-of (30), template literal (34)
// Program: laporan penjualan harian dari data transaksi JSON —
//          penguraian, penyaringan manual, dan rekap lengkap.

// ========================================
// SOAL
// ========================================
// 1. Simpan 4 transaksi sebagai string JSON (id, kasir, total, metode
//    "cash"/"qris", sebagian punya voucher). JSON.parse ke `any`,
//    lalu assertion ke Transaksi[] dengan interface: voucher OPTIONAL.
// 2. Tulis filterManual(data, cb) EKSPLISIT — for-of + if + push,
//    callback (t) => boolean (versi loop; .filter() belum dibahas
//    materi dasar). Saring: transaksi qris, dan transaksi kasir Sari.
// 3. Rekap: total omzet (for-of), rekap per kasir lewat indexable
//    { [nama: string]: number } dengan pola (rekap[k] ?? 0) + total,
//    dan struk terbesar (loop + if).
// 4. Enum Shift { Pagi, Malam } + tabel indexable shift per kasir.
//    Cetak LAPORAN lengkap: daftar struk (voucher pakai ?? "tanpa
//    voucher"), omzet, rekap per kasir beserta shift, struk terbesar.
// 5. Ramal dulu: apa error meng-assign metode "debit" padahal union
//    transaksinya hanya "cash" | "qris"?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) DATA DARI LUAR — JSON.parse → any → as (alur latihan a5)
// ------------------------------------------------------------------
const dataJson: string = `[
  { "id": "T1", "kasir": "Sari",  "total": 51000, "metode": "qris", "voucher": "PROMO" },
  { "id": "T2", "kasir": "Budi",  "total": 12000, "metode": "cash" },
  { "id": "T3", "kasir": "Sari",  "total": 33000, "metode": "cash", "voucher": "HEMAT" },
  { "id": "T4", "kasir": "Citra", "total": 8000,  "metode": "qris" }
]`;

interface Transaksi {
  id: string;
  kasir: string;
  total: number;
  metode: "cash" | "qris"; // union literal — hanya dua pilihan sah
  voucher?: string;        // sebagian struk memakainya
}

const hasilParse: any = JSON.parse(dataJson); // any — liar
const daftar: Transaksi[] = hasilParse as Transaksi[]; // dikunci kontrak

console.log(daftar.length); // 4

// ------------------------------------------------------------------
// (2) FILTER MANUAL — callback menentukan syarat, loop melakukan
//     pekerjaan (bukan .filter — ditulis eksplisit supaya jelas isi)
// ------------------------------------------------------------------
function filterManual(data: Transaksi[], cb: (t: Transaksi) => boolean): Transaksi[] {
  const hasil: Transaksi[] = [];
  for (const t of data) {
    if (cb(t)) {
      hasil.push(t);
    }
  }
  return hasil;
}

const viaQris: Transaksi[] = filterManual(daftar, (t) => t.metode === "qris");
const buatanSari: Transaksi[] = filterManual(daftar, (t) => t.kasir === "Sari");

console.log(viaQris.length);    // 2  (T1 + T4)
console.log(buatanSari.length); // 2  (T1 + T3)

// ------------------------------------------------------------------
// (3) REKAP — omzet, per kasir (indexable + ?? 0), struk terbesar
// ------------------------------------------------------------------
let omzet: number = 0;
for (const t of daftar) {
  omzet = omzet + t.total;
}

const rekap: { [nama: string]: number } = {};
for (const t of daftar) {
  rekap[t.kasir] = (rekap[t.kasir] ?? 0) + t.total; // kunci baru mulai 0
}

let terbesar: Transaksi = daftar[0];
for (const t of daftar) {
  if (t.total > terbesar.total) {
    terbesar = t;
  }
}

console.log(omzet);        // 104000
console.log(rekap["Sari"]); // 84000

// ------------------------------------------------------------------
// (4) LAPORAN — enum shift + tabel indexable + format akhir
// ------------------------------------------------------------------
enum Shift {
  Pagi = "PAGI",
  Malam = "MALAM",
}

const shiftKasir: { [nama: string]: Shift } = {
  Sari: Shift.Malam,
  Budi: Shift.Pagi,
  Citra: Shift.Pagi,
};

console.log("=== LAPORAN PENJUALAN ===");
for (const t of daftar) {
  console.log(`${t.id} ${t.kasir} ${t.metode} Rp${t.total} (${t.voucher ?? "tanpa voucher"})`);
}
// === LAPORAN PENJUALAN ===
// T1 Sari qris Rp51000 (PROMO)
// T2 Budi cash Rp12000 (tanpa voucher)
// T3 Sari cash Rp33000 (HEMAT)
// T4 Citra qris Rp8000 (tanpa voucher)

console.log(`Omzet: Rp${omzet}`); // Omzet: Rp104000

for (const nama in rekap) {
  console.log(`- ${nama} (${shiftKasir[nama]}): Rp${rekap[nama]}`);
}
// - Sari (MALAM): Rp84000
// - Budi (PAGI): Rp12000
// - Citra (PAGI): Rp8000

console.log(`Struk terbesar: ${terbesar.id} oleh ${terbesar.kasir} Rp${terbesar.total}`);
// Struk terbesar: T1 oleh Sari Rp51000

// ------------------------------------------------------------------
// (5) RAMAL DULU: metode dikunci union literal — nilai ketiga DITOLAK
//     tepat di titik penulisan, tanpa menunggu program jalan
// ------------------------------------------------------------------
// daftar[0].metode = "debit";
// ERROR TS2322: Type '"debit"' is not assignable to type '"cash" | "qris"'.

// ========================================
// RANGKUMAN
// ========================================
// - Alur data nyata: JSON string → any (liar) → as ke interface →
//   terjaga; optional voucher ditangani ?? saat cetak.
// - filterManual = penyaringan versi loop (for-of + if + push) dengan
//   syarat dikendalikan callback — pengganti .filter() yang belum
//   dibahas, sekaligus membuktikan tidak ada sihir di baliknya.
// - Rekap per kasir: indexable accumulator dengan pola (rekap[k] ?? 0)
//   + nilai — kunci pertama otomatis mulai dari nol.
// - Enum + tabel indexable memberi label shift tanpa if bertingkat;
//   union literal menjaga kolom metode dari nilai liar (TS2322).

