// Test self-contained untuk materi Enum (src/13_enum.tsx, PDF hlm. 63-68).
// Mengikuti pola proyek: kode didefinisikan di sini, TIDAK import dari src.

describe("Enum - TypeScript Enum Testing", () => {

    // Enum default: number, mulai dari 0 (PDF hlm. 64-65)
    enum Gender {
        Male,    // 0
        Female,  // 1
    }

    // Nilai awal eksplisit, sisanya meneruskan +1
    enum Level {
        Rajin = 5,
        Malas,   // 6
    }

    // Enum sebagai string (PDF hlm. 67-68)
    enum Status {
        Pending = "PENDING",
        Approved = "APPROVED",
        Rejected = "REJECTED",
    }

    describe("Numeric Enum (default)", () => {
        it("should auto-number members starting from 0", () => {
            expect(Gender.Male).toBe(0);
            expect(Gender.Female).toBe(1);
        });

        it("should continue incrementing from explicit value", () => {
            expect(Level.Rajin).toBe(5);
            expect(Level.Malas).toBe(6);
        });
    });

    describe("String Enum", () => {
        it("should use assigned string values", () => {
            expect(Status.Pending).toBe("PENDING");
            expect(Status.Approved).toBe("APPROVED");
            expect(Status.Rejected).toBe("REJECTED");
        });
    });

    describe("Using Enum in Functions", () => {
        function cekStatus(status: Status): string {
            switch (status) {
                case Status.Pending:
                    return "Menunggu persetujuan";
                case Status.Approved:
                    return "Disetujui";
                default:
                    return "Ditolak";
            }
        }

        it("should branch on enum member via switch", () => {
            expect(cekStatus(Status.Pending)).toBe("Menunggu persetujuan");
            expect(cekStatus(Status.Approved)).toBe("Disetujui");
            expect(cekStatus(Status.Rejected)).toBe("Ditolak");
        });

        it("should compare enum member with ===", () => {
            // Lewat function param agar tidak ter-narrow ke satu anggota
            function sudahDisetujui(status: Status): boolean {
                return status === Status.Approved;
            }
            expect(sudahDisetujui(Status.Approved)).toBe(true);
            expect(sudahDisetujui(Status.Pending)).toBe(false);
        });
    });

    describe("Enum in JavaScript = Object (PDF hlm. 67)", () => {
        it("should provide reverse mapping for numeric enum only", () => {
            // Numeric enum: angka → nama (reverse mapping, tidak ada di Dart)
            expect(Gender[0]).toBe("Male");
            expect(Gender[1]).toBe("Female");

            // String enum: TIDAK punya reverse mapping —
            // nilai mentahnya bukan key di object enum
            expect((Status as { [key: string]: unknown })["PENDING"]).toBeUndefined();
        });

        it("should show reverse-mapping keys polluting numeric enum object", () => {
            expect(Object.keys(Gender)).toEqual(["0", "1", "Male", "Female"]);
            // String enum bersih — hanya nama anggota:
            expect(Object.keys(Status)).toEqual(["Pending", "Approved", "Rejected"]);
        });
    });
});
