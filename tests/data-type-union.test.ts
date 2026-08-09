
describe("Union Types - TypeScript Union Types Deep Dive", () => {

    // ========================================
    // APA ITU UNION TYPES?
    // ========================================
    // Union Types memungkinkan variable menerima salah satu dari beberapa tipe
    // Menggunakan operator | (pipe) untuk menggabungkan tipe
    // Memberikan fleksibilitas sambil mempertahankan type safety
    
    describe("Basic Union Types Understanding", () => {
        it("should handle simple union types with primitive values", () => {
            // Union type paling dasar: string atau number
            let value: string | number = "hello";
            expect(typeof value).toBe("string");
            console.info("Initial value (string):", value, "- Type:", typeof value);
            
            // Bisa berubah ke number
            value = 42;
            expect(typeof value).toBe("number");
            console.info("Changed to number:", value, "- Type:", typeof value);
            
            // Union dengan 3 tipe: string, number, boolean
            let multiValue: string | number | boolean = "start";
            expect(multiValue).toBe("start");
            console.info("Multi union initial:", multiValue);
            
            multiValue = 100;
            expect(multiValue).toBe(100);
            console.info("Multi union number:", multiValue);
            
            multiValue = true;
            expect(multiValue).toBe(true);
            console.info("Multi union boolean:", multiValue);
        });

        it("should handle union with null and undefined", () => {
            // Union type dengan null (nullable types)
            let nullable: string | null = "data";
            expect(nullable).toBe("data");
            console.info("Nullable value:", nullable);
            
            nullable = null;
            expect(nullable).toBe(null);
            console.info("Nullable set to null:", nullable);
            
            // Union dengan undefined
            let optional: string | undefined = "present";
            expect(optional).toBe("present");
            console.info("Optional value:", optional);
            
            optional = undefined;
            expect(optional).toBe(undefined);
            console.info("Optional set to undefined:", optional);
            
            // Triple union: string, null, atau undefined
            let flexible: string | null | undefined = "active";
            expect(flexible).toBe("active");
            console.info("Flexible value:", flexible);
        });
    });

    // ========================================
    // TYPE NARROWING - MEMPERSEMPIT TIPE
    // ========================================
    describe("Type Narrowing Techniques", () => {
        it("should use typeof for type narrowing", () => {
            function processValue(input: string | number): string {
                // Type narrowing menggunakan typeof
                if (typeof input === "string") {
                    // Di dalam blok ini, TypeScript tahu input adalah string
                    const result = input.toUpperCase(); // Method string tersedia
                    console.info("String processing:", input, "→", result);
                    return `String: ${result}`;
                } else {
                    // Di blok else, TypeScript tahu input adalah number
                    const result = input * 2; // Operasi matematika tersedia
                    console.info("Number processing:", input, "→", result);
                    return `Number: ${result}`;
                }
            }
            
            expect(processValue("hello")).toBe("String: HELLO");
            expect(processValue(21)).toBe("Number: 42");
        });

        it("should use instanceof for class type narrowing", () => {
            class Dog {
                name: string;
                constructor(name: string) {
                    this.name = name;
                }
                bark(): string {
                    return `${this.name} says Woof!`;
                }
            }
            
            class Cat {
                name: string;
                constructor(name: string) {
                    this.name = name;
                }
                meow(): string {
                    return `${this.name} says Meow!`;
                }
            }
            
            function makeSound(animal: Dog | Cat): string {
                // Type narrowing menggunakan instanceof
                if (animal instanceof Dog) {
                    // TypeScript tahu ini Dog, method .bark() tersedia
                    const sound = animal.bark();
                    console.info("Dog sound:", sound);
                    return sound;
                } else {
                    // TypeScript tahu ini Cat, method .meow() tersedia
                    const sound = animal.meow();
                    console.info("Cat sound:", sound);
                    return sound;
                }
            }
            
            const dog = new Dog("Buddy");
            const cat = new Cat("Whiskers");
            
            expect(makeSound(dog)).toBe("Buddy says Woof!");
            expect(makeSound(cat)).toBe("Whiskers says Meow!");
        });

        it("should use 'in' operator for property checking", () => {
            interface Bird {
                type: "bird";
                wingspan: number;
                fly(): string;
            }
            
            interface Fish {
                type: "fish";
                fins: number;
                swim(): string;
            }
            
            function animalAction(creature: Bird | Fish): string {
                // Type narrowing menggunakan 'in' operator
                if ("wingspan" in creature) {
                    // TypeScript tahu ini Bird
                    const action = creature.fly();
                    console.info("Bird action:", action, "Wingspan:", creature.wingspan);
                    return action;
                } else {
                    // TypeScript tahu ini Fish
                    const action = creature.swim();
                    console.info("Fish action:", action, "Fins:", creature.fins);
                    return action;
                }
            }
            
            const bird: Bird = {
                type: "bird",
                wingspan: 120,
                fly: () => "Flying high!"
            };
            
            const fish: Fish = {
                type: "fish",
                fins: 4,
                swim: () => "Swimming fast!"
            };
            
            expect(animalAction(bird)).toBe("Flying high!");
            expect(animalAction(fish)).toBe("Swimming fast!");
        });
    });

    // ========================================
    // DISCRIMINATED UNIONS
    // ========================================
    describe("Discriminated Unions (Tagged Unions)", () => {
        it("should use discriminated unions for better type safety", () => {
            // Discriminated union dengan property 'kind' sebagai discriminator
            type Shape = 
                | { kind: "circle"; radius: number }
                | { kind: "rectangle"; width: number; height: number }
                | { kind: "triangle"; base: number; height: number };
            
            function calculateArea(shape: Shape): number {
                // Type narrowing berdasarkan discriminator 'kind'
                switch (shape.kind) {
                    case "circle":
                        // TypeScript tahu shape.radius tersedia
                        const circleArea = Math.PI * shape.radius ** 2;
                        console.info(`Circle area (r=${shape.radius}):`, circleArea.toFixed(2));
                        return circleArea;
                        
                    case "rectangle":
                        // TypeScript tahu shape.width dan shape.height tersedia
                        const rectArea = shape.width * shape.height;
                        console.info(`Rectangle area (${shape.width}x${shape.height}):`, rectArea);
                        return rectArea;
                        
                    case "triangle":
                        // TypeScript tahu shape.base dan shape.height tersedia
                        const triArea = (shape.base * shape.height) / 2;
                        console.info(`Triangle area (base=${shape.base}, height=${shape.height}):`, triArea);
                        return triArea;
                        
                    default:
                        // TypeScript exhaustiveness check
                        const _exhaustive: never = shape;
                        throw new Error(`Unknown shape: ${_exhaustive}`);
                }
            }
            
            const circle: Shape = { kind: "circle", radius: 5 };
            const rectangle: Shape = { kind: "rectangle", width: 10, height: 6 };
            const triangle: Shape = { kind: "triangle", base: 8, height: 4 };
            
            expect(calculateArea(circle)).toBeCloseTo(78.54, 1);
            expect(calculateArea(rectangle)).toBe(60);
            expect(calculateArea(triangle)).toBe(16);
        });

        it("should handle API response types with discriminated unions", () => {
            // Real-world example: API response types
            type ApiResponse<T> = 
                | { status: "loading" }
                | { status: "success"; data: T }
                | { status: "error"; error: string; code: number };
            
            function handleUserResponse(response: ApiResponse<{ id: number; name: string }>): string {
                switch (response.status) {
                    case "loading":
                        console.info("API Status: Loading...");
                        return "Please wait, loading user data...";
                        
                    case "success":
                        // TypeScript tahu response.data tersedia dan bertipe { id: number; name: string }
                        console.info("API Success:", response.data);
                        return `Welcome, ${response.data.name}! (ID: ${response.data.id})`;
                        
                    case "error":
                        // TypeScript tahu response.error dan response.code tersedia
                        console.error("API Error:", response.error, "Code:", response.code);
                        return `Error ${response.code}: ${response.error}`;
                        
                    default:
                        const _exhaustive: never = response;
                        throw new Error(`Unhandled response: ${_exhaustive}`);
                }
            }
            
            const loading: ApiResponse<{ id: number; name: string }> = { status: "loading" };
            const success: ApiResponse<{ id: number; name: string }> = { 
                status: "success", 
                data: { id: 1, name: "John Doe" } 
            };
            const error: ApiResponse<{ id: number; name: string }> = { 
                status: "error", 
                error: "User not found", 
                code: 404 
            };
            
            expect(handleUserResponse(loading)).toContain("Please wait");
            expect(handleUserResponse(success)).toContain("Welcome, John Doe");
            expect(handleUserResponse(error)).toContain("Error 404");
        });
    });

    // ========================================
    // UNION TYPES DENGAN FUNCTIONS
    // ========================================
    describe("Union Types with Functions", () => {
        it("should handle function parameter unions", () => {
            // Function yang menerima berbagai tipe input
            function formatId(id: string | number): string {
                if (typeof id === "string") {
                    // String ID: transform ke uppercase
                    const formatted = id.toUpperCase();
                    console.info("String ID formatted:", id, "→", formatted);
                    return `ID-${formatted}`;
                } else {
                    // Number ID: pad dengan zeros
                    const formatted = id.toString().padStart(6, "0");
                    console.info("Number ID formatted:", id, "→", formatted);
                    return `ID-${formatted}`;
                }
            }
            
            expect(formatId("abc123")).toBe("ID-ABC123");
            expect(formatId(42)).toBe("ID-000042");
        });

        it("should handle function return type unions", () => {
            // Function yang return berbagai tipe berdasarkan kondisi
            function getConfigValue(key: string): string | number | boolean | null {
                const config: Record<string, string | number | boolean | null> = {
                    "app_name": "MyApp",
                    "port": 3000,
                    "debug": true,
                    "cache_duration": null
                };
                
                const value = config[key] ?? null;
                console.info(`Config[${key}]:`, value, "- Type:", typeof value);
                return value;
            }
            
            // TypeScript tahu return type bisa string | number | boolean | null
            const appName = getConfigValue("app_name");
            const port = getConfigValue("port"); 
            const debug = getConfigValue("debug");
            const cache = getConfigValue("cache_duration");
            
            expect(appName).toBe("MyApp");
            expect(port).toBe(3000);
            expect(debug).toBe(true);
            expect(cache).toBe(null);
        });
    });

    // ========================================
    // ARRAY UNIONS DAN OBJECT UNIONS
    // ========================================
    describe("Complex Union Types", () => {
        it("should handle array with union element types", () => {
            // Array yang bisa berisi mixed types
            const mixedArray: (string | number | boolean)[] = [
                "hello", 
                42, 
                true, 
                "world", 
                100, 
                false
            ];
            
            // Process setiap elemen dengan type narrowing
            const processed = mixedArray.map((item, index) => {
                if (typeof item === "string") {
                    const result = `"${item.toUpperCase()}"`;
                    console.info(`Array[${index}] string:`, item, "→", result);
                    return result;
                } else if (typeof item === "number") {
                    const result = item * 2;
                    console.info(`Array[${index}] number:`, item, "→", result);
                    return result;
                } else {
                    const result = !item;
                    console.info(`Array[${index}] boolean:`, item, "→", result);
                    return result;
                }
            });
            
            expect(processed).toEqual(['"HELLO"', 84, false, '"WORLD"', 200, true]);
        });

        it("should handle object property unions", () => {
            // Object dengan properties yang bisa berbagai tipe
            interface FlexibleConfig {
                name: string;
                value: string | number | boolean;
                metadata?: { [key: string]: string | number } | null;
            }
            
            const configs: FlexibleConfig[] = [
                { 
                    name: "app_title", 
                    value: "My Application",
                    metadata: { category: "ui", priority: 1 }
                },
                { 
                    name: "max_connections", 
                    value: 100,
                    metadata: { category: "performance", timeout: 30 }
                },
                { 
                    name: "enable_logging", 
                    value: true,
                    metadata: null
                }
            ];
            
            configs.forEach((config, index) => {
                console.info(`Config[${index}] - ${config.name}:`);
                
                // Type narrowing untuk value
                if (typeof config.value === "string") {
                    console.info(`  Value (string): "${config.value}"`);
                    expect(typeof config.value).toBe("string");
                } else if (typeof config.value === "number") {
                    console.info(`  Value (number): ${config.value}`);
                    expect(typeof config.value).toBe("number");
                } else {
                    console.info(`  Value (boolean): ${config.value}`);
                    expect(typeof config.value).toBe("boolean");
                }
                
                // Type narrowing untuk metadata
                if (config.metadata === null) {
                    console.info("  Metadata: null");
                } else if (config.metadata === undefined) {
                    console.info("  Metadata: undefined");
                } else {
                    console.info("  Metadata:", config.metadata);
                    expect(typeof config.metadata).toBe("object");
                }
            });
            
            expect(configs.length).toBe(3);
        });
    });

    // ========================================
    // TYPE GUARDS DAN UTILITY FUNCTIONS
    // ========================================
    describe("Type Guards and Utility Functions", () => {
        it("should create custom type guard functions", () => {
            // Custom type guard functions
            function isString(value: unknown): value is string {
                return typeof value === "string";
            }
            
            function isNumber(value: unknown): value is number {
                return typeof value === "number" && !isNaN(value);
            }
            
            function isValidEmail(value: string | number): value is string {
                return typeof value === "string" && value.includes("@");
            }
            
            // Test dengan mixed data
            const mixedData: unknown[] = ["hello", 42, "user@email.com", NaN, true, "invalid-email"];
            
            mixedData.forEach((item, index) => {
                console.info(`Item[${index}]:`, item);
                
                if (isString(item)) {
                    console.info(`  → String detected: "${item}"`);
                    if (isValidEmail(item)) {
                        console.info(`  → Valid email: ${item}`);
                        expect(item).toContain("@");
                    }
                } else if (isNumber(item)) {
                    console.info(`  → Number detected: ${item}`);
                    expect(typeof item).toBe("number");
                } else {
                    console.info(`  → Other type: ${typeof item}`);
                }
            });
        });

        it("should handle exhaustiveness checking", () => {
            // Exhaustiveness checking untuk memastikan semua cases tertangani
            type Theme = "light" | "dark" | "auto";
            
            function getThemeColor(theme: Theme): string {
                switch (theme) {
                    case "light":
                        console.info("Theme: Light mode activated");
                        return "#ffffff";
                    case "dark":
                        console.info("Theme: Dark mode activated");
                        return "#000000";
                    case "auto":
                        console.info("Theme: Auto mode (system preference)");
                        return "#f0f0f0";
                    default:
                        // Exhaustiveness check - TypeScript akan error jika ada case yang terlewat
                        const _exhaustive: never = theme;
                        throw new Error(`Unhandled theme: ${_exhaustive}`);
                }
            }
            
            expect(getThemeColor("light")).toBe("#ffffff");
            expect(getThemeColor("dark")).toBe("#000000");
            expect(getThemeColor("auto")).toBe("#f0f0f0");
        });
    });

    // ========================================
    // BEST PRACTICES DAN RECOMMENDATIONS
    // ========================================
    describe("Best Practices and Recommendations", () => {
        it("should demonstrate union type best practices", () => {
            // ✅ GOOD: Menggunakan literal types untuk kejelasan
            type Status = "pending" | "approved" | "rejected";
            type Priority = "low" | "medium" | "high" | "critical";
            
            interface Task {
                id: string;
                title: string;
                status: Status;
                priority: Priority;
                assignee: string | null; // nullable dengan union
            }
            
            const tasks: Task[] = [
                { id: "1", title: "Fix bug", status: "pending", priority: "high", assignee: "John" },
                { id: "2", title: "Review code", status: "approved", priority: "medium", assignee: null },
                { id: "3", title: "Deploy", status: "rejected", priority: "critical", assignee: "Jane" }
            ];
            
            // Type-safe filtering dan processing
            const criticalTasks = tasks.filter(task => task.priority === "critical");
            const unassignedTasks = tasks.filter(task => task.assignee === null);
            const pendingTasks = tasks.filter(task => task.status === "pending");
            
            expect(criticalTasks.length).toBe(1);
            expect(unassignedTasks.length).toBe(1);
            expect(pendingTasks.length).toBe(1);
            
            console.info("📋 Task Management Example:");
            console.info("Critical tasks:", criticalTasks.map(t => t.title));
            console.info("Unassigned tasks:", unassignedTasks.map(t => t.title));
            console.info("Pending tasks:", pendingTasks.map(t => t.title));
        });

        it("should summarize union types recommendations", () => {
            const bestPractices = {
                "✅ Use literal types": "type Status = 'active' | 'inactive' instead of string",
                "✅ Discriminated unions": "Add common property for easier type narrowing",
                "✅ Type guards": "Create custom type guard functions for complex checks",
                "✅ Exhaustiveness": "Use never type for exhaustiveness checking",
                "✅ Narrow early": "Use type narrowing as early as possible in functions"
            };
            
            const commonPitfalls = {
                "❌ Too many unions": "string | number | boolean | null | undefined - too complex",
                "❌ Missing narrowing": "Using union without proper type checking",
                "❌ Implicit any": "Letting TypeScript infer 'any' instead of union",
                "❌ No exhaustiveness": "Missing cases in switch statements",
                "❌ Wrong order": "null | string instead of string | null (convention)"
            };
            
            expect(Object.keys(bestPractices).length).toBe(5);
            expect(Object.keys(commonPitfalls).length).toBe(5);
            
            console.info("\n🎯 UNION TYPES BEST PRACTICES:");
            Object.entries(bestPractices).forEach(([key, value]) => {
                console.info(`${key}: ${value}`);
            });
            
            console.info("\n⚠️ COMMON PITFALLS TO AVOID:");
            Object.entries(commonPitfalls).forEach(([key, value]) => {
                console.info(`${key}: ${value}`);
            });
            
            console.info("\n📚 KEY TAKEAWAYS:");
            console.info("🔹 Union types provide type safety with flexibility");
            console.info("🔹 Type narrowing is essential for working with unions");
            console.info("🔹 Discriminated unions are the most powerful pattern");
            console.info("🔹 Always handle all possible cases (exhaustiveness)");
            console.info("🔹 Use type guards for complex type checking logic");
        });
    });
});