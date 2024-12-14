import express from "express";
import { VendorController } from "./vendor.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { vendorValiation } from "./vendor.valitation";

const route = express.Router();

route.get("/:id", auth(UserRole.ADMIN), VendorController.getVendorById);

route.get("/", auth(UserRole.ADMIN), VendorController.getAllVendor);

route.patch(
    "/:id",
    auth(UserRole.ADMIN, UserRole.VENDOR),
    validateRequest(vendorValiation.updateVendorValidation),
    VendorController.updateVendorById
);

route.delete("/:id", auth(UserRole.ADMIN), VendorController.deleteVendorById);

export const VendorRoute = route