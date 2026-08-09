import {
    createApiResponse,
    demonstrateNullUndefined,
    findUser,
    firstValid,
    getDisplayName,
    getProfileEmail,
    getUserSetting,
    hasValue,
    isValidUser,
    safeLength,
    safeToUpperCase,
    searchUsers,
    selectedItem,
    userAge,
    userName,
    userProfile
} from "../src/null-and-undefined.tsx";

describe("Null and Undefined - TypeScript Null & Undefined Simple", () => {

    describe("Basic Null and Undefined", () => {
        it("should handle undefined variables", () => {
            console.info("=== Testing Undefined Variables ===");

            console.info("userName:", userName);
            console.info("userAge:", userAge);
            console.info("userName type:", typeof userName);
            console.info("userAge type:", typeof userAge);
        });

        it("should handle null variables", () => {
            console.info("=== Testing Null Variables ===");

            console.info("userProfile:", userProfile);
            console.info("selectedItem:", selectedItem);
            console.info("userProfile type:", typeof userProfile);
            console.info("selectedItem type:", typeof selectedItem);
        });
    });

    describe("Function Returns", () => {
        it("should test findUser function", () => {
            console.info("=== Testing findUser Function ===");

            const user1 = findUser("1");
            const user2 = findUser("2");
            const userNotFound = findUser("99");

            console.info("findUser('1'):", user1);
            console.info("findUser('2'):", user2);
            console.info("findUser('99'):", userNotFound);
            console.info("User 1 name:", user1?.name);
            console.info("Not found user:", userNotFound?.name);
        });

        it("should test getUserSetting function", () => {
            console.info("=== Testing getUserSetting Function ===");

            const theme = getUserSetting("theme");
            const language = getUserSetting("language");
            const unknown = getUserSetting("unknown");

            console.info("getUserSetting('theme'):", theme);
            console.info("getUserSetting('language'):", language);
            console.info("getUserSetting('unknown'):", unknown);
            console.info("Theme type:", typeof theme);
            console.info("Unknown type:", typeof unknown);
        });
    });

    describe("Safe Access Patterns", () => {
        it("should test optional chaining", () => {
            console.info("=== Testing Optional Chaining ===");

            // Cara simpel seperti Dart - buat type dulu
            type UserProfile = {
                profile?: {
                    email?: string;
                };
            };

            const userWithProfile: UserProfile | null = { profile: { email: "test@email.com" } };
            const userWithoutProfile: UserProfile | null = {};
            const nullUser: UserProfile | null = null;

            const email1 = getProfileEmail(userWithProfile);
            const email2 = getProfileEmail(userWithoutProfile);
            const email3 = getProfileEmail(nullUser);

            console.info("User with profile email:", email1);
            console.info("User without profile email:", email2);
            console.info("Null user email:", email3);
        });

        it("should test nullish coalescing", () => {
            console.info("=== Testing Nullish Coalescing ===");

            const name1 = getDisplayName("John");
            const name2 = getDisplayName(null);
            const name3 = getDisplayName(undefined);
            const name4 = getDisplayName("");  // empty string

            console.info("getDisplayName('John'):", name1);
            console.info("getDisplayName(null):", name2);
            console.info("getDisplayName(undefined):", name3);
            console.info("getDisplayName(''):", name4);
        });

        it("should test type guards", () => {
            console.info("=== Testing Type Guards ===");

            const validUser = { name: "Alice", email: "alice@email.com" };
            const invalidUser1 = { name: "Bob" };  // missing email
            const invalidUser2 = null;
            const invalidUser3 = { name: 123, email: "test" };  // wrong type

            console.info("Valid user check:", isValidUser(validUser));
            console.info("Invalid user 1 check:", isValidUser(invalidUser1));
            console.info("Invalid user 2 check:", isValidUser(invalidUser2));
            console.info("Invalid user 3 check:", isValidUser(invalidUser3));

            if (isValidUser(validUser)) {
                console.info("Valid user name:", validUser.name);
                console.info("Valid user email:", validUser.email);
            }
        });
    });

    describe("Common Patterns", () => {
        it("should test API response pattern", () => {
            console.info("=== Testing API Response Pattern ===");

            const successResponse = createApiResponse({ id: 1, name: "Alice" });
            const errorResponse = createApiResponse(undefined, "User not found");
            const loadingResponse = createApiResponse();

            console.info("Success response:", successResponse);
            console.info("Error response:", errorResponse);
            console.info("Loading response:", loadingResponse);
            console.info("Success data:", successResponse.data);
            console.info("Error message:", errorResponse.error);
        });

        it("should test search pattern", () => {
            console.info("=== Testing Search Pattern ===");

            const searchAlice = searchUsers("Alice");
            const searchBob = searchUsers("bob");  // case insensitive
            const searchEmpty = searchUsers("");
            const searchNotFound = searchUsers("xyz");

            console.info("Search 'Alice':", searchAlice);
            console.info("Search 'bob':", searchBob);
            console.info("Search '':", searchEmpty);
            console.info("Search 'xyz':", searchNotFound);
            console.info("Alice results count:", searchAlice?.length);
            console.info("Empty search type:", typeof searchEmpty);
        });
    });

    describe("Utility Functions", () => {
        it("should test hasValue utility", () => {
            console.info("=== Testing hasValue Utility ===");

            console.info("hasValue('hello'):", hasValue("hello"));
            console.info("hasValue(null):", hasValue(null));
            console.info("hasValue(undefined):", hasValue(undefined));
            console.info("hasValue(0):", hasValue(0));
            console.info("hasValue(''):", hasValue(""));
            console.info("hasValue(false):", hasValue(false));

            const value: string | null = null;
            if (hasValue(value)) {
                console.info("Value exists:", value!.toUpperCase());
            } else {
                console.info("Value is null or undefined");
            }
        });

        it("should test firstValid utility", () => {
            console.info("=== Testing firstValid Utility ===");

            const result1 = firstValid(null, undefined, "found");
            const result2 = firstValid("first", "second", "third");
            const result3 = firstValid(null, undefined);
            const result4 = firstValid<string | number>(0, null, "backup");

            console.info("firstValid(null, undefined, 'found'):", result1);
            console.info("firstValid('first', 'second', 'third'):", result2);
            console.info("firstValid(null, undefined):", result3);
            console.info("firstValid(0, null, 'backup'):", result4);
        });

        it("should test safe string operations", () => {
            console.info("=== Testing Safe String Operations ===");

            const upper1 = safeToUpperCase("hello");
            const upper2 = safeToUpperCase(null);
            const upper3 = safeToUpperCase(undefined);

            const length1 = safeLength([1, 2, 3]);
            const length2 = safeLength(null);
            const length3 = safeLength(undefined);

            console.info("safeToUpperCase('hello'):", upper1);
            console.info("safeToUpperCase(null):", upper2);
            console.info("safeToUpperCase(undefined):", upper3);
            console.info("safeLength([1,2,3]):", length1);
            console.info("safeLength(null):", length2);
            console.info("safeLength(undefined):", length3);
        });
    });

    describe("Real-world Examples", () => {
        it("should demonstrate practical usage", () => {
            console.info("=== Real-world Examples ===");

            // Simulate API data
            const apiData: { user?: { name?: string; profile?: { avatar?: string } } } = {
                user: {
                    name: "John",
                    profile: {}  // avatar missing
                }
            };

            // Safe access with optional chaining
            const userName = apiData.user?.name ?? "Anonymous";
            const avatar = apiData.user?.profile?.avatar ?? "default.jpg";

            console.info("API user name:", userName);
            console.info("API user avatar:", avatar);

            // Form data example
            const formData: { email?: string; phone?: string } = {
                email: "user@email.com"
                // phone not provided
            };

            const emailValue = formData.email ?? "";
            const phoneValue = formData.phone ?? "Not provided";

            console.info("Form email:", emailValue);
            console.info("Form phone:", phoneValue);

            // Array operations
            const items = searchUsers("Alice");
            const itemCount = items?.length ?? 0;
            const firstItem = items?.[0]?.name ?? "No items";

            console.info("Items found:", itemCount);
            console.info("First item:", firstItem);
        });

        it("should run comprehensive demo", () => {
            console.info("=== Running Comprehensive Demo ===");

            demonstrateNullUndefined();
        });
    });

    describe("Comparison with Other Languages", () => {
        it("should show differences from Dart/other languages", () => {
            console.info("=== Comparison with Other Languages ===");

            // TypeScript: explicit null/undefined handling
            let tsValue: string | null = null;
            console.info("TS null check:", tsValue === null);
            console.info("TS with ??:", tsValue ?? "default");

            // TypeScript: optional chaining
            const obj: { prop?: { nested?: string } } = {};
            console.info("TS optional chain:", obj.prop?.nested ?? "not found");

            // TypeScript: type safety
            function processString(str: string | null | undefined): string {
                // TypeScript forces us to handle null/undefined
                if (str == null) {  // checks both null and undefined
                    return "empty";
                }
                return str.toUpperCase();
            }

            console.info("Process 'hello':", processString("hello"));
            console.info("Process null:", processString(null));
            console.info("Process undefined:", processString(undefined));

            console.info("\n=== Key Differences ===");
            console.info(" TypeScript: strict null checks dengan--strictNullChecks");
            console.info(" TypeScript: ?? operator untuk nullish coalescing");
            console.info(" TypeScript: ?.operator untuk optional chaining");
            console.info(" TypeScript: type guards untuk runtime checking");
            console.info(" Dart: late keyword untuk non - nullable yang diinisialisasi nanti");
            console.info(" Dart: !operator untuk null assertion");
        });
    });
});