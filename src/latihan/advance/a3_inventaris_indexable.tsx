// ========================================
// LATIHAN ADVANCE 3 — INVENTARIS INDEXABLE
// ========================================
// Level: Advance
// Konsep: indexable interface (materi 18), tuple (materi 5),
//         key template literal (materi 34)
// Program: denah gudang — kode slot "A-1" style menjadi kunci,
//          isi slot = nama barang; slot kosong EKSPLISIT null.

// ========================================
// SOAL
// ========================================
// 1. Definisikan indexable interface PetaSlot dengan index signature
//    [kode: string]: string | null. Isi peta gudang 3 rak × 2 kolom
//    (A-1 s.d. C-2): dua slot berisi barang, sisanya null SENGJA.
// 2. Bedah tiga rasa akses: slot terisi, slot null, key yang absen
//    (Z-9) — cetak ketiganya.
// 3. Definisikan tuple ukuranGudang: [number, number] = [3, 2] dan
//    array rakLabel ["A", "B", "C"]. Cetak DENAH lengkap dengan
//    nested for klasik — kode slot dibangun dari template
//    `${label}-${kolom}` (key template, BUKAN tuple sebagai key).
// 4. Buat cariBarang(peta, nama): string | null — for-in menelusuri
//    KEY, kembalikan kode slot tempat barang ditemukan, null kalau
//    tidak ada. Hitung juga jumlah slot terisi.
// 5. Ramal dulu: apa error kalau indexable interface ditambah
//    property jumlah: number padahal tipe indexnya string?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) INDEXABLE INTERFACE — object yang "diajak bicara" lewat []
//     (Jika di Dart: Map<String, String?> — tapi akses key absen di
//      Dart = null; di TS key absen = undefined, makanya slot kosong
//      diisi null EKSPLISIT supaya beda dari "memang tidak ada")
// ------------------------------------------------------------------
interface PetaSlot {
  [kode: string]: string | null; // SEMUA key bertipe ini
}

const peta: PetaSlot = {
  "A-1": "Kopi Arabika",
  "A-2": null,
  "B-1": "Gula Pasir",
  "B-2": null,
  "C-1": null,
  "C-2": null,
};

// ------------------------------------------------------------------
// (2) TIGA RASA AKSES — terisi / kosong sengaja / key absen
// ------------------------------------------------------------------
console.log(peta["A-1"]); // Kopi Arabika  ← terisi
console.log(peta["A-2"]); // null          ← kosong EKSPLISIT
console.log(peta["Z-9"]); // undefined     ← key-nya memang tak ada

// ------------------------------------------------------------------
// (3) DENAH GRID — nested for klasik; kode slot dirangkai template
//     literal (tuple dipakai sebagai DATA ukuran, bukan sebagai key —
//     tuple jadi key malah berubah jadi string "3,2" saat runtime)
// ------------------------------------------------------------------
const ukuranGudang: [number, number] = [3, 2]; // [jumlahRak, kolomPerRak]
const rakLabel: string[] = ["A", "B", "C"];

for (let r = 0; r < ukuranGudang[0]; r++) {
  const baris: string[] = [];
  for (let k = 1; k <= ukuranGudang[1]; k++) {
    const kode: string = `${rakLabel[r]}-${k}`; // "A-1", "A-2", ...
    baris.push(`${kode} ${peta[kode] ?? "(kosong)"}`);
  }
  console.log(baris.join(" | "));
}
// A-1 Kopi Arabika | A-2 (kosong)
// B-1 Gula Pasir | B-2 (kosong)
// C-1 (kosong) | C-2 (kosong)

// ------------------------------------------------------------------
// (4) PENCARIAN with FOR-IN — memberi KEY satu per satu
//     (Jika di Dart: for (final k in map.keys) — TS for-in langsung
//      pada object; AWAS: key-nya bertipe STRING walau kelihatan angka)
// ------------------------------------------------------------------
function cariBarang(peta: PetaSlot, nama: string): string | null {
  for (const kode in peta) {
    if (peta[kode] === nama) {
      return kode; // ketemu — kembalikan kode slotnya
    }
  }
  return null; // habis ditelusuri tidak ada
}

console.log(cariBarang(peta, "Gula Pasir")); // B-1
console.log(cariBarang(peta, "Teh Celup"));  // null

let slotTerisi: number = 0;
for (const kode in peta) {
  if (peta[kode] !== null) {
    slotTerisi = slotTerisi + 1;
  }
}
console.log(`Slot terisi: ${slotTerisi}`); // Slot terisi: 2

// ------------------------------------------------------------------
// (5) RAMAL DULU: property biasa di indexable HARUS cocok dengan tipe
//     index — number di tengah index string DITOLAK
// ------------------------------------------------------------------
// interface PetaSalah {
//   [kode: string]: string;
//   jumlah: number;
// }
// ERROR TS2411: Property 'jumlah' of type 'number' is not assignable to 'string' index type 'string'.

// ========================================
// RANGKUMAN
// ========================================
// - Indexable interface = object ber-kunci bebas ≈ Map Dart; tipe
//   SEMUA anggota dikunci satu index signature.
// - Tiga rasa akses: terisi (nilai), null (kosong sengaja),
//   undefined (key absen) — mengisi null eksplisit memisahkan dua
//   rasa "kosong" itu.
// - Kode slot dirangkai template literal (`${label}-${k}`) — JANGAN
//   pakai tuple sebagai key: diam-diam jadi string "3,2" di runtime.
// - for-in menelusuri KEY object (bertipe string); property tambahan
//   di indexable wajib cocok tipe index-nya (TS2411).

