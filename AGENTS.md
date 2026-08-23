# AGENTS.md — Memori Proyek Belajar TypeScript Dasar

## Tujuan
Repositori ini adalah **proyek belajar TypeScript** pemilik akun dengan bantuan AI.
Kurikulum mengikuti materi **"TypeScript Dasar" oleh Eko Kurniawan Khannedy (Programmer Zaman Now)**
(sumber: `docs/TypeScript Dasar.pdf`, 140 halaman). Bahasa komunikasi utama: **Bahasa Indonesia**.

## Cara AI Membantu (Pedoman)
- **MEMORI VAULT (WAJIB dibaca di awal sesi)**: `/Users/user/flywheel-vault/projects/belajar-type-script-dasar/memory.md`
  (profil user, kamus Dart → TypeScript, progres, log sesi). Update Progress & Log Sesi di akhir sesi.
- Prompt mentor lengkap: `docs/PROMPT_MENTOR_TS.md` (peran, aturan gaya materi, verifikasi).
- User = Flutter developer mahir Dart, TypeScript level NOL. Jelaskan konsep baru selalu dengan format:
  "Jika di Dart seperti ini → di TypeScript jadi seperti ini" (jangan pakai kata "padanan").
- Bertindak sebagai **tutor**: jelaskan konsep singkat & jelas, lalu beri contoh kode.
- Ikuti **alur kurikulum** di bawah. Jangan meloncat ke materi OOP/Generic/Decorator (materi lanjutan).
- Materi baru: SATU file `src/NN_topik.ts` gaya **define-then-print** (definisi → langsung
  `console.log` + komentar output). Unit test di `tests/` bersifat **OPSIONAL** (latihan saja,
  keputusan 2026-08-23). File lama tetap gaya function + test — jangan diubah paksa.
- **Jangan hanya memberi jawaban** — bantu pengguna memahami dengan analogi/contoh sederhana.
- Saat ada error TypeScript, jelaskan *penyebab* dan *cara memperbaikinya*, bukan cuma patch.
- Verifikasi dengan: `npx tsx src/NN_topik.ts` (jalankan + cocokkan output) dan `npx tsc --noEmit` (type-check).
  `npm test` hanya jika ada file test.
- Referensi resmi: https://www.typescriptlang.org/ (sudah di-allow di settings).

## Tech Stack & Konfigurasi
- **Runtime**: Node.js, ESM (`"type": "module"`)
- **TypeScript** ^5.9.3, **tsconfig** mode ketat (`strict: true`)
- **tsx** (devDependency): jalankan file TS langsung tanpa kompilasi manual. CATATAN: `tsx`
  hanya transpile, TIDAK type-check.
- **Testing**: Jest ^30 + Babel (`babel-jest` + `@babel/preset-env` + `@babel/preset-typescript`) — opsional
- **Catatan Babel**: Babel menghapus type annotation saat test → beberapa error TS tidak tertangkap
  di Jest. Karena itu jalankan `npx tsc --noEmit` secara berkala untuk type-check asli.
- Ekstensi file sumber pakai `.tsx` (konvensi proyek), padahal isi bukan React JSX.

## Perintah Penting
| Tujuan | Perintah |
|---|---|
| Jalankan file materi langsung | `npx tsx src/NN_topik.ts` |
| Jalankan semua unit test | `npm test` |
| Jalankan satu file test | `npx jest tests/enum.test.ts` |
| Type-check tanpa emit | `npx tsc --noEmit` |
| Kompilasi ke `dist/` | `npx tsc` |
| Watch compiler | `npx tsc --watch` |

## Konvensi File
- Implementasi: `src/<nomor>_<nama>.tsx` (mis. `1_say_hello.tsx`, `enum.tsx`)
- Materi baru gaya mentor: define-then-print (definisi → `console.log` + komentar output),
  diakhiri RANGKUMAN (komentar) + LATIHAN sederhana
- Test (opsional): `tests/<nama>.test.ts`, import via path relatif `../src/<file>.tsx`
- Pola test: `describe("<Topik>")` → `it("should ...", () => { expect(...).toBe(...) })`
- Semua export pakai `export function ...` (named export).

## Peta Kurikulum & Progres
Legenda: [x] selesai · [ ] belum

### Bagian 1 — Setup & Pengenalan
- [x] Pengenalan TypeScript (bahasa strongly-typed by Microsoft, dikompilasi ke JS)
- [x] Membuat Project (npm init, `type: module`)
- [x] Menambah Jest + Babel + TypeScript, setup tsconfig.json
- [x] **Say Hello Function** — `src/1_say_hello.tsx`, `tests/say-hello.test.ts`
- [x] Kompilasi TypeScript (`npx tsc`, output `dist/`)
- [x] Include & Exclude di tsconfig

### Bagian 2 — Tipe Data
- [x] Tipe Data Primitif — `number`, `boolean`, `string` → `tests/data-type.test.ts`
- [x] Babel TypeScript (jenis stripping type, perlu `tsc` rutin)
- [x] Tipe Data Array — `TipeData[]` / `Array<TipeData>` → `tests/data-type-array.test.ts`
- [ ] Read Only Array — `ReadonlyArray<TipeData>`
- [ ] Tuple — array dengan panjang & tipe per index tetap
- [x] Tipe Data Any → `tests/data-type-any.test.ts`
- [x] Union Type (`a | b`) → `tests/data-type-union.test.ts`
- [ ] Menggunakan Union Type (cek dengan `typeof`)
- [x] Type Alias (`type Nama = {...}`) → `tests/data-type-alias.test.ts`
- [ ] Type Alias untuk Union Type
- [x] Object Type → `tests/data-type-object.test.ts`
- [x] Optional Properties (`?`) → `tests/optional-property.test.ts`
- [x] Enum (default jadi number) → `src/enum.tsx`, `tests/enum.test.ts`
- [ ] Enum sebagai String
- [x] Null dan Undefined → `src/null-and-undefined.tsx`, `tests/null-and-undefined.test.ts`

### Bagian 3 — Interface & Tipe Lanjutan
- [ ] Interface (`interface Nama {...}`)
- [ ] Readonly Properties
- [ ] Function Interfaces
- [ ] Indexable Interface (Array & Object)
- [ ] Extending Interface (`extends`)
- [ ] Function di Interface (method sebagai attribute)
- [ ] Intersection Types (`&`)
- [ ] Type Assertions (`as`)

### Bagian 4 — Function
- [ ] Function (parameter bertipe + return type)
- [ ] Function Parameter (rest, default, optional `?`)
- [ ] Function Overloading
- [ ] Function sebagai Parameter (callback)

### Bagian 5 — Control Flow (sama seperti JavaScript)
- [ ] If Statement
- [ ] Ternary Operator
- [ ] Switch Statement
- [ ] For Loop (for / for-in / for-of)
- [ ] While Loop
- [ ] Do While Loop
- [ ] Break dan Continue
- [ ] JavaScript Feature (operator, destructuring, modules, dll)

### Materi Lanjutan (di luar lingkup kelas Dasar)
- TypeScript Object Oriented Programming
- TypeScript Generic
- TypeScript Decorator

## Catatan Tambahan
- `dist/` berisi hasil kompilasi (jangan edit manual).
- `tests/tests/` adalah folder kosong (kemungkinan salah buat — bisa diabaikan/dihapus).
- Untuk membaca PDF, model utama tidak support PDF langsung; ekstrak via `pypdf`
  (`pip3 install pypdf` lalu `PdfReader(...).extract_text()`).
