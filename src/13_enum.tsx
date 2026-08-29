// ========================================
// ENUM
// ========================================
// (PDF "TypeScript Dasar" hlm. 63-68: Enum, Menggunakan Enum,
//  Enum di JavaScript, Enum sebagai String)
// Materi sebelumnya: file 12 (optional properties).


// ------------------------------------------------------------------
// (1) DAFTAR NILAI TETAP — DEFAULT-NYA MENJADI NUMBER
//
// PDF hlm. 64: enum adalah tipe yang nilainya SUDAH PASTI (daftar
// tertutup, tidak bisa sembarangan). JavaScript TIDAK punya enum —
// ini fitur TypeScript.
//
//     enum Gender {
//         Male,     ← otomatis bernilai 0
//         Female,   ← otomatis bernilai 1
//     }
//
// Jika di Dart seperti ini:
//     enum Gender { male, female }
//     print(Gender.male);   // Gender.male  ← nilainya IDENTIFIER-nya
// di TypeScript jadi seperti ini: DEFAULT-NYA ANGKA. PERBEDAAN
// NYATA terbesar buat Dart developer — console.log menunjukkan
// ANGKA, bukan nama anggotanya. (Dart punya .index untuk angka;
// di TS angkanya justru nilai utamanya.)
// ------------------------------------------------------------------

enum Gender {
    Male,    // 0 — otomatis
    Female,  // 1 — otomatis, dst.
}

console.log(Gender.Male);    // 0    ← bukan "Male"! (gotcha dari Dart)
console.log(Gender.Female);  // 1

// Nilai awal juga bisa ditentukan — sisanya meneruskan +1:
enum Level {
    Rajin = 5,  // 5 — eksplisit
    Malas,      // 6 — otomatis lanjut dari sebelumnya
}

console.log(Level.Rajin);  // 5
console.log(Level.Malas);  // 6


// ------------------------------------------------------------------
// (2) MENGGUNAKAN ENUM — PARAMETER, BANDING, DAN SWITCH
//
// PDF hlm. 66: kegunaan utama enum = tipe parameter/return yang
// cuma menerima anggota daftar. Persis seperti Dart — satu-satunya
// tempat nilai "pasti" ini benar-benar dijaga.
// ------------------------------------------------------------------

function getSalah(gender: Gender): string {
    if (gender === Gender.Male) {         // banding via anggota enum,
        return "Tuan";                    // BUKAN via angka mentah
    } else {
        return "Nyonya";
    }
}

console.log(getSalah(Gender.Male));    // Tuan
console.log(getSalah(Gender.Female));  // Nyonya

// Angka asing DITOLAK compiler (enum = daftar tertutup):
// const aneh: Gender = 99;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '99' is not assignable to type 'Gender'.
//    (99 bukan anggota Gender — daftar enum dijaga ketat)

// PERBEDAAN NYATA, catatan aneh tapi sah: angka yang KEBETULAN cocok
// dengan nilai anggota diterima — `const boleh: Gender = 0` lolos,
// karena Gender.Male memang 0. Dart tidak mengenal angka di enum
// sama sekali. Tetap tulis Gender.Male — jangan angka mentah.


// ------------------------------------------------------------------
// (3) ENUM SEBAGAI STRING (hlm. 67-68)
//
// PDF hlm. 67: default enum jadi number; kalau mau, UBAH menjadi
// string dengan mengisi nilainya langsung:
//
//     enum Status {
//         Pending  = "PENDING",
//         Approved = "APPROVED",
//     }
//
// Keuntungan besar untuk daily work: nilai yang tampil di console/
// log/JSON jadi TERBACA. Inilah bentuk enum TS yang PALING MIRIP
// enum Dart — nilainya "identifier", bukan angka.
// ------------------------------------------------------------------

enum Status {
    Pending  = "PENDING",
    Approved = "APPROVED",
    Rejected = "REJECTED",
}

console.log(Status.Pending);   // PENDING   ← terbaca, bukan 0

function cekStatus(status: Status): string {
    // switch: pola Dart yang sama persis — materi kontrol alur
    // menyusul lengkap di Bagian 5; di sini cukup ikuti alurnya
    switch (status) {
        case Status.Pending:
            return "Menunggu persetujuan";
        case Status.Approved:
            return "Disetujui";
        default:
            return "Ditolak";
    }
}

console.log(cekStatus(Status.Approved));  // Disetujui
console.log(cekStatus(Status.Rejected));  // Ditolak


// ------------------------------------------------------------------
// (4) ENUM DI JAVASCRIPT = SEBUAH OBJECT (hlm. 67)
//
// PDF hlm. 67: enum dikonversi jadi apa di JavaScript? Jadi OBJECT.
// Enum number bahkan dapat BONUS: REVERSE MAPPING — dari angka bisa
// balik ke nama: Direction[0] → "Up". PERBEDAAN NYATA: fitur ini
// TIDAK ada di Dart
// (nilai enum Dart bukan angka, jadi tak ada yang perlu dibalik).
//
// Enum string TIDAK dapat reverse mapping — dua-duanya dijaga
// compiler di bawah ini.
// ------------------------------------------------------------------

enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}

console.log(Direction.Up);    // 0
console.log(Direction[0]);    // Up    ← reverse mapping (enum number)

// Object-nya "kotor" — key angka ikut masuk (akibat reverse mapping).
// (Terminal menampilkannya berbaris-baris karena panjang — seperti
// cetakan array file 9):
console.log(Object.keys(Direction));
// [
//   '0',    '1',
//   '2',    '3',
//   'Up',   'Down',
//   'Left', 'Right'
// ]

// Enum string bersih — hanya nama anggota:
console.log(Object.keys(Status));
// [ 'Pending', 'Approved', 'Rejected' ]

// Reverse mapping pada enum string → DITOLAK compiler:
// const m = Status[0];
// ❌ ERROR kalau di-uncomment:
//    error TS7053: Element implicitly has an 'any' type because
//    expression of type '0' can't be used to index type
//    'typeof Status'. Property '0' does not exist on type
//    'typeof Status'.

// const n = Status["PENDING"];
// ❌ ERROR kalau di-uncomment:
//    error TS2551: Property 'PENDING' does not exist on type
//    'typeof Status'. Did you mean 'Pending'?
//    (index-nya NAMA ANGGOTA — Status.Pending — bukan nilainya)


// ========================================
// RANGKUMAN
// ========================================
// 1. Enum = tipe dengan daftar nilai TERTUTUP. JS tidak punya enum
//    — fitur khas TypeScript (PDF hlm. 64).
// 2. DEFAULT-NYA NUMBER, auto 0, 1, 2, ... — console.log
//    Gender.Male menampilkan 0. PERBEDAAN NYATA terbesar untuk
//    Dart developer: nilai enum Dart = identifier-nya sendiri.
// 3. Nilai awal bisa eksplisit (Rajin = 5) — sisanya lanjut +1.
// 4. Angka asing ditolak: TS2322. (Angka yang KEBETULAN cocok
//    dengan nilai anggota anehnya lolos — tetap pakai Gender.Male,
//    jangan angka mentah.)
// 5. ENUM SEBAGAI STRING (Status = "PENDING"): nilai terbaca di
//    log — bentuk paling mirip enum Dart, direkomendasikan untuk
//    kerja harian.
// 6. Enum di JS = OBJECT. Enum number dapat reverse mapping
//    Direction[0] → "Up" (tidak ada di Dart); enum string tidak
//    (TS7053 / TS2551 menjaga).
//
// Cara menjalankan file ini:  npx tsx src/13_enum.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat enum numeric Hari { Senin, Selasa, Rabu } (default number).
//    Buat function namaHari(h: Hari): string yang mengembalikan nama
//    hari dalam Bahasa Indonesia, lalu cetak ketiganya.
//
//    JAWABAN:
enum Hari {
    Senin,   // 0
    Selasa,  // 1
    Rabu,    // 2
}

function namaHari(h: Hari): string {
    switch (h) {
        case Hari.Senin:
            return "Senin";
        case Hari.Selasa:
            return "Selasa";
        default:
            return "Rabu";
    }
}

console.log(namaHari(Hari.Senin));   // Senin
console.log(namaHari(Hari.Selasa));  // Selasa
console.log(namaHari(Hari.Rabu));    // Rabu

// 2. Ulangi soal 1 dengan enum STRING Hari2 { Senin = "SENIN", ... }
//    — tanpa switch, langsung console.log nilainya. Rasakan bedanya:
//    nilai enum string sudah terbaca tanpa perlu function penerjemah.
//
//    JAWABAN:
enum Hari2 {
    Senin  = "SENIN",
    Selasa = "SELASA",
    Rabu   = "RABU",
}

console.log(Hari2.Senin);   // SENIN  ← langsung terbaca (ini intinya!)
console.log(Hari2.Selasa);  // SELASA
console.log(Hari2.Rabu);    // RABU

// 3. Eksperimen error: uncomment `const aneh: Gender = 99;` di
//    sub-section (2), jalankan `npx tsc --noEmit`, baca errornya —
//    lalu comment-kan kembali. Pertanyaan: kenapa 99 ditolak
//    padahal Gender cuma berisi angka?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/13_enum.tsx:68:7
//    error TS2322: Type '99' is not assignable to type 'Gender'.
//    ---------------------------------------------------------------
//    Karena enum = daftar TERTUTUP: Gender hanya menerima anggota
//    yang terdaftar (Male/0 dan Female/1). Angka 99 tidak ada dalam
//    daftar — meskipun tipenya number, nilainya bukan anggota enum.
//    Ini penjaga yang sama seperti Dart: tidak bisa mengarang
//    nilai enum dari luar daftar.
