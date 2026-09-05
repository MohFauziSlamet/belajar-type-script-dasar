// ========================================
// LATIHAN MIDDLE 5 — BUKU KONTAK NULL & UNDEFINED
// ========================================
// Level: Middle
// Konsep: null dan undefined (materi 14), optional parameter &
//         default (materi 24), optional property (materi 12)
// Program: buku kontak — data yang boleh kosong dengan DUA rasa:
//          "belum diisi" (undefined) vs "dikosongkan" (null).

// ========================================
// SOAL
// ========================================
// 1. Definisikan type alias Kontak:
//    nama: string; telepon?: string; hp: string | null.
//    Isi 3 kontak (satu di antaranya teleponnya absen DAN hp null).
// 2. Bedakan dua rasa kosong: buktikan dengan === bahwa telepon yang
//    absen bernilai undefined, sedangkan hp memang bernilai null.
// 3. Buat fungsi tampil(k: Kontak): string — telepon kosong tampil
//    "-", hp kosong tampil "-" (pakai ??).
// 4. Buat fungsi sapa(nama: string, panggilan?: string): string —
//    tanpa panggilan gunakan "Saudara".
// 5. Buat cariKontak(daftar: Kontak[], nama: string): Kontak | null —
//    mengembalikan null kalau tidak ketemu. Panggil untuk nama yang
//    ada DAN yang tidak ada, cek hasilnya dengan === null.
// 6. Ramal dulu: apa error kalau menghitung panjang telepon yang
//    optional? Dan kalau menulis null ?? "default"?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) DUA RASA KOSONG dalam satu bentuk data
//     (Jika di Dart: cuma ada satu "kosong" — null, dan String?
//     menjaganya; TS membedakan undefined = TIDAK ADA / belum diisi,
//     null = ADA tapi sengaja dikosongkan)
// ------------------------------------------------------------------
type Kontak = {
  nama: string;
  telepon?: string;   // OPTIONAL: boleh absen → undefined
  hp: string | null;  // WAJIB diisi; kalau kosong, HARUS null eksplisit
};

const daftar: Kontak[] = [
  { nama: "Andi", telepon: "021-555", hp: "0812-1111-2222" },
  { nama: "Budi", hp: null }, // telepon absen, hp dikosongkan sengaja
  { nama: "Citra", telepon: "021-777", hp: "0813-3333-4444" },
];

// ------------------------------------------------------------------
// (2) BUKTI DUA RASA — perbandingan jujur nilai yang tersimpan
// ------------------------------------------------------------------
const budi: Kontak = daftar[1];

console.log(budi.telepon === undefined); // true  ← absen = undefined
console.log(budi.hp === null);           // true  ← diisi null sengaja

// ------------------------------------------------------------------
// (3) NILAI CADANGAN dengan ?? — dipakai pada nilai yang BISA kosong
//     (property/variabel/parameter — bukan literal null, lihat poin 6)
// ------------------------------------------------------------------
function tampil(k: Kontak): string {
  return `${k.nama} | telp: ${k.telepon ?? "-"} | hp: ${k.hp ?? "-"}`;
}

console.log(tampil(daftar[0])); // Andi | telp: 021-555 | hp: 0812-1111-2222
console.log(tampil(budi));      // Budi | telp: - | hp: -

// ?. = akses member dari nilai mungkin-kosong TANPA crash — hasil undefined
console.log(budi.telepon?.length);     // undefined (absen → berhenti, bukan error)
console.log(daftar[0].telepon?.length); // 7 ("021-555" = 7 karakter)

// ------------------------------------------------------------------
// (4) PARAMETER OPSIONAL — panggilan boleh tidak dikirim (materi 24)
// ------------------------------------------------------------------
function sapa(nama: string, panggilan?: string): string {
  return `${panggilan ?? "Saudara"} ${nama}`;
}

console.log(sapa("Andi", "Mas")); // Mas Andi
console.log(sapa("Budi"));        // Saudara Budi

// ------------------------------------------------------------------
// (5) PENCARIAN GAGAL = null — konvensi umum hasil "tidak ketemu";
//     pemanggil WAJIB cek sebelum pakai (kalau tidak, error)
// ------------------------------------------------------------------
function cariKontak(daftarKontak: Kontak[], nama: string): Kontak | null {
  for (const k of daftarKontak) {
    if (k.nama === nama) {
      return k; // ketemu — kembalikan datanya
    }
  }
  return null; // habis loop tidak ketemu — gagal = null
}

const ketemu: Kontak | null = cariKontak(daftar, "Citra");
if (ketemu === null) {
  console.log("Citra tidak ditemukan");
} else {
  console.log(`Ketemu: ${tampil(ketemu)}`); // Ketemu: Citra | telp: 021-777 | hp: 0813-3333-4444
}

const gagal: Kontak | null = cariKontak(daftar, "Dewi");
console.log(gagal === null); // true
console.log(gagal);          // null

// ------------------------------------------------------------------
// (6) RAMAL DULU: dua error khas nilai kosong
// ------------------------------------------------------------------
// const cek: number = budi.telepon.length;
// ERROR TS18048: 'budi.telepon' is possibly 'undefined'.
// (obat: ?. atau ?? — keduanya sudah dipakai di poin 3)

// const jawab: string = null ?? "default";
// ERROR TS2871: This expression is always nullish.
// (?? untuk nilai yang BISA kosong — literal null pasti kosong,
//  makanya tsc menolaknya; berlaku di .ts maupun .tsx)

// ========================================
// RANGKUMAN
// ========================================
// - undefined = tidak ada/belum diisi (property optional yang absen);
//   null = dikosongkan sengaja — dua rasa yang Dart satukan jadi null.
// - ?? memberi nilai cadangan untuk property/param/variabel yang
//   mungkin kosong; jangan dipakai pada literal null (TS2871).
// - Fungsi pencarian konvensinya mengembalikan null saat gagal;
//   pemanggil mengecek === null dulu baru memakai hasilnya.
// - Akses member dari nilai mungkin-kosong tanpa cek: property optional
//   = TS18048, variabel | null = TS18047 — obatnya ?? / ?. (poin 3).

