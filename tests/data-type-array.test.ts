
describe("Array Data Types - TypeScript Array Testing", () => {

    // Test basic array types
    // Ada 2 cara mendeklarasikan array di TypeScript:
    // 1. type[] (sintaks bracket) - lebih umum digunakan
    // 2. Array<type> (generic syntax) - lebih verbose tapi lebih jelas
    it("should handle number array - Deklarasi array dengan tipe number", () => {
        // Cara 1: Menggunakan sintaks bracket []
        const numbers: number[] = [1, 2, 3, 4, 5];

        // Cara 2: Menggunakan generic Array<T>
        const numbersAlt: Array<number> = [10, 20, 30];

        // Validasi: array hanya bisa berisi number
        expect(numbers.length).toBe(5);
        expect(numbersAlt[0]).toBe(10);
        expect(typeof numbers[0]).toBe("number");

        console.info("numbers (bracket syntax): ", numbers);
        console.info("numbersAlt (generic syntax): ", numbersAlt);
    });

    /// ------------------------------------------------------------------------------------------

    // String array - array yang hanya berisi string
    // TypeScript akan memvalidasi bahwa semua elemen adalah string
    it("should handle string array - Array khusus untuk tipe string", () => {
        const fruits: string[] = ["apple", "banana", "orange"];
        const fruitsAlt: Array<string> = ["apple", "banana", "orange"];

        // Method .toContain() untuk mengecek apakah array berisi elemen tertentu
        expect(fruits).toContain("banana");
        expect(fruits.length).toBe(3);
        expect(typeof fruits[0]).toBe("string");

        console.info("fruits : ", fruits);
        console.info("fruits length : ", fruits.length);
        console.info("fruitsAlt : ", fruitsAlt);
        console.info("fruitsAlt length : ", fruitsAlt.length);
    });

    /// ------------------------------------------------------------------------------------------

    // Union Array - array yang bisa berisi multiple types
    // Sintaks: (type1 | type2 | type3)[] - menggunakan union operator |
    // Berguna ketika array perlu menyimpan data dengan tipe berbeda
    it("should handle mixed array - Union types untuk multiple data types", () => {

        // === BASIC UNION ARRAY ===
        // Array yang bisa berisi string ATAU number
        const mixed: (string | number)[] = ["hello", 42, "world", 100];

        expect(mixed[0]).toBe("hello");  // string
        expect(mixed[1]).toBe(42);       // number
        expect(typeof mixed[0]).toBe("string");
        expect(typeof mixed[1]).toBe("number");
        
        console.info("Basic mixed: ", mixed);

        // === COMPLEX UNION ARRAY ===
        // Array dengan 3 tipe: string, number, boolean
        const multiType: (string | number | boolean)[] = [
            "text",
            123,
            true,
            "another text",
            false,
            999
        ];

        expect(multiType.length).toBe(6);
        expect(typeof multiType[0]).toBe("string");
        expect(typeof multiType[1]).toBe("number");
        expect(typeof multiType[2]).toBe("boolean");
        
        console.info("Multi-type: ", multiType);

        // === UNION WITH NULL/UNDEFINED ===
        // Array yang bisa berisi string atau null (untuk optional data)
        const nullable: (string | null)[] = ["data", null, "more data", null];

        // Filter untuk menghilangkan null values
        const validData = nullable.filter((item): item is string => item !== null);
        expect(validData).toEqual(["data", "more data"]);
        expect(validData.length).toBe(2);
        
        console.info("Nullable: ", nullable);
        console.info("Valid data after filter: ", validData);

        // === UNION WITH OBJECT TYPES ===
        // Array yang bisa berisi different object shapes
        const mixedObjects: ({ type: "user"; name: string } | { type: "product"; title: string })[] = [
            { type: "user", name: "John" },
            { type: "product", title: "Laptop" },
            { type: "user", name: "Jane" }
        ];

        expect(mixedObjects[0]?.type).toBe("user");
        expect(mixedObjects[1]?.type).toBe("product");
        
        console.info("Mixed objects: ", mixedObjects);

        // Type narrowing dengan discriminated unions
        mixedObjects.forEach(item => {
            if (item.type === "user") {
                expect(typeof item.name).toBe("string"); // TypeScript tahu ini user
            } else {
                expect(typeof item.title).toBe("string"); // TypeScript tahu ini product
            }
        });

        // === PRACTICAL USE CASES ===
        // 1. API Response yang bisa success atau error
        const apiResponses: ({ status: "success"; data: any } | { status: "error"; message: string })[] = [
            { status: "success", data: { id: 1, name: "John" } },
            { status: "error", message: "User not found" }
        ];

        // 2. Form field values (string, number, atau empty)
        const formValues: (string | number | "")[] = ["John", 25, "", "Doe", 30];

        // 3. Database IDs (bisa string atau number tergantung database)
        const ids: (string | number)[] = [1, "abc123", 2, "def456"];
        
        console.info("API responses: ", apiResponses);
        console.info("Form values: ", formValues);
        console.info("Mixed IDs: ", ids);

    });

    // Tuple - array dengan panjang dan tipe elemen yang fixed
    // Sintaks: [type1, type2, ...] - urutan dan jumlah elemen harus sesuai
    // Berbeda dengan array biasa yang bisa memiliki panjang dinamis
    it("should handle tuple - Fixed-length array dengan tipe elemen tertentu", () => {
        // Tuple untuk koordinat: harus 2 number dalam urutan [x, y]
        const coordinate: [number, number] = [10, 20];

        // Tuple untuk person: harus string dulu, baru number [name, age]
        const person: [string, number] = ["John", 25];

        expect(coordinate[0]).toBe(10);    // x coordinate
        expect(coordinate[1]).toBe(20);    // y coordinate
        expect(person[0]).toBe("John");    // name (string)
        expect(person[1]).toBe(25);        // age (number)

        console.info("coordinate tuple: ", coordinate);
        console.info("person tuple: ", person);
    });

    // Readonly Array - array yang tidak bisa dimodifikasi setelah dibuat
    // Keyword 'readonly' mencegah operasi mutating seperti push, pop, splice
    // Hanya bisa menggunakan method yang tidak mengubah array (immutable methods)
    it("should handle readonly array - Immutable array untuk data protection", () => {
        const readonlyNumbers: readonly number[] = [1, 2, 3];

        // Alternative syntax: ReadonlyArray<number>
        const readonlyAlt: ReadonlyArray<number> = [4, 5, 6];

        expect(readonlyNumbers.length).toBe(3);
        expect(readonlyNumbers.includes(2)).toBe(true);
        expect(readonlyAlt[0]).toBe(4);

        // Readonly array mendukung immutable methods:
        // .includes(), .indexOf(), .slice(), .concat(), .forEach(), .map(), dll

        console.info("readonlyNumbers: ", readonlyNumbers);
        console.info("readonlyAlt: ", readonlyAlt);
    });

    // Array of Objects - array yang berisi object dengan struktur yang sama
    // Sangat berguna untuk menyimpan data seperti daftar user, product, dll
    // Bisa menggunakan interface atau inline object type
    it("should handle object array - Array berisi objects dengan struktur tertentu", () => {
        // Inline object type definition
        const users: { name: string; age: number }[] = [
            { name: "Alice", age: 25 },
            { name: "Bob", age: 30 }
        ];

        // Akses property object dalam array
        expect(users[0]?.name).toBe("Alice");  // Optional chaining untuk safety
        expect(users[1]?.age).toBe(30);
        expect(users.length).toBe(2);

        // Bisa menggunakan array methods seperti map, filter, find
        const names = users.map(user => user.name);
        expect(names).toEqual(["Alice", "Bob"]);

        console.info("users array: ", users);
        console.info("user names: ", names);
    });

    // 2D Array (Multidimensional) - array di dalam array
    // Sintaks: type[][] - array of arrays
    // Berguna untuk matrix, grid, tabel data, dll
    it("should handle 2D array - Nested arrays untuk struktur data matrix", () => {
        const matrix: number[][] = [
            [1, 2, 3],  // baris 0
            [4, 5, 6]   // baris 1
        ];

        // 3D array example
        const cube: number[][][] = [
            [[1, 2], [3, 4]],
            [[5, 6], [7, 8]]
        ];

        // Akses elemen: [baris][kolom]
        expect(matrix[0]?.[1]).toBe(2);  // baris 0, kolom 1
        expect(matrix[1]?.[2]).toBe(6);  // baris 1, kolom 2
        expect(matrix.length).toBe(2);   // jumlah baris
        expect(matrix[0]?.length).toBe(3); // jumlah kolom di baris 0

        console.info("2D matrix: ", matrix);
        console.info("3D cube: ", cube);
        console.info("matrix dimensions: ", matrix.length, "x", matrix[0]?.length);
    });
});