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
  dengan struktur file WAJIB berurutan:
  1. Banner judul 3 baris (`// ====...` / `// JUDUL UPPERCASE` / `// ====...`) + referensi PDF
  2. Sub-section berulang: garis `------` + penomoran `(1) (2) ...` → penjelasan → kode → cetak
  3. Banner `RANGKUMAN` 3 baris (poin sebagai komentar)
  4. Banner `LATIHAN (+ JAWABAN)` 3 baris — tiap soal langsung disertai jawaban
     (kode + console.log + komentar output; gaya belajar user = fokus membaca)
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
- [x] Tipe Data Array — `TipeData[]` / `Array<TipeData>` → `src/3_array.tsx`, `tests/data-type-array.test.ts`
- [x] Read Only Array — `ReadonlyArray<TipeData>` → `src/4_readonly_array.tsx`
- [x] Tuple — array dengan panjang & tipe per index tetap → `src/5_tuple.tsx`
- [x] Tipe Data Any → `src/6_any.tsx`, `tests/data-type-any.test.ts`
- [x] Union Type (`a | b`) → `src/7_union_type.tsx`, `tests/data-type-union.test.ts`
- [x] Menggunakan Union Type (cek dengan `typeof`) → `src/8_using_union.tsx`
- [x] Type Alias (`type Nama = {...}`) → `src/9_type_alias.tsx`, `tests/data-type-alias.test.ts`
- [x] Type Alias untuk Union Type → `src/10_type_alias_union.tsx`
- [x] Object Type → `src/11_object_type.tsx`, `tests/data-type-object.test.ts`
- [x] Optional Properties (`?`) → `src/12_optional_properties.tsx`, `tests/optional-property.test.ts`
- [x] Enum (default jadi number) + Enum sebagai String → `src/13_enum.tsx`, `tests/enum.test.ts`
- [x] Null dan Undefined → `src/14_null_and_undefined.tsx`, `tests/null-and-undefined.test.ts`

### Bagian 3 — Interface & Tipe Lanjutan
- [x] Interface (`interface Nama {...}`) → `src/15_interface.tsx`
- [x] Readonly Properties → `src/16_readonly_properties.tsx`
- [x] Function Interfaces → `src/17_function_interfaces.tsx`
- [x] Indexable Interface (Array & Object) → `src/18_indexable_interface.tsx`
- [x] Extending Interface (`extends`) → `src/19_extending_interface.tsx`
- [x] Function di Interface (method sebagai attribute) → `src/20_function_in_interface.tsx`
- [x] Intersection Types (`&`) → `src/21_intersection_types.tsx`
- [x] Type Assertions (`as`) → `src/22_type_assertions.tsx`

### Bagian 4 — Function
- [x] Function (parameter bertipe + return type) → `src/23_function.tsx`
- [x] Function Parameter (rest, default, optional `?`) → `src/24_function_parameter.tsx`
- [x] Function Overloading → `src/25_function_overloading.tsx`
- [x] Function sebagai Parameter (callback) → `src/26_function_as_parameter.tsx`

### Bagian 5 — Control Flow (sama seperti JavaScript)
- [x] If Statement → `src/27_if_statement.tsx`
- [x] Ternary Operator → `src/28_ternary_operator.tsx`
- [x] Switch Statement → `src/29_switch_statement.tsx`
- [x] For Loop (for / for-in / for-of) → `src/30_for_loop.tsx`
- [x] While Loop → `src/31_while_loop.tsx`
- [x] Do While Loop → `src/32_do_while_loop.tsx`
- [x] Break dan Continue (break/continue di loop, label `outer:`, jebakan continue-while) → `src/33_break_continue.tsx`
- [x] JavaScript Feature (operator, destructuring, `**`, with statement usang, any sebagai jalan keluar) → `src/34_javascript_feature.tsx`

### Materi Lanjutan
- **TypeScript OOP — repo TERPISAH sejajar**: `../belajar-type-script-oop/`
  (dipindah 2026-08-29 sesi 44; kurikulum mengikuti
  `docs/TypeScript Object Oriented Programming.pdf` DI REPO OOP tersebut;
  memori vault: `belajar-type-script-oop`)
- TypeScript Generic (menyusul setelah OOP)
- TypeScript Decorator (menyusul setelah Generic)

## Catatan Tambahan
- `dist/` berisi hasil kompilasi (jangan edit manual).
- `tests/tests/` adalah folder kosong (kemungkinan salah buat — bisa diabaikan/dihapus).
- Untuk membaca PDF, model utama tidak support PDF langsung; ekstrak via `pypdf`
  (`pip3 install pypdf` lalu `PdfReader(...).extract_text()`).
