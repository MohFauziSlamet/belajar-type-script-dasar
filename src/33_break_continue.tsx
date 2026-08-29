// ==================================================================
// BREAK DAN CONTINUE
// ==================================================================
// Sumber: PDF "TypeScript Dasar" hlm. 134-136. Catatan: kode contoh
// di buku (hlm. 136) berupa gambar screenshot — materi ini dibangun
// dari praktik standar break/continue, semua perilaku DIVERIFIKASI
// (tsc + tsx + Dart). Ini topik yang ditunda 4x oleh file 29-32:
// break di switch (file 29), for (30), while (31), do-while (32)
// semua menahan diri — sekarang waktunya.

// ------------------------------------------------------------------
// (1) break — MENGHENTIKAN LOOP LEBIH AWAL
//
// PDF hlm. 135: pada perulangan While atau Do While, kita sering
// menggunakan kata kunci break dan continue — hal ini juga bisa
// dilakukan di TypeScript. break = "cukup, keluar dari loop
// SEKARANG" — sisa iterasi dibatalkan, eksekusi lompat ke baris
// SETELAH loop.
//
// Jika di Dart seperti ini:
//     for (var i = 0; i < 5; i++) {
//         if (i == 3) break;        // berhenti di angka 3
//         print(i);
//     }
// di TypeScript jadi seperti ini: PERSIS — hanya == jadi === dan
// var jadi let. break bekerja di KETIGA loop (for / while /
// do-while — keluarga file 30-32). PERHATIKAN: ini break versi
// LOOP, beda konteks dengan break di switch (file 29) yang keluar
// dari blok switch — kata kunci sama, "pintu keluar"-nya
// mengikuti blok terdalam yang sedang berjalan membungkusnya.
// ------------------------------------------------------------------

console.log("--- break di for ---");
for (let i = 0; i < 5; i++) {
    if (i === 3) break;          // i === 3 → keluar, 3 & 4 batal
    console.log(i);              // 0 / 1 / 2 (baris terpisah)
}

console.log("--- break di while: pola while(true) ---");
// Pola sangat lazim: while(true) + break sebagai "rem darurat"
let j = 0;
while (true) {
    if (j === 2) break;          // satu-satunya jalan keluar
    console.log("j =", j);       // j = 0 / j = 1 (baris terpisah)
    j++;
}

// ------------------------------------------------------------------
// (2) continue — LOMPATI SISA BADAN INI SAJA
//
// continue = "putaran ini cukup, LANJUT ke putaran berikutnya" —
// sisa badan SETELAH continue di-skip, tapi loop tetap jalan.
// Bandingkan dengan break: break keluar dari SEMUA putaran,
// continue hanya membatalkan SATU putaran.
//
// Jika di Dart seperti ini:
//     for (var i = 0; i < 6; i++) {
//         if (i % 2 == 1) continue;  // lewati angka ganjil
//         print(i);
//     }
// di TypeScript jadi seperti ini: PERSIS. TAPI ada jebakan yang
// WAJIB dipahami — continue melompat ke "pengeksekusi step" loop:
//   - di for    → step (i++) di header TETAP jalan  → aman
//   - di while  → lompat langsung ke KONDISI — kode SETELAH
//                 continue (termasuk increment) DI-SKIP → kalau
//                 increment ada di bawah, loop TERJEBAK
//   - di do-while → sama seperti while: kondisi tetap dicek
// ------------------------------------------------------------------

console.log("--- continue di for: lewati ganjil ---");
for (let i = 0; i < 6; i++) {
    if (i % 2 === 1) continue;   // ganjil → skip sisa badan
    console.log(i);              // 0 / 2 / 4 (baris terpisah)
}

console.log("--- while: increment SEBELUM continue → aman ---");
let k = 0;
while (k < 6) {
    k++;                         // naikkan DULU → tak ada jebakan
    if (k % 2 === 1) continue;
    console.log("genap:", k);    // genap: 2 / genap: 4 / genap: 6 (baris terpisah)
}

console.log("--- do-while: kondisi tetap dicek setelah continue ---");
let d = 0;
do {
    d++;
    if (d === 2) continue;       // 2 dilewati, tapi kondisi tetap dievaluasi
    console.log("d =", d);       // d = 1 / d = 3 / d = 4 (baris terpisah)
} while (d < 4);

// ------------------------------------------------------------------
// (3) break HANYA keluar dari loop TERDALAM + LABEL
//
// Loop bersarang (nested): break tanpa label hanya menembus loop
// TERDALAM — loop luarnya lanjut jalan. Kebutuhan nyata: mencari
// sesuatu, begitu ketemu ingin keluar dari SEMUA loop sekaligus.
// JavaScript punya fitur LABEL untuk ini — dan Dart PUNYA SAMA:
//
// Jika di Dart seperti ini:
//     outer:
//     for (var x = 1; x <= 2; x++) {
//         for (var y = 1; y <= 3; y++) {
//             if (y == 2) break outer;   // tembus SEMUA
//             print('$x-$y');
//         }
//     }
// di TypeScript jadi seperti ini: PERSIS — label `outer:` nempel
// di depan for, `break outer;` menembus keluar sampai label itu.
// Ini BUKAN perbedaan bahasa: Dart dan TypeScript sintaksnya sama
// persis (terverifikasi dart analyze + tsc). continue juga bisa
// pakai label (`continue outer;` — lompat ke step loop luar).
// ------------------------------------------------------------------

console.log("--- break biasa: hanya loop terdalam ---");
for (let a = 1; a <= 2; a++) {
    for (let b = 1; b <= 3; b++) {
        if (b === 2) break;      // hanya keluar loop b
        console.log(a + "-" + b); // 1-1 / 2-1 (baris terpisah)
    }
}

console.log("--- break outer: menembus semua ---");
outer: for (let a = 1; a <= 2; a++) {
    for (let b = 1; b <= 3; b++) {
        if (b === 2) break outer; // keluar sampai label outer
        console.log(a + "-" + b);  // 1-1 saja (baris terpisah)
    }
}

// ------------------------------------------------------------------
// (4) PENJAGA & KODE ERROR
//
// Kode error keluarga baru (semua di luar konteks loop):

// break;
// if (true) { break; }
// ❌ ERROR kalau di-uncomment — DUA-duanya TS1105:
//    error TS1105: A 'break' statement can only be used within an
//    enclosing iteration or switch statement.
//    (break telanjang maupun break dalam if tanpa loop — if
//    BUKAN pintu keluar yang sah untuk break)

// continue;
// switch ("A") { case "A": continue; }
// ❌ ERROR kalau di-uncomment — DUA-duanya TS1104:
//    error TS1104: A 'continue' statement can only be used within
//    an enclosing iteration statement.
//    (perhatikan contoh kedua: break SAH di switch — file 29 —
//    tapi continue TIDAK: switch bukan loop)

// for (let i = 0; i < 3; i++) { break ngasal; }
// ❌ ERROR kalau di-uncomment — TS1116:
//    error TS1116: A 'break' statement can only jump to a label of
//    an enclosing statement.
//    (di dalam loop — jadi BUKAN TS1105 — tapi label `ngasal`
//    tidak dikenal; break berlabel hanya boleh menembus label
//    yang MENGENGAM loop itu dari luar)
//
// PERBEDAAN NYATA dengan Dart: di Dart, continue dalam switch
// justru FITUR — boleh asal pakai label case (`continue caseLain;`
// untuk lompat ke case lain). Di TypeScript: dilarang mentah-mentah
// (TS1104). Nama error Dart juga beda: break di luar loop = error
// `break_outside_of_loop` — sama-sama ditolak compiler, hanya nama
// dan kode yang berbeda.
//
// PERINGATAN RUNTIME (bukan error compile): jebakan continue di
// while dari sub-section (2) versi ekstremnya — increment SETELAH
// continue tidak pernah jalan, kondisi tidak pernah berubah:
//
// let e = 0;
// while (e < 5) {
//     if (e === 2) continue;   // e TERJEBAK di 2 selamanya — JANGAN dijalankan
//     console.log(e);
//     e++;                     // di-skip terus oleh continue
// }
//
// tsc BERSIH untuk kode itu (compiler tidak mengecek alur —
// pelajaran file 31), runtime menggant selamanya. Pola aman:
// dalam while, taruh increment SEBELUM continue.
// ------------------------------------------------------------------

console.log("--- selesai: semua loop berhenti dengan tertib ---");
// 1 baris ini cetak belakangan = bukti break/continue tidak
// menyentuh kode setelah loop

// ==================================================================
// RANGKUMAN
// ==================================================================
// 1. break = keluar dari loop SEKARANG — sisa iterasi batal;
//    eksekusi lanjut ke baris setelah loop. Sah di for / while /
//    do-while (file 30-32) DAN switch (file 29) — beda pintu
//    keluar, kata kunci sama.
// 2. continue = batalkan SATU putaran saja — sisa badan setelah
//    continue di-skip, loop lanjut ke putaran berikutnya.
// 3. Nasib step/increment SETELAH continue: for → i++ di header
//    tetap jalan (aman); while & do-while → di-SKIP total.
// 4. Jebakan klasik: continue di while dengan increment di bawah
//    → kondisi tak pernah berubah → infinite loop (tsc bersih,
//    runtime menggant — pelajaran file 31). Pola aman: increment
//    SEBELUM continue, atau pakai for.
// 5. break tanpa label hanya menembus loop TERDALAM; loop luar
//    lanjut jalan. Butuh keluar semua sekaligus → label.
// 6. Label `outer:` di depan for + `break outer;` menembus semua
//    loop yang dikenggam label itu. Dart sintaksnya SAMA PERSIS
//    (terverifikasi) — bukan perbedaan bahasa.
// 7. Kode error: TS1105 (break di luar loop/switch, termasuk
//    dalam if telanjang), TS1104 (continue di luar loop —
//    termasuk DALAM switch), TS1116 (break berlabel tak dikenal).
// 8. PERBEDAAN NYATA dengan Dart: continue dalam switch — di Dart
//    itu FITUR (lompat antar-case dengan label), di TypeScript
//    dilarang total (TS1104). Nama error pun beda: Dart
//    `break_outside_of_loop`, TypeScript TS1105.
//
// Cara menjalankan file ini: npx tsx src/33_break_continue.tsx

// ==================================================================
// LATIHAN (+ JAWABAN)
// ==================================================================

// 1. Loop 1 sampai 10, berhenti tepat saat angka 7 ketemu — cetak
//    semua angka sebelum 7, lalu cetak "ketemu!".
//
// JAWABAN:
for (let n = 1; n <= 10; n++) {
    if (n === 7) {
        console.log("ketemu!");    // ketemu!
        break;                     // 8, 9, 10 tidak pernah jalan
    }
    console.log(n);                // 1 / 2 / 3 / 4 / 5 / 6 (baris terpisah)
}

// 2. Loop 1 sampai 10, cetak hanya angka yang BUKAN kelipatan 3.
//
// JAWABAN:
for (let n = 1; n <= 10; n++) {
    if (n % 3 === 0) continue;     // 3, 6, 9 dilewati
    console.log(n);                // 1 / 2 / 4 / 5 / 7 / 8 / 10 (baris terpisah)
}

// 3. Eksperimen ramal-dulu (JANGAN langsung dijalankan — kalau
//    dijalankan ia MENGGANT, siapkan Ctrl+C atau cukup ramal):
//    kode di bawah kalau diberi komentar // di depannya lalu
//    dijalankan, apa outputnya dan kenapa berhenti/tidak?
//
//    let e = 0;
//    while (e < 5) {
//        if (e === 2) continue;
//        console.log(e);
//        e++;
//    }
//
// JAWABAN: TIDAK PERNAH berhenti (infinite loop). Jejaknya:
//    e = 0 → cetak 0, e jadi 1 → cetak 1, e jadi 2 → e === 2 →
//    continue melompat ke kondisi (e < 5 masih benar) TANPA
//    menjalankan e++ → e tetap 2 selamanya → tercetak "0", "1"
//    lalu diam menggant. Perbaikannya dua pilihan: taruh e++
//    sebelum continue (pola sub-section 2), atau pakai for yang
//    step-nya di header (tak mungkin terlewat).
//    (jejak ini diamati saat verifikasi file via simulasi
//    berhenti-paksa — kode aslinya JANGAN dieksekusi)
