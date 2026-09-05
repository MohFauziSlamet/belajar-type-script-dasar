// ========================================
// LATIHAN EXPERT 3 — VENDING MACHINE SIMULATOR
// ========================================
// Level: Expert (gabungan)
// Konsep: do-while (32), while (31), break & continue (33), switch
//         (29), array (3), if (27)
// Program: mesin penjual otomatis — antrean pilihan diproses satu
//          per satu sampai "selesai", lalu kembalian dipecah koin.

// ========================================
// SOAL
// ========================================
// 1. Siapkan antrean pilihan (deterministik): ["kopi", "salah",
//    "teh", "kopi", "selesai", "teh"] — stok awal kopi 2, teh 2,
//    harga kopi 5000, teh 4000.
// 2. Proses antrean dengan DO-WHILE:
//    - "selesai" → break keluar LOOP (cetak penutup)
//    - "salah"   → continue (cetak "dilewati") — WAJIB ditulis di
//      badan loop DI LUAR switch; increment langkah ada di AWAL badan
//    - item lain → switch menangani beli (break di dalam case hanya
//      keluar SWITCH, loop tetap lanjut); kurangi stok, tambah total
//    Harga setelah "selesai" tidak boleh terproses — buktikan.
// 3. Kembalian: bayar Rp20000 — pecahkan dengan WHILE per koin
//    [2000, 1000, 500] (for-of pecahan + while dalam), cetak tiap
//    koin dan sisa akhirnya.
// 4. Ramal dulu: apa error `continue` dalam switch yang TIDAK berada
//    dalam loop?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) SETTING — antrean ditentukan (simulasi tanpa input pengguna)
// ------------------------------------------------------------------
const antrean: string[] = ["kopi", "salah", "teh", "kopi", "selesai", "teh"];
let stokKopi: number = 2;
let stokTeh: number = 2;
let totalBelanja: number = 0;

// ------------------------------------------------------------------
// (2) TRANSAKSI DO-WHILE — tiga kata kunci bekerja bersama:
//     break-loop vs break-switch vs continue (semuanya materi 33)
// ------------------------------------------------------------------
let langkah: number = 0;

do {
  const pilihan: string = antrean[langkah];
  langkah = langkah + 1; // increment DI AWAL → continue tetap aman
  // (Jika di Dart: jebakan yang sama — continue di while yang
  //  increment-nya di akhir badan = loop tak pernah maju)

  if (pilihan === "selesai") {
    console.log(`[${langkah}] selesai — transaksi ditutup`);
    break; // keluar dari LOOP (bukan switch — ini di luar switch)
  }

  if (pilihan === "salah") {
    console.log(`[${langkah}] salah tekan — dilewati tanpa belanja`);
    continue; // DI LUAR switch: lompat ke cek kondisi while
  }

  switch (pilihan) {
    case "kopi":
      if (stokKopi > 0) {
        stokKopi = stokKopi - 1;
        totalBelanja = totalBelanja + 5000;
        console.log(`[${langkah}] kopi terbeli Rp5000 (sisa kopi: ${stokKopi})`);
      } else {
        console.log(`[${langkah}] kopi habis`);
      }
      break; // hanya keluar SWITCH — do-while tetap berjalan
    case "teh":
      if (stokTeh > 0) {
        stokTeh = stokTeh - 1;
        totalBelanja = totalBelanja + 4000;
        console.log(`[${langkah}] teh terbeli Rp4000 (sisa teh: ${stokTeh})`);
      } else {
        console.log(`[${langkah}] teh habis`);
      }
      break;
    default:
      console.log(`[${langkah}] pilihan tidak dikenal: ${pilihan}`);
  }
} while (langkah < antrean.length);

console.log(`Total belanja: Rp${totalBelanja}`); // Total belanja: Rp14000
console.log(`Terakhir diabaikan: ${antrean[5]}`); // Terakhir diabaikan: teh

// ------------------------------------------------------------------
// (3) KEMBALIAN — while "menuang" koin selama masih muat
// ------------------------------------------------------------------
const bayar: number = 20000;
let kembali: number = bayar - totalBelanja; // 6000

console.log(`Kembalian Rp${kembali}:`);
for (const pecahan of [2000, 1000, 500]) {
  while (kembali >= pecahan) {
    console.log(`- koin Rp${pecahan}`);
    kembali = kembali - pecahan;
  }
}
console.log(`Sisa: Rp${kembali}`); // Sisa: Rp0
// Kembalian Rp6000:
// - koin Rp2000
// - koin Rp2000
// - koin Rp2000
// Sisa: Rp0

// ------------------------------------------------------------------
// (4) RAMAL DULU: continue TANPA loop pembungkus — tsc menolak
//     kalimat lompatannya. (Dalam switch yang BERADA dalam loop,
//     continue justru sah — tapi meneruskan LOOP-nya, bukan switch —
//     membingungkan; makanya di file ini continue ditulis di luar
//     switch. Varian dalam function malah TS1107 "Jump target cannot
//     cross function boundary.")
// ------------------------------------------------------------------
// switch (pilihan) {
//   case "a":
//     continue;
// }
// ERROR TS1104: A 'continue' statement can only be used within an enclosing iteration statement.

// ========================================
// RANGKUMAN
// ========================================
// - do-while pas untuk mesin yang pasti memproses minimal satu
//   langkah; kondisi dicek SETELAH badan.
// - Tiga makna lompatan: break di luar switch = keluar loop; break
//   dalam case = keluar switch saja; continue = lompat ke cek kondisi
//   — letakkan increment sebelum continue agar loop tetap maju.
// - continue tanpa loop pembungkus = TS1104; dalam function = TS1107;
//   dalam switch-dalam-loop sah tapi membingungkan — hindari.
// - while "menuang" koin: ulangi selama masih muat — pas untuk
//   pengurangan berulang sampai batas.

