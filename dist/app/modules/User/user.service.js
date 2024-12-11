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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
// Create Customer
const createCustomer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadTOCloudinary = yield fileUploaders_1.fileUploaders.uploadTOCloudinary(file);
        req.body.profilePhoto = uploadTOCloudinary.secure_url;
    }
    const data = req.body;
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (isExist) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "this user already exiest");
    }
    const hassPassWord = yield bcrypt_1.default.hash(data.passWord, 12);
    data.passWord = hassPassWord;
    const userData = {
        email: data.email,
        passWord: hassPassWord,
        role: client_1.UserRole.CUSTOMER,
    };
    const { passWord, role } = data, customerData = __rest(data, ["passWord", "role"]);
    const result = yield prisma_1.default.$transaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
        yield txc.user.create({
            data: userData
        });
        const customer = yield txc.customer.create({
            data: customerData
        });
        return customer;
    }));
    return result;
});
// Create Vendor
const creatVendortoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadTOCloudinary = yield fileUploaders_1.fileUploaders.uploadTOCloudinary(file);
        req.body.shoplogo = uploadTOCloudinary.secure_url;
    }
    const data = req.body;
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (isExist) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "this user already exiest");
    }
    const hassPassWord = yield bcrypt_1.default.hash(data.passWord, 12);
    const userData = {
        email: data.email,
        passWord: hassPassWord,
        role: client_1.UserRole.VENDOR,
    };
    const { passWord, role } = data, vendorData = __rest(data, ["passWord", "role"]);
    const result = yield prisma_1.default.$transaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
        yield txc.user.create({
            data: userData,
        });
        const createVandor = yield txc.vendor.create({
            data: vendorData,
        });
        return createVandor;
    }));
    return result;
});
const creatAdmintoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadTOCloudinary = yield fileUploaders_1.fileUploaders.uploadTOCloudinary(file);
        req.body.admin.profilePhoto = uploadTOCloudinary.secure_url;
    }
    const data = req.body.admin;
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (isExist) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "this user already exiest");
    }
    const hassPassWord = yield bcrypt_1.default.hash(data.passWord, 12);
    const userData = {
        email: data.email,
        passWord: hassPassWord,
        role: client_1.UserRole.ADMIN,
    };
    const { passWord, role } = data, adminData = __rest(data, ["passWord", "role"]);
    const result = yield prisma_1.default.$transaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
        yield txc.user.create({
            data: userData,
        });
        const createAdmin = yield txc.admin.create({
            data: adminData,
        });
        return createAdmin;
    }));
    return result;
});
// const getAllPatientFromBD = async (
//   params: any,
//   paginat: IPaginationOptions
// ) => {
//   const { page, limit, skip } = paginationHelper.Pagination(paginat);
//   const { searchTerm, ...filterData } = params;
//   const andCondition: Prisma.UserWhereInput[] = [];
//   if (params.searchTerm) {
//     andCondition.push({
//       OR: UserSearchAbleFields.map((field) => ({
//         [field]: {
//           contains: params.searchTerm,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andCondition.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: filterData[key],
//         },
//       })),
//     });
//   }
//   const wehreConditions: Prisma.UserWhereInput =
//   andCondition.length > 0 ? { AND: andCondition } : {};
//   const result = await prisma.user.findMany({
//     where: wehreConditions,
//     skip,
//     take: limit,
//     orderBy:
//       paginat.sortBy && paginat.sortOrder
//         ? {
//             [paginat.sortBy]: paginat.sortOrder,
//           }
//         : {
//             createdAt: "desc",
//           },
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       status: true,
//       createdAt: true,
//       updatedAt: true,
//       admin: true,
//       doctor: true,
//       patient: true,
//     },
//   });
//   const total = await prisma.user.count({
//     where: wehreConditions,
//   });
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };
// const changeProfileStatusToDB = async (
//   id: string,
//   data: { status: UserStatus }
// ) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       id,
//     },
//   });
//   const updateUserStatus = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: {
//       status: data.status,
//     },
//   });
//   return updateUserStatus;
// };
// const getMyProfile = async (user: IAuthUser) => {
//   const userInfo = await prisma.user.findUnique({
//     where: {
//       email: user?.email,
//     },
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       needPasswordChange: true,
//       status: true,
//     },
//   });
//   let profileInfo;
//   if (userInfo?.role === "SUPER_ADMIN" || userInfo?.role === "ADMIN") {
//     profileInfo = await prisma.admin.findUniqueOrThrow({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   } else if (userInfo?.role === "DOCTOR") {
//     profileInfo = await prisma.doctor.findUniqueOrThrow({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   } else if (userInfo?.role === "PATIENT") {
//     profileInfo = await prisma.patient.findUniqueOrThrow({
//       where: {
//         email: userInfo.email,
//       },
//     });
//   }
//   return { ...userInfo, ...profileInfo };
// };
// const updateMyProfile = async(user:IAuthUser, req:Request) => {
//   const userInfo = await prisma.user.findUnique({
//     where: {
//       email: user?.email,
//     },
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       needPasswordChange: true,
//       status: true,
//     },
//   });
//   const file= req.file as IFile
//   if(file){
//     const uploadTOCloudinary = await fileUploaders.uploadTOCloudinary(file)
//     req.body.profilePhoto = uploadTOCloudinary?.secure_url;
//   }
//   let profileInfo;
//   if (userInfo?.role === "SUPER_ADMIN" || userInfo?.role === "ADMIN") {
//     profileInfo = await prisma.admin.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body
//     });
//   } else if (userInfo?.role === "DOCTOR") {
//     profileInfo = await prisma.doctor.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body
//     });
//   } else if (userInfo?.role === "PATIENT") {
//     profileInfo = await prisma.patient.update({
//       where: {
//         email: userInfo.email,
//       },
//       data: req.body
//     });
//   }
//   return { ...profileInfo };
// }
exports.UserService = {
    createCustomer,
    creatVendortoDB,
    creatAdmintoDB
};
