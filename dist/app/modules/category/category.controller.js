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
exports.CategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponst_1 = __importDefault(require("../../../shared/sendResponst"));
const category_service_1 = require("./category.service");
const createCagetory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const reselt = yield category_service_1.CategoryService.createCategory(req.body);
    (0, sendResponst_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category Created Successfully",
        data: reselt,
    });
}));
const getCagetory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reselt = yield category_service_1.CategoryService.getAllCategory();
    (0, sendResponst_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Categories revers Successfully",
        data: reselt,
    });
}));
const getOneCagetory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reselt = yield category_service_1.CategoryService.getOneCategory(req.params.id);
    (0, sendResponst_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category reversed Successfully",
        data: reselt,
    });
}));
const updateCagetory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reselt = yield category_service_1.CategoryService.updateCategory(req.params.id, req.body);
    (0, sendResponst_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category updated Successfully",
        data: reselt,
    });
}));
// const deleteCagetory = catchAsync(async(req, res) => {
//     const reselt = await CategoryService.deleteCategory()
//     sendResponst(res, {
//         statusCode: StatusCodes.OK,
//         success: true,
//         message: "Category deleted Successfully",
//         data: reselt,
//       });
// })
exports.CategoryController = {
    createCagetory,
    getCagetory,
    getOneCagetory,
    updateCagetory,
};
