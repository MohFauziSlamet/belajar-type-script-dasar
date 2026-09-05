// ========================================
// LATIHAN EXPERT 4 — BOOKING KURSI BIOSKOP
// ========================================
// Level: Expert (gabungan)
// Konsep: indexable interface (18), tuple (5), ReadonlyArray (4),
//         null eksplisit vs key absen (14), template key (34),
//         for klasik & for-in (30), if (27)
// Program: denah kursi studio — kode kursi "r1-c2" sebagai kunci,
//          booking dengan tiga kemungkinan hasil, daftar film
//          terkunci readonly.

// ========================================
// SOAL
// ========================================
// 1. Definisikan indexable interface DenahKursi { [kode: string]:
//    string | null } — nilai = nama penonton, null = kursi kosong
//    EKSPLISIT. Definisikan juga ReadonlyArray<string> filmTayang
//    (3 film) dan tuple ukuranStudio: [number, number] = [4, 3].
//    Isi 12 kursi r1-c1 s.d. r4-c3 (3 sudah diduduki, sisanya null).
// 2. Cetak denah lengkap dengan nested for klasik — kode dirangkai
//    template literal `r${r}-c${c}`; kursi kosong tampil "(kosong)".
// 3. Buat booking(k, kode, nama): string dengan TIGA cabang: key
//    absen (=== undefined) → "tidak dikenal"; null → pesan sukses +
//    isi nama; terisi → pesan gagal menyebut pemiliknya. Uji ketiganya.
// 4. Buat hitungKursiKosong (for-in + cek null) dan cariKursi(nama):
//    string | null (for-in). Cetak denah akhir + statistiknya.
// 5. Ramal dulu: apa error meng-assign angka ke kursi? Dan menambah
//    film lewat push pada ReadonlyArray?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) STRUKTUR STUDIO — tiga bentuk pengunci data berdampingan
// ------------------------------------------------------------------
interface DenahKursi {
  [kode: string]: string | null; // nama penonton | null = kosong
}

const filmTayang: ReadonlyArray<string> = ["Aksi Pagi", "Drama Siang", "Komedi Malam"];

const ukuranStudio: [number, number] = [4, 3]; // [baris, kolom]

const kursi: DenahKursi = {
  "r1-c1": "Sari",
  "r1-c2": null,
  "r1-c3": null,
  "r2-c1": null,
  "r2-c2": null,
  "r2-c3": "Budi",
  "r3-c1": "Citra",
  "r3-c2": null,
  "r3-c3": null,
  "r4-c1": null,
  "r4-c2": null,
  "r4-c3": null,
};

console.log(`Film tayang: ${filmTayang.length}`); // Film tayang: 3

// ------------------------------------------------------------------
// (2) CETAK DENAH — key template, bukan tuple sebagai key
//     (tuple jadi key berubah jadi string "4,3" saat runtime)
// ------------------------------------------------------------------
function cetakDenah(k: DenahKursi, ukuran: [number, number]): void {
  for (let r = 1; r <= ukuran[0]; r++) {
    const baris: string[] = [];
    for (let c = 1; c <= ukuran[1]; c++) {
      const kode: string = `r${r}-c${c}`; // rangkai kode kursi
      baris.push(`${kode} ${k[kode] ?? "(kosong)"}`);
    }
    console.log(baris.join(" | "));
  }
}

cetakDenah(kursi, ukuranStudio);
// r1-c1 Sari | r1-c2 (kosong) | r1-c3 (kosong)
// r2-c1 (kosong) | r2-c2 (kosong) | r2-c3 Budi
// r3-c1 Citra | r3-c2 (kosong) | r3-c3 (kosong)
// r4-c1 (kosong) | r4-c2 (kosong) | r4-c3 (kosong)

// ------------------------------------------------------------------
// (3) BOOKING TIGA CABANG — undefined (kursi tak ada), null (bisa),
//     terisi (gagal): tiga rasa "kosong" dari materi 14 & 18 dipakai
// ------------------------------------------------------------------
function booking(k: DenahKursi, kode: string, nama: string): string {
  if (k[kode] === undefined) {
    return `${kode} tidak dikenal — kursi seperti itu tidak ada`;
  }
  if (k[kode] !== null) {
    return `${kode} gagal — sudah diduduki ${k[kode]}`;
  }
  k[kode] = nama; // null → aman ditimpa nama penonton baru
  return `${kode} berhasil dipesan ${nama}`;
}

console.log(booking(kursi, "r1-c2", "Andi")); // r1-c2 berhasil dipesan Andi
console.log(booking(kursi, "r1-c1", "Eko"));  // r1-c1 gagal — sudah diduduki Sari
console.log(booking(kursi, "r9-c9", "Eko"));  // r9-c9 tidak dikenal — kursi seperti itu tidak ada

// ------------------------------------------------------------------
// (4) STATISTIK — for-in menelusuri semua key denah
// ------------------------------------------------------------------
function hitungKursiKosong(k: DenahKursi): number {
  let kosong: number = 0;
  for (const kode in k) {
    if (k[kode] === null) {
      kosong = kosong + 1;
    }
  }
  return kosong;
}

function cariKursi(k: DenahKursi, nama: string): string | null {
  for (const kode in k) {
    if (k[kode] === nama) {
      return kode;
    }
  }
  return null;
}

console.log(hitungKursiKosong(kursi));      // 8
console.log(cariKursi(kursi, "Budi"));      // r2-c3
console.log(cariKursi(kursi, "Zeta"));      // null

cetakDenah(kursi, ukuranStudio);
// r1-c1 Sari | r1-c2 Andi | r1-c3 (kosong)
// r2-c1 (kosong) | r2-c2 (kosong) | r2-c3 Budi
// r3-c1 Citra | r3-c2 (kosong) | r3-c3 (kosong)
// r4-c1 (kosong) | r4-c2 (kosong) | r4-c3 (kosong)

// ------------------------------------------------------------------
// (5) RAMAL DULU: dua pagar pengunci — index signature menolak tipe
//     lain, ReadonlyArray menolak perubahan isi
// ------------------------------------------------------------------
// kursi["r1-c1"] = 123;
// ERROR TS2322: Type 'number' is not assignable to type 'string'.

// filmTayang.push("Horor Malam");
// ERROR TS2339: Property 'push' does not exist on type 'readonly string[]'.

// ========================================
// RANGKUMAN
// ========================================
// - Tiga rasa akses kursi: nama (terisi), null (kosong sengaja),
//   undefined (kode tidak ada) — booking memutuskan tiganya dengan
//   urutan cek undefined → null → terisi.
// - Kode kursi dirangkai template literal (`r${r}-c${c}`); tuple
//   hanya menyimpan UKURAN grid, bukan jadi key.
// - ReadonlyArray mengunci daftar film saat compile (push = TS2339) —
//   pagar yang sama dengan katalog latihan beginner 3.
// - for-in efisien menelusuri key denah untuk statistik & pencarian;
//   hasil pencarian gagal dikembalikan sebagai null.

