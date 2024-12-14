import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { CustomersController } from "./Customer.controllers";
import { CustomerValiation } from "./Customer.valitation";

const route = express.Router();

route.get("/:id", auth(UserRole.ADMIN), CustomersController.getCustomerById);

route.get(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  CustomersController.getAllCustomer
);

route.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  validateRequest(CustomerValiation.updateCustomerValidation),
  CustomersController.updateCustomerById
);

route.delete(
  "/:id",
  auth(UserRole.ADMIN),
  CustomersController.deleteCustomerById
);

export const CustomerRoute = route;
