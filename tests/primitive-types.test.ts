import {
    sapa,
    luasPersegi,
    genap,
    buatProfil,
    demoTipeInference,
    demoUbahNilai,
} from "../src/2_primitive_types.tsx";

describe("Tipe Data Primitif", () => {
    it("(1) string — function sapa()", () => {
        expect(sapa("Fauzi")).toBe("Halo, Fauzi!");
    });

    it("(2) number — function luasPersegi()", () => {
        expect(luasPersegi(5)).toBe(25);
        expect(luasPersegi(3.5)).toBe(12.25); // desimal juga termasuk number
    });

    it("(3) boolean — function genap()", () => {
        expect(genap(4)).toBe(true);
        expect(genap(7)).toBe(false);
    });

    it("(4) kombinasi string+number+boolean — buatProfil()", () => {
        expect(buatProfil("Azka", 5, true)).toBe("Azka berumur 5 tahun, status: aktif");
        expect(buatProfil("Budi", 30, false)).toBe("Budi berumur 30 tahun, status: tidak aktif");
    });

    it("(5) type inference — tipe ditebak otomatis", () => {
        const hasil = demoTipeInference();
        expect(hasil.teks).toBe("Belajar TypeScript");
        expect(hasil.angka).toBe(2024);
        expect(hasil.benar).toBe(true);
    });

    it("(6) ubah nilai boleh selama tipe sama", () => {
        expect(demoUbahNilai()).toBe(22); // 21 + 1
    });

    // === DEMO BABEL (halaman 33-34) ===
    // Babel MENGHAPUS type annotation saat test berjalan.
    // Akibatnya, error TS tertentu TIDAK muncul di Jest, padahal seharusnya error.
    // Kode berikut akan error jika dicek `npx tsc --noEmit`,
    // tapi TIDAK error saat `npm test` (karena Babel hapus tipenya).
    //
    // it("demonstrasi error yang dilewati Babel", () => {
    //     let umur: number = 20;
    //     // @ts-expect-error → seharusnya error karena string dimasukkan ke number
    //     umur = "dua puluh";
    //     expect(umur).toBe("dua puluh");
    // });
});
