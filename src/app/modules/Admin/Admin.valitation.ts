import z from "zod";

const updateAdminValidation = z.object({
  admin: z.object({
    name: z.string({ required_error: "name is required" }),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const AdminValiation = {
  updateAdminValidation,
};
