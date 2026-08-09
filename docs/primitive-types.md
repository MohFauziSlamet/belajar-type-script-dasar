# Tipe Data Primitif (Halaman 26–34)

> Sumber: Materi "TypeScript Dasar" — Eko Kurniawan Khannedy (Programmer Zaman Now)

## 1. Apa itu Tipe Data Primitif?

TypeScript memakai tipe data yang sama dengan JavaScript. Untuk tipe data **primitif** (paling dasar),
ada **3 saja**:

| Tipe Data | Keterangan                       | Contoh                          |
|-----------|----------------------------------|---------------------------------|
| `string`  | Teks                             | `"Fauzi"`, `'halo'`             |
| `number`  | Angka (bulat & desimal sekaligus)| `20`, `3.14`, `0`               |
| `boolean` | Benar atau salah                 | `true`, `false`                 |

> Catatan: di TypeScript **tidak ada** perbedaan `int` / `float` seperti di Java.
> Semua angka cukup ditulis `number`.

---

## 2. Deklarasi Variabel (Strongly Typed)

TypeScript adalah bahasa **Strongly Typed**. Artinya:

- Saat membuat variabel, kita **harus menentukan tipe datanya** (boleh eksplisit, boleh ditebak otomatis).
- Setelah tipe ditentukan, **tidak boleh diubah** ke tipe data lain.

### Cara eksplisit (ditulis langsung)
```typescript
const namaVariabel: tipeData = nilai;

// contoh:
let nama: string = "Fauzi";
let umur: number = 20;
let sudahMenikah: boolean = true;
```

### Cara Type Inference (ditebak otomatis)
TypeScript pintar — kalau kita langsung memberi nilai, ia **menebak tipe-nya**:
```typescript
let nama = "Fauzi";   // otomatis dianggap string
let umur = 20;        // otomatis dianggap number
let aktif = true;     // otomatis dianggap boolean
```
Hasilnya sama. Tapi banyak programmer tetap menulis eksplisit agar **lebih jelas**.

---

## 3. Boleh Ubah Nilai, Tidak Boleh Ubah Tipe

```typescript
let umur: number = 20;
umur = 21;            // ✅ BOLEH — nilainya berubah, tapi tetap number
umur = "dua puluh";   // ❌ ERROR — tidak boleh jadi string
```

**Analogi:** variabel itu seperti gelas bertuliskan "KOPI".
Kamu boleh ganti kopinya (espresso → americano), tapi **tidak boleh** diisi teh.
Kalau dipaksa diisi teh → TypeScript menolak saat dikompilasi.

---

## 4. Babel TypeScript (Halaman 32–34)

Saat menjalankan unit test, kita pakai **Jest + Babel**. Cara kerja Babel cukup "unik":

> Babel menghapus seluruh kode type annotation TypeScript lalu menjadikannya JavaScript biasa.

### Konsekuensinya
Karena tipenya **dihapus**, beberapa error TypeScript **tidak ikut tertangkap** saat `npm test`,
padahal seharusnya error.

### Contoh kode yang seharusnya error:
```typescript
let umur: number = 20;
umur = "dua puluh";   // seharusnya ERROR, tapi Babel hapus tipenya → test tetap jalan
```

### Solusinya
Jalankan **type-check asli** secara berkala, terpisah dari test:
```bash
npx tsc --noEmit
```
Perintah ini memeriksa semua kode tanpa menghasilkan file output. Inilah pemeriksaan tipe yang **sebenarnya**.

Bisa juga dipasang dalam mode pantau (otomatis cek tiap kali file berubah):
```bash
npx tsc --watch
```

---

## 5. Ringkasan Perintah

| Tujuan                  | Perintah            |
|-------------------------|---------------------|
| Jalankan unit test      | `npm test`          |
| Type-check (WAJIB cek)  | `npx tsc --noEmit`  |
| Kompilasi ke `dist/`    | `npx tsc`           |

---

## 6. File Terkait di Proyek Ini

- **Implementasi:** `src/2_primitive_types.tsx` (6 contoh kasus)
- **Unit Test:** `tests/primitive-types.test.ts`

### Daftar 6 Contoh Kasus
1. `sapa(nama)` — tipe **string** sebagai parameter & return
2. `luasPersegi(sisi)` — tipe **number** (termasuk desimal)
3. `genap(angka)` — tipe **boolean** sebagai return
4. `buatProfil(nama, umur, aktif)` — **kombinasi** ketiga tipe
5. `demoTipeInference()` — **type inference** (tipe ditebak otomatis)
6. `demoUbahNilai()` — **mengubah nilai** selama tipe tetap sama
