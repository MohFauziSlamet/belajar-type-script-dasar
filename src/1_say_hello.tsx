// === 1. SAY HELLO — file TypeScript pertama ===
// Topik: bentuk function, type annotation, template literal, console.log.
// (PDF "TypeScript Dasar": bab Say Hello Function)


// ------------------------------------------------------------------
// (1) FUNCTION PERTAMA
// Jika di Dart seperti ini:
//     String sayHello(String name) {
//       return 'Hello $name';
//     }
// di TypeScript jadi seperti ini: (lihat kode di bawah)
//
// Tiga perbedaan bentuk yang harus diingat:
// - keyword `function` ditulis paling depan, sebelum nama
// - tipe parameter ditulis SETELAH nama  →  name: string
//   (Dart: tipe di depan → String name)
// - tipe return ditulis SETELAH kurung  →  ): string
//   (Dart: tipe di depan → String sayHello(...))
// ------------------------------------------------------------------

export function sayHello(name: string): string {
    return `Hello ${name}`;
}

console.log(sayHello("Fauzi")); // Hello Fauzi
console.log(sayHello("Dart"));  // Hello Dart


// ------------------------------------------------------------------
// (2) TEMPLATE LITERAL — menyisipkan variabel ke string
// Jika di Dart seperti ini:   'Hello $name'
// di TypeScript jadi seperti ini:  `Hello ${name}`
//
// Dua syaratnya:
// - string dibungkus BACKTICK ` ` (tombol di kiri angka 1), bukan '...'
// - variabel WAJIB pakai kurung kurawal ${name}
//   '$name' tanpa kurawal berfungsi di Dart, TIDAK berfungsi di TypeScript
// ------------------------------------------------------------------

const nama = "Fauzi"; // const ≈ final di Dart: sekali isi, tidak bisa diubah
console.log(`Hello ${nama}`);        // Hello Fauzi
console.log(`1 + 1 = ${1 + 1}`);     // 1 + 1 = 2   (isi ${} boleh ekspresi)


// ------------------------------------------------------------------
// (3) console.log ≈ print() di Dart
// Menampilkan output ke terminal. Bisa menerima banyak nilai sekaligus,
// dipisah koma — di Dart harus pakai ${} di satu string.
// ------------------------------------------------------------------

console.log("Halo", nama, "umur", 20); // Halo Fauzi umur 20


// ------------------------------------------------------------------
// (4) BONUS: ARROW FUNCTION (sekilas)
// Jika di Dart seperti ini:   String greet(String name) => 'Hi $name';
// di TypeScript jadi seperti ini:
//     const greet = (name: string): string => `Hi ${name}`;
//
// Sama-sama pakai => seperti Dart. Pembahasan lengkap menyusul di
// Bagian 4 (Function) — sekarang cukup kenali bentuknya.
// ------------------------------------------------------------------

const greet = (name: string): string => `Hi ${name}`;
console.log(greet("Fauzi")); // Hi Fauzi


// ================= RANGKUMAN =================
// 1. Function TS:  function nama(param: tipe): tipeReturn { ... }
//    Kalimat kunci: "tipe ditulis SETELAH nama" — kebalikan kebiasaan Dart.
// 2. Template literal: backtick ` ` + ${ekspresi}.
//    '$name' tanpa {} TIDAK berfungsi di TS (jebakan orang Dart).
// 3. console.log(x) ≈ print(x) di Dart; bisa multi argumen dipisah koma.
// 4. const ≈ final (tidak bisa reassign), let ≈ var (bisa reassign).
// 5. Arrow function => ada di TS, mirip Dart — detailnya di Bagian 4.
//
// Cara menjalankan file ini:  npx tsx src/1_say_hello.tsx


// ================= LATIHAN =================
// 1. Buat function sayGoodbye(name: string): string yang mengembalikan
//    "Goodbye Fauzi" lalu console.log hasilnya.
// 2. Buat function greetFull(name: string, city: string): string yang
//    mengembalikan "Halo Fauzi dari Bandung" (gabung dua parameter
//    dalam satu template literal).
// 3. Eksperimen jebakan: tulis console.log(`Hi $nama`) tanpa kurawal,
//    jalankan, lihat hasilnya — paham kenapa ${} wajib.
