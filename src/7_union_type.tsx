// ========================================
// UNION TYPE
// ========================================
// (PDF "TypeScript Dasar" hlm. 46-48: Union Type)
// Materi sebelumnya: file 6 (any — alternatifnya ini).
// Menyusul: Menggunakan Union Type / narrowing (file 8).


// ------------------------------------------------------------------
// (1) BEBERAPA TIPE PILIHAN, DITULIS DENGAN TANDA |
//
// PDF: JavaScript boleh menyimpan macam-macam tipe di variabel yang
// sama — di TypeScript itu dilarang (praktik buruk). Solusinya kalau
// memang variabel perlu berganti tipe: DAFTARKAN pilihan tipenya
// dengan tanda | (dibaca: "atau").
//
//     let id: string | number = ...;   ← "string ATAU number"
//
// Dart TIDAK punya fitur ini secara langsung — ini fitur khas
// TypeScript. Yang paling mendekati di Dart: dynamic (tapi bebas
// segalanya, tanpa daftar). Analogi: union = tiket kereta yang boleh
// naik BISNIS atau EKONOMI saja — naik EXECUTIVE tetap ditolak;
// any = tiket bebas naik kereta apa pun.
// ------------------------------------------------------------------

let idPesanan: string | number = "A-001"; // mulai sebagai string
console.log(idPesanan); // A-001

idPesanan = 123456; // ganti jadi number — ✅ masih anggota daftar
console.log(idPesanan); // 123456

// Tiga anggota juga boleh:
let status: string | number | boolean = "aktif";
status = 1;
status = true;
console.log(status); // true


// ------------------------------------------------------------------
// (2) DI LUAR DAFTAR = DITOLAK (INI BEDANYA DENGAN any)
//
// Lanjut pakai variabel status di sub-section (1) — daftarnya
// string | number | boolean. Sekarang coba beri nilai yang TIPEnya
// tidak ada di daftar: compiler MENOLAK dengan error TS2322.
// Bandingkan file 6: assignment yang SAMA (data = [1, 2, 3]) sama
// sekali dibiarkan lewat — any tidak memeriksa apa pun.
// Union = kebebasan yang TERBATAS dan terdaftar.
// ------------------------------------------------------------------

// Yang paling jelas ditolak: Date — tipe yang sama sekali
// tidak ada di daftar.
// status = new Date();
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'Date' is not assignable to type
//    'string | number | boolean'.

// Yang ini kelihatannya boleh — isinya kan angka semua:
// status = [1, 2, 3];
// ❌ ERROR juga:
//    error TS2322: Type 'number[]' is not assignable to type
//    'string | number | boolean'.
//    (cara bacanya: sisi kanan bertipe number[] — tipe ARRAY —
//    dan array tidak terdaftar di daftar union)

// Tapi yang ini justru DITERIMA — padahal angka 3.5 tidak pernah
// disebut di daftar:
status = 3.5; // ✅ tipenya number, dan number ada di daftar
console.log(status); // 3.5

// CATATAN: union memeriksa TIPE, bukan NILAI. Itulah kenapa:
// - 3.5 diterima  → nilainya tak dikenal, tapi TIPEnya (number)
//   ada di daftar. Angka berapa pun (123, 3.5, -9) tetap satu
//   tipe: number — semua diterima.
// - [1, 2, 3] ditolak → tiap angkanya boleh, tapi KUMPULAN angka
//   bertipe number[] — tipe yang tidak terdaftar.


// ------------------------------------------------------------------
// (3) ARRAY CAMPURAN — JANJI FILE 3 DITEPATI
//
// File 3: "array campuran string + number butuh Union Type —
// menyusul". Saatnya: tulis union DI DALAM kurung, lalu kurung siku:
//
//     (string | number)[]   ← tiap ELEMEN boleh string atau number
//
// HATI-HATI posisi kurung (jebakan klasik):
//     (string | number)[]  = tiap elemen bebas string/number ✅
//     string[] | number[]  = array yang SELURUHNYA string ATAU
//                            seluruhnya number (bukan campuran!)
// ------------------------------------------------------------------

const transaksi: (string | number)[] = ["Kopi Susu", 18000, "Es Teh", 8000];
console.log(transaksi); // [ 'Kopi Susu', 18000, 'Es Teh', 8000 ]
console.log(transaksi[0]); // Kopi Susu
console.log(transaksi[1]); // 18000

// const salah: string[] | number[] = ["Kopi Susu", 18000];
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '(string | number)[]' is not assignable
//    to type 'number[] | string[]'.  (campuran tidak cocok dengan
//    "semua string ATAU semua number". Perhatikan: compiler
//    menulis union-nya dalam urutan sendiri — number[] duluan)


// ------------------------------------------------------------------
// (4) OPERASI HANYA BOLEH YANG AMAN UNTUK SEMUA ANGGOTA
//
// Compiler belum tahu isi union saat type-check — jadi SEMUA yang
// berisiko dilarang dulu. Dua kelas larangan:
//
// a) Method milih salah satu anggota saja:
// function bacakanId(id: string | number): string {
//     return id.toUpperCase();
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2339: Property 'toUpperCase' does not exist on type
//    'string | number'.
//      Property 'toUpperCase' does not exist on type 'number'.
//    (kalau isinya number, method itu tidak ada — baris kedua itu
//    compiler menunjuk anggota mana yang bermasalah)
//    (Contoh pakai parameter function supaya tipenya BENAR-BENAR
//    masih union — kalau langsung pakai idPesanan di atas, compiler
//    sudah menyempitkannya jadi number karena assignment terakhir)
//
// b) Operator + antar dua union:
// transaksi[1] + transaksi[3];
// ❌ ERROR kalau di-uncomment:
//    error TS2365: Operator '+' cannot be applied to types
//    'string | number' and 'string | number'.
//    (kenapa? + bisa berarti JUMLAH (kalau number) atau GABUNG
//    string (kalau string) — compiler tidak bisa menjanjikan hasil)
//
// Yang tetap aman: console.log, membandingkan dengan ===, dan
// operasi yang valid untuk semua anggota.
// Cara membuktikan tipenya supaya larangan terbuka = if + typeof,
// materi BERIKUTNYA: "Menggunakan Union Type" (PDF hlm. 49-50, file 8).
// ------------------------------------------------------------------

console.log(idPesanan); // 123456   (console.log aman untuk semua tipe)
console.log(idPesanan === 123456); // true   (=== juga aman)


// ------------------------------------------------------------------
// (5) UNION DENGAN null — MIRIP STRING? DI DART!
//
//     string | null   ← boleh teks ATAU kosong
//
// Jika di Dart seperti ini:  String? nama;   (tanda tanya)
// di TypeScript jadi seperti ini:  let nama: string | null = null;
// KEMIRIPAN NYATA: dua-duanya artinya "boleh kosong". Beda gaya
// tulis: Dart singkat dengan ?, TS menuliskan | null eksplisit.
// Pembahasan penuh null vs undefined menyusul (PDF hlm. 69-72).
// ------------------------------------------------------------------

let namaPembeli: string | null = null; // belum ada pembeli
console.log(namaPembeli); // null

namaPembeli = "Fauzi"; // pembeli datang
console.log(namaPembeli); // Fauzi


// ========================================
// RANGKUMAN
// ========================================
// 1. Union = daftar tipe pilihan dengan tanda |  ("atau"):
//    string | number = boleh salah satunya, boleh ganti-ganti.
//    Dart tidak punya langsung — fitur khas TS.
// 2. Di luar daftar ditolak (TS2322). Inilah beda dengan any:
//    any = bebas segalanya; union = bebas yang terdaftar saja.
// 3. Array campuran: (string | number)[] — tiap elemen bebas.
//    Jangan tertukar dengan string[] | number[] (semua string ATAU
//    semua number — bukan campuran).
// 4. Operasi antar union dibatasi: method milik satu anggota saja
//    dilarang (TS2339), operator + antar dua union juga (TS2365) —
//    sampai tipenya dibuktikan. Caranya (if + typeof): file 8.
// 5. string | null ≈ String? di Dart: "boleh kosong". Pembahasan
//    penuh null vs undefined menyusul (hlm. 69-72).
//
// Cara menjalankan file ini:  npx tsx src/7_union_type.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat variabel kodeMeja: string | number — isi "L-01", cetak;
//    ganti jadi 7, cetak lagi.
//
//    JAWABAN:
let kodeMeja: string | number = "L-01";
console.log(kodeMeja); // L-01
kodeMeja = 7;
console.log(kodeMeja); // 7

// 2. Buat array riwayat: (string | number)[] berisi 2 nama menu dan
//    2 total harga bergantian, lalu cetak array-nya dan cetak elemen
//    harga pertama. (JANGAN menjumlahkan elemennya — kenapa? Baca
//    sub-section (4): + antar union dilarang sampai tipenya dibuktikan.)
//
//    JAWABAN:
const riwayat: (string | number)[] = ["Kopi Susu", 18000, "Es Teh", 8000];
console.log(riwayat); // [ 'Kopi Susu', 18000, 'Es Teh', 8000 ]
console.log(riwayat[1]); // 18000

// 3. Eksperimen batas daftar: uncomment baris `status = [1, 2, 3]`
//    di sub-section (2), jalankan `npx tsc --noEmit`, baca error
//    TS2322-nya, lalu comment-kan kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/7_union_type.tsx(58,1)
//    error TS2322: Type 'number[]' is not assignable to type
//    'string | number | boolean'.
//    ---------------------------------------------------------------
//    Cara bacanya: sisi kanan number[] (array) TIDAK TERDAFTAR di
//    union string | number | boolean. Union memeriksa TIPE, bukan
//    isinya — angka boleh, tapi kumpulan angka (array) adalah tipe
//    lain. Kalau memang butuh array di daftar, tambahkan:
//    string | number | boolean | number[].
