// ========================================
// INTERSECTION TYPES
// ========================================
// (PDF "TypeScript Dasar" hlm. 94-96: Intersection Types,
//  Kode : Intersection Types)
// Materi sebelumnya: file 15-20 (seri interface). Ini pasangan
// penutup: cara menggabungkan tipe TANPA extends.


// ------------------------------------------------------------------
// (1) & = DAN — GABUNG KONTRAK, KEBALIKAN DARI UNION
//
// PDF hlm. 95: Intersection adalah cara membuat tipe data baru
// dengan MENGGABUNGKAN dua tipe data lain, memakai kata kunci &
// (dan). Cara membacanya: object harus memenuhi kontrak yang SATU
// DAN kontrak yang SATUNYA LAGI — SEMUA-nya sekaligus:
//
//     type Orang = PunyaNama & PunyaUmur;   ← nama DAN umur wajib
//
// Bandingkan dengan union (file 7): `string | number` = salah
// SATU anggota (ATAU). Intersection adalah kebalikannya: SEMUA
// (DAN). Dua-duanya operator tipe, bedanya arah: | melebarkan
// pilihan nilai, & menumpuk tuntutan.
//
// Jika di Dart seperti ini: tidak ada operator penggabung tipe —
// cara resmi menggabungkan kontrak adalah `class Orang implements
// PunyaNama, PunyaUmur` (terverifikasi dart analyze). Detail di
// sub-section (2).
//
// Urutan & tidak penting: PunyaNama & PunyaUmur sama dengan
// PunyaUmur & PunyaNama (DAN itu komutatif — seperti matematika).
// ------------------------------------------------------------------

type PunyaNama = { nama: string };
type PunyaUmur = { umur: number };

type Orang = PunyaNama & PunyaUmur;

const o: Orang = { nama: "Fauzi", umur: 30 };   // DUA-DUANYA wajib
console.log(o.nama, o.umur);   // Fauzi 30

const oBalik: PunyaUmur & PunyaNama = { nama: "Azka", umur: 20 };
console.log(oBalik.nama, oBalik.umur);   // Azka 20

const salingIsi: Orang = oBalik;   // ✅ urutan beda, tetap saling isi
console.log(salingIsi.nama);       // Azka

// Tiga tipe sekaligus + campur type alias dengan interface (file 15)
// — method pun ikut digabung (pola file 20):
interface BisaTerbang {
    terbang(): string;
}

type Hero = PunyaNama & PunyaUmur & BisaTerbang;

const tony: Hero = {
    nama: "Iron Man",
    umur: 50,
    terbang() { return "wush"; },
};
console.log(tony.nama, tony.umur, tony.terbang());   // Iron Man 50 wush


// ------------------------------------------------------------------
// (2) KAPAN DIPAKAI? SAAT EXTENDS TIDAK BISA — DART HARUS TULIS ULANG
//
// PDF hlm. 95: "sangat cocok ketika kita tidak bisa melakukan
// extends pada Interface". File 19 sub-section (3) sudah buktikan
// interface bisa extends banyak — jadi kapan & unggul? Tiga situasi
// nyatanya:
//
//   a. GABUNG DI TEMPAT (inline) — langsung di annotation, tanpa
//      perlu mendeklarasikan tipe baru:
//          function proses(data: PunyaNama & PunyaUmur) { ... }
//   b. MENGHASILKAN TYPE ALIAS — extends hanya dimiliki interface;
//      & bekerja untuk semuanya termasuk type alias
//   c. MENGGABUNG TIPE non-object (union — lihat sub-section 5)
//
// PERBEDAAN NYATA (terverifikasi dart analyze): gabungan kontrak
// Dart `class Orang implements PunyaNama, PunyaUmur` WAJIB
// menulis ulang SEMUA anggota (kalau tidak: error "Missing concrete
// implementations of 'getter PunyaUmur.umur' and 'setter
// PunyaUmur.umur'"). Intersection TS tidak menulis ulang apa pun —
// cukup sebut nama tipenya dengan &.
// ------------------------------------------------------------------

function perkenalan(data: PunyaNama & PunyaUmur): string {
    // gabung langsung di parameter — tanpa deklarasi tipe baru
    return `${data.nama}, ${data.umur} tahun`;
}

console.log(perkenalan({ nama: "Budi", umur: 25 }));   // Budi, 25 tahun


// ------------------------------------------------------------------
// (3) PENJAGA KONTRAK — PERHATIKAN KODENYA BERBEDA!
//
// Kurang property pada intersection menghasilkan TS2322 — BUKAN
// TS2741 seperti type alias (file 9) dan extends (file 19).
// Pesannya dua tingkat: tipe object tidak cocok, lalu elaborasi
// menunjuk SISI mana yang kurang. Kelebihan property tetap TS2353,
// salah tipe tetap TS2322.
// ------------------------------------------------------------------

// const kurang: Orang = { nama: "X" };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '{ nama: string; }' is not assignable to
//    type 'Orang'.
//      Property 'umur' is missing in type '{ nama: string; }' but
//      required in type 'PunyaUmur'.
//    (bandingkan file 19: kurang attribute extends = TS2741.
//     Intersection mengecek penugasan KESELURUHAN tipe gabungan →
//     TS2322, dengan elaborasi menunjuk sisi yang bolong)

// const aneh: Orang = { nama: "X", umur: 1, tinggi: 2 };
// ❌ ERROR kalau di-uncomment:
//    error TS2353: Object literal may only specify known properties,
//    and 'tinggi' does not exist in type 'Orang'.

// const salahTipe: Orang = { nama: "X", umur: "tiga" };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'number'.


// ------------------------------------------------------------------
// (4) PROPERTY SAMA-NAMA: MENYEMPIT SAH, KONFLIK → never
//
// Kalau kedua sisi punya property dengan NAMA SAMA, hasilnya
// perlu diperhatikan:
//
//   optional & wajib  → WAJIB (menyempit — sama arah dengan
//                       override child di file 19)
//   string & number   → never (konflik total)
//
// never = tipe KOSONG: tidak ada satu nilai pun yang bisa jadi
// string DAN number sekaligus. Konsep baru — muncul alami di sini
// karena & yang konflik memang tak punya jawaban. Nilainya tidak
// akan pernah ada, compiler menolak SEMUA nilai yang dicoba.
// (Kemiripan untuk pembaca Dart: Dart punya Never — juga tipe
// "tak punya nilai"; bedanya Never Dart muncul lewat konsep
// lanjutan, di TS never bisa muncul sesederhana & yang konflik.)
// ------------------------------------------------------------------

type MungkinAlamat = { alamat?: string };
type PastiAlamat = { alamat: string };

type PelangganKomplit = MungkinAlamat & PastiAlamat;

const pc: PelangganKomplit = { alamat: "Bandung" };   // alamat WAJIB
console.log(pc.alamat);   // Bandung

// const pcSalah: PelangganKomplit = {};
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '{}' is not assignable to type
//    'PelangganKomplit'.
//      Property 'alamat' is missing in type '{}' but required in
//      type 'PastiAlamat'.
//    (elaborasi menunjuk PastiAlamat — sisi yang menuntut wajib)

// Konflik total: level diminta string DI SATU SISI dan number di
// sisi lain — tidak ada nilai yang memenuhi keduanya:
type Bentrok = { level: string } & { level: number };

// const b: Bentrok = { level: "tinggi" };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'never'.
//    (level: string & number = never — tipe kosong. "tinggi"
//    string gagal, 5 number juga akan gagal: tidak ADA nilai yang
//    lolos. Perbaikannya bukan mencari nilai ajaib — pisahkan
//    property yang konflik, atau gabungkan dengan nama berbeda)


// ------------------------------------------------------------------
// (5) & SAMPAI KE UNION: HASILNYA IRISAN — DAN FAKTA CEPAT LAIN
//
// Perilaku "DAN" konsisten sampai ke union (file 7): union & union
// = anggota yang ADA DI KEDUANYA (irisan) — bukan gabungan!
//
//     (string | number) & (number | boolean)
//      = number          ← satu-satunya anggota yang dua-duanya
//                          punya
//
// Analogi dua kantong belanja: | menyatukan isi dua kantong —
// silakan ambil barang dari mana pun (asal ada di salah satu).
// & hanya mengambil barang yang ada DI KEDUA kantong sekaligus.
// Matematika himpunan persis: gabungan vs irisan.
//
// FAKTA CEPAT:
//   - readonly di SALAH SATU sisi → hasil tetap readonly (TS2540
//     menjaga — pola file 16)
//   - primitif & primitif beda → never (string & number tidak ada
//     nilainya — kasus Bentrok di atas, versi primitif)
// ------------------------------------------------------------------

type Angka = (string | number) & (number | boolean);   // = number

const nilaiTepat: Angka = 5;    // ✅ number anggota kedua union
console.log(nilaiTepat);        // 5

// const salahAngka: Angka = "lima";
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'string' is not assignable to type 'number'.
//    ("lima" cuma anggota union pertama — irisan hanya number)

// readonly dari satu sisi & tetap menjaga:
type KunciId = { readonly id: number };
type Berlabel = { label: string };
type Item = KunciId & Berlabel;

const item: Item = { id: 1, label: "satu" };
console.log(item.id, item.label);   // 1 satu

// item.id = 99;
// ❌ ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to 'id' because it is a read-only
//    property.
//    (readonly dari satu sisi cukup untuk mengunci hasil gabungan)


// ========================================
// RANGKUMAN
// ========================================
// 1. Intersection = tipe baru dari MENGGABUNG dua tipe dengan &
//    (PDF hlm. 95). Dibaca DAN: kontrak semua sisi wajib terpenuhi
//    — kebalikan union | (ATAU) yang melebarkan pilihan.
// 2. Urutan & bebas (DAN komutatif); boleh tiga tipe sekaligus
//    dan campur type alias + interface + method (file 20).
// 3. Dipakai saat extends tidak bisa/tidak praktis: gabung INLINE
//    di parameter, hasil berupa type alias, atau menggabung
//    union. PERBEDAAN NYATA: gabungan kontrak Dart (implements
//    A, B) wajib menulis ulang semua anggota — & tidak menulis
//    apa pun.
// 4. KURANG PROPERTY = TS2322 (bukan TS2741 seperti file 9/19!) —
//    pesan dua tingkat, elaborasi menunjuk sisi yang bolong.
//    Kelebihan tetap TS2353, salah tipe tetap TS2322.
// 5. Property sama-nama: optional & wajib → WAJIB (menyempit,
//    searah file 19); tipe konflik (string & number) → never —
//    tipe KOSONG yang menolak semua nilai.
// 6. union & union = IRISAN anggota (bukan gabungan): (string |
//    number) & (number | boolean) = number. Primitif beda & →
//    never juga.
// 7. readonly dari SALAH SATU sisi & sudah mengunci hasil
//    (TS2540).
//
// Cara menjalankan file ini:  npx tsx src/21_intersection_types.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat type PunyaEmail = { email: string } dan PunyaTelepon =
//    { telepon: string }, lalu type Kontak gabungannya. Buat
//    object kontak lengkap dan cetak email serta teleponnya.
//
//    JAWABAN:
type PunyaEmail = { email: string };
type PunyaTelepon = { telepon: string };

type Kontak = PunyaEmail & PunyaTelepon;

const kontakKantor: Kontak = { email: "info@kantor.id", telepon: "022-123" };
console.log(kontakKantor.email, kontakKantor.telepon);
// info@kantor.id 022-123

// 2. Ramal dulu, baru cek: apa tipe hasil
//    (string | number) & (string | boolean)? Nilai mana yang sah:
//    "teks", 7, atau true?
//
//    JAWABAN:
type IrisanTeks = (string | number) & (string | boolean);   // = string

const cek1: IrisanTeks = "teks";   // ✅ string anggota kedua union
console.log(cek1);                 // teks
// Irisannya = string (anggota yang ADA DI KEDUA union). Jadi:
// "teks" ✅ sah; 7 ❌ (number hanya di union pertama); true ❌
// (boolean hanya di union kedua) — dua-duanya akan ditolak TS2322
// karena tidak assignable ke string.

// 3. Eksperimen beda kode: uncomment `const kurang: Orang = ...`
//    di sub-section (3), jalankan `npx tsc --noEmit` — perhatikan
//    kodenya TS2322. Bandingkan dengan extends di file 19 yang
//    kurang attribute parent → TS2741. Kenapa intersection
//    memilih TS2322?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/21_intersection_types.tsx:105:7
//    error TS2322: Type '{ nama: string; }' is not assignable to
//    type 'Orang'.
//      Property 'umur' is missing in type '{ nama: string; }' but
//      required in type 'PunyaUmur'.
//    ---------------------------------------------------------------
//    Karena jalur pengecekannya beda: extends (file 19) memeriksa
//    DAFTAR ATTRIBUTE milik satu interface utuh — satu attribute
//    hilang cukup dilaporkan sebagai "attribute kurang" (TS2741).
//    Intersection memeriksa PENUGASAN ke tipe GABUNGAN: object
//    '{ nama }' dinilai tidak cocok dengan keseluruhan Orang
//    (TS2322 — penugasan gagal), lalu elaborasinya menjelaskan
//    sisi mana yang membuatnya gagal ('umur' ... 'PunyaUmur').
//    Kode atasannya beda, informasinya tetap lengkap — dan biasa
//    terlihat juga di array/object bertipe gabungan.
