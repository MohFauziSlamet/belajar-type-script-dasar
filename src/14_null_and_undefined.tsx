// ========================================
// NULL DAN UNDEFINED
// ========================================
// (PDF "TypeScript Dasar" hlm. 69-72: Null dan Undefined,
//  Kode: Undefined, Kode: Null)
// Materi sebelumnya: file 12 (optional properties — property
// yang dilewatkan terbaca undefined; janji "pembahasan penuh
// di hlm. 69-72" ditepati di file ini).


// ------------------------------------------------------------------
// (1) DUA JENIS "KOSONG" — DART HANYA PUNYA SATU
//
// PDF hlm. 70: tanda ? memungkinkan mengirim undefined; kadang
// kita juga ingin mengirim null. Jadi TS punya DUA jenis kosong:
//
//   undefined = "BELUM ada nilai"  — muncul OTOMATIS:
//               variabel dideklarasi tanpa nilai, property ? tidak
//               diisi (file 12), parameter tidak dikirim, akses
//               index di luar batas (file 3)
//   null      = "SENGAJA dikosongkan" — harus ditulis eksplisit
//
// Jika di Dart seperti ini: hanya ada null (satu jenis kosong).
// di TypeScript jadi seperti ini: null MASIH ADA, TAPI ditambah
// undefined — warisan JavaScript, dan API JS menghasilkan undefined
// di banyak tempat. PERBEDAAN NYATA: keduanya bahkan tidak
// identik satu sama lain (bukti di sub-section 4).
// ------------------------------------------------------------------

let namaTeman: string | undefined;      // dideklarasi, belum diisi
console.log(namaTeman);                 // undefined   (otomatis)

const temanPindahan: string | null = null;  // sengaja dikosongkan
console.log(temanPindahan);             // null        (eksplisit)


// ------------------------------------------------------------------
// (2) STRICT MODE = "NULL SAFETY"-NYA TYPESCRIPT
//
// Project ini memakai strict: true (≈ null safety Dart yang default
// sejak Dart 2.12). Akibatnya undefined/null TIDAK boleh masuk ke
// tipe biasa — harus di-union-kan dulu, sama seperti String? di Dart:
//
//     let nama: string = undefined;   ❌ (≈ String nama = null; di Dart)
//     let nama: string | undefined;   ✅ (≈ String? nama;          di Dart)
// ------------------------------------------------------------------

let email: string | undefined = "fauzi@mail.com";  // union → boleh
console.log(email);  // fauzi@mail.com

let emailKosong: string | undefined = undefined;   // undefined sah
console.log(emailKosong);  // undefined

// let salah: string = undefined;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'undefined' is not assignable to type 'string'.
//    (string TIDAK terima undefined — union-kan dulu seperti String?)


// ------------------------------------------------------------------
// (3) PARAMETER `?` vs `| null` — INTI MATERI PDF (hlm. 70-72)
//
// Dua cara membuat parameter "boleh kosong", dan KEDUANYA BEDA:
//
//   gelar?: string            → boleh TIDAK DIKIRIM (jadi undefined),
//                                tapi TIDAK menerima null
//   judul: string | null      → WAJIB DIKIRIM, menerima null,
//                                tapi TIDAK menerima undefined
//
// Analogi sederhana: gelar? seperti "kalau tidak hadir, kami
// anggap kosong"; judul | null seperti "titip absen tidak ada —
// Anda WAJIB hadir dan boleh bilang kosong".
// ------------------------------------------------------------------

// Versi undefined (tanda ?):
function sapa(nama: string, gelar?: string): string {
    return `Halo ${gelar ?? ""}${gelar ? " " : ""}${nama}`;
}

console.log(sapa("Fauzi"));            // Halo Fauzi      (gelar kosong)
console.log(sapa("Fauzi", undefined)); // Halo Fauzi      (eksplisit juga sah)
console.log(sapa("Fauzi", "Mas"));     // Halo Mas Fauzi

// Versi null (union):
function setJudul(judul: string | null): string {
    return judul ?? "(tanpa judul)";   // ?? menangkap null DAN undefined
}

console.log(setJudul("Berita Hari Ini"));  // Berita Hari Ini
console.log(setJudul(null));               // (tanpa judul)

// Compiler MENJAGA perbedaan keduanya:

// console.log(sapa("Fauzi", null));
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'null' is not assignable to
//    parameter of type 'string | undefined'.
//    (tanda ? membuat slot "bolong", bukan menerima null — beri
//    nilai atau lewatkan saja)

// console.log(setJudul());
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 1 arguments, but got 0.
//    (parameter `| null` WAJIB dikirim — kalau mau boleh absen,
//    tambahkan ? pada parameternya)

// console.log(setJudul(undefined));
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'undefined' is not assignable
//    to parameter of type 'string | null'.
//    (null ≠ undefined — parameter ini spesifik mau null)


// ------------------------------------------------------------------
// (4) FAKTA UNIK: KEDUANYA "BEDA TAPI SERUPA"
//
// Warisan JavaScript yang perlu diketahui sekali, diingat selamanya:
//   - null == undefined  → true   (loose == menganggap setara)
//   - null === undefined → false  (strict === tahu mereka beda)
//   - typeof null → "object"      (bug JavaScript dari 1995 yang
//                                  dipertahankan demi kompatibilitas!)
//   - typeof undefined → "undefined" (benar, sesuai harapan)
//
// Praktisnya untuk kesehari-harian: ?? dan ?. (file 12) menangkap
// KEDUANYA sekaligus — tidak perlu mikir null atau undefined.
// ------------------------------------------------------------------

console.log(null == undefined);    // true
console.log(null === undefined);   // false
console.log(typeof null);          // object     ← quirk!
console.log(typeof undefined);     // undefined

// ?? menangkap keduanya (dan HANYA keduanya — bukan 0 atau "").
// CATATAN: demonstrasinya lewat function — TS 5.9 menolak
// `null ?? "default"` yang ditulis LANGSUNG dengan error TS2871
// ("This expression is always nullish"): ekspresi yang pasti
// selamanya kosong dianggap kode tanpa makna. Parameter function
// nilainya belum tentu null, jadi sah dan tetap terjamin aman.
function denganDefault(nilai: string | null | undefined): string {
    return nilai ?? "default";
}

console.log(denganDefault(null));       // default
console.log(denganDefault(undefined));  // default
console.log(denganDefault("isi"));      // isi
console.log(denganDefault(""));         // (baris kosong di terminal —
                                        //  string kosong BUKAN nullish,
                                        //  tidak diganti "default")

// ?. juga jalan untuk keduanya — sama persis seperti di Dart:
function ambilAlamat(p: { alamat?: string } | null): string | undefined {
    return p?.alamat;
}

console.log(ambilAlamat(null) ?? "tidak ada");     // tidak ada
console.log(ambilAlamat({ alamat: "Bandung" }));  // Bandung


// ========================================
// RANGKUMAN
// ========================================
// 1. TS punya DUA jenis kosong: undefined = BELUM ada nilai
//    (otomatis: property ? kosong, param tidak dikirim, index luar
//    batas) — null = SENGAJA dikosongkan (eksplisit). Dart hanya
//    punya null; undefined warisan JavaScript.
// 2. strict: true ≈ null safety Dart: string TIDAK terima keduanya
//    (TS2322) — union-kan dulu: string | undefined ≈ String?.
// 3. `gelar?: string` — boleh tidak dikirim; null DITOLAK (TS2345).
// 4. `judul: string | null` — WAJIB dikirim (TS2554 kalau absen);
//    undefined DITOLAK (TS2345). null dan undefined TIDAK saling
//    menggantikan.
// 5. null == undefined → true, tapi === → false. typeof null →
//    "object" (bug 1995 yang dipertahankan). Pakai === selalu.
// 6. ?? dan ?. menangkap KEDUA jenis kosong sekaligus — sama
//    persis seperti di Dart, tinggal pakai.
//
// Cara menjalankan file ini:  npx tsx src/14_null_and_undefined.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Deklarasikan variabel `stok: number | undefined` tanpa mengisi
//    nilainya, cetak — lalu isi 10 dan cetak lagi. Tambahkan
//    variabel `catatan: string | null = null` dan cetak.
//
//    JAWABAN:
let stok: number | undefined;              // belum diisi
console.log(stok);          // undefined
stok = 10;                                  // sekarang diisi
console.log(stok);          // 10
const catatan: string | null = null;        // sengaja kosong
console.log(catatan);       // null

// 2. Buat function formatNama(nama: string | null | undefined): string
//    yang mengembalikan nama dalam huruf besar, atau "TANPA NAMA"
//    kalau kosong (null ATAU undefined — satu ?? cukup!). Uji dengan
//    ketiga keadaan.
//
//    JAWABAN:
function formatNama(nama: string | null | undefined): string {
    return nama?.toUpperCase() ?? "TANPA NAMA";
}
console.log(formatNama("fauzi"));    // FAUZI
console.log(formatNama(null));       // TANPA NAMA
console.log(formatNama(undefined));  // TANPA NAMA

// 3. Eksperimen error: uncomment `console.log(sapa("Fauzi", null));`
//    di sub-section (3), jalankan `npx tsc --noEmit`, baca — lalu
//    comment-kan kembali. Lalu uncomment `console.log(setJudul());`
//    dan ulangi. Pertanyaan: kenapa dua error ini KODE-nya beda
//    (TS2345 vs TS2554)?
//
//    JAWABAN: dua error yang muncul:
//    ---------------------------------------------------------------
//    src/14_null_and_undefined.tsx:94:27
//    error TS2345: Argument of type 'null' is not assignable to
//    parameter of type 'string | undefined'.
//
//    src/14_null_and_undefined.tsx:101:13
//    error TS2554: Expected 1 arguments, but got 0.
//    ---------------------------------------------------------------
//    Bedanya: TS2345 = argumen DIKIRIM tapi TIPE-nya salah
//    (null dikirim, slot ? hanya terima string | undefined).
//    TS2554 = argumen TIDAK DIKIRIM SAMA SEKALI padahal parameter
//    `| null` itu WAJIB (null harus ditulis eksplisit, bukan
//    "tidak hadir"). Itulah bedanya "salah isi" vs "salah absen".
