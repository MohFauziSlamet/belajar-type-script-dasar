// ========================================
// FUNCTION SEBAGAI PARAMETER (CALLBACK)
// ========================================
// (PDF "TypeScript Dasar" hlm. 111-115: Function Sebagai Parameter,
//  Kode : Function sebagai Parameter, Kode : Anonymous Function,
//  Kode : Arrow Function)
// Materi sebelumnya: file 23-25 (Function, Parameter, Overloading).
// Sekarang kita mempelajari cara menggunakan Function sebagai parameter
// (sering disebut Callback Function) di TypeScript.


// ------------------------------------------------------------------
// (1) INLINE FUNCTION PARAMETER & NAMED FUNCTION (DART VS TYPESCRIPT)
//
// PDF hlm. 112-113: Sama seperti di JavaScript, di TypeScript kita bisa
// menggunakan function sebagai parameter. Parameter bertipe function
// dideklarasikan dengan format tipe signature: `(param: Tipe) => ReturnType`.
//
// Jika di Dart seperti ini:
//     String sayHello(String name, String Function(String) filter) {
//         return 'Hello ${filter(name)}';
//     }
//     String toUpper(String name) => name.toUpperCase();
//     // Pemanggilan: sayHello('Eko', toUpper)
// di TypeScript jadi seperti ini:
//     function sayHello(name: string, filter: (name: string) => string): string {
//         return `Hello ${filter(name)}`;
//     }
//     function toUpper(name: string): string {
//         return name.toUpperCase();
//     }
//     // Pemanggilan: sayHello("Eko", toUpper)
//
// KEMIRIPAN BESAR:
// - Baik Dart maupun TypeScript memperlakukan fungsi sebagai *first-class citizen*
//   (fungsi dapat dikirim langsung sebagai argumen / named function).
//
// PERBEDAAN SINTAKS TIPE:
// - Dart: `ReturnType Function(ParamType)` (return type di depan).
// - TypeScript: `(param: Tipe) => ReturnType` (parameter di dalam kurung,
//   diikuti tanda panah `=>`, lalu return type di belakang).
// ------------------------------------------------------------------

function sayHello(name: string, filter: (name: string) => string): string {
    return `Hello ${filter(name)}`;
}

function toUpper(name: string): string {
    return name.toUpperCase();
}

console.log(sayHello("Eko", toUpper));     // Hello EKO


// ------------------------------------------------------------------
// (2) ANONYMOUS FUNCTION SEBAGAI CALLBACK
//
// PDF hlm. 114: Selain membuat named function terlebih dahulu, kita
// bisa membuat fungsi tanpa nama (*anonymous function*) langsung di
// tempat saat pemanggilan fungsi menggunakan kata kunci `function`.
//
// Jika di Dart seperti ini:
//     sayHello('Eko', (String name) {
//         return name.toUpperCase();
//     });
// di TypeScript jadi seperti ini:
//     sayHello("Eko", function (name: string): string {
//         return name.toUpperCase();
//     });
// ------------------------------------------------------------------

console.log(sayHello("Eko", function (name: string): string {
    return name.toUpperCase();
}));                                       // Hello EKO


// ------------------------------------------------------------------
// (3) ARROW FUNCTION & CONTEXTUAL TYPING (FAT ARROW)
//
// PDF hlm. 115: Gaya paling modern, bersih, dan ringkas di JavaScript/TypeScript
// adalah menggunakan *Arrow Function* (tanda panah `=>`).
//
// Jika di Dart seperti ini:
//     sayHello('Eko', (name) => name.toUpperCase());
// di TypeScript jadi seperti ini:
//     sayHello("Eko", (name) => name.toUpperCase());
//
// KEMIRIPAN BESAR:
// - Sintaks fat arrow `(param) => ekspresi` identik antara Dart dan TypeScript.
//
// KEISTIMEWAAN TYPESCRIPT: CONTEXTUAL TYPING
// Karena fungsi `sayHello` sudah mendeklarasikan bahwa parameter `filter`
// bertipe `(name: string) => string`, TypeScript secara otomatis tahu
// bahwa parameter `name` di dalam arrow function bertipe `string`.
// Kita TIDAK PERLU menulis tipe `(name: string)` secara berulang!
// ------------------------------------------------------------------

// Penulisan eksplisit dengan tipe:
console.log(sayHello("Eko", (name: string): string => name.toUpperCase())); // Hello EKO

// Penulisan ringkas dengan Contextual Typing (tipe tertebak otomatis):
console.log(sayHello("Eko", (name) => `MR. ${name.toUpperCase()}`));        // Hello MR. EKO


// ------------------------------------------------------------------
// (4) CALLBACK DENGAN RETURN TYPE VOID
//
// Sering kali callback digunakan untuk notifikasi atau tindakan yang
// tidak menghasilkan nilai kembalian (hanya menjalankan aksi).
//
// Jika di Dart seperti ini:
//     void jalankanAksi(String pesan, void Function(String) onDone) {
//         onDone(pesan);
//     }
// di TypeScript jadi seperti ini:
//     function jalankanAksi(pesan: string, onDone: (teks: string) => void): void {
//         onDone(pesan);
//     }
// ------------------------------------------------------------------

function jalankanAksi(pesan: string, onDone: (teks: string) => void): void {
    onDone(pesan);
}

jalankanAksi("Data berhasil disimpan", (t) => console.log(`[INFO] ${t}`));
// [INFO] Data berhasil disimpan


// ------------------------------------------------------------------
// (5) TYPE SAFETY PADA CALLBACK (TS2345)
//
// TypeScript melindungi callback agar kontrak parameter dan return value
// tidak dilanggar oleh pemanggil.
// ------------------------------------------------------------------

// const errBukanFn = sayHello("Eko", "toUpper");
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'string' is not assignable to
//    parameter of type '(name: string) => string'.

// const errParam = sayHello("Eko", (n: number) => "halo");
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type '(n: number) => string' is not assignable to
//    parameter of type '(name: string) => string'.
//      Types of parameters 'n' and 'name' are incompatible.
//        Type 'string' is not assignable to type 'number'.

// const errReturn = sayHello("Eko", (n: string) => 123);
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type '(n: string) => number' is not assignable to
//    parameter of type '(name: string) => string'.
//      Type 'number' is not assignable to type 'string'.


// ========================================
// RANGKUMAN
// ========================================
// 1. Function dapat digunakan sebagai parameter (callback) dengan mendeklarasikan
//    signature tipenya: `(param: Tipe) => ReturnType` (PDF hlm. 112).
// 2. KEMIRIPAN DENGAN DART: Kedua bahasa memperlakukan function sebagai first-class citizen.
// 3. PERBEDAAN SINTAKS TIPE: Dart menggunakan `ReturnType Function(ParamType)`,
//    sedangkan TypeScript menggunakan `(param: Tipe) => ReturnType`.
// 4. Tiga cara mengirim callback:
//    - Named function: `sayHello("Eko", toUpper)`
//    - Anonymous function: `sayHello("Eko", function (name) { ... })`
//    - Arrow function: `sayHello("Eko", (name) => ...)`
// 5. Contextual Typing: TypeScript secara cerdas menyimpulkan tipe parameter callback
//    secara otomatis dari deklarasi fungsi penerimanya.
// 6. Callback bertipe `void` (`(teks: string) => void`) digunakan untuk aksi/efek samping.
// 7. Type Safety (TS2345): TypeScript menolak argumen non-fungsi, tipe parameter callback
//    yang salah, maupun tipe return callback yang tidak cocok.
//
// Cara menjalankan file ini:  npx tsx src/26_function_as_parameter.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat function `prosesNomor(angka: number, transform: (val: number) => number): number`
//    yang mengembalikan hasil dari pemanggilan fungsi `transform`.
//    Panggil dengan arrow function kuadrat `(x) => x * x` dan penambah 10 `(x) => x + 10`.
//    Cetak hasilnya ke konsol.
//
//    JAWABAN:
function prosesNomor(angka: number, transform: (val: number) => number): number {
    return transform(angka);
}

console.log(prosesNomor(5, (x) => x * x));     // 25
console.log(prosesNomor(5, (x) => x + 10));    // 15

// 2. Ramal dulu, baru cek: Mengapa pada kode `sayHello("Eko", (name) => name.toUpperCase())`,
//    kita tidak perlu menulis `(name: string)` dan compiler tidak menganggap `name` bertipe `any`?
//
//    JAWABAN:
//    Karena fitur Contextual Typing di TypeScript: compiler melihat tipe parameter `filter`
//    pada deklarasi `sayHello(name: string, filter: (name: string) => string)`.
//    Dari konteks tersebut, TypeScript sudah mengetahui bahwa parameter pertama dari `filter`
//    pasti bertipe `string`, sehingga tipe `name` disimpulkan otomatis sebagai `string`.

// 3. Eksperimen error TS2345: uncomment baris `const errParam = sayHello("Eko", (n: number) => "halo");`
//    di sub-section (5), jalankan `npx tsc --noEmit`, baca pesannya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/26_function_as_parameter.tsx:141:34
//    error TS2345: Argument of type '(n: number) => string' is not assignable to parameter of type '(name: string) => string'.
//      Types of parameters 'n' and 'name' are incompatible.
//        Type 'string' is not assignable to type 'number'.
//    ---------------------------------------------------------------
//    Penjelasan: Fungsi `sayHello` menjanjikan mengirimkan argumen `string` ke dalam filter,
//    tetapi callback yang dikirim justru mengharapkan parameter bertipe `number`.
