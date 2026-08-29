// ========================================
// OBJECT TYPE (INLINE)
// ========================================
// (PDF "TypeScript Dasar" hlm. 57-59: Object Type)
// Materi sebelumnya: file 9 (type alias), file 10 (alias union).
// File ini menepati janji file 9: pembahasan penuh object literal.


// ------------------------------------------------------------------
// (1) TIPE OBJECT DITULIS LANGSUNG DI VARIABEL (INLINE)
//
// PDF hlm. 58: untuk kasus SEDERHANA, membuat alias dulu (file 9)
// terlalu bertele-tele — kita bisa menuliskan bentuk tipenya
// LANGSUNG saat membuat variabel. Hasilnya sama ketatnya; bedanya
// cuma tempat menulis bentuknya.
//
//     const kopi: { nama: string; harga: number } = { ... };
//                    ↑ bentuk tipe, LANGSUNG di sini
//
// Janji file 9 ditepati — apa itu OBJECT LITERAL:
// { nama: "Kopi Susu", harga: 18000 } = data berbentuk key: value.
// Jika di Dart seperti ini: instance class model
//     var kopi = Product('Kopi Susu', 18000);  // perlu class dulu
// di TypeScript jadi seperti ini: TANPA class, tanpa constructor,
// tanpa new — tulis kurung kurawal, langsung jadi data. Akses
// isinya pakai titik (kopi.nama), persis field di Dart.
// ------------------------------------------------------------------

const kopi: { nama: string; harga: number } = { nama: "Kopi Susu", harga: 18000 };
console.log(kopi);       // { nama: 'Kopi Susu', harga: 18000 }
console.log(kopi.nama);  // Kopi Susu
console.log(kopi.harga); // 18000


// ------------------------------------------------------------------
// (2) PERILAKU SETELAH DIBUAT — BACA & UBAH BOLEH, NYETRAH DILARANG
//
// Object type bukan ReadonlyArray (file 4) — isinya boleh diubah:
// - baca property yang ada      → ✅
// - ubah property yang ada      → ✅ (asal tipenya cocok)
// - akses property yang TIDAK ada → ❌ TS2339
// - MENAMBAH property baru       → ❌ TS2339 juga
//
// Ini beda dengan Map di Dart (yang bebas menambah key). Object
// TypeScript bersifat KAKU: bentuknya dikunci saat dibuat —
// persis field class model Dart yang tidak bisa ditambah runtime.
// ------------------------------------------------------------------

kopi.harga = 20000; // ✅ ubah property yang ada, masih number
console.log(kopi.harga); // 20000

// console.log(kopi.stok);
// ❌ ERROR kalau di-uncomment:
//    error TS2339: Property 'stok' does not exist on type
//    '{ nama: string; harga: number; }'.
//    (stok tidak ada di bentuk yang kita deklarasikan)

// kopi.stok = 10;
// ❌ ERROR kalau di-uncomment — MENAMBAH property juga TS2339:
//    error TS2339: Property 'stok' does not exist on type
//    '{ nama: string; harga: number; }'.

// PERHATIKAN pesan errornya: tipe inline DIEJA PANJANG di pesan
// ('{ nama: string; harga: number; }') — kontras dengan file 10
// yang tampil nama alias pendek ('Ukuran'). Inilah trade-off
// inline: hemat satu baris, tapi pesan error lebih bertele-tele.


// ------------------------------------------------------------------
// (3) const PADA OBJECT — SAMA POLA DENGAN ARRAY (FILE 3)
//
// const mengunci VARIABEL, bukan isi: property boleh diubah,
// mengganti seluruh object tidak boleh.
//
// CATATAN hasil verifikasi (beda nyata yang menarik): kunci const
// ini DITEGAKKAN RUNTIME oleh Node — kalau dipaksa, program crash
// TypeError. Bandingkan ReadonlyArray (file 4) yang kuncinya cuma
// di compiler. Jadi: const = kunci compile-time + runtime;
// readonly = kunci compile-time saja.
// ------------------------------------------------------------------

const teh: { nama: string } = { nama: "Es Teh" };
teh.nama = "Es Jeruk"; // ✅ ubah isi — boleh
console.log(teh.nama); // Es Jeruk

// teh = { nama: "Teh Panas" };
// ❌ ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'teh' because it is a constant.
//    (kalau dipaksa dijalankan pun Node menolak:
//     TypeError: Assignment to constant variable)


// ------------------------------------------------------------------
// (4) NESTED OBJECT — OBJECT DI DALAM OBJECT
//
// Bentuknya bisa bersarang: property bertipe object lain (inline
// juga). Aksesnya bertitik berantai — persis mengakses field class
// model yang bersarang di Dart (nota.item.qty).
// ------------------------------------------------------------------

const nota: { kasir: string; item: { nama: string; qty: number } } = {
    kasir: "Fauzi",
    item: { nama: "Kopi Susu", qty: 2 },
};

console.log(nota.kasir);     // Fauzi
console.log(nota.item);      // { nama: 'Kopi Susu', qty: 2 }
console.log(nota.item.nama); // Kopi Susu
console.log(nota.item.qty);  // 2

// console.log(nota.item.diskon);
// ❌ ERROR kalau di-uncomment — nested pun diperiksa sampai ke dalam:
//    error TS2339: Property 'diskon' does not exist on type
//    '{ nama: string; qty: number; }'.


// ------------------------------------------------------------------
// (5) ARRAY OF OBJECT + KAPAN INLINE VS ALIAS
//
// Gabungan file 3 + file ini: array yang tiap elemennya object:
//     { nama: string; harga: number }[]
//
// PEDOMAN memilih (ringkasan praktis file 9 vs file 11):
// - INLINE  : bentuk PENDEK dan dipakai SEKALI (satu variabel) —
//             contoh di file ini. PDF: "lebih sederhana".
// - ALIAS   : dipakai BERULANG (variabel + parameter + return),
//             bentuk panjang, atau nested — cukup ditulis sekali,
//             error-nya menyebut nama pendek (file 10).
//
// Menyusul: Optional Properties (file 12, hlm. 60-62) — attribute
// object yang boleh tidak diisi (tanda ?).
// ------------------------------------------------------------------

const daftarMenu: { nama: string; harga: number }[] = [
    { nama: "Kopi Susu", harga: 18000 },
    { nama: "Es Teh", harga: 8000 },
];

console.log(daftarMenu.length);  // 2
console.log(daftarMenu[0].nama); // Kopi Susu   (elemen → object → titik)
console.log(daftarMenu[1].harga); // 8000

// Property bertipe union inline juga bisa (file 7 + 10 bekerja di sini):
const kaos: { ukuran: "kecil" | "besar" } = { ukuran: "besar" };
console.log(kaos.ukuran); // besar


// ========================================
// RANGKUMAN
// ========================================
// 1. Object type INLINE: bentuk tipe ditulis langsung di variabel —
//    const kopi: { nama: string; harga: number } = {...}.
//    PDF: lebih sederhana untuk kasus sekali pakai.
// 2. Object literal ≈ instance class model Dart TANPA class/ctor/new.
//    Akses isi pakai titik, persis field Dart.
// 3. Perilaku: baca/ubah property ada ✅; akses & TAMBAH property
//    yang tidak ada ❌ TS2339. Bentuk object KAKU (beda Map Dart yang
//    bebas nambah key).
// 4. Pesan error inline MENGEJA bentuknya panjang; alias menampilkan
//    nama pendek (file 10) — pertimbangan memilih alias.
// 5. const object ≈ const array (file 3): isi boleh ubah, reassign
//    TS2588. BEDA NYATA: const ditegakkan RUNTIME Node (TypeError);
//    readonly cuma compile-time (file 4).
// 6. Nested object: property bertipe object; akses bertitik berantai;
//    pemeriksaan sampai ke dalam.
// 7. Array of object: { nama: string; harga: number }[].
//    Inline untuk pendek+sekali pakai; alias untuk berulang/panjang.
//
// Cara menjalankan file ini:  npx tsx src/11_object_type.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat variabel pegawai dengan tipe inline { nama: string;
//    gaji: number }, isi bebas, cetak object-nya dan gajinya.
//
//    JAWABAN:
const pegawai: { nama: string; gaji: number } = { nama: "Slamet", gaji: 3500000 };
console.log(pegawai);      // { nama: 'Slamet', gaji: 3500000 }
console.log(pegawai.gaji); // 3500000

// 2. Buat nested object pengiriman: { penerima: string; alamat:
//    { kota: string; kodePos: number } } — cetak kota dan kode pos
//    dengan akses bertitik berantai.
//
//    JAWABAN:
const pengiriman: { penerima: string; alamat: { kota: string; kodePos: number } } = {
    penerima: "Azka",
    alamat: { kota: "Bandung", kodePos: 40286 },
};
console.log(pengiriman.alamat.kota);    // Bandung
console.log(pengiriman.alamat.kodePos); // 40286

// 3. Eksperimen TS2339 + pesan panjang: uncomment baris
//    `console.log(kopi.stok)` di sub-section (2), jalankan
//    `npx tsc --noEmit`, bandingkan panjang pesannya dengan error
//    file 10 yang menyebut 'Ukuran' — lalu comment-kan kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/11_object_type.tsx:52:18
//    error TS2339: Property 'stok' does not exist on type
//    '{ nama: string; harga: number; }'.
//    ---------------------------------------------------------------
//    Perhatikan: karena tipenya inline (tanpa nama), compiler
//    MENGEJA seluruh bentuknya '{ nama: string; harga: number; }'.
//    Kalau bentuk ini dipakai di 5 tempat, setiap error mengeja
//    panjang begini — inilah alasan praktis pakai alias (file 9)
//    begitu bentuknya dipakai berulang.
