import { z } from "zod";

const createcategoryValidation = z.object({
    body: z.object({
        categoryName: z.string().min(1, "Category name is required"),
    })
})

export const categoryValidation = {
    createcategoryValidation
}