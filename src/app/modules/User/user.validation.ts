
import { z } from "zod";

const createUserValidation = z.object({
  data: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string().optional(),
    address:z.string().optional(),
    passWord:z.string({ required_error: "Password is required" }),
    role: z.string({required_error: "User type is required"})
  }),
});



export const userValidation = {
  createUserValidation,
};
