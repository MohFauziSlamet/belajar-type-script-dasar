describe("Object Types - TypeScript Object Types Deep Dive", () => {

    // ========================================
    // APA ITU OBJECT TYPES?
    // ========================================
    // Object Types = tipe data untuk object/struktur data
    // Mendefinisikan shape/bentuk object yang diharapkan
    // Memberikan type safety untuk properties dan methods

    describe("Basic Object Types", () => {
        it("should handle inline object types", () => {
            console.info("=== Basic Inline Object Types ===");

            // Inline object type definition
            const user: { id: number; name: string; email: string } = {
                id: 1,
                name: "John Doe",
                email: "john@email.com"
            };

            const product: { id: string; title: string; price: number; inStock: boolean } = {
                id: "prod-001",
                title: "Laptop Gaming",
                price: 15000000,
                inStock: true
            };

            expect(user.id).toBe(1);
            expect(user.name).toBe("John Doe");
            expect(product.price).toBe(15000000);
            expect(product.inStock).toBe(true);

            console.info("User object:", user);
            console.info("Product object:", product);
            console.info("User name type:", typeof user.name);
            console.info("Product price type:", typeof product.price);
        });

        it("should handle optional properties", () => {
            console.info("=== Optional Properties ===");

            // Object dengan optional properties (?)
            const config: {
                host: string;
                port: number;
                database: string;
                ssl?: boolean;        // optional
                timeout?: number;     // optional
            } = {
                host: "localhost",
                port: 5432,
                database: "myapp"
                // ssl dan timeout tidak wajib
            };

            const configWithOptions: {
                host: string;
                port: number;
                database: string;
                ssl?: boolean;
                timeout?: number;
            } = {
                host: "production.db",
                port: 5432,
                database: "prod_app",
                ssl: true,
                timeout: 30000
            };

            expect(config.host).toBe("localhost");
            expect(config.ssl).toBeUndefined();
            expect(configWithOptions.ssl).toBe(true);
            expect(configWithOptions.timeout).toBe(30000);

            console.info("Basic config:", config);
            console.info("Config with options:", configWithOptions);
            console.info("SSL setting:", config.ssl ?? "not specified");
        });

        it("should handle readonly properties", () => {
            console.info("=== Readonly Properties ===");

            // Readonly properties (tidak bisa diubah)
            const immutableUser: {
                readonly id: number;
                readonly email: string;
                name: string;  // masih bisa diubah
                age: number;   // masih bisa diubah
            } = {
                id: 1,
                email: "user@email.com",
                name: "Alice",
                age: 25
            };

            // Bisa mengubah name dan age
            immutableUser.name = "Alice Smith";
            immutableUser.age = 26;

            // immutableUser.id = 2;     // L Error: Cannot assign to 'id'
            // immutableUser.email = ""; // L Error: Cannot assign to 'email'

            expect(immutableUser.id).toBe(1);
            expect(immutableUser.name).toBe("Alice Smith");
            expect(immutableUser.age).toBe(26);

            console.info("Immutable user:", immutableUser);
            console.info("ID (readonly):", immutableUser.id);
            console.info("Email (readonly):", immutableUser.email);
        });
    });

    describe("Nested Object Types", () => {
        it("should handle nested object structures", () => {
            console.info("=== Nested Object Structures ===");

            // Nested object types
            const userProfile: {
                personal: {
                    firstName: string;
                    lastName: string;
                    birthDate: string;
                };
                contact: {
                    email: string;
                    phone?: string;
                    address: {
                        street: string;
                        city: string;
                        country: string;
                        zipCode?: string;
                    };
                };
                preferences: {
                    theme: "light" | "dark";
                    language: "en" | "id" | "fr";
                    notifications: {
                        email: boolean;
                        push: boolean;
                        sms: boolean;
                    };
                };
            } = {
                personal: {
                    firstName: "John",
                    lastName: "Doe",
                    birthDate: "1990-01-15"
                },
                contact: {
                    email: "john.doe@email.com",
                    phone: "+6281234567890",
                    address: {
                        street: "Jl. Sudirman No. 123",
                        city: "Jakarta",
                        country: "Indonesia",
                        zipCode: "12345"
                    }
                },
                preferences: {
                    theme: "dark",
                    language: "id",
                    notifications: {
                        email: true,
                        push: true,
                        sms: false
                    }
                }
            };

            expect(userProfile.personal.firstName).toBe("John");
            expect(userProfile.contact.address.city).toBe("Jakarta");
            expect(userProfile.preferences.theme).toBe("dark");
            expect(userProfile.preferences.notifications.email).toBe(true);

            console.info("Full name:", userProfile.personal.firstName, userProfile.personal.lastName);
            console.info("City:", userProfile.contact.address.city);
            console.info("Theme preference:", userProfile.preferences.theme);
            console.info("Email notifications:", userProfile.preferences.notifications.email);
        });

        it("should handle array properties in objects", () => {
            console.info("=== Array Properties in Objects ===");

            // Object dengan array properties
            const team: {
                id: string;
                name: string;
                members: {
                    id: number;
                    name: string;
                    role: string;
                    skills: string[];
                }[];
                projects: string[];
                budget: {
                    allocated: number;
                    spent: number;
                    remaining: number;
                    expenses: {
                        category: string;
                        amount: number;
                        date: string;
                    }[];
                };
            } = {
                id: "team-001",
                name: "Frontend Development",
                members: [
                    {
                        id: 1,
                        name: "Alice",
                        role: "Senior Developer",
                        skills: ["React", "TypeScript", "CSS"]
                    },
                    {
                        id: 2,
                        name: "Bob",
                        role: "Junior Developer",
                        skills: ["HTML", "JavaScript", "Git"]
                    }
                ],
                projects: ["Website Redesign", "Mobile App", "Admin Dashboard"],
                budget: {
                    allocated: 100000000,
                    spent: 65000000,
                    remaining: 35000000,
                    expenses: [
                        { category: "Software", amount: 15000000, date: "2024-01-15" },
                        { category: "Hardware", amount: 25000000, date: "2024-02-01" },
                        { category: "Training", amount: 25000000, date: "2024-02-15" }
                    ]
                }
            };

            expect(team.members.length).toBe(2);
            expect(team.members[0]?.name).toBe("Alice");
            expect(team.members[0]?.skills).toContain("React");
            expect(team.projects.length).toBe(3);
            expect(team.budget.remaining).toBe(35000000);

            console.info("Team name:", team.name);
            console.info("Team members:", team.members.map(m => m.name));
            console.info("Alice's skills:", team.members[0]?.skills);
            console.info("Current projects:", team.projects);
            console.info("Budget status:", `${team.budget.spent}/${team.budget.allocated}`);
        });
    });

    describe("Object Methods and Functions", () => {
        it("should handle objects with method signatures", () => {
            console.info("=== Objects with Method Signatures ===");

            // Object dengan method signatures
            const calculator: {
                name: string;
                version: string;
                add: (a: number, b: number) => number;
                subtract: (a: number, b: number) => number;
                multiply: (a: number, b: number) => number;
                divide: (a: number, b: number) => number;
                history: string[];
                getHistory: () => string[];
                clearHistory: () => void;
            } = {
                name: "Advanced Calculator",
                version: "1.0.0",
                add: (a, b) => {
                    const result = a + b;
                    calculator.history.push(`${a} + ${b} = ${result}`);
                    return result;
                },
                subtract: (a, b) => {
                    const result = a - b;
                    calculator.history.push(`${a} - ${b} = ${result}`);
                    return result;
                },
                multiply: (a, b) => {
                    const result = a * b;
                    calculator.history.push(`${a} * ${b} = ${result}`);
                    return result;
                },
                divide: (a, b) => {
                    if (b === 0) throw new Error("Division by zero");
                    const result = a / b;
                    calculator.history.push(`${a} / ${b} = ${result}`);
                    return result;
                },
                history: [],
                getHistory: () => calculator.history,
                clearHistory: () => { calculator.history = []; }
            };

            const sum = calculator.add(10, 5);
            const difference = calculator.subtract(10, 3);
            const product = calculator.multiply(4, 6);
            const quotient = calculator.divide(20, 4);

            expect(sum).toBe(15);
            expect(difference).toBe(7);
            expect(product).toBe(24);
            expect(quotient).toBe(5);
            expect(calculator.history.length).toBe(4);

            console.info("Calculator info:", calculator.name, "v" + calculator.version);
            console.info("Addition result:", sum);
            console.info("Subtraction result:", difference);
            console.info("Calculation history:", calculator.getHistory());
        });

        it("should handle callback and event objects", () => {
            console.info("=== Callback and Event Objects ===");

            // Event system dengan object types
            const eventManager: {
                events: {
                    [eventName: string]: {
                        handler: (data: any) => void;
                        once: boolean;
                        timestamp: number;
                    }[];
                };
                on: (event: string, handler: (data: any) => void) => void;
                once: (event: string, handler: (data: any) => void) => void;
                emit: (event: string, data: any) => void;
                off: (event: string) => void;
                getEventInfo: () => { event: string; listeners: number }[];
            } = {
                events: {},
                on: (event, handler) => {
                    if (!eventManager.events[event]) eventManager.events[event] = [];
                    eventManager.events[event].push({
                        handler,
                        once: false,
                        timestamp: Date.now()
                    });
                },
                once: (event, handler) => {
                    if (!eventManager.events[event]) eventManager.events[event] = [];
                    eventManager.events[event].push({
                        handler,
                        once: true,
                        timestamp: Date.now()
                    });
                },
                emit: (event, data) => {
                    if (!eventManager.events[event]) return;

                    eventManager.events[event].forEach((listener, index) => {
                        listener.handler(data);
                        if (listener.once) {
                            eventManager.events[event]?.splice(index, 1);
                        }
                    });
                },
                off: (event) => {
                    delete eventManager.events[event];
                },
                getEventInfo: () => {
                    return Object.keys(eventManager.events).map(event => ({
                        event,
                        listeners: eventManager.events[event]?.length ?? 0
                    }));
                }
            };

            // Test event system
            let userLoginData: any = null;
            let notificationData: any = null;

            eventManager.on("user_login", (data) => {
                userLoginData = data;
                console.info("User logged in:", data);
            });

            eventManager.once("notification", (data) => {
                notificationData = data;
                console.info("Notification received (once):", data);
            });

            eventManager.emit("user_login", { userId: "123", name: "John" });
            eventManager.emit("notification", { message: "Welcome!", type: "success" });

            expect(userLoginData.userId).toBe("123");
            expect(notificationData.message).toBe("Welcome!");

            console.info("Event manager info:", eventManager.getEventInfo());
        });
    });

    describe("Index Signatures and Dynamic Objects", () => {
        it("should handle index signatures for dynamic properties", () => {
            console.info("=== Index Signatures ===");

            // Index signature untuk dynamic properties
            const dynamicConfig: {
                appName: string;
                version: string;
                [key: string]: string | number | boolean; // index signature
            } = {
                appName: "My Application",
                version: "2.1.0",
                debug: true,
                port: 3000,
                database_url: "postgresql://localhost:5432/myapp",
                api_timeout: 30000,
                cache_enabled: true
            };

            // Dictionary-like object
            const userPermissions: {
                [userId: string]: {
                    role: string;
                    permissions: string[];
                    lastLogin?: string;
                };
            } = {
                "user123": {
                    role: "admin",
                    permissions: ["read", "write", "delete"],
                    lastLogin: "2024-01-15T10:30:00Z"
                },
                "user456": {
                    role: "editor",
                    permissions: ["read", "write"]
                },
                "user789": {
                    role: "viewer",
                    permissions: ["read"],
                    lastLogin: "2024-01-14T15:45:00Z"
                }
            };

            expect(dynamicConfig.appName).toBe("My Application");
            expect(dynamicConfig.port).toBe(3000);
            expect(dynamicConfig.debug).toBe(true);
            expect(userPermissions["user123"]?.role).toBe("admin");
            expect(userPermissions["user456"]?.permissions).toContain("write");

            console.info("Dynamic config:", dynamicConfig);
            console.info("App name:", dynamicConfig.appName);
            console.info("Debug mode:", dynamicConfig.debug);
            console.info("Admin permissions:", userPermissions["user123"]?.permissions);
            console.info("All users:", Object.keys(userPermissions));
        });

        it("should handle Record utility type", () => {
            console.info("=== Record Utility Type ===");

            // Record<Keys, Type> - lebih clean untuk mappings
            const statusMessages: Record<string, string> = {
                "200": "Success",
                "400": "Bad Request",
                "401": "Unauthorized",
                "404": "Not Found",
                "500": "Internal Server Error"
            };

            const userRoles: Record<"admin" | "editor" | "viewer", {
                permissions: string[];
                level: number;
                description: string;
            }> = {
                admin: {
                    permissions: ["read", "write", "delete", "manage"],
                    level: 3,
                    description: "Full system access"
                },
                editor: {
                    permissions: ["read", "write"],
                    level: 2,
                    description: "Content management access"
                },
                viewer: {
                    permissions: ["read"],
                    level: 1,
                    description: "Read-only access"
                }
            };

            // Theme configuration
            const themeConfig: Record<"light" | "dark", {
                primary: string;
                secondary: string;
                background: string;
                text: string;
            }> = {
                light: {
                    primary: "#007bff",
                    secondary: "#6c757d",
                    background: "#ffffff",
                    text: "#333333"
                },
                dark: {
                    primary: "#0d6efd",
                    secondary: "#adb5bd",
                    background: "#121212",
                    text: "#ffffff"
                }
            };

            expect(statusMessages["200"]).toBe("Success");
            expect(userRoles.admin.level).toBe(3);
            expect(userRoles.viewer.permissions).toEqual(["read"]);
            expect(themeConfig.dark.background).toBe("#121212");

            console.info("HTTP 404 message:", statusMessages["404"]);
            console.info("Admin permissions:", userRoles.admin.permissions);
            console.info("Editor level:", userRoles.editor.level);
            console.info("Dark theme colors:", themeConfig.dark);
        });
    });

    describe("Object Type Patterns", () => {
        it("should demonstrate common object patterns", () => {
            console.info("=== Common Object Patterns ===");

            // API Response pattern
            const apiResponse: {
                success: boolean;
                data?: {
                    users: {
                        id: string;
                        name: string;
                        email: string;
                    }[];
                    pagination: {
                        page: number;
                        limit: number;
                        total: number;
                        hasNext: boolean;
                    };
                };
                error?: {
                    code: string;
                    message: string;
                    details?: Record<string, any>;
                };
                meta: {
                    timestamp: string;
                    requestId: string;
                    version: string;
                };
            } = {
                success: true,
                data: {
                    users: [
                        { id: "1", name: "Alice", email: "alice@email.com" },
                        { id: "2", name: "Bob", email: "bob@email.com" }
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 25,
                        hasNext: true
                    }
                },
                meta: {
                    timestamp: "2024-01-15T10:30:00Z",
                    requestId: "req_123456",
                    version: "1.0"
                }
            };

            // Configuration pattern
            const appConfig: {
                server: {
                    host: string;
                    port: number;
                    ssl: boolean;
                };
                database: {
                    driver: "postgresql" | "mysql" | "sqlite";
                    host: string;
                    port: number;
                    name: string;
                    credentials: {
                        username: string;
                        password: string;
                    };
                    pool: {
                        min: number;
                        max: number;
                        idleTimeout: number;
                    };
                };
                features: {
                    [featureName: string]: {
                        enabled: boolean;
                        config?: Record<string, any>;
                    };
                };
            } = {
                server: {
                    host: "0.0.0.0",
                    port: 3000,
                    ssl: false
                },
                database: {
                    driver: "postgresql",
                    host: "localhost",
                    port: 5432,
                    name: "myapp",
                    credentials: {
                        username: "admin",
                        password: "secret"
                    },
                    pool: {
                        min: 2,
                        max: 10,
                        idleTimeout: 30000
                    }
                },
                features: {
                    authentication: {
                        enabled: true,
                        config: {
                            provider: "jwt",
                            expiration: "24h"
                        }
                    },
                    caching: {
                        enabled: true,
                        config: {
                            driver: "redis",
                            ttl: 3600
                        }
                    },
                    analytics: {
                        enabled: false
                    }
                }
            };

            expect(apiResponse.success).toBe(true);
            expect(apiResponse.data?.users.length).toBe(2);
            expect(apiResponse.data?.pagination.hasNext).toBe(true);
            expect(appConfig.database.driver).toBe("postgresql");
            expect(appConfig.features.authentication?.enabled).toBe(true);

            console.info("API Response success:", apiResponse.success);
            console.info("Users count:", apiResponse.data?.users.length);
            console.info("Database driver:", appConfig.database.driver);
            console.info("Auth enabled:", appConfig.features.authentication?.enabled);
            console.info("Feature flags:", Object.keys(appConfig.features));
        });

        it("should show object type best practices", () => {
            console.info("=== Object Type Best Practices ===");

            const bestPractices = {
                " Use specific types": "Prefer { id: string; name: string } over { [key: string]: any }",
                " Optional properties": "Use ? for properties that might not exist",
                " Readonly when needed": "Use readonly for immutable properties",
                " Index signatures": "Use [key: string]: Type for dynamic properties",
                " Record utility": "Use Record<K, V> for key-value mappings"
            };

            const commonMistakes = {
                "L Too permissive": "{ [key: string]: any } loses type safety",
                "L Missing optional": "Required properties when should be optional",
                "L Nested any": "Using any in nested object properties",
                "L No structure": "Plain objects without clear structure",
                "L Wrong readonly": "Not using readonly for constant properties"
            };

            expect(Object.keys(bestPractices).length).toBe(5);
            expect(Object.keys(commonMistakes).length).toBe(5);

            console.info("\n<� OBJECT TYPE BEST PRACTICES:");
            Object.entries(bestPractices).forEach(([key, value]) => {
                console.info(`${key}: ${value}`);
            });

            console.info("\n� COMMON MISTAKES TO AVOID:");
            Object.entries(commonMistakes).forEach(([key, value]) => {
                console.info(`${key}: ${value}`);
            });

            console.info("\n=� KEY TAKEAWAYS:");
            console.info("=9 Object types provide structure and type safety");
            console.info("=9 Use optional properties (?) for flexible objects");
            console.info("=9 Index signatures for dynamic properties");
            console.info("=9 Record<K,V> for clean key-value mappings");
            console.info("=9 Nested objects for complex data structures");
        });
    });
});