import { Admin, Vendor } from './../../../../node_modules/.prisma/client/index.d';
import { Prisma, UserRole,  } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploaders } from "../../../helpers/fileUploaders";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { UserSearchAbleFields } from "./User.constant";
import { IFile } from "../../interfaces/file";
import { IAuthUser } from "../../interfaces/common";
import ApiErrors from '../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

// Create Customer
const createCustomer = async (req: Request) => {
  
  const file = req.file;
  if (file) {
    const uploadTOCloudinary: any = await fileUploaders.uploadTOCloudinary(
      file
    );
    req.body.customer.profilePhoto = uploadTOCloudinary.secure_url;
  }

  const data = req.body.customer;
  

  const isExist = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if(isExist){
    throw new ApiErrors(StatusCodes.FORBIDDEN, "this user already exiest")
  }
  
  const hassPassWord: string = await bcrypt.hash(data.passWord, 12);
  data.passWord = hassPassWord;

  const userData = {
    email: data.email,
    passWord: hassPassWord,
    role: UserRole.CUSTOMER,
  };
  
  const {passWord, role, ...customerData} = data;

  const result = await prisma.$transaction(async(txc) => {
await txc.user.create({
  data:userData
});

const customer = await txc.customer.create({
  data: customerData
})
return customer
  })
  
 return result;
};


// Create Vendor

const creatVendortoDB = async (req: Request) => {
  
  const file = req.file;
  
  if (file) {
    const uploadTOCloudinary: any = await fileUploaders.uploadTOCloudinary(
      file
    );
    req.body.vendor.shoplogo = uploadTOCloudinary.secure_url;
  }
  
  const data = req.body.vendor;
  console.log(data)

  const isExist = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if(isExist){
    throw new ApiErrors(StatusCodes.FORBIDDEN, "this user already exiest")
  }

  const hassPassWord: string = await bcrypt.hash(data.passWord, 12);
  
  const userData = {
    email: data.email,
    passWord: hassPassWord,
    role: UserRole.VENDOR,
  };

  const {passWord, role, ...vendorData} = data;

  const result = await prisma.$transaction(async (txc) => {
    await txc.user.create({
      data: userData,
    });

    const createVandor = await txc.vendor.create({
      data: vendorData,
    });

    return createVandor;
  });

  return result;
};



const creatAdmintoDB = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadTOCloudinary: any = await fileUploaders.uploadTOCloudinary(
      file
    );
    req.body.admin.profilePhoto = uploadTOCloudinary.secure_url;
  }

  const data = req.body.admin;

  const isExist = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if(isExist){
    throw new ApiErrors(StatusCodes.FORBIDDEN, "this user already exiest")
  }

  const hassPassWord: string = await bcrypt.hash(data.passWord, 12);

  const userData = {
    email: data.email,
    passWord: hassPassWord,
    role: UserRole.ADMIN,
  };

  const {passWord, role, ...adminData} = data;

  const result = await prisma.$transaction(async (txc) => {
    await txc.user.create({
      data: userData,
    });

    const createAdmin = await txc.admin.create({
      data: adminData,
    });

    return createAdmin;
  });

  return result;
};



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
  createCustomer,
  creatVendortoDB,
  creatAdmintoDB
};
