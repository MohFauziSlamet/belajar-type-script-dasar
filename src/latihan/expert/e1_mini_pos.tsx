// ========================================
// LATIHAN EXPERT 1 — MINI POS
// ========================================
// Level: Expert (gabungan)
// Konsep: enum (13), interface + readonly (15, 16), extends (19),
//         function di interface (20), intersection (21), union literal
//         (10), callback (26), switch (29)
// Program: kasir mini — menu ber-hierarki, keranjang bermethod,
//          nota member berdiskon, struk dicetak lewat callback.

// ========================================
// SOAL
// ========================================
// 1. Definisikan enum Member (BRONZE/SILVER/GOLD), interface Produk
//    (kode READONLY, nama, harga) + dua turunan extends: Makanan
//    (+beratGram) dan Minuman (+dingin boolean). Cetak daftar menu
//    campuran lewat array Produk[].
// 2. Definisikan interface Keranjang: items + method tambah() dan
//    total(). Buat object-nya, isi 2 produk, cetak subtotal.
// 3. Definisikan type Nota = Keranjang & { member: Member; metode:
//    MetodeBayar } dengan MetodeBayar = "cash" | "qris". Diskon via
//    switch: GOLD 10%, SILVER 5%, BRONZE 0%. Buat fungsi cetakStruk
//    yang MENERIMA CALLBACK Formatter (n: number) => string untuk
//    memformat semua angka rupiah. Cetak struk lengkap + kembalian.
// 4. Ramal dulu: apa error kalau object Nota lupa member & metode?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) HIERARKI MENU — enum + interface + extends bekerja sama
// ------------------------------------------------------------------
enum Member {
  Bronze = "BRONZE",
  Silver = "SILVER",
  Gold = "GOLD",
}

interface Produk {
  readonly kode: string;
  nama: string;
  harga: number;
}

interface Makanan extends Produk {
  beratGram: number;
}

interface Minuman extends Produk {
  dingin: boolean;
}

// Literal turunan WAJIB dideklarasikan bertipe TURUNANNYA dulu —
// menulis property tambahan langsung di array Produk[] ditolak tsc
// (TS2353 "may only specify known properties") — excess property check
const kopiSusu: Minuman = { kode: "M1", nama: "Kopi Susu", harga: 18000, dingin: true };
const tehPanas: Minuman = { kode: "M2", nama: "Teh Panas", harga: 12000, dingin: false };
const rotiBakar: Makanan = { kode: "F1", nama: "Roti Bakar", harga: 15000, beratGram: 200 };

const menu: Produk[] = [kopiSusu, tehPanas, rotiBakar];

for (const p of menu) {
  console.log(`- ${p.kode} ${p.nama} Rp${p.harga}`);
}
// - M1 Kopi Susu Rp18000
// - M2 Teh Panas Rp12000
// - F1 Roti Bakar Rp15000

// ------------------------------------------------------------------
// (2) KERANJANG BERMETHOD — kontrak dari latihan a1, kini inti program
// ------------------------------------------------------------------
interface Keranjang {
  items: Produk[];
  tambah(p: Produk): void;
  total(): number;
}

const keranjang: Keranjang = {
  items: [],
  tambah(p: Produk): void {
    this.items.push(p);
  },
  total(): number {
    let total: number = 0;
    for (const p of this.items) {
      total = total + p.harga;
    }
    return total;
  },
};

keranjang.tambah(menu[0]); // Kopi Susu
keranjang.tambah(menu[2]); // Roti Bakar

console.log(keranjang.total()); // 33000

// ------------------------------------------------------------------
// (3) NOTA MEMBER — intersection + switch + callback dalam satu alur
// ------------------------------------------------------------------
type MetodeBayar = "cash" | "qris";

type Nota = Keranjang & { member: Member; metode: MetodeBayar };

const nota: Nota = {
  items: keranjang.items,
  member: Member.Gold,
  metode: "cash",
  tambah(p: Produk): void {
    this.items.push(p);
  },
  total(): number {
    let total: number = 0;
    for (const p of this.items) {
      total = total + p.harga;
    }
    return total;
  },
};

function persenDiskon(m: Member): number {
  switch (m) {
    case Member.Gold:
      return 10;
    case Member.Silver:
      return 5;
    default:
      return 0; // Bronze
  }
}

type Formatter = (n: number) => string; // kontrak bentuk fungsi (a2)

function cetakStruk(n: Nota, fmt: Formatter): void {
  console.log("=== STRUK MINI POS ===");
  for (const p of n.items) {
    console.log(`- ${p.nama}: ${fmt(p.harga)}`);
  }
  const subtotal: number = n.total();
  const potongan: number = (subtotal * persenDiskon(n.member)) / 100;
  console.log(`Subtotal: ${fmt(subtotal)}`);
  console.log(`Diskon ${n.member} (${persenDiskon(n.member)}%): -${fmt(potongan)}`);
  console.log(`Total: ${fmt(subtotal - potongan)}`);
  const bayar: number = 50000;
  console.log(`Bayar ${n.metode}: ${fmt(bayar)}`);
  console.log(`Kembali: ${fmt(bayar - (subtotal - potongan))}`);
}

cetakStruk(nota, (n) => `Rp${n}`);
// === STRUK MINI POS ===
// - Kopi Susu: Rp18000
// - Roti Bakar: Rp15000
// Subtotal: Rp33000
// Diskon GOLD (10%): -Rp3300
// Total: Rp29700
// Bayar cash: Rp50000
// Kembali: Rp20300

// ------------------------------------------------------------------
// (4) RAMAL DULU: intersection menuntut SEMUA member — lupa dua-nya
//     langsung ditolak dengan pesan yang menyebut apa yang hilang
// ------------------------------------------------------------------
// const salahNota: Nota = {
//   items: [],
//   tambah(p: Produk): void {},
//   total(): number {
//     return 0;
//   },
// };
// ERROR TS2322: Type '{ items: never[]; tambah(p: Produk): void; total(): number; }' is not assignable to type 'Nota'.
//   Type '{ items: never[]; tambah(p: Produk): void; total(): number; }' is missing the following properties from type '{ member: Member; metode: MetodeBayar; }': member, metode

// ========================================
// RANGKUMAN
// ========================================
// - Program nyata = kontrak kecil bekerjasama: enum (status), interface
//   + extends (hierarki menu), method dalam interface (perilaku),
//   intersection (nota = keranjang + info member).
// - Switch membaca enum untuk kebijakan (diskon) — cabang default
//   menampung sisanya.
// - Callback Formatter memisahkan FORMAT dari ISI struk: ganti callback,
//   seluruh angka berubah gaya tanpa menyentuh cetakStruk.
// - Lupa member intersection → TS2322 yang merinci properti hilang.

