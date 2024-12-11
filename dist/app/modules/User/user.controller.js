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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const creatCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.createCustomer(req);
    res.status(200).json({
        success: true,
        message: "Customer Created Successfuly!",
        data: result,
    });
}));
const creatVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.creatVendortoDB(req);
    res.status(200).json({
        success: true,
        message: "Vendor Created Successfuly!",
        data: result,
    });
}));
const creatAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.creatAdmintoDB(req);
    res.status(200).json({
        success: true,
        message: "Admin Created Successfuly!",
        data: result,
    });
}));
// const getAllUser = catchAsync(async (req, res) => {
//   const filters = pick(req.query, UserfiltersFields);
//   const paginat = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
//   const result = await UserService.getAllPatientFromBD(filters, paginat);
//   sendResponst(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "User Data fatched",
//     meta: result.meta,
//     data: result.data,
//   });
// });
// const changeProfileSTatus = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await UserService.changeProfileStatusToDB(id, req.body);
//   sendResponst(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "User profile status fatched",
//     data: result,
//   });
// });
// const getMyProfile = catchAsync(
//   async (req: Request & { user?: IAuthUser }, res) => {
//     const user = req.user;
//     const result = await UserService.getMyProfile(user as IAuthUser);
//     sendResponst(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: "My profile data fatched",
//       data: result,
//     });
//   }
// );
// const updateMyProfile = catchAsync(
//   async (req: Request & { user?: IAuthUser }, res: Response) => {
//     const user = req.user;
//     const result = await UserService.updateMyProfile(user as IAuthUser, req);
//     sendResponst(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: "My profile update!",
//       data: result,
//     });
//   }
// );
exports.userController = {
    creatCustomer,
    creatVendor,
    creatAdmin,
    // getAllUser,
    //   changeProfileSTatus,
    //   getMyProfile,
    //   updateMyProfile,
};
