// ========================================
// TUPLE
// ========================================
// (PDF "TypeScript Dasar" hlm. 41-42: Tuple)
// Materi sebelumnya: file 3 (Array), file 4 (Read Only Array).
// Tuple = penutup trio "keluarga array".


// ------------------------------------------------------------------
// (1) MEMBUAT TUPLE — PANJANG & TIPE PER INDEX SUDAH DITENTUKAN
//
// Tuple = array dengan KONTRAK KETAT: jumlah elemen dan tipe di tiap
// posisi sudah ditalangi di depan.
//
// Jika di Dart seperti ini (record type, Dart 3+):
//     (String, int) mahasiswa = ('Fauzi', 25);
//     print(mahasiswa.$1);   // akses pakai $1, $2, ...
// di TypeScript jadi seperti ini:
//     let mahasiswa: [string, number] = ["Fauzi", 25];
//     console.log(mahasiswa[0]);   // akses pakai [0], [1], ...
//
// Bentuknya memakai kurung siku seperti array (file 3), tapi isi
// tipenya BUKAN seragam — tiap posisi punya tipe sendiri.
// ------------------------------------------------------------------

let mahasiswa: [string, number] = ["Fauzi", 25];
console.log(mahasiswa); // [ 'Fauzi', 25 ]

let koordinat: [number, number] = [100, 200]; // semua posisi number juga sah
console.log(koordinat); // [ 100, 200 ]

let mahasiswas: readonly [string, number][] = [
    ["Fauzi", 25],
    ["Budi", 22],
    ["Azka", 5],
];

console.log(mahasiswas);      // [ [ 'Fauzi', 25 ], [ 'Budi', 22 ], [ 'Azka', 5 ] ]
console.log(mahasiswa);       // ❌ typo — hanya cek Anda membaca ;)
console.log(mahasiswas[0]);   // [ 'Fauzi', 25 ]   ← ambil 1 kotak (tuple)
console.log(mahasiswas[0][0]); // Fauzi            ← kotak pertama, sekat pertama
console.log(mahasiswas[0][1]); // 25               ← kotak pertama, sekat kedua
console.log(mahasiswas.length); // 3               ← jumlah kotak di rak

// Loop semua mahasiswa (for-of dari file 30):
for (const [nama, umur] of mahasiswas) {   // destructuring per kotak
    console.log(`${nama} berumur ${umur}`);
}
// Fauzi berumur 25
// Budi berumur 22
// Azka berumur 5


// ------------------------------------------------------------------
// (2) KONTRAKNYA DITEGAKKAN — URUTAN & PANJANG HARUS PAS
//
// Salah urutan tipe → ditolak. Salah jumlah elemen → ditolak.
// Di Dart record juga ketat seperti ini, jadi rasanya familiar.
// ------------------------------------------------------------------

// mahasiswa = [25, "Fauzi"];
// ❌ baris di atas ERROR kalau di-uncomment (dua error sekaligus):
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    (posisi 0 wajib string, posisi 1 wajib number — tertukar = tolak)

// mahasiswa = ["Budi"];
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2322: Type '[string]' is not assignable to type
//    '[string, number]'.  (kurang elemen = tolak; kelebihan juga sama)

console.log(mahasiswa[0]);  // Fauzi  (posisi 0 = string)
console.log(mahasiswa[1]);  // 25     (posisi 1 = number)
console.log(mahasiswa.length); // 2


// ------------------------------------------------------------------
// (3) TUPLE MUTABEL — BOLEH MENGUBAH ISI, TIPE PER POSISI TETAP
//
// Tuple biasa (tanpa readonly) boleh diubah isinya lewat index —
// asalkan tipe penggantinya cocok dengan posisinya.
//
// CATATAN LUBANG KECIL (tahu ada saja): push() pada tuple mutabel
// TIDAK ditolak compiler — padahal hasilnya melanggar kontrak panjang.
// Jadi jangan pakai push di tuple; butuh keamanan penuh → pakai
// readonly tuple (sub-section berikutnya).
// ------------------------------------------------------------------

mahasiswa[1] = 26; // ✅ posisi 1 memang number
console.log(mahasiswa); // [ 'Fauzi', 26 ]

// mahasiswa[0] = 99;
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.


// ------------------------------------------------------------------
// (4) TUPLE READONLY — KONTRAK + ISI TERKUNCI SEMUA
//
// Jika di Dart seperti ini:  final mahasiswa = const ('Fauzi', 25);
// di TypeScript jadi seperti ini:  readonly [string, number]
// (keyword readonly di depan, sisanya sama — persis pola file 4).
// ------------------------------------------------------------------

const ukuranSepatu: readonly [string, number] = ["Fauzi", 42];
console.log(ukuranSepatu); // [ 'Fauzi', 42 ]

// ukuranSepatu[1] = 43;
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to '1' because it is a read-only
//    property.  (index terkunci, cuma boleh dibaca)

// ukuranSepatu.push(43);
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2339: Property 'push' does not exist on type
//    'readonly [string, number]'.  (method pengubah tidak disediakan)


// ------------------------------------------------------------------
// (5) KAPAN PAKAI TUPLE, KAPAN ARRAY?
//
// Array (file 3) : banyak data SEJENIS, jumlah bebas.
//                  Contoh: daftar nama menu minuman.
// Tuple (file 5) : sedikit data BERBEDA TIPE dengan posisi tetap.
//                  Contoh: koordinat (x, y), pasangan (kode, pesan).
//
// Kalimat gampangnya: array = laci berisi kaos-kaos sama;
//                     tuple = kotak sepatu bersekat (sekat 1 sandal,
//                     sekat 2 kaos — tiap sekat isinya ditentukan).
//
// Kegunaan lain (sama seperti record di Dart): mengembalikan DUA
// nilai sekaligus dari sebuah function:
// ------------------------------------------------------------------

function hitungBelanja(harga: number, jumlah: number): [number, string] {
    const total = harga * jumlah;
    return [total, `Total ${total} rupiah`];
}

const hasil = hitungBelanja(15000, 2);
console.log(hasil);     // [ 30000, 'Total 30000 rupiah' ]
console.log(hasil[0]);  // 30000           (angkanya)
console.log(hasil[1]);  // Total 30000 rupiah  (teksnya)


// ========================================
// RANGKUMAN
// ========================================
// 1. Tuple = array berkontrak: panjang & tipe per posisi ditentukan
//    di depan. Dart punya yang mirip: record type (String, int)
//    Dart 3+ — beda akses: Dart $1/$2, TS [0]/[1].
// 2. Salah urutan (TS2322 ganda) dan salah panjang (TS2322) ditolak
//    compiler sebelum program jalan.
// 3. Tuple mutabel: boleh ubah index asal tipe cocok posisinya.
//    Lubang kecil: push() tidak diperiksa — jangan dipakai di tuple.
// 4. readonly [tipe1, tipe2] = tuple terkunci penuh: ubah index
//    TS2540, push TS2339 (pola sama seperti ReadonlyArray file 4).
// 5. Array untuk banyak data sejenis; tuple untuk sedikit data
//    beda tipe dengan posisi tetap. Function boleh mengembalikan
//    tuple — cara TS mengembalikan banyak nilai sekaligus.
//
// Cara menjalankan file ini:  npx tsx src/5_tuple.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat tuple produk: [string, number, boolean] berisi nama, harga,
//    dan ready stock. Cetak tuple-nya, lalu nama produknya.
//
//    JAWABAN:
const produk: [string, number, boolean] = ["Kopi Susu", 18000, true];
console.log(produk);    // [ 'Kopi Susu', 18000, true ]
console.log(produk[0]); // Kopi Susu

// 2. Buat readonly tuple configApp: readonly [string, string] berisi
//    nama app dan versinya, lalu cetak versinya (posisi ke-2).
//
//    JAWABAN:
const configApp: readonly [string, string] = ["Mocca POS", "1.0.0"];
console.log(configApp[1]); // 1.0.0

// 3. Eksperimen kontrak: uncomment baris `mahasiswa = [25, "Fauzi"]`
//    di sub-section (2), jalankan `npx tsc --noEmit`, baca dua error
//    TS2322-nya, lalu comment-kan kembali.
//
//    JAWABAN: dua error muncul BERSAMAAN di satu baris:
//    ---------------------------------------------------------------
//    src/5_tuple.tsx:40:14
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    src/5_tuple.tsx:40:18
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    ---------------------------------------------------------------
//    Cara bacanya: compiler memeriksa TIAP POSISI terpisah. Angka 25
//    di posisi 0 (harusnya string) → error pertama. Teks "Fauzi" di
//    posisi 1 (harusnya number) → error kedua. Satu salah urutan,
//    dua laporan — karena kontraknya memang per posisi.
