// ========================================
// LATIHAN MIDDLE 4 — MEMBER & POIN ENUM
// ========================================
// Level: Middle
// Konsep: enum string (materi 13), switch (materi 29), type alias
//         union literal (materi 10)
// Program: hitung poin member kafe — level member menentukan
//          pengali poin, status menentukan aktif/tidaknya kartu.

// ========================================
// SOAL
// ========================================
// 1. Definisikan enum Level (string): BRONZE, SILVER, GOLD.
// 2. Buat fungsi multiplierPoin(level: Level): number dengan switch:
//    GOLD = 2, SILVER = 1.5, lainnya (default) = 1.
// 3. Buat fungsi hitungPoin(belanja: number, level: Level): number —
//    poin dasar = belanja / 10000, dikali pengali, dibulatkan ke bawah.
// 4. Buat type alias StatusMember = "aktif" | "nonaktif" dan fungsi
//    ringkasan(nama, level, status, belanja): string — kalau nonaktif,
//    poin dibekukan; kalau aktif, tampilkan poinnya.
// 5. Ramal dulu: apa error kalau kita tulis const level: Level = "GOLD"
//    padahal nilainya kelihatan sama persis?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) ENUM STRING — tiap anggota punya nilai teks yang kita pilih
//     (Jika di Dart: enum juga ada, tapi anggotanya BUKAN string —
//     enum TS versi string enak untuk label/API)
// ------------------------------------------------------------------
enum Level {
  Bronze = "BRONZE",
  Silver = "SILVER",
  Gold = "GOLD",
}

console.log(Level.Gold); // GOLD

// enum tanpa nilai = number otomatis mulai 0:
// enum Hari { Sen, Sel } → Sen = 0, Sel = 1 (perilaku default materi 13)

// ------------------------------------------------------------------
// (2) SWITCH PADA ENUM — case membandingkan ANGGOTA enum, bukan teks
// ------------------------------------------------------------------
function multiplierPoin(level: Level): number {
  switch (level) {
    case Level.Gold:
      return 2;
    case Level.Silver:
      return 1.5;
    default:
      return 1; // Bronze — sisa anggota ditampung default
  }
}

console.log(multiplierPoin(Level.Gold));   // 2
console.log(multiplierPoin(Level.Silver)); // 1.5
console.log(multiplierPoin(Level.Bronze)); // 1

// ------------------------------------------------------------------
// (3) HITUNG POIN — Math.floor membulatkan ke bawah (2.5 → 2)
// ------------------------------------------------------------------
function hitungPoin(belanja: number, level: Level): number {
  return Math.floor((belanja / 10000) * multiplierPoin(level));
}

console.log(hitungPoin(25000, Level.Gold));   // 5  (2.5 × 2)
console.log(hitungPoin(25000, Level.Silver)); // 3  (2.5 × 1.5 = 3.75 → 3)
console.log(hitungPoin(25000, Level.Bronze)); // 2  (2.5 × 1 = 2.5 → 2)

// ------------------------------------------------------------------
// (4) UNION LITERAL utk STATUS — berpasangan dengan enum dalam satu
//     fungsi; if cukup karena cuma dua pilihan
// ------------------------------------------------------------------
type StatusMember = "aktif" | "nonaktif";

function ringkasan(nama: string, level: Level, status: StatusMember, belanja: number): string {
  if (status !== "aktif") {
    return `${nama}: kartu ${level} NONAKTIF — poin dibekukan`;
  }
  return `${nama}: ${level} dapat ${hitungPoin(belanja, level)} poin`;
}

console.log(ringkasan("Sari", Level.Gold, "aktif", 25000));
// Sari: GOLD dapat 5 poin
console.log(ringkasan("Rina", Level.Silver, "aktif", 25000));
// Rina: SILVER dapat 3 poin
console.log(ringkasan("Tono", Level.Gold, "nonaktif", 25000));
// Tono: kartu GOLD NONAKTIF — poin dibekukan

// ------------------------------------------------------------------
// (5) RAMAL DULU: "GOLD" ≠ Level.Gold — string mentah DITOLAK meski
//     nilainya terlihat sama (enum adalah tipe tersendiri), padahal
//     union literal StatusMember justru menerima "aktif" langsung
// ------------------------------------------------------------------
// const level: Level = "GOLD";
// ERROR TS2322: Type '"GOLD"' is not assignable to type 'Level'.

// ========================================
// RANGKUMAN
// ========================================
// - Enum string = anggota bernama + nilai teks eksplisit; enum number
//   (default) menghitung 0,1,2 otomatis.
// - switch cocok untuk banyak cabang; case memakai NamaEnum.Anggota.
// - Enum ≠ string literal: "GOLD" tidak bisa masuk Level (TS2322),
//   sedangkan union literal ("aktif") menerima teks mentahnya.
// - default menampung sisa anggota — aman dipakai sebagai cabang
//   terakhir switch enum.

