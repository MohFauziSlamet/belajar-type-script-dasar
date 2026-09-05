// ========================================
// LATIHAN BEGINNER 4 — PENENTU GRADE UJIAN
// ========================================
// Level: Beginner
// Konsep: if / else if / else (materi 27), switch-case (materi 29)
//         + for-of & array number (materi 3, 30) untuk rapor mini
// Program: menentukan kategori & grade huruf dari nilai ujian.

// ========================================
// SOAL
// ========================================
// 1. Buat function kategoriNilai(nilai: number): string memakai if / else if:
//    >= 85 "Sangat Baik" | >= 70 "Baik" | >= 55 "Cukup" | sisanya "Kurang"
// 2. Buat function gradeHuruf(kategori: string): string memakai switch:
//    "Sangat Baik" → "A" | "Baik" → "B" | "Cukup" → "C" | "Kurang" → "D"
//    + default untuk kategori tak dikenal → "Tidak diketahui"
// 3. Proses daftar nilai [92, 78, 60, 45] dengan for-of → cetak rapor mini.

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) KATEGORI — rantai if / else if, urut dari RENTANG TERBESAR dulu.
//     switch TIDAK cocok di sini karena yang dicek RENTANG, bukan nilai pasti
// ------------------------------------------------------------------
function kategoriNilai(nilai: number): string {
  if (nilai >= 85) {
    return "Sangat Baik";
  } else if (nilai >= 70) {
    return "Baik";
  } else if (nilai >= 55) {
    return "Cukup";
  } else {
    return "Kurang";
  }
}

console.log(kategoriNilai(92));  // Sangat Baik
console.log(kategoriNilai(78));  // Baik
console.log(kategoriNilai(60));  // Cukup
console.log(kategoriNilai(45));  // Kurang

// ------------------------------------------------------------------
// (2) GRADE HURUF — switch untuk mencocokkan NILAI PASTI (string).
//     Setiap case di sini langsung return, jadi tidak perlu break
//     (break tetap wajib kalau case-nya berisi perintah lalu lanjut)
// ------------------------------------------------------------------
function gradeHuruf(kategori: string): string {
  switch (kategori) {
    case "Sangat Baik":
      return "A";
    case "Baik":
      return "B";
    case "Cukup":
      return "C";
    case "Kurang":
      return "D";
    default:
      return "Tidak diketahui";
  }
}

console.log(gradeHuruf("Baik"));        // B
console.log(gradeHuruf("Mengagumkan")); // Tidak diketahui  (default)

// ------------------------------------------------------------------
// (3) RAPOR MINI — for-of + gabungan kedua function di atas
// ------------------------------------------------------------------
const nilaiUjian: number[] = [92, 78, 60, 45];

for (const nilai of nilaiUjian) {
  const kategori: string = kategoriNilai(nilai);
  console.log(`Nilai ${nilai} → ${kategori} (grade ${gradeHuruf(kategori)})`);
}
// Nilai 92 → Sangat Baik (grade A)
// Nilai 78 → Baik (grade B)
// Nilai 60 → Cukup (grade C)
// Nilai 45 → Kurang (grade D)

// ========================================
// RANGKUMAN
// ========================================
// - Rentang (>= batas) → if / else if; nilai pasti → switch.
// - Urutan if dari terbesar ke terkecil: sekali cocok, sisanya dilewati.
// - case yang langsung return tidak butuh break; tanpa return & tanpa break
//   akan "jatuh" ke case berikutnya (fall-through).
// - default ≈ else: penampung saat tidak ada yang cocok.
