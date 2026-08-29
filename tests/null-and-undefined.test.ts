// Test self-contained untuk materi Null & Undefined
// (src/14_null_and_undefined.tsx, PDF hlm. 69-72).
// Mengikuti pola proyek: kode didefinisikan di sini, TIDAK import dari src.

describe("Null and Undefined - TypeScript Testing", () => {

    describe("Dua Jenis Kosong", () => {
        it("should be undefined when declared but not assigned", () => {
            let namaTeman: string | undefined;  // belum diisi
            expect(namaTeman).toBeUndefined();
            namaTeman = "Azka";
            expect(namaTeman).toBe("Azka");
        });

        it("should be null only when set explicitly", () => {
            const catatan: string | null = null;  // sengaja dikosongkan
            expect(catatan).toBeNull();
        });
    });

    describe("Strict Mode (≈ null safety Dart)", () => {
        it("should require union to hold undefined", () => {
            let email: string | undefined = "fauzi@mail.com";
            expect(email).toBe("fauzi@mail.com");

            email = undefined;  // sah karena di-union-kan
            expect(email).toBeUndefined();
        });
    });

    describe("Parameter ? vs | null (inti PDF hlm. 70)", () => {
        function sapa(nama: string, gelar?: string): string {
            return `Halo ${gelar ?? ""}${gelar ? " " : ""}${nama}`;
        }

        function setJudul(judul: string | null): string {
            return judul ?? "(tanpa judul)";
        }

        it("should allow optional param to be skipped or undefined", () => {
            expect(sapa("Fauzi")).toBe("Halo Fauzi");
            expect(sapa("Fauzi", undefined)).toBe("Halo Fauzi");
            expect(sapa("Fauzi", "Mas")).toBe("Halo Mas Fauzi");
        });

        it("should accept null but REQUIRE the argument for | null param", () => {
            expect(setJudul("Berita")).toBe("Berita");
            expect(setJudul(null)).toBe("(tanpa judul)");
        });
    });

    describe("Fakta Unik (warisan JavaScript)", () => {
        it("should treat null and undefined as loosely equal but strictly different", () => {
            expect(null == undefined).toBe(true);    // loose ==
            expect(null === undefined).toBe(false);  // strict ===
        });

        it("should report typeof null as object (bug 1995)", () => {
            expect(typeof null).toBe("object");
            expect(typeof undefined).toBe("undefined");
        });

        it("should let ?? catch BOTH null and undefined", () => {
            function denganDefault(nilai: string | null | undefined): string {
                return nilai ?? "default";
            }
            expect(denganDefault(null)).toBe("default");
            expect(denganDefault(undefined)).toBe("default");
            expect(denganDefault("isi")).toBe("isi");
            expect(denganDefault("")).toBe("");  // "" bukan nullish
        });
    });
});
