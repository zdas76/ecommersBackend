"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createAdminValidation = zod_1.z.object({
    admin: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name is required" }),
        email: zod_1.z.string({ required_error: "email is required" }),
        contactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        passWord: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
        role: zod_1.z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
    }),
});
const createVendorValidation = zod_1.z.object({
    vendor: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
        contactNumber: zod_1.z
            .string()
            .regex(/^\d{10,15}$/, { message: "Invalid contact number" })
            .optional(),
        address: zod_1.z.string().optional(),
        shopName: zod_1.z.string({ required_error: "Shop Name is required" }),
        shopDescription: zod_1.z.string({ required_error: "Shop Description is required" }),
        passWord: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
        role: zod_1.z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
    }),
});
const createCustomerValidation = zod_1.z.object({
    customer: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name is required" }),
        email: zod_1.z.string({ required_error: "email is required" }).email({ message: "Invalid email address" }),
        contactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        passWord: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
        role: zod_1.z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
    }),
});
exports.userValidation = {
    createAdminValidation,
    createVendorValidation,
    createCustomerValidation
};
