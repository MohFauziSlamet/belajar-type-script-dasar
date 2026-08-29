// ========================================
// TYPE ASSERTIONS
// ========================================
// (PDF "TypeScript Dasar" hlm. 98-100: Type Assertions, Kode)
// Materi sebelumnya: file 15-21 (seri interface) — ini file
// TERAKHIR Bagian 3. Prasyarat lama: file 6 (any), file 7-8
// (union + typeof). Janji file 21 ditepati: `as` dijelaskan
// baik-baik sekarang.


// ------------------------------------------------------------------
// (1) MASALAH: KITA TAHU TIPENYA, TYPESCRIPT TIDAK TAHU
//
// PDF hlm. 99: kadang kita tahu tipe data yang kita gunakan,
// namun TypeScript tidak tahu — biasanya karena memakai kode
// JavaScript yang nilai kembaliannya any (ingat file 6: any =
// penjaga dimatikan). Solusinya: konversi deklaratif dengan
// kata kunci as — inilah type assertions.
//
// Contoh nyata paling sering: JSON.parse. Ia kode JavaScript —
// hasilnya any. Kita (pembaca data) tahu field nama pasti
// string, tapi compiler tidak:
//
// Jika di Dart seperti ini:
//     import 'dart:convert';
//     final data = jsonDecode('{"nama":"Fauzi"}');  ← dynamic
//     final nama = data['nama'] as String;          ← use-case SAMA
// di TypeScript jadi seperti ini: JSON.parse → any, lalu
// `as string` — kemiripannya tinggi, dua-duanya mengambil data
// "buta" lalu menegaskan tipenya.
// ------------------------------------------------------------------

const data: any = JSON.parse('{"nama":"Fauzi","umur":30}');

console.log(typeof data.nama);   // string  ← runtime-nya string,
                                 // tapi TIPE menurut compiler: any
                                 // (penjaga mati — .apaSaja() lolos)

// data.nama.toUpperCase();      ← tanpa as pun TIDAK error (any!)
// Tapi setelah di-as, penjaga NYALA LAGI di variabel hasilnya:

const nama: string = data.nama as string;   // ← type assertion
console.log(nama.toUpperCase());   // FAUZI

const umur: number = data.umur as number;
console.log(umur + 1);             // 31   ← sebagai number penuh


// ------------------------------------------------------------------
// (2) PERBEDAAN NYATA: AS = JANJI, BUKAN PEMERIKSAAN
//
// Kesadaran paling penting file ini: as TIDAK mengubah nilai dan
// TIDAK memeriksa apa pun saat program berjalan. Ia cuma surat
// pernyataan ke compiler: "percayai saya, ini string" — compiler
// menurut, titik.
//
// Bukti: nilai "123" kita paksa klaim number (lewat pintu darurat
// as unknown as — dijelaskan di sub-section 3). Compile lolos,
// program jalan... dan typeof tetap mengatakan string:
//
// Jika di Dart seperti ini:
//     Object x = '123';
//     final n = x as int;    ← as Dart MEMERIKSA saat jalan
// di TypeScript jadi seperti ini: as TIDAK memeriksa. Hasil
// verifikasi dua-duanya:
//     Dart  : RUNTIME ERROR  "type 'String' is not a subtype of
//             type 'int' in type cast"  ← langsung ketahuan
//     TS    : diam-diam lolos — sampai method number dipanggil:
//             "TypeError: bohong.toFixed is not a function"
//
// Analogi: as Dart seperti satpam yang mencocokkan ID kamu di
// gerbang (salah → ditolak di tempat). as TypeScript seperti
// tanda tangan di buku tamu: tidak ada yang mengecek — kalau
// kamu berbohong, ketahuannya belakangan, di dalam.
//
// (Kalau butuh KONVERSI nilai yang sungguhan, JavaScript punya
// function-nya: Number("123") → 123. Itu konversi beneran —
// berbeda dari as yang cuma mengganti label tipe.)
// ------------------------------------------------------------------

const bohong = "123" as unknown as number;   // paksaan — lihat (3)
console.log(typeof bohong);   // string   ← nilai TIDAK berubah!

// console.log(bohong.toFixed(2));
// ❌ RUNTIME ERROR kalau di-uncomment (compiler TIDAK menangkap —
//    kita sudah "menandatangani suratnya"):
//    TypeError: bohong.toFixed is not a function
//    (nilai aslinya string — tidak punya toFixed. TS diam,
//    JavaScript kena getahnya)

console.log(Number("123"));   // 123  ← konversi sungguhan, bukan as


// ------------------------------------------------------------------
// (3) PENJAGA TS2352 — DAN PINTU DARURAT as unknown as
//
// Compiler tidak sesabar itu: as antara dua tipe yang TIDAK
// berkerabat ditolak dengan TS2352. Pesannya jujur dua kalimat —
// termasuk mengakui pintu daruratnya sendiri:
// ------------------------------------------------------------------

// const salah: number = "123" as number;
// ❌ ERROR kalau di-uncomment:
//    error TS2352: Conversion of type 'string' to type 'number'
//    may be a mistake because neither type sufficiently overlaps
//    with the other. If this was intentional, convert the
//    expression to 'unknown' first.
//    (string dan number tidak berkerabat — compiler menolak
//    menerima janjinya. Arah lain pun sama: 5 as string → TS2352,
//    "x" as boolean → TS2352, "halo" as string[] → TS2352)

// PINTU DARURAT yang diakui pesan itu: lewati unknown dulu —
// const bohong = "123" as unknown as number;   ← sub-section (2)
// unknown = "boleh apa saja, TAPI tidak boleh dipakai sebelum
// dicek" — kebalikan any. as unknown as berarti: "ya ya, saya
// paham risikonya, paksa saja". Berguna tapi berbahaya —
// contoh bohong di atas adalah akibatnya: compile hijau,
// program merah.

// Yang menipu: object BERKERABAT boleh di-as meski property-nya
// kurang — dan hasilnya membaca property yang tidak ada:
const kurang = { nama: "x" } as { nama: string; umur: number };
console.log(kurang.nama);   // x      ← ada
console.log(kurang.umur);   // undefined ← TIDAK ada! as bisa
                            // "berbohong" tentang property —
                            // compiler percaya, runtime kosong


// ------------------------------------------------------------------
// (4) MENYEMPITKAN UNION & LITERAL — TAPI typeof LEBIH AMAN
//
// as juga bisa menyempitkan union (file 7) tanpa pengecekan,
// atau menyempitkan string jadi literal union (file 10). Sah —
// karena string dan anggota-anggotanya berkerabat (bukan TS2352).
// TAPI untuk union, ingat file 8: typeof MENGECEK NILAI NYATA —
// jauh lebih aman. Prioritas: kalau bisa typeof, JANGAN as.
// as hanya untuk saat compiler sungguh-sungguh tidak bisa tahu
// (nilai any dari JavaScript — kasus sub-section 1).
// ------------------------------------------------------------------

let id: string | number = "A-001";
const idPasti = id as string;          // menyempit union — sah
console.log(idPasti.toUpperCase());    // A-001

let ukuran: string = "xl";
const u = ukuran as "xl" | "lg";       // literal union (file 10)
console.log(u);                        // xl

// Bandingkan: typeof (file 8) membuktikan lewat NILAI NYATA —
// kalau id ternyata number, versi typeof tetap aman, versi as
// akan meledak di method string-nya.


// ------------------------------------------------------------------
// (5) SINTAKS LAMA <string> — DAN ETIKA PENGGUNAAN as
//
// Banyak artikel lama menulis assertion dengan kurung sudut:
//     const x = <string>nilai;
// Di file biasa (.ts) itu sah — tapi di file .tsx (project ini!
// ekstensi semua file kita) kurung sudut dibaca sebagai JSX
// (tag React) sehingga error berantai (tipikal TS17008).
// Kesimpulan praktis: selalu tulis as.
//
// ETIKA — kapan as itu wajar:
//   ✅ nilai any dari JavaScript (JSON.parse, library lama,
//      response dinamis) — kasus yang PDF maksud
//   ❌ menembak penjaga yang bekerja (ganti TS2352 jadi unknown-as,
//      "mematikan" union padahal bisa typeof) — itu menandatangani
//      surat palsu: compile hijau, program merah
// Aturan satu kalimat: as = pengakuan "compiler tidak mungkin
// tahu, tapi SAYA tahu" — bukan "saya malas mengecek".
// ------------------------------------------------------------------

// const coba = <string>data;
// ❌ ERROR kalau di-uncomment (di file .tsx!) — error PERTAMA
//    selalu ini, tepat di barisnya:
//    error TS17008: JSX element 'string' has no corresponding
//    closing tag.
//    lalu BERANTAI ke bawah dengan bentuk yang BERVARIASI
//    (TS1005 / TS1381 / ... — tergantung isi baris di bawahnya):
//    parser menganggap <string> tag JSX yang belum ditutup dan
//    "menelan" baris-baris berikutnya sampai ke ujung file.
//    (Intinya satu: kurung sudut tidak bisa dipakai di .tsx —
//    project ini selalu menulis as)


// ========================================
// RANGKUMAN
// ========================================
// 1. Type assertion = konversi DEKLARATIF dengan as (PDF hlm. 99):
//    untuk situasi KITA tahu tipenya, compiler tidak — biasanya
//    nilai any dari kode JavaScript (contoh: JSON.parse).
//    ≈ jsonDecode + as String di Dart (use-case sama).
// 2. PERBEDAAN NYATA: as Dart MEMERIKSA runtime — salah tipe
//    melempar "type 'String' is not a subtype of type 'int' in
//    type cast". as TS TIDAK memeriksa apa pun: nilai tetap utuh
//    (typeof bohong tetap 'string'), dan baru meledak sebagai
//    TypeError saat method yang tidak ada dipanggil.
// 3. Konversi nilai sungguhan bukan urusan as — Number("123")
//    → 123 itu konversi beneran; as cuma mengganti label tipe.
// 4. Tipe tak berkerabat ditolak: TS2352 "may be a mistake because
//    neither type sufficiently overlaps" (2 kalimat, termasuk
//    saran unknown). Pintu darurat as unknown as memaksa lolos —
//    berguna tapi berbahaya (compile hijau, program merah).
// 5. Object berkerabat bisa di-as meski property kurang — hasilnya
//    property "hantu": kurang.umur terbaca undefined (as bisa
//    berbohong tentang property).
// 6. Union/literal bisa disempitkan dengan as — tapi typeof
//    (file 8) jauh lebih aman karena mengecek nilai nyata.
//    Kalau bisa typeof, jangan as.
// 7. Sintaks lama <string>nilai tidak bisa dipakai di .tsx —
//    dibaca sebagai JSX (error berantai — tipikalnya TS17008).
//    Project ini selalu as.
//
// Cara menjalankan file ini:  npx tsx src/22_type_assertions.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. JSON.parse('{"kode":"TS-01","harga":5000}') — ambil kode
//    sebagai string dan harga sebagai number lewat as, lalu cetak
//    kode dalam huruf besar dan harga + pajak 10%.
//
//    JAWABAN:
const produk: any = JSON.parse('{"kode":"TS-01","harga":5000}');
const kode: string = produk.kode as string;
const harga: number = produk.harga as number;
console.log(kode.toUpperCase());   // TS-01
console.log(harga * 1.1);          // 5500

// 2. Ramal dulu, baru cek: apa hasil `console.log(typeof palsu)`
//    dengan `const palsu = "true" as unknown as boolean`? Dan apa
//    yang terjadi di Dart dengan `final palsu = 'true' as bool` ?
//
//    JAWABAN:
const palsu = "true" as unknown as boolean;
console.log(typeof palsu);   // string   ← nilai tidak pernah
                             // berubah; as hanya mengganti label
// Dart: program BERHENTI dengan error runtime "type 'String' is
// not a subtype of type 'bool' in type cast" — as Dart memeriksa
// sungguhan di runtime (terverifikasi dart run). Dua bahasa,
// satu kata kunci, karakter yang berbeda total.

// 3. Eksperimen error TS2352: uncomment `const salah: number =
//    "123" as number;` di sub-section (3), jalankan
//    `npx tsc --noEmit`, baca pesannya DUA KALIMAT penuh — lalu
//    comment-kan kembali. Pertanyaan: kenapa compiler menyarankan
//    "convert the expression to 'unknown' first" — bukankah itu
//    sama saja membuka pintu yang barusan ditutup?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/22_type_assertions.tsx:102:23
//    error TS2352: Conversion of type 'string' to type 'number'
//    may be a mistake because neither type sufficiently overlaps
//    with the other. If this was intentional, convert the
//    expression to 'unknown' first.
//    ---------------------------------------------------------------
//    Justru itulah fungsinya: satu-satunya alasan sah melewati
//    TS2352 adalah "saya SENGAJA dan saya paham risikonya" — dan
//    menulis as unknown as adalah cara mengatakan itu secara
//    eksplisit dan mencolok (mudah di-grep saat code review!).
//    Penolakan pertama menyelamatkan orang yang asal-asalan;
//    pintu darurat disediakan untuk yang benar-benar yakin.
//    Compiler tidak bisa membaca niat — jadi ia meminta niat
//    yang baik ditulis lebih keras.
