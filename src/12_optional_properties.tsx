// ========================================
// OPTIONAL PROPERTIES
// ========================================
// (PDF "TypeScript Dasar" hlm. 60-62: Optional Properties)
// Materi sebelumnya: file 9 (type alias), file 11 (object inline).
// File ini menjawab teaser di latihan file 9: attribute object
// yang BOLEH tidak diisi.


// ------------------------------------------------------------------
// (1) MASALAH: SEMUA ATTRIBUTE WAJIB — TANDA ? MENGECUALIKAN
//
// PDF hlm. 61: secara default, attribute di Object/Type WAJIB diisi
// (ingat kontrak file 9: kurang attribute = TS2741). Tapi kadang
// memang tidak semua wajib — tandai dengan ? supaya boleh dilewatkan:
//
//     type Pelanggan = {
//         nama: string;     ← wajib
//         alamat?: string;  ← BOLEH tidak diisi (perhatikan ?)
//     };
//
// Jika di Dart seperti ini:
//     class Pelanggan {
//       String nama;                // wajib
//       String? alamat;             // nullable — boleh kosong
//     }
// di TypeScript jadi seperti ini: alamat? — KEMIRIPAN konsepnya
// tinggi (dua-duanya "boleh kosong"), tapi ada beda halus: Dart
// satu jenis kosong (null), TS dua (null dan undefined). Property
// yang TIDAK DITULIS sama sekali dibaca undefined (bukan null) —
// pembahasan penuh di file 14 (hlm. 69-72).
// ------------------------------------------------------------------

type Pelanggan = {
    nama: string;
    alamat?: string;
};

const pelangganBaru: Pelanggan = { nama: "Fauzi" }; // alamat dilewatkan — ✅
console.log(pelangganBaru); // { nama: 'Fauzi' }

const pelangganLengkap: Pelanggan = { nama: "Azka", alamat: "Bandung" };
console.log(pelangganLengkap); // { nama: 'Azka', alamat: 'Bandung' }

// Yang tetap wajib tetap diawasi (kontrak file 9 tidak dilonggarkan):
// const salah: Pelanggan = { alamat: "Bandung" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'nama' is missing in type
//    '{ alamat: string; }' but required in type 'Pelanggan'.
//    (? hanya melonggarkan yang BER-TANDA ? — nama tetap wajib)


// ------------------------------------------------------------------
// (2) MEMBACA OPTIONAL: HASILNYA string | undefined
//
// Property optional yang tidak diisi, dibaca saat program jalan →
// undefined (ingat file 3: akses di luar batas juga undefined).
// Di level tipe, alamat kini bertipe string | undefined — union!
// Semua aturan file 7-8 berlaku: operasi berisiko dilarang sampai
// dibuktikan aman.
// ------------------------------------------------------------------

console.log(pelangganBaru.alamat);    // undefined   (tidak diisi)
console.log(pelangganLengkap.alamat); // Bandung     (diisi)

// console.log(pelangganBaru.alamat.length);
// ❌ ERROR kalau di-uncomment:
//    error TS18048: 'pelangganBaru.alamat' is possibly 'undefined'.
//    (.length itu milik string — kalau isinya undefined, program
//    crash saat berjalan. Compiler mencegah lebih dulu. Catatan:
//    angka 48 spesifik "possibly 'undefined'" — kembarannya
//    TS18047 untuk "possibly 'null'", muncul di file 14 nanti.)


// ------------------------------------------------------------------
// (3) TIGA CARA AMAN — DAN DUA DI ANTARANYA SAMA DENGAN DART!
//
// KABAR BAIK: ?. dan ?? bekerja SAMA PERSIS seperti di Dart.
//    x?.length → baca kalau ada; kalau undefined hasilnya undefined
//    x ?? "default" → pakai x kalau ada; kalau kosong pakai default
//    if (x) { ... } → cek dulu, di dalam blok x pasti string —
//                     pola narrowing seperti file 8
// ------------------------------------------------------------------

console.log(pelangganBaru.alamat?.length);       // undefined  (aman)
console.log(pelangganLengkap.alamat?.length);    // 7          (Bandung = 7 huruf)
console.log(pelangganBaru.alamat ?? "tidak diisi");  // tidak diisi
console.log(pelangganLengkap.alamat ?? "tidak diisi"); // Bandung

if (pelangganLengkap.alamat) {
    // narrowing — pola pengecekan seperti file 8 (di sini lewat
    // if truthiness, bukan typeof): di dalam blok pasti string
    console.log(pelangganLengkap.alamat.toUpperCase()); // BANDUNG
}


// ------------------------------------------------------------------
// (4) MENULIS undefined EKSPLISIT — BOLEH
//
// Selain dilewatkan, optional juga boleh diisi undefined LANGSUNG:
//     { nama: "Budi", alamat: undefined }
// Hasil pembacaannya sama saja dengan tidak ditulis.
// (CATATAN teknis: ada setelan tsconfig exactOptionalPropertyTypes
// yang melarang ini — project ini TIDAK memakainya, mengikuti
// perilaku standar. Tahu ada saja.)
// ------------------------------------------------------------------

const pelangganPindahan: Pelanggan = { nama: "Budi", alamat: undefined };
console.log(pelangganPindahan.alamat ?? "belum ada"); // belum ada


// ------------------------------------------------------------------
// (5) OPTIONAL PARAMETER DI FUNCTION — ? BERLAKU JUGA DI SANA
//
// Tanda ? juga bisa di parameter: function boleh dipanggil TANPA
// argumen itu. Jika di Dart seperti ini:
//     void sapa(String nama, [String? gelar]) { ... }   ← kurung siku
// di TypeScript jadi seperti ini: gelar?: string — konsep identik
// (boleh tidak dikirim), penulisannya beda: Dart kurung siku / {},
// TS tanda ? langsung di parameter.
// ------------------------------------------------------------------

function sapa(nama: string, gelar?: string): string {
    // gelar bertipe string | undefined → amankan dengan ?? (poin 3)
    return `Halo ${gelar ?? ""}${gelar ? " " : ""}${nama}`;
}

console.log(sapa("Fauzi"));           // Halo Fauzi
console.log(sapa("Fauzi", "Mas"));    // Halo Mas Fauzi

// Kelebihan property tetap ditolak — ? bukan pintu masuk attribute bebas:
// const aneh: Pelanggan = { nama: "Cici", umur: 30 };
// ❌ ERROR kalau di-uncomment:
//    error TS2353: Object literal may only specify known properties,
//    and 'umur' does not exist in type 'Pelanggan'.  (ingat file 9)


// ========================================
// RANGKUMAN
// ========================================
// 1. Default-nya attribute object WAJIB (file 9: TS2741). Tanda ?
//   melonggarkan HANYA attribute itu: alamat?: string.
// 2. Konsep ≈ field nullable Dart (String? alamat). Beda halus:
//   property yang dilewatkan terbaca undefined (bukan null) —
//   penuh di hlm. 69-72.
// 3. Membaca optional = union string | undefined → aturan file 7-8
//   berlaku. Langsung .length = TS18048 (mungkin undefined).
// 4. TIGA cara aman: x?.length, x ?? default, if (x) + narrowing.
//   ?. dan ?? SAMA PERSIS dengan Dart — nol usaha, tinggal pakai.
// 5. alamat: undefined eksplisit juga sah (perilaku standar TS).
// 6. ? di parameter function = argumen boleh tidak dikirim
//   (≈ parameter opsional Dart, beda tulis: [String?] vs ?).
// 7. ? TIDAK melonggarkan yang lain: wajib tetap TS2741,
//   property tak dikenal tetap TS2353.
//
// Cara menjalankan file ini:  npx tsx src/12_optional_properties.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat alias Produk = { nama: string; harga: number; diskon?: number }.
//    Buat 2 produk: satu tanpa diskon, satu diskon 10 (persen), lalu
//    cetak harga akhir masing-masing (diskon kosong = harga tetap).
//
//    JAWABAN:
type Produk = { nama: string; harga: number; diskon?: number };
// Perhatikan: kopi WAJIB diberi annotation ": Produk" — kalau tidak,
// inference hanya melihat { nama, harga } tanpa diskon → akses
// kopi.diskon jadi TS2339 (property tidak dikenal).
const kopi: Produk = { nama: "Kopi Susu", harga: 18000 };  // tanpa diskon
const roti: Produk = { nama: "Roti Bakar", harga: 12000, diskon: 10 };

const hargaKopi = kopi.harga - (kopi.harga * (kopi.diskon ?? 0)) / 100;
const hargaRoti = roti.harga - (roti.harga * (roti.diskon ?? 0)) / 100;
console.log(hargaKopi); // 18000   (diskon ?? 0 → tanpa diskon)
console.log(hargaRoti); // 10800   (12000 - 10%)

// 2. Buat function tampilkanProfil(p: { nama: string; kota?: string })
//    yang mengembalikan "Fauzi (Bandung)" kalau kota diisi, atau
//    "Fauzi" saja kalau tidak. Petunjuk: ?.
//
//    JAWABAN:
function tampilkanProfil(p: { nama: string; kota?: string }): string {
    return p.kota ? `${p.nama} (${p.kota})` : p.nama;
}
console.log(tampilkanProfil({ nama: "Fauzi", kota: "Bandung" })); // Fauzi (Bandung)
console.log(tampilkanProfil({ nama: "Azka" }));                   // Azka

// 3. Eksperimen TS18048: uncomment baris
//    `console.log(pelangganBaru.alamat.length)` di sub-section (2),
//    jalankan `npx tsc --noEmit`, baca errornya — lalu comment-kan
//    kembali, dan bandingkan dengan versi amannya `alamat?.length`.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/12_optional_properties.tsx:66:13
//    error TS18048: 'pelangganBaru.alamat' is possibly 'undefined'.
//    ---------------------------------------------------------------
//    Cara bacanya: property optional = mungkin undefined; .length
//    cuma milik string → compiler menahan sampai kita buktikan aman
//    (pola sama dengan union file 7-8, sekarang pada property).
//    Angkanya gampang diingat lewat isi pesannya: TS18048 =
//    possibly 'undefined', TS18047 = possibly 'null' (muncul saat
//    berhadapan dengan null di file 14).
