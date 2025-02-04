"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurTeamValidationSchema = exports.adminSchema = exports.applyFranchiseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.applyFranchiseSchema = zod_1.default.object({
    firstname: zod_1.default
        .string({ required_error: "First name is required" })
        .min(3, "First name must be at least 3 characters")
        .max(20, "First name must be at most 20 characters")
        .trim(),
    lastname: zod_1.default
        .string()
        .min(3, "Last name must be at least 3 characters")
        .max(20, "Last name must be at most 20 characters")
        .trim()
        .optional(),
    email: zod_1.default
        .string({ required_error: "Email is required" })
        .email("Invalid email")
        .trim(),
    phone: zod_1.default
        .string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 characters")
        .max(10, "Phone number must be at most 10 characters")
        .trim(),
    address1: zod_1.default
        .string({ required_error: "Address is required" })
        .min(10, "Address must be at least 10 characters")
        .max(500, "Address must be at most 500 characters")
        .trim(),
    address2: zod_1.default.string().trim(),
    state: zod_1.default
        .string({ required_error: "State is required" })
        .min(3, "State must be at least 3 characters")
        .max(30, "State must be at most 100 characters")
        .trim(),
    pincode: zod_1.default
        .string({ required_error: "Pincode is required" })
        .min(6, "Pincode must be at least 6 characters")
        .max(6, "Pincode must be at most 6 characters")
        .trim(),
});
exports.adminSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "Email is required" })
        .email("Invalid email")
        .trim(),
    password: zod_1.default
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .trim(),
});
exports.OurTeamValidationSchema = zod_1.default.object({
    name: zod_1.default
        .string({ required_error: "name is required" })
        .trim()
        .refine((name) => name.length > 0, "name is required"),
    role: zod_1.default
        .string({ required_error: "role is required" })
        .trim()
        .refine((role) => role.length > 0, "role is required"),
});
