// ========================================
// TIPE DATA ANY
// ========================================
// (PDF "TypeScript Dasar" hlm. 43-45: Tipe Data Any)
// Materi sebelumnya: file 2 (primitif), file 3-5 (array family).
// Menyusul: Union Type (file 7).


// ------------------------------------------------------------------
// (1) ANY = TOMBOL OFF UNTUK TYPE CHECKING
//
// Pesan utama PDF: IDEALNYA semua data punya deklarasi tipe. Any hanya
// untuk kasus khusus — saat kita memang ingin data bebas seperti di
// JavaScript polos. Akibatnya: TypeScript TIDAK mengecek apa pun
// terhadap data bertipe any.
//
// Jika di Dart seperti ini:  dynamic data = 'halo';
// di TypeScript jadi seperti ini:  let data: any = "halo";
//
// PERBEDAAN NYATA yang harus diingat:
// - Dart dynamic: type-check runtime TETAP jalan — salah method = crash.
// - TS any: type-check compile MATI TOTAL — salah method pun compiler
//   diam. Bahkan IDE autocomplete-nya ikut hilang (compiler tidak tahu
//   tipenya, jadi tidak bisa mengusulkan method apa pun).
// Analogi: dynamic = satpam yang lengah (masih bisa menangkap);
//          any       = satpam yang dipulangkan (siapa pun lewat).
// ------------------------------------------------------------------

let data: any = "halo";
console.log(data); // halo

data = 42;              // ganti jadi number — dibiarkan
data = true;            // ganti jadi boolean — dibiarkan
data = [1, 2, 3];       // ganti jadi array — dibiarkan
console.log(data); // [ 1, 2, 3 ]
console.log(data.length); // 3   (kebetulan benar — tapi compiler tidak membantu memastikan)


// ------------------------------------------------------------------
// (2) BAHAYANYA: SALAH PUN DIAM-DIAM DILEWATKAN
//
// Ingat file 1: '$nama' tanpa kurung kurawal juga diam-diam salah.
// Any membuat kelas kesalahan seperti itu MELUAS ke semua operasi.
//
// Dua baris di bawah TIDAK dilaporkan `npx tsc --noEmit` — padahal
// keduanya salah. (Karena itu ditulis ter-comment di sini: saat
// dijalankan pun hasilnya rusak — NaN, bukan angka.)
//
// data.apaSajaYangTidakAda();
// ❌ TIDAK error di tsc! Baris ini di-uncomment pun tsc diam —
//    compiler tidak mengecek any. Saat dijalankan: undefined/crash.
//
// const angka: any = "delapan";
// console.log(angka * 2);
// ❌ TIDAK error di tsc! Saat dijalankan hasilnya NaN
//    ("delapan" * 2 = NaN — operasi angka pada string yang bukan angka).
//
// Inilah alasan PDF menegaskan any hanya untuk kasus khusus:
// seluruh manfaat TypeScript (jaminan tipe) hangus di variabel itu.
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// (3) ANY MENULAR LEWAT INFERENCE
//
// File 2: inference = TS menebak tipe dari nilai awal.
// Masalahnya: kalau nilai awalnya any, hasil tebakannya ikut any —
// "penularan" ini sering tanpa sengaja.
// ------------------------------------------------------------------

let tertular = data;      // tidak ada ": any", tapi nilai awalnya any...
console.log(typeof tertular); // object   (array termasuk object — pengecekan runtime)
// tertular sekarang bertipe any juga → bebas diubah ke tipe apa pun
// tanpa protes. Satu any bisa merambat ke banyak variabel.

// Perhatikan bedanya dengan primitif biasa (file 2):
let aman = 20;            // inference → number (bukan any)
// aman = "dua puluh";
// ❌ ERROR kalau di-uncomment — TS2322 (ingat file 2). Inference dari
//    nilai BERTIPE tetap ketat; yang menular hanya any.


// ------------------------------------------------------------------
// (4) STRICT MELARANG ANY IMPLISIT — HARUS TULIS EKSPLISIT
//
// Function dengan parameter TANPA tipe akan ditolak oleh mode strict
// (setelan project ini — lihat tsconfig.json "strict": true):
//
// function tanpaTipe(param) { return param; }
// ❌ ERROR kalau di-uncomment:
//    error TS7006: Parameter 'param' implicitly has an 'any' type.
//
// Artinya: TypeScript tidak mau KITA lupa memberi tipe — kalau
// memang mau any, tulis eksplisit `param: any` (jujur dan terlihat).
// Ini kebalikan dari `dynamic` Dart yang juga harus eksplisit —
// bagian ini rasanya sama.
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// (5) KAPAN BOLEH PAKAI ANY (+ ALTERNATIFNYA SEKILAS)
//
// Wajar menurut praktik umum (sebut "tahu ada saja" cukup):
// - Migrasi JavaScript lama → sementara pakai any sebelum tipenya rapi.
// - Library pihak ketiga yang tidak menyediakan definisi tipe.
// - Hasil JSON.parse() yang bentuknya belum pasti.
//
// Alternatif yang lebih aman (cukup tahu dulu, belum dibahas):
// - unknown  : mirip any (bebas menampung apa pun) tapi TIDAK bisa
//              dipakai sebelum dicek tipenya — menyusul di materi lanjutan.
// - Union    : menampung beberapa tipe PILIHAN — menyusul di file 7.
//
// Analogi kasir (mocca POS): any = tombol "buka laci kasir tanpa
// password" — cepat, tapi siapa pun bisa ambil; tipe biasa = akses
// dengan PIN, ribet sedikit tapi aman.
// ------------------------------------------------------------------

const hasilParse: any = JSON.parse('{"nama": "Fauzi", "umur": 25}');
console.log(hasilParse.nama);  // Fauzi   (pakai any: langsung akses, tanpa jaminan)
console.log(hasilParse.umur);  // 25


// ========================================
// RANGKUMAN
// ========================================
// 1. Dart dynamic → TS any. BEDANYA: dynamic masih dicek runtime,
//    any mematikan pengecekan total — salah method pun tsc diam.
// 2. Any bebas ganti-ganti tipe; tapi IDE autocomplete ikut hilang.
// 3. Any MENULAR lewat inference (let x = nilaiAny → x ikut any).
//    Satu any bisa merembet ke banyak variabel — waspadai.
// 4. Mode strict melarang any IMPLISIT (TS7006): parameter tanpa tipe
//    ditolak — mau any harus tulis eksplisit ": any".
// 5. Any hanya untuk kasus khusus: migrasi JS, library tanpa tipe,
//    JSON.parse. Alternatifnya (nanti): unknown (lebih aman),
//    union type (file 7).
//
// Cara menjalankan file ini:  npx tsx src/6_any.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat variabel misteri: any, isi "belajar", cetak. Ganti isinya
//    jadi 2026, cetak lagi. Perhatikan tidak ada error sama sekali.
//
//    JAWABAN:
let misteri: any = "belajar";
console.log(misteri); // belajar
misteri = 2026;
console.log(misteri); // 2026

// 2. Buktikan bahayanya: buat teks: any = "delapan", lalu cetak
//    teks * 2. Cek dengan mata: hasilnya NaN, dan `npx tsc --noEmit`
//    TIDAK melaporkan apa-apa.
//
//    JAWABAN:
const teks: any = "delapan";
console.log(teks * 2); // NaN   ← "delapan" bukan angka; any membuat tsc tidak mencegah

// 3. Eksperimen TS7006: uncomment function `tanpaTipe` di sub-section
//    (4), jalankan `npx tsc --noEmit`, baca errornya, lalu comment-kan
//    kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/6_any.tsx:89:20
//    error TS7006: Parameter 'param' implicitly has an 'any' type.
//    ---------------------------------------------------------------
//    Artinya: strict menolak any yang "diam-diam" (parameter tanpa
//    tipe). Solusinya dua: beri tipe sungguhan (param: string) atau
//    tulis jujur (param: any). Dalam project ini: pilih yang pertama.
