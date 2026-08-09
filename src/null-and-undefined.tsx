// ========================================
// NULL & UNDEFINED - TypeScript Simple
// ========================================

// APA ITU NULL & UNDEFINED?
// null = sengaja tidak ada nilai
// undefined = belum diberi nilai / tidak ada

// ========================================
// BASIC EXAMPLES
// ========================================

// Undefined examples
export let userName: string | undefined;  // belum diberi nilai
export let userAge: number | undefined = undefined;  // explicit undefined

// Null examples  
export let userProfile: object | null = null;  // sengaja kosong
export let selectedItem: string | null = null;  // tidak ada yang dipilih

// ========================================
// PRACTICAL FUNCTIONS
// ========================================

// Function yang bisa return null
export function findUser(id: string): { name: string; email: string } | null {
    const users = [
        { id: "1", name: "Alice", email: "alice@email.com" },
        { id: "2", name: "Bob", email: "bob@email.com" }
    ];

    const user = users.find(u => u.id === id);
    return user ? { name: user.name, email: user.email } : null;
}

// Function yang bisa return undefined
export function getUserSetting(key: string): string | undefined {
    const settings: { [key: string]: string } = {
        theme: "dark",
        language: "en"
    };

    return settings[key];  // bisa undefined jika key tidak ada
}

// ========================================
// SAFE ACCESS PATTERNS
// ========================================

// Optional chaining (?.)
export function getProfileEmail(user: { profile?: { email?: string } } | null): string {
    return user?.profile?.email ?? "No email";
}

// Nullish coalescing (??)
export function getDisplayName(name: string | null | undefined): string {
    return name ?? "Anonymous";  // gunakan "Anonymous" jika null/undefined
}

// Type guards
export function isValidUser(user: any): user is { name: string; email: string } {
    return user && typeof user.name === "string" && typeof user.email === "string";
}

// ========================================
// COMMON PATTERNS
// ========================================

// API response pattern
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export function createApiResponse<T>(data?: T, error?: string): ApiResponse<T> {
    return {
        data: data ?? null,
        error: error ?? null,
        loading: false
    };
}

// Search result pattern
export function searchUsers(query: string): { name: string; id: string }[] | null {
    if (!query || query.trim() === "") {
        return null;  // invalid search
    }

    const allUsers = [
        { id: "1", name: "Alice" },
        { id: "2", name: "Bob" },
        { id: "3", name: "Charlie" }
    ];

    const results = allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );

    return results.length > 0 ? results : null;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Check if value exists
export function hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

// Get first non-null value
export function firstValid<T>(...values: (T | null | undefined)[]): T | null {
    for (const value of values) {
        if (hasValue(value)) {
            return value;
        }
    }
    return null;
}

// Safe string operations
export function safeToUpperCase(str: string | null | undefined): string {
    return str?.toUpperCase() ?? "";
}

export function safeLength(arr: any[] | null | undefined): number {
    return arr?.length ?? 0;
}

// ========================================
// DEMO FUNCTION
// ========================================

export function demonstrateNullUndefined() {
    console.log("=== NULL & UNDEFINED DEMO ===");

    // Basic examples
    console.log("userName:", userName);  // undefined
    console.log("userProfile:", userProfile);  // null

    // Function examples
    console.log("findUser('1'):", findUser("1"));
    console.log("findUser('99'):", findUser("99"));  // null

    console.log("getUserSetting('theme'):", getUserSetting("theme"));
    console.log("getUserSetting('unknown'):", getUserSetting("unknown"));  // undefined

    // Safe access
    const user = { profile: { email: "test@email.com" } };
    console.log("getProfileEmail(user):", getProfileEmail(user));
    console.log("getProfileEmail(null):", getProfileEmail(null));

    // Nullish coalescing
    console.log("getDisplayName('John'):", getDisplayName("John"));
    console.log("getDisplayName(null):", getDisplayName(null));
    console.log("getDisplayName(undefined):", getDisplayName(undefined));

    // Search examples
    console.log("searchUsers('Alice'):", searchUsers("Alice"));
    console.log("searchUsers(''):", searchUsers(""));  // null

    // Utility functions
    console.log("hasValue('hello'):", hasValue("hello"));
    console.log("hasValue(null):", hasValue(null));
    console.log("firstValid(null, undefined, 'found'):", firstValid(null, undefined, "found"));
}

// ========================================
// KEY POINTS
// ========================================

/*
PERBEDAAN NULL VS UNDEFINED:
✓ undefined = belum ada nilai / tidak diinisialisasi
✓ null = sengaja dikosongkan / tidak ada data

BEST PRACTICES:
✓ Gunakan | null | undefined untuk optional values
✓ Gunakan ?. untuk safe property access
✓ Gunakan ?? untuk default values
✓ Buat type guards untuk validation
✓ Consistent: pilih null ATAU undefined, jangan campur

COMMON USAGE:
✓ API responses: data bisa null jika tidak ada
✓ Optional properties: bisa undefined
✓ Search results: null jika tidak ditemukan
✓ User input: undefined jika belum diisi
*/