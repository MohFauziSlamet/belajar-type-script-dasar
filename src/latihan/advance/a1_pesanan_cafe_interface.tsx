// ========================================
// LATIHAN ADVANCE 1 — PESANAN CAFE INTERFACE
// ========================================
// Level: Advance
// Konsep: interface (materi 15), readonly property (16), extending
//         interface (19), function di interface (20), intersection
//         types `&` (21)
// Program: pesanan kafe — kontrak bentuk menu, pesanan dengan
//          method bawaan, dan pesanan member berdiskon.

// ========================================
// SOAL
// ========================================
// 1. Definisikan interface MenuItem: id (READONLY string), nama,
//    harga. Lalu dua turunannya lewat extends:
//    Minuman (+ ukuran: "kecil" | "besar") dan Makanan (+ beratGram).
//    Masukkan keduanya ke satu array MenuItem[] lalu cetak.
// 2. Definisikan interface Pesanan: items: MenuItem[] dan method
//    hitungTotal(): number. Buat object literal yang memenuhi
//    kontraknya (method menghitung pakai this.items) lalu cetak total.
// 3. Definisikan interface Berdiskon { diskonPersen: number } lalu
//    type PesananDiskon = Pesanan & Berdiskon. Buat object-nya,
//    cetak total sebelum & sesudah diskon (10%).
// 4. Ramal dulu: apa error kalau object Pesanan lupa menyediakan
//    method hitungTotal?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) INTERFACE + EXTENDS — turunan mewarisi kontrak induk
//     (Jika di Dart: interface juga bisa extends — sama; readonly
//      ≈ final field Dart)
// ------------------------------------------------------------------
interface MenuItem {
  readonly id: string; // beku setelah object dibuat (TS2540)
  nama: string;
  harga: number;
}

interface Minuman extends MenuItem {
  ukuran: "kecil" | "besar"; // union literal dari latihan m1
}

interface Makanan extends MenuItem {
  beratGram: number;
}

const kopi: Minuman = { id: "M1", nama: "Kopi Susu", harga: 18000, ukuran: "besar" };
const teh: Minuman = { id: "M2", nama: "Teh Panas", harga: 12000, ukuran: "kecil" };
const roti: Makanan = { id: "F1", nama: "Roti Bakar", harga: 15000, beratGram: 200 };

const semua: MenuItem[] = [];
semua.push(kopi, teh, roti); // Minuman & Makanan lolos sebagai MenuItem

for (const item of semua) {
  console.log(`- ${item.id} ${item.nama} Rp${item.harga}`);
}
// - M1 Kopi Susu Rp18000
// - M2 Teh Panas Rp12000
// - F1 Roti Bakar Rp15000

// ------------------------------------------------------------------
// (2) FUNCTION DI INTERFACE — kontrak menyuruh object bawa method
//     (Jika di Dart: method hidup di class; di TS object literal
//      pun bisa membawanya sendiri asal bentuknya cocok)
// ------------------------------------------------------------------
interface Pesanan {
  items: MenuItem[];
  hitungTotal(): number;
}

const pesananAndi: Pesanan = {
  items: [kopi, roti],
  hitungTotal(): number {
    let total: number = 0;
    for (const item of this.items) { // this = object pesanan ini
      total = total + item.harga;
    }
    return total;
  },
};

console.log(pesananAndi.hitungTotal()); // 33000

// ------------------------------------------------------------------
// (3) INTERSECTION `&` — gabungan dua kontrak jadi satu tipe baru
//     (Jika di Dart: tak ada `A & B` — biasanya interface/class baru
//      yang implements A, B (menulis ulang semua anggota; Dart hanya
//      boleh SATU extends); TS cukup satu baris type alias)
// ------------------------------------------------------------------
interface Berdiskon {
  diskonPersen: number;
}

type PesananDiskon = Pesanan & Berdiskon; // harus punya SEMUA member

const pesananVip: PesananDiskon = {
  items: [kopi, kopi],
  diskonPersen: 10,
  hitungTotal(): number {
    let total: number = 0;
    for (const item of this.items) {
      total = total + item.harga;
    }
    return total;
  },
};

const totalVip: number = pesananVip.hitungTotal(); // 36000
const setelahDiskon: number = totalVip - (totalVip * pesananVip.diskonPersen) / 100;

console.log(totalVip);      // 36000
console.log(setelahDiskon); // 32400

// ------------------------------------------------------------------
// (4) RAMAL DULU: kontrak Pesanan mewajibkan hitungTotal — object
//     tanpa method itu DITOLAK tsc sebelum program jalan
// ------------------------------------------------------------------
// const salahPesanan: Pesanan = { items: [] };
// ERROR TS2741: Property 'hitungTotal' is missing in type '{ items: never[]; }' but required in type 'Pesanan'.

// ========================================
// RANGKUMAN
// ========================================
// - Interface = kontrak bentuk; extends mewarisi kontrak (sama seperti
//   interface Dart), readonly membekukan member ≈ final.
// - Method bisa jadi bagian kontrak (hitungTotal()) — object literal
//   wajib menyediakannya; this di dalamnya = object tersebut.
// - `A & B` menggabungkan kontrak tanpa bikin interface baru —
//   kebutuhan member = gabungan keduanya (lupa salah satu = TS2741).

