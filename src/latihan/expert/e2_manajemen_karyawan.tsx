// ========================================
// LATIHAN EXPERT 2 — MANAJEMEN KARYAWAN
// ========================================
// Level: Expert (gabungan)
// Konsep: function interface (17), indexable interface (18), extends
//         (19), intersection (21), tuple (5), readonly (16),
//         callback (26), if (27), for (30)
// Program: data karyawan — hierarki tetap/kontrak, direktori akses
//          cepat per-ID, dan payroll dengan kalkulator yang ditukar.

// ========================================
// SOAL
// ========================================
// 1. Definisikan interface Karyawan (id READONLY, nama, gajiPokok)
//    + dua turunan extends: Manager (+jumlahBawahan) dan Kontrak
//    (+sampai: string). Isi 4 karyawan campuran, cetak daftarnya.
// 2. Definisikan indexable interface Direktori { [id: string]:
//    Karyawan } — isi lewat for-of, lalu akses dua ID nyata dan satu
//    ID absen (tampilkan hasil aksesnya).
// 3. Definisikan function interface KalkulatorGaji { (k: Karyawan):
//    number } dan fungsi hitungPayroll(daftar, kalk) yang menerima
//    kalkulator sebagai CALLBACK. Buat dua kalkulator: dasar (flat)
//    dan tunjangan (+500000). Hitung keduanya.
// 4. Definisikan intersection KaryawanAktif = Karyawan & { email:
//    string } — buat satu contoh. Lalu fungsi ringkasanGaji yang
//    mengembalikan TUPLE [jumlahKaryawan, totalGaji].
// 5. Ramal dulu: apa error kalau literal Manager lupa jumlahBawahan?

// ========================================
// JAWABAN
// ========================================

// ------------------------------------------------------------------
// (1) HIERARKI KARYAWAN — extends membedakan bentuk data sejenis
// ------------------------------------------------------------------
interface Karyawan {
  readonly id: string;
  nama: string;
  gajiPokok: number;
}

interface Manager extends Karyawan {
  jumlahBawahan: number;
}

interface Kontrak extends Karyawan {
  sampai: string; // tanggal berakhir "YYYY-MM-DD"
}

// Sama seperti e1: literal turunan diberi tipe turunannya DULU
// (langsung di array Karyawan[] = TS2353 excess property)
const sari: Manager = { id: "K1", nama: "Sari", gajiPokok: 9000000, jumlahBawahan: 3 };
const budi: Kontrak = { id: "K2", nama: "Budi", gajiPokok: 5000000, sampai: "2026-12-31" };
const citra: Karyawan = { id: "K3", nama: "Citra", gajiPokok: 7000000 }; // tetap biasa
const dewi: Kontrak = { id: "K4", nama: "Dewi", gajiPokok: 4500000, sampai: "2027-06-30" };

const tim: Karyawan[] = [sari, budi, citra, dewi];

for (const k of tim) {
  console.log(`${k.id} ${k.nama} Rp${k.gajiPokok}`);
}
// K1 Sari Rp9000000
// K2 Budi Rp5000000
// K3 Citra Rp7000000
// K4 Dewi Rp4500000

// ------------------------------------------------------------------
// (2) DIREKTORI PER-ID — indexable = akses O(1) tanpa menelusuri array
//     (≈ Map<String, Karyawan> di Dart)
// ------------------------------------------------------------------
interface Direktori {
  [id: string]: Karyawan;
}

const direktori: Direktori = {};
for (const k of tim) {
  direktori[k.id] = k; // kunci = id, nilai = object karyawan
}

console.log(direktori["K2"].nama); // Budi
console.log(direktori["K3"].nama); // Citra
console.log(direktori["K-999"]);   // undefined ← key absen (jebakan materi 18:
//                                   tipe bilang Karyawan, runtime undefined —
//                                   akses .nama-nya akan crash saat jalan)

// ------------------------------------------------------------------
// (3) PAYROLL DENGAN CALLBACK — kalkulator ditukar-tukar tanpa
//     mengubah hitungPayroll (pola pipeline latihan a2)
// ------------------------------------------------------------------
interface KalkulatorGaji {
  (k: Karyawan): number;
}

function hitungPayroll(daftar: Karyawan[], kalk: KalkulatorGaji): number {
  let total: number = 0;
  for (const k of daftar) {
    total = total + kalk(k);
  }
  return total;
}

const gajiDasar: KalkulatorGaji = (k) => k.gajiPokok;
const gajiTunjangan: KalkulatorGaji = (k) => k.gajiPokok + 500000;

console.log(hitungPayroll(tim, gajiDasar));    // 25500000
console.log(hitungPayroll(tim, gajiTunjangan)); // 27500000

// ------------------------------------------------------------------
// (4) INTERSECTION + TUPLE — profil lengkap & laporan ringkas
// ------------------------------------------------------------------
type KaryawanAktif = Karyawan & { email: string };

const sariLengkap: KaryawanAktif = {
  id: "K1",
  nama: "Sari",
  gajiPokok: 9000000,
  email: "sari@kafe.id",
};

console.log(sariLengkap.email); // sari@kafe.id

function ringkasanGaji(daftar: Karyawan[]): [number, number] {
  let total: number = 0;
  for (const k of daftar) {
    total = total + k.gajiPokok;
  }
  return [daftar.length, total]; // tuple: [jumlah, total]
}

const [jumlah, totalGaji] = ringkasanGaji(tim); // destructuring (materi 34)
console.log(`${jumlah} karyawan, total Rp${totalGaji}`); // 4 karyawan, total Rp25500000

// ------------------------------------------------------------------
// (5) RAMAL DULU: Manager menuntut satu property tambahan — literal
//     tanpa itu DITOLAK walau bagian induknya lengkap
// ------------------------------------------------------------------
// const salahManager: Manager = { id: "K-9", nama: "X", gajiPokok: 100 };
// ERROR TS2741: Property 'jumlahBawahan' is missing in type '{ id: string; nama: string; gajiPokok: number; }' but required in type 'Manager'.

// ========================================
// RANGKUMAN
// ========================================
// - extends membangun variasi bentuk di atas kontrak induk; literal
//   turunan wajib lengkap sampai property tambahannya (TS2741).
// - Indexable direktori = kunci bebas untuk akses cepat ≈ Map Dart;
//   key absen memberi undefined saat runtime (materi 18) meski tipenya
//   mengaku Karyawan.
// - Kalkulator sebagai callback membuat payroll fleksibel: dua
//   kebijakan, satu fungsi penghitung.
// - Tuple cocok untuk nilai ganda ringkas ([jumlah, total]) —
//   diambil balik dengan destructuring.

