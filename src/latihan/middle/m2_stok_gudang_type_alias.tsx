// ========================================
// LATIHAN MIDDLE 2 — STOK GUDANG TYPE ALIAS
// ========================================
// Level: Middle
// Konsep: type alias untuk object type (materi 9), optional `?`
//         (materi 12), readonly property (materi 16), for klasik &
//         for-of (materi 30)
// Program: kartu stok gudang — data item + laporan total + daftar
//          perlu restock.

// ========================================
// SOAL
// ========================================
// 1. Definisikan type alias ItemStok dengan:
//    kode (READONLY string), nama (string), jumlah (number),
//    satuan (string), kategori (OPTIONAL string).
// 2. Isi 4 item (satu item TANPA kategori). Cetak daftar stok
//    dengan for-of; kategori kosong tampil sebagai "umum".
// 3. Hitung total unit seluruh stok dengan for klasik (index).
// 4. Kumpulkan item dengan jumlah < 10 ke array restock, lalu
//    cetak isinya satu per satu.
// 5. Ramal dulu: apa yang terjadi kalau kode item diubah setelah
//    data dibuat?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) TYPE ALIAS OBJECT — bentuk data ringan, tetap dijaga tsc
//     (Jika di Dart: data tanpa perilaku biasanya berakhir jadi
//     class kecil atau Map<String, dynamic> yang tak dijaga;
//     di TS `type` cukup satu deklarasi bentuk)
// ------------------------------------------------------------------
type ItemStok = {
  readonly kode: string; // beku setelah dibuat ≈ final field Dart
  nama: string;
  jumlah: number;
  satuan: string;
  kategori?: string;     // boleh absen → undefined (materi 12)
};

const stok: ItemStok[] = [
  { kode: "K001", nama: "Kopi Arabika", jumlah: 25, satuan: "pcs", kategori: "minuman" },
  { kode: "K002", nama: "Gula Pasir", jumlah: 8, satuan: "kg", kategori: "bahan" },
  { kode: "K003", nama: "Susu UHT", jumlah: 40, satuan: "liter" }, // tanpa kategori
  { kode: "K004", nama: "Teh Celup", jumlah: 3, satuan: "box", kategori: "minuman" },
];

// ------------------------------------------------------------------
// (2) CETAK DAFTAR — ?? memberi nilai cadangan saat kategori absen
// ------------------------------------------------------------------
for (const item of stok) {
  console.log(`${item.kode} | ${item.nama} | ${item.jumlah} ${item.satuan} | ${item.kategori ?? "umum"}`);
}
// K001 | Kopi Arabika | 25 pcs | minuman
// K002 | Gula Pasir | 8 kg | bahan
// K003 | Susu UHT | 40 liter | umum
// K004 | Teh Celup | 3 box | minuman

// ------------------------------------------------------------------
// (3) TOTAL UNIT — for klasik butuh INDEX; total ditampung accumulator
// ------------------------------------------------------------------
let totalUnit: number = 0;
for (let i = 0; i < stok.length; i++) {
  totalUnit = totalUnit + stok[i].jumlah;
}

console.log(`Total unit stok: ${totalUnit}`); // Total unit stok: 76

// ------------------------------------------------------------------
// (4) DAFTAR RESTOCK — for-of + if + push (filter versi loop; method
//     .filter() belum dibahas materi dasar)
// ------------------------------------------------------------------
const restock: string[] = [];
for (const item of stok) {
  if (item.jumlah < 10) {
    restock.push(`${item.kode} ${item.nama} (${item.jumlah} ${item.satuan})`);
  }
}

console.log(`Perlu restock: ${restock.length} item`); // Perlu restock: 2 item
for (const r of restock) {
  console.log(`- ${r}`);
}
// - K002 Gula Pasir (8 kg)
// - K004 Teh Celup (3 box)

// ------------------------------------------------------------------
// (5) RAMAL DULU: kode bertanda readonly — mengubahnya DITOLAK tsc
//     (readonly hanya gerbang COMPILE-TIME, sama seperti ReadonlyArray
//     di latihan beginner 3)
// ------------------------------------------------------------------
// const itemLama: ItemStok = {
//   kode: "K001", nama: "Kopi", jumlah: 25, satuan: "pcs",
// };
// itemLama.kode = "K999";
// ERROR TS2540: Cannot assign to 'kode' because it is a read-only property.

// ========================================
// RANGKUMAN
// ========================================
// - `type Nama = { ... }` cocok untuk data tanpa perilaku; Dart paling
//   dekat class dengan final field — tapi di TS tak perlu behavior.
// - readonly property ≈ final field Dart: bisa diisi saat pembuatan,
//   beku setelahnya (TS2540 kalau ditimpa).
// - kategori? + ?? "umum" = pola standar "boleh kosong, siapkan default".
// - Akumulasi/penyaringan data = tugas for; hasil ditampung array
//   biasa lewat push.

