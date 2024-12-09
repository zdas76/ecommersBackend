

import { z } from "zod";

const createAdminValidation = z.object({
  admin: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string().optional(),
    address:z.string().optional(),
    passWord: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
  }),
});


const createVendorValidation = z.object({
  vendor: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    contactNumber: z
      .string()
      .regex(/^\d{10,15}$/, { message: "Invalid contact number" })
      .optional(),
    address: z.string().optional(),
    shopName: z.string({ required_error: "Shop Name is required" }),
    shopDescription: z.string({ required_error: "Shop Description is required" }),
    passWord: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
  }),
});

const createCustomerValidation = z.object({
  customer: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }).email({message: "Invalid email address"}),
    contactNumber: z.string().optional(),
    address:z.string().optional(),
    passWord: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["ADMIN", "VENDOR", "CUSTOMER"], { required_error: "Role is required" }),
  }),
});





export const userValidation = {
  createAdminValidation,
  createVendorValidation,
  createCustomerValidation
};

