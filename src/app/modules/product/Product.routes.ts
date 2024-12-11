import express, { NextFunction, Request, Response } from "express";
import { productValidation } from "./Product.validation";
import { ProductController } from "./Product.controllers";
import { fileUploaders } from "../../../helpers/fileUploaders";

const route = express.Router();

route.post(
  "/",
  fileUploaders.upload.array("file"),
  
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productValidation.createProductValidation.parse(
        JSON.parse(req.body.product)
    );
    
    return ProductController.createProduct(req, res, next);
  }
);

route.get("/", ProductController.getAllProduct);

// route.get("/:id", CategoryController.getOneCagetory);

// route.patch("/:id", CategoryController.updateCagetory);

// route.delete("/:id", CategoryController.deleteCagetory);

export const ProductRouter = route;
