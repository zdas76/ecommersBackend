import z from 'zod';

const updateVendorValidation = z.object({
  vendor: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    contactNumber: z
      .string()
      .regex(/^\d{10,15}$/, { message: "Invalid contact number" })
      .optional(),
    address: z.string().optional(),
    shopName: z.string({ required_error: "Shop Name is required"}).optional(),
    shopDescription: z.string({ required_error: "Shop Description is required"}).optional()
  }),
});

export const vendorValiation  = {
    updateVendorValidation
}