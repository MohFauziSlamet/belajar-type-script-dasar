// ========================================
// TYPE ALIAS
// ========================================
// (PDF "TypeScript Dasar" hlm. 51-54: Type Alias)
// Materi sebelumnya: file 6 (any), file 7-8 (union + typeof).
// Menyusul: Type Alias untuk Union (file 10), Object Type inline (file 11).


// ------------------------------------------------------------------
// (1) MEMBERI NAMA UNTUK BENTUK DATA — keyword type
//
// PDF hlm. 52: any tidak direkomendasikan. Any hanya untuk data
// pihak luar yang tidak bisa kita ubah. Kalau object-nya BUATAN
// SENDIRI, buatlah alias untuk strukturnya — lalu pakai nama itu
// sebagai tipe.
//
//     type Product = {
//         nama: string;
//         harga: number;
//     };
//
// Bagi orang Dart, dua analogi sekaligus:
// - Untuk object: rasanya seperti CLASS MODEL di Flutter
//   (class Product { final String nama; final int harga; })
//   — tapi TANPA keyword class, tanpa constructor, tanpa new.
//   Cuma bentuk datanya, murni kontrak di level tipe.
// - Namanya memang "alias": sama seperti typedef di Dart
//   (typedef KodeProduk = String;) — memberi nama lain pada tipe.
//
// Object literal yang dipakai di file ini: { nama: "Kopi", harga: 5 }
// = data berbentuk key: value — di Dart rasanya seperti instance
// class model. Pembahasan penuhnya menyusul di Object Type (file 11).
// ------------------------------------------------------------------

type Product = {
    nama: string;
    harga: number;
};

const kopi: Product = { nama: "Kopi Susu", harga: 18000 };
console.log(kopi);        // { nama: 'Kopi Susu', harga: 18000 }
console.log(kopi.nama);   // Kopi Susu   (akses pakai titik, seperti field Dart)
console.log(kopi.harga);  // 18000


// ------------------------------------------------------------------
// (2) KONTRAKNYA DITEGAKKAN TIGA ARAH
//
// Object yang dipakai sebagai Product harus PAS dengan bentuknya:
// tidak boleh KURANG, tidak boleh SALAH TIPE, tidak boleh
// KELEBIHAN. Bandingkan Dart: class model juga menolak constructor
// yang kurang/salah — rasanya sama, hanya beda tempat penegakan
// (di sini: type-check compiler).
// ------------------------------------------------------------------

// const salahKurang: Product = { nama: "Es Teh" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'harga' is missing in type
//    '{ nama: string; }' but required in type 'Product'.
//    (attribute harga wajib ada — object literal kurang satu)

// const salahTipe: Product = { nama: "Es Teh", harga: "delapan ribu" };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    (harga dideklarasikan number, diisi string — ingat file 2)

// const salahLebih: Product = { nama: "Es Teh", harga: 8000, stok: 10 };
// ❌ ERROR kalau di-uncomment:
//    error TS2353: Object literal may only specify known properties,
//    and 'stok' does not exist in type 'Product'.
//    (kelebihan attribute juga ditolak — beda tipis dengan Dart,
//    di Dart field ekstra di constructor memang tidak mungkin)


// ------------------------------------------------------------------
// (3) STRUCTURAL TYPING — YANG TIDAK ADA DI DART
//
// PERBEDAAN NYATA: Dart pakai NOMINAL typing — tipe cocok kalau
// NAMANYA cocok (instance Product ya harus class Product).
// TypeScript pakai STRUCTURAL typing — tipe cocok kalau BENTUKNYA
// cocok, NAMA TIDAK DIPERSOALKAN.
//
// Object di bawah TIDAK ditulis `: Product`, tapi diterima sebagai
// Product karena bentuknya sama persis (punya nama: string,
// harga: number). Di Dart ini MUSTAHIL tanpa cast.
//
// Analogi: Dart = kartu identitas (nama di KTP harus cocok);
// TS = kunci membuka pintu (yang penting giginya pas, merek kunci
// tidak dipedulikan).
// ------------------------------------------------------------------

const tanpaLabel = { nama: "Roti Bakar", harga: 12000 };
console.log(tanpaLabel.nama); // Roti Bakar

const roti: Product = tanpaLabel; // ✅ diterima — bentuknya cocok
console.log(roti); // { nama: 'Roti Bakar', harga: 12000 }


// ------------------------------------------------------------------
// (4) ALIAS UNTUK TIPE LAIN — PRIMITIF & ARRAY
//
// type tidak cuma untuk object. Persis seperti typedef Dart
// (typedef KodeProduk = String;):
//
//     type KodeProduk = string;      ← alias untuk primitif
//     type DaftarProduct = Product[]; ← alias untuk array (file 3)
//
// DaftarProduct jadi membaca "array of Product" — lebih pendek
// dari menulis { nama: string; harga: number }[] berulang-ulang.
// ------------------------------------------------------------------

type KodeProduk = string;
const kode: KodeProduk = "KP-001";
console.log(kode); // KP-001

type DaftarProduct = Product[];
const menu: DaftarProduct = [
    kopi,
    { nama: "Es Teh", harga: 8000 },
];
console.log(menu.length); // 2
console.log(menu[1].nama); // Es Teh   (elemen otomatis dikenali Product)


// ------------------------------------------------------------------
// (5) ALIAS DIPAKAI BERULANG — INILAH TUJUAN UTAMANYA
//
// Sekali definisi, dipakai di mana-mana: variabel, parameter
// function, return type. Tanpa alias, bentuk object harus
// ditulis ulang di tiap tempat (rentan selisih — satu tempat
// berubah, tempat lain lupa).
//
// Jika di Dart seperti ini:
//     double total(Product p) => p.harga * 2;
// di TypeScript jadi seperti ini: sama persis, tipe paramaternya
// alias yang kita buat sendiri.
// ------------------------------------------------------------------

function potonganHarga(product: Product): number {
    return product.harga * 0.1; // diskon 10%
}

function tampilkanMenu(daftar: DaftarProduct): void {
    console.log(daftar); // void = tidak mengembalikan apa pun (≈ void Dart)
}

console.log(potonganHarga(kopi)); // 1800
tampilkanMenu(menu);
// Output tampilkanMenu — Node mencetak array berisi object secara
// multi-baris terformat (isinya menu yang sama):
// [
//   { nama: 'Kopi Susu', harga: 18000 },
//   { nama: 'Es Teh', harga: 8000 }
// ]
// CATATAN: console.log kecil (angka, satu object) dicetak satu baris;
// array berisi object dicetak multi-baris oleh Node — bukan error.

// CATATAN `void`: sama seperti di Dart — function yang tidak
// me-return apa-apa. Aman dipakai, sudah ada di Dart.


// ========================================
// RANGKUMAN
// ========================================
// 1. Type alias = memberi NAMA pada tipe: type Product = {...}.
//   Alternatif yang benar dari any untuk data buatan sendiri (PDF).
// 2. Analogi Dart: object → class model (tanpa class/constructor/
//   new), primitif & array → typedef.
// 3. Kontrak tiga arah: kurang attr TS2741, salah tipe TS2322,
//    kelebihan attr TS2353. Semua ditegakkan compiler.
// 4. STRUCTURAL TYPING (tidak ada di Dart): bentuk sama = cocok,
//    nama tipe tidak dipersoalkan. Dart = nominal (nama di KTP);
//    TS = structural (gigi kunci pas).
// 5. Alias sekali definisi dipakai di mana-mana: variabel, parameter
//    function, return type — inilah tujuan utamanya.
// 6. void ≈ void Dart: function tanpa return value.
// 7. Menyusul: alias untuk union type (file 10), object type inline
//    tanpa nama (file 11).
//
// Cara menjalankan file ini:  npx tsx src/9_type_alias.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat alias Pelanggan = { nama: string; umur: number }, buat
//    satu pelanggan, cetak nama dan umurnya.
//
//    JAWABAN:
type Pelanggan = {
    nama: string;
    umur: number;
};
const pelanggan: Pelanggan = { nama: "Azka", umur: 5 };
console.log(pelanggan.nama); // Azka
console.log(pelanggan.umur); // 5

// 2. Buktikan structural typing: buat variabel baru TANPA annotation
//    yang isinya { nama: "Slamet", umur: 30 }, lalu serahkan ke
//    variabel bertipe Pelanggan — tidak ada error.
//
//    JAWABAN:
const tanpaAnnotation = { nama: "Slamet", umur: 30 };
const bapak: Pelanggan = tanpaAnnotation; // ✅ bentuk sama → diterima
console.log(bapak); // { nama: 'Slamet', umur: 30 }

// 3. Eksperimen TS2741: uncomment baris `salahKurang` di
//    sub-section (2), jalankan `npx tsc --noEmit`, baca errornya,
//    lalu comment-kan kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/9_type_alias.tsx:56:7
//    error TS2741: Property 'harga' is missing in type
//    '{ nama: string; }' but required in type 'Product'.
//    ---------------------------------------------------------------
//    Cara bacanya (dari kiri):
//    - Property 'harga' is missing → attribute yang WAJIB tapi tidak ada
//    - in type '{ nama: string; }' → bentuk object yang kita tulis
//    - but required in type 'Product' → kontrak dari alias Product
//    Solusinya dua: lengkapi attribute-nya, atau tandai opsional (tanda ?
//    pada attribute — pembahasan penuhnya menyusul di Optional
//    Properties, PDF hlm. 60-62).
