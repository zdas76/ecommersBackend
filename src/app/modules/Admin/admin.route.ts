import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { AdminValiation } from "./Admin.valitation";
import { AdminsController } from "./Admin.controllers";

const route = express.Router();

route.get("/:id", auth(UserRole.ADMIN), AdminsController.getAdminById);

route.get("/", auth(UserRole.ADMIN), AdminsController.getAllAdmin);

route.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(AdminValiation.updateAdminValidation),
  AdminsController.updateAdminById
);

route.delete(
  "/:id",
  auth(UserRole.ADMIN),
  AdminsController.deleteAdminById
);

export const AdminRoute = route;
