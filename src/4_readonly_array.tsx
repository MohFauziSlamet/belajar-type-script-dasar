// ========================================
// READ ONLY ARRAY
// ========================================
// (PDF "TypeScript Dasar" hlm. 39-40: Read Only Array)
// Materi sebelumnya: file 3 (Array: push/pop, index, const pada array).
// Menyusul: Tuple (file 5).


// ------------------------------------------------------------------
// (1) MEMBUAT ARRAY YANG TIDAK BISA DIUBAH
//
// Jika di Dart seperti ini:
//     final angka = List<int>.unmodifiable([1, 2, 3]);
// di TypeScript jadi seperti ini:
//     const angka: ReadonlyArray<number> = [1, 2, 3];
//
// Ada juga tulisan singkatnya:  readonly number[]  (sama persis,
// cuma lebih pendek — pilih yang mana saja, konsisten saja).
// Analoginya: array biasa = kertas biasa (boleh coret), readonly
// array = kertas ber-laminating (cuma bisa dibaca).
// ------------------------------------------------------------------

const angka: ReadonlyArray<number> = [1, 2, 3];
const nama: readonly string[] = ["Fauzi", "Azka", "Budi"]; // bentuk singkat

console.log(angka); // [ 1, 2, 3 ]
console.log(nama);  // [ 'Fauzi', 'Azka', 'Budi' ]


// ------------------------------------------------------------------
// (2) YANG MASIH BOLEH: SEMUA OPERASI BACA
//
// Readonly = larangan MENGUBAH, bukan larangan MEMBACA. Semua yang
// tidak mengubah isi tetap jalan — sama seperti List.unmodifiable
// di Dart yang tetap bisa di-loop dan di-index.
// ------------------------------------------------------------------

console.log(nama[0]);            // Fauzi        (baca index)
console.log(nama.length);        // 3            (baca panjang)
console.log(nama.includes("Azka"));   // true    (Dart: .contains)
console.log(nama.indexOf("Budi"));    // 2       (sama seperti Dart)


// ------------------------------------------------------------------
// (3) YANG DILARANG: SEMUA OPERASI UBAH
//
// push, pop, dan mengubah isi lewat index — semuanya ditolak
// SEBELUM program jalan (saat type-check).
// ------------------------------------------------------------------

// nama.push("Darto");
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2339: Property 'push' does not exist on type
//    'readonly string[]'.  (method pengubah memang tidak disediakan)

// nama[0] = "Slamet";
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS2542: Index signature in type 'readonly string[]'
//    only permits reading.  (index cuma boleh DIBACA)

console.log(nama); // [ 'Fauzi', 'Azka', 'Budi' ]  (isi tetap utuh)


// ------------------------------------------------------------------
// (4) PERBEDAAN NYATA: KUNCI DI COMPILE-TIME, BUKAN RUNTIME
//
// Jika di Dart seperti ini: List.unmodifiable kunci DI RUNTIME —
// kalau dipaksa ubah, program CRASH UnsupportedError saat berjalan.
// di TypeScript jadi seperti ini: ReadonlyArray kuncinya CUMA DI
// TYPE-CHECK (compile-time). Setelah jadi JavaScript, array readonly
// = array biasa — TIDAK ada kunci sama sekali di runtime.
//
// Bukti nyata (coba di latihan 3): baris `nama.push(...)` yang
// di-uncomment akan MARAH di `npx tsc --noEmit`, tapi `npx tsx`
// TETAP menjalankannya dan array berubah — karena tsx tidak
// type-check (ingat file 2: perlindungan tipe ada di tsc).
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// (5) MENYERAHKAN ANTARA ARRAY BIASA DAN READONLY
//
// Arah aman   : number[]    → ReadonlyArray<number>  ✅ (kunci tambahan)
// Arah terlarang: ReadonlyArray<number> → number[]  ❌ (lepas kunci!)
//
// Rasanya seperti Dart? BEDA — di Dart List.unmodifiable membuat list
// BARU (copy), di sini TIDAK men-copy: dua variabel menunjuk array
// yang SAMA. Kuncinya di variabel, bukan di array-nya.
// ------------------------------------------------------------------

const bisaUbah: number[] = [10, 20, 30];
const dikunci: ReadonlyArray<number> = bisaUbah; // ✅ boleh: menambah kunci

console.log(dikunci); // [ 10, 20, 30 ]

bisaUbah.push(40);            // lewat pintu yang TIDAK dikunci — boleh
console.log(dikunci); // [ 10, 20, 30, 40 ]  ← ikut berubah! masih array yang sama

// const salah: number[] = dikunci;
// ❌ baris di atas ERROR kalau di-uncomment:
//    error TS4104: The type 'readonly number[]' is 'readonly' and
//    cannot be assigned to the mutable type 'number[]'.
//    (compiler menulis ReadonlyArray<number> sebagai 'readonly
//    number[]' — dua nama untuk hal yang sama)


// ========================================
// RANGKUMAN
// ========================================
// 1. Dart List.unmodifiable(...) → TS ReadonlyArray<T> atau singkatnya
//    readonly T[]. Dua-duanya valid — pilih satu, konsisten.
// 2. Operasi BACA tetap boleh semua: index, .length, includes, indexOf.
// 3. Operasi UBAH ditolak compiler: push/pop (TS2339), ubah index
//    (TS2542), serahkan ke array biasa (TS4104).
// 4. PERBEDAAN NYATA: kunci Dart di RUNTIME (crash UnsupportedError),
//    kunci TS hanya DI COMPILE-TIME (tsc) — runtime tidak terlindungi.
// 5. ReadonlyArray tidak men-copy: array-nya masih sama, kuncinya
//    melekat di VARIABEL. Pintu lain yang tidak dikunci tetap bisa
//    mengubah isi bersamanya.
//
// Cara menjalankan file ini:  npx tsx src/4_readonly_array.tsx


// ========================================
// LATIHAN (+ JAWABAN)
// ========================================

// 1. Buat ReadonlyArray menuMinuman berisi 3 minuman favorit, cetak
//    isinya, elemen pertama, dan panjangnya.
//
//    JAWABAN:
const menuMinuman: ReadonlyArray<string> = ["Es Teh", "Kopi Susu", "Es Jeruk"];
console.log(menuMinuman);   // [ 'Es Teh', 'Kopi Susu', 'Es Jeruk' ]
console.log(menuMinuman[0]); // Es Teh
console.log(menuMinuman.length); // 3

// 2. Buktikan operasi baca tetap boleh: cek apakah "Kopi Susu" ada
//    di menuMinuman, dan di index berapa "Es Jeruk".
//
//    JAWABAN:
console.log(menuMinuman.includes("Kopi Susu")); // true
console.log(menuMinuman.indexOf("Es Jeruk"));   // 2

// 3. Eksperimen dua perintah (yang paling penting di materi ini):
//    uncomment baris `nama.push("Darto")` di sub-section (3), lalu:
//    a. jalankan `npx tsc --noEmit`  → lihat error TS2339
//    b. jalankan `npx tsx src/4_readonly_array.tsx` → TIDAK error,
//       program jalan, "Darto" masuk.
//    Setelah itu comment-kan kembali barisnya.
//
//    JAWABAN: yang terjadi:
//    a. tsc: error TS2339: Property 'push' does not exist on type
//       'readonly string[]'.  ← compiler MENAHAN, ini garis pertahanannya
//    b. tsx: jalan mulus, array berubah → [ 'Fauzi', 'Azka', 'Budi', 'Darto' ]
//    Pelajaran: readonly TypeScript adalah JANJI di level tipe yang
//    ditegakkan compiler (tsc/dart analyze) — bukan kunci fisik di
//    runtime seperti List.unmodifiable di Dart. Karena itu menjalankan
//    `npx tsc --noEmit` secara rutin itu WAJIB, bukan formalitas.
