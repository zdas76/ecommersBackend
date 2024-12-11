"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
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
router.post("/create-admin", 
// auth(UserRole.ADMIN ),
fileUploaders_1.fileUploaders.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createAdminValidation.parse(JSON.parse(req.body.admin));
    return user_controller_1.userController.creatAdmin(req, res, next);
});
router.post("/create-customer", fileUploaders_1.fileUploaders.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createCustomerValidation.parse(JSON.parse(req.body.customer));
    return user_controller_1.userController.creatCustomer(req, res, next);
});
router.post("/create-vendor", fileUploaders_1.fileUploaders.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.createVendorValidation.parse(JSON.parse(req.body.vendor));
    return user_controller_1.userController.creatVendor(req, res, next);
});
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
exports.userRoutes = router;
