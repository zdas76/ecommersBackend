import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validationRequest";
import { categoryValidation } from "./category.validation";

const route = express.Router();

route.post(
  "/",
  validateRequest(categoryValidation.createcategoryValidation),
  CategoryController.createCagetory
);

route.get("/", CategoryController.getCagetory);

route.get("/:id", CategoryController.getOneCagetory);

route.patch("/:id", CategoryController.updateCagetory);

// route.delete("/:id", CategoryController.deleteCagetory);

export const CategoryRouter = route;
