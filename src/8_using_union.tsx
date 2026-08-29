// ========================================
// MENGGUNAKAN UNION TYPE (TYPEOF / NARROWING)
// ========================================
// (PDF "TypeScript Dasar" hlm. 49-50: Menggunakan Union Type)
// Materi sebelumnya: file 7 (Union Type + larangan TS2339/TS2365).
// File ini kuncinya: cara MEMBUKA larangan tersebut.
//
// CATATAN: file ini memakai if — kontrol alur lengkap (if/else,
// switch, loop) menyusul di Bagian 5. Bentuk if-nya SAMA PERSIS
// dengan Dart, jadi tidak ada yang baru selain isinya.


// ------------------------------------------------------------------
// (1) MASALAH DARI FILE 7 — DAN KUNCINYA
//
// File 7: method milik satu anggota union dilarang (TS2339) karena
// compiler belum tahu isinya apa. PDF hlm. 49: sebelum memanggil
// method terhadap union, LAKUKAN PENGECEKAN TIPE dulu dengan typeof.
// Setelah dicek, TypeScript otomatis MENYEMPITKAN tipe variabel di
// dalam blok cek — istilah resminya type narrowing.
//
// Analogi: union = kotak misteri (isi kaos ATAU topi). `typeof`
// = membuka kotak dan lihat isinya — setelah dilihat, kamu TAHU
// apa isinya dan boleh memakainya dengan benar.
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// (2) typeof — CEK TIPE SAAT PROGRAM BERJALAN
//
// Jika di Dart seperti ini:
//     if (data is String) { ... }            ← keyword is
//     print(data.runtimeType);               ← tipe sebagai object
// di TypeScript jadi seperti ini:
//     if (typeof data === "string") { ... }  ← typeof + banding teks
//
// `typeof x` menghasilkan TEKS (string), lalu dibandingkan dengan
// "string", "number", "boolean", dst. Nilai yang relevan di kelas
// dasar ini: "string", "number", "boolean", "undefined", "object"
// (array termasuk "object" — ingat file 6), "function".
// ------------------------------------------------------------------

const sampel: string | number = "halo";
console.log(typeof sampel); // string   (hasilnya teks, bisa dicetak)
console.log(typeof 42);     // number
console.log(typeof [1, 2]); // object   (array dilaporkan "object", bukan "array"!)


// ------------------------------------------------------------------
// (3) NARROWING: DI DALAM BLOK CEK, LARANGAN TERBUKA
//
// Di dalam `if (typeof v === "string")`, TypeScript SUDAH PASTI v
// string → method string boleh. Sama seperti Dart: di dalam
// `if (v is String)`, v otomatis diperlakukan String.
// ------------------------------------------------------------------

function prosesPesanan(id: string | number): string {
    if (typeof id === "string") {
        // di sini id PASTI string → method string terbuka
        return `Kode: ${id.toUpperCase()}`;
    }
    // di sini id PASTI number (sisa daftar union) → operasi angka terbuka
    return `Nomor: ${id + 1}`;
}

console.log(prosesPesanan("a-001")); // Kode: A-001
console.log(prosesPesanan(99));      // Nomor: 100


// ------------------------------------------------------------------
// (4) SETELAH CEK, OPERASI ANTAR UNION JUGA TERBUKA
//
// File 7: `+` antar dua union dilarang (TS2365) — janji file 7
// ditepati di sini: cek tipenya dulu, jumlahkan setelah pasti number.
// (Cek juga dipakai untuk ELEMEN array union — elemen dibandingkan
// satu per satu sebelum dipakai.)
// ------------------------------------------------------------------

const keranjang: (string | number)[] = ["Kopi Susu", 18000, "Es Teh", 8000];

if (typeof keranjang[1] === "number" && typeof keranjang[3] === "number") {
    const total = keranjang[1] + keranjang[3]; // ✅ keduanya sudah pasti number
    console.log(total); // 26000
}

// CATATAN: `&&` (AND) sama seperti Dart — kedua syarat harus benar.


// ------------------------------------------------------------------
// (5) DUA JEBAKAN YANG WAJIB DIINGAT
//
// JEBAKAN 1 — kebiasaan orang Dart: "int" TIDAK ADA.
// Jika di Dart seperti ini:  if (v is int) { ... }   ← sah di Dart
// di TypeScript, `typeof v === "int"` itu SALAH — nilai "int" tidak
// ada di daftar typeof (angka di TS namanya "number", ingat file 2).
//
// JEBAKAN 2 — narrowing hanya BERLAKU DI DALAM blok cek.
// Keluar blok, variabel kembali menjadi union penuh → larangan file 7
// berlaku lagi.
// ------------------------------------------------------------------

// JEBAKAN 1:
// function salah(v: string | number) {
//     if (typeof v === "int") {
//         return v;
//     }
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2367: This comparison appears to be unintentional
//    because the types '"string" | "number" | "bigint" | "boolean" |
//    "symbol" | "undefined" | "object" | "function"' and '"int"'
//    have no overlap.
//    (compiler bahkan menampilkan daftar nilai typeof yang sah —
//    "int" tidak ada di dalamnya. Angka di TS = "number".)

// JEBAKAN 2:
// function diLuarBlok(v: string | number) {
//     if (typeof v === "string") {
//         console.log(v.length);   // ✅ di dalam blok: v pasti string
//     }
//     return v.toUpperCase();      // ❌ baris INI error kalau di-uncomment
// }
// error TS2339: Property 'toUpperCase' does not exist on type
// 'string | number'.  (di luar blok if, v kembali union — bisa string
// atau number, jadi method string dilarang lagi)


// ========================================
// RANGKUMAN
// ========================================
// 1. Sebelum pakai method/operasi pada union: CEK DULU dengan
//    typeof. Setelah cek, TypeScript menyempitkan tipe (narrowing)
//    dan larangan TS2339/TS2365 terbuka.
// 2. Dart `if (v is String)` → TS `if (typeof v === "string")`.
//    Hasil typeof itu TEKS: "string" / "number" / "boolean" /
//    "undefined" / "object" / "function" (array = "object").
// 3. Di blok else / setelah blok if yang return, TS otomatis tahu
//    SISA anggota union (di luar if string → pasti number).
// 4. Narrowing berlaku juga untuk elemen array union — cek
//    `typeof keranjang[i] === "number"` sebelum menjumlahkan.
// 5. JEBAKAN 1: "int" tidak ada (TS2367) — angka di TS "number".
// 6. JEBAKAN 2: narrowing hanya di DALAM blok cek — keluar blok,
//    variabel kembali union penuh.
//
// Cara menjalankan file ini:  npx tsx src/8_using_union.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat function deskripsi(berat: string | number): string —
//    kalau number kembalikan `Berat: <angka> gram`, kalau string
//    kembalikan `Perkiraan: <TEKS KAPITAL>`.
//
//    JAWABAN:
function deskripsi(berat: string | number): string {
    if (typeof berat === "number") {
        return `Berat: ${berat} gram`;
    }
    return `Perkiraan: ${berat.toUpperCase()}`;
}
console.log(deskripsi(250));      // Berat: 250 gram
console.log(deskripsi("sedang")); // Perkiraan: SEDANG

// 2. Kasus kasir: buat totalDuaItem(a: number | string, b: number |
//    string): number yang mengembalikan jumlah KEDUANYA sebagai
//    angka. Kalau ada yang string, anggap nilainya 0.
//
//    JAWABAN:
function totalDuaItem(a: number | string, b: number | string): number {
    const nilaiA = typeof a === "number" ? a : 0;   // ternary ≈ Dart
    const nilaiB = typeof b === "number" ? b : 0;
    return nilaiA + nilaiB;
}
console.log(totalDuaItem(18000, 8000)); // 26000
console.log(totalDuaItem("promo", 5000)); // 5000   ("promo" dihitung 0)

// 3. Eksperimen TS2367: uncomment function `salah` di sub-section
//    (5), jalankan `npx tsc --noEmit`, baca pesan errornya — perha-
//    tikan compiler menampilkan daftar nilai typeof yang sah — lalu
//    comment-kan kembali.
//
//    JAWABAN: inti pesannya:
//    ---------------------------------------------------------------
//    error TS2367: This comparison appears to be unintentional
//    because the types '"string" | "number" | "bigint" | "boolean" |
//    "symbol" | "undefined" | "object" | "function"' and '"int"'
//    have no overlap.
//    ---------------------------------------------------------------
//    Artinya: compiler membandingkan daftar nilai yang MUNGKIN dari
//    typeof dengan yang kita tulis ("int") → tidak ada yang cocok =
//    perbandingan pasti selalu salah. Ini penjaga yang bagus: typo
//    "int"/"str" (kebiasaan dari Dart/Python) ketahuan sebelum
//    program jalan. Ingat file 2: angka di TS selalu "number".
