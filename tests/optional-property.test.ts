describe("Optional Properties - TypeScript Optional Properties Simple", () => {

    // ========================================
    // APA ITU OPTIONAL PROPERTIES?
    // ========================================
    // Optional Properties = property yang boleh tidak ada
    // Menggunakan tanda ? setelah nama property
    // Membuat object lebih fleksibel
    
    describe("Basic Optional Properties", () => {
        it("should handle basic optional properties", () => {
            console.info("=== Basic Optional Properties ===");
            
            // Interface dengan optional properties
            interface User {
                id: number;
                name: string;
                email?: string;    // optional - boleh tidak ada
                phone?: string;    // optional - boleh tidak ada
            }
            
            // User tanpa optional properties
            const user1: User = {
                id: 1,
                name: "John Doe"
                // email dan phone tidak ada - ini OK!
            };
            
            // User dengan beberapa optional properties
            const user2: User = {
                id: 2,
                name: "Jane Smith",
                email: "jane@email.com"
                // phone tidak ada - ini juga OK!
            };
            
            // User dengan semua properties
            const user3: User = {
                id: 3,
                name: "Bob Wilson",
                email: "bob@email.com",
                phone: "+6281234567890"
            };
            
            expect(user1.id).toBe(1);
            expect(user1.email).toBeUndefined();
            expect(user2.email).toBe("jane@email.com");
            expect(user3.phone).toBe("+6281234567890");
            
            console.info("User 1 (minimal):", user1);
            console.info("User 2 (with email):", user2);
            console.info("User 3 (complete):", user3);
        });

        it("should handle optional properties with default values", () => {
            console.info("=== Optional Properties with Defaults ===");
            
            interface Config {
                host: string;
                port: number;
                ssl?: boolean;       // optional
                timeout?: number;    // optional
                retries?: number;    // optional
            }
            
            function createConnection(config: Config) {
                // Memberikan default value untuk optional properties
                const ssl = config.ssl ?? false;
                const timeout = config.timeout ?? 5000;
                const retries = config.retries ?? 3;
                
                console.info("Connection config:");
                console.info("- Host:", config.host);
                console.info("- Port:", config.port);
                console.info("- SSL:", ssl);
                console.info("- Timeout:", timeout);
                console.info("- Retries:", retries);
                
                return {
                    host: config.host,
                    port: config.port,
                    ssl,
                    timeout,
                    retries
                };
            }
            
            // Config minimal
            const basicConfig: Config = {
                host: "localhost",
                port: 3000
            };
            
            // Config dengan beberapa optional
            const advancedConfig: Config = {
                host: "production.server.com",
                port: 443,
                ssl: true,
                timeout: 10000
            };
            
            const connection1 = createConnection(basicConfig);
            const connection2 = createConnection(advancedConfig);
            
            expect(connection1.ssl).toBe(false);
            expect(connection1.timeout).toBe(5000);
            expect(connection2.ssl).toBe(true);
            expect(connection2.timeout).toBe(10000);
            expect(connection2.retries).toBe(3); // default value
        });
    });

    describe("Optional Properties in Functions", () => {
        it("should handle optional parameters in functions", () => {
            console.info("=== Optional Function Parameters ===");
            
            // Function dengan optional parameters
            function greetUser(name: string, title?: string, greeting?: string) {
                const finalTitle = title ?? "Mr/Ms";
                const finalGreeting = greeting ?? "Hello";
                
                const message = `${finalGreeting}, ${finalTitle} ${name}!`;
                console.info("Greeting:", message);
                return message;
            }
            
            // Panggil dengan parameter minimal
            const greeting1 = greetUser("John");
            
            // Panggil dengan title
            const greeting2 = greetUser("Jane", "Dr");
            
            // Panggil dengan semua parameter
            const greeting3 = greetUser("Bob", "Prof", "Good morning");
            
            expect(greeting1).toBe("Hello, Mr/Ms John!");
            expect(greeting2).toBe("Hello, Dr Jane!");
            expect(greeting3).toBe("Good morning, Prof Bob!");
        });

        it("should handle optional properties in function objects", () => {
            console.info("=== Optional Properties in Function Objects ===");
            
            interface RequestOptions {
                url: string;
                method: string;
                headers?: { [key: string]: string };  // optional
                body?: string;                        // optional
                timeout?: number;                     // optional
            }
            
            function makeRequest(options: RequestOptions) {
                const request = {
                    url: options.url,
                    method: options.method,
                    headers: options.headers ?? {},
                    body: options.body ?? null,
                    timeout: options.timeout ?? 5000
                };
                
                console.info("Making request:", request);
                return `${request.method} ${request.url}`;
            }
            
            // Request minimal
            const simpleRequest = makeRequest({
                url: "/api/users",
                method: "GET"
            });
            
            // Request dengan headers
            const requestWithHeaders = makeRequest({
                url: "/api/users",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer token123"
                },
                body: JSON.stringify({ name: "John" })
            });
            
            expect(simpleRequest).toBe("GET /api/users");
            expect(requestWithHeaders).toBe("POST /api/users");
        });
    });

    describe("Optional Properties Patterns", () => {
        it("should handle nested optional properties", () => {
            console.info("=== Nested Optional Properties ===");
            
            interface UserProfile {
                id: number;
                name: string;
                contact?: {                    // nested object optional
                    email?: string;            // property dalam object optional
                    phone?: string;
                    address?: {                // nested object dalam optional
                        street?: string;
                        city?: string;
                        country?: string;
                    };
                };
                preferences?: {               // optional object
                    theme?: "light" | "dark";
                    language?: "en" | "id";
                };
            }
            
            // User dengan nested optional minimal
            const user1: UserProfile = {
                id: 1,
                name: "Alice"
            };
            
            // User dengan beberapa nested optional
            const user2: UserProfile = {
                id: 2,
                name: "Bob",
                contact: {
                    email: "bob@email.com"
                },
                preferences: {
                    theme: "dark"
                }
            };
            
            // User dengan nested optional lengkap
            const user3: UserProfile = {
                id: 3,
                name: "Charlie",
                contact: {
                    email: "charlie@email.com",
                    phone: "+6281234567890",
                    address: {
                        street: "Jl. Sudirman No. 123",
                        city: "Jakarta",
                        country: "Indonesia"
                    }
                },
                preferences: {
                    theme: "light",
                    language: "id"
                }
            };
            
            expect(user1.contact).toBeUndefined();
            expect(user2.contact?.email).toBe("bob@email.com");
            expect(user2.contact?.phone).toBeUndefined();
            expect(user3.contact?.address?.city).toBe("Jakarta");
            
            console.info("User 1 contact:", user1.contact ?? "No contact info");
            console.info("User 2 email:", user2.contact?.email ?? "No email");
            console.info("User 3 city:", user3.contact?.address?.city ?? "No city");
        });

        it("should handle optional arrays and methods", () => {
            console.info("=== Optional Arrays and Methods ===");
            
            interface Team {
                id: string;
                name: string;
                members?: string[];           // optional array
                projects?: string[];          // optional array
                budget?: number;              // optional number
                
                // Optional methods
                addMember?: (name: string) => void;
                removeMember?: (name: string) => void;
                getInfo?: () => string;
            }
            
            // Team minimal
            const team1: Team = {
                id: "team1",
                name: "Development Team"
            };
            
            // Team dengan data dan methods
            const team2: Team = {
                id: "team2",
                name: "Design Team",
                members: ["Alice", "Bob", "Charlie"],
                projects: ["Website Redesign", "Mobile App"],
                budget: 50000000,
                
                addMember: function(name: string) {
                    this.members = this.members ?? [];
                    this.members.push(name);
                    console.info(`Added ${name} to ${this.name}`);
                },
                
                getInfo: function() {
                    const memberCount = this.members?.length ?? 0;
                    const projectCount = this.projects?.length ?? 0;
                    return `${this.name}: ${memberCount} members, ${projectCount} projects`;
                }
            };
            
            expect(team1.members).toBeUndefined();
            expect(team2.members?.length).toBe(3);
            expect(team2.projects).toContain("Website Redesign");
            
            // Test optional methods
            team2.addMember?.("David");
            const teamInfo = team2.getInfo?.();
            
            expect(team2.members?.length).toBe(4);
            expect(teamInfo).toContain("Design Team");
            
            console.info("Team 1 members:", team1.members ?? "No members");
            console.info("Team 2 info:", teamInfo);
        });
    });

    describe("Optional Properties Best Practices", () => {
        it("should demonstrate optional property best practices", () => {
            console.info("=== Optional Properties Best Practices ===");
            
            //  GOOD: Meaningful optional properties
            interface Product {
                id: string;
                name: string;
                price: number;
                description?: string;    // Product bisa tanpa deskripsi
                image?: string;          // Product bisa tanpa gambar
                discount?: number;       // Tidak semua product ada diskon
            }
            
            //  GOOD: Optional dengan union types
            interface ApiResponse {
                success: boolean;
                data?: any;              // Ada jika success
                error?: {                // Ada jika gagal
                    message: string;
                    code: number;
                };
                timestamp: string;
            }
            
            //  GOOD: Optional dengan default values pattern
            interface AppSettings {
                theme?: "light" | "dark";
                language?: "en" | "id";
                notifications?: boolean;
            }
            
            function createSettings(userSettings: AppSettings = {}) {
                return {
                    theme: userSettings.theme ?? "light",
                    language: userSettings.language ?? "en",
                    notifications: userSettings.notifications ?? true
                };
            }
            
            const product: Product = {
                id: "prod1",
                name: "Laptop",
                price: 15000000,
                description: "Gaming laptop"
                // image dan discount optional
            };
            
            const successResponse: ApiResponse = {
                success: true,
                data: { users: [] },
                timestamp: "2024-01-15T10:30:00Z"
            };
            
            const errorResponse: ApiResponse = {
                success: false,
                error: {
                    message: "User not found",
                    code: 404
                },
                timestamp: "2024-01-15T10:30:00Z"
            };
            
            const defaultSettings = createSettings();
            const customSettings = createSettings({ theme: "dark", notifications: false });
            
            expect(product.description).toBe("Gaming laptop");
            expect(product.discount).toBeUndefined();
            expect(successResponse.data).toBeDefined();
            expect(errorResponse.error?.code).toBe(404);
            expect(defaultSettings.theme).toBe("light");
            expect(customSettings.theme).toBe("dark");
            
            console.info("Product:", product);
            console.info("Success response data:", successResponse.data);
            console.info("Error response:", errorResponse.error?.message);
            console.info("Default settings:", defaultSettings);
            console.info("Custom settings:", customSettings);
        });

        it("should show optional properties summary", () => {
            console.info("=== Optional Properties Summary ===");
            
            const useCases = {
                "Configuration objects": "Optional settings dengan default values",
                "API responses": "Optional data atau error fields",
                "User profiles": "Optional contact info, preferences",
                "Function parameters": "Optional arguments dengan defaults",
                "Nested objects": "Optional sub-objects dan properties"
            };
            
            const bestPractices = {
                " Use ? for truly optional": "Jangan buat required jadi optional",
                " Provide defaults": "Gunakan ?? operator untuk default values",
                " Optional chaining": "Gunakan ?. untuk safe access",
                " Meaningful optionals": "Optional harus masuk akal secara bisnis",
                " Document behavior": "Jelaskan apa yang terjadi jika undefined"
            };
            
            expect(Object.keys(useCases).length).toBe(5);
            expect(Object.keys(bestPractices).length).toBe(5);
            
            console.info("\n=Ë COMMON USE CASES:");
            Object.entries(useCases).forEach(([key, value]) => {
                console.info(`" ${key}: ${value}`);
            });
            
            console.info("\n<¯ BEST PRACTICES:");
            Object.entries(bestPractices).forEach(([key, value]) => {
                console.info(`${key}: ${value}`);
            });
            
            console.info("\n=Ú KEY POINTS:");
            console.info("=9 Optional properties menggunakan tanda ?");
            console.info("=9 Gunakan ?? operator untuk default values");
            console.info("=9 Gunakan ?. untuk safe property access");
            console.info("=9 Optional membuat interface lebih fleksibel");
            console.info("=9 Jangan overuse - hanya untuk yang benar-benar optional");
        });
    });
});