// ========================================
// FUNCTION OVERLOADING
// ========================================
// (PDF "TypeScript Dasar" hlm. 108-110: Function Overloading,
//  Kode : Function Overloading)
// Materi sebelumnya: file 23-24 (Function Dasar & Function Parameter).
// Sekarang kita mempelajari Function Overloading — satu nama function
// dengan beberapa variasi parameter dan return type yang berbeda.


// ------------------------------------------------------------------
// (1) APA ITU FUNCTION OVERLOADING? (DART VS TYPESCRIPT)
//
// PDF hlm. 109: Function Overloading adalah kemampuan membuat Function
// dengan nama yang sama, namun dengan parameter input dan output yang berbeda.
//
// Jika di Dart seperti ini:
//     // Dart SAMA SEKALI TIDAK mendukung function overloading.
//     // Menulis nama function yang sama dua kali menghasilkan error compiler:
//     // error: The name 'callMe' is already defined. (duplicate_definition)
// di TypeScript jadi seperti ini:
//     // 1. Overload Signatures (deklarasi tanpa body)
//     function callMe(value: number): number;
//     function callMe(value: string): string;
//     // 2. Implementation Signature (deklarasi + body yang menyatukan semua tipe)
//     function callMe(value: any): any {
//         if (typeof value === "string") {
//             return value;
//         } else if (typeof value === "number") {
//             return value;
//         }
//     }
// ------------------------------------------------------------------

function callMe(value: number): number;
function callMe(value: string): string;
function callMe(value: any): any {
    if (typeof value === "string") {
        return value;
    } else if (typeof value === "number") {
        return value;
    }
}

console.log(callMe(100));     // 100
console.log(callMe("Eko"));   // Eko


// ------------------------------------------------------------------
// (2) OVERLOAD SIGNATURES VS IMPLEMENTATION SIGNATURE
//
// Anatomi Function Overloading terdiri dari dua bagian:
// 1. OVERLOAD SIGNATURES (publik):
//    Baris-baris function TANPA kurung kurawal `{}`.
//    Inilah kontrak resmi yang HANYA BOLEH dilihat dan dipanggil oleh luar.
//
// 2. IMPLEMENTATION SIGNATURE (internal):
//    Satu baris function yang LANGSUNG DIIKUTI oleh body `{ ... }`.
//    Parameter dan return type-nya harus mencakup (kompatibel dengan)
//    SEMUA overload signature di atasnya.
//
// ATURAN TS2394: Implementation signature WAJIB kompatibel dengan
// seluruh overload signatures!
// ------------------------------------------------------------------

// function prosesSalah(x: string): string;
// function prosesSalah(x: number): number {
//     return x;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2394: This overload signature is not compatible with its
//    implementation signature.
//    (overload meminta string, tetapi implementation hanya menerima number)


// ------------------------------------------------------------------
// (3) KEUNGGULAN OVERLOADING DIBANDINGKAN UNION BIASA
//
// Kenapa tidak cukup memakai Union Type biasa (`val: string | number`)?
//
// Jika HANYA memakai Union:
//     function prosesUnion(val: string | number): string | number { ... }
//     const hasil = prosesUnion("halo");   // Tipenya: string | number
//     // hasil.toUpperCase(); // ❌ TS2339 (harus dicek typeof lagi di luar!)
//
// Dengan FUNCTION OVERLOADING:
// Tipe kembalian TERKUNCI PERSIS mengikuti tipe parameter yang dikirim!
// ------------------------------------------------------------------

function proses(val: string): string;
function proses(val: number): number;
function proses(val: string | number): string | number {
    // Implementation signature juga bisa memakai union (lebih aman dari any)
    if (typeof val === "string") {
        return val.toUpperCase();
    }
    return val * 2;
}

const teks = proses("typescript");
console.log(teks);            // TYPESCRIPT
console.log(teks.length);     // 10   ← langsung bertipe string murni!

const angka = proses(25);
console.log(angka);           // 50
console.log(angka.toFixed(2)); // 50.00   ← langsung bertipe number murni!


// ------------------------------------------------------------------
// (4) OVERLOADING DENGAN JUMLAH PARAMETER BERBEDA (MULTI-ARITY)
//
// Overloading tidak hanya untuk beda tipe data, tapi juga bisa
// untuk JUMLAH parameter yang berbeda (misal 1 parameter vs 2 parameter).
//
// Di implementation signature, parameter tambahan dibuat opsional (?)
// agar kompatibel dengan overload yang jumlah parameternya lebih sedikit:
// ------------------------------------------------------------------

function hitungLuas(sisi: number): number;
function hitungLuas(panjang: number, lebar: number): number;
function hitungLuas(a: number, b?: number): number {
    if (b !== undefined) {
        return a * b;    // Luas persegi panjang (2 parameter)
    }
    return a * a;        // Luas persegi (1 parameter)
}

console.log(hitungLuas(5));      // 25   ← persegi (sisi x sisi)
console.log(hitungLuas(4, 6));   // 24   ← persegi panjang (panjang x lebar)


// ------------------------------------------------------------------
// (5) PENJAGA KEAMANAN: TS2769 (NO OVERLOAD MATCHES THIS CALL)
//
// Meskipun implementation signature menerima tipe yang luas (seperti `any`
// atau parameter opsional), pemanggil HANYA DIIZINKAN mengirim tipe yang
// terdaftar di Overload Signatures!
// ------------------------------------------------------------------

// const errBoolean = callMe(true);
// ❌ ERROR kalau di-uncomment:
//    error TS2769: No overload matches this call.
//      Overload 1 of 2, '(value: number): number', gave the following error.
//        Argument of type 'boolean' is not assignable to parameter of type 'number'.
//      Overload 2 of 2, '(value: string): string', gave the following error.
//        Argument of type 'boolean' is not assignable to parameter of type 'string'.

// const errLebihArg = hitungLuas(1, 2, 3);
// ❌ ERROR kalau di-uncomment:
//    error TS2554: Expected 1-2 arguments, but got 3.


// ========================================
// RANGKUMAN
// ========================================
// 1. Function Overloading memungkinkan satu nama function memiliki beberapa variasi
//    tipe parameter dan tipe return value (PDF hlm. 109).
// 2. PERBEDAAN NYATA DARI DART: Dart sama sekali TIDAK mendukung function overloading
//    (memicu error `duplicate_definition`). TypeScript mendukungnya via overload signatures.
// 3. Terdiri dari Overload Signatures (baris deklarasi tanpa body untuk publik)
//    dan satu Implementation Signature (berisi body yang menangani semua tipe).
// 4. Implementation signature WAJIB kompatibel dengan semua overload signatures (melanggar = TS2394).
// 5. Keunggulan utama dibanding Union biasa: hasil return value langsung memiliki
//    tipe spesifik (murni) sesuai input tanpa perlu pengecekan `typeof` lagi di luar.
// 6. Overloading dengan beda jumlah parameter menggunakan parameter opsional `?`
//    pada implementation signature.
// 7. Compiler menjaga keamanan pemanggilan: jika argumen tidak cocok dengan overload mana pun,
//    akan memicu error TS2769 ("No overload matches this call").
//
// Cara menjalankan file ini:  npx tsx src/25_function_overloading.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat function overloading `formatData(data: number): string` yang mengembalikan
//    "Rp <data>", dan `formatData(data: string): string` yang mengembalikan teks kapital.
//    Panggil dengan angka 50000 dan string "sukses", lalu cetak hasilnya.
//
//    JAWABAN:
function formatData(data: number): string;
function formatData(data: string): string;
function formatData(data: number | string): string {
    if (typeof data === "number") {
        return `Rp ${data}`;
    }
    return data.toUpperCase();
}

console.log(formatData(50000));     // Rp 50000
console.log(formatData("sukses"));  // SUKSES

// 2. Ramal dulu, baru cek: Mengapa kode di bawah ini langsung mengizinkan `teks.length`
//    dan `angka.toFixed(2)` tanpa komplain, sedangkan jika memakai union biasa
//    `val: string | number` akan memicu error `TS2339`?
//
//    JAWABAN:
//    Karena pada function overloading, TypeScript mengunci tipe return value
//    secara berpasangan dengan tipe input pada baris overload signature:
//    - Input `string` secara spesifik berpasangan dengan return `string`.
//    - Input `number` secara spesifik berpasangan dengan return `number`.
//    Sehingga variabel penampung langsung memiliki tipe murni (bukan union `string | number`).

// 3. Eksperimen error TS2769: uncomment baris `const errBoolean = callMe(true);`
//    di sub-section (5), jalankan `npx tsc --noEmit`, baca pesannya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/25_function_overloading.tsx:140:27
//    error TS2769: No overload matches this call.
//      Overload 1 of 2, '(value: number): number', gave the following error.
//        Argument of type 'boolean' is not assignable to parameter of type 'number'.
//      Overload 2 of 2, '(value: string): string', gave the following error.
//        Argument of type 'boolean' is not assignable to parameter of type 'string'.
//    ---------------------------------------------------------------
//    Penjelasan: Walaupun implementation signature `callMe` menerima `any`,
//    pemanggil dari luar hanya diizinkan memakai tipe yang terdaftar di
//    Overload Signatures (yaitu hanya number dan string).
