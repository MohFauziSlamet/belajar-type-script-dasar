// ========================================
// LATIHAN MIDDLE 3 — STATISTIK NILAI SISWA
// ========================================
// Level: Middle
// Konsep: tuple (materi 5), while (materi 31), do-while (materi 32),
//         break (materi 33), for-of + destructuring (materi 30 & 34)
// Program: rekap nilai kelas — rata-rata tiap siswa, siswa pertama
//          yang juara, dan simulasi remedial.

// ========================================
// SOAL
// ========================================
// 1. Definisikan type alias NilaiSiswa = [string, number, number]
//    (nama, nilai tugas, nilai ujian). Isi 3 siswa.
// 2. Cetak rata-rata tiap siswa ((tugas + ujian) / 2) dengan
//    for-of + destructuring per baris.
// 3. Cari siswa PERTAMA dengan rata-rata >= 90 pakai while —
//    berhenti begitu ketemu (break), jangan lanjut sisa array.
// 4. Simulasikan remedial Budi: nilai awal rata-ratanya, tiap sesi
//    naik 7, cetak tiap sesi, berhenti saat >= 75 — pakai do-while
//    (minimal satu sesi selalu jalan).
// 5. Ramal dulu: apa error kalau data tuple hanya diisi 2 elemen?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) TUPLE — panjang & tipe per index TERKUNCI
//     (Jika di Dart: record (String, int, int) Dart 3+ sama ketatnya —
//      beda akses: record $1/$2/$3, tuple [0]/[1]/[2])
// ------------------------------------------------------------------
type NilaiSiswa = [string, number, number]; // nama, tugas, ujian

const siswa: NilaiSiswa[] = [
  ["Andi", 80, 90],
  ["Budi", 70, 65],
  ["Citra", 95, 92],
];

// ------------------------------------------------------------------
// (2) RATA-RATA — for-of + destructuring: array kecil "dibongkar"
//     langsung di deklarasi (materi 34)
// ------------------------------------------------------------------
for (const [nama, tugas, ujian] of siswa) {
  const rata: number = (tugas + ujian) / 2;
  console.log(`${nama}: rata-rata ${rata}`);
}
// Andi: rata-rata 85
// Budi: rata-rata 67.5
// Citra: rata-rata 93.5

// ------------------------------------------------------------------
// (3) PENCARIAN with WHILE — index maju manual, break saat ketemu
//     (while cocok karena kita tak tahu berapa langkah sebelum berhenti)
// ------------------------------------------------------------------
let i: number = 0;
let namaJuara: string = "";
let rataJuara: number = 0;

while (i < siswa.length) {
  const [nama, tugas, ujian] = siswa[i];
  const rata: number = (tugas + ujian) / 2;
  if (rata >= 90) {
    namaJuara = nama;   // ketemu —
    rataJuara = rata;   // stop scanning sisanya
    break;              // (materi 33)
  }
  i = i + 1;
}

console.log(`Rata-rata >= 90 pertama: ${namaJuara} (${rataJuara})`);
// Rata-rata >= 90 pertama: Citra (93.5)

// ------------------------------------------------------------------
// (4) REMEDIAL with DO-WHILE — badan jalan DULU, syarat dicek BELAKANG
//     (Jika di Dart: do-while juga ada, sintaks SAMA PERSIS — yang
//      membedakannya dari while biasa: syarat dicek SETELAH badan)
// ------------------------------------------------------------------
let nilai: number = 67.5; // rata-rata Budi dari poin (2)
let sesi: number = 0;

do {
  sesi = sesi + 1;
  console.log(`Remedial sesi ${sesi}: nilai ${nilai}`);
  nilai = nilai + 7;
} while (nilai < 75); // cek SETELAH badan — minimal 1 sesi pasti jalan

console.log(`Budi lulus di ${nilai}`);
// Remedial sesi 1: nilai 67.5
// Remedial sesi 2: nilai 74.5
// Budi lulus di 81.5

// ------------------------------------------------------------------
// (5) RAMAL DULU: tuple pendek & index nyasar — dua error khas tuple
// ------------------------------------------------------------------
const nilaiOk: NilaiSiswa = ["Eka", 88, 90];
console.log(nilaiOk[0]); // Eka

// const salahTuple: NilaiSiswa = ["Andi", 80];
// ERROR TS2322: Type '[string, number]' is not assignable to type 'NilaiSiswa'.
//   Source has 2 element(s) but target requires 3.

// const nyasar = nilaiOk[3];
// ERROR TS2493: Tuple type 'NilaiSiswa' of length '3' has no element at index '3'.

// ========================================
// RANGKUMAN
// ========================================
// - Tuple = array terkunci panjang + tipe per index ≈ record Dart 3+
//   (beda akses: [0]/[1]/[2] vs $1/$2/$3).
// - while untuk "jalan sampai syarat berhenti" (index manual + break);
//   for-of tetap pilihan kalau sekadar mengunjungi semua isi.
// - do-while = cek syarat SETELAH badan → minimal sekali jalan
//   (pas untuk proses yang wajib dicoba dulu, seperti remedial).
// - Dua error khas tuple: elemen kurang (TS2322) & index di luar
//   panjang (TS2493).

