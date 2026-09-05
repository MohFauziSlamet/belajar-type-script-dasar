// ========================================
// LATIHAN BEGINNER 2 — KONVERSI SUHU & BMI
// ========================================
// Level: Beginner
// Konsep: tipe number & operator aritmatika (materi 2), function dengan
//         return number (materi 23), operator pangkat ** (materi 34),
//         toFixed (materi 2)
// Program: kalkulator konversi suhu + penghitung BMI.

// ========================================
// SOAL
// ========================================
// 1. Buat function celsiusKeFahrenheit(c: number): number   → c * 9 / 5 + 32
// 2. Buat function celsiusKeKelvin(c: number): number       → c + 273.15
// 3. Buat function fahrenheitKeCelsius(f: number): number   → (f - 32) * 5 / 9
// 4. Buat function hitungBMI(berat: number, tinggiMeter: number): number
//    → berat dibagi tinggi KUADRAT — WAJIB pakai operator ** .
//      (Jika di Dart: math.pow(tinggi, 2) — Dart TIDAK punya operator **)
// 5. Cetak semua hasil dengan toFixed(2) supaya rapi.

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) KONVERSI SUHU — semua masuk number, keluar number.
//     TS hanya punya SATU tipe angka: number
//     (Jika di Dart: int & double terpisah → di TS number saja, mirip `num`)
// ------------------------------------------------------------------
function celsiusKeFahrenheit(c: number): number {
  return c * 9 / 5 + 32;
}

function celsiusKeKelvin(c: number): number {
  return c + 273.15;
}

function fahrenheitKeCelsius(f: number): number {
  return (f - 32) * 5 / 9;
}

console.log(celsiusKeFahrenheit(25).toFixed(2));   // 77.00
console.log(celsiusKeKelvin(25).toFixed(2));       // 298.15
console.log(fahrenheitKeCelsius(98.6).toFixed(2)); // 37.00

// ------------------------------------------------------------------
// (2) BMI DENGAN OPERATOR PANGKAT ** — tinggi ** 2 = tinggi kuadrat
// ------------------------------------------------------------------
function hitungBMI(berat: number, tinggiMeter: number): number {
  return berat / tinggiMeter ** 2;
}

console.log(hitungBMI(70, 1.75).toFixed(2));  // 22.86
console.log(hitungBMI(55, 1.6).toFixed(2));   // 21.48

// ------------------------------------------------------------------
// (3) toFixed MEMBULATKAN DAN MENGEMBALIKAN STRING, BUKAN number
//     (Jika di Dart: toStringAsFixed(2) — sama, hasil juga String)
// ------------------------------------------------------------------
const bmi: number = hitungBMI(70, 1.75);  // pakai ulang function di atas (DRY)

console.log(bmi);                 // 22.857142857142858  (number mentah)
console.log(bmi.toFixed(1));      // 22.9               (string hasil bulat)
console.log(bmi.toFixed(3));      // 22.857             (3 angka di belakang koma)

// ========================================
// RANGKUMAN
// ========================================
// - number = satu-satunya tipe angka TS (Dart punya int & double terpisah).
// - `**` adalah operator pangkat; Dart tidak punya (harus math.pow).
// - Prioritas: ** dihitung sebelum / jadi berat / tinggi ** 2 aman —
//   tapi kurung tetap sahabat kalau ragu: berat / (tinggi ** 2).
// - toFixed(n) ≈ toStringAsFixed(n) Dart: hasil STRING, bukan number.
