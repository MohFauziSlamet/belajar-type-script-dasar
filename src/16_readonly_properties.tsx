// ========================================
// READONLY PROPERTIES
// ========================================
// (PDF "TypeScript Dasar" hlm. 77-78: Readonly Properties)
// Materi sebelumnya: file 15 (interface) — di sana property masih
// BISA diubah; file ini menguncinya.


// ------------------------------------------------------------------
// (1) KATA KUNCI readonly — ATTRIBUTE TERKUNCI SETELAH DIBUAT
//
// PDF hlm. 77: property bisa dijadikan readonly = tidak bisa diubah
// lagi, dengan kata kunci readonly pada attribute-nya:
//
//     interface Akun {
//         readonly id: number;   ← readonly SEBELUM nama attribute
//         nama: string;
//     }
//
// Jika di Dart seperti ini:
//     class Akun {
//       final String id;        ← final: tidak bisa di-reassign
//       String nama;
//       Akun(this.id, this.nama);
//     }
// di TypeScript jadi seperti ini: readonly ≈ final field Dart —
// selesai dibuat, nilai itu dikunci. Dua hal yang TIDAK berubah:
// (a) nilai awalnya tetap WAJIB diisi saat pembuatan (readonly ≠
// boleh kosong — itu tugas ?, file 12); (b) cara bacanya biasa.
// ------------------------------------------------------------------

interface Akun {
    readonly id: number;
    nama: string;
}

const a1: Akun = { id: 1, nama: "Fauzi" };   // nilai awal: wajib & bebas
console.log(a1);      // { id: 1, nama: 'Fauzi' }
console.log(a1.id);   // 1   ← baca normal, tidak ada yang berubah


// ------------------------------------------------------------------
// (2) MENGUBAH READONLY → TS2540; TETANGGANYA BEBAS
//
// readonly bekerja PER-ATTRIBUTE, bukan per-object: yang ber-tanda
// dikunci, yang tidak ber-tanda tetap bebas diubah.
// ------------------------------------------------------------------

a1.nama = "Fauzi A.";   // ✅ nama tidak readonly — bebas
console.log(a1.nama);   // Fauzi A.

// a1.id = 100;
// ❌ ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to 'id' because it is a read-only
//    property.
//    (perhatikan ejaannya "read-only" pakai tanda hubung. Pesan ini
//    muncul saat menulis kode biasa, di function, maupun lewat
//    variabel lain yang bertipe Akun)

// readonly juga bisa di type alias (file 9) — penjaganya sama:
// type AkunAlias = { readonly id: number; };
// const ta: AkunAlias = { id: 7 };
// ta.id = 8;
// ❌ ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to 'id' because it is a read-only
//    property.
//    (readonly bukan milik eksklusif interface — type alias pun bisa)


// ------------------------------------------------------------------
// (3) const MENJAGA VARIABEL, readonly MENJAGA PROPERTY
//
// Dua kata yang mirip tapi beda sasaran — sering membingungkan:
//   const    = variabelnya tidak bisa DIGANTI SELURUHNYA
//              (dengan object BARU) — tapi ISINYA masih bebas!
//   readonly = property DI DALAM object yang tidak bisa diubah
//
// Jika di Dart seperti ini:
//     final p = Pelanggan();   // p tidak bisa diganti object baru
//     p.nama = 'X';            // ✅ tapi isi p masih bebas diubah
// di TypeScript jadi seperti ini: PERSIS SAMA. const TS menjaga
// binding seperti final Dart menjaga variabel p.
// ------------------------------------------------------------------

const pengaturan = { tema: "gelap" };
pengaturan.tema = "terang";       // ✅ boleh! const ≠ mengunci isi
console.log(pengaturan.tema);     // terang

// Yang dilarang const adalah MENGGANTI variabelnya:
const kunci = 1;
// kunci = 2;
// ❌ ERROR kalau di-uncomment:
//    error TS2588: Cannot assign to 'kunci' because it is a constant.

// Untuk mengunci ISI object, gunakan readonly (kembali ke Akun):
interface Preferensi {
    readonly bahasa: string;
}
const preferensi: Preferensi = { bahasa: "id" };
console.log(preferensi.bahasa);   // id
// preferensi.bahasa = "en";
// ❌ ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to 'bahasa' because it is a
//    read-only property.


// ------------------------------------------------------------------
// (4) PERBEDAAN NYATA: PENJAGA COMPILE-TIME SAJA
//
// Ini kelanjutan cerita structural typing (file 15). TS mengecek
// BENTUK — dan readonly TIDAK ikut diperiksa dalam pencocokan
// bentuk. Akibatnya: object readonly bisa "dilihat" lewat interface
// lain yang sama tapi tanpa readonly — dan lewat pintu itu,
// perubahan LOLOS:
//
// Jika di Dart seperti ini: final field Dart dijaga oleh NAMA
// class-nya (Dart menolak class asing) — tidak ada pintu keliling.
// di TypeScript jadi seperti ini: pintu kelilingnya ADA, karena
// interface hanya melihat bentuk.
//
// Ini sekeluarga dengan ReadonlyArray (file 4): dua-duanya penanda
// compile-time — beda List.unmodifiable() Dart yang benar-benar
// melempar error saat program berjalan.
// ------------------------------------------------------------------

interface AkunView {
    id: number;      // bentuk sama, TANPA readonly
}

const view: AkunView = a1;   // ✅ diterima — bentuknya cocok (file 15)
view.id = 99;                // ✅ tidak error — view.id tidak readonly!
console.log(a1.id);          // 99   ← a1.id ikut berubah! (object sama)

// Satu catatan lagi: readonly hanya menjaga SATU LAPIS. Kalau
// nilainya object, isi DI DALAMNYA tetap bisa diubah (shallow):
interface Profil {
    readonly alamat: { kota: string; };
}
const prof: Profil = { alamat: { kota: "Bandung" } };
prof.alamat.kota = "Surabaya";     // ✅ lolos — yang dikunci `alamat`,
console.log(prof.alamat.kota);     // Surabaya  bukan isinya (shallow)


// ========================================
// RANGKUMAN
// ========================================
// 1. readonly sebelum nama attribute → property tidak bisa diubah
//    SETELAH object dibuat (PDF hlm. 77). Nilai awal tetap WAJIB
//    diisi (readonly ≠ optional).
// 2. Pelanggaran → TS2540 "read-only property" (ejaan pakai tanda
//    hubung). Berlaku di interface dan type alias (pola yang sama
//    juga berlaku di parameter — belum didemokan di file ini).
// 3. readonly PER-ATTRIBUTE: tetangga tanpa readonly tetap bebas.
// 4. const menjaga VARIABEL (mengganti → TS2588); readonly menjaga
//    PROPERTY. PENTING: isi object const TETAP BISA diubah —
//    sama seperti final Dart yang menjaga binding, bukan isinya.
// 5. Dart: final field ≈ readonly property. PERBEDAAN NYATA:
//    readonly bisa diloloskan lewat interface bentuk-sama tanpa
//    readonly (bukti sub-section 4) — Dart tidak punya pintu itu.
// 6. readonly cuma menjaga SATU LAPIS (shallow) — isi object
//    nested masih bisa diubah.
// 7. Satu keluarga dengan ReadonlyArray (file 4): penanda
//    compile-time, bukan benteng runtime seperti
//    List.unmodifiable() Dart yang melempar error saat jalan.
//
// Cara menjalankan file ini:  npx tsx src/16_readonly_properties.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface Mahasiswa { readonly nim: string; nama: string }.
//    Buat function perbaruiNama(m: Mahasiswa, namaBaru: string): void
//    yang mengubah nama. Buat object, panggil function, cetak hasilnya.
//    (Pola nyata di dunia kerja: IDENTITAS seperti nim/id dikunci
//    readonly, data deskriptif bebas diperbarui.)
//
//    JAWABAN:
interface Mahasiswa {
    readonly nim: string;
    nama: string;
}

function perbaruiNama(m: Mahasiswa, namaBaru: string): void {
    m.nama = namaBaru;   // ✅ nama tidak readonly
}

const mhs: Mahasiswa = { nim: "2311001", nama: "Fauzi" };
perbaruiNama(mhs, "Fauzi Rahman");
console.log(mhs);   // { nim: '2311001', nama: 'Fauzi Rahman' }
                    // nim utuh, nama berubah

// 2. Ramal dulu, baru cek: apa hasil kode berikut?
//       const cfg = { url: "http://a" };
//       cfg.url = "http://b";
//       console.log(cfg.url);
//    Lalu kalau cfg diberi tipe { readonly url: string }, baris
//    mana yang error dan apa kodenya?
//
//    JAWABAN:
const cfg = { url: "http://a" };
cfg.url = "http://b";        // ✅ lolos — const menjaga variabel,
console.log(cfg.url);        // http://b   bukan isinya
// Dengan { readonly url: string }, yang error baris KEDUA
// (cfg.url = "http://b") dengan kode TS2540 — Cannot assign to
// 'url' because it is a read-only property. Kesimpulan: const ≠
// pengunci isi; untuk itu pakai readonly.

// 3. Eksperimen error TS2540: uncomment `a1.id = 100;` di
//    sub-section (2), jalankan `npx tsc --noEmit`, baca — lalu
//    comment-kan kembali. Pertanyaan: kalau readonly bisa
//    diloloskan lewat "view" seperti di sub-section (4), terus
//    readonly menjaga apa?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/16_readonly_properties.tsx:52:4
//    error TS2540: Cannot assign to 'id' because it is a read-only
//    property.
//    ---------------------------------------------------------------
//    readonly adalah KONTRAK KERJA TIM, bukan benteng keamanan:
//    ia menjaga saat programmer menulis kode biasa — compiler dan
//    IDE langsung menahan tangan (itu 99% kejadiannya sehari-hari).
//    Tapi ia bukan tembok runtime: lewat interface bentuk-sama tanpa
//    readonly, perubahan bisa lolos (sub-section 4) — akibat langsung
//    dari "TS mengecek bentuk, bukan nama" (file 15). Sama seperti
//    ReadonlyArray (file 4): penanda compile-time. Yang benar-benar
//    melempar error saat program berjalan hanyalah mekanisme runtime,
//    seperti List.unmodifiable() di Dart.
