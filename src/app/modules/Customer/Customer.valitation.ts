import z from 'zod';

const updateCustomerValidation = z.object({
  customer: z.object({
    name: z.string({ required_error: "name is required" }),
    contactNumber: z.string().optional(),
    address:z.string().optional(),
  }),
});
export const CustomerValiation  = {
  updateCustomerValidation
}