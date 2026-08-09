import {
    Direction,
    ResponseCode,
    Status,
    Theme,
    checkStatus,
    demonstrateEnums,
    getAllStatuses,
    getUsersByStatus,
    isValidDirection,
    isValidStatus,
    move,
    users
} from "../src/enum.tsx";

describe("Enum Tests - Testing TypeScript Enums", () => {

    describe("Basic Enum Types", () => {
        it("should handle numeric enum Direction", () => {
            console.info("=== Testing Numeric Enum ===");

            // Numeric enum values
            expect(Direction.Up).toBe(0);
            expect(Direction.Down).toBe(1);
            expect(Direction.Left).toBe(2);
            expect(Direction.Right).toBe(3);

            // Reverse mapping
            expect(Direction[0]).toBe("Up");
            expect(Direction[1]).toBe("Down");
            expect(Direction[2]).toBe("Left");
            expect(Direction[3]).toBe("Right");

            console.info("Direction.Up:", Direction.Up);
            console.info("Direction[0]:", Direction[0]);
            console.info("All directions:", Object.keys(Direction).filter(key => isNaN(Number(key))));
        });

        it("should handle string enum Status", () => {
            console.info("=== Testing String Enum ===");

            // String enum values
            expect(Status.Pending).toBe("PENDING");
            expect(Status.Approved).toBe("APPROVED");
            expect(Status.Rejected).toBe("REJECTED");

            // No reverse mapping for string enums
            expect((Status as any)["PENDING"]).toBeUndefined();

            console.info("Status.Pending:", Status.Pending);
            console.info("Status.Approved:", Status.Approved);
            console.info("All statuses:", Object.values(Status));
        });

        it("should handle mixed enum ResponseCode", () => {
            console.info("=== Testing Mixed Enum ===");

            // Mixed enum values
            expect(ResponseCode.Success).toBe(200);
            expect(ResponseCode.NotFound).toBe(404);
            expect(ResponseCode.Error).toBe("ERROR");
            expect(ResponseCode.Unknown).toBe("UNKNOWN");

            console.info("ResponseCode.Success:", ResponseCode.Success);
            console.info("ResponseCode.Error:", ResponseCode.Error);
            console.info("All response codes:", Object.values(ResponseCode));
        });

        it("should handle const enum Theme", () => {
            console.info("=== Testing Const Enum ===");

            // Const enum values (akan di-inline saat compile)
            expect(Theme.Light).toBe("light");
            expect(Theme.Dark).toBe("dark");
            expect(Theme.Auto).toBe("auto");

            console.info("Theme.Dark:", Theme.Dark);
            console.info("Theme.Light:", Theme.Light);
        });
    });

    describe("Enum Functions", () => {
        it("should test move function with Direction enum", () => {
            console.info("=== Testing move() function ===");

            const upResult = move(Direction.Up);
            const downResult = move(Direction.Down);
            const leftResult = move(Direction.Left);
            const rightResult = move(Direction.Right);

            expect(upResult).toBe("Moving up");
            expect(downResult).toBe("Moving down");
            expect(leftResult).toBe("Moving left");
            expect(rightResult).toBe("Moving right");

            console.info("Move up:", upResult);
            console.info("Move down:", downResult);
            console.info("Move left:", leftResult);
            console.info("Move right:", rightResult);
        });

        it("should test checkStatus function with Status enum", () => {
            console.info("=== Testing checkStatus() function ===");

            const pendingResult = checkStatus(Status.Pending);
            const approvedResult = checkStatus(Status.Approved);
            const rejectedResult = checkStatus(Status.Rejected);

            expect(pendingResult).toBe("Waiting for approval");
            expect(approvedResult).toBe("Request approved");
            expect(rejectedResult).toBe("Request rejected");

            console.info("Pending status:", pendingResult);
            console.info("Approved status:", approvedResult);
            console.info("Rejected status:", rejectedResult);
        });
    });

    describe("User Management with Enums", () => {
        it("should test users array with enum properties", () => {
            console.info("=== Testing Users Array ===");

            expect(users).toBeDefined();
            expect(users.length).toBe(3);

            // User 1 - Alice
            expect(users[0]?.id).toBe(1);
            expect(users[0]?.name).toBe("Alice");
            expect(users[0]?.status).toBe(Status.Approved);
            expect(users[0]?.theme).toBe(Theme.Dark);

            // User 2 - Bob
            expect(users[1]?.id).toBe(2);
            expect(users[1]?.name).toBe("Bob");
            expect(users[1]?.status).toBe(Status.Pending);
            expect(users[1]?.theme).toBe(Theme.Light);

            // User 3 - Charlie
            expect(users[2]?.id).toBe(3);
            expect(users[2]?.name).toBe("Charlie");
            expect(users[2]?.status).toBe(Status.Rejected);
            expect(users[2]?.theme).toBe(Theme.Auto);

            console.info("All users:", users.map(u => ({
                name: u.name,
                status: u.status,
                theme: u.theme
            })));
        });

        it("should test getUsersByStatus function", () => {
            console.info("=== Testing getUsersByStatus() ===");

            const pendingUsers = getUsersByStatus(Status.Pending);
            const approvedUsers = getUsersByStatus(Status.Approved);
            const rejectedUsers = getUsersByStatus(Status.Rejected);

            expect(pendingUsers.length).toBe(1);
            expect(pendingUsers[0]?.name).toBe("Bob");

            expect(approvedUsers.length).toBe(1);
            expect(approvedUsers[0]?.name).toBe("Alice");

            expect(rejectedUsers.length).toBe(1);
            expect(rejectedUsers[0]?.name).toBe("Charlie");

            console.info("Pending users:", pendingUsers.map(u => u.name));
            console.info("Approved users:", approvedUsers.map(u => u.name));
            console.info("Rejected users:", rejectedUsers.map(u => u.name));
        });

        it("should test getAllStatuses function", () => {
            console.info("=== Testing getAllStatuses() ===");

            const allStatuses = getAllStatuses();

            expect(allStatuses).toContain(Status.Pending);
            expect(allStatuses).toContain(Status.Approved);
            expect(allStatuses).toContain(Status.Rejected);
            expect(allStatuses.length).toBe(3);

            console.info("All available statuses:", allStatuses);
        });
    });

    describe("Enum Validation Functions", () => {
        it("should test isValidStatus function", () => {
            console.info("=== Testing isValidStatus() ===");

            // Valid status values
            expect(isValidStatus("PENDING")).toBe(true);
            expect(isValidStatus("APPROVED")).toBe(true);
            expect(isValidStatus("REJECTED")).toBe(true);

            // Invalid status values
            expect(isValidStatus("INVALID")).toBe(false);
            expect(isValidStatus("pending")).toBe(false); // case sensitive
            expect(isValidStatus("")).toBe(false);
            expect(isValidStatus("123")).toBe(false);

            console.info("Is 'PENDING' valid?", isValidStatus("PENDING"));
            console.info("Is 'INVALID' valid?", isValidStatus("INVALID"));
            console.info("Is 'pending' valid?", isValidStatus("pending"));
        });

        it("should test isValidDirection function", () => {
            console.info("=== Testing isValidDirection() ===");

            // Valid direction values (0-3)
            expect(isValidDirection(0)).toBe(true);  // Up
            expect(isValidDirection(1)).toBe(true);  // Down
            expect(isValidDirection(2)).toBe(true);  // Left
            expect(isValidDirection(3)).toBe(true);  // Right

            // Invalid direction values
            expect(isValidDirection(4)).toBe(false);
            expect(isValidDirection(-1)).toBe(false);
            expect(isValidDirection(1.5)).toBe(false); // not integer
            expect(isValidDirection(NaN)).toBe(false);
            expect(isValidDirection(Infinity)).toBe(false);

            console.info("Is 0 valid direction?", isValidDirection(0));
            console.info("Is 4 valid direction?", isValidDirection(4));
            console.info("Is 1.5 valid direction?", isValidDirection(1.5));
        });
    });

    describe("Enum Comparison and Switch Cases", () => {
        it("should test enum comparison with === operator", () => {
            console.info("=== Testing Enum Comparison ===");

            // Test different enum values to avoid TypeScript warnings
            let userStatus: Status = Status.Approved;
            let direction: Direction = Direction.Up;

            // String enum comparison - test true cases
            expect(userStatus === Status.Approved).toBe(true);
            expect(userStatus === "APPROVED").toBe(true); // direct string comparison

            // Change to different value for false comparison
            userStatus = Status.Rejected;

            // Numeric enum comparison - test true cases  
            expect(direction === Direction.Up).toBe(true);
            expect(direction === 0).toBe(true); // direct number comparison

            // Change to different value for false comparison
            direction = Direction.Left;

            console.info("Status comparison:", userStatus === Status.Rejected);
            console.info("Direction comparison:", direction === Direction.Left);
            console.info("String comparison:", userStatus === "REJECTED");
            console.info("Number comparison:", direction === 2);
        });

        it("should test switch statements with enums", () => {
            console.info("=== Testing Switch Statements ===");

            function processStatus(status: Status): string {
                switch (status) {
                    case Status.Pending:
                        return "Processing";
                    case Status.Approved:
                        return "Completed";
                    case Status.Rejected:
                        return "Failed";
                    default:
                        return "Unknown";
                }
            }

            function processDirection(dir: Direction): string {
                switch (dir) {
                    case Direction.Up:
                        return "North";
                    case Direction.Down:
                        return "South";
                    case Direction.Left:
                        return "West";
                    case Direction.Right:
                        return "East";
                    default:
                        return "Unknown";
                }
            }

            expect(processStatus(Status.Pending)).toBe("Processing");
            expect(processStatus(Status.Approved)).toBe("Completed");
            expect(processStatus(Status.Rejected)).toBe("Failed");

            expect(processDirection(Direction.Up)).toBe("North");
            expect(processDirection(Direction.Down)).toBe("South");
            expect(processDirection(Direction.Left)).toBe("West");
            expect(processDirection(Direction.Right)).toBe("East");

            console.info("Status processing:", processStatus(Status.Approved));
            console.info("Direction processing:", processDirection(Direction.Up));
        });
    });

    describe("Enum Iteration and Utilities", () => {
        it("should test enum iteration and Object methods", () => {
            console.info("=== Testing Enum Iteration ===");

            // String enum iteration
            const statusKeys = Object.keys(Status);
            const statusValues = Object.values(Status);
            const statusEntries = Object.entries(Status);

            expect(statusKeys).toEqual(["Pending", "Approved", "Rejected"]);
            expect(statusValues).toEqual(["PENDING", "APPROVED", "REJECTED"]);
            expect(statusEntries).toEqual([
                ["Pending", "PENDING"],
                ["Approved", "APPROVED"],
                ["Rejected", "REJECTED"]
            ]);

            // Numeric enum iteration (includes both keys and values)
            const directionKeys = Object.keys(Direction);
            const directionValues = Object.values(Direction);

            // For numeric enums, keys include both string keys and numeric values
            expect(directionKeys).toEqual(["0", "1", "2", "3", "Up", "Down", "Left", "Right"]);
            expect(directionValues).toEqual(["Up", "Down", "Left", "Right", 0, 1, 2, 3]);

            console.info("Status keys:", statusKeys);
            console.info("Status values:", statusValues);
            console.info("Direction keys (numeric enum):", directionKeys);
            console.info("Direction values (numeric enum):", directionValues);
        });

        it("should test enum mapping and transformation", () => {
            console.info("=== Testing Enum Mapping ===");

            // Status to display name mapping
            const statusDisplayNames = {
                [Status.Pending]: "Menunggu Persetujuan",
                [Status.Approved]: "Disetujui",
                [Status.Rejected]: "Ditolak"
            };

            expect(statusDisplayNames[Status.Pending]).toBe("Menunggu Persetujuan");
            expect(statusDisplayNames[Status.Approved]).toBe("Disetujui");
            expect(statusDisplayNames[Status.Rejected]).toBe("Ditolak");

            // Direction to icon mapping
            const directionIcons = {
                [Direction.Up]: "�",
                [Direction.Down]: "�",
                [Direction.Left]: "�",
                [Direction.Right]: "�"
            };

            expect(directionIcons[Direction.Up]).toBe("�");
            expect(directionIcons[Direction.Down]).toBe("�");
            expect(directionIcons[Direction.Left]).toBe("�");
            expect(directionIcons[Direction.Right]).toBe("�");

            console.info("Status display names:", statusDisplayNames);
            console.info("Direction icons:", directionIcons);
        });
    });

    describe("Demonstrate Enums Function", () => {
        it("should run demonstrateEnums function without errors", () => {
            console.info("=== Testing demonstrateEnums() Function ===");

            // Function should run without throwing errors
            expect(() => demonstrateEnums()).not.toThrow();

            // This will output all enum demonstrations to console
            demonstrateEnums();
        });
    });

    describe("Real-world Enum Usage Patterns", () => {
        it("should demonstrate practical enum usage patterns", () => {
            console.info("=== Real-world Enum Patterns ===");

            // Pattern 1: State management
            interface TaskState {
                id: string;
                status: Status;
                priority: "high" | "medium" | "low";
            }

            const task: TaskState = {
                id: "task-1",
                status: Status.Pending,
                priority: "high"
            };

            expect(task.status).toBe(Status.Pending);

            // Pattern 2: Configuration with enum
            interface GameConfig {
                theme: Theme;
                difficulty: "easy" | "medium" | "hard";
            }

            const gameConfig: GameConfig = {
                theme: Theme.Dark,
                difficulty: "medium"
            };

            expect(gameConfig.theme).toBe(Theme.Dark);

            // Pattern 3: API response handling
            interface ApiResponse {
                code: ResponseCode;
                message: string;
                data?: any;
            }

            const successResponse: ApiResponse = {
                code: ResponseCode.Success,
                message: "Data retrieved successfully",
                data: { users: [] }
            };

            const errorResponse: ApiResponse = {
                code: ResponseCode.NotFound,
                message: "Resource not found"
            };

            expect(successResponse.code).toBe(ResponseCode.Success);
            expect(errorResponse.code).toBe(ResponseCode.NotFound);

            console.info("Task with enum status:", task);
            console.info("Game config with enum theme:", gameConfig);
            console.info("API responses with enum codes:", { successResponse, errorResponse });
        });
    });
});