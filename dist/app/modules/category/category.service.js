"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createCategory = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            categoryName: payLoad.categoryName
        }
    });
    const result = yield prisma_1.default.category.create({
        data: payLoad
    });
    return result;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany();
    return result;
});
const getOneCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findFirst({
        where: {
            id
        }
    });
    return result;
});
const updateCategory = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.updateMany({
        where: {
            id: id
        },
        data: {
            categoryName: payLoad.categoryName
        }
    });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
};
