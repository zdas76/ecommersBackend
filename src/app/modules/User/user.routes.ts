import { UserRole } from '@prisma/client';
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

import { fileUploaders } from "../../../helpers/fileUploaders";
import { userValidation } from "./user.validation";

const router = express.Router();

// router.get(
//   "/",
//   auth(UserRole.ADMIN),
//   userController.getAllUser
// );

// router.get(
//   "/me",
//   auth( UserRole.ADMIN, UserRole.COSTOMER, UserRole.VENDOR),
//   userController.getMyProfile
// );

router.post(
  "/create-admin",
  // auth(UserRole.ADMIN ),
  fileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidation.parse(
      JSON.parse(req.body.admin)
    );
    return userController.creatAdmin(req, res, next);
  }
);

router.post(
  "/create-customer",
    fileUploaders.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = userValidation.createCustomerValidation.parse(
      JSON.parse(req.body.customer)
    );
    return userController.creatCustomer(req, res, next);
  }
);

router.post(
  "/create-vendor",
  fileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createVendorValidation.parse(
      JSON.parse(req.body.vendor)
    );
    
    return userController.creatVendor(req, res, next);
  }
);

// router.patch(
//   "/:id/status",
//   auth(UserRole.ADMIN),
//   userController.changeProfileSTatus
// );

// router.patch(
//   "/update-my-profile",
//   auth(UserRole.ADMIN, UserRole.COSTOMER, UserRole.VENDOR),
//   fileUploaders.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createDoctorValidation.parse(
//       JSON.parse(req.body.data)
//     );
//     return userController.updateMyProfile(req, res, next);
//   }
// );

export const userRoutes = router;
