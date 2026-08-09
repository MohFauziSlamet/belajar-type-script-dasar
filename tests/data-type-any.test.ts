
describe("Data Type 'any' - TypeScript Any Type Deep Dive", () => {

    // ========================================
    // APA ITU 'any' TYPE?
    // ========================================
    // 'any' adalah tipe data yang menonaktifkan type checking
    // Bisa menerima nilai apapun tanpa validasi TypeScript
    // PERINGATAN: Menghilangkan manfaat utama TypeScript!
    
    describe("Basic 'any' Type Understanding", () => {
        it("should allow any value without type checking", () => {
            // Variable dengan type 'any' bisa menampung tipe data apapun
            let anything: any = "hello";
            expect(anything).toBe("hello");
            console.info("Initial value (string):", anything);
            
            // Bisa berubah ke number tanpa error
            anything = 42;
            expect(anything).toBe(42);
            console.info("Changed to number:", anything);
            
            // Bisa berubah ke boolean
            anything = true;
            expect(anything).toBe(true);
            console.info("Changed to boolean:", anything);
            
            // Bisa berubah ke object
            anything = { name: "John", age: 30 };
            expect(anything.name).toBe("John");
            console.info("Changed to object:", anything);
            
            // Bisa berubah ke array
            anything = [1, 2, 3, "mixed"];
            expect(anything.length).toBe(4);
            console.info("Changed to array:", anything);
            
            // Bahkan bisa menjadi function
            anything = function() { return "I'm a function"; };
            expect(anything()).toBe("I'm a function");
            console.info("Changed to function:", anything);
        });
    });

    // ========================================
    // MASALAH DENGAN 'any' TYPE
    // ========================================
    describe("Problems with 'any' Type - Why You Should Avoid It", () => {
        it("should demonstrate loss of type safety", () => {
            let dangerousData: any = "hello world";
            
            // TypeScript tidak akan error, tapi runtime bisa crash!
            // Ini sangat berbahaya karena tidak ada warning
            try {
                // String tidak punya method .push()
                // TypeScript tidak akan complain karena type 'any'
                // dangerousData.push("new item"); // Ini akan runtime error!
                
                // String tidak punya property .nonExistentProperty
                const result = dangerousData.nonExistentProperty?.someMethod?.();
                expect(result).toBeUndefined();
                console.info("Accessing non-existent property:", result);
                
                // Matematika dengan string bisa menghasilkan NaN
                const calculation = dangerousData * 2; // "hello world" * 2 = NaN
                expect(Number.isNaN(calculation)).toBe(true);
                console.info("String * 2 =", calculation);
                
            } catch (error) {
                console.error("Runtime error occurred:", error);
            }
        });

        it("should show intellisense and autocomplete loss", () => {
            // Dengan type yang spesifik
            const specificString: string = "hello";
            // IDE akan memberikan autocomplete: .charAt(), .slice(), .toUpperCase(), etc.
            expect(specificString.toUpperCase()).toBe("HELLO");
            console.info("String methods available:", Object.getOwnPropertyNames(String.prototype).slice(0, 5));
            
            // Dengan 'any' type
            const anyValue: any = "hello";
            // IDE TIDAK akan memberikan autocomplete yang berguna
            // Developer kehilangan bantuan IDE
            expect(anyValue.toUpperCase()).toBe("HELLO");
            console.info("With 'any', you lose IDE autocomplete benefits");
        });
    });

    // ========================================
    // KAPAN 'any' BOLEH DIGUNAKAN
    // ========================================
    describe("Valid Use Cases for 'any' Type", () => {
        it("should handle JavaScript migration scenarios", () => {
            // Skenario 1: Migrasi dari JavaScript ke TypeScript
            // Sementara waktu pakai 'any', nanti diubah ke type yang tepat
            const legacyJavaScriptFunction = (data: any): any => {
                // Legacy code yang belum diketahui type-nya
                return data.someComplexOperation?.();
            };
            
            const result = legacyJavaScriptFunction({ someComplexOperation: () => "migrated" });
            expect(result).toBe("migrated");
            console.info("Legacy migration result:", result);
        });

        it("should handle third-party libraries without types", () => {
            // Skenario 2: Library pihak ketiga tanpa type definitions
            // Simulasi library eksternal
            const externalLibrary: any = {
                complexMethod: (input: any) => `Processed: ${input}`,
                version: "1.0.0"
            };
            
            const processed = externalLibrary.complexMethod("data");
            expect(processed).toBe("Processed: data");
            console.info("External library result:", processed);
        });

        it("should handle truly dynamic content", () => {
            // Skenario 3: Data yang benar-benar dinamis (JSON parsing)
            const jsonString = '{"name": "John", "age": 30, "active": true}';
            const parsedData: any = JSON.parse(jsonString);
            
            expect(parsedData.name).toBe("John");
            expect(parsedData.age).toBe(30);
            expect(parsedData.active).toBe(true);
            console.info("Parsed JSON data:", parsedData);
        });
    });

    // ========================================
    // ALTERNATIF YANG LEBIH BAIK DARI 'any'
    // ========================================
    describe("Better Alternatives to 'any' Type", () => {
        it("should use 'unknown' instead of 'any' for safer dynamic content", () => {
            // 'unknown' lebih aman dari 'any' - butuh type checking
            let saferDynamic: unknown = "hello";
            
            // Harus melakukan type checking sebelum digunakan
            if (typeof saferDynamic === "string") {
                expect(saferDynamic.toUpperCase()).toBe("HELLO");
                console.info("Safe string operation:", saferDynamic.toUpperCase());
            }
            
            saferDynamic = 42;
            if (typeof saferDynamic === "number") {
                expect(saferDynamic * 2).toBe(84);
                console.info("Safe number operation:", saferDynamic * 2);
            }
        });

        it("should use union types for multiple possible types", () => {
            // Union types lebih eksplisit dan aman
            type ApiResponse = 
                | { status: "success"; data: any }
                | { status: "error"; message: string };
            
            const successResponse: ApiResponse = {
                status: "success",
                data: { user: "John" }
            };
            
            const errorResponse: ApiResponse = {
                status: "error",
                message: "User not found"
            };
            
            // Type narrowing dengan discriminated unions
            function handleResponse(response: ApiResponse) {
                if (response.status === "success") {
                    return `Data: ${JSON.stringify(response.data)}`;
                } else {
                    return `Error: ${response.message}`;
                }
            }
            
            expect(handleResponse(successResponse)).toContain("John");
            expect(handleResponse(errorResponse)).toContain("User not found");
            
            console.info("Success response:", handleResponse(successResponse));
            console.info("Error response:", handleResponse(errorResponse));
        });

        it("should use generic types for reusable flexible code", () => {
            // Generic types memberikan fleksibilitas dengan type safety
            function safeProcess<T>(input: T): { processed: T; timestamp: number } {
                return {
                    processed: input,
                    timestamp: Date.now()
                };
            }
            
            // Type inference otomatis
            const stringResult = safeProcess("hello");
            const numberResult = safeProcess(42);
            const objectResult = safeProcess({ name: "John" });
            
            expect(stringResult.processed).toBe("hello");
            expect(numberResult.processed).toBe(42);
            expect(objectResult.processed.name).toBe("John");
            
            console.info("Generic string result:", stringResult);
            console.info("Generic number result:", numberResult);
            console.info("Generic object result:", objectResult);
        });

        it("should use interface for object structure", () => {
            // Interface memberikan struktur yang jelas
            interface User {
                id: number;
                name: string;
                email?: string; // optional property
                preferences: {
                    theme: "light" | "dark";
                    notifications: boolean;
                };
            }
            
            const user: User = {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                preferences: {
                    theme: "dark",
                    notifications: true
                }
            };
            
            // Type safety dan autocomplete tersedia
            expect(user.name).toBe("John Doe");
            expect(user.preferences.theme).toBe("dark");
            
            console.info("Structured user object:", user);
        });
    });

    // ========================================
    // KONFIGURASI DAN BEST PRACTICES
    // ========================================
    describe("TypeScript Configuration and Best Practices", () => {
        it("should demonstrate strict mode benefits", () => {
            // Dengan strict mode di tsconfig.json:
            // "strict": true,
            // "noImplicitAny": true,
            // "strictNullChecks": true
            
            // TypeScript akan error jika ada implicit 'any'
            // function badFunction(param) { } // Error: Parameter implicitly has 'any' type
            
            // Harus eksplisit
            function goodFunction(param: string): string {
                return param.toUpperCase();
            }
            
            expect(goodFunction("hello")).toBe("HELLO");
            console.info("Strict mode enforces explicit types");
        });

        it("should show gradual typing strategy", () => {
            // Strategi migrasi bertahap dari JavaScript
            
            // Step 1: Mulai dengan 'any' (temporary)
            let step1: any = { name: "John", age: 30 };
            
            // Step 2: Tambahkan sebagian type information
            let step2: { name: string; age: any } = { name: "John", age: 30 };
            
            // Step 3: Lengkapi dengan full typing
            let step3: { name: string; age: number } = { name: "John", age: 30 };
            
            expect(step1.name).toBe("John");
            expect(step2.name).toBe("John");
            expect(step3.name).toBe("John");
            
            console.info("Gradual typing migration:");
            console.info("Step 1 (any):", step1);
            console.info("Step 2 (partial):", step2);
            console.info("Step 3 (full typing):", step3);
        });
    });

    // ========================================
    // KESIMPULAN DAN REKOMENDASI
    // ========================================
    describe("Summary and Recommendations", () => {
        it("should summarize when to avoid 'any'", () => {
            // ❌ JANGAN gunakan 'any' untuk:
            const badExamples = {
                "Simple variables": "let name: any = 'John'", // Gunakan: let name: string
                "Function parameters": "function greet(name: any)", // Gunakan: function greet(name: string)
                "Return types": "function getData(): any", // Gunakan: function getData(): User[]
                "Object properties": "{ data: any }", // Gunakan: { data: User[] }
            };
            
            // ✅ BOLEH gunakan 'any' untuk:
            const goodExamples = {
                "JavaScript migration": "Temporarily during JS to TS conversion",
                "Third-party libs": "Libraries without type definitions",
                "Dynamic JSON": "JSON.parse() results (but prefer 'unknown')",
                "Prototype/POC": "Quick prototyping (but refactor later)"
            };
            
            expect(Object.keys(badExamples).length).toBe(4);
            expect(Object.keys(goodExamples).length).toBe(4);
            
            console.info("❌ Avoid 'any' for:", badExamples);
            console.info("✅ Consider 'any' for:", goodExamples);
            console.info("\n🎯 GOLDEN RULE: Use specific types whenever possible!");
            console.info("📚 Alternatives: unknown, union types, generics, interfaces");
            console.info("⚙️ Enable strict mode in tsconfig.json");
            console.info("🔄 Migrate gradually from 'any' to specific types");
        });
    });
});