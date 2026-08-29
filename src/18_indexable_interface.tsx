// ========================================
// INDEXABLE INTERFACE
// ========================================
// (PDF "TypeScript Dasar" hlm. 82-85: Indexable Interface,
//  Kode : Array, Kode : Object)
// Materi sebelumnya: file 15-17 (interface, readonly, function
// interface). Prasyarat lama: file 3 (array), file 5 (tuple).


// ------------------------------------------------------------------
// (1) INTERFACE UNTUK TIPE BER-INDEX — APA ITU "INDEXABLE"?
//
// PDF hlm. 83: interface juga bisa membuat tipe data yang
// BER-INDEX, seperti Array atau Object. Bentuknya: attribute-nya
// adalah KURUNG SIKU berisi tipe index — disebut index signature:
//
//     interface NamaArray {
//         [index: number]: string;    ← number index → array-like
//     }
//     interface Kamus {
//         [key: string]: string;      ← string index → object-like
//     }
//
// Artinya: "object ini bisa diakses dengan index number/string,
// dan semua isinya bertipe string".
//
// Jika di Dart seperti ini:
//     List<String> bahasa = ['TypeScript', 'Dart'];
//     Map<String, String> warna = {'merah': 'red'};
// di TypeScript jadi seperti ini: dua-duanya bisa dipakai — tapi
// indexable interface lebih sering dipakai untuk sisi MAP-nya
// (data key-value dinamis), karena array biasa sudah punya
// penulisannya sendiri: string[] (file 3).
// ------------------------------------------------------------------

interface NamaArray {
    [index: number]: string;
}

const bahasa: NamaArray = ["TypeScript", "Dart", "Kotlin"];
console.log(bahasa[0]);   // TypeScript
console.log(bahasa[2]);   // Kotlin

// Object literal dengan key angka juga sah — karena di JavaScript
// key angka tersimpan sebagai STRING (bukti di sub-section 4):
const campur: NamaArray = { 0: "a", 1: "b" };
console.log(campur[1]);   // b


// ------------------------------------------------------------------
// (2) STRING INDEX — DICTIONARY / MAP DART
//
// Bentuk paling berguna sehari-hari: [key: string]: T — seperti
// Map<String, T> di Dart. Key-nya BEBAS (tidak perlu dideklarasi
// satu-satu seperti interface object biasa di file 15), isinya
// harus seragam bertipe T.
//
// PERBEDAAN NYATA (hasil verifikasi dart analyze):
//   Map<String, String> warna; print(warna['biru']);  → null
//   const warna: Kamus; console.log(warna.biru);      → undefined
// Key absen di Dart dibaca null; di TS dibaca undefined (file 14:
// "belum ada" — dua jenis kosong itu nyata bedanya di sini).
// ------------------------------------------------------------------

interface Kamus {
    [key: string]: string;
}

const warna: Kamus = { merah: "red", hijau: "green" };
console.log(warna.merah);       // red    ← dot biasa
console.log(warna["hijau"]);    // green  ← bracket juga bisa

// Key BARU bisa ditambah kapan pun — persis Map Dart:
warna.biru = "blue";
console.log(warna.biru);        // blue

// Key absen: runtime undefined...
console.log(warna.kuning);      // undefined


// ------------------------------------------------------------------
// (3) PENJAGA ISI — SEMUA NILAI HARUS SERAGAM
//
// Kontraknya sederhana: SELURUH nilai seragam bertipe T. Pelanggaran
// ditolak di penulisan awal maupun penugasan ulang:
// ------------------------------------------------------------------

// const salahIsi: Kamus = { merah: 1 };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (semua nilai Kamus harus string — 1 ditolak)

// warna.biru = 123;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (penugasan key baru pun dijaga — bukan cuma saat pembuatan)

// bahasa[0] = 42;
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (number index dijaga sama ketatnya)


// ------------------------------------------------------------------
// (4) FAKTA UNIK: KEY ANGKA ITU STRING — DAN BATAS TIPIS
// NUMBER ↔ STRING INDEX
//
// Warisan JavaScript: semua key object tersimpan sebagai STRING.
// Object { 1: "satu" } menyimpan key-nya sebagai "1". Karena itu:
//   - akses number-index dengan string NUMERIK ("0") → LOLOS
//   - akses number-index dengan string NON-numerik ("nol") → TS7015
//
// Jika di Dart seperti ini: Map Dart membedakan tipe key dengan
// sungguh-sungguh — Map<int, String> benar-benar menyimpan int
// (tidak diam-diam jadi string). PERBEDAAN NYATA: "key" di TS
// object selalu berujung string di runtime.
// ------------------------------------------------------------------

console.log(Object.keys({ 1: "satu", 2: "dua" }));   // [ '1', '2' ]
console.log(bahasa["0"]);    // TypeScript ← string numerik: lolos!

// const miskin: string = bahasa["nol"];
// ❌ ERROR kalau di-uncomment:
//    error TS7015: Element implicitly has an 'any' type because
//    index expression is not of type 'number'.
//    ("nol" bukan angka — compiler menolak menebak)


// ------------------------------------------------------------------
// (5) CAMPURAN ATTRIBUTE TETAP + INDEX SIGNATURE — DAN SYARAT DAMAI
//
// Attribute tetap (file 15) dan index signature BOLEH tinggal
// bersama — syaratnya satu: tipe attribute tetap harus COCOK
// dengan tipe index (string dengan string). Kalau bentrok,
// TS2411 menjaga.
//
// Kegunaan nyata: data utama punya nama attribute jelas, sisanya
// bebas — misalnya metadata produk.
// ------------------------------------------------------------------

interface Pegawai {
    nama: string;           // attribute tetap — punya nama
    [key: string]: string;  // sisanya: key bebas
}

const peg: Pegawai = { nama: "Fauzi", kota: "Bandung", divisi: "IT" };
console.log(peg.nama);      // Fauzi
console.log(peg.kota);      // Bandung
console.log(peg.divisi);    // IT

// Contoh bentrok di bawah ini: attribute umur bertipe number,
// sedangkan index signature menjanjikan semua nilai string:
// interface Bentrok {
//     umur: number;
//     [key: string]: string;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2411: Property 'umur' of type 'number' is not assignable
//    to 'string' index type 'string'.
//    (semua attribute tetap otomatis "termasuk" index signature —
//    tipe number untuk umur akan mengingkari janji "semua nilai
//    string". Kalau butuh umur number, hilangkan index signature
//    atau naikkan tipe NILAI index-nya: [key: string]: string | number)


// ------------------------------------------------------------------
// (6) READONLY INDEX SIGNATURE — TS2542
//
// Index signature juga bisa readonly (file 16). Kode error-nya
// BEDA dengan property biasa: TS2542, bukan TS2540 — pesannya
// spesifik index signature.
// ------------------------------------------------------------------

interface Simpanan {
    readonly [key: string]: number;
}

const saldo: Simpanan = { tabungan: 100 };
console.log(saldo.tabungan);   // 100

// saldo.tabungan = 200;
// ❌ ERROR kalau di-uncomment:
//    error TS2542: Index signature in type 'Simpanan' only permits
//    reading.
//    (sama semangatnya dengan TS2540 file 16 — tapi karena yang
//    dikunci index signature, kodenya dan pesannya beda)


// ========================================
// RANGKUMAN
// ========================================
// 1. Indexable interface = tipe BER-INDEX (PDF hlm. 83):
//    [index: number]: T → array-like; [key: string]: T →
//    object-like / dictionary ≈ Map<String, T> Dart.
// 2. Array biasa tetap paling enak ditulis string[] (file 3) —
//    indexable number index dipakai kalau butuh kontrol bentuk
//    tingkat interface.
// 3. Key BARU bebas ditambah kapan pun — persis perilaku Map Dart.
// 4. PERBEDAAN NYATA: key absen → Dart membaca null, TS membaca
//    undefined (file 14). Semua nilai wajib seragam T: pelanggaran
//    TS2322 (saat buat MAUPUN saat assign).
// 5. Key object di JS selalu STRING di runtime: Object.keys dari
//    { 1: "satu" } → ['1']. Akses number-index dengan "0" lolos,
//    dengan "nol" → TS7015. Map<int, T> Dart benar-benar int —
//    PERBEDAAN NYATA.
// 6. Attribute tetap + index signature boleh campur, tapi tipe
//    attribute harus cocok dengan tipe index — bentrok → TS2411.
// 7. readonly index signature → pelanggaran TS2542 ("only permits
//    reading") — beda kode dengan property biasa (TS2540, file 16).
//
// Cara menjalankan file ini:  npx tsx src/18_indexable_interface.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface KodeNegara { [kode: string]: string } berisi
//    { id: "Indonesia", jp: "Jepang" }. Cetak keduanya, lalu
//    tambah key baru "kr": "Korea Selatan" dan cetak lagi.
//
//    JAWABAN:
interface KodeNegara {
    [kode: string]: string;
}

const negara: KodeNegara = { id: "Indonesia", jp: "Jepang" };
console.log(negara.id, negara.jp);   // Indonesia Jepang
negara.kr = "Korea Selatan";         // key baru — persis Map Dart
console.log(negara.kr);              // Korea Selatan

// 2. Ramal dulu, baru cek: apa hasil `console.log(negara.us);`?
//    Dan apa hasil yang SETARA di Dart:
//    `Map<String, String> negara = {'id': 'Indonesia'}; print(negara['us']);`?
//    Kenapa BEDA hasilnya padahal dua-duanya "key absen"?
//
//    JAWABAN:
console.log(negara.us);   // undefined
// Versi Dart (terverifikasi dart analyze + run): us → null.
// Bedanya jenis kekosongannya (file 14): TS hanya punya undefined
// untuk "key belum ada" (warisan JS object), Dart hanya punya null.
// Hasil akhirnya sama-sama "kosong" — tapi tipe kosongnya beda,
// dan itu terasa saat membandingkan: di TS `negara.us === null`
// bernilai false!

// 3. Eksperimen error TS2411: uncomment interface Bentrok di
//    sub-section (5), jalankan `npx tsc --noEmit`, baca — lalu
//    comment-kan kembali. Pertanyaan: kenapa attribute tetap
//    ikut-ikutan "diperiksa" terhadap index signature?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/18_indexable_interface.tsx:154:5
//    error TS2411: Property 'umur' of type 'number' is not
//    assignable to 'string' index type 'string'.
//    ---------------------------------------------------------------
//    Karena index signature berarti "SEMUA key string menghasilkan
//    nilai string" — dan attribute tetap seperti umur juga key
//    string (peg.umur sah secara index). Kalau umur boleh number,
//    janji "[key: string]: string" PALSU — ada key string yang
//    menghasilkan number. Compiler menolak janji yang tak bisa
//    ditepati. (Solusi dunia nyata: pisahkan data number ke
//    interface lain tanpa index signature.)
