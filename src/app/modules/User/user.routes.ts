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

// router.post(
//   "/create-admin",
//   auth(UserRole.ADMIN ),
//   fileUploaders.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createAdminValidation.parse(
//       JSON.parse(req.body.data)
//     );
//     return userController.creatAdmin(req, res, next);
//   }
// );

router.post(
  "/",
    fileUploaders.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      userValidation.createUserValidation.parse(
      JSON.parse(req.body.data)
    );
    return userController.creatUser(req, res, next);
  }
);

// router.post(
//   "/create-patient",
//   fileUploaders.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createDoctorValidation.parse(
//       JSON.parse(req.body.data)
//     );
//     return userController.creatDoctor(req, res, next);
//   }
// );

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
