// ========================================
// FUNCTION PARAMETER
// ========================================
// (PDF "TypeScript Dasar" hlm. 104-107: Function Parameter,
//  Kode : Say Hello Function, Kode : Sum Function)
// Materi sebelumnya: file 23 (Function Dasar, return type, void).
// Sekarang kita membahas variasi parameter: Optional Parameter (?),
// Default Parameter Value (=), dan Rest Parameter (...).


// ------------------------------------------------------------------
// (1) OPTIONAL PARAMETER (?) — PARAMETER YANG BOLEH TIDAK DIISI
//
// PDF hlm. 105: di TypeScript setiap parameter wajib diisi, kecuali
// kita tentukan sebagai optional menggunakan tanda tanya (?).
//
// Jika di Dart seperti ini:
//     String sapa(String nama, [String? gelar]) {
//         if (gelar != null) {
//             return '$nama, $gelar';
//         }
//         return nama;
//     }
// di TypeScript jadi seperti ini:
//     function sapa(nama: string, gelar?: string): string {
//         if (gelar) {
//             return `${nama}, ${gelar}`;
//         }
//         return nama;
//     }
//
// PERBEDAAN SINTAKS:
// - Dart membungkus parameter opsional dengan kurung siku `[String? gelar]`.
// - TypeScript menaruh tanda tanya `?` langsung setelah nama parameter (`gelar?: string`).
//
// Di dalam function, tipe `gelar` otomatis menjadi union: `string | undefined`.
// Jika pemanggil tidak mengirim argumen, nilainya adalah `undefined`.
// ------------------------------------------------------------------

function sapa(nama: string, gelar?: string): string {
    if (gelar) {
        return `${nama}, ${gelar}`;
    }
    return nama;
}

console.log(sapa("Fauzi"));               // Fauzi
console.log(sapa("Fauzi", "S.Kom."));     // Fauzi, S.Kom.
console.log(sapa("Fauzi", undefined));    // Fauzi   ← mengirim undefined eksplisit juga sah

// const salahTipe = sapa("Fauzi", 123);
// ❌ ERROR kalau di-uncomment:
//    error TS2345: Argument of type 'number' is not assignable to
//    parameter of type 'string'.


// ------------------------------------------------------------------
// (2) ATURAN POSISI: OPTIONAL PARAMETER WAJIB DI AKHIR (TS1016)
//
// Parameter opsional TIDAK BOLEH ditaruh sebelum parameter wajib.
// Semua parameter wajib harus diselesaikan terlebih dahulu di depan.
// ------------------------------------------------------------------

// function buatNama(gelar?: string, nama: string): string {
//     return `${gelar} ${nama}`;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS1016: A required parameter cannot follow an optional parameter.
//    (alasan logis: jika gelar di depan, pemanggilan `buatNama("Fauzi")`
//     membuat compiler bingung apakah "Fauzi" adalah gelar atau nama)


// ------------------------------------------------------------------
// (3) DEFAULT PARAMETER VALUE (=) — NILAI BAWAAN OTOMATIS
//
// PDF hlm. 105: parameter juga bisa memiliki default value menggunakan
// tanda sama dengan (`=`).
//
// Jika di Dart seperti ini:
//     String sayHello([String name = 'Guest']) {
//         return 'Hello $name';
//     }
// di TypeScript jadi seperti ini:
//     function sayHello(name: string = "Guest"): string {
//         return `Hello ${name}`;
//     }
//
// KEMIRIPAN BESAR:
// - Baik Dart maupun TypeScript sama-sama menggunakan tanda `=` untuk nilai default.
//
// PERILAKU PENTING:
// 1. Parameter yang memiliki default value OTOMATIS bersifat opsional.
// 2. Jika dipanggil tanpa argumen, ATAU dikirim `undefined`, nilai default akan aktif.
// 3. JANGAN menggabungkan `?` dan `=` sekaligus — TypeScript melarangnya (TS1015)!
// ------------------------------------------------------------------

function sayHello(name: string = "Guest"): string {
    return `Hello ${name}`;
}

console.log(sayHello("Eko"));         // Hello Eko
console.log(sayHello());              // Hello Guest
console.log(sayHello(undefined));     // Hello Guest   ← undefined memicu default value

// function salam(nama?: string = "Tamu"): string {
//     return `Halo ${nama}`;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS1015: Parameter cannot have question mark and initializer.
//    (pilih salah satu: gunakan `?` jika ingin undefined tanpa nilai bawaan,
//     atau gunakan `= "Tamu"` jika ingin nilai bawaan)


// ------------------------------------------------------------------
// (4) REST PARAMETER (...) — MENERIMA ARGUMEN TAK TERBATAS
//
// PDF hlm. 105: rest parameter (variable argument) memungkinkan function
// menerima banyak argumen lepas sekaligus yang otomatis dikumpulkan
// menjadi satu Array di dalam body function.
//
// Jika di Dart seperti ini:
//     // Dart tidak memiliki rest parameter bawaan pada fungsi reguler.
//     // Dart mewajibkan pemanggil membungkus data dalam List:
//     String gabung(String pemisah, List<String> kata) {
//         return kata.join(pemisah);
//     }
//     // Pemanggilan Dart: gabung('-', ['React', 'Native'])
// di TypeScript jadi seperti ini:
//     function gabung(pemisah: string, ...kata: string[]): string {
//         return kata.join(pemisah);
//     }
//     // Pemanggilan TypeScript: gabung("-", "React", "Native")   ← tanpa kurung siku!
// ------------------------------------------------------------------

function gabung(pemisah: string, ...kata: string[]): string {
    // Di dalam function, `kata` adalah array string biasa (string[]).
    // .join(pemisah) = method array yang merangkai semua isi menjadi
    // satu string dipisahkan pemisah (tahu ada saja — pola unshift/
    // shift di file 3)
    return kata.join(pemisah);
}

console.log(gabung("-", "React", "Native", "TypeScript"));   // React-Native-TypeScript

function infoPeserta(acara: string, ...peserta: string[]): string {
    return `${acara} (${peserta.length} peserta): ${peserta.join(", ")}`;
}

console.log(infoPeserta("Workshop", "Budi", "Azka", "Fauzi"));   // Workshop (3 peserta): Budi, Azka, Fauzi
console.log(infoPeserta("Seminar"));                             // Seminar (0 peserta): 
// (Catatan: jika rest parameter tidak diisi saat pemanggilan, nilainya menjadi array kosong `[]`)


// ------------------------------------------------------------------
// (5) ATURAN KETAT REST PARAMETER (TS1014 & TS2370)
//
// Rest parameter memiliki dua aturan mutlak:
//   1. Rest parameter WAJIB berada di posisi PALING TERAKHIR (TS1014).
//   2. Tipe data rest parameter WAJIB bertipe Array (TS2370).
// ------------------------------------------------------------------

// function salahPosisi(...angka: number[], label: string) {
//     return label;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS1014: A rest parameter must be last in a parameter list.

// function salahTipe(...angka: number) {
//     return angka;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2370: A rest parameter must be of an array type.


// ========================================
// RANGKUMAN
// ========================================
// 1. Optional parameter menggunakan tanda tanya `?` di belakang nama parameter (`gelar?: string`).
// 2. Parameter opsional yang tidak diisi akan bernilai `undefined` (bertipe `T | undefined`).
// 3. Parameter opsional WAJIB berada di posisi paling akhir setelah parameter wajib (melanggar = TS1016).
// 4. Default parameter value menggunakan tanda sama dengan (`name: string = "Guest"`).
// 5. Default value otomatis membuat parameter bersifat opsional, dan memicu nilai bawaan
//    saat argumen tidak dikirim atau saat dikirim `undefined`.
// 6. DILARANG menggabungkan tanda `?` dan default value `=` pada parameter yang sama (TS1015).
// 7. Rest parameter menggunakan awalan `...` dengan tipe array (`...item: string[]`),
//    mengumpulkan argumen lepas menjadi array, dan WAJIB di posisi paling akhir (TS1014).
//
// Cara menjalankan file ini:  npx tsx src/24_function_parameter.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat function `buatTagihan(pelanggan: string, diskon: number = 0, ...item: string[]): string`
//    yang mengembalikan teks ringkasan tagihan beserta daftar item yang dibeli.
//    Panggil dengan diskon default (kirim `undefined` atau biarkan) dan dengan diskon 10%.
//
//    JAWABAN:
function buatTagihan(pelanggan: string, diskon: number = 0, ...item: string[]): string {
    return `Tagihan ${pelanggan} (Diskon ${diskon}%): ${item.join(", ")}`;
}

console.log(buatTagihan("Fauzi", undefined, "Kopi", "Roti", "Susu"));
// Tagihan Fauzi (Diskon 0%): Kopi, Roti, Susu

console.log(buatTagihan("Budi", 10, "Buku", "Pulpen"));
// Tagihan Budi (Diskon 10%): Buku, Pulpen

// 2. Ramal dulu, baru cek: Apa output dari `sayHello(undefined)` vs `sayHello("")`?
//    Dan mengapa `undefined` memicu default value sedangkan `""` tidak?
//
//    JAWABAN:
console.log(sayHello(undefined));   // Hello Guest
console.log(sayHello(""));          // Hello 
// Penjelasan: Di JavaScript & TypeScript, default value hanya terpicu jika argumen
// bernilai `undefined` (atau tidak dikirim). Nilai string kosong `""` dianggap
// sebagai nilai valid (ada isinya), sehingga default value tidak diaktifkan.

// 3. Eksperimen error TS1016: uncomment baris `function buatNama` di sub-section (2),
//    jalankan `npx tsc --noEmit`, perhatikan pesan errornya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/24_function_parameter.tsx:64:35
//    error TS1016: A required parameter cannot follow an optional parameter.
//    ---------------------------------------------------------------
//    Penjelasan: TypeScript mengharuskan urutan parameter dari kiri ke kanan
//    adalah: Parameter Wajib → Parameter Opsional / Default → Rest Parameter.
//    Meletakkan parameter wajib setelah opsional akan membingungkan mapping argumen.
