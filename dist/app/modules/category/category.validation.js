"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const createcategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        categoryName: zod_1.z.string().min(1, "Category name is required"),
    })
});
exports.categoryValidation = {
    createcategoryValidation
};
