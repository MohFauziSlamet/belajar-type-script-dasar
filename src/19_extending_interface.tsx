// ========================================
// EXTENDING INTERFACE
// ========================================
// (PDF "TypeScript Dasar" hlm. 86-89: Extending Interface,
//  Kode : Employee, Kode : Extending Interface)
// Materi sebelumnya: file 15-18 (interface, readonly, function
// interface, indexable). Ini janji file 15: cerita lengkap
// "interface mudah dikembangkan".


// ------------------------------------------------------------------
// (1) EXTENDS — WARISAN ATTRIBUTE OTOMATIS
//
// PDF hlm. 87: interface bisa melanjutkan (extends) ke interface
// lain; secara OTOMATIS attribute interface yang dilanjutkan
// dimiliki juga oleh interface tersebut — memudahkan membuat tipe
// data kompleks.
//
//     interface Pegawai {
//         nama: string;
//     }
//     interface Manager extends Pegawai {   ← Manager "mewarisi" nama
//         divisi: string;
//     }
//
// Jika di Dart seperti ini:
//     class Pegawai {
//       String nama = '';
//     }
//     class Manager extends Pegawai {       ← warisan class Dart
//       String divisi = '';
//     }
// di TypeScript jadi seperti ini: SAMA persis semangatnya — kata
// kuncinya pun sama: extends. Bedanya cuma benda yang diwarisi:
// Dart mewarisi field + behavior dari class; interface TS hanya
// mewarisi KONTRAK attribute (ingat file 15: interface tidak
// berwujud saat program berjalan).
//
// Warisan bisa BERANTAI — cucu punya semua milik kakek. extends
// juga bisa menuju TYPE ALIAS berbentuk object (file 9) — bukan
// cuma interface.
// ------------------------------------------------------------------

interface Pegawai {
    nama: string;
}

interface Manager extends Pegawai {
    divisi: string;
}

const m: Manager = { nama: "Fauzi", divisi: "IT" };   // DUA-DUANYA wajib
console.log(m.nama);    // Fauzi   ← milik parent, langsung ada
console.log(m.divisi);  // IT

// Berantai: A3 mewarisi A2 yang mewarisi A1:
interface A1 { a: string; }
interface A2 extends A1 { b: string; }
interface A3 extends A2 { c: string; }

const tiga: A3 = { a: "a", b: "b", c: "c" };   // kakek-cucu semua ada
console.log(tiga.a, tiga.b, tiga.c);   // a b c

// Extends ke type alias object juga sah:
type DasarAlias = { kode: string; };
interface TurunanAlias extends DasarAlias {
    extra: number;
}
const ta: TurunanAlias = { kode: "Y", extra: 1 };
console.log(ta.kode, ta.extra);   // Y 1

// Attribute parent yang hilang tetap ditangkap — TS2741:
// const kurang: Manager = { divisi: "IT" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'nama' is missing in type
//    '{ divisi: string; }' but required in type 'Manager'.
//    (extends menambah kontrak, bukan mengganti — nama tetap wajib)


// ------------------------------------------------------------------
// (2) ARAH PENUGASAN: TURUN AMAN, NAIK DITOLAK
//
// Aturan structural typing (file 15) berlaku juga pada warisan:
//   child → parent  ✅ (Manager punya SEMUA yang Pegawai butuhkan)
//   parent → child  ❌ (Pegawai tidak punya divisi — kontrak Manager
//                      tidak terpenuhi)
//
// Jika di Dart seperti ini: Manager adalah Pegawai (is-a) —
// `Pegawai p = manager;` selalu aman; arah baliknya butuh cast.
// di TypeScript jadi seperti ini: sama — hanya saja alasannya
// "bentuk tidak lengkap", bukan "salah keturunan".
// ------------------------------------------------------------------

const p: Pegawai = m;    // ✅ turun: Manager ⊇ Pegawai
console.log(p.nama);     // Fauzi

// const salahArah: Manager = p;
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'divisi' is missing in type 'Pegawai'
//    but required in type 'Manager'.


// ------------------------------------------------------------------
// (3) EXTENDS BANYAK SEKALIGUS — PERBEDAAN NYATA DENGAN DART
//
// TypeScript: satu interface boleh extends BANYAK interface
// sekaligus, dipisah koma. Semua attribute mengalir semua.
//
// PERBEDAAN NYATA (hasil verifikasi dart analyze): Dart MENOLAK
// `class Manager extends Pegawai, Berbahasa` dengan error:
//    "Each class definition can have at most one extends clause.
//     Try choosing one superclass and define your class to
//     implement (or mix in) the others."
// Dart hanya mengizinkan SATU extends — untuk banyak "kontrak"
// Dart pakai implements A, B (itu pun harus menulis ulang semua
// anggotanya). Interface TS menggabungkan begitu saja — tanpa
// perlu syarat tambahan.
// ------------------------------------------------------------------

interface Berbahasa {
    bahasa: string;
}

interface Manager2 extends Pegawai, Berbahasa {
    divisi: string;
}

const m2: Manager2 = { nama: "Azka", divisi: "HR", bahasa: "ID" };
console.log(m2.nama, m2.divisi, m2.bahasa);   // Azka HR ID


// ------------------------------------------------------------------
// (4) ATURAN OVERRIDE: MENYEMPIT BOLEH, MELEBAR DITOLAK
//
// Child boleh MENULIS ULANG attribute parent (override deklarasi)
// dengan satu syarat arah: tipe child harus KOMPATIBEL — boleh
// MENYEMPIT, tidak boleh MELEBAR atau berganti total.
//
//   optional parent → WAJIB di child        ✅ menyempit (boleh)
//   WAJIB parent → optional di child        ❌ melebar (TS2430)
//   string parent → number di child         ❌ ganti total (TS2430)
//
// Jika di Dart seperti ini: aturan override field Dart sama arah!
// Menyempit `String? alamat` → `String alamat` diterima; melebar
// `String nama` → `String? nama` DITOLAK dart analyze dengan
// "invalid_override: 'Melebar.nama' ('String? Function()') isn't
// a valid override of 'Pegawai.nama' ('String Function()')".
// Kali ini dua bahasa SEIMBANG — beda kodenya saja (TS2430 vs
// invalid_override).
// ------------------------------------------------------------------

interface Profil {
    alamat?: string;    // optional di parent
}

interface ProfilLengkap extends Profil {
    alamat: string;     // wajib di child — MENYEMPIT: boleh!
}

const pl: ProfilLengkap = { alamat: "Bandung" };   // alamat tak boleh kosong
console.log(pl.alamat);   // Bandung

// interface Salah extends Pegawai {
//     nama: number;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2430: Interface 'Salah' incorrectly extends interface
//    'Pegawai'.
//      Types of property 'nama' are incompatible.
//        Type 'number' is not assignable to type 'string'.
//    (nama sudah string di parent — number adalah penggantian total)

// interface WajibKecil extends ProfilLengkap {
//     alamat?: string;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2430: Interface 'WajibKecil' incorrectly extends
//    interface 'ProfilLengkap'.
//      Types of property 'alamat' are incompatible.
//        Type 'string | undefined' is not assignable to type 'string'.
//          Type 'undefined' is not assignable to type 'string'.
//    (melebar janji: parent menjamin SELALU string, child mau
//    bolong — compiler menolak janji yang melemah)


// ------------------------------------------------------------------
// (5) FAKTA UNIK: readonly BISA DILEPAS CHILD — DAN BATAS EXTENDS
//
// FAKTA UNIK (terverifikasi): child boleh menulis ulang attribute
// readonly parent TANPA readonly — dan lewat child, mutasi
// BENERAN LOLOS! Paralel persis dengan "view escape" file 16:
// readonly itu penanda per-TAMPILAN, bukan penanda object.
// (Analogi: kunci nama di parent, tapi anak pegang salinan kunci.)
//
// Batas extends yang dijaga compiler — semuanya klaim terverifikasi:
//   extends PRIMITIVE (string)        → TS2840
//   extends alias UNION              → TS2312
//   extends BERKELILING (A→B→A)      → TS2310
// ------------------------------------------------------------------

interface Kunci {
    readonly id: number;     // terkunci di parent
}

interface KunciAnak extends Kunci {
    id: number;              // ditulis ulang TANPA readonly — sah!
    label: string;
}

const ka: KunciAnak = { id: 7, label: "tujuh" };
ka.id = 8;                   // ✅ lolos — lewat child tidak terkunci
console.log(ka.id);          // 8

const kp: Kunci = ka;        // child → parent tetap aman (arah turun)
console.log(kp.id);          // 8   ← nilainya memang berubah

// kp.id = 9;
// ❌ ERROR kalau di-uncomment:
//    error TS2540: Cannot assign to 'id' because it is a read-only
//    property.
//    (via TAMPILAN parent, id tetap terkunci — object sama,
//    penjagaan beda per tampilan)

// interface Ngaco extends string { }
// ❌ ERROR kalau di-uncomment:
//    error TS2840: An interface cannot extend a primitive type like
//    'string'. It can only extend other named object types.

// type UnionAlias = string | number;
// interface DariUnion extends UnionAlias { }
// ❌ ERROR kalau di-uncomment:
//    error TS2312: An interface can only extend an object type or
//    intersection of object types with statically known members.

// interface Siklus1 extends Siklus2 { a: string; }
// interface Siklus2 extends Siklus1 { b: string; }
// ❌ ERROR kalau di-uncomment:
//    error TS2310: Type 'Siklus1' recursively references itself as
//    a base type.
//    (muncul di KEDUA baris — warisan melingkar tidak masuk akal:
//    A butuh B yang butuh A)


// ========================================
// RANGKUMAN
// ========================================
// 1. interface Anak extends Parent — attribute parent otomatis
//    dimiliki child (PDF hlm. 87). Object literal wajib memenuhi
//    KEDUA kontrak: kurang attribute parent → TS2741.
// 2. Warisan bisa BERANTAI (cucu dapat semua) dan menuju type
//    alias object pun bisa.
// 3. Arah penugasan: child → parent ✅ (bentuk lebih lengkap);
//    parent → child ❌ TS2741 (bentuk kurang). Sama semangatnya
//    dengan is-a di Dart.
// 4. EXTENDS BANYAK dengan koma — PERBEDAAN NYATA: Dart menolak
//    multi-extends ("at most one extends clause"), harus pakai
//    implements A, B. Interface TS menggabung langsung.
// 5. Override deklarasi satu arah: MENYEMPIT boleh (optional→wajib),
//    MELEBAR/ganti tipe → TS2430 (pesan bertingkat sampai akar).
//    Dart paralel: covariant diterima, melebar → invalid_override.
// 6. FAKTA UNIK: readonly bisa DILEPAS child — mutasi lewat child
//    lolos, lewat tampilan parent tetap TS2540. Object sama,
//    penjagaan per tampilan (paralel view escape file 16).
// 7. Batas extends: primitive → TS2840, union alias → TS2312,
//    warisan melingkar → TS2310 (di kedua baris).
//
// Cara menjalankan file ini:  npx tsx src/19_extending_interface.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface Person { nama: string; alamat?: string }, lalu
//    interface Student extends Person { nim: string }. Buat dua
//    student — satu dengan alamat, satu tanpa — cetak keduanya.
//
//    JAWABAN:
interface Person {
    nama: string;
    alamat?: string;   // optional tetap optional di child (tidak
}                      // ditulis ulang = mewarisi apa adanya)
interface Student extends Person {
    nim: string;
}

const s1: Student = { nama: "Fauzi", alamat: "Bandung", nim: "2311001" };
const s2: Student = { nama: "Azka", nim: "2311002" };   // alamat kosong sah
console.log(s1);   // { nama: 'Fauzi', alamat: 'Bandung', nim: '2311001' }
console.log(s2);   // { nama: 'Azka', nim: '2311002' }

// 2. Ramal dulu, baru cek: apakah `interface Asisten extends Student,
//    Berbahasa { }` error di TypeScript? Dan `class Asisten extends
//    Student, Berbahasa` di Dart?
//
//    JAWABAN:
interface Asisten extends Student, Berbahasa { }   // campuran file + interface lain
const asl: Asisten = { nama: "Budi", nim: "2311003", bahasa: "id" };
console.log(asl);   // { nama: 'Budi', nim: '2311003', bahasa: 'id' }
// TS: TIDAK error — extends banyak dengan koma sah (sub-section 3).
// Dart: ERROR — "Each class definition can have at most one extends
// clause. Try choosing one superclass and define your class to
// implement (or mix in) the others." (terverifikasi dart analyze;
// konsepnya diganti dengan implements A, B).

// 3. Eksperimen error TS2430: uncomment interface Salah di
//    sub-section (4), jalankan `npx tsc --noEmit`, baca — lalu
//    comment-kan kembali. Pertanyaan: kenapa mengganti nama: string
//    menjadi nama: number ditolak, padahal di file 15 object boleh
//    punya attribute number?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/19_extending_interface.tsx:163:11
//    error TS2430: Interface 'Salah' incorrectly extends interface
//    'Pegawai'.
//      Types of property 'nama' are incompatible.
//        Type 'number' is not assignable to type 'string'.
//    ---------------------------------------------------------------
//    Karena extends itu JANJI KESINAMBUNGAN, bukan janji baru:
//    siapapun yang dijanjikan "bertipe Pegawai punya nama: string"
//    otomatis juga dijanjiki hal yang sama oleh Salah (child-nya).
//    Kalau Salah mengubah nama jadi number, dua janji itu
//    BERTENTANGAN — compiler menolak sebelum janjinya tersebar.
//    Object biasa (file 15) bebas karena tidak terikat janji parent.
