import { IAuthUser } from "./../../interfaces/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponst from "../../../shared/sendResponst";
import { StatusCodes } from "http-status-codes";
import { UserfiltersFields } from "./User.constant";

const creatUser = catchAsync(async (req, res) => {
  const result = await UserService.creatUser(req);

  res.status(200).json({
    success: true,
    message: "User Created Successfuly!",
    data: result,
  })
});

const getAllUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, UserfiltersFields);
  const paginat = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllPatientFromBD(filters, paginat);
  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Data fatched",
    meta: result.meta,
    data: result.data,
  });
});

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

export const userController = {
  creatUser,
  getAllUser,
//   changeProfileSTatus,
//   getMyProfile,
//   updateMyProfile,
};
