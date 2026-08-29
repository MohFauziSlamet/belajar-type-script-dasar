// ========================================
// FUNCTION INTERFACES
// ========================================
// (PDF "TypeScript Dasar" hlm. 79-81: Function Interface,
//  Kode : Function Interface)
// Materi sebelumnya: file 15-16 (interface, readonly properties).


// ------------------------------------------------------------------
// (1) FUNCTION DALAM BENTUK INTERFACE — CALL SIGNATURE
//
// PDF hlm. 80: kita bisa membuat deklarasi Function dalam bentuk
// Interface — sehingga variabel berisi function tinggal memakai
// interface tersebut. Bentuknya beda dengan interface object
// (file 15): TIDAK ada nama attribute — langsung kurung parameter,
// titik dua, return type:
//
//     interface SapaFn {
//         (nama: string, gelar?: string): string;   ← call signature
//     }
//
// Jika di Dart seperti ini:
//     typedef SapaFn = String Function(String nama, [String? gelar]);
// di TypeScript jadi seperti ini: interface dengan call signature
// — dua-duanya memberi NAMA pada "bentuk function" (parameter apa,
// return apa) supaya bisa dipakai berulang. Dart menyebutnya
// typedef, TS menyebutnya function interface.
// ------------------------------------------------------------------

interface SapaFn {
    (nama: string, gelar?: string): string;
}

const sapa: SapaFn = (nama, gelar) =>
    gelar ? `Halo ${gelar}. ${nama}` : `Halo ${nama}`;

console.log(sapa("Fauzi"));        // Halo Fauzi
console.log(sapa("Fauzi", "Mas")); // Halo Mas. Fauzi


// ------------------------------------------------------------------
// (2) MENGISI VARIABEL — TIGA KEMUDAHAN YANG PERLU DICEK
//
// KEKUATAN pertama: saat mengisi, ANOTASI TIPE PARAMETER TIDAK
// PERLU DITULIS — compiler membacanya dari interface (bandingkan
// file 1: function biasa wajib anotasi!). Nama parameter juga
// bebas beda — yang dicek URUTAN dan TIPE-nya.
//
// PERBEDAAN NYATA (hasil verifikasi dart analyze): di Dart, lambda
// yang di-assign ke typedef dengan optional param WAJIB menandai
// kurung siku eksplisit:
//     SapaFn a = (nama, [gelar]) => ...;   ← [gelar] wajib di Dart
// Tanpa itu Dart menolak: "A value of type 'String Function(String,
// String?)' can't be assigned to a variable of type 'SapaFn'"
// — karena lambda-nya dianggap punya param WAJIB, padahal typedef
// mau OPTIONAL. Di TypeScript TIDAK ada drama ini: tanda ? di
// interface otomatis berlaku untuk lambda apa pun yang cocok.
// ------------------------------------------------------------------

const sapa2: SapaFn = (n, g) => (g ? `Hai ${g}. ${n}` : `Hai ${n}`);
console.log(sapa2("Azka"));   // Hai Azka   ← nama param beda, sah

// Function declaration biasa juga bisa diisi:
function sapaBiasa(nama: string, gelar?: string): string {
    return gelar ? `Halo ${gelar}. ${nama}` : `Halo ${nama}`;
}
const sapa3: SapaFn = sapaBiasa;
console.log(sapa3("Budi", "Pak"));   // Halo Pak. Budi


// ------------------------------------------------------------------
// (3) PEMANGGILAN LEWAT VARIABEL — DIJAGA PERSIS FUNCTION BIASA
//
// Setelah bertipe SapaFn, variabel dipanggil seperti function —
// dan jumlah/tipe argumen dijaga penuh.
// ------------------------------------------------------------------

// sapa();
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 1-2 arguments, but got 0.
//    (perhatikan bentuknya "1-2" — karena gelar optional. Bandingkan
//    file 14: parameter wajib menghasilkan "Expected 1 arguments")

// sapa(123);
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'number' is not assignable to
//    parameter of type 'string'.


// ------------------------------------------------------------------
// (4) PENJAGA PENGISIAN — TS2322 DALAM EMPAT BENTUK
//
// Semua salah isi ditolak dengan TS2322 — tapi kalimatnya beda-beda
// dan semuanya informatif:
// ------------------------------------------------------------------

// const bukanFn: SapaFn = "halo";
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'SapaFn'.
//    (pengisinya harus FUNCTION, bukan string)

// const salahReturn: SapaFn = (nama) => nama.length;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (nama.length adalah number — interface minta return string)

// const salahTipe: SapaFn = (nama: number) => "x";
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '(nama: number) => string' is not assignable
//    to type 'SapaFn'.
//      Types of parameters 'nama' and 'nama' are incompatible.
//        Type 'string' is not assignable to type 'number'.
//    (menulis anotasi yang BERTENTANGAN dengan interface — pesannya
//    bertingkat sampai ke akar masalahnya)

// const lebihParam: SapaFn = (nama: string, gelar: string, ekstra: string) => "x";
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '(nama: string, gelar: string, ekstra: string)
//    => string' is not assignable to type 'SapaFn'.
//      Target signature provides too few arguments. Expected 3 or
//      more, but got 2.
//    (implementasi BUTUH 3 argumen, tapi interface hanya menyediakan
//    2 — pemanggil lewat SapaFn tidak akan pernah mengirim yang ke-3)


// ------------------------------------------------------------------
// (5) KEBOLEHAN KHUSUS: PARAMETER LEBIH SEDIKIT — BEDA DENGAN DART
//
// KEBALIKAN kasus di atas justru BOLEH: implementasi dengan
// parameter LEBIH SEDIKIT dari interface diterima:
//
//     const sapa4: SapaFn = (nama) => `Halo ${nama}`;   ← ✅
//
// Logikanya: interface menjanjikan pemanggil mengirim (nama, gelar?).
// Implementasi yang hanya membaca `nama` tetap AMAN — argumen kedua
// tinggal diabaikan. Bahayanya cuma kalau implementasi BUTUH sesuatu
// yang mungkin tidak dikirim (kasus lebih banyak di sub-section 4).
//
// PERBEDAAN NYATA (hasil verifikasi dart analyze): Dart MENOLAK
// arah ini — "A value of type 'String Function(String)' can't be
// assigned to a variable of type 'SapaFn'". Developer Dart yang
// hafal aturan typedef akan terkejut: di TS longgar, di Dart ketat.
//
// Bonus: type alias (kenalan dari file 9) juga bisa mendeklarasikan
// BENTUK FUNCTION — dengan panah (bentuk baru, diperkenalkan di sini).
// Dua bentuk ini saling mengisi karena bentuknya sama
// (structural typing, file 15):
// ------------------------------------------------------------------

const sapa4: SapaFn = (nama) => `Halo ${nama}`;
console.log(sapa4("Cici"));   // Halo Cici   ← param gelar diabaikan

type SapaType = (nama: string, gelar?: string) => string;

const sapa5: SapaType = (n, g) => (g ? `Yo ${g} ${n}` : `Yo ${n}`);
console.log(sapa5("Dedi"));   // Yo Dedi

const sapa6: SapaFn = sapa5;  // ✅ bentuk sama → saling mengisi
console.log(sapa6("Eka", "Bu"));   // Yo Bu Eka


// ========================================
// RANGKUMAN
// ========================================
// 1. Function interface = memberi NAMA pada bentuk function
//    (parameter + return) — ≈ typedef Dart. Bentuknya: interface
//    TANPA nama attribute, langsung (param): return.
// 2. Saat mengisi variabel: anotasi tipe parameter TIDAK perlu —
//    dibaca dari interface (kebalikan function biasa, file 1).
//    Nama parameter juga bebas beda; yang dicek urutan + tipe.
// 3. PERBEDAAN NYATA: Dart wajib menandai optional di lambda
//    ([gelar]), TS tidak perlu — tanda ? di interface berlaku
//    otomatis (terverifikasi dart analyze).
// 4. Pemanggilan dijaga penuh: jumlah salah → TS2554 (bentuk
//    "Expected 1-2" karena ada optional), tipe salah → TS2345.
// 5. Pengisian salah → TS2322 empat varian: non-function, salah
//    return, salah tipe param (pesan bertingkat), param terlalu
//    banyak ("Target signature provides too few arguments").
// 6. Param LEBIH SEDIKIT justru BOLEH (argumen berlebih diabaikan)
//    — PERBEDAAN NYATA: Dart menolak arah ini.
// 7. `type SapaType = (nama: string, gelar?: string) => string` —
//    bentuk type alias dengan panah; saling mengisi dengan interface
//    bentuk sama (structural typing, file 15).
//
// Cara menjalankan file ini:  npx tsx src/17_function_interfaces.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface HitungDiskon { (harga: number, persen: number):
//    number }. Isi dengan arrow function yang menghitung harga
//    setelah diskon. Cetak: 100000 diskon 10.
//
//    JAWABAN:
interface HitungDiskon {
    (harga: number, persen: number): number;
}

const hitungDiskon: HitungDiskon = (harga, persen) =>
    harga - (harga * persen) / 100;

console.log(hitungDiskon(100000, 10));  // 90000

// 2. Ramal dulu, baru cek: apakah `const tampil: SapaFn = (nama) =>
//    nama.toUpperCase();` error? Kalau tidak, kenapa? Dan apa yang
//    terjadi jika hal yang sama dicoba di Dart?
//
//    JAWABAN:
const tampil: SapaFn = (nama) => nama.toUpperCase();
console.log(tampil("fauzi"));   // FAUZI  ← tidak error
// Tidak error karena implementasi ber-parameter lebih SEDIKIT
// diterima (sub-section 5): interface menjanjikan (nama, gelar?),
// implementasi cukup baca nama dan abaikan sisanya — aman.
// Di Dart: DITOLAK — "A value of type 'String Function(String)'
// can't be assigned to a variable of type 'SapaFn'" (terverifikasi
// dart analyze). Ini salah satu tempat TS lebih longgar dari Dart.

// 3. Eksperimen error: uncomment `sapa();` di sub-section (3),
//    jalankan `npx tsc --noEmit`, baca — lalu comment-kan kembali.
//    Pertanyaan: kenapa pesannya "Expected 1-2 arguments" padahal
//    interface punya 2 parameter?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/17_function_interfaces.tsx:78:1
//    error TS2554: Expected 1-2 arguments, but got 0.
//    ---------------------------------------------------------------
//    Karena parameter kedua OPTIONAL (gelar?: string — file 12),
//    pemanggil yang sah boleh mengirim 1 ATAU 2 argumen. Compiler
//    merangkumnya sebagai "1-2". Ini versi function-interface dari
//    aturan yang sama dengan file 14: tanda ? membuat slot boleh
//    kosong. (0 argumen tetap salah — `nama` wajib.)
