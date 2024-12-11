"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_validation_1 = require("./category.validation");
const route = express_1.default.Router();
route.post("/", (0, validationRequest_1.default)(category_validation_1.categoryValidation.createcategoryValidation), category_controller_1.CategoryController.createCagetory);
route.get("/", category_controller_1.CategoryController.getCagetory);
route.get("/:id", category_controller_1.CategoryController.getOneCagetory);
route.patch("/:id", category_controller_1.CategoryController.updateCagetory);
// route.delete("/:id", CategoryController.deleteCagetory);
exports.CategoryRouter = route;
