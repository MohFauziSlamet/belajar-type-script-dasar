// ========================================
// SWITCH STATEMENT
// ========================================
// (PDF "TypeScript Dasar" hlm. 122-124: Switch Statement,
//  Kode : Switch Statement)
// Materi sebelumnya: file 28 (Ternary Operator).
// Sekarang kita mempelajari Switch Statement — percabangan multi-kondisi
// yang lebih rapi dibanding rantai `if - else if` panjang.


// ------------------------------------------------------------------
// (1) SINTAKS DASAR SWITCH (DART VS TYPESCRIPT)
//
// PDF hlm. 123-124: Switch di TypeScript bekerja sama seperti di JavaScript.
//
// Jika di Dart seperti ini:
//     String sayHello(String name) {
//         switch (name) {
//             case 'Eko':
//                 return 'Hi Eko';
//             case 'Budi':
//                 return 'Halo Budi';
//             default:
//                 return 'Hello';
//         }
//     }
// di TypeScript jadi seperti ini:
//     function sayHello(name: string): string {
//         switch (name) {
//             case "Eko":
//                 return "Hi Eko";
//             case "Budi":
//                 return "Halo Budi";
//             default:
//                 return "Hello";
//         }
//     }
//
// KEMIRIPAN BESAR:
// - Kata kunci `switch`, `case`, `default`, serta pemakaian `break` / `return`
//   memiliki alur logika yang sama persis antara Dart dan TypeScript.
//
// PERBEDAAN PENTING:
// - Dart (sejak Dart 3) memiliki SWITCH EXPRESSION dengan sintaks panah `=>`
//   dan wildcard `_`, sedangkan TypeScript TIDAK memiliki switch expression
//   (harus menggunakan ternary atau object map sebagai alternatif).
// ------------------------------------------------------------------

function sayHello(name: string): string {
    switch (name) {
        case "Eko":
            return "Hi Eko";
        case "Budi":
            return "Halo Budi";
        default:
            return "Hello";
    }
}

console.log(sayHello("Eko"));                    // Hi Eko
console.log(sayHello("Budi"));                   // Halo Budi
console.log(sayHello("Joko"));                   // Hello


// ------------------------------------------------------------------
// (2) FALL-THROUGH: MENGELOMPOKKAN CASE (TANPA BREAK)
//
// Jika beberapa nilai `case` harus menjalankan blok kode yang sama,
// kita bisa menumpuk case tanpa break → ini disebut FALL-THROUGH.
//
// Jika di Dart seperti ini:
//     switch (hari) {
//         case 'Senin':
//         case 'Selasa':
//         case 'Rabu':
//             return 'Hari Kerja';
//     }
// di TypeScript jadi seperti ini:
//     switch (hari) {
//         case "Senin":
//         case "Selasa":
//         case "Rabu":
//             return "Hari Kerja";
//     }
//
// KEMIRIPAN: Fall-through bekerja sama persis di Dart dan TypeScript.
// ------------------------------------------------------------------

function cekHari(hari: string): string {
    let hasil: string;
    switch (hari) {
        case "Senin":
        case "Selasa":
        case "Rabu":
        case "Kamis":
        case "Jumat":
            hasil = "Hari Kerja";
            break;
        case "Sabtu":
        case "Minggu":
            hasil = "Akhir Pekan";
            break;
        default:
            hasil = "Hari tidak dikenal";
    }
    return hasil;
}

console.log(cekHari("Rabu"));                    // Hari Kerja
console.log(cekHari("Minggu"));                  // Akhir Pekan


// ------------------------------------------------------------------
// (3) SWITCH DENGAN ENUM (FITUR KUAT TYPESCRIPT)
//
// Switch sangat cocok dipasangkan dengan Enum yang sudah kita pelajari
// di file 13 (src/13_enum.tsx). Setiap nilai enum bisa menjadi case.
//
// KEUNGGULAN COMPILER TS:
// Jika return type fungsi dideklarasikan (misal `: string`) dan ada
// case enum yang LUPA ditangani sehingga fungsi tidak mengembalikan nilai
// di semua jalur, TypeScript menghasilkan error TS2366:
// "Function lacks ending return statement and return type does not include 'undefined'."
// ------------------------------------------------------------------

enum Warna {
    Merah = "MERAH",
    Hijau = "HIJAU",
    Biru = "BIRU",
}

function deskripsikan(w: Warna): string {
    switch (w) {
        case Warna.Merah:
            return "Warna api";
        case Warna.Hijau:
            return "Warna daun";
        case Warna.Biru:
            return "Warna langit";
    }
}

console.log(deskripsikan(Warna.Hijau));           // Warna daun

// Jika salah satu case dihapus (misal case Warna.Biru dihapus),
// compiler akan menghasilkan:
// ❌ error TS2366: Function lacks ending return statement
//    and return type does not include 'undefined'.


// ------------------------------------------------------------------
// (4) TYPE NARROWING VIA SWITCH (TYPEOF)
//
// Sama seperti `if (typeof x === "string")` di file 27,
// TypeScript juga melakukan Type Narrowing otomatis di dalam case `typeof`:
// ------------------------------------------------------------------

function prosesData(data: string | number | boolean): string {
    switch (typeof data) {
        case "string":
            // Di sini `data` otomatis bertipe `string` murni
            return data.toUpperCase();
        case "number":
            // Di sini `data` otomatis bertipe `number` murni
            return data.toFixed(2);
        case "boolean":
            // Di sini `data` otomatis bertipe `boolean` murni
            return data ? "YA" : "TIDAK";
        default:
            return "Tipe tidak dikenali";
    }
}

console.log(prosesData("halo"));                 // HALO
console.log(prosesData(3.14));                   // 3.14
console.log(prosesData(true));                   // YA


// ------------------------------------------------------------------
// (5) PENJAGA COMPILER: TIPE CASE HARUS COCOK DENGAN SWITCH (TS2678)
//
// TypeScript melindungi kita dari kesalahan menulis case yang tipenya
// tidak cocok dengan ekspresi yang di-switch (yang ada di dalam kurung).
// ------------------------------------------------------------------

// const angka: number = 5;
// switch (angka) {
//     case "lima":
//         console.log("Lima");
//         break;
// }
// ❌ ERROR kalau di-uncomment:
//    error TS2678: Type 'string' is not comparable to type 'number'.
//    (nilai yang di-switch bertipe number — case string tidak
//    mungkin cocok, compiler menahannya lebih awal)


// ========================================
// RANGKUMAN
// ========================================
// 1. Switch statement di TypeScript memiliki alur logika identik dengan Dart dan JavaScript (PDF hlm. 122-124).
// 2. Kata kunci: `switch (ekspresi)`, `case nilai:`, `default:`, `break`, `return`.
// 3. PERBEDAAN DENGAN DART: Dart 3+ memiliki Switch Expression (`switch (x) { 'a' => ..., _ => ... }`),
//    sedangkan TypeScript TIDAK memiliki switch expression (gunakan ternary atau object map).
// 4. Fall-through: case tanpa break/return akan "jatuh" ke case berikutnya — berguna untuk
//    mengelompokkan beberapa nilai yang memiliki aksi yang sama.
// 5. Switch sangat cocok dengan Enum — jika ada case yang lupa ditangani, compiler mengingatkan
//    via error TS2366 ("Function lacks ending return statement").
// 6. Type Narrowing bekerja pada `switch (typeof data)` — setiap case secara otomatis
//    mempersempit tipe variabel ke tipe murni di dalam bloknya.
// 7. Penjaga TS2678: TypeScript menolak case yang tipenya tidak cocok dengan ekspresi di switch.
//
// Cara menjalankan file ini:  npx tsx src/29_switch_statement.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat fungsi `cekLevel(level: number): string` menggunakan switch:
//    - case 1 -> "Pemula", case 2 -> "Menengah", case 3 -> "Mahir", default -> "Level tidak dikenal".
//    Panggil dan cetak hasilnya.
//
//    JAWABAN:
function cekLevel(level: number): string {
    switch (level) {
        case 1:
            return "Pemula";
        case 2:
            return "Menengah";
        case 3:
            return "Mahir";
        default:
            return "Level tidak dikenal";
    }
}

console.log(cekLevel(1));                        // Pemula
console.log(cekLevel(2));                        // Menengah
console.log(cekLevel(5));                        // Level tidak dikenal

// 2. Ramal dulu, baru cek: Apa perbedaan antara Switch Statement di TypeScript
//    dan Switch Expression di Dart 3+? Apa konsekuensinya?
//
//    JAWABAN:
//    Di Dart 3+, switch bisa digunakan sebagai EXPRESSION (menghasilkan nilai langsung):
//        final result = switch (name) {
//            'Eko' => 'Hi Eko',
//            _ => 'Hello',
//        };
//    Di TypeScript, switch HANYA bisa digunakan sebagai STATEMENT (tidak menghasilkan nilai).
//    Jika ingin percabangan berbasis expression di TypeScript, gunakan ternary operator (`? :`)
//    atau object map ala indexable interface file 18 (`const map: { [kunci: string]: string } = { "Eko": "Hi Eko" }`).

// 3. Eksperimen error TS2678: uncomment blok `switch (angka) { case "lima": ... }`
//    di sub-section (5), jalankan `npx tsc --noEmit`, baca pesannya, lalu comment kembali.
//
//    JAWABAN: error yang muncul:
//    ---------------------------------------------------------------
//    src/29_switch_statement.tsx:188:10
//    error TS2678: Type 'string' is not comparable to type 'number'.
//    ---------------------------------------------------------------
//    Penjelasan: TypeScript mendeteksi bahwa tipe case `"lima"` (string) tidak
//    cocok dengan tipe ekspresi switch `angka` (number), sehingga perbandingan
//    ini dianggap sebagai kesalahan logika developer.
