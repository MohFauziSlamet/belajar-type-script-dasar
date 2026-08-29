// ========================================
// FUNCTION DI INTERFACE
// ========================================
// (PDF "TypeScript Dasar" hlm. 90-93: Function di Interface,
//  Kode : Interface Person, Kode : Function di Interface)
// Materi sebelumnya: file 15-19 (seri interface). JANGAN tertukar
// dengan file 17 (Function INTERFACES — interface yang SELURUHNYA
// bentuk function). File ini: interface object biasa yang SALAH
// SATU attribute-nya berupa function (method).


// ------------------------------------------------------------------
// (1) METHOD SEBAGAI ATTRIBUTE — DUA GAYA PENULISAN
//
// PDF hlm. 91: implementasi Interface di JavaScript sebenarnya
// adalah OBJECT — dan di JavaScript, object bisa punya function
// sebagai attribute. Jadi interface pun bisa mendeklarasikan
// attribute bertipe function. Dua gaya penulisan, makna SAMA:
//
//     interface Person {
//         sapa(): string;        ← gaya 1: method signature
//         sapa: () => string;    ← gaya 2: property + panah
//     }
//
// Jika di Dart seperti ini:
//     class Person {
//       String nama;
//       Person(this.nama);
//       String sapa() => 'Halo, saya $nama';   ← method class
//     }
// di TypeScript jadi seperti ini: interface mendeklarasikan
// "harus ada attribute sapa yang bisa DIPANGGIL dan mengembalikan
// string" — implementasinya tinggal menulis function-nya di object
// literal. Dua-duanya method dalam semangat Dart; bedanya method
// TS benar-benar disimpan sebagai ATTRIBUTE berisi function
// (bukti di sub-section 5).
//
// Gaya implementasinya juga bebas: method shorthand `sapa() {...}`
// atau arrow `sapa: () => ...` — boleh campur apa pun dengan gaya
// deklarasinya (terverifikasi keempat kombinasi).
// ------------------------------------------------------------------

interface Person {
    nama: string;
    sapa(): string;    // method signature (gaya 1)
}

const budi: Person = {
    nama: "Budi",
    sapa() {           // method shorthand — natural seperti Dart
        return `Halo, saya ${this.nama}`;
    },
};

console.log(budi.sapa());   // Halo, saya Budi

// Gaya 2: property bertipe function (panah) — makna sama:
interface Person2 {
    nama: string;
    sapa: () => string;
}

const budi2: Person2 = {
    nama: "Budi",
    sapa: () => "Halo!",
};

console.log(budi2.sapa());   // Halo!

// Kombinasi keempat — deklarasi panah + implementasi shorthand:
const budi3: Person2 = { nama: "Budi", sapa() { return "Hai!"; } };
console.log(budi3.sapa());   // Hai!


// ------------------------------------------------------------------
// (2) METHOD DENGAN PARAMETER — ANOTASI TIDAK PERLU
//
// Seperti file 17: saat mengisi, tipe parameter DIBACA dari
// interface (contextual typing) — `hitung(a, b)` tanpa anotasi
// sudah aman. Function biasa sejak file 1 memang selalu ditulis
// dengan anotasi penuh — di sini interface yang menganotasi
// untuk kita.
// ------------------------------------------------------------------

interface Kalkulator {
    hitung(a: number, b: number): number;
}

const kalkulatorKita: Kalkulator = {
    hitung(a, b) {         // a dan b otomatis number — dari interface
        return a + b;
    },
};

console.log(kalkulatorKita.hitung(2, 3));   // 5


// ------------------------------------------------------------------
// (3) EXTENDS + METHOD — WARISAN BERGERAK BARENG
//
// Method ikut mengalir lewat extends (file 19): parent menjanjikan
// method, child menambah attribute — object literal memenuhi keduanya.
//
// Bonus: method juga bisa OPTIONAL dengan ? (pola file 12) —
// dipanggil dengan ?. seperti property optional.
// ------------------------------------------------------------------

interface Hewan {
    suara(): string;
}

interface Kucing extends Hewan {
    nama: string;
}

const miaw: Kucing = { nama: "Mimi", suara() { return "Meong"; } };
console.log(miaw.nama, miaw.suara());   // Mimi Meong

interface Tamu {
    nama: string;
    greet?(): void;      // method optional
}

const tamu: Tamu = { nama: "Vivi" };   // tanpa greet — sah
console.log(tamu.nama);                // Vivi
tamu.greet?.();                        // aman: greet kosong → tidak dipanggil

// tamu.greet();
// ❌ ERROR kalau di-uncomment:
//    error TS2722: Cannot invoke an object which is possibly
//    'undefined'.
//    (method optional = mungkin tidak ada; memanggil sesuatu yang
//    mungkin undefined ditahan — pakai ?. seperti di atas)


// ------------------------------------------------------------------
// (4) PENJAGA KONTRAK — KELUARGA ERROR YANG SUDAH KENAL
//
// Method dijaga persis attribute biasa: kurang = TS2741, asing =
// TS2353, panggil yang tak ada = TS2339. Yang spesifik method:
// return salah → TS2322 yang isinya BENTUK FUNCTION-nya; parameter
// implementasi lebih banyak → TS2322 "Target signature provides
// too few arguments" (pola file 17 berlaku juga di sini; parameter
// LEBIH SEDIKIT justru boleh — argumen berlebih diabaikan).
// ------------------------------------------------------------------

// const salah: Person = { nama: "X" };
// ❌ ERROR kalau di-uncomment:
//    error TS2741: Property 'sapa' is missing in type
//    '{ nama: string; }' but required in type 'Person'.
//    (method = attribute WAJIB — harus diimplementasikan)

// const aneh: Person = {
//     nama: "X",
//     sapa() { return "a"; },
//     lompat() { return "b"; },
// };
// ❌ ERROR kalau di-uncomment:
//    error TS2353: Object literal may only specify known properties,
//    and 'lompat' does not exist in type 'Person'.
//    (method asing sama ditolaknya dengan attribute asing)

// const salahReturn: Person = { nama: "X", sapa() { return 123; } };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '() => number' is not assignable to type
//    '() => string'.
//      Type 'number' is not assignable to type 'string'.
//    (dibaca sebagai bentuk function: kembalian number ≠ string)

// const lebihParam: Kalkulator = {
//     hitung(a: number, b: number, c: number) { return a; },
// };
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type '(a: number, b: number, c: number) => number'
//    is not assignable to type '(a: number, b: number) => number'.
//      Target signature provides too few arguments. Expected 3 or
//      more, but got 2.
//    (implementasi butuh 3 argumen, kontrak cuma menyediakan 2)

// console.log(budi.sapa(123));
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 0 arguments, but got 1.

// console.log(budi.lompat());
// ❌ ERROR kalau di-uncomment:
//    error TS2339: Property 'lompat' does not exist on type 'Person'.


// ------------------------------------------------------------------
// (5) PERBEDAAN NYATA: METHOD ADALAH ATTRIBUTE BIASA — BISA
// DIGANTI DAN BISA DILEPAS (BEDA DENGAN DART)
//
// Dua fakta yang membuat method TS berbeda dari method Dart:
//
// FAKTA 1 — BISA DIGANTI: method (yang tidak readonly) bebas
// di-reassign dengan function baru, kapan pun. Dart MENOLAK dengan
// error "Methods can't be assigned a value." (terverifikasi
// dart analyze: assignment_to_method). Di Dart method menempel pada
// CLASS; di TS method hanyalah isi attribute object.
//
// FAKTA 2 — BISA DILEPAS, TAPI this-nya TERTINGGAL: menulis
// `budi2.sapa` TANPA kurung mengambil function-nya sebagai nilai
// (≈ tear-off Dart `budi.sapa`). TAPI hasil verifikasi menunjukkan
// perilaku berbeda: dipanggil lewat variabel, `this` TIDAK ikut.
// Tear-off Dart justru MENGIKAT instancenya (bound method): hasilnya
// tetap "Halo, saya Budi" (terverifikasi dart run).
//
// Jadi: kalau method TIDAK memakai this, lepas-pasang aman; kalau
// method memakai this — panggil lewat object-nya (`budi.sapa()`),
// jangan lewat variabel lepas (akibatnya ada di bawah).
// ------------------------------------------------------------------

budi2.sapa = () => "Halo baru!";      // ✅ mengganti method — sah
console.log(budi2.sapa());            // Halo baru!

const lepas = budi2.sapa;             // tear-off (tanpa kurung)
console.log(lepas());                 // Halo baru!  ← aman: isinya
                                      // tidak memakai this

// Bukti this yang tertinggal — method ber-this (budi.sapa memakai
// this.nama) dilepas lalu dipanggil:
// const terlepas = budi.sapa;
// console.log(terlepas());
// ❌ RUNTIME ERROR kalau di-uncomment (compiler TIDAK menangkap —
//    tsc tetap bersih! this adalah urusan runtime, bukan tipe):
//    TypeError: Cannot read properties of undefined (reading 'nama')
//    (this lepas dari object asalnya → this.nama mencari nama di
//    "tempat kosong". Catatan: hasil persisnya bisa beda antar
//    environment JS — di project ini (strict mode JavaScript, karena
//    file berformat module — BEDA dari strict: true di tsconfig)
//    berhenti dengan TypeError; di mode lama non-strict this jadi
//    object global dan nama terbaca undefined. Intinya sama: this
//    TIDAK ikut.)
console.log(budi.sapa());             // Halo, saya Budi ← dipanggil
                                      // lewat object: this benar


// ========================================
// RANGKUMAN
// ========================================
// 1. Interface boleh punya METHOD sebagai attribute (PDF hlm. 91 —
//    implementasi interface adalah object, dan object JS bisa
//    menyimpan function). Dua gaya deklarasi sama makna:
//    `sapa(): string` atau `sapa: () => string`.
// 2. Gaya implementasi bebas (shorthand / arrow) dan boleh campur
//    dengan gaya deklarasi — keempat kombinasi sah. Parameter
//    implementasi tidak perlu anotasi (contextual typing, file 17).
// 3. Bukan file 17! File 17 = interface yang SELURUHNYA bentuk
//    function (call signature); file ini = interface object biasa
//    dengan method sebagai SALAH SATU attribute.
// 4. Method ikut warisan extends (file 19), dan bisa optional
//    `greet?(): void` → panggil dengan `greet?.()`; langsung
//    `greet()` → TS2722 "Cannot invoke an object which is possibly
//    'undefined'".
// 5. Penjaga kontrak keluarga lama: kurang TS2741, asing TS2353,
//    tak ada TS2339, argumen salah jumlah TS2554. Khusus method:
//    return salah → TS2322 yang menampilkan BENTUK function-nya;
//    param implementasi lebih banyak → TS2322 "Target signature
//    provides too few arguments" (lebih sedikit boleh — file 17).
// 6. PERBEDAAN NYATA #1: method bisa DI-REASSIGN runtime (Dart:
//    error assignment_to_method "Methods can't be assigned a
//    value."). Method TS = isi attribute, bukan bagian class.
// 7. PERBEDAAN NYATA #2: tear-off `obj.sapa` melepaskan this —
//    method ber-this yang dipanggil lepas berhenti dengan runtime
//    TypeError (compiler tidak menangkap — this urusan runtime);
//    tear-off Dart MENGIKAT instance (bound method, hasil tetap
//    benar). Method tanpa this aman dilepas; method ber-this
//    panggil lewat object-nya.
//
// Cara menjalankan file ini:  npx tsx src/20_function_in_interface.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat interface Peliharaan { nama: string; suara(): string }
//    dan buat 2 peliharaan dengan suara berbeda. Cetak nama dan
//    suaranya masing-masing.
//
//    JAWABAN:
interface Peliharaan {
    nama: string;
    suara(): string;
}

const anjing: Peliharaan = { nama: "Blacky", suara() { return "Guk guk"; } };
const kucing2: Peliharaan = { nama: "Momo", suara: () => "Meong meong" };
console.log(anjing.nama, anjing.suara());   // Blacky Guk guk
console.log(kucing2.nama, kucing2.suara()); // Momo Meong meong

// 2. Ramal dulu, baru cek: apa hasil `const f = anjing.suara;
//    console.log(f());` — error atau jalan? Kalau jalan, apa
//    hasilnya? Dan apa bedanya dengan versi Dart `final f =
//    anjing.suara; print(f());` kalau suara() memakai this.nama?
//
//    JAWABAN:
const f = anjing.suara;
console.log(f());   // Guk guk  ← jalan, hasil benar
// Jalan karena suara() TIDAK memakai this — this yang lepas tidak
// berpengaruh (sub-section 5). Kalau suara() memakai this.nama,
// versi TS BERHENTI dengan runtime error "TypeError: Cannot read
// properties of undefined (reading 'nama')" (this tertinggal,
// compiler tidak menangkap), sedangkan versi Dart tetap benar —
// tear-off Dart mengikat instance (bound method, terverifikasi
// dart run).

// 3. Eksperimen error TS2741: uncomment `const salah: Person = ...`
//    di sub-section (4), jalankan `npx tsc --noEmit`, baca — lalu
//    comment-kan kembali. Pertanyaan: pesan error-nya sama persis
//    dengan attribute biasa yang kurang (file 15) — menurutmu
//    kenapa method tidak diperlakukan istimewa?
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/20_function_in_interface.tsx:147:7
//    error TS2741: Property 'sapa' is missing in type
//    '{ nama: string; }' but required in type 'Person'.
//    ---------------------------------------------------------------
//    Karena di TypeScript method MEMANG attribute biasa — yang
//    membedakan cuma isinya bertipe function (sub-section 5 buktikan:
//    bisa diganti, bisa dilepas). Kontraknya satu keluarga: wajib
//    diisi, salah tipe ditolak, nama asing ditolak. Dart memisahkan
//    field dan method secara tajam di class; TypeScript menyatukan
//    keduanya sebagai "attribute dengan tipe berbeda".
