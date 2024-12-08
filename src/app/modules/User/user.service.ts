import { Prisma, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploaders } from "../../../helpers/fileUploaders";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { UserSearchAbleFields } from "./User.constant";
import { IFile } from "../../interfaces/file";
import { IAuthUser } from "../../interfaces/common";

const creatUser = async (req: Request) => {
    
  const file = req.file;
  if (file) {
    const uploadTOCloudinary: any = await fileUploaders.uploadTOCloudinary(
      file
    );
    req.body.profilePhoto = uploadTOCloudinary.secure_url;
  }

  const data = req.body;

  await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email
    }
  })
  
  const hassPassWord: string = await bcrypt.hash(data.passWord, 12);
  data.passWord = hassPassWord;

  const result = await prisma.user.create({
      data:data
    });

  return result;
};

// const creatVendortoDB = async (req: Request) => {
//   const file = req.file;
//   if (file) {
//     const uploadTOCloudinary: any = await fileUploaders.uploadTOCloudinary(
//       file
//     );
//     req.body.doctor.profilePhoto = uploadTOCloudinary.secure_url;
//   }

//   const data = req.body;

//   const hassPassWord: string = await bcrypt.hash(data.password, 12);

//   const userData = {
//     email: data.doctor.email,
//     passWord: hassPassWord,
//     role: UserRole.VENDOR,
//   };

//   const result = await prisma.$transaction(async (transactionClient) => {
//     await transactionClient.user.create({
//       data: userData,
//     });

//     const createDoctorData = await transactionClient.vendor.create({
//       data: data.doctor,
//     });

//     return createDoctorData;
//   });

//   return result;
// };



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

export const UserService = {
  creatUser,
  // getAllPatientFromBD,
//   changeProfileStatusToDB,
//   getMyProfile,
//   updateMyProfile,
};
