describe("Type Alias - TypeScript Type Alias Simple & Detailed", () => {

    // ========================================
    // APA ITU TYPE ALIAS?
    // ========================================
    // Type Alias = memberi nama untuk tipe data
    // Menggunakan keyword 'type'
    // Membuat kode lebih readable dan reusable

    describe("Basic Type Alias", () => {
        it("should create simple type aliases", () => {
            console.info("should create simple type aliases");
            // Type alias untuk primitive types
            type UserID = string;
            type Age = number;
            type IsActive = boolean;

            const userId: UserID = "user123";
            const userAge: Age = 25;
            const active: IsActive = true;

            expect(userId).toBe("user123");
            expect(userAge).toBe(25);
            expect(active).toBe(true);

            console.info("UserID: ", userId, "- Type  : ", typeof userId);
            console.info("Age: ", userAge, "- Type  : ", typeof userAge);
            console.info("Active: ", active, "- Type  : ", typeof active);
        });

        it("should create union type aliases", () => {
            console.info("should create union type aliases");
            // Type alias untuk union types dengan enum-like object
            const STATUS = {
                PENDING: "pending",
                APPROVED: "approved",
                REJECTED: "rejected"
            } as const;

            const PRIORITY = {
                LOW: "low",
                MEDIUM: "medium",
                HIGH: "high"
            } as const;

            type Status = typeof STATUS[keyof typeof STATUS];
            type Priority = typeof PRIORITY[keyof typeof PRIORITY];
            type ID = string | number;

            // Sekarang bisa menggunakan konstanta atau nilai langsung
            const taskStatus: Status = STATUS.PENDING;
            const taskPriority: Priority = PRIORITY.HIGH;
            const taskId: ID = "task-001";

            expect(taskStatus).toBe("pending");
            expect(taskPriority).toBe("high");
            expect(taskId).toBe("task-001");

            console.info("Task status:", taskStatus);
            console.info("Task priority:", taskPriority);
            console.info("Task ID:", taskId, "- Type:", typeof taskId);

            // Bonus: bisa akses semua values dari konstanta
            console.info("All statuses:", Object.values(STATUS));
            console.info("All priorities:", Object.values(PRIORITY));
        });
    });

    describe("Object Type Alias", () => {
        console.info("Object Type Alias");
        it("should create object structure aliases", () => {
            console.info("should create object structure aliases");
            // Type alias untuk object
            type User = {
                id: string;
                name: string;
                email: string;
                age: number;
            };

            type Address = {
                street: string;
                city: string;
                country: string;
                zipCode?: string; // optional property
            };

            const user: User = {
                id: "u001",
                name: "John Doe",
                email: "john@email.com",
                age: 30
            };

            const address: Address = {
                street: "123 Main St",
                city: "Jakarta",
                country: "Indonesia"
                // zipCode optional, bisa tidak ada
            };

            expect(user.name).toBe("John Doe");
            expect(address.city).toBe("Jakarta");
            expect(address.zipCode).toBeUndefined();

            console.info("User object:", user);
            console.info("Address object:", address);
        });

        it("should use nested object aliases", () => {
            console.info("should use nested object aliases");
            // Type alias dengan nested objects
            type Profile = {
                personal: {
                    firstName: string;
                    lastName: string;
                };
                contact: {
                    email: string;
                    phone: string;
                };
                settings: {
                    theme: "light" | "dark";
                    notifications: boolean;
                };
            };

            const userProfile: Profile = {
                personal: {
                    firstName: "Alice",
                    lastName: "Smith"
                },
                contact: {
                    email: "alice@email.com",
                    phone: "+1234567890"
                },
                settings: {
                    theme: "dark",
                    notifications: true
                }
            };

            expect(userProfile.personal.firstName).toBe("Alice");
            expect(userProfile.settings.theme).toBe("dark");

            console.info("Full name:", userProfile.personal.firstName, userProfile.personal.lastName);
            console.info("Theme preference:", userProfile.settings.theme);
            console.info("Notifications enabled:", userProfile.settings.notifications);
        });
    });

    describe("Function Type Alias", () => {
        console.info("Function Type Alias");
        it("should create function type aliases", () => {
            // Type alias untuk functions
            type Calculator = (a: number, b: number) => number;
            type Validator = (input: string) => boolean;
            type Formatter = (data: any) => string;

            // Implement functions dengan type alias
            const add: Calculator = (a, b) => a + b;
            const multiply: Calculator = (a, b) => a * b;

            const isEmail: Validator = (input) => input.includes("@");
            const isNotEmpty: Validator = (input) => input.length > 0;

            const toJSON: Formatter = (data) => JSON.stringify(data);
            const toString: Formatter = (data) => String(data);

            expect(add(5, 3)).toBe(8);
            expect(multiply(4, 6)).toBe(24);
            expect(isEmail("test@email.com")).toBe(true);
            expect(isNotEmpty("hello")).toBe(true);
            expect(toJSON({ name: "John" })).toBe('{"name":"John"}');

            console.info("Add 5 + 3 =", add(5, 3));
            console.info("Multiply 4 * 6 =", multiply(4, 6));
            console.info("Is 'test@email.com' an email?", isEmail("test@email.com"));
            console.info("JSON format:", toJSON({ user: "Alice", age: 25 }));
        });

        it("should handle callback type aliases", () => {
            console.info("should handle callback type aliases");
            // Type alias untuk callback functions
            type EventCallback = (event: string, data: any) => void;
            type ErrorHandler = (error: Error) => void;
            type SuccessCallback<T> = (result: T) => void;

            // Simulate event system
            const events: { [key: string]: EventCallback[] } = {};

            const addEventListener = (event: string, callback: EventCallback) => {
                if (!events[event]) events[event] = [];
                events[event].push(callback);
            };

            const triggerEvent = (event: string, data: any) => {
                if (events[event]) {
                    events[event].forEach(callback => callback(event, data));
                }
            };

            // Usage
            let lastEvent = "";
            let lastData: any = null;

            const userLoginHandler: EventCallback = (event, data) => {
                lastEvent = event;
                lastData = data;
                console.info(`Event triggered: ${event}`, data);
            };

            addEventListener("user_login", userLoginHandler);
            triggerEvent("user_login", { userId: "123", timestamp: Date.now() });

            expect(lastEvent).toBe("user_login");
            expect(lastData.userId).toBe("123");
        });
    });

    describe("Array Type Alias", () => {
        console.info("Array Type Alias");
        it("should create array type aliases", () => {
            // Type alias untuk arrays
            type StringList = string[];
            type NumberList = number[];
            type UserList = Array<{ id: string; name: string }>;

            // Mixed array types
            type MixedData = (string | number | boolean)[];
            type TodoItem = { id: number; task: string; done: boolean };
            type TodoList = TodoItem[];

            const fruits: StringList = ["apple", "banana", "orange"];
            const scores: NumberList = [95, 87, 92, 88];
            const users: UserList = [
                { id: "u1", name: "Alice" },
                { id: "u2", name: "Bob" }
            ];

            const mixed: MixedData = ["hello", 42, true, "world"];
            const todos: TodoList = [
                { id: 1, task: "Learn TypeScript", done: true },
                { id: 2, task: "Build project", done: false }
            ];

            expect(fruits.length).toBe(3);
            expect(scores[0]).toBe(95);
            expect(users[0]?.name).toBe("Alice");
            expect(mixed[1]).toBe(42);
            expect(todos[0]?.done).toBe(true);

            console.info("Fruits:", fruits);
            console.info("Average score:", scores.reduce((a, b) => a + b) / scores.length);
            console.info("User names:", users.map(u => u.name));
            console.info("Completed todos:", todos.filter(t => t.done).map(t => t.task));
        });
    });

    describe("Generic Type Alias", () => {
        console.info("Generic Type Alias");
        it("should create generic type aliases", () => {
            // Generic type aliases untuk reusability
            type ApiResponse<T> = {
                success: boolean;
                data: T;
                message: string;
            };

            type Repository<T> = {
                findById: (id: string) => T | null;
                save: (item: T) => void;
                delete: (id: string) => boolean;
            };

            // Usage dengan specific types
            const userResponse: ApiResponse<{ name: string; email: string }> = {
                success: true,
                data: { name: "John", email: "john@email.com" },
                message: "User retrieved successfully"
            };

            const numbersResponse: ApiResponse<number[]> = {
                success: true,
                data: [1, 2, 3, 4, 5],
                message: "Numbers loaded"
            };

            // Generic repository simulation
            const users: { [id: string]: { name: string } } = {
                "1": { name: "Alice" },
                "2": { name: "Bob" }
            };

            const userRepo: Repository<{ name: string }> = {
                findById: (id) => users[id] || null,
                save: (user) => console.info("Saving user:", user),
                delete: (id) => {
                    delete users[id];
                    return true;
                }
            };

            expect(userResponse.success).toBe(true);
            expect(userResponse.data.name).toBe("John");
            expect(numbersResponse.data.length).toBe(5);
            expect(userRepo.findById("1")?.name).toBe("Alice");

            console.info("User API response:", userResponse);
            console.info("Numbers response:", numbersResponse);
            console.info("Found user:", userRepo.findById("1"));
        });
    });

    describe("Practical Examples", () => {
        console.info("Practical Examples");
        it("should demonstrate real-world type aliases", () => {
            // Real-world examples
            type Theme = "light" | "dark" | "auto";
            type Language = "en" | "id" | "fr" | "es";
            type Permission = "read" | "write" | "admin";

            type AppConfig = {
                theme: Theme;
                language: Language;
                user: {
                    id: string;
                    name: string;
                    permissions: Permission[];
                };
                features: {
                    darkMode: boolean;
                    notifications: boolean;
                    analytics: boolean;
                };
            };

            type DatabaseConnection = {
                host: string;
                port: number;
                database: string;
                username: string;
                password: string;
                ssl?: boolean;
            };

            const appConfig: AppConfig = {
                theme: "dark",
                language: "en",
                user: {
                    id: "user123",
                    name: "John Developer",
                    permissions: ["read", "write"]
                },
                features: {
                    darkMode: true,
                    notifications: true,
                    analytics: false
                }
            };

            const dbConfig: DatabaseConnection = {
                host: "localhost",
                port: 5432,
                database: "myapp",
                username: "admin",
                password: "secret",
                ssl: true
            };

            expect(appConfig.theme).toBe("dark");
            expect(appConfig.user.permissions).toContain("read");
            expect(dbConfig.port).toBe(5432);

            console.info("App configuration:");
            console.info("- Theme:", appConfig.theme);
            console.info("- User:", appConfig.user.name);
            console.info("- Permissions:", appConfig.user.permissions.join(", "));

            console.info("Database configuration:");
            console.info("- Host:", dbConfig.host);
            console.info("- Database:", dbConfig.database);
            console.info("- SSL enabled:", dbConfig.ssl);
        });

        it("should show type alias vs interface comparison", () => {
            // Type Alias vs Interface

            //  Type Alias - good for:
            type ID = string | number;  // Union types
            type EventType = "click" | "hover" | "focus";  // Literal unions
            type Point = [number, number];  // Tuples
            type UserData = { name: string; age: number };  // Simple objects

            //  Interface - good for:
            interface User {  // Extendable objects
                name: string;
                age: number;
            }

            interface AdminUser extends User {  // Inheritance
                permissions: string[];
            }

            // Both work for objects
            const userWithType: UserData = { name: "Alice", age: 25 };
            const userWithInterface: User = { name: "Bob", age: 30 };
            const admin: AdminUser = {
                name: "Charlie",
                age: 35,
                permissions: ["read", "write", "admin"]
            };

            expect(userWithType.name).toBe("Alice");
            expect(userWithInterface.name).toBe("Bob");
            expect(admin.permissions).toContain("admin");

            console.info("Type vs Interface examples:");
            console.info("- Type alias user:", userWithType);
            console.info("- Interface user:", userWithInterface);
            console.info("- Extended admin:", admin);

            // Summary
            const comparison = {
                "Type Alias": ["Union types", "Literal types", "Tuples", "Computed types"],
                "Interface": ["Object shapes", "Inheritance", "Declaration merging", "Class contracts"]
            };

            console.info("When to use what:");
            Object.entries(comparison).forEach(([key, uses]) => {
                console.info(`${key}: ${uses.join(", ")}`);
            });
        });
    });
});