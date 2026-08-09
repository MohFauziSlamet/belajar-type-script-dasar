// ========================================
// ENUM EXAMPLES - TypeScript Enum Simple
// ========================================

// 1. BASIC NUMERIC ENUM
export enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right   // 3
}

// 2. STRING ENUM (Recommended)
export enum Status {
    Pending = "PENDING",
    Approved = "APPROVED",
    Rejected = "REJECTED"
}

// 3. MIXED ENUM (Number + String)
export enum ResponseCode {
    Success = 200,
    NotFound = 404,
    Error = "ERROR",
    Unknown = "UNKNOWN"
}

// 4. CONST ENUM (Optimized)
export const enum Theme {
    Light = "light",
    Dark = "dark",
    Auto = "auto"
}

// ========================================
// ENUM USAGE EXAMPLES
// ========================================

// Function menggunakan enum
export function move(direction: Direction): string {
    switch (direction) {
        case Direction.Up:
            return "Moving up";
        case Direction.Down:
            return "Moving down";
        case Direction.Left:
            return "Moving left";
        case Direction.Right:
            return "Moving right";
        default:
            return "Invalid direction";
    }
}

export function checkStatus(status: Status): string {
    switch (status) {
        case Status.Pending:
            return "Waiting for approval";
        case Status.Approved:
            return "Request approved";
        case Status.Rejected:
            return "Request rejected";
        default:
            return "Unknown status";
    }
}

// Object dengan enum properties
interface User {
    id: number;
    name: string;
    status: Status;
    theme: Theme;
}

// ========================================
// PRACTICAL EXAMPLES
// ========================================

// User management dengan enum
export const users: User[] = [
    {
        id: 1,
        name: "Alice",
        status: Status.Approved,
        theme: Theme.Dark
    },
    {
        id: 2,
        name: "Bob",
        status: Status.Pending,
        theme: Theme.Light
    },
    {
        id: 3,
        name: "Charlie",
        status: Status.Rejected,
        theme: Theme.Auto
    }
];

// Function untuk filter users by status
export function getUsersByStatus(status: Status): User[] {
    return users.filter(user => user.status === status);
}

// Function untuk get all enum values
export function getAllStatuses(): Status[] {
    return Object.values(Status);
}

// ========================================
// ENUM UTILITIES
// ========================================

// Check if value is valid enum
export function isValidStatus(value: string): value is Status {
    return Object.values(Status).includes(value as Status);
}

export function isValidDirection(value: number): value is Direction {
    return value >= 0 && value <= 3 && Number.isInteger(value);
}

// ========================================
// DEMO FUNCTIONS
// ========================================

export function demonstrateEnums() {
    console.log("=== ENUM DEMONSTRATIONS ===");

    // Numeric enum
    console.log("Direction.Up:", Direction.Up);           // 0
    console.log("Direction[0]:", Direction[0]);           // "Up"
    console.log("Direction.Right:", Direction.Right);     // 3

    // String enum
    console.log("Status.Pending:", Status.Pending);       // "PENDING"
    console.log("Status.Approved:", Status.Approved);     // "APPROVED"

    // Mixed enum
    console.log("ResponseCode.Success:", ResponseCode.Success);   // 200
    console.log("ResponseCode.Error:", ResponseCode.Error);       // "ERROR"

    // Const enum (akan di-inline saat compile)
    console.log("Theme.Dark:", Theme.Dark);               // "dark"

    // Function calls
    console.log("Move result:", move(Direction.Up));
    console.log("Status check:", checkStatus(Status.Approved));

    // Users by status
    const pendingUsers = getUsersByStatus(Status.Pending);
    console.log("Pending users:", pendingUsers.map(u => u.name));

    // All statuses
    console.log("All statuses:", getAllStatuses());

    // Validation
    console.log("Is 'PENDING' valid status?", isValidStatus("PENDING"));
    console.log("Is 'INVALID' valid status?", isValidStatus("INVALID"));
    console.log("Is 2 valid direction?", isValidDirection(2));
    console.log("Is 5 valid direction?", isValidDirection(5));
}

// Semua sudah di-export inline di atas!
// Sekarang bisa langsung import:
// import { Direction, Status, move, users } from './enum';

// ========================================
// USAGE TIPS
// ========================================

/*
KAPAN PAKAI ENUM:
 Fixed set of constants (Status, Direction, Colors)
 Configuration options (Theme, Language)
 State management (Loading, Success, Error)
 API response codes
 Menu/navigation items

REKOMENDASI:
 Gunakan string enum untuk debugging yang mudah
 Gunakan const enum untuk performance
 Hindari mixed enum kecuali benar-benar perlu
 Buat validation function untuk runtime checking

CONTOH PENGGUNAAN:
const user = { status: Status.Pending };
if (user.status === Status.Approved) {
    // do something
}

switch (user.status) {
    case Status.Pending:
        // handle pending
        break;
    case Status.Approved:
        // handle approved
        break;
}
*/