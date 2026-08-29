// ========================================
// TYPE ALIAS UNTUK UNION TYPE
// ========================================
// (PDF "TypeScript Dasar" hlm. 55-56: Type Alias untuk Union Type)
// Materi sebelumnya: file 7 (union), file 9 (type alias).
// File ini = menggabungkan keduanya: file PENDEK, tapi pola yang
// PALING sering dipakai di dunia nyata TypeScript.


// ------------------------------------------------------------------
// (1) DAFTAR UNION DITULIS SEKALI, DIPAKAI BERKALI-KALI
//
// PDF hlm. 55: "Type Alias juga bisa digunakan untuk membuat
// union type." Masalah yang diselesaikan: daftar union panjang
// yang harus ditulis ulang di tiap tempat (rentan selisih —
// ingat alasan reusable di file 9).
//
//     type ID = string | number;   ← ditulis SEKALI
//     let a: ID = "A-001";         ← dipakai di mana-mana
//     let b: ID = 99;
//
// Jika di Dart seperti ini (typedef, Dart 2.13+):
//     typedef ID = Object;   // (approx — Dart tak punya union)
// di TypeScript jadi seperti ini: persis baris di atas, dan
// jauh lebih berguna karena union-nya betulan ditegakkan compiler.
// ------------------------------------------------------------------

type ID = string | number; // ID = "string atau number"

let idPesanan: ID = "A-001"; // ✅ string, anggota daftar
console.log(idPesanan); // A-001

idPesanan = 99; // ✅ number, juga anggota daftar
console.log(idPesanan); // 99

const daftarId: ID[] = ["A-001", 99, "A-002"]; // array-nya pun bisa (file 3 + 7)
console.log(daftarId); // [ 'A-001', 99, 'A-002' ]


// ------------------------------------------------------------------
// (2) STRING LITERAL UNION — NILAINYA TERBATAS BEBERAPA TEKS PILIHAN
//
// Ini bentuk paling berguna dari materi ini. Tipe bukan lagi
// "string bebas", tapi "HARUS salah satu dari teks berikut":
//
//     type Ukuran = "kecil" | "sedang" | "besar";
//
// Yang paling mendekati di Dart: ENUM.
//     enum Ukuran { kecil, sedang, besar }
//
// PERBEDAAN NYATA yang harus diingat:
// - Dart enum  = betulan object class di runtime (Ukuran.sedang).
// - TS literal = tetap string biasa di runtime ("sedang");
//   pembatasannya CUMA di level tipe (compile-time) — persis
//   pola ReadonlyArray file 4: kunci di compiler, bukan runtime.
// Enum "asli" milik TypeScript sendiri menyusul (hlm. 63-68).
// ------------------------------------------------------------------

type Ukuran = "kecil" | "sedang" | "besar";

const ukuranKaos: Ukuran = "sedang"; // ✅ ada di daftar
console.log(ukuranKaos); // sedang

// Angka juga bisa (number literal union):
type Dadu = 1 | 2 | 3 | 4 | 5 | 6;
const lemparan: Dadu = 4;
console.log(lemparan); // 4


// ------------------------------------------------------------------
// (3) KONTRAK DITEGAKKAN — DAN PESAN ERROR LEBIH RAMAH
//
// Nilai di luar daftar literal ditolak. Bonus yang ditemukan saat
// verifikasi: karena pakai alias, pesan error menampilkan NAMA
// ALIAS-nya (Ukuran) — bukan daftar panjang yang harus kita urai
// sendiri. Semakin banyak union panjang diberi nama, semakin
// mudah error dibaca.
// ------------------------------------------------------------------

// const ukuranSalah: Ukuran = "xxl";
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '"xxl"' is not assignable to type 'Ukuran'.
//    ("xxl" memang string — tapi BUKAN anggota daftar literal.
//    Bandingkan file 9: di sana TS2322 karena beda tipe; di sini
//    tipenya sama-sama string, tapi NILAINYA tidak terdaftar)


// ------------------------------------------------------------------
// (4) SEMUA ANGGOTA STRING → METHOD STRING LANGSUNG BOLEH
//
// Kontras penting dengan file 7: union CAMPUR (string | number)
// melarang method string sebelum dicek typeof (TS2339) — compiler
// tidak bisa menjanjikan tipenya.
// Union yang SEMUA anggotanya string (seperti Ukuran) berbeda:
// apapun pilihannya, pasti string → method string langsung boleh,
// TANPA narrowing. (Kelanjutan narrowing dari file 8 tetap jalan:
// setelah `if (x === "kecil")`, x menyempit jadi literal itu.)
// ------------------------------------------------------------------

let ukuranMenu: Ukuran = "besar";
console.log(ukuranMenu.toUpperCase()); // BESAR   (semua anggota string → aman)
console.log(ukuranMenu.length);        // 5       (length "besar" = 5 huruf)

if (ukuranMenu === "besar") {
    // di dalam sini TypeScript tahu ukuranMenu PASTI "besar"
    console.log(`Porsi ${ukuranMenu} = 2x porsi kecil`); // Porsi besar = 2x porsi kecil
}


// ------------------------------------------------------------------
// (5) POLA DUNIA NYATA — dan preview enum TypeScript
//
// Pola ini (literal union + alias) adalah cara STANDAR TypeScript
// menyatakan "pilihan tetap": status pesanan, tema aplikasi,
// level log, nama hari. Contoh nyata di test lama project ini:
//     type Theme = "light" | "dark" | "auto";
//
// Bonus praktis (perilaku IDE — tahu ada saja): karena compiler
// tahu daftar nilainya, VS Code bisa meng-USULKAN nilai valid
// saat mengetik (autocomplete), dan memberi garis bawah merah
// untuk nilai yang tidak terdaftar — bahkan sebelum menyimpan.
//
// TypeScript juga punya keyword enum sendiri — mirip enum Dart,
// dan justru LEBIH dekat ke enum Dart dibanding literal union ini
// (betulan ada di runtime). Pembahasan lengkap menyusul di materi
// Enum (PDF hlm. 63-68) — sekarang cukup tahu arahnya.
// ------------------------------------------------------------------

type StatusPesanan = "menunggu" | "diproses" | "selesai";

function labelStatus(status: StatusPesanan): string {
    return `Pesanan: ${status.toUpperCase()}`;
}

console.log(labelStatus("menunggu")); // Pesanan: MENUNGGU
console.log(labelStatus("selesai"));  // Pesanan: SELESAI

// labelStatus("batal");
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type '"batal"' is not assignable
//    to parameter of type 'StatusPesanan'.
//    (parameter function pun diperiksa — "batal" tidak terdaftar)


// ========================================
// RANGKUMAN
// ========================================
// 1. Union + alias: type ID = string | number — daftar ditulis
//    sekali, dipakai di variabel/param/return/array berkali-kali.
// 2. STRING LITERAL UNION: type Ukuran = "kecil" | "sedang" |
//    "besar" — nilai TERBATAS pilihan teks. Yang paling mendekati
//    enum Dart; bedanya masih string biasa di runtime (kunci
//    compile-time saja — pola ReadonlyArray file 4).
// 3. Nilai di luar daftar → TS2322, dan pesan error menampilkan
//    NAMA ALIAS (lebih ramah dibaca). Angka literal juga bisa.
// 4. Union yang SEMUA anggotanya string → method string langsung
//    boleh, tanpa typeof (beda dengan union campur file 7).
//    Narrowing === dari file 8 tetap berlaku, bahkan lebih presisi.
// 5. Pola standar TS untuk "pilihan tetap" (status/tema/hari) +
//    bonus autocomplete IDE. Enum asli TS menyusul (hlm. 63-68).
//
// Cara menjalankan file ini:  npx tsx src/10_type_alias_union.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat alias LevelMember = "bronze" | "silver" | "gold", buat
//    variabel member dengan nilai "gold", cetak dengan toUpperCase().
//
//    JAWABAN:
type LevelMember = "bronze" | "silver" | "gold";
const member: LevelMember = "gold";
console.log(member.toUpperCase()); // GOLD

// 2. Buat alias PilihanMenu = 1 | 2 | 3 (nomor menu pakai angka),
//    lalu buat function namaMenu(pilihan: PilihanMenu): string yang
//    mengembalikan nama menu: 1 = "Kopi Susu", 2 = "Es Teh",
//    3 = "Roti Bakar". Petunjuk: pakai if + === (file 8).
//
//    JAWABAN:
type PilihanMenu = 1 | 2 | 3;
function namaMenu(pilihan: PilihanMenu): string {
    if (pilihan === 1) {
        return "Kopi Susu";
    } else if (pilihan === 2) {
        return "Es Teh";
    }
    return "Roti Bakar";
}
console.log(namaMenu(1)); // Kopi Susu
console.log(namaMenu(3)); // Roti Bakar

// 3. Eksperimen TS2322 + nama alias: uncomment baris
//    `const ukuranSalah: Ukuran = "xxl"` di sub-section (3),
//    jalankan `npx tsc --noEmit`, perhatikan pesan errornya
//    menyebut 'Ukuran' (nama alias), lalu comment-kan kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/10_type_alias_union.tsx:80:7
//    error TS2322: Type '"xxl"' is not assignable to type 'Ukuran'.
//    ---------------------------------------------------------------
//    Perhatikan dua hal:
//    - compiler menampilkan nama alias 'Ukuran', bukan daftar
//      "kecil" | "sedang" | "besar" — alasan kuat memberi nama
//      pada union panjang: error lebih pendek dan jelas.
//    - nilainya string, tipenya string — ditolak bukan karena beda
//      tipe, tapi karena NILAINYA tidak terdaftar (ini beda tipis
//      dengan TS2322 di file 2 dan file 9).
