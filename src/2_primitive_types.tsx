// === TIPE DATA PRIMITIF (halaman 26-34) ===
// TypeScript memiliki 3 tipe data primitif: string, number, boolean
// Karena "Strongly Typed", sekali variabel ditentukan tipenya, TIDAK BISA diubah ke tipe lain.


// (1) STRING — teks, dibungkus tanda kutip "..." atau '...'
export function sapa(nama: string): string {
    return `Halo, ${nama}!`;
}

// (2) NUMBER — semua angka (bilangan bulat & desimal), tidak ada bedanya int/float
export function luasPersegi(sisi: number): number {
    return sisi * sisi;
}

// (3) BOOLEAN — hanya bernilai true atau false
export function genap(angka: number): boolean {
    return angka % 2 === 0;
}

// (4) KOMBINASI ketiganya dalam satu function
export function buatProfil(nama: string, umur: number, aktif: boolean): string {
    const status = aktif ? "aktif" : "tidak aktif";
    return `${nama} berumur ${umur} tahun, status: ${status}`;
}

// (5) TYPE INFERENCE — TypeScript menebak tipe otomatis dari nilai awal
//     Tidak wajib tulis ": string", tapi tetap strongly typed (tidak bisa berubah tipe)
export function demoTipeInference(): { teks: string; angka: number; benar: boolean } {
    const teks = "Belajar TypeScript";   // TS tahu ini string
    const angka = 2024;                  // TS tahu ini number
    const benar = true;                  // TS tahu ini boolean
    return { teks, angka, benar };
}

// (6) PERUBAHAN NILAI boleh selama TIPE TETAP SAMA
export function demoUbahNilai(): number {
    let umur = 20;       // tipe: number (inference)
    umur = 21;           // ✅ valid, masih number
    umur = umur + 1;     // ✅ valid, masih number
    return umur;
}
