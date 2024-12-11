import { z } from "zod";

const createProductValidation = z.object({
  product: z.object({
    title: z.string().min(1, "Product title is required"),
    description: z.string({ required_error: "Description is required" }),
    price: z
      .number({ required_error: "Description is required" })
      .min(1, "Minimut price required"),
    quantity: z
      .number({ required_error: "Quantiy is required" })
      .min(1, "Minimut price required"),
    discount: z.number().optional(),
    categoryId: z.string().uuid("Category ID must be a valid UUID"),
    vendorId: z.string().uuid("Vendor ID must be a valid UUID")
  }),
});

export const productValidation = {
  createProductValidation,
};
