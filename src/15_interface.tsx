// ========================================
// INTERFACE
// ========================================
// (PDF "TypeScript Dasar" hlm. 73-76: Interface, Kode Interface,
//  Kode Menggunakan Interface)
// Materi sebelumnya: file 14 (null dan undefined) — Bagian 2 selesai,
// ini file pertama Bagian 3.


// ------------------------------------------------------------------
// (1) DEKLARASI INTERFACE — CARA LAIN SELAIN TYPE
//
// PDF hlm. 74: interface adalah cara lain melakukan deklarasi data
// selain menggunakan Type. Bentuknya hampir sama dengan type alias
// (file 9) — bedanya TANPA tanda sama dengan:
//
//     type Pelanggan = {          ← file 9: pakai = (type alias)
//         nama: string;
//     };
//
//     interface Pelanggan {       ← interface: TANPA =
//         nama: string;
//     }
//
// Jika di Dart seperti ini:
//     class Pelanggan {
//       String nama;
//       String? alamat;
//       Pelanggan(this.nama, [this.alamat]);
//     }
//     Pelanggan p1 = Pelanggan('Fauzi');   ← class = kontrak tipe
// di TypeScript jadi seperti ini: interface = kontrak tipe TANPA
// constructor, TANPA logika — murni "bentuk data". Pembuatannya
// langsung object literal, tidak ada `new`. (Anggap saja class Dart
// yang hanya menyimpan field — semua kemiripan file 11 berlaku.)
// ------------------------------------------------------------------

interface Pelanggan {
    nama: string;
    alamat?: string;   // optional — aturan file 12 berlaku juga di sini
}

const p1: Pelanggan = { nama: "Fauzi" };
console.log(p1);        // { nama: 'Fauzi' }
console.log(p1.nama);   // Fauzi
console.log(p1.alamat); // undefined   (optional tidak diisi)

const p2: Pelanggan = { nama: "Azka", alamat: "Bandung" };
console.log(p2.alamat); // Bandung


// ------------------------------------------------------------------
// (2) MENGGUNAKAN INTERFACE — FUNCTION, LITERAL, DAN BISA DIUBAH
//
// PDF hlm. 76: interface dipakai seperti type alias — sebagai tipe
// parameter, variabel, dan return. Property-nya BISA DIUBAH
// (mutable) — penanda readonly menyusul di materi berikutnya
// (hlm. 77-78).
// ------------------------------------------------------------------

function sapaPelanggan(p: Pelanggan): string {
    // p.alamat optional → amankan dengan pola file 12
    return p.alamat ? `${p.nama} dari ${p.alamat}` : p.nama;
}

console.log(sapaPelanggan(p2));                 // Azka dari Bandung
console.log(sapaPelanggan({ nama: "Budi" }));   // Budi   ← literal langsung

// Property bebas diubah (belum ada readonly):
p1.nama = "Fauzi A.";
console.log(p1.nama);   // Fauzi A.


// ------------------------------------------------------------------
// (3) PENJAGA KONTRAK YANG SAMA PERSIS DENGAN TYPE ALIAS
//
// Semua penjaga file 9 dan file 11 aktif juga di interface —
// ganti `type` jadi `interface`, error-nya tidak berubah:
// ------------------------------------------------------------------

// const salah: Pelanggan = { alamat: "Bandung" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'nama' is missing in type
//    '{ alamat: string; }' but required in type 'Pelanggan'.
//    (attribute wajib tetap wajib)

// const aneh: Pelanggan = { nama: "X", tinggi: 1 };
// ❌ ERROR kalau di-uncomment:
//    error TS2353: Object literal may only specify known properties,
//    and 'tinggi' does not exist in type 'Pelanggan'.
//    (attribute asing ditolak)

// const bedaTipe: Pelanggan = { nama: 123 };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (tipe harus cocok)


// ------------------------------------------------------------------
// (4) PERBEDAAN NYATA #1: COCOK BENTUK, BUKAN COCOK NAMA
//
// Jika di Dart seperti ini:
//     class Orang {
//       String nama;
//       String? alamat;
//       Orang(this.nama, [this.alamat]);
//     }
//     Orang o = p1;   // ❌ ERROR — Dart melihat NAMA class-nya
//                     // beda; harus implements Orang dulu
// di TypeScript jadi seperti ini: BOLEH — yang dicek BENTUKNYA,
// bukan namanya. Selama property-nya cocok, object diterima
// interface mana pun. (Nama konsepnya: structural typing —
// "kalau bentuknya bebek, berarti bebek".)
// ------------------------------------------------------------------

interface Orang {
    nama: string;
    alamat?: string;
}

const orangBaru: Orang = p1;   // ✅ tidak error — bentuknya cocok
console.log(orangBaru);        // { nama: 'Fauzi A.' }  ← object yang
                               // SAMA dengan p1 (lihat mutasi di (2))

// Dengan type alias pun sama — interface dan type saling menerima
// selama bentuknya cocok:
type Manusia = { nama: string; alamat?: string; };

const manusia: Manusia = p2;   // ✅ juga tidak error
console.log(manusia);          // { nama: 'Azka', alamat: 'Bandung' }


// ------------------------------------------------------------------
// (5) PERBEDAAN NYATA #2: HILANG DI JAVASCRIPT + BISA DIGABUNG
//
// PDF hlm. 74: "Interface bisa dikembangkan dengan mudah
// dibanding dengan Type". Dua bukti konkret:
//
// BUKTI A — interface HILANG di JavaScript. Beda dengan enum
// (file 13) yang menjadi object di JS, interface murni penanda
// compile-time: setelah dikompilasi, jejaknya tidak ada.
//
// BUKTI B — interface boleh DITULIS ULANG dengan nama sama:
// anggotanya DIGABUNG (declaration merging). Type alias malah
// error duplicate. Inilah dasar "mudah dikembangkan" — cerita
// lengkapnya di materi Extending Interface nanti.
// ------------------------------------------------------------------

// BUKTI A — pakai interface seolah-object/value:
// console.log(Pelanggan);
// ❌ ERROR kalau di-uncomment:
//    error TS2693: 'Pelanggan' only refers to a type, but is
//    being used as a value here.
//    (interface cuma TIPENYA — tidak punya wujud saat program
//    berjalan, beda dengan enum file 13 yang jadi object)

// BUKTI B — dua deklarasi nama sama → digabung jadi satu:
interface Pengguna {
    nama: string;
}

interface Pengguna {
    umur: number;   // menambah anggota pada interface yang sama
}

const penggunaBaru: Pengguna = { nama: "Cici", umur: 20 }; // ✅ dua-duanya
console.log(penggunaBaru);   // { nama: 'Cici', umur: 20 }

// const penggunaKurang: Pengguna = { nama: "Yuni" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'umur' is missing in type
//    '{ nama: string; }' but required in type 'Pengguna'.
//    (setelah digabung, umur jadi WAJIB — benar-benar satu kesatuan)

// Type alias TIDAK boleh nama sama:
// type Ganda = { a: string; };
// type Ganda = { b: string; };
// ❌ ERROR kalau di-uncomment:
//    error TS2300: Duplicate identifier 'Ganda'.
//    (muncul di KEDUA baris deklarasi — type alias tidak bisa digabung)


// ========================================
// RANGKUMAN
// ========================================
// 1. Interface = cara lain mendeklarasi tipe selain type alias
//    (hlm. 74). Beda tulisan: TANPA tanda = . Kontraknya sama:
//    TS2741 (kurang), TS2353 (lebih), TS2322 (salah tipe).
// 2. Untuk Dart developer: seperti class yang hanya berisi field
//    (kontrak tipe) — tapi tanpa constructor, tanpa new, buat
//    datanya langsung object literal (pola file 11).
// 3. Optional (?) dan semua pola aman file 12 berlaku juga di
//    interface. Property default-nya BISA diubah (readonly
//    menyusul di materi berikutnya, hlm. 77).
// 4. PERBEDAAN NYATA #1: yang dicek BENTUKNYA, bukan namanya
//    (structural typing) — object cocok masuk ke interface mana
//    pun. Di Dart, class beda tidak bisa saling menggantikan
//    tanpa implements.
// 5. PERBEDAAN NYATA #2: interface HILANG di JavaScript (TS2693
//    kalau dipakai sebagai value) — beda enum yang jadi object.
// 6. Interface boleh ditulis ulang nama sama → DIGABUNG; type
//    alias duplikat → TS2300. Inilah makna "mudah dikembangkan"
//    (hlm. 74) — lanjutannya di Extending Interface.
//
// Cara menjalankan file ini:  npx tsx src/15_interface.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface Produk { nama: string; harga: number; stok?: number }.
//    Buat function subTotal(p: Produk): number yang mengembalikan
//    harga × stok (stok kosong dihitung 1). Buat dua produk — satu
//    tanpa stok — lalu cetak subTotal keduanya.
//
//    JAWABAN:
interface Produk {
    nama: string;
    harga: number;
    stok?: number;
}

function subTotal(p: Produk): number {
    return p.harga * (p.stok ?? 1);   // ?? pola file 12/14
}

const pensil: Produk = { nama: "Pensil", harga: 2000, stok: 3 };
const buku: Produk = { nama: "Buku", harga: 5000 };  // tanpa stok → 1
console.log(pensil.nama, subTotal(pensil));  // Pensil 6000
console.log(buku.nama, subTotal(buku));      // Buku 5000

// 2. Bukti structural typing: buat interface Karyawan { nama: string }
//    lalu deklarasikan `const k: Karyawan = penggunaBaru;` (object
//    dari interface Pengguna di sub-section 5). Kenapa tidak error
//    padahal beda nama interface?
//
//    JAWABAN:
interface Karyawan {
    nama: string;
}

const k: Karyawan = penggunaBaru;  // ✅ tidak error
console.log(k);   // { nama: 'Cici', umur: 20 }
// Karena TypeScript mengecek BENTUK, bukan nama (structural
// typing): penggunaBaru punya nama: string → memenuhi kontrak
// Karyawan. Property lain (umur) tidak masalah — asal yang
// diminta kontrak terpenuhi. Di Dart ini ditolak kecuali
// class-nya eksplisit implements.

// 3. Eksperimen error TS2693: uncomment `console.log(Pelanggan);`
//    di sub-section (5), jalankan `npx tsc --noEmit`, baca
//    errornya — lalu comment-kan kembali. Pertanyaan: kenapa
//    enum (file 13) BOLEH `console.log(Status.Pending)` tapi
//    interface tidak boleh `console.log(Pelanggan)`?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/15_interface.tsx:150:13
//    error TS2693: 'Pelanggan' only refers to a type, but is
//    being used as a value here.
//    ---------------------------------------------------------------
//    Karena enum MENJADI object sungguhan saat program berjalan
//    (file 13: reverse mapping, Object.keys) — dia punya nilai
//    runtime. Interface TIDAK — dia murni catatan untuk compiler,
//    dihapus total saat dikompilasi ke JavaScript. Analogi: enum
//    seperti kartu member fisik (bisa ditunjuk), interface seperti
//    syarat & ketentuan (dibaca saat mendaftar, tidak berwujud).
