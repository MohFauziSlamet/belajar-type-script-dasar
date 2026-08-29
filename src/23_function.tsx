// ========================================
// FUNCTION
// ========================================
// (PDF "TypeScript Dasar" hlm. 101-103: Function, Kode : Say Hello Function)
// Materi sebelumnya: file 15-22 (Interface & Tipe Lanjutan).
// Sekarang kita memasuki Bagian 4: Function — diawali dari dasar
// pembuatan function, parameter bertipe, return type, dan void.


// ------------------------------------------------------------------
// (1) DEKLARASI FUNCTION & POSISI TIPE (DART VS TYPESCRIPT)
//
// PDF hlm. 102: sama seperti JavaScript, TypeScript mendukung
// pembuatan function. Perbedaannya: di TypeScript kita menentukan
// tipe data pada parameter dan tipe data return value-nya.
//
// Jika di Dart seperti ini:
//     String sayHello(String name) {
//         return 'Hello $name';
//     }
// di TypeScript jadi seperti ini:
//     function sayHello(name: string): string {
//         return `Hello ${name}`;
//     }
//
// PERBEDAAN SINTAKS:
// 1. Dart meletakkan return type DI DEPAN nama function (`String sayHello`).
//    TypeScript meletakkan return type DI BELAKANG kurung parameter (`): string`).
// 2. TypeScript menggunakan kata kunci `function` untuk function reguler
//    (Dart tidak membutuhkan kata kunci khusus).
// 3. Tipe parameter ditulis SETELAH nama parameter dengan titik dua (`name: string`),
//    sedangkan Dart menulis tipe DI DEPAN nama parameter (`String name`).
// ------------------------------------------------------------------

function sayHello(name: string): string {
    return `Hello ${name}`;
}

console.log(sayHello("Fauzi"));   // Hello Fauzi

// Function dengan banyak parameter:
function hitungTotal(harga: number, jumlah: number): number {
    return harga * jumlah;
}

console.log(hitungTotal(15000, 3));   // 45000


// ------------------------------------------------------------------
// (2) KONTRAK RETURN VALUE & PENJAGA TS2322 / TS2355
//
// Tipe kembalian setelah kurung `): ReturnType` adalah KONTRAK.
// Compiler menjaga dua hal:
//   1. Nilai yang di-return HARUS cocok dengan tipe yang dijanjikan (TS2322).
//   2. Jika dijanjikan mengembalikan nilai (bukan void/undefined),
//      function WAJIB memiliki statement `return` (TS2355).
// ------------------------------------------------------------------

// function formatKodeSalah(kode: string): string {
//     return 1001;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'number' is not assignable to type 'string'.
//    (menjanjikan string tapi me-return number)

// function hitungPajak(nilai: number): number {
//     const tarif = 0.11;
//     const pajak = nilai * tarif;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2355: A function whose declared type is neither
//    'undefined', 'void', nor 'any' must return a value.
//    (menjanjikan return number, tetapi lupa menulis `return pajak;`)


// ------------------------------------------------------------------
// (3) FUNCTION TANPA KEMBALIAN (void) & PERILAKU RUNTIME
//
// PDF hlm. 102: jika function tidak mengembalikan value, kita bisa
// menggunakan tipe data `void`.
//
// Jika di Dart seperti ini:
//     void logPesan(String pesan) {
//         print('[LOG] $pesan');
//     }
// di TypeScript jadi seperti ini:
//     function logPesan(pesan: string): void {
//         console.log(`[LOG] ${pesan}`);
//     }
//
// PERBEDAAN NYATA (TypeScript vs JavaScript Runtime vs Dart):
// 1. Di JavaScript Runtime: function tanpa return sebenarnya
//    mengembalikan nilai `undefined` (terbukti di console.log bawah).
// 2. Di TypeScript Compiler: return type `void` menjaga agar hasil
//    function TIDAK digunakan sebagai nilai (misal di-assign ke string
//    akan memicu TS2322).
// 3. Di Dart: `dart analyze` langsung menolak keras penggunaan nilai
//    ekspresi bertipe void dengan error `use_of_void_result`.
// ------------------------------------------------------------------

function logPesan(pesan: string): void {
    console.log(`[LOG] ${pesan}`);
}

logPesan("Transaksi berhasil");   // [LOG] Transaksi berhasil

// Menangkap hasil function void:
const hasilLog: void = logPesan("Selesai");   // [LOG] Selesai
console.log(typeof hasilLog);   // undefined   ← runtime mengembalikan undefined

// const teks: string = logPesan("tes");
// ❌ ERROR kalau di-uncomment:
//    error TS2322: Type 'void' is not assignable to type 'string'.
//    (compiler menjaga nilai void agar tidak salah digunakan)


// ------------------------------------------------------------------
// (4) INFERENSI RETURN TYPE (TYPE INFERENCE PADA FUNCTION)
//
// Jika kita TIDAK menuliskan return type secara eksplisit,
// TypeScript secara cerdas dapat MENEBAK (menginferensi) tipe kembalian
// dari ekspresi `return` di dalam function:
// ------------------------------------------------------------------

function kali(a: number, b: number) {
    // TypeScript menginferensi return type function ini sebagai: number
    return a * b;
}

const hasilKali = kali(4, 5);
console.log(hasilKali);   // 20

// Walau type inference bekerja sangat baik, BEST PRACTICE di TypeScript:
// SELALU tuliskan return type secara eksplisit (`: number`).
// Alasan:
//   1. Self-documenting: pembaca kode langsung tahu output tanpa membaca isi body.
//   2. Penjaga kontrak: jika tidak sengaja me-return tipe salah di dalam body,
//      compiler langsung memperingatkan di baris return tersebut.


// ------------------------------------------------------------------
// (5) PENJAGA JUMLAH & TIPE ARGUMEN (TS2554 & TS2345)
//
// Di JavaScript biasa, mengirim argumen kurang akan menghasilkan `undefined`,
// dan mengirim argumen berlebih diabaikan begitu saja tanpa error.
//
// Di TypeScript, compiler menerapkan pemeriksaan ketat (strict arity):
// jumlah dan tipe argumen yang dikirim WAJIB PERSIS dengan parameter!
// ------------------------------------------------------------------

// const errKurang = hitungTotal(5000);
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 2 arguments, but got 1.

// const errLebih = hitungTotal(5000, 2, 10);
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 2 arguments, but got 3.

// const errTipe = hitungTotal("5000", 2);
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'string' is not assignable to
//    parameter of type 'number'.

// CATATAN: Kebutuhan parameter opsional (?), default value,
// dan rest parameter (...) akan dibahas tuntas di materi berikutnya
// (file 24: Function Parameter).


// ========================================
// RANGKUMAN
// ========================================
// 1. Deklarasi function di TypeScript menggunakan kata kunci `function`
//    dengan tipe parameter dan return type ditulis di belakang (`name: string): string`).
// 2. Berbeda dari Dart yang meletakkan tipe di depan (`String sapa(String nama)`),
//    TypeScript meletakkan tipe setelah nama identifier (`function sapa(nama: string): string`).
// 3. Return type adalah KONTRAK: tipe nilai kembalian yang tidak cocok
//    memicu TS2322, dan lupa me-return nilai memicu TS2355.
// 4. Function tanpa return value menggunakan tipe `void` (PDF hlm. 102).
// 5. PERBEDAAN NYATA: di runtime JS, function void mengembalikan `undefined`
//    (`typeof hasilLog` adalah `"undefined"`), namun compiler TS melarang
//    penugasan hasilnya ke tipe data lain (TS2322).
// 6. Type inference pada function dapat menebak return type secara otomatis,
//    namun menulis return type secara eksplisit adalah best practice.
// 7. TypeScript memeriksa jumlah argumen secara ketat: argumen kurang/lebih
//    memicu TS2554, dan salah tipe argumen memicu TS2345.
//
// Cara menjalankan file ini:  npx tsx src/23_function.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat function `hitungDiskon(harga: number, persenDiskon: number): number`
//    yang mengembalikan harga setelah dipotong diskon.
//    Panggil dengan harga 100000 dan diskon 20%, lalu cetak hasilnya.
//
//    JAWABAN:
function hitungDiskon(harga: number, persenDiskon: number): number {
    return harga - (harga * persenDiskon / 100);
}

console.log(hitungDiskon(100000, 20));   // 80000

// 2. Ramal dulu, baru cek: Apa yang dicetak oleh kode di bawah ini?
//    Dan apa perbedaannya dengan sistem tipe Dart jika variabel hasil
//    void dicoba untuk digunakan/dicetak?
//
//    JAWABAN:
function cetakStruk(item: string): void {
    console.log(`Struk: ${item}`);
}

const hasilStruk = cetakStruk("Kopi");   // Struk: Kopi
console.log(typeof hasilStruk);          // undefined

// Penjelasan: Di TypeScript/JS runtime, function void menghasilkan nilai
// `undefined`. Sedangkan di Dart, compiler (`dart analyze`) melarang
// penggunaan nilai dari fungsi void dengan error `use_of_void_result`:
// "This expression has a type of 'void' so its value can't be used."

// 3. Eksperimen error TS2355: uncomment baris fungsi `hitungPajak` di sub-section (2),
//    jalankan `npx tsc --noEmit`, perhatikan pesan errornya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/23_function.tsx:66:38
//    error TS2355: A function whose declared type is neither
//    'undefined', 'void', nor 'any' must return a value.
//    ---------------------------------------------------------------
//    Penjelasan: Karena declared return type adalah `number` (bukan undefined,
//    void, atau any), TypeScript mewajibkan ada jalur `return` yang
//    mengembalikan nilai bertipe number di dalam body function.
